import copy
import json

from Entities.Properties.AvailableProperties import AvailableProperties
from Entities.Responses.ErrorResponse import ErrorResponse
from Parser.CompositionalParser.ParseAlert import ParseAlert
from Parser.StructuralParser.ParseAsideSection import ParseAsideSection
from Parser.StructuralParser.ParseFooterSection import ParseFooterSection
from Parser.StructuralParser.ParseHeaderSection import ParseHeaderSection
from Parser.StructuralParser.ParseList import ParseList
from Parser.StructuralParser.ParseMainSection import ParseMainSection
from Parser.StructuralParser.ParseNavigationBarSection import ParseNavigationBarSection
from Parser.StructuralParser.ParseTable import ParseTable
from collections import Counter
import traceback


class LanguageParser:

    def __init__(self):
        self.list_exceptions = ["Only one of the [main section, table, list] is allowed at the same time",
                                "Number of structural top level elements must be between 1 and 6",
                                "Only one appearance of an top level structural element is possible.",
                                "Aside section states to have arrange value but it does not have a valid value",
                                "Aside section missing having clause even if list of elements is specified",
                                "Footer section states to have arrange value but it does not have a valid value",
                                "Footer section missing having clause even if list of elements is specified",
                                "Header section states to have arrange value but it does not have a valid value",
                                "Header section missing having clause even if list of elements is specified",
                                "Main section states to have arrange value but it does not have a valid value",
                                "Main section missing having clause even if list of elements is specified",
                                "Navigation bar section missing with clause even if list of elements is specified",
                                "Alerts must contain displaying clause", "Alert text must be enclosed inside \"\"",
                                "Web reference not enclosed inside \"\"", "Button type property cannot be set at the same time with image property",
                                "Text value must be enclosed inside \"\"", "Photo gallery cannot have both of and with clauses at the same time",
                                "User profile component missing with clause even if list of elements is specified",
                                "Username should have the length between 3 and 16 characters",
                                "Invalid video expected quality", 'Enclosing " missing from language instantiation']
        self.structural_elements = ["table", "decimal ordered list", "lower-alpha ordered list", "upper-alpha ordered list",
                                    "circle unordored list", "disc unordored list", "square unordored list", "aside",
                                    "main section", "footer", "header", "navigation bar section", "alert"]
        self.prop = AvailableProperties()

        self.parsers = {"HEADER": ParseHeaderSection(), "NAVBAR": ParseNavigationBarSection(), "MAIN": ParseMainSection(),
                        "TABLE": ParseTable(), "LIST": ParseList(), "ASIDE": ParseAsideSection(), "FOOTER": ParseFooterSection(), "ALERT": ParseAlert()}

    def split_by_structural_elements(self, to_parse):
        to_parse = to_parse.lower()
        found_elements = {}

        ## split by structural element
        indexes = []
        items = []
        found = True
        while found is True:
            found = False
            for element in self.structural_elements:
                start = to_parse.rfind(element)
                if start != -1:
                    indexes.append(start)
                    items.append(copy.deepcopy(element))
                    found = True
            if found is True:
                item_start = max(indexes)
                item = ''
                for i in range(0, len(indexes)):
                    if indexes[i] == item_start:
                        item = items[i]

                indexes = []
                items = []
                # find first a before this index
                while item_start >= 1 and (to_parse[item_start] != 'a' or to_parse[item_start-1] != ' ' or to_parse[item_start+1] != ' ')\
                        and (to_parse[item_start] != 'n' or to_parse[item_start-1] != 'a' or to_parse[item_start+1] != ' '):
                    item_start = item_start - 1
                if item_start >= 0:
                    if item_start > 0:
                        item_start = item_start - 1
                    found_elements[item] = to_parse[item_start::].strip(",").strip(" ").strip(".")
                    to_parse = to_parse[0:item_start:]

        return found_elements

    def verify_conditions(self, splitted_elements):
        main_count = 0
        for key in splitted_elements.keys():
            if key in ["table", "decimal ordered list", "lower-alpha ordered list", "upper-alpha ordered list",
                       "circle unordored list", "disc unordored list", "square unordored list", "main section"]:
                main_count += 1
        if main_count > 1:
            raise Exception("Only one of the [main section, table, list] is allowed at the same time")

        if len(splitted_elements.keys()) > 6 or len(splitted_elements.keys()) < 1:
            raise Exception("Number of structural top level elements must be between 1 and 6")

        counter = Counter(splitted_elements.keys())
        for key in splitted_elements.keys():
            if counter[key] > 1:
                raise Exception("Only one appearance of an top level structural element is possible.")

    def to_lower(self, to_parse):
        new_parse = ""
        section = False
        for c in to_parse:
            if c == '"':
                section = not section
            if section is False:
                new_parse += c.upper()
            else:
                new_parse += c

        if section is True:
            raise Exception('Enclosing " missing from language instantiation')
        return new_parse

    def parse(self, to_parse):
        try:
            response = {}
            splitted_elements = self.split_by_structural_elements(to_parse)

            to_parse = self.to_lower(to_parse)

            self.verify_conditions(splitted_elements)

            available_sections = []
            for section in self.prop.section:
                sect = section.lower()
                for key in splitted_elements.keys():
                    if key.find(sect) != -1:

                        available_sections.append(section)
                        response[sect] = self.parsers[section].parse(splitted_elements[key])

            if "navigation bar section" in splitted_elements.keys():
                available_sections.append('NAVBAR')
                response["NAVBAR"] = self.parsers['NAVBAR'].parse(splitted_elements["navigation bar section"])

            response["sections"] = available_sections
            return {
               "status": "SUCCESS",
                "response": response
               }
        except Exception as e:
            traceback.print_exc()
            message = str(e)
            if message in self.list_exceptions:
                return ErrorResponse(message, "POSITION IS UNAVAILABLE").to_json()
            else:
                return ErrorResponse("Wrongly written language instantiation. Please check documentation for better understanding..",
                                     "POSITION IS UNAVAILABLE").to_json()


if __name__ == "__main__":
    parser = LanguageParser()

    response = parser.parse("Build a table, a header section having an image, a navigation "
                 "bar section with a link, a aside section having 5 images, a footer section having a red link with bold and "
                            "underlined displayed text \"go to facebook\" having arial style of 10 pixels referencing \"www.facebook.com\". an alert displaying \"welcome to our website\" after 15 seconds.")
    # response = parser.parse("Build a gray main section having a big green photogallery with photos \"www.images.com/profile\"; \"www.images.com/profile\"; \"www.images.com/profile\"")

    json_object = json.dumps(response, indent=4)
    print(json_object)
    