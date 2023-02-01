import { FC, useRef } from 'react';
import * as generationService from "../../services/generation-service";
import styles from './HomePage.module.scss';
import { useNavigate } from 'react-router-dom';
import { PageStructure } from '../../models/page-structure.model';
import { ResponseError } from '../../models/response-error.model';
import { generatedPageKey } from './constants';


interface StatisticsProps { }

const Statistics: FC<StatisticsProps> = () => {

    const textarenaPlaceholder = 'Build a gray main section...';
    const navigate = useNavigate();
    const textarenaRef = useRef<HTMLTextAreaElement>(null);

    const submit = () => {
        // const mockText = 'Build a gray main section having a medium cancel button. An alert displaying "welcome to our website" after 3000 seconds.';
        generationService.generatePage(textarenaRef.current?.value || '').then((generatedPage: PageStructure) => {
            localStorage.setItem(generatedPageKey, JSON.stringify(generatedPage));
            navigate('/generation');
        }).catch((error: ResponseError) => {
            console.log(error);
        });
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <span>UICS</span>
                <p>ui component smart generator</p>
            </header>
            <main className={styles.main}>
                <div className={styles.left}>
                    <div className={styles.design}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div className={styles.explanations}>
                        <p>
                        SECTION = HEADER | NAVBAR | MAIN | TABLE | LIST | ASIDE | FOOTER | ALERT
                        <br />
                        ARRANGE = VERTICALLY | HORITANLTALLY
                        <br />
                        COLOR = BLACK | BLUE | BROWN | GRAY | GREEN | ORANGE | PURPLE | RED | WHITE | YELLOW
                        <br />
                        DECORATION = BOLD | ITALIC | UNDERLINED | BOLD_ITALIC | BOLD_UNDERLINED | ITALIC_UNDERLINED
                        <br />
                        FONT_STYLE = ARIAL | BRUSH_SCRIPT_MT | COURIER_NEW | GARAMOND | GEORGIA | TAHOMA | TIMES_NEW_ROMAN | VERDANA
                        <br />
                        POSITION = ABOVE | BELOW | LEFT | RIGHT
                        <br />
                        INPUT_TYPE = SEARCH | TEXT_INPUT
                        <br />
                        VIDEO_QUALITY = 144 | 240 | 360 | 480 | 720 | 1080
                        <br />
                        SIZE = SMALL | MEDIUM | BIG
                        <br />
                        BOOLEAN = TRUE | FALSE
                        <br />
                        BUTTON_TYPE = CANCEL | DOWNLOAD | EDIT | RESET | SAVE | SUBMIT | NONE
                        <br />
                        SLIDER_TYPE = ZOOM | OPACITY
                        <br />
                        BORDER_STYLE = DASHED | DOTTED | DOUBLE | GROOVE | SOLID
                        <br />
                        LIST_TYPE = ORDERED | UNORDORED
                        <br />
                        MARKER = DECIMAL | LOWER_ALPHA | LOWER_LATIN | UPPER_ALPHA | UPPER_LATIN | CIRCLE | DISC | SQUARE
                        <br />
                        <br />


                        SOURCE -{'>'} Image | Video | Audio reference to where the file is found.
                        <br />
                        BUTTON_SOURCE -{'>'} SOURCE or empty string.
                        <br />
                        REFERENCE -{'>'} HTTP web reference.
                        <br />
                        LENGTH -{'>'} Video | Audio playtime duration in minutes.
                        <br />
                        TEXT -{'>'} String representing the text to be displayed.
                        <br />
                        FONT_SIZE -{'>'} Integer representing the size of the displayed text in pixels.
                        <br />
                        DELAY -{'>'} Integer representing the delay to wait before an alert appears.
                        <br />
                        PHOTO_NUMBER -{'>'} Number of photos that should be displayed in this photo gallery.
                        <br />
                        VALUE -{'>'} Integer value representing how low | high a slider can go.
                        <br />
                        NUMBER -{'>'} Integer value {'>'} 0 representing number of columns/rows in a table or number of elements.
                        <br />
                        BORDER_WIDTH -{'>'} Integer value {'>'} 0 representing the border width of a table.
                        <br />
                        ERROR_REASON -{'>'} Why the error occured.
                        <br />
                        POSITION_IN_TEXT -{'>'} Where the error occured.
                        <br />
                        </p>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.formArea}>
                        <textarea
                            className={styles.textarena}
                            placeholder={textarenaPlaceholder}
                            ref={textarenaRef}
                        >
                        </textarea>
                        <button onClick={ submit }>
                            <div className={styles.path}></div>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Statistics;
