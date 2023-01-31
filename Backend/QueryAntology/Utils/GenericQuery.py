from QueryAntology.Utils.QueryExecutor import QueryExecutor


class GenericQuery:

    def __init__(self):
        self.queryExecutor = QueryExecutor()

    def construct_query(self, keys, key_to_query):
        data = ''
        individuals = '?individual'

        for key in keys:
            data += key_to_query[key][0]
            individuals += " " + key_to_query[key][1]

        query = """
        SELECT {individuals}
        WHERE {
            {data}
        }
        """.replace("{individuals}", individuals).replace("{data}", data)

        return query

    def execute(self, keys, key_to_query, item=''):
        query = self.construct_query(keys, key_to_query)
        query_result = self.queryExecutor.execute_query(query)
        keys = query_result["head"]["vars"][1:]

        index = 0
        if item != '':
            t = 0
            for i in query_result["results"]["bindings"]:
                if i["individual"]["value"].lower().find(item) != -1:
                    index = t
                t = t + 1

        result_map = {}

        for key in keys:
            val = query_result["results"]["bindings"][index][key]["value"]
            if not val.startswith("/") and not val.startswith("https"):
                val = val.replace("-", "_").upper()
            if val.isnumeric():
                val = int(val)
            result_map[key] = val

        return result_map
