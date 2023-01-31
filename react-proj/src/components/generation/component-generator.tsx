import { AudioComponent } from "../../models/components/audio-component.model";
import { ButtonComponent } from "../../models/components/button-component.model";
import { CalendarComponent } from "../../models/components/calendar-component.model";
import { HeadingComponent } from "../../models/components/heading-component.model";
import { ImageComponent } from "../../models/components/image-component.model";
import { InputComponent } from "../../models/components/input-component.model";
import { LinkComponent } from "../../models/components/link-component.model";
import { ParagraphComponent } from "../../models/components/paragraph-component.model";
import { PhotoGalleryComponent } from "../../models/components/photo-gallery-component.model";
import { ProfileComponent } from "../../models/components/profile-component.model";
import { SliderComponent } from "../../models/components/slider-component.model";
import { VideoComponent } from "../../models/components/video-component.model";
import { InputTypeEnum } from "../../models/enums/input-type.enum";
import { buttonTexts } from "../../constants";
import { style } from "./helper";
import { FaSearch } from 'react-icons/fa';
import { AiOutlineDoubleLeft } from 'react-icons/ai';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { ColorEnum } from "../../models/enums/color.enum";
import { ButtonTypeEnum } from "../../models/enums/button-type.enum";

export const buildAudio = (element: AudioComponent, index: number) => {
    const size = element.size;
    return (
        <audio className={style(`audio-${size}`)} controls key={index}>
            <source src={element.source} />
            Your browser does not support the audio element.
        </audio>
    );
}
export const buildButton = (element: ButtonComponent, index: number) => {
    const size = element.size;
    return (
        <div key={index}
            className={style('button', `button-${size}`, `button-${element.disabled ? 'disabled' : element.type}`)}
            style={
                element.type === ButtonTypeEnum.NONE ? {
                    backgroundImage: `url(${element.image})`
                } : {}
            }
        >
            <span className={style('button-span')}>
                { buttonTexts[element.type] }
            </span>
            <div className={style('button-overlay-1')}>
                <span>
                    { buttonTexts[element.type] }
                </span>
            </div>
            <div className={style('button-overlay-2')}>
                <span>
                    { buttonTexts[element.type] }
                </span>
            </div>
        </div>
    );
}
export const buildCalendar = (element: CalendarComponent, index: number) => {
    const size = element.size;
    return (
        <input key={index} type="date" className={style('calendar', `cal-${size}`)} />
    );
}
export const buildHeading = (element: HeadingComponent, index: number) => {
    const color = element.textProperties.fontColor;
    const decoration = element.textProperties.fontDecoration;
    const size = element.textProperties.fontSize;
    const fontStyle = element.textProperties.fontStyle;
    const bgColor = element.backgroundColor;
    return (
        <h2 key={index} className={style(`bg-${bgColor}`, 'radius', 't-pad')}>
            <span className={style(`font-color-${color}`, `font-dec-${decoration}`, `font-size-${size}`, `font-style-${fontStyle}`)}>

            {
                element.text
            }
            </span>
        </h2>
    );
}
export const buildImage = (element: ImageComponent, index: number) => {
    const size = element.size;
    return (
        <img key={index} className={style('image', 'radius', `img-${size}`)} src={element.source} alt='' />
    );
}
export const buildInput = (element: InputComponent, index: number) => {
    const isSearch = element.type === InputTypeEnum.SEARCH;
    return (
        <label key={index} className={style('text-input-container')}>
            <div className={style('text-input-container-wrapper')}>
                <input type="text" className={style('text-input')} />
                {
                    isSearch ? <FaSearch className={style('text-input-icon')} /> : ''
                }
                <div className={style('text-input-line')}></div>
            </div>
        </label>
    );
}
export const buildLink = (element: LinkComponent, index: number) => {
    const color = element.textProperties.fontColor;
    const decoration = element.textProperties.fontDecoration;
    const size = element.textProperties.fontSize;
    const fontStyle = element.textProperties.fontStyle;
    const bgColor = element.backgroundColor;
    return (
        <div key={index} className={style(`bg-${bgColor}`, 'link', 'radius', 't-pad')}>
            <a href={element.reference} className={style(`font-color-${color}`, `font-dec-${decoration}`, `font-size-${size}`, `font-style-${fontStyle}`)}>
                {
                    element.text
                }
            </a>
        </div>
    );
}
export const buildParagraph = (element: ParagraphComponent, index: number) => {
    const color = element.textProperties.fontColor;
    const decoration = element.textProperties.fontDecoration;
    const size = element.textProperties.fontSize;
    const fontStyle = element.textProperties.fontStyle;
    const bgColor = element.backgroundColor;
    return (
        <div key={index} className={style(`bg-${bgColor}`, 'radius', 't-pad')}>
            <p className={style('paragraph', `font-color-${color}`, `font-dec-${decoration}`, `font-size-${size}`, `font-style-${fontStyle}`)}>
                {
                    element.text
                }
            </p>
        </div>
    );
}
export const buildPhotoGallery = (element: PhotoGalleryComponent, index: number) => {
	const bgColor = element.backgroundColor;
    const size = element.size;

    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const disabledClassName = 'pg-button-disabled';
    const id = [...Array.of(5)].map((e: number) => letters.charAt(Math.round(Math.random() * letters.length))).join();
    const leftButtonId = 'left-id';
    const rightButtonId = 'right-id';
    const updateButtonsAvailability = () => {
        const leftBtn = document.querySelector(`#${leftButtonId}`);
        const rightBtn = document.querySelector(`#${rightButtonId}`);
        const image = document.querySelector(`#${id}`);
        const imgIndex = parseInt(image ? (image.getAttribute('data-image-index') ?? '0') : '0');

        if(!leftBtn || !rightBtn) return;

        if(imgIndex > 0) {
            leftBtn.classList.remove(disabledClassName);
        } else {
            leftBtn.classList.add(disabledClassName);
        }
        if(imgIndex < element.images.length - 1) {
            rightBtn.classList.remove(disabledClassName);
        } else {
            rightBtn.classList.add(disabledClassName);

        }

    }
    const leftClick = (leftButton: SVGElement) => {
        if(leftButton.classList.contains(disabledClassName)) return;

        const image = document.querySelector(`#${id}`);
        if(!image) return;
        const imgIndex = parseInt(image.getAttribute('data-image-index') ?? '0');

        image.setAttribute('src', element.images[imgIndex - 1]);
        image.setAttribute('data-image-index', (imgIndex - 1).toString());

        updateButtonsAvailability();
    }
    const rightClick = (rightButton: SVGElement) => {
        if(rightButton.classList.contains(disabledClassName)) return;

        const image = document.querySelector(`#${id}`);
        if(!image) return;
        const imgIndex = parseInt(image.getAttribute('data-image-index') ?? '0');

        image.setAttribute('src', element.images[imgIndex + 1]);
        image.setAttribute('data-image-index', (imgIndex + 1).toString());

        updateButtonsAvailability();
    }
    const startIndex = 0;
    const disabledLeft = startIndex === 0 ? disabledClassName : '';
    const disabledRight = startIndex === element.images.length - 1 ? disabledClassName : '';
    return (
        <div key={index} className={style('photo-gallery', `pg-${size}`, `bg-${bgColor}`)}>
            <AiOutlineDoubleLeft
                className={`${style('pg-button', 'pg-left')} ${disabledLeft}`}
                id={leftButtonId}
                onClick={(e) => leftClick(e.currentTarget)}
            />

            <img className={style('image', `img-${size}`)} id={id} src={element.images[startIndex]} alt="" data-image-index={startIndex} />

            <AiOutlineDoubleRight
                className={style('pg-button', 'pg-right') + ` ${disabledRight}`}
                id={rightButtonId}
                onClick={(e) => rightClick(e.currentTarget)}
            />
        </div>
    );
}
export const buildProfile = (element: ProfileComponent, index: number) => {
    const color = element.textProperties.fontColor;
    const decoration = element.textProperties.fontDecoration;
    const textSize = element.textProperties.fontSize;
    const fontStyle = element.textProperties.fontStyle;
    const bgColor = element.backgroundColor;
    const size = element.size;
    return (
        <div key={index} className={style('profile', 'radius', `bg-${bgColor}`, `profile-${size}`)}>
            <img className={style('profile-image', `bd-${color}`)} src={element.source} alt="" />
            <span className={style(`font-color-${color}`, `font-dec-${decoration}`, `font-size-${textSize}`, `font-style-${fontStyle}`)}>
                { element.text }
            </span>
        </div>
    );  
}
export const buildSlider = (element: SliderComponent, index: number) => {
    const bgColor = element.backgroundColor;
    return (
        <div key={index} className={style('flex', 'radius', 't-pad', `bg-${bgColor}`)}>
            <input className={style('slider', bgColor === ColorEnum.BLACK ? 'filter-inverted' : '')} type="range" name="slider" />
        </div>
    );
}
export const buildVideo = (element: VideoComponent, index: number) => {
	// const quality = element.quality;
	// const videoLength = element.videoLength;
    const size = element.size;
    return (
        <video key={index} className={style('radius', `video-${size}`)} controls loop={element.looped}>
            <source src={element.source} />

        </video>
    );
}
