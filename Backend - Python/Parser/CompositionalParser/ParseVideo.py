from Entities.Compositional.Video import Video
from Entities.Properties.AvailableProperties import AvailableProperties


class ParseVideo:

    def __init__(self):
        self.prop = AvailableProperties()

    def parse(self, element):
        size = ''
        looped = False
        source = ''
        time = ''
        quality = ''

        for siz in self.prop.size:
            s = siz.lower()
            if element.find(s) != -1:
                size = siz

        if element.find("looped") != -1:
            looped = True

        if element.find("of") != -1 and element.find("seconds") != -1:
            start = element.find("of") + len("of") + 1
            end = element.find("seconds") - 1
            time = int(element[start:end])

        if element.find("of") != -1 and element.find("pixels") != -1:
            start = element.find("of") + len("of") + 1
            if element.find("seconds"):
                start = element.find("of") + len("of") + 1
                start = element.find("of", start) + len("of") + 1

            end = element.find("pixels") - 1
            quality = int(element[start:end])
            if quality not in self.prop.video_quality:
                raise Exception("Invalid video expected quality")

        if element.find(" source=") != -1:
            start = element.find(" source=") + len(" source=") + 1
            end = element.find("\"", start)
            if end == -1:
                raise Exception("Web reference not enclosed inside \"\"")
            source = element[start: end].replace(".", "")

        el = Video(size, looped, time, source, quality)
        return el.to_json()


if __name__ == "__main__":
    p = ParseVideo()
    print(p.parse("A small looped video of 5 seconds having source=\"https://www.youtube.com/watch?v=bAVKp0X9JnQ&list=RD_3NxUWq3t_g&index=8\" of 720 pixels"))
    print(p.parse("images"))

