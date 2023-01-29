from Entities.Compositional.Image import Image
from QueryAntology.Utils.QueryExecutor import QueryExecutor


class QueryPhotoGallery:

    def __init__(self):
        self.queryExecutor = QueryExecutor()
        self.keyToQuery = {
                            "size": ["?individual ins:sizeProperty ?size .", "?size"],
                            "background_color": ["?individual ins:backgroundColor ?background_color .", "?background_color"],
                            "images": [
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
            result_map["images"] = [{"image": image.to_json()} for _ in range(0, 5)]

        keys_others = [key for key in keys if not key.startswith("image")]
        for key in keys_others:
            if query_result["results"]["bindings"][0][key]["value"].isnumeric():
                result_map[key] = int(query_result["results"]["bindings"][0][key]["value"])
            else:
                result_map[key] = query_result["results"]["bindings"][0][key]["value"].lower().upper()

        return result_map


if __name__ == "__main__":
    executor = QueryPhotoGallery()
    print(executor.execute(['border_color', 'border_style', 'border_width', 'table_order', 'matrix']))

