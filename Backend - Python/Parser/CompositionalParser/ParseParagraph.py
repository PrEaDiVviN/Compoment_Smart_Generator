from Entities.Compositional.Paragraph import Paragraph
from Entities.Compositional.TextProperties import TextProperties
from Entities.Properties.AvailableProperties import AvailableProperties


class ParseParagraph:

    def __init__(self):
        self.prop = AvailableProperties()

    def parse(self, element):

        background_color = ''
        text = ''
        text_color = ''
        text_decoration = ''
        font_style = ''
        text_size = ''

        color_part = element[:element.find("paragraph")]
        for _color in self.prop.color:
            col = _color.lower()
            if color_part.find(col) != -1:
                background_color = _color

        if element.find("text") != -1:
            first = element[element.find("with"): element.find("text")]

            for _color in self.prop.color:
                col = _color.lower()
                if first.find(col) != -1:
                    text_color = _color

            for decoration in self.prop.decoration:
                dec = decoration.lower().replace("_", " and ")
                if first.find(dec) != -1:
                    text_decoration = decoration

            if element.find("\"") != -1:
                start = element.find("\"") + 1
                end = element.find("\"", start)
                if end == -1:
                    raise Exception("Text value must be enclosed inside \"\"")
                text = element[start: end]

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

        el = Paragraph(font_p.to_json(), background_color, text)
        return el.to_json()


if __name__ == "__main__":
    p = ParseParagraph()
    print(p.parse("A paragraph"))
