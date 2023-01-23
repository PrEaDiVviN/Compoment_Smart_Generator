import axios from "axios";
import { PageStructure } from "../models/page-structure.model";

export async function getGeneratedPage(text: string): Promise<PageStructure> {
    return Promise.resolve({
        sections: []
    });

    const url = 'http://127.0.0.1:3050/birdMigration';
    return axios.post(url, { text }).then(
        response => response.data.data
    ).catch(
        err => err
    );
}
