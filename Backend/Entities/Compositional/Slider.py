from QueryAntology.QuerySlider import QuerySlider


class Slider:

    def __init__(self, size, min_value, max_value):
        self.size = size
        self.min_value = min_value
        self.max_value = max_value

        self.queryExec = QuerySlider()

        self.empty_props = [a for a in dir(self) if
                            not a.startswith('__') and (getattr(self, a) == '' or getattr(self, a) == [])]

        values = self.queryExec.execute(self.empty_props)
        for key in values.keys():
            setattr(self, key, values[key])

    def to_json(self):
        return {
            "size": self.size,
            "minValue": self.min_value,
            "maxValue": self.max_value
        }
