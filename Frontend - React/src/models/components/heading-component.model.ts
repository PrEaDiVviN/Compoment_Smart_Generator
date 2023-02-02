import { ColorEnum } from "../enums/color.enum";
import { TextProperties } from "../text-properties.model";

export interface HeadingComponent {
	text: string,
	textProperties: TextProperties
    backgroundColor: ColorEnum,
};
