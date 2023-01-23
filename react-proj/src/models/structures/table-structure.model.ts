import { GenericComponent } from "../components/generic-component.model";
import { BorderStyleEnum } from "../enums/border-style.enum";
import { BorderEnum } from "../enums/border.enum";
import { ColorEnum } from "../enums/color.enum";

export interface TableStructure {
    backgroundColor: ColorEnum,
    numberLines: number,
    numberColumns: number,
    borderColor: ColorEnum, 
    borderStyle: BorderStyleEnum, 
    borderWidth: BorderEnum, // TODO
    matrix: GenericComponent[][]
};
