from QueryAntology.Utils.GenericQuery import GenericQuery


class QueryButton:

    def __init__(self):
        self.genericQuery = GenericQuery()
        self.keyToQuery = {
                            "disabled": ["?individual ins:isDisabled ?disabled .", "?disabled"],
                            "size": ["?individual ins:sizeProperty ?size .", "?size"],
                            "image": ["?individual ins:buttonImageSource ?image .", "?image"],
                            "backgroundColor": ["?individual ins:backgroundColor ?source .", "?backgroundColor"],
                           }

    def execute(self, keys):
        return self.genericQuery.execute(keys, self.keyToQuery)


if __name__ == "__main__":
    executor = QueryButton()
    print(executor.execute(['disabled', 'size', 'image']))
