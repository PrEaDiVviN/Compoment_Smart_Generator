import { ColorEnum } from "../enums/color.enum";
import { PositionEnum } from "../enums/position.enum";
import { SizeEnum } from "../enums/size.enum";
import { TextProperties } from "../text-properties.model";

export interface ProfileComponent {
	backgroundColor: ColorEnum,
	position: PositionEnum,
	source: string,
    size: SizeEnum,
	text: string,
	textProperties: TextProperties,
};
