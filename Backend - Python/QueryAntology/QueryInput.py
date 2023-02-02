from QueryAntology.Utils.GenericQuery import GenericQuery
from QueryAntology.Utils.QueryExecutor import QueryExecutor


class QueryInput:

    def __init__(self):
        self.queryExecutor = QueryExecutor()
        self.genericQuery = GenericQuery()
        self.keyToQuery = {
                            "background_color": ["?individual ins:backgroundColor ?background_color .", "?background_color"],
                            "size": ["?individual ins:sizeProperty ?size .", "?size"],
                           }

    def execute(self, keys, text_properties):
        response = {}
        if len(keys) != 0 :
            response = self.genericQuery.execute(keys, self.keyToQuery, "input")

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

            index = 0
            t = 0
            for i in query_result["results"]["bindings"]:
                if i["individual"]["value"].lower().find("input") != -1:
                    index = t
                t = t + 1

            keys = query_result["head"]["vars"][1:]

            result_map = {}

            has = False
            val = query_result["results"]["bindings"][index]["isBold"]["value"]
            if val == 'true':
                result_map["font_decoration"] = "BOLD"
                has = True
            val = query_result["results"]["bindings"][index]["isItalic"]["value"]
            if val == 'true':
                if has is True:
                    result_map["font_decoration"] += "_ITALIC"
                else:
                    result_map["font_decoration"] = "ITALIC"
                has = True
            val = query_result["results"]["bindings"][index]["hasUnderline"]["value"]
            if val == 'true':
                if has is True:
                    result_map["font_decoration"] += "_UNDERLINED"
                else:
                    result_map["font_decoration"] = "UNDERLINED"

            for key in keys:
                if key not in ["isItalic", "isBold", "hasUnderline"]:
                    val = query_result["results"]["bindings"][index][key]["value"]
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

            index = 0
            t = 0
            for i in query_result["results"]["bindings"]:
                if i["individual"]["value"].lower().find("input") != -1:
                    index = t
                t = t + 1

            keys = query_result["head"]["vars"][1:]

            result_map = {}

            has = False
            val = query_result["results"]["bindings"][index]["isBold"]["value"]
            if val == 'true':
                result_map["font_decoration"] = "BOLD"
                has = True
            val = query_result["results"]["bindings"][index]["isItalic"]["value"]
            if val == 'true':
                if has is True:
                    result_map["font_decoration"] += "_ITALIC"
                else:
                    result_map["font_decoration"] = "ITALIC"
                has = True
            val = query_result["results"]["bindings"][index]["hasUnderline"]["value"]
            if val == 'true':
                if has is True:
                    result_map["font_decoration"] += "_UNDERLINED"
                else:
                    result_map["font_decoration"] = "UNDERLINED"

            result_map["font_decoration"] = result_map.get("font_decoration", "REGULAR")

            for key in keys:
                if key not in ["isItalic", "isBold", "hasUnderline"]:
                    val = query_result["results"]["bindings"][index][key]["value"]
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
