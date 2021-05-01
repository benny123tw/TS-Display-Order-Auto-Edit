import * as fs from 'fs';

import {ExecelService} from './service/ExecelService';
import {TemplateService} from './service/TemplateService';
import {moduleInfoSorter} from './utils/Sorter';

const config: Config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));
const execelService = new ExecelService(config);
const templateService = new TemplateService(config);

const rules: Rule[] = execelService.readFileSync();
const moduleInfo: ModuleInfo = templateService.readFileSync();

templateService.editDisplayOrder(rules, moduleInfo);
moduleInfoSorter(moduleInfo, config.output);
