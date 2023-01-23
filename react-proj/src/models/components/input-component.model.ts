import { ColorEnum } from "../enums/color.enum";
import { InputTypeEnum } from "../enums/input-type.enum";
import { PositionEnum } from "../enums/position.enum";
import { SizeEnum } from "../enums/size.enum";
import { TextProperties } from "../text-properties.model";

export interface InputComponent {
	backgroundColor: ColorEnum,
	position: PositionEnum,
	size: SizeEnum,
	textProperties: TextProperties
    type: InputTypeEnum, 
};
