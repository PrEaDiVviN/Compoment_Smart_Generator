import copy

from Entities.Properties.AvailableProperties import AvailableProperties
from Entities.Structural.Table import Table
from Parser.ParseElement import ParseElement


class ParseTable:

    def __init__(self):
        self.prop = AvailableProperties()
        self.element_parser = ParseElement()

    def parse_simple(self, element):
        background_color = ''
        table_arrange = ''
        lines = ''
        columns = ''
        elements = []

        color_part = element[:element.find("table")]
        for _color in self.prop.color:
            col = _color.lower()
            if color_part.find(col) != -1:
                background_color = _color

        if element.find("by") != -1:
            for arr in self.prop.table_arrange:
                if arr.lower() in element:
                    table_arrange = arr

        if element.find("with") != -1:
            parse_elements = []
            end = element.find("by")
            if end != -1:
                parse_elements = element[element.find("with") + len("with") + 1: end].strip(" ").split(",")
            else:
                parse_elements = element[element.find("with") + len("with") + 1:].strip(" ").split(",")
            for i in range(0, len(parse_elements)):
                parse_elements[i] = parse_elements[i].strip(" ")

            nr_elements = []
            for e in parse_elements:
                nr = ''
                while '0' <= e[0] <= '9':
                    nr += e[0]
                    e = e[1:]
                nr = int(nr)
                nr_elements.append(nr)

                parsed = self.element_parser.parse(e)

                for _ in range(0, nr):
                    elements.append(copy.deepcopy(parsed))

            if table_arrange == 'COLUMNS':
                lines = max(nr_elements)
                columns = len(nr_elements)
            else:
                lines = len(nr_elements)
                columns = max(nr_elements)

        el = Table(background_color, "", "", "", columns, lines, "", table_arrange, elements)
        return el.to_json()

    def parse_complex(self, element):
        background_color = ''
        border_color = ''
        border_size = ''
        border_style = ''
        table_arrange = ''
        table_order = ''
        lines = ''
        columns = ''
        elements = []

        color_part = element[:element.find("table")]
        for _color in self.prop.color:
            col = _color.lower()
            if color_part.find(col) != -1:
                background_color = _color

        start = element.find("of") + len("of") + 1
        end = element.find("lines")
        if end != -1:
            lines = int(element[start: end].strip(" "))

        start = element.find("lines") + len("lines") + 1
        end = element.find("columns")
        if end != -1:
            columns = int(element[start:end].strip(" "))

        if element.find("with") != -1:
            start = element.find("with")
            end = element.find("border")

            color_part = element[start:end]
            for _color in self.prop.color:
                col = _color.lower()
                if color_part.find(col) != -1:
                    border_color = _color

            for style in self.prop.border_style:
                col = style.lower()
                if color_part.find(col) != -1:
                    border_style = style

            for tic in self.prop.border_width:
                t = tic.lower()
                if element.find(t) != -1:
                    border_size = tic

        if element.find("arranged") != -1:
            start = element.find("arranged")
            end = len(element)
            if element.find("having") != -1:
                end = element.find("having")

            part = element[start: end]
            for arrange in self.prop.table_arrange:
                col = arrange.lower()
                if part.find(col) != -1:
                    table_arrange = arrange

            for order in self.prop.table_order:
                col = order.lower().replace("_", " ")
                if part.find(col) != -1:
                    table_order = order

        if element.find("having") != -1:
            curprins = element[element.find("having") + len("having") + 1:]
            elemente_cuprins = curprins.split(",")
            for el in elemente_cuprins:
                res = self.element_parser.parse(el)
                elements.append(copy.deepcopy(res))

        el = Table(background_color, border_color, border_style, border_size, columns, lines, table_order, table_arrange, elements)
        return el.to_json()

    def parse(self, element):

        if element.find("table with") != -1:
            return self.parse_simple(element)
        else:
            return self.parse_complex(element)


if __name__ == "__main__":

    p = ParseTable()
    print(p.parse("a yellow table of 5 lines 7 columns with a red dotted thick border arranged start to finish by rows having a button, a paragraph"))
    print(p.parse("a gray table with 5 images, 5 paragraphs, 5 buttons by columns"))
    print(p.parse("a table"))
