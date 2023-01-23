import { PositionEnum } from "../enums/position.enum";
import { SizeEnum } from "../enums/size.enum";

export interface AudioComponent {
	audioLength: number,
    looped: boolean,
	position: PositionEnum
	source: string,
    size: SizeEnum,
};
