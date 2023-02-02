import copy

from QueryAntology.QueryTable import QueryTable


class Table:

    def __init__(self, background_color, border_color, border_style, border_width, has_number_columns,
                 has_number_lines, table_order, table_arrange, matrix):

        self.queryExec = QueryTable()

        self.background_color = background_color
        self.border_color = border_color
        self.border_style = border_style
        self.border_width = border_width
        self.has_number_columns = has_number_columns
        self.has_number_lines = has_number_lines
        self.table_order = table_order
        self.table_arrange = table_arrange
        self.matrix = matrix # returned as a list

        self.empty_props = [a for a in dir(self) if not a.startswith('__') and (getattr(self, a) == '' or getattr(self, a) == [])]

        values = self.queryExec.execute(self.empty_props)
        for key in values.keys():
            setattr(self, key, values[key])

    def to_json(self):
        local_matrix = [['' for j in range(0, self.has_number_columns)] for i in range(0, self.has_number_lines)]
        index = 0

        if self.table_arrange == 'COLUMNS':
            if self.table_order == 'START_TO_FINISH' or self.table_order == '':
                for j in range(0, self.has_number_columns):
                    if index >= len(self.matrix):
                        break
                    for i in range(0, self.has_number_lines):
                        local_matrix[i][j] = self.matrix[index]
                        index = index + 1
                        if index >= len(self.matrix):
                            break
            else:
                for j in range(0, self.has_number_columns):
                    if index >= len(self.matrix):
                        break
                    for i in range(self.has_number_lines - 1, -1, -1):
                        local_matrix[i][j] = self.matrix[index]
                        index = index + 1
                        if index >= len(self.matrix):
                            break

        else:
            if self.table_order == 'START_TO_FINISH' or self.table_order == '':
                for i in range(0, self.has_number_lines):
                    if index >= len(self.matrix):
                        break
                    for j in range(0, self.has_number_columns):
                        local_matrix[i][j] = self.matrix[index]
                        index = index + 1
                        if index >= len(self.matrix):
                            break
            else:
                for i in range(self.has_number_lines-1, -1, -1):
                    if index >= len(self.matrix):
                        break
                    for j in range(0, self.has_number_columns):
                        local_matrix[i][j] = self.matrix[index]
                        index = index + 1
                        if index >= len(self.matrix):
                            break

        self.matrix = copy.deepcopy(local_matrix)

        return {
            "backgroundColor": self.background_color,
            "numberLines": self.has_number_lines,
            "numberColumns": self.has_number_columns,
            "borderColor": self.border_color,
            "borderStyle": self.border_style,
            "borderWidth": self.border_width,
            "matrix": self.matrix
        }
