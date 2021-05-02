"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleInfoSorter = void 0;
const fs = __importStar(require("fs"));
// Compare template type
const typeSort = (a, b) => {
    const templateTypeA = `${a.TemplateType.toUpperCase()}`;
    const templateTypeB = `${b.TemplateType.toUpperCase()}`;
    const orderA = a.DisplayOrder;
    const orderB = b.DisplayOrder;
    return templateTypeA < templateTypeB
        ? -1
        : templateTypeA > templateTypeB
            ? 1
            : orderA - orderB;
};
// Array sort function using custom compare Function
const orderByType = (file) => file.Templates.sort(typeSort);
/**
 * Sort by template type and display order then save the file.
 * @param file - ModuleInfo.json
 */
function moduleInfoSorter(file, output) {
    // Sort the file
    orderByType(file);
    // normolize the path
    output = simplifyPath(output);
    if (!output.endsWith('.json'))
        output += '.json';
    const sPath = output.split('/');
    const FILE_NAME = sPath.pop() ?? "NEW-ModuleInfo.json";
    const PATH = sPath.join('/') + '/';
    if (PATH.length > 1 && !fs.existsSync(PATH))
        fs.mkdirSync(PATH, { recursive: true });
    // make 2 space to json
    fs.writeFileSync(PATH + FILE_NAME, JSON.stringify(file, null, 2));
}
exports.moduleInfoSorter = moduleInfoSorter;
;
/**
 * simple normalize Path
 * @param {string} path
 * @return {string}
 */
const simplifyPath = (path) => {
    const stack = [];
    const sPath = path.split('/');
    for (let i = 0; i < sPath.length; i++) {
        if (sPath[i] == '.' || sPath[i] == '')
            continue;
        if (sPath[i] == '..')
            stack.pop();
        else
            stack.push(sPath[i]);
    }
    return './' + stack.join('/');
};
