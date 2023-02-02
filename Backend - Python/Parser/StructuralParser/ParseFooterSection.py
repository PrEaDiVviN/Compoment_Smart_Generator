from Entities.Properties.AvailableProperties import AvailableProperties
from Entities.Structural.ElementsPair import ElementsPair
from Entities.Structural.Footer import Footer
from Parser.ParseElement import ParseElement


class ParseFooterSection:

    def __init__(self):
        self.prop = AvailableProperties()
        self.element_parser = ParseElement()

    def parse(self, element):
        arrange = ''
        color = ''
        list_elements = []

        if element.find("arranged") <= element.find("footer") and element.find("arranged") != -1:
            arrange = None
            for a_property in self.prop.arrange:
                propp = a_property.lower()
                if element.find(propp) != -1:
                    arrange = propp
        if arrange is None:
            raise Exception("Footer section states to have arrange value but it does not have a valid value")

        color_part = element[:element.find("footer")]
        for _color in self.prop.color:
            col = _color.lower()
            if color_part.find(col) != -1:
                color = col

        index = element.find("having")
        if index == -1 and len(element[element.find("section")+len("section")::]) > 2 and element[element.find("section")+len("section")::].find("a"):
            raise Exception("Footer section missing having clause even if list of elements is specified")
        if index != -1:
            parse_elements = element[element.find("having") + len("having"):].strip(" ").split(",")
            for i in range(0, len(parse_elements)):
                parse_elements[i] = parse_elements[i].strip(" ")

            for e in parse_elements:
                nr = ''
                if e[0] != 'a':
                    while '0' <= e[0] <= '9':
                        nr += e[0]
                        e = e[1:]
                else:
                    nr = '1'
                nr = int(nr)

                parsed = self.element_parser.parse(e)
                position = ''

                if e.find("placed") != -1:
                    for place in self.prop.position:
                        low = place.lower()
                        if e.find(low) != -1:
                            position = place

                pair = ElementsPair(nr, parsed, position)

                list_elements.append(pair.to_json())

            el = Footer(color, arrange, len(list_elements), list_elements)
            return el.to_json()

        el = Footer(color, arrange, len(list_elements), list_elements)
        return el.to_json()


if __name__ == "__main__":
    parser = ParseFooterSection()
    # val = parser.parse("Build a vertically arranged red footer section having a download button, 5 images ")
    val = parser.parse("Build a vertically arranged red footer section ")
    print(val)