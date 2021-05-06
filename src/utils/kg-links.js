const biolink_lookup = {
    "APO": "http://purl.obolibrary.org/obo/APO_",
    "Aeolus": "http://translator.ncats.nih.gov/Aeolus_",
    "BIOGRID": "http://identifiers.org/biogrid/",
    "BIOSAMPLE": "http://identifiers.org/biosample/",
    "BSPO": "http://purl.obolibrary.org/obo/BSPO_",
    "CAID": "http://reg.clinicalgenome.org/redmine/projects/registry/genboree_registry/by_caid?caid=",
    "CHEBI": "http://purl.obolibrary.org/obo/CHEBI_",
    "CHEMBL.COMPOUND": "http://identifiers.org/chembl.compound/",
    "CHEMBL.MECHANISM": "https://www.ebi.ac.uk/chembl/mechanism/inspect/",
    "CHEMBL.TARGET": "http://identifiers.org/chembl.target/",
    "CID": "http://pubchem.ncbi.nlm.nih.gov/compound/",
    "CL": "http://purl.obolibrary.org/obo/CL_",
    "CLINVAR": "http://identifiers.org/clinvar/",
    "CLO": "http://purl.obolibrary.org/obo/CLO_",
    "COAR_RESOURCE": "http://purl.org/coar/resource_type/",
    "CPT": "https://www.ama-assn.org/practice-management/cpt/",
    "CTD": "http://translator.ncats.nih.gov/CTD_",
    "ClinVarVariant": "http://www.ncbi.nlm.nih.gov/clinvar/variation/",
    "DBSNP": "http://identifiers.org/dbsnp/",
    "DGIdb": "https://www.dgidb.org/interaction_types",
    "DOID": "http://purl.obolibrary.org/obo/DOID_",
    "DRUGBANK": "http://identifiers.org/drugbank/",
    "DrugCentral": "http://translator.ncats.nih.gov/DrugCentral_",
    "EC": "http://www.enzyme-database.org/query.php?ec=",
    "ECTO": "http://purl.obolibrary.org/obo/ECTO_",
    "EDAM-DATA": "http://edamontology.org/data_",
    "EDAM-FORMAT": "http://edamontology.org/format_",
    "EDAM-OPERATION": "http://edamontology.org/operation_",
    "EDAM-TOPIC": "http://edamontology.org/topic_",
    "EFO": "http://identifiers.org/efo/",
    "ENSEMBL": "http://identifiers.org/ensembl/",
    "ExO": "http://purl.obolibrary.org/obo/ExO_",
    "FAO": "http://purl.obolibrary.org/obo/FAO_",
    "FB": "http://identifiers.org/fb/",
    "FBcv": "http://purl.obolibrary.org/obo/FBcv_",
    "FlyBase": "http://flybase.org/reports/",
    "GAMMA": "http://translator.renci.org/GAMMA_",
    "GO": "http://purl.obolibrary.org/obo/GO_",
    "GOLD.META": "http://identifiers.org/gold.meta/",
    "GOP": "http://purl.obolibrary.org/obo/go#",
    "GOREL": "http://purl.obolibrary.org/obo/GOREL_",
    "GSID": "https://scholar.google.com/citations?user=",
    "GTEx": "https://www.gtexportal.org/home/gene/",
    "HANCESTRO": "http://www.ebi.ac.uk/ancestro/ancestro_",
    "HCPCS": "http://purl.bioontology.org/ontology/HCPCS/",
    "HGNC": "http://identifiers.org/hgnc/",
    "HGNC.FAMILY": "http://identifiers.org/hgnc.family/",
    "HMDB": "http://identifiers.org/hmdb/",
    "HP": "http://purl.obolibrary.org/obo/HP_",
    "ICD0": "http://translator.ncats.nih.gov/ICD0_",
    "ICD10": "http://translator.ncats.nih.gov/ICD10_",
    "ICD9": "http://translator.ncats.nih.gov/ICD9_",
    "INCHI": "http://identifiers.org/inchi/",
    "INCHIKEY": "http://identifiers.org/inchikey/",
    "INTACT": "http://identifiers.org/intact/",
    "IUPHAR.FAMILY": "http://identifiers.org/iuphar.family/",
    "KEGG": "http://identifiers.org/kegg/",
    "LOINC": "http://loinc.org/rdf/",
    "MEDDRA": "http://identifiers.org/meddra/",
    "MESH": "http://identifiers.org/mesh/",
    "MGI": "http://identifiers.org/mgi/",
    "MI": "http://purl.obolibrary.org/obo/MI_",
    "MIR": "http://identifiers.org/mir/",
    "MONDO": "http://purl.obolibrary.org/obo/MONDO_",
    "MP": "http://purl.obolibrary.org/obo/MP_",
    "MSigDB": "https://www.gsea-msigdb.org/gsea/msigdb/",
    "MetaCyc": "http://translator.ncats.nih.gov/MetaCyc_",
    "NCBIGENE": "http://identifiers.org/ncbigene/",
    "NCBITaxon": "http://purl.obolibrary.org/obo/NCBITaxon_",
    "NCIT": "http://purl.obolibrary.org/obo/NCIT_",
    "NDDF": "http://purl.bioontology.org/ontology/NDDF/",
    "NLMID": "https://www.ncbi.nlm.nih.gov/nlmcatalog/?term=",
    "OBAN": "http://purl.org/oban/",
    "OBOREL": "http://purl.obolibrary.org/obo/RO_",
    "OIO": "http://www.geneontology.org/formats/oboInOwl#",
    "OMIM": "http://purl.obolibrary.org/obo/OMIM_",
    "ORCID": "https://orcid.org/",
    "ORPHA": "http://www.orpha.net/ORDO/Orphanet_",
    "ORPHANET": "http://identifiers.org/orphanet/",
    "PANTHER.FAMILY": "http://identifiers.org/panther.family/",
    "PANTHER.PATHWAY": "http://identifiers.org/panther.pathway/",
    "PATO-PROPERTY": "http://purl.obolibrary.org/obo/pato#",
    "PDQ": "https://www.cancer.gov/publications/pdq#",
    "PHARMGKB.DRUG": "http://identifiers.org/pharmgkb.drug/",
    "PHARMGKB.PATHWAYS": "http://identifiers.org/pharmgkb.pathways/",
    "PHAROS": "http://pharos.nih.gov",
    "PMID": "http://www.ncbi.nlm.nih.gov/pubmed/",
    "PO": "http://purl.obolibrary.org/obo/PO_",
    "POMBASE": "http://identifiers.org/pombase/",
    "PR": "http://purl.obolibrary.org/obo/PR_",
    "PUBCHEM.COMPOUND": "http://identifiers.org/pubchem.compound/",
    "PUBCHEM.SUBSTANCE": "http://identifiers.org/pubchem.substance/",
    "PathWhiz": "http://smpdb.ca/pathways/#",
    "REACT": "http://www.reactome.org/PathwayBrowser/#/",
    "REPODB": "http://apps.chiragjpgroup.org/repoDB/",
    "RGD": "http://identifiers.org/rgd/",
    "RHEA": "http://identifiers.org/rhea/",
    "RNACENTRAL": "http://identifiers.org/rnacentral/",
    "RO": "http://purl.obolibrary.org/obo/RO_",
    "RTXKG1": "http://kg1endpoint.rtx.ai/",
    "RXNORM": "http://purl.bioontology.org/ontology/RXNORM/",
    "ResearchID": "https://publons.com/researcher/",
    "SEMMEDDB": "https://skr3.nlm.nih.gov/SemMedDB",
    "SGD": "http://identifiers.org/sgd/",
    "SIO": "http://semanticscience.org/resource/SIO_",
    "SMPDB": "http://identifiers.org/smpdb/",
    "SNOMEDCT": "http://identifiers.org/snomedct/",
    "SNPEFF": "http://translator.ncats.nih.gov/SNPEFF_",
    "ScopusID": "https://www.scopus.com/authid/detail.uri?authorId=",
    "TAXRANK": "http://purl.obolibrary.org/obo/TAXRANK_",
    "UBERGRAPH": "http://translator.renci.org/ubergraph-axioms.ofn#",
    "UBERON": "http://purl.obolibrary.org/obo/UBERON_",
    "UBERON_CORE": "http://purl.obolibrary.org/obo/uberon/core#",
    "UMLS": "http://identifiers.org/umls/",
    "UMLSSC": "https://metamap.nlm.nih.gov/Docs/SemanticTypes_2018AB.txt/code#",
    "UMLSSG": "https://metamap.nlm.nih.gov/Docs/SemGroups_2018.txt/group#",
    "UMLSST": "https://metamap.nlm.nih.gov/Docs/SemanticTypes_2018AB.txt/type#",
    "UNII": "http://identifiers.org/unii/",
    "UPHENO": "http://purl.obolibrary.org/obo/UPHENO_",
    "UniProtKB": "http://identifiers.org/uniprot/",
    "VANDF": "https://www.nlm.nih.gov/research/umls/sourcereleasedocs/current/VANDF/",
    "VMC": "https://github.com/ga4gh/vr-spec/",
    "WB": "http://identifiers.org/wb/",
    "WBPhenotype": "http://purl.obolibrary.org/obo/WBPhenotype_",
    "WBVocab": "http://bio2rdf.org/wormbase_vocabulary",
    "WIKIDATA": "https://www.wikidata.org/wiki/",
    "WIKIDATA_PROPERTY": "https://www.wikidata.org/wiki/Property:",
    "WIKIPATHWAYS": "http://identifiers.org/wikipathways/",
    "WormBase": "https://www.wormbase.org/get?name=",
    "ZFIN": "http://identifiers.org/zfin/",
    "ZP": "http://purl.obolibrary.org/obo/ZP_",
    "alliancegenome": "https://www.alliancegenome.org/",
    "biolink": "https://w3id.org/biolink/vocab/",
    "biolinkml": "https://w3id.org/biolink/biolinkml/",
    "chembio": "http://translator.ncats.nih.gov/chembio_",
    "dcterms": "http://purl.org/dc/terms/",
    "dictyBase": "http://dictybase.org/gene/",
    "doi": "https://doi.org/",
    "fabio": "http://purl.org/spar/fabio/",
    "foaf": "http://xmlns.com/foaf/0.1/",
    "foodb.compound": "http://foodb.ca/compounds/",
    "gff3": "https://github.com/The-Sequence-Ontology/Specifications/blob/master/gff3.md#",
    "gpi": "https://github.com/geneontology/go-annotation/blob/master/specs/gpad-gpi-2-0.md#",
    "gtpo": "https://rdf.guidetopharmacology.org/ns/gtpo#",
    "hetio": "http://translator.ncats.nih.gov/hetio_",
    "interpro": "https://www.ebi.ac.uk/interpro/entry/",
    "isbn": "https://www.isbn-international.org/identifier/",
    "isni": "https://isni.org/isni/",
    "issn": "https://portal.issn.org/resource/ISSN/",
    "medgen": "https://www.ncbi.nlm.nih.gov/medgen/",
    "oboformat": "http://www.geneontology.org/formats/oboInOWL#",
    "pav": "http://purl.org/pav/",
    "prov": "http://www.w3.org/ns/prov#",
    "qud": "http://qudt.org/1.1/schema/qudt#",
    "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "skos": "https://www.w3.org/TR/skos-reference/#",
    "wgs": "http://www.w3.org/2003/01/geo/wgs84_pos",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "@vocab": "https://w3id.org/biolink/vocab/"
}

export const kgLink = {
    get_curie_purl: (curie) => {
        const splitCurrie = curie.split(':')
        const prefix = splitCurrie[0]
        const suffix = splitCurrie[1]
        var matchedPrefix = Object.keys(biolink_lookup).find(k => k == prefix)
        if (matchedPrefix) {
            return biolink_lookup[prefix] + suffix
        } else {
            return null
        }
    }
}