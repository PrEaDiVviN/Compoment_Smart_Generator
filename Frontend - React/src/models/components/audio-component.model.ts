import { SizeEnum } from "../enums/size.enum";

export interface AudioComponent {
	audioLength: number,
    looped: boolean,
	source: string,
    size: SizeEnum,
};
