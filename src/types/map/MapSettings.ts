import { BasicAttr } from '../creation/BasicAttr';
import { ComplexAttrType } from '../creation/ComplexAttrType';

export interface MapSettings {
    attributes: BasicAttr[];
    complexAttr: Array<ComplexAttrType>;
}