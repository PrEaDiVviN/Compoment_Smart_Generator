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
import { repositionElementsPrimaryAxis, style } from "./helper";

export const buildStructure = (section: Structure) => {
    const bgColor = section.backgroundColor.toLowerCase();
    const arrangement = section.sectionArrange || ArrangeTypeEnum.HORITANLTALLY;
    // TODO arrangements on secondary axis (maybe)
    repositionElementsPrimaryAxis(section.elements, arrangement);
    // const newElementsList = repositionElementsSecondaryAxis(section.elements, arrangement);
    let apparitionsCount = 0;
    return (
        <div vocab="https://schema.org/" typeof="ItemList" className={style(`full`, `bg-${bgColor}`, `arrange-${arrangement}`)}>
            <span className={style('hidden')} property="numberOfItems">{section.listSize}</span>
            {
                section.elements.map((pair: ComponentPair, i: number) => {
                    const tempApparitionsCount = apparitionsCount;
                    apparitionsCount += pair.apparitions;
                    return buildComponentFromPair(pair, tempApparitionsCount);
                })
            }
        </div>
    );
}

export const buildList = (section: ListStructure) => {
    // TODO list arrangements
    const bgColor = section.backgroundColor.toLowerCase();
    const listMarkerType = section.listMarker
    return (
        <div className={style('full', 'list', `bg-${bgColor}`, `list-marker-${listMarkerType}`)}>
            {
                section.elements.map((pair: ComponentPair, i: number) => (
                    <li vocab="https://schema.org/" typeof="ListItem" key={i} className={style('li')}>
                        <span className={style('hidden')} property="position">{i}</span>
                        <span className={style('hidden')} property="item">{JSON.stringify(pair.element)}</span>
                        <div className={style('inline')}>
                            {
                                buildComponentFromPair(pair, 1)
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
            <div vocab="https://schema.org/" typeof="Table" className={style('table', `bg-${bgColor}`, `bd-${borderColor}`, `bd-${borderStyle}`, `bd-${borderWidth}`, 'no-bd-top-right')}
                style={{gridTemplateRows: `repeat(${linesNr}, 1fr)`, gridTemplateColumns: `repeat(${columsNr}, 1fr)`}}
            >
                <span className={style('hidden')} property="dateCreated">{new Date().getFullYear() + '/' + new Date().getMonth() + '/' + new Date().getDay()}</span>
                <span className={style('hidden')} property="size">{linesNr * columsNr}</span>
                <span className={style('hidden')} property="image">{'https://1.bp.blogspot.com/-Z3gIwonB54A/WtOcwFhYxII/AAAAAAAAARE/cIRGmSVZ_HAuuJttImPoi8jRZOVJ3MjWACLcBGAs/s640/firstrow-firstcolumn.png'}</span>
                {
                    [...Array(linesNr)].map((e, i) => (
                        [...Array(columsNr)].map((e, j) => {
                            return <div key={j} className={style('table-cell', `bd-${borderColor}`, `bd-${borderStyle}`, `bd-${borderWidth}`, `no-bd-left-bot`)}>
                                {
                                    i < section.matrix.length && j < section.matrix[i].length ? buildComponentFromGeneric(section.matrix[i][j], i * columsNr + j) : <p></p>
                                }
                            </div>}
                        )
                    ))
                }
            </div>
        </div>
    );
}

const componentPicker = (element: GenericComponent, i: number): JSX.Element => {
    if(element[ComponentNameEnum.AUDIO]) return componentGenerator.buildAudio(element.audio as AudioComponent, i);
    if(element[ComponentNameEnum.BUTTON]) return componentGenerator.buildButton(element.button as ButtonComponent, i);
    if(element[ComponentNameEnum.CALENDAR]) return componentGenerator.buildCalendar(element.calendar as CalendarComponent, i);
    if(element[ComponentNameEnum.HEADING]) return componentGenerator.buildHeading(element.heading as HeadingComponent, i);
    if(element[ComponentNameEnum.IMAGE]) return componentGenerator.buildImage(element.image as ImageComponent, i);
    if(element[ComponentNameEnum.INPUT]) return componentGenerator.buildInput(element.input as InputComponent, i);
    if(element[ComponentNameEnum.LINK]) return componentGenerator.buildLink(element.link as LinkComponent, i);
    if(element[ComponentNameEnum.PARAGRAPH]) return componentGenerator.buildParagraph(element.paragraph as ParagraphComponent, i);
    if(element[ComponentNameEnum.PHOTO_GALLERY]) return componentGenerator.buildPhotoGallery(element.photogallery as PhotoGalleryComponent, i);
    if(element[ComponentNameEnum.PROFILE]) return componentGenerator.buildProfile(element['user profile'] as ProfileComponent, i);
    if(element[ComponentNameEnum.SLIDER]) return componentGenerator.buildSlider(element.slider as SliderComponent, i);
    if(element[ComponentNameEnum.VIDEO]) return componentGenerator.buildVideo(element.video as VideoComponent, i);
    return (
        <p style={{color: 'red', fontWeight: 'bold'}}>### COMPONENT NOT FOUND ###</p>
    );
}

// const buildComponentFromPair = (elementsChunk: ComponentPair[]) => {
const buildComponentFromPair = (element: ComponentPair, apparitionsCount: number) => {
    if(!element.element) return '';
    return (
        <React.Fragment key={apparitionsCount}>
            {
                [...Array(element.apparitions)].map((e, i) => componentPicker(element.element, apparitionsCount + i))
            }
            {/* {
                elementsChunk.map((pair: ComponentPair) => 
                    [...Array(pair.apparitions)].map((e, i) => componentPicker(pair.element))
                )
                
            } */}
        </React.Fragment>
    );
}

const buildComponentFromGeneric = (component: GenericComponent, i: number) => {
    return (
        <React.Fragment key={i}>
            {
                component ? componentPicker(component, i + 1000) : ''
            }
        </React.Fragment>
    );
}
