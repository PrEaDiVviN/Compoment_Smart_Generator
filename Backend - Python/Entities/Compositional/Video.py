from QueryAntology.QueryVideo import QueryVideo


class Video:

    def __init__(self, size, looped, video_length, source, quality):
        self.size = size
        self.looped = looped
        self.video_length = video_length
        self.source = source
        self.quality = quality

        self.queryExec = QueryVideo()

        self.empty_props = [a for a in dir(self) if
                            not a.startswith('__') and (getattr(self, a) == '' or getattr(self, a) == [])]

        values = self.queryExec.execute(self.empty_props)
        for key in values.keys():
            setattr(self, key, values[key])

    def to_json(self):
        return {
            "size": self.size,
            "looped": self.looped,
            "videoLength": self.video_length,
            "source": self.source,
            "quality": self.quality
        }
