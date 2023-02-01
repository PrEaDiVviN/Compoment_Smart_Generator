import axios from "axios";
import { baseUrl } from "../constants";
import { SizeEnum } from "../models/enums/size.enum";
import { PageStructure } from "../models/page-structure.model";
import { ResponseStatusEnum } from "../models/response-status.enum";

export interface GeneratePageResponse {
    response: {
        positionInText: string,
        reason: string
    } | PageStructure,
    status: string
};

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
        if(property === 'fontSize') {
            response[property] = response[property] < 16 ? SizeEnum.SMALL : (response[property] > 28 ? SizeEnum.BIG : SizeEnum.MEDIUM);
            continue;
        }

        if (typeof response[property] === 'object') adjustResponse(response[property]);
        else if (typeof property === 'function') continue;
        else {
            response[property] = typeof response[property] === 'string' ? (response[property] as string).toLowerCase() : response[property];
        }
    }
    
}

export async function generatePage(text: string): Promise<GeneratePageResponse> {
    const url = `${baseUrl}/language`;
    return axios.post(url, {
        message: text
     }).then(
        response => {
            if(response.data.status.toLowerCase() === ResponseStatusEnum.SUCCESS) adjustResponse(response.data);
            return response.data;
        }
    ).catch(
        err => {
            return err
        }
    );
}
