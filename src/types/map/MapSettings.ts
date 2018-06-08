import { FormulaLists } from '../creation/FormulaLists';
import { BasicAttrType } from '../BasicAttrType';

export interface MapSettings {
    attributes: Array<BasicAttrType>;
    complexAttributes: Map<string, FormulaLists>;
}
