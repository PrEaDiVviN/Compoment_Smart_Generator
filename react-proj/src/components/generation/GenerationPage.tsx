import { FC } from 'react';
import { SectionTypeEnum } from '../../models/enums/section-type.enum';
import { PageStructure } from '../../models/page-structure.model';
import { ListStructure } from '../../models/structures/list-structure.model';
import { MainStructure } from '../../models/structures/main-structure.model';
import { TableStructure } from '../../models/structures/table-structure.model';
import styles from './GenerationPage.module.scss';
import './GenerationPage.scss';
import { ColorEnum } from '../../models/enums/color.enum';
import { ArrangeTypeEnum } from '../../models/enums/arrange-type.enum';
import { buildList, buildStructure, buildTable } from './structure-generator';
import { ListTypeEnum } from '../../models/enums/list-type.enum';
import { ListMarkerTypeEnum } from '../../models/enums/list-marker-type.enum';
import { SizeEnum } from '../../models/enums/size.enum';
import { PositionEnum } from '../../models/enums/position.enum';
import { BorderStyleEnum } from '../../models/enums/border-style.enum';
import { ButtonTypeEnum } from '../../models/enums/button-type.enum';
import { FontStyleEnum } from '../../models/enums/font-style.enum';
import { DecorationEnum } from '../../models/enums/decoration.enum';
import { InputTypeEnum } from '../../models/enums/input-type.enum';
import { SliderTypeEnum } from '../../models/enums/slider-type.enum';
import { VideoQualityEnum } from '../../models/enums/video-quality.enum';

interface GeneratedPageProps { }

const GenerationPage: FC<GeneratedPageProps> = () => {

    const generatedPage: PageStructure = {
        sections: [SectionTypeEnum.HEADER, SectionTypeEnum.TABLE],
        header: {
            backgroundColor: ColorEnum.RED,
            sectionArrange: ArrangeTypeEnum.HORITANLTALLY,
            listSize: 3,
            elements: []
        },
        content: {
            backgroundColor: ColorEnum.YELLOW,
            listType: ListTypeEnum.ORDERED,
            listMarker: ListMarkerTypeEnum.SQUARE,
            listSize: 3,
            borderColor: ColorEnum.RED,
            borderStyle: BorderStyleEnum.SOLID,
            elements: [
                {
                    apparitions: 3,
                    element: {
                        calendar: {
                            size: SizeEnum.BIG,
	                        position: PositionEnum.RIGHT
                        }
                    }
                },
                {
                    apparitions: 2,
                    element: {
                        image: {
	                        source: 'som source',
                            size: SizeEnum.BIG,
	                        position: PositionEnum.RIGHT
                        }
                    }
                },
            ],
            numberLines: 4,
            numberColumns: 3,
            matrix: [
                [
                    {
                        button: {
                            disabled: false,
                            image: '',
                            position: PositionEnum.RIGHT,
                            size: SizeEnum.MEDIUM,
                            type: ButtonTypeEnum.DOWNLOAD
                        }
                    },
                    {
                        calendar: {
                            size: SizeEnum.MEDIUM,
                            position: PositionEnum.RIGHT
                        }
                    },
                    {
                        heading: {
                            backgroundColor: ColorEnum.ORANGE,
                            position: PositionEnum.RIGHT,
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
                            position: PositionEnum.RIGHT,
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
                            position: PositionEnum.RIGHT,
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
                            position: PositionEnum.RIGHT,
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
	                        position: PositionEnum.RIGHT
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
                            position: PositionEnum.RIGHT,
                            size: SizeEnum.MEDIUM,
                        }
                    },
                ],
                [
                    {
                        profile: {
                            backgroundColor: ColorEnum.ORANGE,
                            position: PositionEnum.RIGHT,
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
                            position: PositionEnum.RIGHT,
                            sliderType: SliderTypeEnum.OPACITY,
                        }
                    },
                    {
                        video: {
                            looped: true,
                            position: PositionEnum.RIGHT,
                            quality: VideoQualityEnum.Q480,
                            source: 'https://www.w3schools.com/html/mov_bbb.mp4',
                            videoLength: 10,
                            size: SizeEnum.MEDIUM,
                        }
                    }
                ]
            ]
        },
    };

    // TODO size classes

    return (
        <div className={styles.container}>
            <audio src=""></audio>
            <div className={`${styles.header} ${styles.chunk}`}>
                {
                    generatedPage.header ? buildStructure(generatedPage.header) : ''
                }
            </div>
            <div className={styles.navbar}>
                {
                    generatedPage.navbar ? buildStructure(generatedPage.navbar) : ''
                }
            </div>
            <div className={styles.content}>
                {
                    generatedPage.sections.includes(SectionTypeEnum.MAIN) ? buildStructure(generatedPage.content as MainStructure) :
                    generatedPage.sections.includes(SectionTypeEnum.LIST) ? buildList(generatedPage.content as ListStructure) :
                    buildTable(generatedPage.content as TableStructure)
                }
            </div>
            <div className={styles.aside}>
                {
                    generatedPage.aside ? buildStructure(generatedPage.aside) : ''
                }
            </div>
            <div className={styles.footer}>
                {
                    generatedPage.footer ? buildStructure(generatedPage.footer) : ''
                }
            </div>
        </div>
    );
}

export default GenerationPage;
