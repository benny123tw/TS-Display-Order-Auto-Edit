import * as fs from "fs";
import {Service} from './Service';

export class TemplateService extends Service {

    private _docType!: string[];

    constructor(config: Config) {
        super(config);
    }

    /**
     * Synchronously reads the entire contents of the ModuleInfo json file.
     * @param path - A path to a file. Default path: `config.json`.
     * @param options - nothing in here :(
     */
    readFileSync(path: string = this.json, options?: any): ModuleInfo {

        if (!path) throw new Error("Invalid path");

        const file:ModuleInfo = JSON.parse(fs.readFileSync(path, { encoding: "utf-8" }).replace(/^\uFEFF/, ''));

        this.getDocType(file);

        return file;
    }

    /**
     * Get the full document type from ModuleInfo
     * @param file - ModuleInfo 
     */
    private getDocType(file: ModuleInfo): void {
        this._docType = file.Templates.map(template => template.DocumentType + template.SubDocumentType);
    }

    /**
     * Edit display order to current ModuleInfo.
     * @param rules - The `Rules` from execel
     * @param file - The original `ModuleInfo` file
     */
    editDisplayOrder(rules: Rule[], file: ModuleInfo): ModuleInfo {

        if (!rules || !file) throw new Error('Invalid parameters');

        for (let rule of rules) {
            const index = this._docType.indexOf(rule['範本代碼']);
            if (index === -1) continue;

            file.Templates[index].TemplateType = String(rule['範本類別']);
            file.Templates[index].DisplayOrder = Number(rule['序號']);
        }

        return file;
    }
}