from Entities.Compositional.Image import Image
from QueryAntology.Utils.QueryExecutor import QueryExecutor


class QueryTable:

    def __init__(self):
        self.queryExecutor = QueryExecutor()
        self.keyToQuery = {
                            "background_color": ["?individual ins:backgroundColor ?background_color .", "?background_color"],
                            "border_color": ["?individual ins:borderColor ?border_color .", "?border_color"],
                            "border_style": ["?individual ins:borderStyle ?border_style .", "?border_style"],
                            "border_width": ["?individual ins:borderWidth ?border_width .", "?border_width"],
                            "has_number_columns": ["?individual ins:hasNumberColumns ?has_number_columns .", "?has_number_columns"],
                            "has_number_lines": ["?individual ins:hasNumberLines ?has_number_lines .", "?has_number_lines"],
                            "table_order": ["?individual ins:tableOrder ?table_order .", "?table_order"],
                            "table_arrange": ["?individual ins:tableArrange ?table_arrange .", "?table_arrange"],
                            "matrix": [
                                """ 
                                    ?image ins:backgroundColor ?imageColor .
                                    ?image ins:sizeProperty ?imageSize .
                                    ?image ins:hasImageSource ?imageSource .
                                """, "?imageColor ?imageSize ?imageSource"
                            ]
                           }

    def execute(self, keys):
        data = ''
        individuals = '?individual'

        for key in keys:
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

        if query.find("image") != -1:
            image = Image(query_result["results"]["bindings"][0]["imageSize"]["value"],
                          query_result["results"]["bindings"][0]["imageSource"]["value"])
            result_map["matrix"] = [{"image": image.to_json()}, ]

        keys_others = [key for key in keys if not key.startswith("image")]
        for key in keys_others:
            if query_result["results"]["bindings"][0][key]["value"].isnumeric():
                result_map[key] = int(query_result["results"]["bindings"][0][key]["value"])
            else:
                result_map[key] = query_result["results"]["bindings"][0][key]["value"].lower().upper()

        return result_map


if __name__ == "__main__":
    executor = QueryTable()
    print(executor.execute(['border_color', 'border_style', 'border_width', 'table_order', 'matrix']))

