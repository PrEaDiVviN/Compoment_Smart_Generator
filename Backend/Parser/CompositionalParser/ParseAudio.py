from Entities.Compositional.Audio import Audio
from Entities.Properties.AvailableProperties import AvailableProperties


class ParseAudio:

    def __init__(self):
        self.prop = AvailableProperties()

    def parse(self, element):
        size = ''
        looped = False
        source = ''
        time = ''

        for siz in self.prop.size:
            s = siz.lower()
            if element.find(s) != -1:
                size = siz

        if element.find("looped") != -1:
            looped = True

        if element.find("of") != -1:
            start = element.find("of") + len("of") + 1
            end = element.find("seconds") - 1
            time = int(element[start:end])

        if element.find(" source=") != -1:
            start = element.find(" source=") + len(" source=") + 1
            end = element.find("\"", start)
            if end == -1:
                raise Exception("Web reference not enclosed inside \"\"")
            source = element[start: end].rstrip(".")

        el = Audio(size, looped, time, source)
        return el.to_json()


if __name__ == "__main__":
    p = ParseAudio()
    print(p.parse("A big looped audio of 5 seconds having source=\"C://Users/Alex/music.mp3\"."))

