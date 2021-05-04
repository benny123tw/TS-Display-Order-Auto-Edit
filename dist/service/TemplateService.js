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
exports.TemplateService = void 0;
const fs = __importStar(require("fs"));
const Service_1 = require("./Service");
class TemplateService extends Service_1.Service {
    constructor(config) {
        super(config);
    }
    /**
     * Synchronously reads the entire contents of the ModuleInfo json file.
     * @param path - A path to a file. Default path: `config.json`.
     * @param options - nothing in here :(
     */
    readFileSync(path = this.json, options) {
        if (!path)
            throw new Error("Invalid path");
        const file = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }).replace(/^\uFEFF/, ''));
        this.getDocType(file);
        return file;
    }
    /**
     * Get the full document type from ModuleInfo
     * @param file - ModuleInfo
     */
    getDocType(file) {
        this._docType = file.Templates.map(template => template.DocumentType + template.SubDocumentType);
    }
    /**
     * Edit display order to current ModuleInfo.
     * @param rules - The `Rules` from execel
     * @param file - The original `ModuleInfo` file
     */
    editDisplayOrder(rules, file) {
        if (!rules || !file)
            throw new Error('Invalid parameters');
        for (let rule of rules) {
            const index = this._docType.indexOf(rule['範本代碼']);
            if (index === -1)
                continue;
            file.Templates[index].TemplateType = String(rule['範本類別']);
            file.Templates[index].DisplayOrder = Number(rule['序號']);
        }
        return file;
    }
}
exports.TemplateService = TemplateService;
