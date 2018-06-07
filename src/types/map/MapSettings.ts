import { ComplexAttrType } from '../creation/ComplexAttrType';
import { BasicAttrType } from '../BasicAttrType';
import { BasicAttr } from '../creation/BasicAttr';
import { FormulaLists } from '../creation/FormulaLists';

export interface MapSettings {
    attributes: Array<BasicAttrType>;
    complexAttributes: Array<ComplexAttrType>;
}
