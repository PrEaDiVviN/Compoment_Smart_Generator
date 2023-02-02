from Entities.Compositional.Calendar import Calendar
from Entities.Properties.AvailableProperties import AvailableProperties


class ParseCalendar:

    def __init__(self):
        self.prop = AvailableProperties()

    def parse(self, element):
        size = ''

        for siz in self.prop.size:
            s = siz.lower()
            if element.find(s) != -1:
                size = siz

        el = Calendar(size)
        return el.to_json()


if __name__ == "__main__":
    p = ParseCalendar()
    print(p.parse(" A calendar."))