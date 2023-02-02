from Entities.Compositional.Button import Button
from Entities.Properties.AvailableProperties import AvailableProperties


class ParseButton:

    def __init__(self):
        self.prop = AvailableProperties()

    def parse(self, element):
        size = ''
        disabled = False
        source = ''
        type_ = "NONE"

        for siz in self.prop.size:
            s = siz.lower()
            if element.find(s) != -1:
                size = siz

        if element.find("disabled") != -1:
            disabled = True

        for button_t in self.prop.button_type:
            but_t = button_t.lower()
            if element.find(but_t) != -1:
                type_ = button_t

        if element.find(" source=") != -1 and element.find("image") != -1:
            start = element.find(" source=") + len(" source=") + 1
            end = element.find("\"", start)
            if end == -1:
                raise Exception("Web reference not enclosed inside \"\"")
            source = element[start: end].rstrip(".")

        if type_ != "NONE" and source != '':
            raise Exception("Button type property cannot be set at the same time with image property")

        el = Button(disabled, size, type_, source)
        return el.to_json()


if __name__ == "__main__":
    p = ParseButton()
    print(p.parse("A big disabled reset button."))
    print(p.parse("A small image button with source=\"C://Users/Alex/profile.png\"."))
