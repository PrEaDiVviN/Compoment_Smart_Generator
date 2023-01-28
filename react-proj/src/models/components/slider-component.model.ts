import { ColorEnum } from "../enums/color.enum";
import { PositionEnum } from "../enums/position.enum";
import { SliderTypeEnum } from "../enums/slider-type.enum";

export interface SliderComponent {
    backgroundColor: ColorEnum,
	maxValue: number,
	minValue: number,
	position: PositionEnum,
    sliderType: SliderTypeEnum,
};
