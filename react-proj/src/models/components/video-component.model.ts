import { PositionEnum } from "../enums/position.enum";
import { SizeEnum } from "../enums/size.enum";
import { VideoQualityEnum } from "../enums/video-quality.enum";

export interface VideoComponent {
	looped: boolean,
	position: PositionEnum,
	quality: VideoQualityEnum,
	source: string,
	videoLength: number,
    size: SizeEnum,
};
