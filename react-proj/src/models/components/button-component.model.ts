import { ButtonTypeEnum } from "../enums/button-type.enum";
import { SizeEnum } from "../enums/size.enum";

export interface ButtonComponent {
    disabled: boolean,
	image: string,
	size: SizeEnum,
	type: ButtonTypeEnum,
};
