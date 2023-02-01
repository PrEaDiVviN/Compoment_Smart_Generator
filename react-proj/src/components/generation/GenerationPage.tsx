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
