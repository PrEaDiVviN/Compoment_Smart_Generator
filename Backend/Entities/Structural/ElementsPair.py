class ElementsPair:

    def __init__(self, apparitions, element, position):
        self.apparitions = apparitions
        self.element = element
        self.position = position

    def to_json(self):
        return {
            "apparitions": self.apparitions,
            "element": self.element,
            "position": self.position
        }