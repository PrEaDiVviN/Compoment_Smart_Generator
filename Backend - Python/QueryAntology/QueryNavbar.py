from Entities.Compositional.Link import Link
from Entities.Compositional.TextProperties import TextProperties
from QueryAntology.Utils.GenericQuery import GenericQuery
from QueryAntology.Utils.QueryExecutor import QueryExecutor


class QueryNavbar:

    def __init__(self):
        self.queryExecutor = QueryExecutor()
        self.genericQuery = GenericQuery()
        self.keyToQuery = {
                            "background_color": ["?individual ins:backgroundColor ?background_color .", "?background_color"],
                           }

    def execute(self, keys):
        found = "elements" in keys

        if found:
            keys.remove("elements")
        response = self.genericQuery.execute(keys, self.keyToQuery)

        if found:
            font_p = TextProperties('', '', '', '')
            response["elements"] = [Link('', '', '', font_p.to_json()).to_json()]

        return response


if __name__ == "__main__":
    executor = QueryNavbar()
    print(executor.execute(['background_color', 'text']))
