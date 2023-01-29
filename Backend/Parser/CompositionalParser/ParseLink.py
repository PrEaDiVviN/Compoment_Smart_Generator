from Entities.Compositional.Link import Link
from Entities.Compositional.TextProperties import TextProperties
from Entities.Properties.AvailableProperties import AvailableProperties


class ParseLink:

    def __init__(self):
        self.prop = AvailableProperties()

    def parse(self, element):

        background_color = ''
        text = ''
        text_color = ''
        text_decoration = ''
        font_style = ''
        text_size = ''
        reference = ''

        color_part = element[:element.find("link")]
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

        if element.find("\"") != element.find("\"", element.find("referencing")) and element.find("\"") != -1:
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
                    font_style = font_style

        if element.find("of") != -1:
            start = element.find("of") + len("of") + 1
            end = element.find("pixels") - 1
            text_size = int(element[start: end])

        if element.find("referencing") != -1:
            start = element.find("\"", element.find("referencing"))
            end = element.find("\"", start + 1)
            if end == -1:
                raise Exception("Text value must be enclosed inside \"\"")
            reference = element[start+1: end].rstrip(".")

        font_p = TextProperties(text_color, font_style, text_size, text_decoration)

        el = Link(background_color, text, reference, font_p.to_json())
        return el.to_json()


if __name__ == "__main__":
    p = ParseLink()
    print(p.parse("A red link with bold and underlined green displayed text having arial style of 10 pixels referencing \"www.facebook.com.\""))
    print(p.parse("A link"))
