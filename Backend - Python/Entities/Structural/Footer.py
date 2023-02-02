from QueryAntology.QueryFooter import QueryFooter


class Footer:
    def __init__(self, background_color, section_arrange, list_size, elements):
        self.background_color = background_color
        self.section_arrange = section_arrange
        self.list_size = list_size
        self.elements = elements

        self.queryExec = QueryFooter()

        self.empty_props = [a for a in dir(self) if
                            not a.startswith('__') and (getattr(self, a) == '' or getattr(self, a) == [])]

        values = self.queryExec.execute(self.empty_props)
        for key in values.keys():
            setattr(self, key, values[key])

    def to_json(self):
        return {
            "backgroundColor": self.background_color,
            "sectionArrange": self.section_arrange,
            "listSize": self.list_size,
            "elements": self.elements
        }
