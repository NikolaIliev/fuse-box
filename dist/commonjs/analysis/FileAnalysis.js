"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ASTTraverse_1 = require("./../ASTTraverse");
const PrettyError_1 = require("./../PrettyError");
const File_1 = require("../core/File");
const acorn = require("acorn");
const AutoImport_1 = require("./plugins/AutoImport");
const LanguageLevel_1 = require("./plugins/LanguageLevel");
const OwnVariable_1 = require("./plugins/OwnVariable");
const OwnBundle_1 = require("./plugins/OwnBundle");
const ImportDeclaration_1 = require("./plugins/ImportDeclaration");
const DynamicImportStatement_1 = require("./plugins/DynamicImportStatement");
require("acorn-es7")(acorn);
require("acorn-jsx/inject")(acorn);
require('acorn-es7-plugin')(acorn);
const plugins = [AutoImport_1.AutoImport, OwnVariable_1.OwnVariable, OwnBundle_1.OwnBundle, ImportDeclaration_1.ImportDeclaration, DynamicImportStatement_1.DynamicImportStatement, LanguageLevel_1.LanguageLevel];
function acornParse(contents, options) {
    return acorn.parse(contents, Object.assign({}, options || {}, {
        sourceType: "module",
        tolerant: true,
        ecmaVersion: 8,
        plugins: { es7: true, jsx: true, asyncawait: true },
        jsx: { allowNamespacedObjects: true },
    }));
}
exports.acornParse = acornParse;
class FileAnalysis {
    constructor(file) {
        this.file = file;
        this.wasAnalysed = false;
        this.skipAnalysis = false;
        this.bannedImports = {};
        this.nativeImports = {};
        this.requiresRegeneration = false;
        this.requiresTranspilation = false;
        this.fuseBoxVariable = "FuseBox";
        this.dependencies = [];
    }
    astIsLoaded() {
        return this.ast !== undefined;
    }
    loadAst(ast) {
        this.ast = ast;
    }
    skip() {
        this.skipAnalysis = true;
    }
    parseUsingAcorn(options) {
        try {
            this.ast = acornParse(this.file.contents, options);
        }
        catch (err) {
            return PrettyError_1.PrettyError.errorWithContents(err, this.file);
        }
    }
    handleAliasReplacement(requireStatement) {
        if (!this.file.context.experimentalAliasEnabled) {
            return requireStatement;
        }
        const aliasCollection = this.file.context.aliasCollection;
        aliasCollection.forEach(props => {
            if (props.expr.test(requireStatement)) {
                requireStatement = requireStatement.replace(props.expr, `${props.replacement}$2`);
                this.requiresRegeneration = true;
            }
        });
        return requireStatement;
    }
    addDependency(name) {
        this.dependencies.push(name);
    }
    resetDependencies() {
        this.dependencies = [];
    }
    nodeIsString(node) {
        return node.type === "Literal" || node.type === "StringLiteral";
    }
    analyze(traversalOptions) {
        if (this.wasAnalysed || this.skipAnalysis) {
            return;
        }
        if (this.file.collection && this.file.collection.info && this.file.collection.info.jsNext) {
            this.file.es6module = true;
        }
        let traversalPlugins = plugins;
        if (traversalOptions && Array.isArray(traversalOptions.plugins)) {
            traversalPlugins = plugins.concat(traversalOptions.plugins);
        }
        ASTTraverse_1.ASTTraverse.traverse(this.ast, {
            pre: (node, parent, prop, idx) => traversalPlugins.forEach(plugin => plugin.onNode(this.file, node, parent)),
        });
        traversalPlugins.forEach(plugin => plugin.onEnd(this.file));
        this.wasAnalysed = true;
        if (this.requiresRegeneration) {
            this.file.contents = this.file.context.generateCode(this.ast);
        }
        if (this.requiresTranspilation) {
            const target = File_1.ScriptTarget[this.file.context.languageLevel];
            this.file.context.log.magicReason('compiling with typescript to match language target: ' + target, this.file.info.fuseBoxPath);
            const ts = require("typescript");
            let tsconfg = {
                compilerOptions: {
                    module: "commonjs",
                    target
                }
            };
            let result = ts.transpileModule(this.file.contents, tsconfg);
            this.file.contents = result.outputText;
        }
    }
}
exports.FileAnalysis = FileAnalysis;

//# sourceMappingURL=FileAnalysis.js.map
