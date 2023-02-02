import { FC, useEffect, useState } from 'react';
import { PageStructure } from '../../models/page-structure.model';
import styles from './GenerationPage.module.scss';
import './GenerationPage.scss';
import { buildList, buildStructure, buildTable } from './structure-generator';
import { AlertComponent } from '../../models/alert-component.model';
import { generatedPageKey } from '../home/constants';

interface GeneratedPageProps { }

const GenerationPage: FC<GeneratedPageProps> = () => {

    const initialState: PageStructure = {
        sections: []
    };
    const [page, setPage] = useState<PageStructure>(initialState);

    useEffect(() => {
        if(page === initialState) {
            const generatedPage = JSON.parse(localStorage.getItem(generatedPageKey) || '{}') as PageStructure;

            if(Object.keys(generatedPage).length) {
                setPage(generatedPage);
    
                checkAlert(generatedPage.alert);
            }

        }

    }, [page, initialState]);

    const checkAlert = (alertComponent: AlertComponent | undefined) => {
        if(!alertComponent) return;
        setTimeout(() => {
            if(!alertComponent) return;
            alert(alertComponent.text)
        }, alertComponent.delay * 1000);
    }

    return (
        <div className={styles.container}>
            <div vocab="https://schema.org/" typeof="WPHeader" className={`${styles.header} ${styles.chunk}`}>
                <span className={styles.hidden} property="cssSelector">{styles.header}</span>
                {
                    page.header ? buildStructure(page.header) : ''
                }
            </div>
            <div vocab="https://schema.org/" typeof="SiteNavigationElement" className={styles.navbar}>
                <span className={styles.hidden} property="cssSelector">{styles.navbar}</span>
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
            <div vocab="https://schema.org/" typeof="WPSideBar" className={styles.aside}>
                <span className={styles.hidden} property="cssSelector">{styles.aside}</span>
                {
                    page.aside ? buildStructure(page.aside) : ''
                }
            </div>
            <div vocab="https://schema.org/" typeof="WPFooter" className={styles.footer}>
                <span className={styles.hidden} property="cssSelector">{styles.footer}</span>
                {
                    page.footer ? buildStructure(page.footer) : ''
                }
            </div>
        </div>
    );
}

export default GenerationPage;
