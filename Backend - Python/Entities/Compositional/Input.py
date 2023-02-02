from QueryAntology.QueryInput import QueryInput


class Input:

    def __init__(self, input_type, size, background_color, text_properties):
        self.input_type = input_type
        self.size = size
        self.background_color = background_color
        self.text_properties = text_properties

        if input_type == '':
            input_type = 'SEARCH'

        self.queryExec = QueryInput()

        self.empty_props = [a for a in dir(self) if
                            not a.startswith('__') and (getattr(self, a) == '' or getattr(self, a) == [])]

        values = self.queryExec.execute(self.empty_props, self.text_properties)
        for key in values.keys():
            setattr(self, key, values[key])

    def to_json(self):
        return {
            "type": self.input_type,
            "size": self.size,
            "backgroundColor": self.background_color,
            "textProperties": self.text_properties
        }
