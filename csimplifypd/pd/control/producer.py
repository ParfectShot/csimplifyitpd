from time import sleep
from json import dumps
from kafka import KafkaProducer
from pd.templatetags.get_text import get_text


def send_message(img_url, user_id):

    producer = KafkaProducer(
        bootstrap_servers=['localhost:9092'],
        value_serializer=lambda x: dumps(x).encode('utf-8'))

    data = {'image': img_url, 'user': user_id}
    get_text('media/'+img_url)
    producer.send('test', value=data)
    sleep(5)
