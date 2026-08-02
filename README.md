## CloudNext Dashboard

Cloudnext is a Open Source dashboard for managing Cloudflare resources.

At the present time, CloudNext only has monitoring support for the following resources:

- Cloudflare Zones
- Cloudflare DNS Records
- Cloudflare SSL/TLS Settings
- Cloudflare Analytics

This is due to limitations of my current API Endpoints, and I am actively working on adding support for more data.

## Installation

To install CloudNext, you will need to have Node.js and npm installed on your system. You can download and install Node.js from [nodejs.org](https://nodejs.org/).
However to use Cloudnext, you need to make a User Token in your Cloudflare Account. You will need to give it the following permissions:

* Zone > DNS > Read
* Zone > Zone > Read
* Zone > Zone Settings > Read
* Zone > Analytics > Read
* Zone > SSL and Certificates > Read
* Zone > Firewall Services > Read
* Zone > Page Rules > Read
* Zone > Load Balancers > Read
* Zone > Health Checks > Read
