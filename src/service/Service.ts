export class Service {

    readonly json: string;
    readonly execel: Execel;
    readonly templateTypeItems: Array<TemplateTypeItem>
    readonly output: string;

    readonly DEFAULT_OUTPUT: string = "./NEW-ModuleInfo.json";

    constructor(config: Config) {

        if (!config.json) throw new Error ("Missing json file path in config");
        if (!config.execel.path) throw new Error ("Missing execel file path in config");
        if (!config.templateTypeItems.length) throw new Error ("Missing Type Items in config");

        this.json = config.json;
        this.execel = config.execel;
        this.templateTypeItems = config.templateTypeItems;
        this.output = config.output ?? this.DEFAULT_OUTPUT;
    } 

}