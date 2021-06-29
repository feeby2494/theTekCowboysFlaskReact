import csv
import sys
import json
input_file_arg = sys.argv[1]
output_file_name = sys.argv[2]
 
def csv_to_json_format(input_file):
	new_json_array = []
	id = 0

	with open(input_file, 'r', encoding='shiftjis') as f:
		reader = csv.reader(f, delimiter=',')
		next(reader)
		for line in reader:
			if len(line) is not 0:
				id += 1
				new_word = {}
				new_word['id'] = id 
				new_word['kanji'] = line[0]
				new_word['kana'] = line[1]
				new_word['eng'] = line[3]
				new_word['rei'] = line[4]
			new_json_array.append(new_word)
	return new_json_array


def create_json_file(output_file, json_formatted_obj):
	with open(f"{output_file}", "w") as f:
		json.dump(json_formatted_obj, f, indent=2)
	print("Please check new json file to be sure it's okay. New json file created!")

json_formatted_data = csv_to_json_format(input_file_arg)
create_json_file(output_file_name, json_formatted_data)		
