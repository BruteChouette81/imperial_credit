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


import random
import pandas as pd



def get_classification_data():
    df = pd.read_csv('client/imperialAI/data/amazon_data/data.csv')
    print(df)
    new_df = pd.DataFrame([df["Product Name"], df["Category"], df["Selling Price"]]) #for classification. for user field, make the same as category and similar in name based on category. 

    #For price prediction database, use the same, but have to put the indice of low-high price manually
    print(new_df.T.shape)
    new_df = new_df.T


    extended_categories = ""
    categories = []

    sports_categories = ["hockey gear", "swimming gear", "football gear"] #add more
    for index, row in new_df.iterrows():
        if "sport" in row["Category"]: # add more
            extended_categories += sports_categories[random.randint(0,len(sports_categories))] + " | " + sports_categories[random.randint(0,len(sports_categories))] #add more
        categories.append(extended_categories)
        extended_categories = ""


    pd.Series(categories, index=new_df.index)



    return new_df.T

if '__main__' == __name__:
    get_classification_data()