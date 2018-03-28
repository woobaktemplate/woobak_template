import os, time
import pandas as pd
import numpy as np

from sentences.models import Sentence


class Datasender(object):

    def __init__(self):
        self.DATA_PATH = './woobak/data/'

    def read_data(self):
        os.chdir(self.DATA_PATH)
        print('In directory: {}'.format(os.getcwd()))

        email_df = pd.read_csv('email.csv', encoding='cp949')
        ppt_df = pd.read_csv('presentation.csv', encoding='cp949')

        for df in [email_df, ppt_df]:
            data_list = []
            for i in range(len(df)):
                row = df.ix[i]
                category = row['category']
                usage = row['usage']
                topic = row['topic']
                meaning = row['meaning']
                sentence = row['sentence']
                sentence_inst = Sentence(category=category,
                                         usage=usage,
                                         topic=topic,
                                         meaning=meaning,
                                         sentence=sentence)
                data_list.append(sentence_inst)
            Sentence.objects.bulk_create(data_list)
            print('Saved dataframe data to DB')
