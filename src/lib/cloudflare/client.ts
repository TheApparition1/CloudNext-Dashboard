import { Cloudflare } from "cloudflare";

const cf = new Cloudflare({
    apiToken: process.env.CLOUDFLARE_API_TOKEN
});

export default cf;