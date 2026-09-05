import os
import json
import re

base_path = "c:/Users/kuany/Desktop/аяука"
grammar_dir = os.path.join(base_path, "аудио")
vocab_dir = os.path.join(base_path, "аудио вакаб")

def get_sort_key(filename):
    match = re.search(r'\d+', filename)
    return int(match.group()) if match else float('inf'), filename

grammar_files = []
if os.path.exists(grammar_dir):
    grammar_files = [f for f in os.listdir(grammar_dir) if f.endswith(".mp3")]
    grammar_files.sort(key=get_sort_key)

vocab_files = []
if os.path.exists(vocab_dir):
    vocab_files = [f for f in os.listdir(vocab_dir) if f.endswith(".mp3")]
    vocab_files.sort(key=get_sort_key)

js_content = f"const audioData = {{ 'grammar': {json.dumps(grammar_files, ensure_ascii=False)}, 'vocab': {json.dumps(vocab_files, ensure_ascii=False)} }};"

with open(os.path.join(base_path, "data.js"), "w", encoding="utf-8") as f:
    f.write(js_content)
