from django import template
from kafka import KafkaConsumer
from json import loads
import psycopg2

register = template.Library()


@register.simple_tag()
def retrieve_msg():

    consumer = KafkaConsumer(
        'test',
        bootstrap_servers=['localhost:9092'],
        auto_offset_reset='earliest',
        enable_auto_commit=True,
        group_id='my-group',
        value_deserializer=lambda x: loads(x.decode('utf-8')))

    print(consumer)

    for message in consumer:
        print(message.value)
        break
