import { d as defineEventHandler, r as readBody, c as createError, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'ipx';

const query_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  let body;
  try {
    body = await readBody(event) || {};
  } catch {
    body = {};
  }
  const { query, params = {}, useCdn = true, perspective } = body;
  if (!query || typeof query !== "string") {
    throw createError({
      statusCode: 400,
      message: "Query is required and must be a string"
    });
  }
  const config = useRuntimeConfig();
  const projectId = ((_a = config.public.sanity) == null ? void 0 : _a.projectId) || "uuzbe0e0";
  const dataset = ((_b = config.public.sanity) == null ? void 0 : _b.dataset) || "production";
  const apiVersion = ((_c = config.public.sanity) == null ? void 0 : _c.apiVersion) || "2024-03-19";
  const effectiveUseCdn = perspective ? false : useCdn;
  let baseUrl = effectiveUseCdn ? `https://${projectId}.apicdn.sanity.io/v${apiVersion}/data/query/${dataset}` : `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`;
  if (perspective) {
    baseUrl += `?perspective=${encodeURIComponent(perspective)}`;
  }
  try {
    const result = await $fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query,
        params
      }),
      timeout: 3e4
    });
    return result;
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error.message || "Failed to query Sanity"
    });
  }
});

export { query_post as default };
//# sourceMappingURL=query.post.mjs.map
