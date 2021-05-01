import * as fs from "fs";

// Compare template type
const typeSort = (a: any, b: any) => {
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
const orderByType = (file: ModuleInfo) => file.Templates.sort(typeSort);

/**
 * Sort by template type and display order then save the file.
 * @param file - ModuleInfo.json
 */
export function moduleInfoSorter(file: ModuleInfo, output: string): void {

    // Sort the file
    orderByType(file);

    // normolize the path
    output = simplifyPath(output);

    if (!output.endsWith('.json')) output += '.json';

    const sPath: string[] = output.split('/');
    const FILE_NAME: string | undefined = sPath.pop() ?? "NEW-ModuleInfo.json";
    const PATH: string = sPath.join('/') + '/';

    if (PATH.length > 1 && !fs.existsSync(PATH)) fs.mkdirSync(PATH, { recursive: true });

    // make 2 space to json
    fs.writeFileSync(PATH + FILE_NAME, JSON.stringify(file, null, 2));
};

/**
 * simple normalize Path
 * @param {string} path
 * @return {string}
 */
const simplifyPath = (path: string) => {
    const stack: string[] = [];
    const sPath: string[] = path.split('/');

    for (let i = 0; i < sPath.length; i++) {
        if (sPath[i] == '.' || sPath[i] == '') continue;
        if (sPath[i] == '..') stack.pop();
        else stack.push(sPath[i]);
    }

    return './' + stack.join('/');
};