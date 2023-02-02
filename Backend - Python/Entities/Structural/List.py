from QueryAntology.QueryList import QueryList


class List:

    def __init__(self, list_type, list_marker, background_color, elements):
        self.list_type = list_type
        self.list_marker = list_marker
        self.background_color = background_color
        self.elements = elements

        self.queryExec = QueryList()

        self.empty_props = [a for a in dir(self) if
                            not a.startswith('__') and (getattr(self, a) == '' or getattr(self, a) == [])]

        if "list_type" in self.empty_props:
            self.empty_props.remove("list_type")

        values = self.queryExec.execute(self.empty_props)
        for key in values.keys():
            setattr(self, key, values[key])

        if self.list_marker in ["square", "circle", "dist"]:
            self.list_type = "UNORDORED"
        else:
            self.list_type = "ORDORED"

    def to_json(self):
        return {
            "listType": self.list_type,
            "listMarker": self.list_marker,
            "backgroundColor": self.background_color,
            "elements": self.elements
        }
