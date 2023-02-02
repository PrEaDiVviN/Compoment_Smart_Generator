from QueryAntology.Utils.GenericQuery import GenericQuery


class QueryVideo:

    def __init__(self):
        self.genericQuery = GenericQuery()
        self.keyToQuery = {
                            "playTime": ["?individual ins:currentPlayTimeVideo ?playTime .", "?playTime"],
                            "quality": ["?individual ins:videoQualityPixels ?quality .", "?quality"],
                            "looped": ["?individual ins:isLoopedVideo ?looped .", "?looped"],
                            "size": ["?individual ins:sizeProperty ?size .", "?size"],
                            "background_color": ["?individual ins:backgroundColor ?background_color .", "?background_color"],
                            "source": ["?individual ins:hasVideoSource ?source .", "?source"],
                            "video_length": ["?individual ins:videoDuration ?video_length .", "?video_length"],
                           }

    def execute(self, keys):
        return self.genericQuery.execute(keys, self.keyToQuery)


if __name__ == "__main__":
    executor = QueryVideo()
    print(executor.execute(['source', 'video_length', 'size', 'looped']))
