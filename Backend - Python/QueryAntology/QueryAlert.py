from QueryAntology.Utils.GenericQuery import GenericQuery


class QueryAlert:

    def __init__(self):
        self.genericQuery = GenericQuery()
        self.keyToQuery = {
                            "text": ["?individual ins:hasAlertMessageString ?text .", "?text"],
                            "delay": ["?individual ins:timeBeforeAlert ?delay .", "?delay"],
                            "isDelayed": ["?individual ins:isTimedAlert ?isDelayed .", "?isDelayed"],
                           }

    def execute(self, keys):
        return self.genericQuery.execute(keys, self.keyToQuery)


if __name__ == "__main__":
    executor = QueryAlert()
    print(executor.execute(['text', 'delay']))
