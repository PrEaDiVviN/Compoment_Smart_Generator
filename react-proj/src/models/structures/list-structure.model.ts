import { ComponentPair } from "../elements-list.model";
import { ColorEnum } from "../enums/color.enum";
import { ListMarkerTypeEnum } from "../enums/list-marker-type.enum";
import { ListTypeEnum } from "../enums/list-type.enum";

export interface ListStructure {
    backgroundColor: ColorEnum,
    listType: ListTypeEnum,
    listMarker: ListMarkerTypeEnum,
    listSize: number,
    elements: ComponentPair[]
};
