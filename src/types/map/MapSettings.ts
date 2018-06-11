import { FormulaLists } from '../creation/FormulaLists';
import { BasicAttrType } from '../BasicAttrType';

export interface MapSettings {
    attributes: BasicAttrType[];
    complexAttributes: FormulaLists[];
    mapName: string;
}
