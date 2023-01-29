from QueryAntology.QueryCalendar import QueryCalendar


class Calendar:

    def __init__(self, size):
        self.size = size
        self.queryExec = QueryCalendar()

        self.empty_props = [a for a in dir(self) if
                            not a.startswith('__') and (getattr(self, a) == '' or getattr(self, a) == [])]

        values = self.queryExec.execute(self.empty_props)
        for key in values.keys():
            setattr(self, key, values[key])

    def to_json(self):

        return {
            "size": self.size
        }