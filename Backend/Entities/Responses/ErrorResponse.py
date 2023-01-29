class ErrorResponse:

    def __init__(self, error_reason, position_in_text):
        self.error_reason = error_reason
        self.position_in_text = position_in_text

    def to_json(self):
        return {
            "status": "ERROR",
            "response": {
                "reason": self.error_reason,
                "positionInText": self.position_in_text
            }
        }
    