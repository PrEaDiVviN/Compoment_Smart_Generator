import { ColorEnum } from "../enums/color.enum";
import { SizeEnum } from "../enums/size.enum";

export interface PhotoGalleryComponent {
	backgroundColor: ColorEnum,
	images: string[],
	photoNumber: number,
    size: SizeEnum,
};
