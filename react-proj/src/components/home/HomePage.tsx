import { FC, useRef, useState } from 'react';
import * as generationService from "../../services/generation-service";
import styles from './HomePage.module.scss';
import { useNavigate } from 'react-router-dom';
import { PageStructure } from '../../models/page-structure.model';
import { ResponseError } from '../../models/response-error.model';
import { generatedPageKey } from './constants';
import { GeneratePageResponse } from '../../services/generation-service';
import { ResponseStatusEnum } from '../../models/response-status.enum';

interface StatisticsProps { }

const Statistics: FC<StatisticsProps> = () => {

    const textarenaPlaceholder = 'Build a gray main section...';
    const navigate = useNavigate();
    const textarenaRef = useRef<HTMLTextAreaElement>(null);
    const [error, setError] = useState('');

    const submit = () => {
        // const mockText = 'Build a gray main section having a medium cancel button. An alert displaying "welcome to our website" after 3 seconds.';
        generationService.generatePage(textarenaRef.current?.value || '').then((generatedPageResponse: GeneratePageResponse) => {
            if(generatedPageResponse.status.toLowerCase() === ResponseStatusEnum.ERROR) {
                setError((generatedPageResponse.response as any).reason || '');
                return;
            }
            if(generatedPageResponse.status.toLowerCase() === ResponseStatusEnum.SUCCESS) {
                localStorage.setItem(generatedPageKey, JSON.stringify(generatedPageResponse.response));
                navigate('/generation');
            }
        }).catch((error: ResponseError) => {
            console.log('error:', error);
        });
    }

    const downloadTxtFile = () => {
      const element = document.createElement("a");
      const file = new Blob(['../../assets/language.txt'], {type: 'text/plain;charset=utf-8'});
      element.href = URL.createObjectURL(file);
      element.download = 'language.txt';
      document.body.appendChild(element);
      element.click();
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
                        <h3>Welcome to our UICS website.</h3>
                        <br />
                        <h4>Here you will find a guide for the possible language constructs and their rules:</h4>
                        <br />
                        <a href="../../language.txt" type="text/plain" download="language.txt">
                            Language rules..
                        </a>
                        <br />
                        <br />

                        <b>Example:</b>
                        <p>
                        Build a gray main section having a big green photogallery with photos "https://w.wallhaven.cc/full/7p/wallhaven-7p39gy.png"; "https://w.wallhaven.cc/full/qz/wallhaven-qzdqvr.jpg"; "https://w.wallhaven.cc/full/l8/wallhaven-l83o92.jpg".
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

                    {
                        error ? <span>
                            { error }
                        </span> : ''
                    }
                </div>
            </main>
        </div>
    );
};

export default Statistics;
