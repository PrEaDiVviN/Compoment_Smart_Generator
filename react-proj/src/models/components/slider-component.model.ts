import { PositionEnum } from "../enums/position.enum";
import { SliderTypeEnum } from "../enums/slider-type.enum";

export interface SliderComponent {
	maxValue: number,
	minValue: number,
	position: PositionEnum,
    sliderType: SliderTypeEnum,
};
