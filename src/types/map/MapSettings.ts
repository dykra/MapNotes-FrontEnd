import { BasicAttr } from '../creation/BasicAttr';
import { FormulaLists } from '../creation/FormulaLists';

export interface MapSettings {
    attributes: BasicAttr[];
    complexAttributes: Map<string, FormulaLists>;
}