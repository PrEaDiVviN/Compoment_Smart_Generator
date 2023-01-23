import { PositionEnum } from "../enums/position.enum";
import { SizeEnum } from "../enums/size.enum";

export interface ImageComponent {
	position: PositionEnum
	source: string,
    size: SizeEnum,
};
