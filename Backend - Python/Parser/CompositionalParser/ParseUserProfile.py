from Entities.Compositional.Profile import Profile
from Entities.Compositional.TextProperties import TextProperties
from Entities.Properties.AvailableProperties import AvailableProperties


class ParseUserProfile:

    def __init__(self):
        self.prop = AvailableProperties()

    def parse(self, element):
        size = ''
        color = ''
        source = ''
        username = ''
        text_color = ''
        text_style = ''

        for siz in self.prop.size:
            s = siz.lower()
            if element.find(s) != -1:
                size = siz

        color_part = element[:element.find("user")]
        for _color in self.prop.color:
            col = _color.lower()
            if color_part.find(col) != -1:
                color = _color

        index = element.find("with")
        if index == -1 and (element.find("username") != -1 or element.find("image") != -1):
            raise Exception("User profile component missing with clause even if list of elements is specified")

        start = element.find("username")
        end = element.find("image", start)
        to_find = element[start: end]
        st = to_find.find("\"")
        if st != -1:
            en = to_find.find("\"", st + 1)
            username = to_find[st+1: en]
            if len(username) < 3 or len(username) > 16:
                raise Exception("Username should have the length between 3 and 16 characters")

        start = element.find("profile")
        end = element.find("username", start)
        to_find = element[start: end]

        for _color in self.prop.color:
            col = _color.lower()
            if to_find.find(col) != -1:
                text_color = _color

        for style in self.prop.font_style:
            st = style.lower().replace("_", "-")
            if to_find.find(st) != -1:
                text_style = style

        if element.find(" source=") != -1 and element.find("image") != -1:
            start = element.find(" source=") + len(" source=") + 1
            end = element.find("\"", start)
            if end == -1:
                raise Exception("Web reference not enclosed inside \"\"")
            source = element[start: end]

        font_p = TextProperties(text_color, text_style, "", "")

        el = Profile(size, color, username, font_p.to_json(), source)
        return el.to_json()


if __name__ == "__main__":
    p = ParseUserProfile()
    print(p.parse(" A small red user profile with Arial red username"))
