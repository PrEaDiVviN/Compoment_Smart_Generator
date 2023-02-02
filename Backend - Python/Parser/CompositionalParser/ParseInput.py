from Entities.Compositional.Input import Input
from Entities.Compositional.TextProperties import TextProperties
from Entities.Properties.AvailableProperties import AvailableProperties


class ParseInput:

    def __init__(self):
        self.prop = AvailableProperties()

    def parse(self, element):
        type_ = ''
        background_color = ''
        text_color = ''
        text_decoration = ''
        font_style = ''
        text_size = ''
        size = ''

        if element.find('search input'):
            type_ = self.prop.input_type[0]
        else:
            type_ = self.prop.input_type[1]

        for siz in self.prop.size:
            s = siz.lower()
            if element.find(s) != -1:
                size = siz

        color_part = element[:element.find("input")]
        for _color in self.prop.color:
            col = _color.lower()
            if color_part.find(col) != -1:
                background_color = _color

        if element.find("with") != -1:
            first = element[element.find("with"): element.find("text")]

            for _color in self.prop.color:
                col = _color.lower()
                if first.find(col) != -1:
                    text_color = _color

            for decoration in self.prop.decoration:
                dec = decoration.lower().replace("_", " and ")
                if first.find(dec) != -1:
                    text_decoration = decoration

        if element.find("having") != -1:
            start = element.find("having")
            end = element.find("style")
            to_find = element[start: end]

            for style in self.prop.font_style:
                st = style.lower().replace("_", "-")
                if to_find.find(st) != -1:
                    font_style = style

        if element.find("of") != -1:
            start = element.find("of") + len("of") + 1
            end = element.find("pixels") - 1
            text_size = int(element[start: end])

        font_p = TextProperties(text_color, font_style, text_size, text_decoration)

        el = Input(type_, size, background_color, font_p.to_json())
        return el.to_json()


if __name__ == "__main__":
    p = ParseInput()
    print(p.parse("A small red search input with bold black input text having arial style of 5 pixels."))
    print(p.parse("An input"))
