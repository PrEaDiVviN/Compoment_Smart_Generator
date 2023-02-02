from QueryAntology.QueryPhotoGallery import QueryPhotoGallery


class PhotoGallery:

    def __init__(self, size, background_color, photo_number, images):
        self.size = size
        self.background_color = background_color
        self.photo_number = photo_number
        self.images = images

        self.queryExec = QueryPhotoGallery()

        self.empty_props = [a for a in dir(self) if
                            not a.startswith('__') and (getattr(self, a) == '' or getattr(self, a) == [])]

        values = self.queryExec.execute(self.empty_props)
        for key in values.keys():
            setattr(self, key, values[key])

    def to_json(self):
        return {
            "size": self.size,
            "backgroundColor": self.background_color,
            "photoNumber": self.photo_number,
            "images": self.images
        }
