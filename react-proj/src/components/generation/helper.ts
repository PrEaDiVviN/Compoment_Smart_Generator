import { ComponentPair } from '../../models/elements-list.model';
import { ArrangeTypeEnum } from '../../models/enums/arrange-type.enum';
import { PositionEnum } from '../../models/enums/position.enum';
import tailwindStyles from '../../styling/tailwind-styles.module.scss';

export const style = (...names: string[]): string => {
    return names.reduce((full, name) => `${full} ${tailwindStyles[`${name}`]}`, '');
}

export const repositionElements = (elements: ComponentPair[], arrangement: ArrangeTypeEnum) => {
    for(let i = 0; i < elements.length; i++) {
        if(arrangement === ArrangeTypeEnum.HORITANLTALLY) {
            if(elements[i].position === PositionEnum.RIGHT) elements[i].position = PositionEnum.DEFAULT;
            else if(i > 0 && elements[i].position === PositionEnum.LEFT) swapElements(elements, i - 1, i);
        }
        if(arrangement === ArrangeTypeEnum.VERTICALLY) {
            if(elements[i].position === PositionEnum.BELOW) elements[i].position = PositionEnum.DEFAULT;
            else if(i > 0 && elements[i].position === PositionEnum.ABOVE) swapElements(elements, i - 1, i);
        }
    }
}

const swapElements = (array: ComponentPair[], i1: number, i2: number) => {
    let temp = array[i1];
    array[i1] = array[i2];
    array[i2] = temp;
    array[i2].position = PositionEnum.DEFAULT;
}
