import { ComponentPair } from "../elements-list.model";
import { ArrangeTypeEnum } from "../enums/arrange-type.enum";
import { ColorEnum } from "../enums/color.enum";

export interface AsideStructure {
    backgroundColor: ColorEnum,
    sectionArrange: ArrangeTypeEnum,
    listSize: number,
    elements: ComponentPair[]
};
