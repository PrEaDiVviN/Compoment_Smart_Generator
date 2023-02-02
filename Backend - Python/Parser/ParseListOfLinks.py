from Entities.Properties.AvailableProperties import AvailableProperties
from Parser.CompositionalParser.ParseLink import ParseLink


class ParseListOfLinks:

    def __init__(self):
        self.prop = AvailableProperties()
        self.item_parser = ParseLink()

    def parse(self, list_of_links):
        result = []
        for el in list_of_links:
            res = self.item_parser.parse(el)
            result.append(res)

        return result