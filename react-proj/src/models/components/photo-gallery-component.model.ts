import { ColorEnum } from "../enums/color.enum";
import { PositionEnum } from "../enums/position.enum";
import { SizeEnum } from "../enums/size.enum";

export interface PhotoGalleryComponent {
	backgroundColor: ColorEnum,
	images: string[],
	photoNumber: number,
	position: PositionEnum,
    size: SizeEnum,
};
