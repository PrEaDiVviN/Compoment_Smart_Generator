import axios from "axios";
import { baseUrl } from "../constants";
import { ComponentPair } from "../models/elements-list.model";
import { ArrangeTypeEnum } from "../models/enums/arrange-type.enum";
import { PositionEnum } from "../models/enums/position.enum";
import { SizeEnum } from "../models/enums/size.enum";
import { PageStructure } from "../models/page-structure.model";
import { ResponseStatusEnum } from "../models/response-status.enum";
import { Structure } from "../models/structures/structure.model";

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
        if(property === 'NAVBAR') {
            const listOfLinks = response[property].elements;
            for(let link of listOfLinks) {
                link = {
                    apparitions: 1,
                    element: {
                        link: {
                            ...link
                        }
                    },
                    position: PositionEnum.RIGHT
                } as ComponentPair;
            }
            response.navbar = {
                backgroundColor: response[property].backgroundColor,
                sectionArrange: ArrangeTypeEnum.HORITANLTALLY,
                listSize: response[property].listSize,
                elements: response[property].elements.map((el: any) => ({
                    apparitions: 1,
                    element: {
                        link: {
                            ...el,
                            textProperties: {
                                ...el.text_properties
                            }

                        }
                    },
                    position: PositionEnum.RIGHT
                }))
            } as Structure;
            delete response[property];
            adjustResponse(response);
            continue;
        }

        if(property === 'text_properties' && !response.textProperties) {
            response.textProperties = {
                ...response.text_properties
            };
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
