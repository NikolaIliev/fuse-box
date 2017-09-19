"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let less;
class LESSPluginClass {
    constructor(options = {}) {
        this.test = /\.less$/;
        this.options = options;
    }
    init(context) {
        context.allowExtension(".less");
    }
    transform(file) {
        file.addStringDependency("fuse-box-css");
        if (file.isCSSCached("less")) {
            return;
        }
        const context = file.context;
        const options = Object.assign({}, this.options);
        file.loadContents();
        const sourceMapDef = {
            sourceMapBasepath: ".",
            sourceMapRootpath: file.info.absDir,
        };
        if (!less) {
            less = require("less");
        }
        options.filename = file.context.homeDir + (options.filename || file.info.fuseBoxPath);
        if ("sourceMapConfig" in context) {
            options.sourceMap = Object.assign({}, sourceMapDef, options.sourceMap || {});
        }
        let paths = [file.info.absDir];
        if (Array.isArray(options.paths)) {
            paths = options.paths.concat(paths);
        }
        options.paths = paths;
        const cssDependencies = file.context.extractCSSDependencies(file, {
            paths: options.paths,
            content: file.contents,
            sassStyle: true,
            extensions: ["less", "css"]
        });
        return less.render(file.contents, options).then(output => {
            if (output.map) {
                file.sourceMap = output.map;
            }
            file.contents = output.css;
            if (context.useCache) {
                file.analysis.dependencies = cssDependencies;
                context.cache.writeStaticCache(file, file.sourceMap, "less");
                file.analysis.dependencies = [];
            }
        }).catch(err => {
            file.contents = "";
            file.addError(`${err.message}\n      at ${err.filename}:${err.line}:${err.column}`);
        });
    }
}
exports.LESSPluginClass = LESSPluginClass;
exports.LESSPlugin = (opts) => {
    return new LESSPluginClass(opts);
};

//# sourceMappingURL=LESSPlugin.js.map
