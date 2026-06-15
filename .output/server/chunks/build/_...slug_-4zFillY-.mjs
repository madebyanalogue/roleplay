import { withAsyncContext, useSSRContext } from 'vue';
import { j as useRoute, n as navigateTo } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'ipx';
import 'vue-router';
import 'vue/server-renderer';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = {
  __name: "[...slug]",
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slugParam = route.params.slug;
    const slug = Array.isArray(slugParam) ? slugParam.join("/") : slugParam;
    [__temp, __restore] = withAsyncContext(() => navigateTo(slug ? `/work/${slug}` : "/work", { redirectCode: 301 })), await __temp, __restore();
    return () => {
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/portfolio/[...slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_...slug_-4zFillY-.mjs.map
