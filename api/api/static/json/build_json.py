#! /usr/bin/env python3
import os
import csv
import json
import sys

def build_json(csv_file):
    list_of_words = []
    with open(csv_file, 'r') as f:
        reader = csv.reader(f)
        next(reader)
        for line in reader:
            new_word = {}
            new_word['id'] = line[0]
            new_word['kana'] = line[2]
            new_word['eng'] = line[3]
            if line[4]:
                new_word['part_of_speech'] = line[4]
            list_of_words.append(new_word)
    f.close()
    return list_of_words

def write_to_json(json_object, name_of_new_json):
    with open(name_of_new_json, 'w', encoding='utf-8') as f:
        json.dump(json_object, f)

list_of_words = build_json(sys.argv[1])
print(list_of_words)

write_to_json(list_of_words, sys.argv[2])
