from Entities.Compositional.Paragraph import Paragraph
from Entities.Compositional.TextProperties import TextProperties
from Entities.Structural.ElementsPair import ElementsPair
from QueryAntology.Utils.QueryExecutor import QueryExecutor


class QueryMain:

    def __init__(self):
        self.queryExecutor = QueryExecutor()
        self.keyToQuery = {
                            "section_arrange": ["?individual ins:sectionArrange ?section_arrange .", "?section_arrange"],
                            "background_color": ["?individual ins:backgroundColor ?background_color .", "?background_color"],
                            "elements": [
                                """ ?individual ins:containsContentSectionElements ?paragraph .
                                    ?paragraph ins:isBold ?isBold .
                                    ?paragraph ins:isItalic ?isItalic .
                                    ?paragraph ins:hasUnderline ?hasUnderline .
                                    ?paragraph ins:fontColor ?font_color .
                                    ?paragraph ins:fontSize ?font_size .
                                    ?paragraph ins:fontStyle ?font_style .
                                    ?paragraph ins:hasTextString ?text .
                                """, "?isBold ?isItalic ?hasUnderline ?font_color ?font_size ?font_style ?text"
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
            if key not in ["isItalic", "isBold", "hasUnderline", "font_color", "font_size", "font_style", "text", "elements"]:
                val = query_result["results"]["bindings"][0][key]["value"]
                if not val.startswith("/"):
                    val = val.replace("-", "_").upper()
                if val.isnumeric():
                    val = int(val)
                result_map[key] = val

        result_ = ''

        if "elements" in given_keys:
            has = False
            val = query_result["results"]["bindings"][0]["isBold"]["value"]
            if val == 'true':
                result_ = "BOLD"
                has = True
            val = query_result["results"]["bindings"][0]["isItalic"]["value"]
            if val == 'true':
                if has is True:
                    result_ += "_ITALIC"
                else:
                    result_ = "ITALIC"
                has = True
            val = query_result["results"]["bindings"][0]["hasUnderline"]["value"]
            if val == 'true':
                if has is True:
                    result_ += "_UNDERLINED"
                else:
                    result_ = "UNDERLINED"

            if result_ == "":
                result_ = "REGULAR"

            pr = TextProperties(query_result["results"]["bindings"][0]["font_color"]["value"],
                                query_result["results"]["bindings"][0]["font_style"]["value"],
                                query_result["results"]["bindings"][0]["font_size"]["value"],
                                result_)
            paragraph = Paragraph(pr.to_json(), 'WHITE', query_result["results"]["bindings"][0]["text"]["value"])
            result_map["elements"] = [ElementsPair(1, {"paragraph": paragraph.to_json()}, "").to_json()]

        return result_map

