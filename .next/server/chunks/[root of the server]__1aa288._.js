module.exports = {

"[externals]/next/dist/compiled/next-server/pages-api.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/compiled/next-server/pages-api.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/src/lib/data.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "addImage": (()=>addImage),
    "filterImages": (()=>filterImages),
    "getImages": (()=>getImages),
    "removeImage": (()=>removeImage)
});
let images = [
    {
        id: "data_id_1",
        title: "Book",
        image: "https://fastly.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4",
        keywords: [
            "book",
            "study",
            "pages"
        ],
        uploadDate: new Date("2021-01-01")
    },
    {
        id: "data_id_2",
        title: "Mountains",
        image: "https://fastly.picsum.photos/id/29/4000/2670.jpg?hmac=rCbRAl24FzrSzwlR5tL-Aqzyu5tX_PA95VJtnUXegGU",
        keywords: [
            "mountains",
            "snow",
            "cold"
        ],
        uploadDate: new Date("2022-02-22")
    },
    {
        id: "data_id_3",
        title: "Coffee",
        image: "https://fastly.picsum.photos/id/63/5000/2813.jpg?hmac=HvaeSK6WT-G9bYF_CyB2m1ARQirL8UMnygdU9W6PDvM",
        keywords: [
            "coffee",
            "cup",
            "mug"
        ],
        uploadDate: new Date("2023-12-31")
    }
];
function getImages() {
    return images;
}
function addImage(image) {
    images.push(image);
    return image;
}
function removeImage(id) {
    const imageToRemove = images.find((image)=>image.id === id);
    if (!imageToRemove) return false;
    images = images.filter((image)=>image.id !== id);
    return true;
}
function filterImages(keyword) {
    const loweredKeyword = keyword.toLocaleLowerCase();
    const filteredImages = images.filter((image)=>image.keywords.map((keyword)=>keyword.toLocaleLowerCase()).includes(loweredKeyword) || image.title.toLocaleLowerCase().includes(loweredKeyword));
    return filteredImages;
}
}}),
"[project]/src/pages/api/images.ts [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
__turbopack_esm__({
    "default": (()=>handler)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/lib/data.ts [api] (ecmascript)");
;
function handler(req, res) {
    if (req.method === "GET") {
        const { keyword } = req.query;
        const images = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["getImages"])();
        if (keyword) {
            if (typeof keyword !== "string") {
                res.status(400).json({
                    error: "Invalid keyword"
                });
                return;
            }
            const filteredImages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["filterImages"])(keyword);
            res.status(200).json(filteredImages);
        }
        res.status(200).json(images);
    } else if (req.method === "POST") {
        const { title, image, keywords, uploadDate } = req.body;
        if (!title || !image || !keywords || !uploadDate) {
            res.status(400).json({
                error: "Missing title, image, keywords or upload date"
            });
            return;
        }
        const images = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["getImages"])();
        const id = "data_id_" + (images.length + 1);
        const newImage = {
            id,
            title,
            image,
            keywords,
            uploadDate
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["addImage"])(newImage);
        res.status(201).json(newImage);
    } else if (req.method === "DELETE") {
        const { query } = req;
        const id = query.id;
        const imageFound = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["removeImage"])(id);
        res.status(imageFound ? 200 : 404).end();
    } else {
        res.setHeader("Allow", [
            "GET",
            "POST",
            "DELETE"
        ]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
}}),
"[project]/node_modules/next/dist/esm/server/route-modules/pages-api/module.compiled.js [api] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time truthy", 1) {
        module.exports = __turbopack_require__("[externals]/next/dist/compiled/next-server/pages-api.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api.runtime.dev.js, cjs)");
    } else {
        "TURBOPACK unreachable";
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/esm/server/route-kind.js [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "RouteKind": (()=>RouteKind)
});
var RouteKind = /*#__PURE__*/ function(RouteKind) {
    /**
   * `PAGES` represents all the React pages that are under `pages/`.
   */ RouteKind["PAGES"] = "PAGES";
    /**
   * `PAGES_API` represents all the API routes under `pages/api/`.
   */ RouteKind["PAGES_API"] = "PAGES_API";
    /**
   * `APP_PAGE` represents all the React pages that are under `app/` with the
   * filename of `page.{j,t}s{,x}`.
   */ RouteKind["APP_PAGE"] = "APP_PAGE";
    /**
   * `APP_ROUTE` represents all the API routes and metadata routes that are under `app/` with the
   * filename of `route.{j,t}s{,x}`.
   */ RouteKind["APP_ROUTE"] = "APP_ROUTE";
    /**
   * `IMAGE` represents all the images that are generated by `next/image`.
   */ RouteKind["IMAGE"] = "IMAGE";
    return RouteKind;
}({}); //# sourceMappingURL=route-kind.js.map
}}),
"[project]/node_modules/next/dist/esm/build/templates/helpers.js [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/**
 * Hoists a name from a module or promised module.
 *
 * @param module the module to hoist the name from
 * @param name the name to hoist
 * @returns the value on the module (or promised module)
 */ __turbopack_esm__({
    "hoist": (()=>hoist)
});
function hoist(module, name) {
    // If the name is available in the module, return it.
    if (name in module) {
        return module[name];
    }
    // If a property called `then` exists, assume it's a promise and
    // return a promise that resolves to the name.
    if ('then' in module && typeof module.then === 'function') {
        return module.then((mod)=>hoist(mod, name));
    }
    // If we're trying to hoise the default export, and the module is a function,
    // return the module itself.
    if (typeof module === 'function' && name === 'default') {
        return module;
    }
    // Otherwise, return undefined.
    return undefined;
} //# sourceMappingURL=helpers.js.map
}}),
"[project]/node_modules/next/dist/esm/build/templates/pages-api.js { INNER_PAGE => \"[project]/src/pages/api/images.ts [api] (ecmascript)\" } [api] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "config": (()=>config),
    "default": (()=>__TURBOPACK__default__export__),
    "routeModule": (()=>routeModule)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/route-modules/pages-api/module.compiled.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/route-kind.js [api] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/build/templates/helpers.js [api] (ecmascript)");
// Import the userland code.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$api$2f$images$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/pages/api/images.ts [api] (ecmascript)");
;
;
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$api$2f$images$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'default');
const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$build$2f$templates$2f$helpers$2e$js__$5b$api$5d$__$28$ecmascript$29$__["hoist"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$api$2f$images$2e$ts__$5b$api$5d$__$28$ecmascript$29$__, 'config');
const routeModule = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$modules$2f$pages$2d$api$2f$module$2e$compiled$2e$js__$5b$api$5d$__$28$ecmascript$29$__["PagesAPIRouteModule"]({
    definition: {
        kind: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$route$2d$kind$2e$js__$5b$api$5d$__$28$ecmascript$29$__["RouteKind"].PAGES_API,
        page: "/api/images",
        pathname: "/api/images",
        // The following aren't used in production.
        bundlePath: '',
        filename: ''
    },
    userland: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$pages$2f$api$2f$images$2e$ts__$5b$api$5d$__$28$ecmascript$29$__
}); //# sourceMappingURL=pages-api.js.map
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__1aa288._.js.map