"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
class Service {
    constructor(config) {
        this.DEFAULT_OUTPUT = "./NEW-ModuleInfo.json";
        if (!config.json)
            throw new Error("Missing json file path in config");
        if (!config.execel.path)
            throw new Error("Missing execel file path in config");
        if (!config.templateTypeItems.length)
            throw new Error("Missing Type Items in config");
        this.json = config.json;
        this.execel = config.execel;
        this.templateTypeItems = config.templateTypeItems;
        this.output = config.output ?? this.DEFAULT_OUTPUT;
    }
}
exports.Service = Service;
