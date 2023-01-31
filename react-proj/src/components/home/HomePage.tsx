import React, { FC, useState } from 'react';
import * as generationService from "../../services/generation-service";
// import { Card } from "@mui/material";
import styles from './HomePage.module.scss';
import { generatePath, useNavigate } from 'react-router-dom';
import { PageStructure } from '../../models/page-structure.model';
import { ResponseError } from '../../models/response-error.model';

interface StatisticsProps { }

const Statistics: FC<StatisticsProps> = () => {
    
    const navigate = useNavigate();

    const submit = () => {
        // generationService.getGeneratedPage('test').then((generatedPage: PageStructure) => {
        //     navigate('/generation');
        // }).catch((error: ResponseError) => {
        //     console.log(error);
        // });
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span>UICS</span>
                <p>ui component smart generator</p>
            </div>
            <div className={styles.main}>
                <div className={styles.explanations}>
                    <p>text</p>
                </div>
                <div className={styles.formArea}>
                    <button onClick={ submit }>
                        press me
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
