import { ColorEnum } from "../enums/color.enum";
import { SliderTypeEnum } from "../enums/slider-type.enum";

export interface SliderComponent {
    backgroundColor: ColorEnum,
	maxValue: number,
	minValue: number,
    sliderType: SliderTypeEnum,
};
