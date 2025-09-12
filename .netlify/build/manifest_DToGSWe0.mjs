import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { q as NOOP_MIDDLEWARE_HEADER, v as decodeKey } from './chunks/astro/server_06u1W_KO.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/innovalink/Documents/GitHub/DowntownSite/","cacheDir":"file:///Users/innovalink/Documents/GitHub/DowntownSite/node_modules/.astro/","outDir":"file:///Users/innovalink/Documents/GitHub/DowntownSite/dist/","srcDir":"file:///Users/innovalink/Documents/GitHub/DowntownSite/src/","publicDir":"file:///Users/innovalink/Documents/GitHub/DowntownSite/public/","buildClientDir":"file:///Users/innovalink/Documents/GitHub/DowntownSite/dist/","buildServerDir":"file:///Users/innovalink/Documents/GitHub/DowntownSite/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":false,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"en/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/en","isIndex":true,"type":"page","pattern":"^\\/en\\/?$","segments":[[{"content":"en","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/en/index.astro","pathname":"/en","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://lafortunadowntown.com/","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/innovalink/Documents/GitHub/DowntownSite/src/pages/en/index.astro",{"propagation":"none","containsHead":true}],["/Users/innovalink/Documents/GitHub/DowntownSite/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/innovalink/Documents/GitHub/DowntownSite/src/pages/packagedetails/[id].astro",{"propagation":"none","containsHead":true}],["/Users/innovalink/Documents/GitHub/DowntownSite/src/pages/packagedetails/en/[id].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/blog@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/en/index@_@astro":"pages/en.astro.mjs","\u0000@astro-page:src/pages/packagedetails/en/[id]@_@astro":"pages/packagedetails/en/_id_.astro.mjs","\u0000@astro-page:src/pages/packagedetails/[id]@_@astro":"pages/packagedetails/_id_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DToGSWe0.mjs","/Users/innovalink/Documents/GitHub/DowntownSite/node_modules/astro/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/Users/innovalink/Documents/GitHub/DowntownSite/node_modules/astro/dist/assets/services/noop.js":"chunks/noop_BN94hp0g.mjs","@components/en/CarruselRooms.jsx":"_astro/CarruselRooms.CtzarM0v.js","@components/en/CarruselPackages.jsx":"_astro/CarruselPackages.BulX9sMs.js","@components/CarruselRooms.jsx":"_astro/CarruselRooms.DQbbqayn.js","@components/CarruselPackages.jsx":"_astro/CarruselPackages.C2PD4VX2.js","@astrojs/react/client.js":"_astro/client.BXWm451Q.js","/Users/innovalink/Documents/GitHub/DowntownSite/src/pages/packagedetails/[id].astro?astro&type=script&index=0&lang.ts":"_astro/_id_.astro_astro_type_script_index_0_lang.dIdupNAp.js","/Users/innovalink/Documents/GitHub/DowntownSite/src/pages/packagedetails/en/[id].astro?astro&type=script&index=0&lang.ts":"_astro/_id_.astro_astro_type_script_index_0_lang.D7vYbYEe.js","/Users/innovalink/Documents/GitHub/DowntownSite/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.DRXvc4p6.js","/Users/innovalink/Documents/GitHub/DowntownSite/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts":"_astro/Layout.astro_astro_type_script_index_1_lang.DJNd-kkn.js","/Users/innovalink/Documents/GitHub/DowntownSite/src/components/en/Facilities.astro?astro&type=script&index=0&lang.ts":"_astro/Facilities.astro_astro_type_script_index_0_lang.BbdqTRDJ.js","/Users/innovalink/Documents/GitHub/DowntownSite/src/components/en/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.uLBikcpg.js","/Users/innovalink/Documents/GitHub/DowntownSite/src/components/en/Reviews.astro?astro&type=script&index=0&lang.ts":"_astro/Reviews.astro_astro_type_script_index_0_lang.CAK-Q5kD.js","/Users/innovalink/Documents/GitHub/DowntownSite/src/components/Facilities.astro?astro&type=script&index=0&lang.ts":"_astro/Facilities.astro_astro_type_script_index_0_lang.B_hs1BVN.js","/Users/innovalink/Documents/GitHub/DowntownSite/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.CId-Cn1v.js","/Users/innovalink/Documents/GitHub/DowntownSite/src/components/Reviews.astro?astro&type=script&index=0&lang.ts":"_astro/Reviews.astro_astro_type_script_index_0_lang.DLZiGPEz.js","/Users/innovalink/Documents/GitHub/DowntownSite/src/components/HeaderSections.astro?astro&type=script&index=0&lang.ts":"_astro/HeaderSections.astro_astro_type_script_index_0_lang.BAPZ6ZEe.js","/Users/innovalink/Documents/GitHub/DowntownSite/src/components/en/HeaderSections.astro?astro&type=script&index=0&lang.ts":"_astro/HeaderSections.astro_astro_type_script_index_0_lang.CfLRxeTt.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/innovalink/Documents/GitHub/DowntownSite/src/pages/packagedetails/[id].astro?astro&type=script&index=0&lang.ts","const r=document.getElementById(\"carousel\"),s=document.getElementById(\"indicators\")?.children,t=r.children.length;let e=0;function n(){r.style.transform=`translateX(-${e*100}%)`,Array.from(s).forEach((l,c)=>{l.classList.toggle(\"bg-gray-800\",c===e),l.classList.toggle(\"bg-gray-400\",c!==e)})}document.getElementById(\"next\").addEventListener(\"click\",()=>{e=(e+1)%t,n()});document.getElementById(\"prev\").addEventListener(\"click\",()=>{e=(e-1+t)%t,n()});setInterval(()=>{e=(e+1)%t,n()},3e3);n();"],["/Users/innovalink/Documents/GitHub/DowntownSite/src/pages/packagedetails/en/[id].astro?astro&type=script&index=0&lang.ts","const r=document.getElementById(\"carousel\"),s=document.getElementById(\"indicators\")?.children,t=r.children.length;let e=0;function n(){r.style.transform=`translateX(-${e*100}%)`,Array.from(s).forEach((l,c)=>{l.classList.toggle(\"bg-gray-800\",c===e),l.classList.toggle(\"bg-gray-400\",c!==e)})}document.getElementById(\"next\").addEventListener(\"click\",()=>{e=(e+1)%t,n()});document.getElementById(\"prev\").addEventListener(\"click\",()=>{e=(e-1+t)%t,n()});setInterval(()=>{e=(e+1)%t,n()},3e3);n();"],["/Users/innovalink/Documents/GitHub/DowntownSite/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","(function(e,n,r,t,m){e[t]=e[t]||[],e[t].push({\"gtm.start\":new Date().getTime(),event:\"gtm.js\"});var g=n.getElementsByTagName(r)[0],a=n.createElement(r),s=\"\";a.async=!0,a.src=\"https://www.googletagmanager.com/gtm.js?id=\"+m+s,g.parentNode.insertBefore(a,g)})(window,document,\"script\",\"dataLayer\",\"GTM-WPQ8CTD4\");"],["/Users/innovalink/Documents/GitHub/DowntownSite/src/layouts/Layout.astro?astro&type=script&index=1&lang.ts","window.dataLayer=window.dataLayer||[];function a(){dataLayer.push(arguments)}a(\"js\",new Date);a(\"config\",\"G-4S6PWSDGNR\");"],["/Users/innovalink/Documents/GitHub/DowntownSite/src/components/en/Facilities.astro?astro&type=script&index=0&lang.ts","const s=document.getElementById(\"carousel\"),a=document.getElementById(\"indicators\")?.children,c=s.children.length;let t=0;function r(){s.style.transform=`translateX(-${t*100}%)`,Array.from(a).forEach((e,l)=>{e.classList.toggle(\"bg-gray-800\",l===t),e.classList.toggle(\"bg-gray-400\",l!==t),e.addEventListener(\"click\",()=>{t=l,r()})})}setInterval(()=>{t=(t+1)%c,r()},3e3);r();"],["/Users/innovalink/Documents/GitHub/DowntownSite/src/components/en/Header.astro?astro&type=script&index=0&lang.ts","window.addEventListener(\"scroll\",function(){const t=document.getElementById(\"navbar\"),n=document.getElementById(\"logob\"),o=document.getElementById(\"logon\"),d=document.getElementById(\"burger-white\"),a=document.getElementById(\"burger-black\"),l=document.querySelectorAll(\".menu-link\"),c=window.innerWidth<768;window.scrollY>50?(t.classList.remove(\"bg-transparent\",\"text-white\"),t.classList.add(\"bg-white\",\"shadow-lg\",\"text-black\"),n.classList.add(\"hidden\"),o.classList.remove(\"hidden\"),d.classList.add(\"hidden\"),a.classList.remove(\"hidden\"),l.forEach(e=>{c||window.scrollY>50?(e.classList.remove(\"text-white\"),e.classList.add(\"text-black\")):(e.classList.remove(\"text-black\"),e.classList.add(\"text-white\"))})):(t.classList.remove(\"bg-white\",\"shadow-lg\",\"text-black\"),t.classList.add(\"bg-transparent\",\"text-white\"),n.classList.remove(\"hidden\"),o.classList.add(\"hidden\"),d.classList.remove(\"hidden\"),a.classList.add(\"hidden\"),l.forEach(e=>{c||window.scrollY>50?(e.classList.remove(\"text-white\"),e.classList.add(\"text-black\")):(e.classList.remove(\"text-black\"),e.classList.add(\"text-white\"))}))});const m=document.getElementById(\"languageToggle\"),i=document.getElementById(\"flagIcon\"),r=document.getElementById(\"srText\");let s=\"es\";m?.addEventListener(\"click\",()=>{s=s===\"es\"?\"en\":\"es\",s===\"es\"?(i.textContent=\"🇪🇸\",r.textContent=\"Cambiar a inglés\",window.location.href=\"\"):(i.textContent=\"🇺🇸\",r.textContent=\"Cambiar a español\",window.location.href=\"/\")});"],["/Users/innovalink/Documents/GitHub/DowntownSite/src/components/Facilities.astro?astro&type=script&index=0&lang.ts","const s=document.getElementById(\"carousel\"),a=document.getElementById(\"indicators\")?.children,c=s.children.length;let t=0;function r(){s.style.transform=`translateX(-${t*100}%)`,Array.from(a).forEach((e,l)=>{e.classList.toggle(\"bg-gray-800\",l===t),e.classList.toggle(\"bg-gray-400\",l!==t),e.addEventListener(\"click\",()=>{t=l,r()})})}setInterval(()=>{t=(t+1)%c,r()},3e3);r();"],["/Users/innovalink/Documents/GitHub/DowntownSite/src/components/Header.astro?astro&type=script&index=0&lang.ts","window.addEventListener(\"scroll\",function(){const t=document.getElementById(\"navbar\"),n=document.getElementById(\"logob\"),o=document.getElementById(\"logon\"),d=document.getElementById(\"burger-white\"),a=document.getElementById(\"burger-black\"),l=document.querySelectorAll(\".menu-link\"),c=window.innerWidth<768;window.scrollY>50?(t.classList.remove(\"bg-transparent\",\"text-white\"),t.classList.add(\"bg-white\",\"shadow-lg\",\"text-black\"),n.classList.add(\"hidden\"),o.classList.remove(\"hidden\"),d.classList.add(\"hidden\"),a.classList.remove(\"hidden\"),l.forEach(e=>{c||window.scrollY>50?(e.classList.remove(\"text-white\"),e.classList.add(\"text-black\")):(e.classList.remove(\"text-black\"),e.classList.add(\"text-white\"))})):(t.classList.remove(\"bg-white\",\"shadow-lg\",\"text-black\"),t.classList.add(\"bg-transparent\",\"text-white\"),n.classList.remove(\"hidden\"),o.classList.add(\"hidden\"),d.classList.remove(\"hidden\"),a.classList.add(\"hidden\"),l.forEach(e=>{c||window.scrollY>50?(e.classList.remove(\"text-white\"),e.classList.add(\"text-black\")):(e.classList.remove(\"text-black\"),e.classList.add(\"text-white\"))}))});const m=document.getElementById(\"languageToggle\"),i=document.getElementById(\"flagIcon\"),r=document.getElementById(\"srText\");let s=\"es\";m?.addEventListener(\"click\",()=>{s=s===\"es\"?\"en\":\"es\",s===\"es\"?(i.textContent=\"🇪🇸\",r.textContent=\"Cambiar a inglés\",window.location.href=\"\"):(i.textContent=\"🇺🇸\",r.textContent=\"Cambiar a español\",window.location.href=\"/en\")});"],["/Users/innovalink/Documents/GitHub/DowntownSite/src/components/HeaderSections.astro?astro&type=script&index=0&lang.ts","document.querySelector('a[href=\"#About\"]').addEventListener(\"click\",function(e){e.preventDefault(),document.querySelector(\"#About\").scrollIntoView({behavior:\"smooth\",block:\"start\"})});"],["/Users/innovalink/Documents/GitHub/DowntownSite/src/components/en/HeaderSections.astro?astro&type=script&index=0&lang.ts","document.querySelector('a[href=\"#About\"]').addEventListener(\"click\",function(e){e.preventDefault(),document.querySelector(\"#About\").scrollIntoView({behavior:\"smooth\",block:\"start\"})});"]],"assets":["/_astro/blog.BmzlCzLY.jpg","/_astro/whatsapp.BtCgz4Tn.png","/_astro/fondoPrincipal.DLJ4W88U.png","/_astro/car.Cutmbi6f.png","/_astro/wifi.BQHSlT-m.png","/_astro/bar.Bsrk4Bg4.png","/_astro/pool.CQHLglZ1.png","/_astro/fortunaCentro.0KXOJrZd.jpg","/_astro/slogan.DXGr3KAP.png","/_astro/AreaPiscina.R_vtd-a4.png","/_astro/volcanArenal.DgdU_FEt.jpg","/_astro/burger-black.C6_uy6mL.svg","/_astro/burger-white.CogLZv92.svg","/_astro/logoBlancoDowntown.BuBMhxhY.png","/_astro/espannol.BzLFkHiC.png","/_astro/NUWAlog.EGhvAmRy.png","/_astro/logoNegroDowntown.BcoFmeMO.png","/_astro/laventanita.CKI737MA.png","/_astro/logomaria.BpgTFO8S.png","/_astro/logoSelvaNegra.CdP1osdu.png","/_astro/logoDesayuno.D_0Y7_Ai.png","/_astro/chateaubriand.CF2wM1aC.jpg","/_astro/coctelSelvaNegra.D2eKFRPp.jpg","/_astro/cenaMariaBonita.CHXoH3Qe.jpg","/_astro/salonRestaurante.CSU8K-jr.jpg","/_astro/barraSelvaNegra.DfkkogSq.jpg","/_astro/NUWA.D73rN41E.png","/_astro/NuwaGallery.CpWEwuxd.jpg","/_astro/Icono.BqddpVGw.png","/_astro/fondoTours.wzlw-j8E.png","/_astro/mariaAmanidades.DZoY47i4.jpg","/_astro/choripan.CfooS36S.jpg","/_astro/hamburguesaMB.bn84kMBO.jpg","/_astro/Rafting.jQoPRg_L.jpg","/_astro/ingles.y2wgAIXV.png","/_astro/instagram.BT1rpC5A.png","/_astro/facebook.ejnf6rkB.png","/_astro/location.CPjVGrhM.png","/_astro/phone.CHCzlVck.png","/_astro/world.C1Y3oEZH.png","/_astro/logoNuwaBlanco.Cnp3hhTm.png","/_astro/mail.D4zb9bkW.png","/_astro/logoTierraGBlanco.CLw4sA3v.png","/_astro/logoPintoeGalloBlanco.DMqJsLv-.png","/_astro/logoTropicalExpBlanco.Bhm28jiw.png","/_astro/logoLavaDrinksBlanco.m7qogGL5.png","/_astro/SNBlanco.N6DATV_A.png","/_astro/logoMariaBonitaBlanco.C7kPZkFY.png","/_astro/flecha.BYp4F-0z.png","/_astro/cross.D-GX80ll.jpg","/_astro/selvaAmenidades.DoZ-rl9d.jpg","/_astro/logoVentanitaBlanco.CJLuf4UT.png","/_astro/burrito.DAfJAEgX.jpg","/_astro/tripadvisor.DknBEDvp.png","/_astro/google.J5uAsOp1.png","/_astro/tripadvisorlog.C2NnFRh8.png","/_astro/expedia.lEn81l4B.png","/_astro/booking.C-GJGU9G.png","/_astro/googleIcon.BqwKF-Om.png","/_astro/expediaIcon.DSKdaAWR.png","/_astro/bookingIcon.CWaatkaW.png","/_astro/pancake.oNNoBcPP.jpg","/_astro/NuwaGallery2.DrwSIZ0n.jpg","/_astro/blog.BbY0pJwR.css","/_astro/index.B70B_x-U.css","/_astro/index.Bhkvr8Sv.css","/Icono.png","/favicon.svg","/fondo1.png","/fondomovil.png","/icon.svg","/packages.json","/packagesEN.json","/robot.txt","/rooms.json","/roomsEN.json","/en/packagesEN.json","/en/roomsEN.json","/_astro/CarruselPackages.BulX9sMs.js","/_astro/CarruselPackages.C2PD4VX2.js","/_astro/CarruselRooms.CtzarM0v.js","/_astro/CarruselRooms.DQbbqayn.js","/_astro/Reviews.astro_astro_type_script_index_0_lang.CAK-Q5kD.js","/_astro/Reviews.astro_astro_type_script_index_0_lang.DLZiGPEz.js","/_astro/chevron-right.C6xlje_l.js","/_astro/client.BXWm451Q.js","/_astro/index.DK-fsZOb.js","/_astro/navigation.CyeAL8fK.js","/_astro/navigation.vHIubPVI.css","/404.html","/blog/index.html","/en/index.html","/index.html"],"i18n":{"fallbackType":"redirect","strategy":"pathname-prefix-other-locales","locales":["es","en"],"defaultLocale":"es","domainLookupTable":{}},"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"+XTjSwiukLTkpmEnuQOgwfjbUr2MEPjzoVZX24x7kAE=","sessionConfig":{"driver":"fs-lite","options":{"base":"/Users/innovalink/Documents/GitHub/DowntownSite/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
