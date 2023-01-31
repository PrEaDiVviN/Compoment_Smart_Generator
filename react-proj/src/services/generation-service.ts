import axios from "axios";
import { baseUrl } from "../constants";
import { PageStructure } from "../models/page-structure.model";

const baseUrlConcatenate = (url: string): string => {
    return url[0] === '/' ? baseUrl + url : url;
}

const adjustResponse = (response: any) => {
    for (var property in response) {
        if(property === 'images') {
            for(let img of response[property]) img = baseUrlConcatenate(img);
            continue;
        }
        if(property === 'source') {
            response[property] = baseUrlConcatenate(response[property]);
            continue;
        }
        if(property === 'text') continue;
        if(property === 'reference') continue;

        if (typeof response[property] === 'object') adjustResponse(response[property]);
        else if (typeof property === 'function') continue;
        else {
            response[property] = typeof response[property] === 'string' ? (response[property] as string).toLowerCase() : response[property];
        }
    }
    
}

export async function generatePage(text: string): Promise<PageStructure> {
    const url = `${baseUrl}/language`;
    return axios.post(url, {
        message: text
     }).then(
        response => {
            adjustResponse(response.data.response);
            return response.data.response;
        }
    ).catch(
        err => {
            console.log('error happened');
            return err
        }
    );
}
