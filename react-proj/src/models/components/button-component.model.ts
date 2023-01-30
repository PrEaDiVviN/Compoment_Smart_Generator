import { ButtonTypeEnum } from "../enums/button-type.enum";
import { PositionEnum } from "../enums/position.enum";
import { SizeEnum } from "../enums/size.enum";

export interface ButtonComponent {
    disabled: boolean, // TODO
	image: string,
	position: PositionEnum
	size: SizeEnum,
	type: ButtonTypeEnum,
};
