import { AudioComponent } from "./audio-component.model";
import { ButtonComponent } from "./button-component.model";
import { CalendarComponent } from "./calendar-component.model";
import { HeadingComponent } from "./heading-component.model";
import { ImageComponent } from "./image-component.model";
import { InputComponent } from "./input-component.model";
import { LinkComponent } from "./link-component.model";
import { ParagraphComponent } from "./paragraph-component.model";
import { PhotoGalleryComponent } from "./photo-gallery-component.model";
import { ProfileComponent } from "./profile-component.model";
import { SliderComponent } from "./slider-component.model";
import { VideoComponent } from "./video-component.model";

export interface GenericComponent {
    [component: string]: 
        AudioComponent |
        ButtonComponent |
        CalendarComponent |
        HeadingComponent |
        ImageComponent |
        InputComponent |
        LinkComponent |
        ParagraphComponent |
        PhotoGalleryComponent |
        ProfileComponent |
        SliderComponent |
        VideoComponent
}
