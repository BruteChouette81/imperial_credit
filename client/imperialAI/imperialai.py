#imperial ai test file in python using keras

import tensorflow as tf
from tensorflow import keras
from keras import layers
'''
data: 
 category: 0-3 (NFT-REAL) ==> could include subcategories
 name: string
 price: INT
 list of items bought by user by category: "category 1 | catergory 2..." ==> need to get all item bought by user in order to make a prediction
 list of items bought by user by name: "name 1 | name 2..."
 ...can add more like last 3 item interact with / prices...

 output a sigmoid code (0,1)

 bas = 1
 bas = [0.123, 0.564 ...]

'''
MAXLEN = 30
VOCAB_SIZE = 10000
EMBED_DIM = 64

class TokenEmbedding(layers.Layer):
    def __init__(self, vocab_size, embed_dim):
        super(TokenEmbedding, self).__init__()
        self.token_emb = layers.Embedding(input_dim=vocab_size, output_dim=embed_dim)

    def call(self, x):
        x = self.token_emb(x)
        return x

def model1(): #classification
    input1 = keras.layers.Input(shape=(MAXLEN, ))
    input2 = keras.layers.Input(shape=(MAXLEN,))
    input3 = keras.layers.Input(shape=(1,))
    input4 = keras.layers.Input(shape=(MAXLEN,))
    input5 = keras.layers.Input(shape=(MAXLEN,))

    #Vector Representation of the text input
    embed_input1 = TokenEmbedding(VOCAB_SIZE, EMBED_DIM)(input1)
    embed_input2 = TokenEmbedding(VOCAB_SIZE, EMBED_DIM)(input2)
    embed_input4 = TokenEmbedding(VOCAB_SIZE, EMBED_DIM)(input4)
    embed_input5 = TokenEmbedding(VOCAB_SIZE, EMBED_DIM)(input5)

    #custom embedding for interger input 
    embed_input3 = keras.layers.Embedding(1000, 64, input_length=1) # change max number t 1 000 000

    merged = keras.layers.Concatenate(axis=-1)([embed_input1, embed_input2, embed_input3, embed_input4, embed_input5]) #axis 1
    dense1 = keras.layers.Dense(728, input_dim=2, activation=keras.activations.relu, use_bias=True)(merged) # more layers 
    output = keras.layers.Dense(1, activation=keras.activations.sigmoid, use_bias=True)(dense1)
    model1 = keras.models.Model(inputs=[input1, input2, input3, input4, input5], output=output)
    return model1

'''
data:
    - category: str
    - name: str
    - price: int

    Output:
        sigmoid between 1, 0: 1 being low priced and 0 being to expensive


'''

def model2(): #price prediction
    input1 = keras.layers.Input(shape=(MAXLEN, ))
    input2 = keras.layers.Input(shape=(MAXLEN,))
    input3 = keras.layers.Input(shape=(1,))

    #Vector Representation of the text input
    embed_input1 = TokenEmbedding(VOCAB_SIZE, EMBED_DIM)(input1)
    embed_input2 = TokenEmbedding(VOCAB_SIZE, EMBED_DIM)(input2)

    #custom embedding for interger input 
    embed_input3 = keras.layers.Embedding(1000, 64, input_length=1) # change max number t 1 000 000

    merged = keras.layers.Concatenate(axis=-1)([embed_input1, embed_input2, embed_input3]) #axis 1
    dense1 = keras.layers.Dense(728, input_dim=2, activation=keras.activations.relu, use_bias=True)(merged) # more layers 
    output = keras.layers.Dense(1, activation=keras.activations.sigmoid, use_bias=True)(dense1)
    model2 = keras.models.Model(inputs=[input1, input2, input3], output=output)
    return model2