### this file is made for collecting data from the website

import requests

'''
data we need to collect:
 list of items bought by user by category: "category 1 | catergory 2..." ==> need to get all item bought by user in order to make a prediction
 list of items bought by user by name: "name 1 | name 2..."

in order to achieve that, a simple query can be made to the AMPLIFY node.js API and connect to new endpoints to get these info by users (new endpoint or get NFT wallet endpoint)

collect data to train and predict is basically the same except, to train, you need the information for the order (first 3 inputs). You get that in a endpoint in the API

so: to train, get data from a user and the last item will be the one who works
example: users buy "NFT | NFT | NFT " and the next item is NFT, the score is 1 (since we know he bought the item) and so, we get the 3 other input (price, name, description)

to predict, it's easier, we get the name, the description and the price from the market and compare it to the names and category strings 
'''


def getItemsUser(user): #takes user address
    names_last = []
    description_last = []
    names = ""
    descriptions = ""
    res1 = requests.post("localhost:8000/nftbyaddress", params={"body": {"address": user}})
    

    for nft in res1:
        names += nft.name + " | "
        descriptions += nft.metadata.descritpion + " | "
        names_last.append(nft.name)
        description_last.append(nft.metadata.description)

    last_name = names_last.pop()
    last_des = description_last.pop()
    price = 100 #set random low price for a category

    

    # description = res1.metadata.description
    # 
    #res2 = requests.post("localhost:8000/metadata",params={"body": {"address": res1.tokenAddress, "tokenid": int(res1.tokenId)}})
