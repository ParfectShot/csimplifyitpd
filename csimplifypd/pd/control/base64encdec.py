import base64


def base64converter(imagepath):
    with open(imagepath, 'rb') as image:
        image_read = image.read()
        image_64_encode = base64.encodestring(image_read)

        # image_64_decode = base64.decodestring(image_64_encode)

    return image_64_encode
    # with open('test1_decode.jpg', 'wb') as image_result:
    #     # create a writable image and write the decoding result
    #     image_result.write(image_64_decode)
