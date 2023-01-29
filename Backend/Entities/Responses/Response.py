class Response:
    def __init__(self, sections, header, navbar, principal, aside, footer, alert):
        self.sections = sections
        self.header = header
        self.navbar = navbar
        self.principal = principal
        self.aside = aside
        self.footer = footer
        self.alert = alert

    def to_json(self):
        for i in range(0, len(self.sections)):
            self.sections[i] = self.sections[i].upper()

        response = {}

        for key in self.sections:
            if key == "HEADER":
                response[key.lower()] = self.header.to_json()
            elif key == "NAVBAR":
                response[key.lower()] = self.navbar.to_json()
            elif key == "MAIN" or key == "TABLE" or key == "LIST":
                response[key.lower()] = self.principal.to_json()
            elif key == "FOOTER":
                response[key.lower()] = self.footer.to_json()
            elif key == "ALERT":
                response[key.lower()] = self.alert.to_json()

            return {
                "status": "SUCCESS",
                "response": response
            }
