from Entities.Compositional.PhotoGallery import PhotoGallery
from Entities.Properties.AvailableProperties import AvailableProperties


class ParsePhotoGallery:

    def __init__(self):
        self.prop = AvailableProperties()

    def parse(self, element):
        size = ''
        color = ''
        number_images = ''
        images = []

        for siz in self.prop.size:
            s = siz.lower()
            if element.find(s) != -1:
                size = siz

        color_part = element[:element.find("user")]
        for _color in self.prop.color:
            col = _color.lower()
            if color_part.find(col) != -1:
                color = _color

        if element.find("with") != -1 and element.find("of") != -1:
            raise Exception("Photo gallery cannot have both of and with clauses at the same time")

        if element.find("of") != -1:
            start = element.find("of") + len("of") + 1
            end = element.find("images") - 1
            number_images = int(element[start:end])
        elif element.find("\"") != -1:
            list_links = element[element.find("photos") + len("photos") + 1:].split(", ")
            list_links[len(list_links) - 1] = list_links[len(list_links) - 1].replace(".", "")
            images = list_links
            number_images = len(images)

        if number_images == '':
            number_images = 5

        el = PhotoGallery(size, color, number_images, images)
        return el.to_json()


if __name__ == "__main__":
    p = ParsePhotoGallery()
    print(p.parse("A small red photogallery of 15 images."))
    print(p.parse("A big green photogalerry with photos \"C://Users/Alex/photo1.png\", \"C://Users/Alex/photo2.png\", \"C://Users/Alex/photo3.png\"."))
    print(p.parse("A photogalerry "))
