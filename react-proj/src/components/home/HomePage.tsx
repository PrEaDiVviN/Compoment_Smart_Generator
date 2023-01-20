import React, { FC, useState } from 'react';
import * as birdsService from "../../services/birds-service";
import { TweetModel } from "../../models/tweet.model";
// import { Card } from "@mui/material";
import styles from './HomePage.module.scss';
import { months } from "./constants";
import { useNavigate } from 'react-router-dom';

interface StatisticsProps { }

const Statistics: FC<StatisticsProps> = () => {
    
    const navigate = useNavigate();
    const [route, setRoute] = useState('map');

    const goToGeneration = () => {
        navigate('/generation');
        setRoute('generation');
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
                    <button onClick={ goToGeneration }>
                        press me
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Statistics;
