from QueryAntology.Utils.GenericQuery import GenericQuery


class QueryAudio:

    def __init__(self):
        self.genericQuery = GenericQuery()
        self.keyToQuery = {
                            "playTime": ["?individual ins:currentPlayTimeAudio ?playTime .", "?playTime"],
                            "looped": ["?individual ins:isLoopedAudio ?looped .", "?looped"],
                            "size": ["?individual ins:sizeProperty ?size .", "?size"],
                            "backgroundColor": ["?individual ins:backgroundColor ?backgroundColor .", "?backgroundColor"],
                            "source": ["?individual ins:hasAudioSource ?source .", "?source"],
                            "audio_length": ["?individual ins:audioDuration ?audio_length .", "?audio_length"],
                           }

    def execute(self, keys):
        return self.genericQuery.execute(keys, self.keyToQuery)


if __name__ == "__main__":
    executor = QueryAudio()
    print(executor.execute(['source', 'audio_length', 'size', 'looped']))
