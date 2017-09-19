"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
let postcss;
class PostCSSPluginClass {
    constructor(processors = [], options = {}) {
        this.processors = processors;
        this.options = options;
        this.test = /\.css$/;
        this.dependencies = [];
    }
    init(context) {
        context.allowExtension(".css");
    }
    transform(file) {
        file.addStringDependency("fuse-box-css");
        if (file.isCSSCached("postcss")) {
            return;
        }
        file.bustCSSCache = true;
        file.loadContents();
        const _a = this.options, { sourceMaps = true, paths = [] } = _a, postCssOptions = __rest(_a, ["sourceMaps", "paths"]);
        paths.push(file.info.absDir);
        const cssDependencies = file.context.extractCSSDependencies(file, {
            paths: paths,
            content: file.contents,
            extensions: ["css"]
        });
        if (!postcss) {
            postcss = require("postcss");
        }
        return postcss(this.processors)
            .process(file.contents, postCssOptions)
            .then(result => {
            file.contents = result.css;
            if (file.context.useCache) {
                file.analysis.dependencies = cssDependencies;
                file.context.cache.writeStaticCache(file, sourceMaps && file.sourceMap, "postcss");
                file.analysis.dependencies = [];
            }
            return result.css;
        });
    }
}
exports.PostCSSPluginClass = PostCSSPluginClass;
function PostCSS(processors, opts) {
    if (Array.isArray(processors)) {
        const options = extractPlugins(opts);
        return new PostCSSPluginClass(processors.concat(options.plugins), options.postCssOptions);
    }
    const options = extractPlugins(processors);
    return new PostCSSPluginClass(options.plugins, options.postCssOptions);
}
exports.PostCSS = PostCSS;
function extractPlugins(opts) {
    const _a = opts || {}, { plugins = [] } = _a, otherOptions = __rest(_a, ["plugins"]);
    if (plugins.length > 0) {
        console.warn(`The postcss "plugin" option is deprecated. Please use PostCssPlugin(plugins, options) instead.`);
    }
    return {
        plugins,
        postCssOptions: otherOptions
    };
}

//# sourceMappingURL=PostCSSPlugin.js.map
