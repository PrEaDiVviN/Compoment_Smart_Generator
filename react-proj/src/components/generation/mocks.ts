import { GenericComponent } from "../../models/components/generic-component.model";
import { ComponentPair } from "../../models/elements-list.model";
import { ArrangeTypeEnum } from "../../models/enums/arrange-type.enum";
import { BorderStyleEnum } from "../../models/enums/border-style.enum";
import { BorderEnum } from "../../models/enums/border.enum";
import { ButtonTypeEnum } from "../../models/enums/button-type.enum";
import { ColorEnum } from "../../models/enums/color.enum";
import { DecorationEnum } from "../../models/enums/decoration.enum";
import { FontStyleEnum } from "../../models/enums/font-style.enum";
import { InputTypeEnum } from "../../models/enums/input-type.enum";
import { ListMarkerTypeEnum } from "../../models/enums/list-marker-type.enum";
import { ListTypeEnum } from "../../models/enums/list-type.enum";
import { PositionEnum } from "../../models/enums/position.enum";
import { SectionTypeEnum } from "../../models/enums/section-type.enum";
import { SizeEnum } from "../../models/enums/size.enum";
import { SliderTypeEnum } from "../../models/enums/slider-type.enum";
import { VideoQualityEnum } from "../../models/enums/video-quality.enum";
import { PageStructure } from "../../models/page-structure.model";

export const mockElements: ComponentPair[] = [
    {
        apparitions: 2,
        element: {
            paragraph: {
                backgroundColor: ColorEnum.YELLOW,
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                textProperties: {
                    fontColor: ColorEnum.BLACK,
                    fontStyle: FontStyleEnum.GEORGIA,
                    fontSize: SizeEnum.MEDIUM,
                    fontDecoration: DecorationEnum.REGULAR
                },
            }
        },
        position: PositionEnum.RIGHT
    },
    {
        apparitions: 3,
        element: {
            calendar: {
                size: SizeEnum.BIG,
            }
        },
        position: PositionEnum.RIGHT
    },
    {
        apparitions: 10,
        element: {
            calendar: {
                size: SizeEnum.MEDIUM,
            }
        },
        position: PositionEnum.RIGHT
    },
    {
        apparitions: 2,
        element: {
            image: {
                source: 'https://tinypng.com/images/social/website.jpg',
                size: SizeEnum.MEDIUM,
            }
        },
        position: PositionEnum.RIGHT
    },
    {
        apparitions: 2,
        element: {
            image: {
                source: 'https://tinypng.com/images/social/website.jpg',
                size: SizeEnum.MEDIUM,
            }
        },
        position: PositionEnum.RIGHT
    },
];

export const mockMatrix: GenericComponent[][] = [
    [
        {
            button: {
                disabled: false,
                image: "https://static.vecteezy.com/packs/media/vectors/term-bg-1-3d6355ab.jpg",
                size: SizeEnum.MEDIUM,
                type: ButtonTypeEnum.NONE
            }
        },
        {
            calendar: {
                size: SizeEnum.MEDIUM,
            }
        },
        {
            heading: {
                backgroundColor: ColorEnum.ORANGE,
                text: 'The quick brow..',
                textProperties: {
                    fontColor: ColorEnum.BLACK,
                    fontStyle: FontStyleEnum.GARAMOND,
                    fontSize: SizeEnum.BIG,
                    fontDecoration: DecorationEnum.ITALIC_UNDERLINED
                },
            }
        },
    ],
    [
        {
            input: {
                backgroundColor: ColorEnum.PURPLE,
                size: SizeEnum.SMALL,
                textProperties: {
                    fontColor: ColorEnum.BLACK,
                    fontStyle: FontStyleEnum.GARAMOND,
                    fontSize: SizeEnum.BIG,
                    fontDecoration: DecorationEnum.ITALIC_UNDERLINED
                },
                type: InputTypeEnum.SEARCH, 
            }
        },
        {
            link: {
                backgroundColor: ColorEnum.WHITE,
                reference: 'https://example.com/',
                text: 'This an example website',
                textProperties: {
                    fontColor: ColorEnum.BLACK,
                    fontStyle: FontStyleEnum.GARAMOND,
                    fontSize: SizeEnum.MEDIUM,
                    fontDecoration: DecorationEnum.BOLD
                },
            }
        },
        {
            paragraph: {
                backgroundColor: ColorEnum.GREEN,
                text: 'The quick brown fox jumps over the lazy dog.',
                textProperties: {
                    fontColor: ColorEnum.BLUE,
                    fontStyle: FontStyleEnum.GARAMOND,
                    fontSize: SizeEnum.MEDIUM,
                    fontDecoration: DecorationEnum.BOLD
                },
            }
        },
    ],
    [
        {
            image: {
                source: 'https://tinypng.com/images/social/website.jpg',
                size: SizeEnum.SMALL,
            }
        },
        {
            photoGallery: {
                backgroundColor: ColorEnum.PURPLE,
                images: [
                    'https://tinypng.com/images/social/website.jpg',
                    'https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg',
                    'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'
                ],
                photoNumber: 3,
                size: SizeEnum.MEDIUM,
            }
        },
    ],
    [
        {
            profile: {
                backgroundColor: ColorEnum.ORANGE,
                source: 'https://tinypng.com/images/social/website.jpg',
                size: SizeEnum.MEDIUM,
                text: 'Max',
                textProperties: {
                    fontColor: ColorEnum.BLACK,
                    fontStyle: FontStyleEnum.BRUSH_SCRIPT_MT,
                    fontSize: SizeEnum.MEDIUM,
                    fontDecoration: DecorationEnum.BOLD
                },
                
            }
        },
        {
            slider: {
                backgroundColor: ColorEnum.BLACK,
                maxValue: 100,
                minValue: 0,
                sliderType: SliderTypeEnum.OPACITY,
            }
        },
        {
            video: {
                looped: true,
                quality: VideoQualityEnum.Q480,
                source: 'https://www.w3schools.com/html/mov_bbb.mp4',
                videoLength: 10,
                size: SizeEnum.MEDIUM,
            }
        }
    ]
];

export const generatedPage: PageStructure = {
    sections: [SectionTypeEnum.HEADER, SectionTypeEnum.LIST],
    header: {
        backgroundColor: ColorEnum.RED,
        sectionArrange: ArrangeTypeEnum.HORITANLTALLY,
        listSize: 3,
        elements: []
    },
    main: {
        backgroundColor: ColorEnum.YELLOW,
        sectionArrange: ArrangeTypeEnum.VERTICALLY,
        listSize: mockElements.length,
        elements: mockElements,
    },
    list: {
        backgroundColor: ColorEnum.YELLOW,
        listType: ListTypeEnum.ORDERED,
        listMarker: ListMarkerTypeEnum.SQUARE,
        listSize: mockElements.length,
        elements: mockElements,
    },
    table: {
        backgroundColor: ColorEnum.YELLOW,
        borderColor: ColorEnum.RED,
        borderStyle: BorderStyleEnum.SOLID,
        borderWidth: BorderEnum.THICK,
        numberLines: 4,
        numberColumns: 3,
        matrix: mockMatrix,
    },
    aside: {
        backgroundColor: ColorEnum.BLACK,
        sectionArrange: ArrangeTypeEnum.VERTICALLY,
        listSize: 4,
        elements: []
    }
};
