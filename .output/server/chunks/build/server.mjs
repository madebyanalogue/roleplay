import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { defineComponent, shallowRef, h, resolveComponent, computed, toValue, getCurrentInstance, onServerPrefetch, inject, hasInjectionContext, useAttrs, ref, mergeProps, unref, toRef, nextTick, createElementBlock, provide, cloneVNode, Suspense, Fragment, useSSRContext, createApp, withCtx, createVNode, toDisplayString, createTextVNode, shallowReactive, onErrorCaptured, resolveDynamicComponent, reactive, effectScope, isReadonly, isRef, isShallow, isReactive, toRaw, defineAsyncComponent, watch, getCurrentScope } from 'vue';
import { l as parseQuery, m as hasProtocol, n as isScriptProtocol, o as joinURL, w as withQuery, q as sanitizeStatusCode, t as withTrailingSlash, v as withoutTrailingSlash, x as getContext, c as createError$1, y as defu, z as withLeadingSlash, A as parseURL, $ as $fetch$1, B as baseURL, C as createHooks, D as executeAsync, E as encodeParam, F as encodePath, G as toRouteMatcher, H as createRouter$1 } from '../nitro/nitro.mjs';
import { RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrRenderSuspense, ssrRenderVNode, ssrRenderTeleport } from 'vue/server-renderer';
import { debounce } from 'perfect-debounce';
import { u as useHead$1, h as headSymbol } from '../routes/renderer.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'ipx';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "deep": false };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    versions: {
      get nuxt() {
        return "4.2.2";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = /* @__PURE__ */ Symbol("layout-meta");
const PageRouteSymbol = /* @__PURE__ */ Symbol("route");
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return options?.replace ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  {
    useNuxtApp().ssrContext._preloadManifest = true;
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
  }
}
const _routes = [
  {
    name: "slug",
    path: "/:slug(.*)*",
    component: () => import('./_...slug_-DhPXTuGA.mjs')
  },
  {
    name: "work-slug",
    path: "/work/:slug()",
    component: () => import('./_slug_-BWo5taEB.mjs')
  },
  {
    name: "portfolio",
    path: "/portfolio",
    component: () => import('./index-C3ygZ0LA.mjs')
  },
  {
    name: "portfolio-slug",
    path: "/portfolio/:slug(.*)*",
    component: () => import('./_...slug_-4zFillY-.mjs')
  }
];
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    const hookToWait = nuxtApp._runningTransition ? "page:transition:finish" : "page:loading:end";
    return new Promise((resolve) => {
      if (from === START_LOCATION) {
        resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
        return;
      }
      nuxtApp.hooks.hookOnce(hookToWait, () => {
        requestAnimationFrame(() => resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  const isPageNavigation = isChangingPage(to, from);
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isPageNavigation ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const routerOptions1 = {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return false;
  }
};
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const hashMode = routerOptions1.hashMode ?? false;
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0,
  ...routerOptions1
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    if (hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    router.afterEach((to, from) => {
      if (to.matched.at(-1)?.components?.default === from.matched.at(-1)?.components?.default) {
        syncCurrentRoute();
      }
    });
    const route = { sync: syncCurrentRoute };
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    if (!nuxtApp.ssrContext?.islandContext) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules({ path: to.path }));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            if (false) ;
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  statusCode: 404,
                  statusMessage: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach((to) => {
      if (to.matched.length === 0) {
        return nuxtApp.runWithContext(() => showError(createError({
          statusCode: 404,
          fatal: false,
          statusMessage: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function injectHead(nuxtApp) {
  const nuxt = nuxtApp || useNuxtApp();
  return nuxt.ssrContext?.head || nuxt.runWithContext(() => {
    if (hasInjectionContext()) {
      const head = inject(headSymbol);
      if (!head) {
        throw new Error("[nuxt] [unhead] Missing Unhead instance.");
      }
      return head;
    }
  });
}
function useHead(input, options = {}) {
  const head = options.head || injectHead(options.nuxt);
  return useHead$1(input, { head, ...options });
}
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const plugins = [
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  plugin,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  components_plugin_4kY4pyzJIYX99vmMAAIorFf3CnAaptHitJgf7JxiED8
];
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
const __nuxt_component_0$3 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function isHashLinkWithoutHashMode(link) {
    return !hashMode && typeof link === "string" && link.startsWith("#");
  }
  function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
    const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
    if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
    };
    return resolvedPath;
  }
  function useNuxtLink(props) {
    const router = useRouter();
    const config = /* @__PURE__ */ useRuntimeConfig();
    const hasTarget = computed(() => !!props.target && props.target !== "_self");
    const isAbsoluteUrl = computed(() => {
      const path = props.to || props.href || "";
      return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
    });
    const builtinRouterLink = resolveComponent("RouterLink");
    const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
    const isExternal = computed(() => {
      if (props.external) {
        return true;
      }
      const path = props.to || props.href || "";
      if (typeof path === "object") {
        return false;
      }
      return path === "" || isAbsoluteUrl.value;
    });
    const to = computed(() => {
      const path = props.to || props.href || "";
      if (isExternal.value) {
        return path;
      }
      return resolveTrailingSlashBehavior(path, router.resolve, props.trailingSlash);
    });
    const link = isExternal.value ? void 0 : useBuiltinLink?.({ ...props, to });
    const href = computed(() => {
      const effectiveTrailingSlash = props.trailingSlash ?? options.trailingSlash;
      if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
        return to.value;
      }
      if (isExternal.value) {
        const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
        const href2 = typeof path === "object" ? router.resolve(path).href : path;
        return applyTrailingSlashBehavior(href2, effectiveTrailingSlash);
      }
      if (typeof to.value === "object") {
        return router.resolve(to.value)?.href ?? null;
      }
      return applyTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), effectiveTrailingSlash);
    });
    return {
      to,
      hasTarget,
      isAbsoluteUrl,
      isExternal,
      //
      href,
      isActive: link?.isActive ?? computed(() => to.value === router.currentRoute.value.path),
      isExactActive: link?.isExactActive ?? computed(() => to.value === router.currentRoute.value.path),
      route: link?.route ?? computed(() => router.resolve(to.value)),
      async navigate(_e) {
        await navigateTo(href.value, { replace: props.replace, external: isExternal.value || hasTarget.value });
      }
    };
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetchOn: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Behavior
      trailingSlash: {
        type: String,
        default: void 0,
        required: false
      }
    },
    useLink: useNuxtLink,
    setup(props, { slots }) {
      const router = useRouter();
      const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
      shallowRef(false);
      const el = void 0;
      const elRef = void 0;
      async function prefetch(nuxtApp = useNuxtApp()) {
        {
          return;
        }
      }
      return () => {
        if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href: href.value,
            navigate,
            prefetch,
            get route() {
              if (!href.value) {
                return void 0;
              }
              const url = new URL(href.value, "http://localhost");
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href: href.value
              };
            },
            rel,
            target,
            isExternal: isExternal.value || hasTarget.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", {
          ref: el,
          href: href.value || null,
          // converts `""` to `null` to prevent the attribute from being added as empty (`href=""`)
          rel,
          target,
          onClick: (event) => {
            if (isExternal.value || hasTarget.value) {
              return;
            }
            event.preventDefault();
            return props.replace ? router.replace(href.value) : router.push(href.value);
          }
        }, slots.default?.());
      };
    }
  });
}
const __nuxt_component_0$2 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
function useAsyncData(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  let [_key, _handler, options = {}] = args;
  const key = computed(() => toValue(_key));
  if (typeof key.value !== "string") {
    throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  options.server ??= true;
  options.default ??= getDefault;
  options.getCachedData ??= getDefaultCachedData;
  options.lazy ??= false;
  options.immediate ??= true;
  options.deep ??= asyncDataDefaults.deep;
  options.dedupe ??= "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  function createInitialFetch() {
    const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
    if (!nuxtApp._asyncData[key.value]?._init) {
      initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
      nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
    }
    return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
  }
  const initialFetch = createInitialFetch();
  const asyncData = nuxtApp._asyncData[key.value];
  asyncData._deps++;
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncReturn = {
    data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
    pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
    status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
    error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
    refresh: (...args2) => {
      if (!nuxtApp._asyncData[key.value]?._init) {
        const initialFetch2 = createInitialFetch();
        return initialFetch2();
      }
      return nuxtApp._asyncData[key.value].execute(...args2);
    },
    execute: (...args2) => asyncReturn.refresh(...args2),
    clear: () => {
      const entry2 = nuxtApp._asyncData[key.value];
      if (entry2?._abortController) {
        try {
          entry2._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
        } finally {
          entry2._abortController = void 0;
        }
      }
      clearNuxtDataByKey(nuxtApp, key.value);
    }
  };
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
  Object.assign(asyncDataPromise, asyncReturn);
  return asyncDataPromise;
}
function writableComputedRef(getter) {
  return computed({
    get() {
      return getter()?.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = void 0;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
    nuxtApp._asyncData[key].error.value = void 0;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  nuxtApp.payload._errors[key] ??= void 0;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = _handler ;
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData !== void 0;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: computed(() => asyncData.status.value === "pending"),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if ((opts.dedupe ?? options.dedupe) === "defer") {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
        if (cachedData !== void 0) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = void 0;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      if (asyncData._abortController) {
        asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
      }
      asyncData._abortController = new AbortController();
      asyncData.status.value = "pending";
      const cleanupController = new AbortController();
      const promise = new Promise(
        (resolve, reject) => {
          try {
            const timeout = opts.timeout ?? options.timeout;
            const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
            }, { once: true, signal: cleanupController.signal });
            return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = void 0;
        asyncData.status.value = "success";
      }).catch((error) => {
        if (nuxtApp._asyncDataPromises[key] && nuxtApp._asyncDataPromises[key] !== promise) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (asyncData._abortController?.signal.aborted) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
          asyncData.status.value = "idle";
          return nuxtApp._asyncDataPromises[key];
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        cleanupController.abort();
        delete nuxtApp._asyncDataPromises[key];
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      unsubRefreshAsyncData();
      if (nuxtApp._asyncData[key]?._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          if (!nuxtApp._asyncData[key]?._init) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => void 0;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = AbortSignal.timeout?.(timeout);
    if (timeoutSignal) {
      list.push(timeoutSignal);
    }
  }
  if (AbortSignal.any) {
    return AbortSignal.any(list);
  }
  const controller = new AbortController();
  for (const sig of list) {
    if (sig.aborted) {
      const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    const abortedSignal = list.find((s) => s.aborted);
    const reason = abortedSignal?.reason ?? new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    sig.addEventListener?.("abort", onAbort, { once: true, signal: cleanupSignal });
  }
  return controller.signal;
}
const useSiteSettings = () => {
  const query = `*[_type == "siteSettings"][0] {
      maxWidth,
      logo,
    title,
      seoTitle,
      seoDescription,
    headerType,
    mobileBreakpoint,
    disablePreloader,
    preloaderImages[] {
      image {
        asset->
      },
      alt,
      repeatLeftRight
    },
    preloaderText,
    preloaderSvgCode,
      facebookShareImage {
        asset-> {
          _id,
          url,
          _ref
        }
      },
      headerMenu-> {
        title,
        items[] {
          text,
          link {
            type,
            page-> {
              slug {
                current
              }
            },
            url
          }
        }
      },
      mobileMenu-> {
        title,
        items[] {
          text,
          link {
            type,
            page-> {
              slug {
                current
              }
            },
            url
          }
        }
      },
      showMobileMenuSocialLinks,
      mobileMenuSocialLinksTitle,
      mobileMenuSocialLinks[] {
        _key,
        title,
        url
      },
      portfolioPage-> {
        slug {
          current
        }
      },
      singlePortfolioNextProjectSettings {
        enabled,
        nextUpSubtitle,
        viewProjectButtonTitle,
        backLinkTitle,
        backLinkPage-> {
          slug {
            current
          }
        }
      },
      navigationContact {
        buttonTitle,
        buttonPage-> {
          slug {
            current
          }
        },
        contacts[] {
          _key,
          title,
          linkText,
          url,
          link {
            type,
            page-> {
              slug {
                current
              }
            },
            url
          }
        }
      },
      footerColumns[] {
        _key,
        content
      },
      footerCallToAction,
      copyright
    }`;
  const { data: settings } = useAsyncData(
    "siteSettings",
    () => $fetch("/api/sanity/query", {
      method: "POST",
      body: { query }
    }).then((result) => result?.result ?? null).catch(() => null),
    { server: true }
  );
  const maxWidth = computed(() => settings.value?.maxWidth || "1800px");
  const logo = computed(() => settings.value?.logo);
  const title = computed(() => settings.value?.title || "Roleplay");
  const seoTitle = computed(() => settings.value?.seoTitle || "Roleplay");
  const seoDescription = computed(() => settings.value?.seoDescription || "");
  const disablePreloader = computed(() => settings.value?.disablePreloader === true);
  const preloaderImages = computed(() => settings.value?.preloaderImages || []);
  const preloaderText = computed(() => settings.value?.preloaderText || []);
  const preloaderSvgCode = computed(() => settings.value?.preloaderSvgCode || null);
  const facebookShareImage = computed(() => {
    const asset = settings.value?.facebookShareImage?.asset;
    if (!asset) return null;
    if (asset.url) {
      return asset.url;
    }
    if (asset._id) {
      const match = String(asset._id).match(/image-([^-]+)-(\d+)x(\d+)-(\w+)/);
      if (match) {
        const [, assetId, width, height, ext] = match;
        return `https://cdn.sanity.io/images/go8920y3/production/${assetId}-${width}x${height}.${ext}`;
      }
    }
    if (asset._ref) {
      const [file, id, extension] = asset._ref.replace("image-", "").split("-");
      return `https://cdn.sanity.io/images/go8920y3/production/${id}.${extension}`;
    }
    return null;
  });
  const menuProjection = (menu) => menu && Array.isArray(menu.items) ? menu : null;
  const headerMenu = computed(() => menuProjection(settings.value?.headerMenu));
  const mobileMenu = computed(() => {
    const explicit = menuProjection(settings.value?.mobileMenu);
    if (explicit?.items?.length) return explicit;
    return menuProjection(settings.value?.headerMenu);
  });
  const showMobileMenuSocialLinks = computed(
    () => settings.value?.showMobileMenuSocialLinks === true
  );
  const mobileMenuSocialLinksTitle = computed(
    () => settings.value?.mobileMenuSocialLinksTitle || ""
  );
  const mobileMenuSocialLinks = computed(
    () => settings.value?.mobileMenuSocialLinks || []
  );
  const portfolioBasePath = computed(() => {
    const slug = settings.value?.portfolioPage?.slug?.current;
    return slug && slug !== "home" ? slug : "work";
  });
  const portfolioProjectPath = (projectSlug) => {
    const slug = typeof projectSlug === "string" ? projectSlug.trim() : projectSlug?.current;
    if (!slug) return null;
    return `/${portfolioBasePath.value}/${slug}`;
  };
  const singlePortfolioNextProjectSettings = computed(() => {
    const section = settings.value?.singlePortfolioNextProjectSettings || {};
    const nextUpSubtitle = section?.nextUpSubtitle?.trim?.() || "Next up:";
    const viewProjectButtonTitle = section?.viewProjectButtonTitle?.trim?.() || "View project";
    const enabled = section?.enabled !== false;
    const backTitle = section?.backLinkTitle?.trim?.() || "";
    const backSlug = section?.backLinkPage?.slug?.current;
    const backLink = backTitle && backSlug ? { title: backTitle, path: backSlug === "home" ? "/" : `/${backSlug}` } : null;
    return {
      enabled,
      nextUpSubtitle,
      viewProjectButtonTitle,
      backLink
    };
  });
  const navigationContact = computed(() => settings.value?.navigationContact || null);
  const footerColumns = computed(() => settings.value?.footerColumns || []);
  const footerCallToAction = computed(() => settings.value?.footerCallToAction || []);
  const headerType = computed(() => settings.value?.headerType || "responsive");
  const mobileBreakpoint = computed(() => settings.value?.mobileBreakpoint ?? 800);
  const copyright = computed(() => {
    const text = settings.value?.copyright || "";
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    return text.replace(/\[year\]/g, currentYear.toString());
  });
  return {
    settings,
    maxWidth,
    logo,
    title,
    seoTitle,
    seoDescription,
    facebookShareImage,
    headerMenu,
    mobileMenu,
    showMobileMenuSocialLinks,
    mobileMenuSocialLinksTitle,
    mobileMenuSocialLinks,
    portfolioBasePath,
    portfolioProjectPath,
    singlePortfolioNextProjectSettings,
    navigationContact,
    footerColumns,
    footerCallToAction,
    headerType,
    mobileBreakpoint,
    copyright,
    disablePreloader,
    preloaderImages,
    preloaderText,
    preloaderSvgCode
  };
};
const _sfc_main$8 = {
  __name: "Logo",
  __ssrInlineRender: true,
  setup(__props) {
    const { logo } = useSiteSettings();
    const SVG_TAG_RE = /<\s*svg[\s>]/i;
    const logoSvgHtml = computed(() => {
      const raw = logo.value;
      if (typeof raw !== "string") return "";
      const trimmed = raw.trim();
      return SVG_TAG_RE.test(trimmed) ? trimmed : "";
    });
    const svgMounted = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "logo" }, _attrs))}>`);
      if (unref(logoSvgHtml) && unref(svgMounted)) {
        _push(`<div class="logo-svg">${unref(logoSvgHtml) ?? ""}</div>`);
      } else {
        _push(`<span>Roleplay</span>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Logo.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
function useContactLink() {
  const getContactLinkUrl = (row) => {
    if (!row) return "";
    if (row.url && !row.link) return row.url;
    const link = row.link;
    if (!link) return "";
    if (link.type === "page" && link.page?.slug?.current) {
      const slug = link.page.slug.current;
      return slug === "home" ? "/" : `/${slug}`;
    }
    return link.url || "";
  };
  const contactLinkUsesNative = (url) => {
    if (!url) return true;
    if (url.startsWith("mailto:") || url.startsWith("tel:")) return true;
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) return true;
    return false;
  };
  const isExternalHttp = (url) => {
    if (!url) return false;
    return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//");
  };
  return {
    getContactLinkUrl,
    contactLinkUsesNative,
    isExternalHttp
  };
}
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$7 = {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const {
      headerMenu,
      mobileMenu,
      headerType,
      navigationContact,
      showMobileMenuSocialLinks,
      mobileMenuSocialLinksTitle,
      mobileMenuSocialLinks
    } = useSiteSettings();
    const { contactLinkUsesNative, isExternalHttp, getContactLinkUrl } = useContactLink();
    const headerMenuItems = computed(() => headerMenu.value?.items || []);
    const mobileMenuItems = computed(() => mobileMenu.value?.items || []);
    const contactButtonUrl = computed(() => {
      const slug = navigationContact.value?.buttonPage?.slug?.current;
      if (!slug) return null;
      return slug === "home" ? "/" : `/${slug}`;
    });
    const showContactButton = computed(() => {
      const nc = navigationContact.value;
      const title = nc?.buttonTitle?.trim();
      if (!title) return false;
      if (contactButtonUrl.value) return true;
      const contacts = nc?.contacts;
      return Boolean(Array.isArray(contacts) && contacts.length > 0);
    });
    const contactOpen = ref(false);
    ref(null);
    const mobileMenuOpen = ref(false);
    ref(null);
    const contactMounted = ref(false);
    const isExternalUrl = (url) => {
      if (!url) return false;
      if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("//")) return true;
      if (url.startsWith("mailto:") || url.startsWith("tel:")) return false;
      return !url.startsWith("/") && !url.startsWith("#");
    };
    const getMenuItemUrl = (item) => {
      if (item.link?.type === "page" && item.link?.page?.slug?.current) {
        return `/${item.link.page.slug.current}`;
      }
      if (item.link?.url) {
        return item.link.url;
      }
      return "#";
    };
    const isActive = (item) => {
      const itemUrl = getMenuItemUrl(item);
      if (!itemUrl || itemUrl === "#") return false;
      if (isExternalUrl(itemUrl)) return false;
      const currentPath = route.path === "/" ? "/" : route.path.replace(/\/$/, "");
      const normalizedItemUrl = itemUrl === "/" ? "/" : itemUrl.replace(/\/$/, "");
      return currentPath === normalizedItemUrl;
    };
    const isScrollingDown = ref(false);
    const isPastHeader = ref(false);
    const shouldAddTransition = ref(false);
    ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_Logo = _sfc_main$8;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: ["header", {
          "header-static": unref(headerType) === "static",
          "header-fixed": unref(headerType) === "fixed",
          "header-sticky": unref(headerType) === "responsive" && unref(isPastHeader),
          "header-hidden": unref(headerType) === "responsive" && unref(isScrollingDown),
          "header-transition": unref(headerType) === "responsive" && unref(shouldAddTransition)
        }]
      }, _attrs))} data-v-32e53d05><div class="header-bar header--styling" data-v-32e53d05><div class="header-logo" data-v-32e53d05>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Logo, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Logo)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><nav class="header-nav" aria-label="Main" data-v-32e53d05><!--[-->`);
      ssrRenderList(unref(headerMenuItems), (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item._key || item.text,
          to: getMenuItemUrl(item),
          target: isExternalUrl(item.link?.url) ? "_blank" : void 0,
          rel: isExternalUrl(item.link?.url) ? "noopener" : void 0,
          class: ["header-link", { "header-link-active": isActive(item) }]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="header-link-text" data-v-32e53d05${_scopeId}>${ssrInterpolate(item.text)}</span>`);
            } else {
              return [
                createVNode("span", { class: "header-link-text" }, toDisplayString(item.text), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav></div>`);
      if (unref(showContactButton) && unref(contactMounted)) {
        _push(`<div class="header-contact show-md" data-v-32e53d05>`);
        if (unref(contactButtonUrl)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: unref(contactButtonUrl),
            class: "header-contact-toggle header-contact-link-button header--styling"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div data-v-32e53d05${_scopeId}>${ssrInterpolate(unref(navigationContact).buttonTitle)}</div>`);
              } else {
                return [
                  createVNode("div", null, toDisplayString(unref(navigationContact).buttonTitle), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!--[--><button type="button" class="${ssrRenderClass([{ "header-contact-toggle-open": unref(contactOpen) }, "header-contact-toggle header--styling"])}"${ssrRenderAttr("aria-expanded", unref(contactOpen))} aria-haspopup="true" data-v-32e53d05><div data-v-32e53d05>${ssrInterpolate(unref(navigationContact).buttonTitle)}</div></button><div class="header-contact-panel white-text rounded-medium" role="region"${ssrRenderAttr("aria-label", unref(navigationContact).buttonTitle)} style="${ssrRenderStyle(unref(contactOpen) ? null : { display: "none" })}" data-v-32e53d05><!--[-->`);
          ssrRenderList(unref(navigationContact).contacts, (row) => {
            _push(`<div class="header-contact-item pad-20" data-v-32e53d05><div class="header-contact-item-title subtitle subtitle--circle white-dot" data-v-32e53d05>${ssrInterpolate(row.title)}</div>`);
            if (unref(contactLinkUsesNative)(unref(getContactLinkUrl)(row))) {
              _push(`<a${ssrRenderAttr("href", unref(getContactLinkUrl)(row))}${ssrRenderAttr("target", unref(isExternalHttp)(unref(getContactLinkUrl)(row)) ? "_blank" : void 0)}${ssrRenderAttr("rel", unref(isExternalHttp)(unref(getContactLinkUrl)(row)) ? "noopener" : void 0)} class="header-contact-link" data-v-32e53d05>${ssrInterpolate(row.linkText)}</a>`);
            } else {
              _push(ssrRenderComponent(_component_NuxtLink, {
                to: unref(getContactLinkUrl)(row),
                class: "header-contact-link"
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(row.linkText)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(row.linkText), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            }
            _push(`</div>`);
          });
          _push(`<!--]--></div><!--]-->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="header-mobile header--styling" data-v-32e53d05><button type="button" class="${ssrRenderClass([{ "header-menu-toggle-open": unref(mobileMenuOpen) }, "header-menu-toggle"])}"${ssrRenderAttr("aria-expanded", unref(mobileMenuOpen))} aria-controls="header-mobile-nav" data-v-32e53d05> Menu </button><div id="header-mobile-nav" class="header-mobile-panel header-mobile-panel--fullscreen underline-links" role="navigation" aria-label="Main" data-lenis-prevent style="${ssrRenderStyle(unref(mobileMenuOpen) ? null : { display: "none" })}" data-v-32e53d05><div class="header-mobile-panel-main" data-v-32e53d05><!--[-->`);
      ssrRenderList(unref(mobileMenuItems), (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item._key || item.text,
          to: getMenuItemUrl(item),
          target: isExternalUrl(item.link?.url) ? "_blank" : void 0,
          rel: isExternalUrl(item.link?.url) ? "noopener" : void 0,
          class: ["header-mobile-link", "header-link", { "header-link-active": isActive(item) }],
          onClick: ($event) => mobileMenuOpen.value = false
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="header-link-text" data-v-32e53d05${_scopeId}>${ssrInterpolate(item.text)}</span>`);
            } else {
              return [
                createVNode("span", { class: "header-link-text" }, toDisplayString(item.text), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div>`);
      if (unref(showMobileMenuSocialLinks)) {
        _push(`<div class="header-mobile-social" data-v-32e53d05>`);
        if (unref(mobileMenuSocialLinksTitle).trim()) {
          _push(`<p class="header-mobile-social-title" data-v-32e53d05>${ssrInterpolate(unref(mobileMenuSocialLinksTitle))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="header-mobile-social-links" data-v-32e53d05><!--[-->`);
        ssrRenderList(unref(mobileMenuSocialLinks), (row) => {
          _push(`<!--[-->`);
          if (unref(contactLinkUsesNative)(row.url)) {
            _push(`<a${ssrRenderAttr("href", row.url)}${ssrRenderAttr("target", unref(isExternalHttp)(row.url) ? "_blank" : void 0)}${ssrRenderAttr("rel", unref(isExternalHttp)(row.url) ? "noopener" : void 0)} class="header-mobile-social-link" data-v-32e53d05>${ssrInterpolate(row.title)}</a>`);
          } else {
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: row.url,
              class: "header-mobile-social-link",
              onClick: ($event) => mobileMenuOpen.value = false
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(row.title)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(row.title), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (unref(headerType) === "fixed") {
        _push(`<!--[--><div class="header-corner-fill" aria-hidden="true" data-v-32e53d05></div><div class="header-corner-fill right" aria-hidden="true" data-v-32e53d05></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</header>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$7, [["__scopeId", "data-v-32e53d05"]]), { __name: "Header" });
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_2 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const DECORATOR_TAGS = {
  strong: "strong",
  em: "em",
  underline: "u",
  code: "code"
};
function isExternalHref(href) {
  if (!href || typeof href !== "string") return false;
  return /^https?:\/\//i.test(href) || href.startsWith("//");
}
function wrapMarks(text, marks, markDefs) {
  if (!marks?.length) return text;
  return marks.reduce((inner, markKey) => {
    const decTag = DECORATOR_TAGS[markKey];
    if (decTag) return h(decTag, inner);
    const def = (markDefs || []).find((d) => d._key === markKey);
    if (def?._type === "link" && def.href) {
      const href = def.href;
      const openBlank = def.target === "_blank" || def.target !== "_self" && isExternalHref(href);
      return h(
        "a",
        {
          href,
          class: "sanity-link",
          target: openBlank ? "_blank" : void 0,
          rel: openBlank ? "noopener noreferrer" : void 0
        },
        inner
      );
    }
    return inner;
  }, text);
}
const _sfc_main$6 = defineComponent({
  name: "SanityBlock",
  props: {
    block: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const tag = computed(() => {
      const style = props.block.style || "normal";
      const tagMap = {
        h1: "h1",
        h2: "h2",
        h3: "h3",
        h4: "h4",
        blockquote: "blockquote",
        normal: "p"
      };
      return tagMap[style] || "p";
    });
    return () => {
      const markDefs = props.block.markDefs || [];
      const children = (props.block.children || []).filter((c) => c._type === "span").map(
        (child, index) => wrapMarks(child.text, child.marks, markDefs)
      );
      return h(tag.value, { class: "sanity-block" }, children);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SanityBlock.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_0$1 = Object.assign(_sfc_main$6, { __name: "SanityBlock" });
async function imageMeta(_ctx, url) {
  const meta = await _imageMeta(url).catch((err) => {
    console.error("Failed to get image meta for " + url, err + "");
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta;
}
async function _imageMeta(url) {
  {
    const imageMeta2 = await import('image-meta').then((r) => r.imageMeta);
    const data = await fetch(url).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url}\`.`);
    }
    const { width, height } = metadata;
    const meta = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta;
  }
}
function createMapper(map) {
  return (key) => {
    return key ? map[key] || key : map.missingValue;
  };
}
function createOperationsGenerator({ formatter, keyMap, joinWith = "/", valueMap } = {}) {
  if (!formatter) {
    formatter = (key, value) => `${key}=${value}`;
  }
  if (keyMap && typeof keyMap !== "function") {
    keyMap = createMapper(keyMap);
  }
  const map = valueMap || {};
  Object.keys(map).forEach((valueKey) => {
    if (typeof map[valueKey] !== "function") {
      map[valueKey] = createMapper(map[valueKey]);
    }
  });
  return (modifiers = {}) => {
    const operations = Object.entries(modifiers).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
      const mapper = map[key];
      if (typeof mapper === "function") {
        value = mapper(modifiers[key]);
      }
      key = typeof keyMap === "function" ? keyMap(key) : key;
      return formatter(key, value);
    });
    return operations.join(joinWith);
  };
}
function parseSize(input = "") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.replace("px", "").match(/^\d+$/g)) {
      return Number.parseInt(input, 10);
    }
  }
}
function parseDensities(input = "") {
  if (input === void 0 || !input.length) {
    return [];
  }
  const densities = /* @__PURE__ */ new Set();
  for (const density of input.split(" ")) {
    const d = Number.parseInt(density.replace("x", ""));
    if (d) {
      densities.add(d);
    }
  }
  return Array.from(densities);
}
function checkDensities(densities) {
  if (densities.length === 0) {
    throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)");
  }
}
function parseSizes(input) {
  const sizes = {};
  if (typeof input === "string") {
    for (const entry2 of input.split(/[\s,]+/).filter((e) => e)) {
      const s = entry2.split(":");
      if (s.length !== 2) {
        sizes["1px"] = s[0].trim();
      } else {
        sizes[s[0].trim()] = s[1].trim();
      }
    }
  } else {
    Object.assign(sizes, input);
  }
  return sizes;
}
function createImage(globalOptions) {
  const ctx = {
    options: globalOptions
  };
  const getImage2 = (input, options = {}) => {
    const image = resolveImage(ctx, input, options);
    return image;
  };
  const $img = (input, modifiers = {}, options = {}) => {
    return getImage2(input, {
      ...options,
      modifiers: defu(modifiers, options.modifiers || {})
    }).url;
  };
  for (const presetName in globalOptions.presets) {
    $img[presetName] = (source, modifiers, options) => $img(source, modifiers, { ...globalOptions.presets[presetName], ...options });
  }
  $img.options = globalOptions;
  $img.getImage = getImage2;
  $img.getMeta = (input, options) => getMeta(ctx, input, options);
  $img.getSizes = (input, options) => getSizes(ctx, input, options);
  ctx.$img = $img;
  return $img;
}
async function getMeta(ctx, input, options) {
  const image = resolveImage(ctx, input, { ...options });
  if (typeof image.getMeta === "function") {
    return await image.getMeta();
  } else {
    return await imageMeta(ctx, image.url);
  }
}
function resolveImage(ctx, input, options) {
  if (input && typeof input !== "string") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (!input || input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { provider, defaults } = getProvider(ctx, options.provider || ctx.options.provider);
  const preset = getPreset(ctx, options.preset);
  input = hasProtocol(input) ? input : withLeadingSlash(input);
  if (!provider.supportsAlias) {
    for (const base in ctx.options.alias) {
      if (input.startsWith(base)) {
        const alias = ctx.options.alias[base];
        if (alias) {
          input = joinURL(alias, input.slice(base.length));
        }
      }
    }
  }
  if (provider.validateDomains && hasProtocol(input)) {
    const inputHost = parseURL(input).host;
    if (!ctx.options.domains.find((d) => d === inputHost)) {
      return {
        url: input
      };
    }
  }
  const _options = defu(options, preset, defaults);
  _options.modifiers = { ..._options.modifiers };
  const expectedFormat = _options.modifiers.format;
  if (_options.modifiers?.width) {
    _options.modifiers.width = parseSize(_options.modifiers.width);
  }
  if (_options.modifiers?.height) {
    _options.modifiers.height = parseSize(_options.modifiers.height);
  }
  const image = provider.getImage(input, _options, ctx);
  image.format = image.format || expectedFormat || "";
  return image;
}
function getProvider(ctx, name) {
  const provider = ctx.options.providers[name];
  if (!provider) {
    throw new Error("Unknown provider: " + name);
  }
  return provider;
}
function getPreset(ctx, name) {
  if (!name) {
    return {};
  }
  if (!ctx.options.presets[name]) {
    throw new Error("Unknown preset: " + name);
  }
  return ctx.options.presets[name];
}
function getSizes(ctx, input, opts) {
  const width = parseSize(opts.modifiers?.width);
  const height = parseSize(opts.modifiers?.height);
  const sizes = parseSizes(opts.sizes);
  const densities = opts.densities?.trim() ? parseDensities(opts.densities.trim()) : ctx.options.densities;
  checkDensities(densities);
  const hwRatio = width && height ? height / width : 0;
  const sizeVariants = [];
  const srcsetVariants = [];
  if (Object.keys(sizes).length >= 1) {
    for (const key in sizes) {
      const variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        continue;
      }
      sizeVariants.push({
        size: variant.size,
        screenMaxWidth: variant.screenMaxWidth,
        media: `(max-width: ${variant.screenMaxWidth}px)`
      });
      for (const density of densities) {
        srcsetVariants.push({
          width: variant._cWidth * density,
          src: getVariantSrc(ctx, input, opts, variant, density)
        });
      }
    }
    finaliseSizeVariants(sizeVariants);
  } else {
    for (const density of densities) {
      const key = Object.keys(sizes)[0];
      let variant = key ? getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx) : void 0;
      if (variant === void 0) {
        variant = {
          size: "",
          screenMaxWidth: 0,
          _cWidth: opts.modifiers?.width,
          _cHeight: opts.modifiers?.height
        };
      }
      srcsetVariants.push({
        width: density,
        src: getVariantSrc(ctx, input, opts, variant, density)
      });
    }
  }
  finaliseSrcsetVariants(srcsetVariants);
  const defaultVariant = srcsetVariants[srcsetVariants.length - 1];
  const sizesVal = sizeVariants.length ? sizeVariants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", ") : void 0;
  const suffix = sizesVal ? "w" : "x";
  const srcsetVal = srcsetVariants.map((v) => `${v.src} ${v.width}${suffix}`).join(", ");
  return {
    sizes: sizesVal,
    srcset: srcsetVal,
    src: defaultVariant?.src
  };
}
function getSizesVariant(key, size, height, hwRatio, ctx) {
  const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || Number.parseInt(key);
  const isFluid = size.endsWith("vw");
  if (!isFluid && /^\d+$/.test(size)) {
    size = size + "px";
  }
  if (!isFluid && !size.endsWith("px")) {
    return void 0;
  }
  let _cWidth = Number.parseInt(size);
  if (!screenMaxWidth || !_cWidth) {
    return void 0;
  }
  if (isFluid) {
    _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
  }
  const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
  return {
    size,
    screenMaxWidth,
    _cWidth,
    _cHeight
  };
}
function getVariantSrc(ctx, input, opts, variant, density) {
  return ctx.$img(
    input,
    {
      ...opts.modifiers,
      width: variant._cWidth ? variant._cWidth * density : void 0,
      height: variant._cHeight ? variant._cHeight * density : void 0
    },
    opts
  );
}
function finaliseSizeVariants(sizeVariants) {
  sizeVariants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
  let previousMedia = null;
  for (let i = sizeVariants.length - 1; i >= 0; i--) {
    const sizeVariant = sizeVariants[i];
    if (sizeVariant.media === previousMedia) {
      sizeVariants.splice(i, 1);
    }
    previousMedia = sizeVariant.media;
  }
  for (let i = 0; i < sizeVariants.length; i++) {
    sizeVariants[i].media = sizeVariants[i + 1]?.media || "";
  }
}
function finaliseSrcsetVariants(srcsetVariants) {
  srcsetVariants.sort((v1, v2) => v1.width - v2.width);
  let previousWidth = null;
  for (let i = srcsetVariants.length - 1; i >= 0; i--) {
    const sizeVariant = srcsetVariants[i];
    if (sizeVariant.width === previousWidth) {
      srcsetVariants.splice(i, 1);
    }
    previousWidth = sizeVariant.width;
  }
}
const sanityCDN = "https://cdn.sanity.io/images";
const operationsGenerator$1 = createOperationsGenerator({
  keyMap: {
    "format": "fm",
    "height": "h",
    "quality": "q",
    "width": "w",
    // Convenience modifiers
    "background": "bg",
    "download": "dl",
    "dpr": "dpr",
    "sharpen": "sharp",
    "orientation": "or",
    "min-height": "min-h",
    "max-height": "max-h",
    "min-width": "min-w",
    "max-width": "max-w",
    "minHeight": "min-h",
    "maxHeight": "max-h",
    "minWidth": "min-w",
    "maxWidth": "max-w",
    "saturation": "sat"
  },
  valueMap: {
    format: {
      jpeg: "jpg"
    },
    fit: {
      cover: "crop",
      contain: "fill",
      fill: "scale",
      inside: "min",
      outside: "max"
    }
  },
  joinWith: "&",
  formatter: (key, value) => String(value) === "true" ? key : `${key}=${value}`
});
const getMetadata = (id) => {
  const result = id.match(/-(?<width>\d*)x(?<height>\d*)-(?<format>.*)$/);
  if (!result || !result.groups) {
    return { width: void 0, height: void 0, format: void 0 };
  }
  const width = Number(result.groups.width);
  const height = Number(result.groups.height);
  return {
    width,
    height,
    format: result.groups.format
  };
};
const getImage$1 = (src, { modifiers = {}, projectId, dataset = "production" } = {}) => {
  const { height: sourceHeight, width: sourceWidth } = getMetadata(src);
  if (modifiers.crop && typeof modifiers.crop !== "string" && sourceWidth && sourceHeight) {
    const left = modifiers.crop.left * sourceWidth;
    const top = modifiers.crop.top * sourceHeight;
    const right = sourceWidth - modifiers.crop.right * sourceWidth;
    const bottom = sourceHeight - modifiers.crop.bottom * sourceHeight;
    modifiers.rect = [left, top, right - left, bottom - top].map((i) => i.toFixed(0)).join(",");
    delete modifiers.crop;
  }
  if (modifiers.hotspot && typeof modifiers.hotspot !== "string") {
    modifiers["fp-x"] = modifiers.hotspot.x;
    modifiers["fp-y"] = modifiers.hotspot.y;
    delete modifiers.hotspot;
  }
  if (!modifiers.format || modifiers.format === "auto") {
    if (modifiers.format === "auto") {
      delete modifiers.format;
    }
    modifiers.auto = "format";
  }
  if (modifiers.fit === "contain" && !modifiers.bg) {
    modifiers.bg = "ffffff";
  }
  const operations = operationsGenerator$1(modifiers);
  const parts = src.split("-").slice(1);
  const format = parts.pop();
  const filenameAndQueries = parts.join("-") + "." + format + (operations ? "?" + operations : "");
  return {
    url: joinURL(sanityCDN, projectId, dataset, filenameAndQueries)
  };
};
const sanityRuntime$_7SpfgAEQmnAzwezXWv117KtdK4bgxnNDPRJymS9AdqE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getImage: getImage$1
}, Symbol.toStringTag, { value: "Module" }));
const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: "f",
    fit: "fit",
    width: "w",
    height: "h",
    resize: "s",
    quality: "q",
    background: "b"
  },
  joinWith: "&",
  formatter: (key, val) => encodeParam(key) + "_" + encodeParam(val)
});
const getImage = (src, { modifiers = {}, baseURL: baseURL2 } = {}, ctx) => {
  if (modifiers.width && modifiers.height) {
    modifiers.resize = `${modifiers.width}x${modifiers.height}`;
    delete modifiers.width;
    delete modifiers.height;
  }
  const params = operationsGenerator(modifiers) || "_";
  if (!baseURL2) {
    baseURL2 = joinURL(ctx.options.nuxt.baseURL, "/_ipx");
  }
  return {
    url: joinURL(baseURL2, params, encodePath(src))
  };
};
const validateDomains = true;
const supportsAlias = true;
const ipxRuntime$moy3PKjnUBArywcGUhh97aAWawnY_45QvhZXbbHaD1yrk = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getImage,
  operationsGenerator,
  supportsAlias,
  validateDomains
}, Symbol.toStringTag, { value: "Module" }));
const imageOptions = {
  ...{
    "screens": {
      "xs": 320,
      "sm": 640,
      "md": 768,
      "lg": 1200,
      "xl": 2560,
      "xxl": 3200,
      "2xl": 1536
    },
    "presets": {},
    "provider": "ipx",
    "domains": [
      "cdn.sanity.io"
    ],
    "alias": {},
    "densities": [
      1,
      2
    ],
    "format": [
      "webp",
      "jpg",
      "webp"
    ],
    "quality": 80
  },
  providers: {
    ["sanity"]: { provider: sanityRuntime$_7SpfgAEQmnAzwezXWv117KtdK4bgxnNDPRJymS9AdqE, defaults: { "projectId": "go8920y3", "dataset": "production" } },
    ["ipx"]: { provider: ipxRuntime$moy3PKjnUBArywcGUhh97aAWawnY_45QvhZXbbHaD1yrk, defaults: {} }
  }
};
const useImage = (event) => {
  const config = /* @__PURE__ */ useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  return nuxtApp.$img || nuxtApp._img || (nuxtApp._img = createImage({
    ...imageOptions,
    event: nuxtApp.ssrContext?.event,
    nuxt: {
      baseURL: config.app.baseURL
    },
    runtimeConfig: config
  }));
};
const baseImageProps = {
  // input source
  src: { type: String, required: false },
  // modifiers
  format: { type: String, required: false },
  quality: { type: [Number, String], required: false },
  background: { type: String, required: false },
  fit: { type: String, required: false },
  modifiers: { type: Object, required: false },
  // options
  preset: { type: String, required: false },
  provider: { type: String, required: false },
  sizes: { type: [Object, String], required: false },
  densities: { type: String, required: false },
  preload: {
    type: [Boolean, Object],
    required: false
  },
  // <img> attributes
  width: { type: [String, Number], required: false },
  height: { type: [String, Number], required: false },
  alt: { type: String, required: false },
  referrerpolicy: { type: String, required: false },
  usemap: { type: String, required: false },
  longdesc: { type: String, required: false },
  ismap: { type: Boolean, required: false },
  loading: {
    type: String,
    required: false,
    validator: (val) => ["lazy", "eager"].includes(val)
  },
  crossorigin: {
    type: [Boolean, String],
    required: false,
    validator: (val) => ["anonymous", "use-credentials", "", true, false].includes(val)
  },
  decoding: {
    type: String,
    required: false,
    validator: (val) => ["async", "auto", "sync"].includes(val)
  },
  // csp
  nonce: { type: [String], required: false }
};
const useBaseImage = (props) => {
  const options = computed(() => {
    return {
      provider: props.provider,
      preset: props.preset
    };
  });
  const attrs = computed(() => {
    return {
      width: parseSize(props.width),
      height: parseSize(props.height),
      alt: props.alt,
      referrerpolicy: props.referrerpolicy,
      usemap: props.usemap,
      longdesc: props.longdesc,
      ismap: props.ismap,
      crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
      loading: props.loading,
      decoding: props.decoding,
      nonce: props.nonce
    };
  });
  const $img = useImage();
  const modifiers = computed(() => {
    return {
      ...props.modifiers,
      width: parseSize(props.width),
      height: parseSize(props.height),
      format: props.format,
      quality: props.quality || $img.options.quality,
      background: props.background,
      fit: props.fit
    };
  });
  return {
    options,
    attrs,
    modifiers
  };
};
const imgProps = {
  ...baseImageProps,
  placeholder: { type: [Boolean, String, Number, Array], required: false },
  placeholderClass: { type: String, required: false },
  custom: { type: Boolean, required: false }
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "NuxtImg",
  __ssrInlineRender: true,
  props: imgProps,
  emits: ["load", "error"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const attrs = useAttrs();
    const isServer = true;
    const $img = useImage();
    const _base = useBaseImage(props);
    const placeholderLoaded = ref(false);
    const imgEl = ref();
    const sizes = computed(() => $img.getSizes(props.src, {
      ..._base.options.value,
      sizes: props.sizes,
      densities: props.densities,
      modifiers: {
        ..._base.modifiers.value,
        width: parseSize(props.width),
        height: parseSize(props.height)
      }
    }));
    const imgAttrs = computed(() => {
      const attrs2 = { ..._base.attrs.value, "data-nuxt-img": "" };
      if (!props.placeholder || placeholderLoaded.value) {
        attrs2.sizes = sizes.value.sizes;
        attrs2.srcset = sizes.value.srcset;
      }
      return attrs2;
    });
    const placeholder = computed(() => {
      let placeholder2 = props.placeholder;
      if (placeholder2 === "") {
        placeholder2 = true;
      }
      if (!placeholder2 || placeholderLoaded.value) {
        return false;
      }
      if (typeof placeholder2 === "string") {
        return placeholder2;
      }
      const size = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2, placeholder2] : [10, 10];
      return $img(props.src, {
        ..._base.modifiers.value,
        width: size[0],
        height: size[1],
        quality: size[2] || 50,
        blur: size[3] || 3
      }, _base.options.value);
    });
    const mainSrc = computed(
      () => props.sizes ? sizes.value.src : $img(props.src, _base.modifiers.value, _base.options.value)
    );
    const src = computed(() => placeholder.value ? placeholder.value : mainSrc.value);
    if (props.preload) {
      const isResponsive = Object.values(sizes.value).every((v) => v);
      useHead({
        link: [{
          rel: "preload",
          as: "image",
          nonce: props.nonce,
          ...!isResponsive ? { href: src.value } : {
            href: sizes.value.src,
            imagesizes: sizes.value.sizes,
            imagesrcset: sizes.value.srcset
          },
          ...typeof props.preload !== "boolean" && props.preload.fetchPriority ? { fetchpriority: props.preload.fetchPriority } : {}
        }]
      });
    }
    const nuxtApp = useNuxtApp();
    nuxtApp.isHydrating;
    return (_ctx, _push, _parent, _attrs) => {
      if (!_ctx.custom) {
        _push(`<img${ssrRenderAttrs(mergeProps({
          ref_key: "imgEl",
          ref: imgEl,
          class: placeholder.value && !placeholderLoaded.value ? _ctx.placeholderClass : void 0
        }, {
          ...unref(isServer) ? { onerror: "this.setAttribute('data-error', 1)" } : {},
          ...imgAttrs.value,
          ...unref(attrs)
        }, { src: src.value }, _attrs))}>`);
      } else {
        ssrRenderSlot(_ctx.$slots, "default", {
          ...unref(isServer) ? { onerror: "this.setAttribute('data-error', 1)" } : {},
          imgAttrs: {
            ...imgAttrs.value,
            ...unref(attrs)
          },
          isLoaded: placeholderLoaded.value,
          src: src.value
        }, null, _push, _parent);
      }
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_3$1 = Object.assign(_sfc_main$5, { __name: "NuxtImg" });
const _sfc_main$4 = {
  __name: "SanityBlocks",
  __ssrInlineRender: true,
  props: {
    blocks: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SanityBlock = __nuxt_component_0$1;
      const _component_NuxtImg = __nuxt_component_3$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sanity-blocks" }, _attrs))} data-v-c0c010f8><!--[-->`);
      ssrRenderList(__props.blocks, (block, index) => {
        _push(`<!--[-->`);
        if (block._type === "block") {
          _push(ssrRenderComponent(_component_SanityBlock, { block }, null, _parent));
        } else if (block._type === "image" && block.asset) {
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: block.asset.url || block.asset._id || block.asset._ref || "",
            alt: block.alt || "",
            class: "sanity-image"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SanityBlocks.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-c0c010f8"]]);
const _sfc_main$3 = {
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const { footerColumns, footerCallToAction, copyright } = useSiteSettings();
    const visibleFooterColumns = computed(
      () => footerColumns.value.filter((col) => col.content?.length > 0)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Logo = _sfc_main$8;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "footer orange white-text rounded-medium pad-50 grid grid-1 gap-65" }, _attrs))} data-v-34b70a9f><div data-v-34b70a9f>`);
      _push(ssrRenderComponent(_component_Logo, null, null, _parent));
      _push(`</div><div class="show-sm" data-v-34b70a9f></div>`);
      if (visibleFooterColumns.value.length > 0) {
        _push(`<div class="flex footer-nav-container column row-md between-xs gap-50 gap-md-30 fluid-type bold line-height-1" style="${ssrRenderStyle({ "--desktop": "40", "--tablet": "26", "--mobile": "26" })}" data-v-34b70a9f><!--[-->`);
        ssrRenderList(visibleFooterColumns.value, (col) => {
          _push(`<div class="footer-column underline-links" data-v-34b70a9f>`);
          _push(ssrRenderComponent(__nuxt_component_0, {
            blocks: col.content
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="show-sm" data-v-34b70a9f></div><div class="show-md" data-v-34b70a9f></div><div class="flex between-xs bottom-xs reverse-md gap-60" data-v-34b70a9f>`);
      if (unref(footerCallToAction).length > 0) {
        _push(`<div class="fluid-type underline-links footer-cta" style="${ssrRenderStyle({ "--desktop": "40", "--mobile": "26" })}" data-v-34b70a9f>`);
        _push(ssrRenderComponent(__nuxt_component_0, { blocks: unref(footerCallToAction) }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="fluid-type" style="${ssrRenderStyle({ "--desktop": "40", "--mobile": "16" })}" data-v-34b70a9f>${ssrInterpolate(unref(copyright))}</div></div></footer>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["__scopeId", "data-v-34b70a9f"]]), { __name: "Footer" });
const pageLoadingKey = /* @__PURE__ */ Symbol("pageLoading");
const usePageLoading = () => {
  const isLoading = ref(false);
  const setLoading = (loading) => {
    isLoading.value = loading;
  };
  return {
    isLoading,
    setLoading
  };
};
const providePageLoading = () => {
  const { isLoading, setLoading } = usePageLoading();
  provide(pageLoadingKey, { isLoading, setLoading });
  return { isLoading, setLoading };
};
const injectPageLoading = () => {
  const pageLoading = inject(pageLoadingKey);
  if (!pageLoading) {
    return usePageLoading();
  }
  return pageLoading;
};
const _sfc_main$2 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      maxWidth,
      seoTitle,
      seoDescription,
      facebookShareImage,
      mobileBreakpoint,
      headerType,
      disablePreloader
    } = useSiteSettings();
    const preloaderReady = ref(false);
    providePageLoading();
    watch(disablePreloader, (disabled) => {
      if (disabled) {
        preloaderReady.value = true;
      }
    }, { immediate: true });
    useHead(() => ({
      htmlAttrs: {
        lang: "en",
        class: headerType.value === "static" ? "header-static" : "",
        style: `
      --mobile-breakpoint: ${mobileBreakpoint.value};
    `
      },
      bodyAttrs: {
        class: headerType.value === "fixed" ? "header--is--fixed" : ""
      }
    }));
    const appStyles = computed(() => {
      return {
        "--max-width": maxWidth.value || "1800px",
        "--mobile-breakpoint": `${mobileBreakpoint.value}`
      };
    });
    const isInitialLoad = ref(true);
    const isNavigating = ref(false);
    const route = useRoute();
    let previousPath = route.path;
    watch(() => route.path, (newPath) => {
      if (!isInitialLoad.value && newPath !== previousPath) {
        isNavigating.value = true;
        setTimeout(() => {
          setTimeout(() => {
            isNavigating.value = false;
          }, 50);
        }, 600);
      }
      previousPath = newPath;
    });
    watch(mobileBreakpoint, () => {
    }, { immediate: false });
    watch(headerType, () => {
    }, { immediate: false });
    useHead(() => {
      const meta = [];
      const siteTitle = seoTitle.value || "Roleplay";
      const siteUrl = "https://roleplay.example.com";
      const currentUrl = siteUrl;
      if (seoDescription.value) {
        meta.push({
          name: "description",
          content: seoDescription.value
        });
      }
      meta.push(
        {
          property: "og:title",
          content: siteTitle
        },
        {
          property: "og:type",
          content: "website"
        },
        {
          property: "og:site_name",
          content: siteTitle
        },
        {
          property: "og:url",
          content: currentUrl
        }
      );
      if (seoDescription.value) {
        meta.push({
          property: "og:description",
          content: seoDescription.value
        });
      }
      if (facebookShareImage.value) {
        meta.push(
          {
            property: "og:image",
            content: facebookShareImage.value
          },
          {
            property: "og:image:width",
            content: "1200"
          },
          {
            property: "og:image:height",
            content: "630"
          }
        );
      }
      meta.push(
        {
          name: "twitter:card",
          content: "summary_large_image"
        },
        {
          name: "twitter:title",
          content: siteTitle
        }
      );
      if (seoDescription.value) {
        meta.push({
          name: "twitter:description",
          content: seoDescription.value
        });
      }
      if (facebookShareImage.value) {
        meta.push({
          name: "twitter:image",
          content: facebookShareImage.value
        });
      }
      return {
        title: siteTitle,
        meta
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$3;
      const _component_Header = __nuxt_component_1;
      const _component_NuxtPage = __nuxt_component_2;
      const _component_Footer = __nuxt_component_3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      if (unref(preloaderReady) || unref(disablePreloader)) {
        _push(`<div id="app" style="${ssrRenderStyle(unref(appStyles))}">`);
        _push(ssrRenderComponent(_component_Header, null, null, _parent));
        _push(`<main class="page-wrapper">`);
        _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
        _push(`</main>`);
        _push(ssrRenderComponent(_component_Footer, {
          class: { "footer-fade-out": unref(isNavigating) }
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderTeleport(_push, (_push2) => {
        _push2(`<div data-click-zoom-lightbox class="click-zoom__lightbox" aria-hidden="true"></div>`);
      }, "body", false, _parent);
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const _error = props.error;
    const statusCode = Number(_error.statusCode || 500);
    const is404 = statusCode === 404;
    const statusMessage = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
    const description = _error.message || _error.toString();
    const stack = void 0;
    const _Error404 = defineAsyncComponent(() => import('./error-404-CgUFWK07.mjs'));
    const _Error = defineAsyncComponent(() => import('./error-500-YTkvgPVn.mjs'));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({ statusCode: unref(statusCode), statusMessage: unref(statusMessage), description: unref(description), stack: unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext?._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry_default = (ssrContext) => entry(ssrContext);

export { _export_sfc as _, __nuxt_component_0$2 as a, __nuxt_component_3$1 as b, useSiteSettings as c, useNuxtApp as d, entry_default as default, useAsyncData as e, useRuntimeConfig as f, __nuxt_component_0 as g, useContactLink as h, injectPageLoading as i, useRoute as j, navigateTo as n, useHead as u };
//# sourceMappingURL=server.mjs.map
