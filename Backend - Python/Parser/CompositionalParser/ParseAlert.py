from Entities.Compositional.Alert import Alert
from Entities.Properties.AvailableProperties import AvailableProperties


class ParseAlert:

    def __init__(self):
        self.prop = AvailableProperties()

    def parse(self, element):
        delay = ''
        text = ''

        if element.find("after") != -1:
            start = element.find("after") + len("after") + 1
            end = element.find("seconds") - 1
            delay = int(element[start:end])

        if element.find("displaying") == -1:
            raise Exception("Alerts must contain displaying clause")

        if element.find("displaying ") != -1:
            start = element.find("displaying ") + len("displaying ") + 1
            end = element.find("\"", start)
            if end == -1:
                raise Exception("Alert text must be enclosed inside \"\"")
            text = element[start: end].replace(".", "")

        el = Alert(text, delay)
        return el.to_json()


if __name__ == "__main__":
    p = ParseAlert()
    print(p.parse("An alert displaying \"welcome to our website\""))