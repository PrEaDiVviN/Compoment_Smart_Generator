from QueryAntology.QueryButton import QueryButton


class Button:

    def __init__(self, disabled, size, type_, image):
        self.disabled = disabled
        self.size = size
        self.type_ = type_
        self.image = image

        self.queryExec = QueryButton()

        self.empty_props = [a for a in dir(self) if
                            not a.startswith('__') and (getattr(self, a) == '' or getattr(self, a) == [])]

        values = self.queryExec.execute(self.empty_props)
        for key in values.keys():
            setattr(self, key, values[key])

    def to_json(self):
        return {
            "disabled": self.disabled,
            "size": self.size,
            "type": self.type_,
            "image": self.image
        }