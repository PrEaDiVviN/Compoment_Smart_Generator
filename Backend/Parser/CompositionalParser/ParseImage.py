from Entities.Compositional.Image import Image
from Entities.Properties.AvailableProperties import AvailableProperties


class ParseImage:

    def __init__(self):
        self.prop = AvailableProperties()

    def parse(self, element):
        size = ''
        source = ''

        for siz in self.prop.size:
            s = siz.lower()
            if element.find(s) != -1:
                size = siz

        if element.find(" source=") != -1 and element.find("image") != -1:
            start = element.find(" source=") + len(" source=") + 1
            end = element.find("\"", start)
            if end == -1:
                raise Exception("Web reference not enclosed inside \"\"")
            source = element[start: end].strip(".")

        el = Image(size, source)
        return el.to_json()


if __name__ == "__main__":
    p = ParseImage()
    print(p.parse(" A small image with source=\"C://Users/Alex/profile.png\"."))
    print(p.parse(" An image"))