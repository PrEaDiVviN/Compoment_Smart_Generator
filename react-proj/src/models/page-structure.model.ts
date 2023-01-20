import { AlertComponent } from "./alert-component.model";
import { AsideStructure } from "./aside-structure.model";
import { FooterStructure } from "./footer-structure.model";
import { HeaderStructure } from "./header-structure.model";
import { ListStructure } from "./list-structure.model";
import { MainStructure } from "./main-structure.model";
import { NavbarStructure } from "./navbar-structure.model";
import { SectionType } from "./section-type.enum";
import { TableStructure } from "./table-structure.model";

export interface PageStructure {
    sections: SectionType[],
    header?: HeaderStructure,
    navBar?: NavbarStructure,
    content?: MainStructure | ListStructure | TableStructure,
    aside?: AsideStructure,
    footer?: FooterStructure,
    alert?: AlertComponent
}
