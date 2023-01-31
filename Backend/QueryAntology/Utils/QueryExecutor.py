import json

import rdflib


class QueryExecutor:

    def __init__(self):
        self.graph = rdflib.Graph()
        self.graph.parse('./antology/Antology.owl', format='application/rdf+xml')
        self.nif = rdflib.Namespace('http://www.semanticweb.org/pread/ontologies/2022/11/InteractiveControlsAntology#')
        self.graph.bind('nif', self.nif)

    def execute_query(self, query):
        template_query = f"""
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdf:<http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
        PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> 
        PREFIX ins:<http://www.semanticweb.org/pread/ontologies/2022/11/InteractiveControlsAntology#>
        {query}
                """
        result = self.graph.query(template_query)
        return json.loads(result.serialize(format='json').decode("utf-8"))
