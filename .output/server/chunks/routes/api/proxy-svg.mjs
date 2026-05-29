import { d as defineEventHandler, g as getQuery, s as sendError, c as createError, a as setHeader } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'ipx';

const ALLOWED_HOSTS = /* @__PURE__ */ new Set([
  "cdn.sanity.io"
]);
const proxySvg = defineEventHandler(async (event) => {
  const { url } = getQuery(event);
  if (!url) {
    return sendError(event, createError({ statusCode: 400, statusMessage: "Missing url" }));
  }
  try {
    const target = new URL(Array.isArray(url) ? url[0] : url);
    if (!ALLOWED_HOSTS.has(target.hostname)) {
      return sendError(event, createError({ statusCode: 400, statusMessage: "Host not allowed" }));
    }
    const res = await fetch(target.toString(), { method: "GET" });
    if (!res.ok) {
      return sendError(event, createError({ statusCode: res.status, statusMessage: `Upstream error ${res.status}` }));
    }
    const svg = await res.text();
    setHeader(event, "Content-Type", "image/svg+xml; charset=utf-8");
    setHeader(event, "Cache-Control", "public, max-age=300, s-maxage=600");
    setHeader(event, "Access-Control-Allow-Origin", "*");
    return svg;
  } catch (error) {
    return sendError(event, createError({ statusCode: 500, statusMessage: (error == null ? void 0 : error.message) || "Proxy failed" }));
  }
});

export { proxySvg as default };
//# sourceMappingURL=proxy-svg.mjs.map
