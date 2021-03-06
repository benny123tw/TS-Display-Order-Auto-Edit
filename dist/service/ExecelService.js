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
exports.ExecelService = void 0;
const Service_1 = require("./Service");
const xlsx = __importStar(require("xlsx"));
class ExecelService extends Service_1.Service {
    constructor(config) {
        super(config);
    }
    /**
     * Synchronously reads the entire contents of the Rules execel file.
     * @param path - A path to a file. Default path: `config.execel.path`.
     * @param options - nothing in here :(
     */
    readFileSync(path = this.execel.path, options) {
        if (!path)
            throw new Error("Invalid path");
        const file = xlsx.readFile(path);
        let sheetNameArr = this.execel.sheets.length ?
            this.execel.sheets : [file.SheetNames[0]];
        let result = [];
        for (let sheetName of sheetNameArr) {
            const sheet = file.Sheets[sheetName];
            const data = xlsx.utils.sheet_to_json(sheet);
            result = result.concat(data);
        }
        return this.addTemplateType(result);
    }
    /**
     * Return new `Rule` array of demand
     * @param data - Original execel file
     */
    addTemplateType(data) {
        let type = "0";
        let ruleArr = [];
        for (let item of data) {
            if (item.?????? && isNaN(item.??????))
                type = this.templateTypeItems.find(i => i.name === item.??????)?.value ?? type;
            if (item.???????????? !== "??????" || !item.????????????)
                continue;
            item['????????????'] = String(type);
            ruleArr.push(item);
        }
        return ruleArr;
    }
}
exports.ExecelService = ExecelService;
