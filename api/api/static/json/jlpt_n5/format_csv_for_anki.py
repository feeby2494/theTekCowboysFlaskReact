#! /usr/bin/env python3
import os
import csv
import json

def create_new_csv_from_json(file_to_write_to, json_data):

    with open(file_to_write_to, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile, delimiter=',')
        for line in json_data:
            # back_of_card = f"{line["kana"]} {line["eng"]}"
            kanji = line["kanji"]
            kana = line["kana"]
            eng = line["eng"]
            combined_kana_eng = "{} \n {}".format(kana, eng)
            if kanji:
                writer.writerow([ kanji , combined_kana_eng])
            else:
                writer.writerow([ kana , combined_kana_eng])


        # writer.writerow(['Spam', 'Lovely Spam', 'Wonderful Spam'])


json_data = json.load(open('./jlpt_n5_all.json', 'r'))
file_to_write_to = "./csv_for_anki.csv"




create_new_csv_from_json(file_to_write_to, json_data)


# create_dic_for_new_csv('./jlpt_n5_all.json')
