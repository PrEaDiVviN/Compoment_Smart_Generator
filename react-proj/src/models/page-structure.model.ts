import { AlertComponent } from "./alert-component.model";
import { AsideStructure } from "./structures/aside-structure.model";
import { FooterStructure } from "./structures/footer-structure.model";
import { HeaderStructure } from "./structures/header-structure.model";
import { ListStructure } from "./structures/list-structure.model";
import { MainStructure } from "./structures/main-structure.model";
import { NavbarStructure } from "./structures/navbar-structure.model";
import { SectionTypeEnum } from "./enums/section-type.enum";
import { TableStructure } from "./structures/table-structure.model";

export interface PageStructure {
    sections: SectionTypeEnum[],
    header?: HeaderStructure,
    navbar?: NavbarStructure,
    content?: MainStructure | ListStructure | TableStructure,
    aside?: AsideStructure,
    footer?: FooterStructure,
    alert?: AlertComponent
}
