import { ColorEnum } from "../enums/color.enum";
import { SizeEnum } from "../enums/size.enum";
import { TextProperties } from "../text-properties.model";

export interface ProfileComponent {
	backgroundColor: ColorEnum,
	source: string,
    size: SizeEnum,
	text: string,
	textProperties: TextProperties,
};
