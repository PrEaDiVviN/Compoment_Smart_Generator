from QueryAntology.QueryAudio import QueryAudio


class Audio:

    def __init__(self, size, looped, audio_length, source):
        self.size = size
        self.looped = looped
        self.audio_length = audio_length
        self.source = source

        self.queryExec = QueryAudio()

        self.empty_props = [a for a in dir(self) if
                            not a.startswith('__') and (getattr(self, a) == '' or getattr(self, a) == [])]

        values = self.queryExec.execute(self.empty_props)
        for key in values.keys():
            setattr(self, key, values[key])

    def to_json(self):
        return {
            "size": self.size,
            "looped": self.looped,
            "audioLength": self.audio_length,
            "source": self.source
        }
