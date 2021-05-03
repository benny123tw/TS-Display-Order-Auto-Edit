import { Service } from './Service';
import * as xlsx from 'xlsx';

export class ExecelService extends Service {

    constructor(config: Config) {
        super(config);
    }

    /**
     * Synchronously reads the entire contents of the Rules execel file.
     * @param path - A path to a file. Default path: `config.execel.path`.
     * @param options - nothing in here :(
     */
    readFileSync(path: string = this.execel.path, options?: any): Rule[] {

        if (!path) throw new Error("Invalid path");

        const file: xlsx.WorkBook = xlsx.readFile(path);
        let sheetNameArr: string[] =
            this.execel.sheets.length ?
                this.execel.sheets : [file.SheetNames[0]];

        let result: any[] = [];
        for (let sheetName of sheetNameArr) {
            const sheet: xlsx.WorkSheet = file.Sheets[sheetName];
            const data: any[] = xlsx.utils.sheet_to_json(sheet);
            result.concat(data);
        }

        return this.addTemplateType(result);
    }

    /**
     * Return new `Rule` array of demand
     * @param data - Original execel file
     */
    private addTemplateType(data: any[]): Rule[] {
        let type: string = "0";
        let ruleArr: Rule[] = [];

        for (let item of data) {
            if (item.序號 && isNaN(item.序號)) type = this.templateTypeItems.find(i => i.name === item.序號)?.value ?? type;
            if (item.使用需求 !== "使用" || !item.範本代碼) continue;

            item['範本類別'] = String(type);
            ruleArr.push(item);
        }

        return ruleArr;
    }


}