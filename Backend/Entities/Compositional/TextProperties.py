class TextProperties:

    def __init__(self, font_color, font_style, font_size, font_decoration):
        self.font_color = font_color
        self.font_style = font_style
        self.font_size = font_size
        self.font_decoration = font_decoration

    def to_json(self):
        return {
            "fontColor": self.font_color,
            "fontStyle": self.font_style,
            "fontSize": self.font_size,
            "fontDecoration": self.font_decoration
        }
