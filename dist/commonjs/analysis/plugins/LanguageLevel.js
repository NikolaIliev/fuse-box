"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const File_1 = require("../../core/File");
class LanguageLevel {
    static onNode(file, node, parent) {
        if (node.async === true) {
            file.setLanguageLevel(File_1.ScriptTarget.ES2017);
        }
    }
    static onEnd(file) {
        const target = file.context.languageLevel;
        if (file.languageLevel > target) {
            file.analysis.requiresTranspilation = true;
        }
    }
}
exports.LanguageLevel = LanguageLevel;

//# sourceMappingURL=LanguageLevel.js.map
