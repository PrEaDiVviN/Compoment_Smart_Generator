from Entities.Compositional.Image import Image
from Entities.Compositional.Paragraph import Paragraph
from Entities.Compositional.TextProperties import TextProperties
from Entities.Structural.ElementsPair import ElementsPair
from QueryAntology.Utils.QueryExecutor import QueryExecutor


class QueryFooter:

    def __init__(self):
        self.queryExecutor = QueryExecutor()
        self.keyToQuery = {
            "section_arrange": ["?individual ins:sectionArrange ?section_arrange .", "?section_arrange"],
            "background_color": ["?individual ins:backgroundColor ?background_color .", "?background_color"],
            "elements": [
                """ ?individual ins:containsContentSectionElements ?image .
                                    ?image ins:sizeProperty ?size .
                                    ?image ins:hasImageSource ?source .
                                """, "?size ?source"
            ]
        }

    def execute(self, given_keys):
        data = ''
        individuals = '?individual'

        for key in given_keys:
            data += " " + self.keyToQuery[key][0]
            individuals += " " + self.keyToQuery[key][1]

        query = """
        SELECT {individuals}
        WHERE {
            {data}
        }
        """.replace("{individuals}", individuals).replace("{data}", data)
        query_result = self.queryExecutor.execute_query(query)
        keys = query_result["head"]["vars"][1:]

        result_map = {}

        for key in keys:
            if key not in ["size", "source"]:
                val = query_result["results"]["bindings"][0][key]["value"]
                if not val.startswith("/"):
                    val = val.replace("-", "_").upper()
                if val.isnumeric():
                    val = int(val)
                result_map[key] = val

        if "elements" in given_keys:
            img = Image(query_result["results"]["bindings"][0]["size"]["value"],
                        query_result["results"]["bindings"][0]["source"]["value"])

            result_map["elements"] = [ElementsPair(1, {"image": img.to_json()}, "").to_json()]

        return result_map
