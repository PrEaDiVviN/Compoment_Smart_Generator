import { FC } from 'react';
import { SectionTypeEnum } from '../../models/enums/section-type.enum';
import { PageStructure } from '../../models/page-structure.model';
import { ListStructure } from '../../models/structures/list-structure.model';
import { MainStructure } from '../../models/structures/main-structure.model';
import { TableStructure } from '../../models/structures/table-structure.model';
import styles from './GenerationPage.module.scss';
import { ColorEnum } from '../../models/enums/color.enum';
import { ArrangeTypeEnum } from '../../models/enums/arrange-type.enum';
import { buildList, buildStructure, buildTable } from './structure-generator';
import { ListTypeEnum } from '../../models/enums/list-type.enum';
import { ListMarkerTypeEnum } from '../../models/enums/list-marker-type.enum';
import { SizeEnum } from '../../models/enums/size.enum';
import { PositionEnum } from '../../models/enums/position.enum';
import { BorderStyleEnum } from '../../models/enums/border-style.enum';

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
                        calendar: {
                            size: SizeEnum.BIG,
                            position: PositionEnum.RIGHT
                        }
                    },
                    {
                        calendar: {
                            size: SizeEnum.BIG,
                            position: PositionEnum.RIGHT
                        }
                    },
                    {
                        calendar: {
                            size: SizeEnum.BIG,
                            position: PositionEnum.RIGHT
                        }
                    },
                ],
                [
                    {
                        calendar: {
                            size: SizeEnum.BIG,
                            position: PositionEnum.RIGHT
                        }
                    },
                    {
                        calendar: {
                            size: SizeEnum.BIG,
                            position: PositionEnum.RIGHT
                        }
                    },
                ],
                [
                    {
                        image: {
	                        source: 'som source',
                            size: SizeEnum.BIG,
	                        position: PositionEnum.RIGHT
                        }
                    },
                ],
            ]
        },
    };

    return (
        <div className={styles.container}>
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
