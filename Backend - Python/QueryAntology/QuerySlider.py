from QueryAntology.Utils.GenericQuery import GenericQuery


class QuerySlider:

    def __init__(self):
        self.genericQuery = GenericQuery()
        self.keyToQuery = {
                            "background_color": ["?individual ins:backgroundColor ?background_color .", "?background_color"],
                            "size": ["?individual ins:sizeProperty ?size .", "?size"],
                            "min_value": ["?individual ins:minSlidingValue ?min_value .", "?min_value"],
                            "max_value": ["?individual ins:maxSlidingValue ?max_value .", "?max_value"],
                           }

    def execute(self, keys):
        return self.genericQuery.execute(keys, self.keyToQuery)


if __name__ == "__main__":
    executor = QuerySlider()
    print(executor.execute(['size']))

