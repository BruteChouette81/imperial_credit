#imperial ai test file in python using keras

import tensorflow as tf
from tensorflow import keras

MAXLEN = 30
def model1(): #classification
    input1 = keras.layers.Input(shape=(MAXLEN, ))
    input2 = keras.layers.Input(shape=(MAXLEN,))
    input3 = keras.layers.Input(shape=(1,))
    input4 = keras.layers.Input(shape=(MAXLEN,))
    input5 = keras.layers.Input(shape=(MAXLEN,))

    merged = keras.layers.Concatenate(axis=-1)([input1, input2, input3, input4, input5]) #axis 1
    dense1 = keras.layers.Dense(728, input_dim=2, activation=keras.activations.relu, use_bias=True)(merged) # more layers 
    output = keras.layers.Dense(1, activation=keras.activations.sigmoid, use_bias=True)(dense1)
    model1 = keras.models.Model(inputs=[input1, input2, input3, input4, input5], output=output)
    return model1