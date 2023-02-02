import { ColorEnum } from "./enums/color.enum"
import { DecorationEnum } from "./enums/decoration.enum"
import { FontStyleEnum } from "./enums/font-style.enum"
import { SizeEnum } from "./enums/size.enum"

export interface TextProperties {
    fontColor: ColorEnum,
	fontStyle: FontStyleEnum,
	fontSize: SizeEnum,
	fontDecoration: DecorationEnum
};
