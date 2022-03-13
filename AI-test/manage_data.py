
from msilib import sequence
from this import d
import time
from click import prompt
from datasets import load_dataset
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow import keras
import numpy as np
import tensorflow as tf
from tensorflow.keras.layers.experimental.preprocessing import TextVectorization
import json

dataset = load_dataset("conv_ai_2") #https://raw.githubusercontent.com/alexa/Topical-Chat/master/conversations/train.json
dataset2 = load_dataset("empathetic_dialogues")
batch_size = 64
vectorize_layer = TextVectorization(
    max_tokens=10000 - 1,
    output_mode="int",
    output_sequence_length=80 + 1,
)

def process_x_dataset_emotion(dataset):
    bag = [] #[]
    num_sentence = 0
    for sequence in dataset['train']['dialog']:
        bag.append(sequence)


        if num_sentence == 4:
            print("stopping the loop")
            break

        else:
            num_sentence += 1

    #print(bag[0])
    with open("data.json", "w") as fp:
        json.dump(bag, fp, indent=6)
        fp.close()
    #print(bag)
    '''
    t = Tokenizer()
    t.fit_on_texts(bag)

    doc = t.texts_to_sequences(bag)
    p_doc = keras.preprocessing.sequence.pad_sequences(doc, maxlen=25, padding="post")
    vocab_size = len(t.word_index) + 1
    return p_doc, vocab_size, t
    '''
def load_seq():
    with open("data.json") as fp:
        data = json.load(fp)

    x_data_set = []
    y_data_set = []

    for conversation in data["dialogues"]:
        if len(conversation) < 2:
            continue
        for conv in conversation:
            if conv["id"] % 2 == 0:
                x_data_set.append(conv["text"])

            else:
                y_data_set.append("[START] " + conv["text"] + " [END]")
    y_targ_set = []
    for sentence in y_data_set:
        y_targ_set.append(sentence[7:])

    x_tokenizer = Tokenizer()
    x_tokenizer.fit_on_texts(x_data_set)

    y_tokenizer = Tokenizer()
    y_tokenizer.fit_on_texts(y_data_set)

    x_doc = x_tokenizer.texts_to_sequences(x_data_set)
    x_pdoc = keras.preprocessing.sequence.pad_sequences(x_doc, maxlen=25, padding="post")
    x_vocab_size = len(x_tokenizer.word_index)

    y_doc = y_tokenizer.texts_to_sequences(y_data_set)
    y_pdoc = keras.preprocessing.sequence.pad_sequences(y_doc, maxlen=25, padding="post")
    y_target = y_tokenizer.texts_to_sequences(y_targ_set)
    y_traget_doc = keras.preprocessing.sequence.pad_sequences(y_target, maxlen=25, padding="post")
    y_vocab_size = len(y_tokenizer.word_index) 
    return x_pdoc, x_vocab_size, x_tokenizer, y_pdoc, y_vocab_size, y_tokenizer, y_traget_doc

#process_x_dataset_emotion(dataset)

### try to put (as X ): [start] context [sep or starthuman] text [end] --> [startbot] responce [end] 
### put mask 
def test_load_vectorization():
    with open("data.json") as fp:
        data = json.load(fp)

    x_data_set = []
    y_data_set = []

    for conversation in data["dialogues"]:
        if len(conversation) < 2:
            continue
        for conv in conversation:
            if conv["id"] % 2 == 0:
                x_data_set.append(conv["text"])

            else:
                y_data_set.append("[START] " + conv["text"] + " [END]")
    
    x_vectorization = TextVectorization(
        max_tokens=50, output_mode="int", output_sequence_length=25,
    )
    x_vectorization.adapt(x_data_set)
    x = x_vectorization(x_data_set)

    y_vectorization = TextVectorization(
        max_tokens=50, output_mode="int", output_sequence_length=25,
    )
    y_vectorization.adapt(y_data_set)
    y = x_vectorization(y_data_set)

    return ({"encoder_inputs": x, "decoder_inputs": y[:, :-1],}, y[:, 1:])


def write_genreratives_data():
    bag = []
    dialogues = ""
    num_sentence = 0
    print("[INFO] start extracting")
    for sequence in dataset['train']['dialog']:
        for text in sequence:
            if len(sequence) > 1: # if it is a real dialogue
                if text["sender_class"] == "Human": # if its a human type "human": before dialogue
                    dialogues += str(text['text']) + " [SEP] "

                elif text["sender_class"] == "Bot": # else write its a bot
                    dialogues += str(text['text']) + " [SEP] "

            
            else:
                continue
        
        dialogues = "[START] " +  dialogues[:-6] + "[END]"
        bag.append(dialogues)
        dialogues = ""
        if num_sentence == 2000:
            print("[INFO] stopping the extraction")
            break

        else:
            num_sentence += 1

    print("[INFO] start writing")
    with open("generative_data2.txt", "w", encoding = "utf-8", errors="ignore") as fp:
        for text in bag:
            if text != "[START] [END]":
                fp.write(text + "\n")
            else:
                continue
        fp.close()

        print("[INFO] stop writing")

def write_generative_data2():
    bag = []
    dialogues = ""
    num_sentence = 0
    print("[INFO] start extracting")
    for sequence in dataset2['train']:
        dialogues += "[START] " + str(sequence['prompt']) + " [SEP] "
        dialogues += str(sequence['utterance']) + " [END]"

        bag.append(dialogues)
        dialogues = ""
        if num_sentence == 500:
            print("[INFO] stopping the extraction")
            break

        else:
            num_sentence += 1

    print("[INFO] start writing")
    with open("empathetical_data1.txt", "w", encoding = "utf-8", errors="ignore") as fp:
        for text in bag:
            if text:
                fp.write(text + "\n")
            else:
                continue
        fp.close()

        print("[INFO] stop writing")

def transform_text(text):
    text = tf.expand_dims(text, -1)
    pdoc = vectorize_layer(text)
    px = pdoc[:, :-1]
    py = pdoc[:, 1:]
    return px, py

def load_generative(data_set):
    vectorize_layer.adapt(data_set)
    

    text_ds = data_set.map(transform_text)
    text_ds = text_ds.prefetch(tf.data.AUTOTUNE)
    vocab = vectorize_layer.get_vocabulary()
    

    return vocab, text_ds

if __name__ == '__main__':
    write_genreratives_data()
    #time.sleep(5)
    #write_generative_data2()
    ### need to put [BOTStart], [HUMANStart] and [END] token

    filename = ["generative_data2.txt", "empathetical_data1.txt"]
    text_ds = tf.data.TextLineDataset(filename) #.filter(lambda x: tf.cast(tf.strings.length(x), bool))
    #text_ds = text_ds.shuffle(buffer_size=256)
    text_ds = text_ds.batch(batch_size)
    vocab, text = load_generative(text_ds)
    print(len(vocab)) # C:\Users\hbari\AppData\Local\Programs\Python\Python39\Lib\site-packages\tensorflow\python\util\compat.py

    #ds = text.take(1)
    #ds = list(ds.as_numpy_iterator())
    #print(ds)
    #print(f"text data_set shape : {text_ds}")
    #print(f"text dataset type {type(text_ds)}")