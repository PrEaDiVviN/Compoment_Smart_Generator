from QueryAntology.QueryParagraph import QueryParagraph


class Paragraph:

    def __init__(self, text_properties, background_color, text):
        self.text_properties = text_properties
        self.background_color = background_color
        self.text = text

        self.queryExec = QueryParagraph()

        self.empty_props = [a for a in dir(self) if
                            not a.startswith('__') and (getattr(self, a) == '' or getattr(self, a) == [])]

        values = self.queryExec.execute(self.empty_props, self.text_properties)
        for key in values.keys():
            setattr(self, key, values[key])

    def to_json(self):
        return {
            "backgroundColor": self.background_color,
            "text": self.text,
            "textProperties": self.text_properties
        }
