from QueryAntology.QueryAlert import QueryAlert


class Alert:

    def __init__(self, text, delay):
        self.text = text
        self.delay = delay

        self.queryExec = QueryAlert()

        self.empty_props = [a for a in dir(self) if
                            not a.startswith('__') and (getattr(self, a) == '' or getattr(self, a) == [])]

        values = self.queryExec.execute(self.empty_props)
        for key in values.keys():
            setattr(self, key, values[key])

    def to_json(self):
        return {
            "text": self.text,
            "delay": int(self.delay)
        }
