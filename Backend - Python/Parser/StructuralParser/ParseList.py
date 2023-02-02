from Entities.Properties.AvailableProperties import AvailableProperties
from Entities.Structural.ElementsPair import ElementsPair
from Entities.Structural.List import List
from Parser.ParseElement import ParseElement


class ParseList:

    def __init__(self):
        self.prop = AvailableProperties()
        self.element_parser = ParseElement()

    def parse(self, element):

        background_color = ''
        list_marker = ''
        list_type = ''
        elements = []

        color_part = element[:element.find("list")]
        for _color in self.prop.color:
            col = _color.lower()
            if color_part.find(col) != -1:
                background_color = _color

        for type_ in self.prop.list_type:
            col = type_.lower()
            if color_part.find(col) != -1:
                list_type = type_

        for mark in self.prop.marker:
            col = mark.lower().replace("_", "-")
            if color_part.find(col) != -1:
                list_marker = mark

        if element.find("of") != -1:
            parse_elements = element[element.find("of")+len("of"):].strip(" ").split(",")
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

                pair = ElementsPair(nr, parsed, '')

                elements.append(pair.to_json())

        el = List(list_type, list_marker, background_color, elements)
        return el.to_json()


if __name__ == "__main__":

    p = ParseList()
    print(p.parse("A green lower-latin ordered list of 4 paragraphs, 10 buttons."))
    # print(p.parse("a unordored list"))
