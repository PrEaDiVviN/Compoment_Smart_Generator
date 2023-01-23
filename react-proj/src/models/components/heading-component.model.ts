import { ColorEnum } from "../enums/color.enum";
import { PositionEnum } from "../enums/position.enum";
import { TextProperties } from "../text-properties.model";

export interface HeadingComponent {
	position: PositionEnum,
	text: string,
	textProperties: TextProperties
    backgroundColor: ColorEnum,
};
