// import { Button } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import styles from './GenerationPage.module.scss';
// import { Dayjs } from "dayjs";

interface MapPageProps { }

const MapPage: FC<MapPageProps> = () => {

    let mapComponentRef = useRef<any>(null);

    document.onkeyup = (event: KeyboardEvent) => {
        if(event.key === ' ') {
            console.log('keyup space');
        }
    }

    useEffect(() => {
        // console.log('page loaded');
    });
    
    // const updateDate = (date: Dayjs) => {
    //     console.log('date updated', date);
    //     console.log('year:', date.year());
    //     console.log('month:', date.month());
    //     mapComponentRef.current.generateRandomBirds(date.year(), date.month() + 1);
    // }
    

    return (
        <div className={styles.mapContainer}>
            <div className={styles.mapFilters}>
                {/* <MapFilter data-testid="filter" updateDate={updateDate} /> */}
                {/* <Button variant="outlined" onClick={() => {mapComponentRef.current.generateRandomBirds()}}> */}
                    generate random
                {/* </Button> */}
                <p>test paragraph</p>
            </div>
        </div>
    );
}

export default MapPage;
