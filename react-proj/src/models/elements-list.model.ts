import { GenericComponent } from "./components/generic-component.model";
import { PositionEnum } from "./enums/position.enum";

export interface ComponentPair {
    apparitions: number,
    element: GenericComponent,
    position: PositionEnum
};
