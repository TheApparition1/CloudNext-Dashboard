'use client'

import { useState, useEffect, useMemo } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Table from '@/components/ui/Table'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'

interface DNSRecord {
    id: string
    type: string
    name: string
    content: string
    ttl: number
    proxied: boolean
    category?: string
}

interface Zone {
    id: string
    name: string
}

export default function DNSPage() {
    const [zones, setZones] = useState<Zone[]>([])
    const [selectedZone, setSelectedZone] = useState<string | null>(null)
    const [dnsRecords, setDnsRecords] = useState<DNSRecord[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [sortColumn, setSortColumn] = useState<keyof DNSRecord>('name')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
    const [categoryFilter, setCategoryFilter] = useState<string>('all')

    useEffect(() => {
        fetchZones()
    }, [])

    const fetchZones = async () => {
        console.log('fetchZones called')
        try {
            const response = await fetch('/api/cloudflare/zones')
            console.log('Zones response status:', response.status)
            const data = await response.json()
            console.log('Zones response data:', data)
            if (!response.ok) throw new Error('Failed to fetch zones')
            setZones(data.result)
            console.log('Zones set:', data.result)
            if (data.result.length > 0) {
                setSelectedZone(data.result[0].id)
                console.log('Selected zone set to:', data.result[0].id)
            }
        } catch (err) {
            setError('Failed to load zones')
            console.error('Zones error:', err)
        }
    }

    useEffect(() => {
        console.log('selectedZone changed:', selectedZone)
        if (selectedZone) {
            fetchDNSRecords(selectedZone)
        }
    }, [selectedZone])

    const getCategoryVariant = (category: string | undefined): "neutral" | "info" | "success" | "warning" | "danger" | "indigo" | "slate" => {
        switch (category) {
            case 'Cloudflare Tunnel': return 'indigo'
            case 'Vercel': return 'slate'
            case 'Cloudflare Workers': return 'success'
            case 'Mail': return 'warning'
            case 'Email Security': return 'danger'
            default: return 'neutral'
        }
    }

    const handleSort = (column: keyof DNSRecord) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    const fetchDNSRecords = async (zoneId: string) => {
        console.log('fetchDNSRecords called with zoneId:', zoneId)
        setLoading(true)
        setError(null)
        try {
            const response = await fetch(`/api/cloudflare/zones/${zoneId}/dns`)
            console.log('DNS response status:', response.status)
            const data = await response.json()
            console.log('DNS response data:', data)
            if (!response.ok) throw new Error('Failed to fetch DNS records')
            const categorizedRecords = data.map((record: DNSRecord) => {
                const content = record.content.toLowerCase()
                let category: string | undefined

                if (content.endsWith('cfargotunnel.com')) {
                    category = 'Cloudflare Tunnel'
                } else if (content.includes('vercel-dns') || content.includes('vercel')) {
                    category = 'Vercel'
                } else if (content.includes('workers.dev')) {
                    category = 'Cloudflare Workers'
                } else if (content.includes('100::')) {
                        category = 'Cloudflare Workers'
                } else if (record.type === 'MX' || content.includes('mail') || content.includes('icloud') || content.includes('google')) {
                    category = 'Mail'
                } else if (content.includes('dkim') || content.includes('dmarc') || content.includes('spf')) {
                    category = 'Email Security'
                }

                return {
                    ...record,
                    category
                }
            })
            setDnsRecords(categorizedRecords)
        } catch (err) {
            setError('Failed to load DNS records')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const filteredAndSortedRecords = useMemo(() => {
        let records = [...dnsRecords]

        // Filter by category
        if (categoryFilter !== 'all') {
            records = records.filter(record => record.category === categoryFilter)
        }

        // Sort
        records.sort((a, b) => {
            const aValue = a[sortColumn]
            const bValue = b[sortColumn]

            if (aValue === bValue) return 0

            let comparison = 0
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                comparison = aValue.localeCompare(bValue)
            } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                comparison = aValue - bValue
            } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
                comparison = aValue === bValue ? 0 : aValue ? 1 : -1
            }

            return sortDirection === 'asc' ? comparison : -comparison
        })

        return records
    }, [dnsRecords, categoryFilter, sortColumn, sortDirection])

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold text-gray-900">DNS Records</h1>

                    <div className="flex gap-3">
                        {zones.length > 0 && (
                            <select
                                value={selectedZone || ''}
                                onChange={(e) => setSelectedZone(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                            >
                                {zones.map((zone) => (
                                    <option key={zone.id} value={zone.id}>
                                        {zone.name}
                                    </option>
                                ))}
                            </select>
                        )}
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                        >
                            <option value="all">All Categories</option>
                            <option value="Cloudflare Tunnel">Cloudflare Tunnel</option>
                            <option value="Vercel">Vercel</option>
                            <option value="Cloudflare Workers">Cloudflare Workers</option>
                            <option value="Mail">Mail</option>
                            <option value="Email Security">Email Security</option>
                        </select>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-8 text-gray-500">Loading...</div>
                ) : filteredAndSortedRecords.length > 0 ? (
                    <Card>
                        <div className="overflow-x-auto">
                            <Table>
                            <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="w-20 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('type')}>
                                    Type {sortColumn === 'type' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('name')}>
                                    Name {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="w-64 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('content')}>
                                    Content {sortColumn === 'content' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="w-32 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('category')}>
                                    Category {sortColumn === 'category' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="w-16 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('ttl')}>
                                    TTL {sortColumn === 'ttl' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                                <th className="w-16 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" onClick={() => handleSort('proxied')}>
                                    Proxied {sortColumn === 'proxied' && (sortDirection === 'asc' ? '↑' : '↓')}
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {filteredAndSortedRecords.map((record) => (
                                <tr key={record.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {record.type}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {record.name}
                                    </td>
                                    <td className="px-2 py-4 text-sm text-gray-700 max-w-xs truncate">
                                        {record.content}
                                    </td>
                                    <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {record.category ? <Badge variant={getCategoryVariant(record.category)}>{record.category}</Badge> : '-'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {record.ttl}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {record.proxied ? 'Yes' : 'No'}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        </div>
                    </Card>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        No DNS records found
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}