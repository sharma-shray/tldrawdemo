const CHUNK_PUBLIC_PATH = "server/pages/index.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules_next_591114._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_material_faa2bd._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_system_esm_a46722._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_ae957f._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__660621._.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/pages.js { INNER_PAGE => \"[project]/src/pages/index.tsx [ssr] (ecmascript)\", INNER_DOCUMENT => \"[project]/node_modules/next/document.js [ssr] (ecmascript)\", INNER_APP => \"[project]/node_modules/next/app.js [ssr] (ecmascript)\" } [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
