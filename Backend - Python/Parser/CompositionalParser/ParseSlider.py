from Entities.Compositional.Slider import Slider
from Entities.Properties.AvailableProperties import AvailableProperties


class ParseSlider:

    def __init__(self):
        self.prop = AvailableProperties()

    def parse(self, element):
        size = ''
        minVal = ''
        maxVal = ''

        for siz in self.prop.size:
            s = siz.lower()
            if element.find(s) != -1:
                size = siz

        if element.find("with minimum value of") != -1:
            start = element.find("with minimum value of") + len("with minimum value of") + 1
            end = element.find("and", start)
            minVal = int(element[start: end])

        if element.find("maximum value of ") != -1:
            start = element.find("maximum value of ") + len("maximum value of ")
            maxVal = int(element[start: ].rstrip(",").rstrip(".").rstrip(" "))

        el = Slider(size, minVal, maxVal)
        return el.to_json()


if __name__ == "__main__":
    p = ParseSlider()
    print(p.parse("A big slider with minimum value of 15 and maximum value of 78."))
