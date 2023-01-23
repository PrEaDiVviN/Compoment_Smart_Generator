import tailwindStyles from '../../styling/tailwind-styles.module.scss';
import { ListStructure } from "../../models/structures/list-structure.model";
import { Structure } from "../../models/structures/structure.model";
import { TableStructure } from "../../models/structures/table-structure.model";
import { ArrangeTypeEnum } from '../../models/enums/arrange-type.enum';
import { ComponentPair } from '../../models/elements-list.model';
import React from 'react';
import { AudioComponent } from '../../models/components/audio-component.model';
import { ButtonComponent } from '../../models/components/button-component.model';
import { CalendarComponent } from '../../models/components/calendar-component.model';
import { HeadingComponent } from '../../models/components/heading-component.model';
import { ImageComponent } from '../../models/components/image-component.model';
import { InputComponent } from '../../models/components/input-component.model';
import { LinkComponent } from '../../models/components/link-component.model';
import { ParagraphComponent } from '../../models/components/paragraph-component.model';
import { PhotoGalleryComponent } from '../../models/components/photo-gallery-component.model';
import { ProfileComponent } from '../../models/components/profile-component.model';
import { SliderComponent } from '../../models/components/slider-component.model';
import { VideoComponent } from '../../models/components/video-component.model';
import { ComponentNameEnum } from '../../models/enums/component-name.enum';
import * as componentGenerator from './component-generator';
import { GenericComponent } from '../../models/components/generic-component.model';

const style = (...names: string[]): string => {
    return names.reduce((full, name) => `${full} ${tailwindStyles[`${name}`]}`, '');
}

export const buildStructure = (section: Structure) => {
    const bgColor = section.backgroundColor.toLowerCase();
    const arrangement = section.sectionArrange ? section.sectionArrange.toLowerCase() : ArrangeTypeEnum.HORITANLTALLY;
    return (
        <div className={style(`full`, `bg-${bgColor}`, `arrange-${arrangement}`)}>
            {
                section.elements.map((pair: ComponentPair) => buildComponentFromPair(pair))
            }
        </div>
    );
}

export const buildList = (section: ListStructure) => {
    const bgColor = section.backgroundColor.toLowerCase();
    const listMarkerType = section.listMarker
    return (
        <div className={style('full', 'list', `bg-${bgColor}`, `list-marker-${listMarkerType}`)}>
            {
                section.elements.map((pair: ComponentPair) => (
                    <li>
                        <div className={style('inline-flex')}>
                            {
                                buildComponentFromPair(pair)
                            }
                        </div>
                    </li>
                ))
            }
        </div>
    );
}

export const buildTable = (section: TableStructure) => {
    const bgColor = section.backgroundColor.toLowerCase();
    const linesNr = section.numberLines;
    const columsNr = section.numberColumns;
    const borderColor = section.borderColor.toLowerCase();
    const borderStyle = section.borderStyle.toLowerCase();
    const borderWidth = section.borderWidth;
    return (
        <div className={style('full', `bg-${bgColor}`)}>
            <div className={style('table', `bg-${bgColor}`, `bd-${borderColor}`, `bd-${borderStyle}`, `no-bd-top-right`)}
                style={{gridTemplateRows: `repeat(${linesNr}, 1fr)`, gridTemplateColumns: `repeat(${columsNr}, 1fr)`}}
            >
                {
                    [...Array(linesNr)].map((e, i) => (
                        // <div key={i} className={style('table-row')}>
                            // {
                                [...Array(columsNr)].map((e, j) => {
                                    // const shownElement = section.matrix[i].length < j ? '' : 
                                    // console.log('\n');
                                    // console.log(section.matrix.length < i);
                                    // console.log(section.matrix[i].length < j);
                                    return <div key={j} className={style('table-cell', `bd-${borderColor}`, `bd-${borderStyle}`, `no-bd-left-bot`)}>
                                        {
                                            i < section.matrix.length && j < section.matrix[i].length ? buildComponentFromGeneric(section.matrix[i][j]) : <p></p>
                                            // ''
                                        }
                                    </div>}
                                )
                            // }
                        // </div>
                    ))
                }
            </div>
        </div>
    );
}

const componentPicker = (element: GenericComponent): JSX.Element => {
    if(element[ComponentNameEnum.AUDIO]) return componentGenerator.buildAudio(element.audio as AudioComponent);
    if(element[ComponentNameEnum.BUTTON]) return componentGenerator.buildButton(element.button as ButtonComponent);
    if(element[ComponentNameEnum.CALENDAR]) return componentGenerator.buildCalendar(element.calendar as CalendarComponent);
    if(element[ComponentNameEnum.HEADING]) return componentGenerator.buildHeading(element.heading as HeadingComponent);
    if(element[ComponentNameEnum.IMAGE]) return componentGenerator.buildImage(element.image as ImageComponent);
    if(element[ComponentNameEnum.INPUT]) return componentGenerator.buildInput(element.input as InputComponent);
    if(element[ComponentNameEnum.LINK]) return componentGenerator.buildLink(element.link as LinkComponent);
    if(element[ComponentNameEnum.PARAGRAPH]) return componentGenerator.buildParagraph(element.paragraph as ParagraphComponent);
    if(element[ComponentNameEnum.PHOTO_GALLERY]) return componentGenerator.buildPhotoGallery(element.photoGallery as PhotoGalleryComponent);
    if(element[ComponentNameEnum.PROFILE]) return componentGenerator.buildProfile(element.profile as ProfileComponent);
    if(element[ComponentNameEnum.SLIDER]) return componentGenerator.buildSlider(element.slider as SliderComponent);
    if(element[ComponentNameEnum.VIDEO]) return componentGenerator.buildVideo(element.video as VideoComponent);
    return (
        <p style={{color: 'red', fontWeight: 'bold'}}>### COMPONENT NOT FOUND ###</p>
    );
}

const buildComponentFromPair = (element: ComponentPair) => {
    return (
        <React.Fragment>
            {
                [...Array(element.apparitions)].map((e, i) => componentPicker(element.element))
            }
        </React.Fragment>
    );
}

const buildComponentFromGeneric = (component: GenericComponent) => {
    return (
        <React.Fragment>
            {
                componentPicker(component)
            }
        </React.Fragment>
    );
}
