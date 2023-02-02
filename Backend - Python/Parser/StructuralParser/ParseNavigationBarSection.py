from Entities.Properties.AvailableProperties import AvailableProperties
from Entities.Structural.Navbar import NavBar
from Parser.ParseListOfLinks import ParseListOfLinks


class ParseNavigationBarSection:

    def __init__(self):
        self.prop = AvailableProperties()
        self.list_parser = ParseListOfLinks()

    def parse(self, element):
        color = ''
        list_elements = []

        color_part = element[:element.find("navigation")]
        for _color in self.prop.color:
            col = _color.lower()
            if color_part.find(col) != -1:
                color = col

        index = element.find("with")
        if index == -1 and len(element[element.find("section")+len("section")::]) > 2 and element[element.find("section")+len("section")::].find("a"):
            raise Exception("Navigation bar section missing with clause even if list of elements is specified")
        if index != -1:
            list_elements = self.list_parser.parse(element[index + len("with")::].split(","))

        el = NavBar(color, len(list_elements), list_elements)
        return el.to_json()


if __name__ == "__main__":
    parser = ParseNavigationBarSection()
    # val = parser.parse("a red navigation bar section with a link with displayed text \"fb\" referencing \"www.facebook.com\", a link with displayed text \"yt\" referencing \"www.youtube.com\"")
    # print(val)
    val = parser.parse("a navigation bar section")
    print(val)