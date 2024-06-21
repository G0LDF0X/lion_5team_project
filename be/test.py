from elasticsearch import Elasticsearch

es = Elasticsearch(
    ['https://192.168.64.3:9200'],  # Replace with actual IP address
    basic_auth=('elastic', 'your_elastic_password'),
    verify_certs=True,
    ca_certs='/Users/jung-yechan/code/lion_5team_project/be/certs/ca.crt'  # Path to your CA certificate
)

res = es.info()
print(res)