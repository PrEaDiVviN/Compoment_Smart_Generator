import { ButtonTypeEnum } from "../enums/button-type.enum";
import { PositionEnum } from "../enums/position.enum";
import { SizeEnum } from "../enums/size.enum";

export interface ButtonComponent {
    disabled: boolean,
	image: string,
	position: PositionEnum
	size: SizeEnum,
	type: ButtonTypeEnum,
};
