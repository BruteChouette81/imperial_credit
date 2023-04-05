'''
//function to get initial data and get data from the website stats


data: 
 category: 0-3 (NFT-REAL) ==> could include subcategories
 name: string
 price: INT
 list of items bought by user by category: "category 1 | catergory 2..." ==> need to get all item bought by user in order to make a prediction
 list of items bought by user by name: "name 1 | name 2..."
 ...can add more like last 3 item interact with / prices...

 output a sigmoid code


'''


import pandas as pd

df = pd.read_csv('client/imperialAI/data/amazon_data/data.csv')

new_df = pd.DataFrame([df["Product Name"], df["Category"], df["Selling Price"]])

print(new_df) 