from QueryAntology.QueryProfile import QueryProfile


class Profile:

    def __init__(self, size, background_color, text, text_properties, source):
        self.size = size
        self.background_color = background_color
        self.text = text
        self.text_properties = text_properties
        self.source = source

        self.queryExec = QueryProfile()

        self.empty_props = [a for a in dir(self) if
                            not a.startswith('__') and (getattr(self, a) == '' or getattr(self, a) == [])]

        values = self.queryExec.execute(self.empty_props, text_properties)
        for key in values.keys():
            setattr(self, key, values[key])

    def to_json(self):
        return {
            "size": self.size,
            "backgroundColor": self.background_color,
            "text": self.text,
            "textProperties": self.text_properties,
            "source": self.source
        }
