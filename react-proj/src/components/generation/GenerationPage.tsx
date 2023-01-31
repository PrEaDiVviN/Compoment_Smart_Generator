import { FC, useEffect, useState } from 'react';
import { SectionTypeEnum } from '../../models/enums/section-type.enum';
import { PageStructure } from '../../models/page-structure.model';
import styles from './GenerationPage.module.scss';
import './GenerationPage.scss';
import { ColorEnum } from '../../models/enums/color.enum';
import { ArrangeTypeEnum } from '../../models/enums/arrange-type.enum';
import { buildList, buildStructure, buildTable } from './structure-generator';
import { ListTypeEnum } from '../../models/enums/list-type.enum';
import { ListMarkerTypeEnum } from '../../models/enums/list-marker-type.enum';
import { BorderStyleEnum } from '../../models/enums/border-style.enum';
import { BorderEnum } from '../../models/enums/border.enum';
import { generatePage } from '../../services/generation-service';
import { mockElements, mockMatrix } from './mocks';
import { AlertComponent } from '../../models/alert-component.model';

interface GeneratedPageProps { }

const GenerationPage: FC<GeneratedPageProps> = () => {

    const initialState: PageStructure = {
        sections: []
    };
    const [page, setPage] = useState<PageStructure>(initialState);

    useEffect(() => {
        if(page === initialState) {
            generatePage(
                'Build a gray main section having a medium cancel button. An alert displaying "welcome to our website" after 3000 seconds.'
            ).then((result: PageStructure) => {
                console.log(result);
                setPage(result);

                checkAlert(result.alert);
            })

        }

    });

    const checkAlert = (alertComponent: AlertComponent | undefined) => {
        if(!alertComponent) return;
        setTimeout(() => {
            if(!alertComponent) return;
            alert(alertComponent.text)
        }, alertComponent.delay);
    }


    const generatedPage: PageStructure = {
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

    return (
        <div className={styles.container}>
            <div className={`${styles.header} ${styles.chunk}`}>
                {
                    page.header ? buildStructure(page.header) : ''
                }
            </div>
            <div className={styles.navbar}>
                {
                    page.navbar ? buildStructure(page.navbar) : ''
                }
            </div>
            <div className={styles.content}>
                {
                    page.main ? buildStructure(page.main) : ''
                }
                {
                    page.list ? buildList(page.list) : ''
                }
                {
                    page.table ? buildTable(page.table) : ''
                }
            </div>
            <div className={styles.aside}>
                {
                    page.aside ? buildStructure(page.aside) : ''
                }
            </div>
            <div className={styles.footer}>
                {
                    page.footer ? buildStructure(page.footer) : ''
                }
            </div>
        </div>
    );
}

export default GenerationPage;
