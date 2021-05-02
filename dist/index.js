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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const ExecelService_1 = require("./service/ExecelService");
const TemplateService_1 = require("./service/TemplateService");
const Sorter_1 = require("./utils/Sorter");
const config = JSON.parse(fs.readFileSync(path.join(process.cwd(), '/config.json'), 'utf8'));
const execelService = new ExecelService_1.ExecelService(config);
const templateService = new TemplateService_1.TemplateService(config);
const rules = execelService.readFileSync();
const moduleInfo = templateService.readFileSync();
templateService.editDisplayOrder(rules, moduleInfo);
Sorter_1.moduleInfoSorter(moduleInfo, config.output);
