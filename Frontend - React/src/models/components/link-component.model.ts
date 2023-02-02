import { ColorEnum } from "../enums/color.enum";
import { TextProperties } from "../text-properties.model";

export interface LinkComponent {
    backgroundColor: ColorEnum,
	reference: string,
	text: string,
	textProperties: TextProperties,
};
