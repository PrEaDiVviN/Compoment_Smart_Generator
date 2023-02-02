from QueryAntology.Utils.GenericQuery import GenericQuery
from QueryAntology.Utils.QueryExecutor import QueryExecutor


class QueryHeading:

    def __init__(self):
        self.queryExecutor = QueryExecutor()
        self.genericQuery = GenericQuery()
        self.keyToQuery = {
                            "background_color": ["?individual ins:backgroundColor ?background_color .", "?background_color"],
                            "text": ["?individual ins:hasTextString ?text .", "?text"],
                           }

    def execute(self, keys, text_properties):
        response = self.genericQuery.execute(keys, self.keyToQuery)

        if "text_properties" in keys:
            key_query = {
                "font_color": ["?individual ins:fontColor ?font_color .", "?font_color"],
                "font_style": ["?individual ins:fontStyle ?font_style .", "?font_style"],
                "font_size": ["?individual ins:fontSize ?font_size .", "?font_size"],
                "isItalic": ["?individual ins:isItalic ?isItalic .", "?isItalic"],
                "isBold": ["?individual ins:isBold ?isBold .", "?isBold"],
                "hasUnderline": ["?individual ins:hasUnderline ?hasUnderline .", "?hasUnderline"],
            }
            keys = key_query.keys()

            query = self.genericQuery.construct_query(keys, key_query)
            query_result = self.queryExecutor.execute_query(query)

            keys = query_result["head"]["vars"][1:]

            result_map = {}

            has = False
            val = query_result["results"]["bindings"][0]["isBold"]["value"]
            if val == 'true':
                result_map["font_decoration"] = "BOLD"
                has = True
            val = query_result["results"]["bindings"][0]["isItalic"]["value"]
            if val == 'true':
                if has is True:
                    result_map["font_decoration"] += "_ITALIC"
                else:
                    result_map["font_decoration"] = "ITALIC"
                has = True
            val = query_result["results"]["bindings"][0]["hasUnderline"]["value"]
            if val == 'true':
                if has is True:
                    result_map["font_decoration"] += "_UNDERLINED"
                else:
                    result_map["font_decoration"] = "UNDERLINED"

            for key in keys:
                if key not in ["isItalic", "isBold", "hasUnderline"]:
                    val = query_result["results"]["bindings"][0][key]["value"]
                    if not val.startswith("/"):
                        val = val.replace("-", "_").upper()
                    if val.isnumeric():
                        val = int(val)
                    result_map[key] = val
            response["text_properties"] = result_map

        if type(text_properties) is dict:
            key_query = {
                "font_color": ["?individual ins:fontColor ?font_color .", "?font_color"],
                "font_style": ["?individual ins:fontStyle ?font_style .", "?font_style"],
                "font_size": ["?individual ins:fontSize ?font_size .", "?font_size"],
                "isItalic": ["?individual ins:isItalic ?isItalic .", "?isItalic"],
                "isBold": ["?individual ins:isBold ?isBold .", "?isBold"],
                "hasUnderline": ["?individual ins:hasUnderline ?hasUnderline .", "?hasUnderline"],
            }
            keys = key_query.keys()

            query = self.genericQuery.construct_query(keys, key_query)
            query_result = self.queryExecutor.execute_query(query)

            keys = query_result["head"]["vars"][1:]

            result_map = {}

            has = False
            val = query_result["results"]["bindings"][0]["isBold"]["value"]
            if val == 'true':
                result_map["font_decoration"] = "BOLD"
                has = True
            val = query_result["results"]["bindings"][0]["isItalic"]["value"]
            if val == 'true':
                if has is True:
                    result_map["font_decoration"] += "_ITALIC"
                else:
                    result_map["font_decoration"] = "ITALIC"
                has = True
            val = query_result["results"]["bindings"][0]["hasUnderline"]["value"]
            if val == 'true':
                if has is True:
                    result_map["font_decoration"] += "_UNDERLINED"
                else:
                    result_map["font_decoration"] = "UNDERLINED"

            result_map["font_decoration"] = result_map.get("font_decoration", "REGULAR")

            for key in keys:
                if key not in ["isItalic", "isBold", "hasUnderline"]:
                    val = query_result["results"]["bindings"][0][key]["value"]
                    if not val.startswith("/"):
                        val = val.replace("-", "_").upper()
                    if val.isnumeric():
                        val = int(val)
                    result_map[key] = val

            for key in text_properties:
                if text_properties[key] == '':
                    el_key = "font_" + key[4:].lower()
                    text_properties[key] = result_map[el_key]
            response["text_properties"] = text_properties
        return response


if __name__ == "__main__":
    executor = QueryHeading()
    print(executor.execute(['background_color', 'text']))
