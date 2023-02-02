from QueryAntology.QueryNavbar import QueryNavbar


class NavBar:

    def __init__(self, background_color, list_size, elements):
        self.background_color = background_color
        self.list_size = list_size
        self.elements = elements # list of link, not ElementsPair

        self.queryExec = QueryNavbar()

        self.empty_props = [a for a in dir(self) if
                            not a.startswith('__') and (getattr(self, a) == '' or getattr(self, a) == [])]

        values = self.queryExec.execute(self.empty_props)
        for key in values.keys():
            setattr(self, key, values[key])

    def to_json(self):
        return {
            "backgroundColor": self.background_color,
            "listSize": self.list_size,
            "elements": self.elements
        }
