from sqlalchemy import true
from transformers import GPT2Tokenizer, GPT2Model
tokenizer = GPT2Tokenizer.from_pretrained('gpt2', bos_token="<startoftext>", eos_token="<endoftext>")
model = GPT2Model.from_pretrained('gpt2')
text = "<startoftext> Human: Hello \nBot: "
encoded_input = tokenizer(text, return_tensors='pt').input_ids
print(encoded_input)
sample_output = model.generate(encoded_input, do_sample=False)
output = tokenizer.decode(sample_output[0], skip_special_tokens=True)
print(output)