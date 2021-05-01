interface Config {
    json: string;
    execel: Execel;
    templateTypeItems: Array<TemplateTypeItem>;
    output: string;
}

interface TemplateTypeItem {
    value: string;
    name: string;
    defaultTemplate: string;
}

interface Execel {
    sheets: string[];
    path: string;
}