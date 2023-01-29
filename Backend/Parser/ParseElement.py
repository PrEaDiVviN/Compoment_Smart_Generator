from Parser.CompositionalParser.ParseAlert import ParseAlert
from Parser.CompositionalParser.ParseAudio import ParseAudio
from Parser.CompositionalParser.ParseButton import ParseButton
from Parser.CompositionalParser.ParseCalendar import ParseCalendar
from Parser.CompositionalParser.ParseHeading import ParseHeading
from Parser.CompositionalParser.ParseImage import ParseImage
from Parser.CompositionalParser.ParseInput import ParseInput
from Parser.CompositionalParser.ParseLink import ParseLink
from Parser.CompositionalParser.ParseParagraph import ParseParagraph
from Parser.CompositionalParser.ParsePhotoGallery import ParsePhotoGallery
from Parser.CompositionalParser.ParseSlider import ParseSlider
from Parser.CompositionalParser.ParseUserProfile import ParseUserProfile
from Parser.CompositionalParser.ParseVideo import ParseVideo


class ParseElement:

    def __init__(self):
        self.elements = ["video", "user profile", "photoGallery", "link", "calendar", "audio", "heading", "paragraph",
                         "input", "button", "alert", "image", "slider"]

        self.parsers = {"video": ParseVideo(), "user profile": ParseUserProfile(), "photoGallery": ParsePhotoGallery(),
                        "link": ParseLink(), "calendar": ParseCalendar(), "audio": ParseAudio(), "heading": ParseHeading(),
                        "paragraph": ParseParagraph(), "input": ParseInput(), "button": ParseButton(),
                        "alert": ParseAlert(), "image": ParseImage(), "slider": ParseSlider()}

    def parse(self, element):
        for e in self.elements:
            if element.find(e) != -1:
                parsed = self.parsers[e].parse(element)
                return {e: parsed}
