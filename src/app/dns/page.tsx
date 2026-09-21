'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Table from '@/components/ui/Table'
import Card from '@/components/ui/Card'

interface DNSRecord {
    id: string
    type: string
    name: string
    content: string
    ttl: number
    proxied: boolean
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
            setDnsRecords(data)
        } catch (err) {
            setError('Failed to load DNS records')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold text-gray-900">DNS Records</h1>

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
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center py-8 text-gray-500">Loading...</div>
                ) : dnsRecords.length > 0 ? (
                    <Card>
                        <Table>
                            <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TTL</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proxied</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {dnsRecords.map((record) => (
                                <tr key={record.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {record.type}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {record.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {record.content}
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