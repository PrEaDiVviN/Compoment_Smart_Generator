from QueryAntology.Utils.GenericQuery import GenericQuery


class QueryImage:

    def __init__(self):
        self.genericQuery = GenericQuery()
        self.keyToQuery = {
                            "background_color": ["?individual ins:backgroundColor ?background_color .", "?background_color"],
                            "size": ["?individual ins:sizeProperty ?size .", "?size"],
                            "source": ["?individual ins:hasImageSource ?source .", "?source"]
                           }

    def execute(self, keys):
        return self.genericQuery.execute(keys, self.keyToQuery)


if __name__ == "__main__":
    executor = QuerySlider()
    print(executor.execute(['size']))

