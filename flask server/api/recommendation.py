from flask import Blueprint,request,jsonify
import numpy as np
import pandas as pd
import ast
import pymongo
from pymongo import MongoClient
import json
import nltk
# nltk.download('wordnet')
# nltk.download('omw-1.4')
# nltk.download('stopwords')
# nltk.download('punkt')
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from bson import json_util
from bson.objectid import ObjectId
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

lematizer = WordNetLemmatizer()
cv = CountVectorizer(max_features=5000,stop_words='english')

recommendation = Blueprint('recommendation', __name__)

CONNECTION_STRING = "mongodb://prathamrasal:pratham@ac-tihbzys-shard-00-00.kjaebfo.mongodb.net:27017,ac-tihbzys-shard-00-01.kjaebfo.mongodb.net:27017,ac-tihbzys-shard-00-02.kjaebfo.mongodb.net:27017/?ssl=true&replicaSet=atlas-101g8j-shard-0&authSource=admin&retryWrites=true&w=majority"
client = MongoClient(CONNECTION_STRING)
db = client['sih_db']
resources = db['resources']
institutes =db['users']

def getCleanText(text):
    text = str(text)
    words = word_tokenize(text)
    wordd = []
    for w in words:
        word = lematizer.lemmatize(w)
        if not word in set(stopwords.words('english')):
            wordd.append(word)
    cleanText = ' '.join(wordd)
    return cleanText

def toLowerCase(text):
    text = str(text)
    return text.lower()

def recommendation_foundation():
    resInfo=resources.find()
    resInfo= list(resInfo)
    resDF = pd.DataFrame(resInfo)
    resDF =resDF[['_id','name','price','category','instituteId','description']]
    insInfo=institutes.find()
    insInfo= list(insInfo)
    insDF = pd.DataFrame(insInfo)
    street = []
    state = []
    city = []
    pincode = []
    for i in range(len(insDF)): 
        street.append(insDF.iloc[i].address['street'])
        city.append(insDF.iloc[i].address['city'])
        state.append(insDF.iloc[i].address['state'])
        pincode.append(insDF.iloc[i].address['pincode'])
    insDF['street'] = street
    insDF['city'] = city
    insDF['state'] = state
    insDF['pincode'] = pincode 
    insDF = insDF[['_id','instituteName','aisheCode','naac','street','city','state','pincode']]
    resDF = pd.merge(resDF,insDF,left_on="instituteId", right_on = "_id", how="inner")
    resDF = resDF[['_id_x','name','category','description','price','city','street','state','pincode','naac']]
    resDF.dropna(inplace=True)
    # resDF['description'] = resDF['description'].apply(getCleanText)
    resDF['tags'] = ''
    return resDF

def generateTag(resDF):
    resDF['tags'] = resDF['name'] + " " + resDF['description']+ " "  + resDF['price']+ " "  + resDF['category']+ " " + resDF['city']+ " " +resDF['street']+ " " +resDF['state']+ " " +resDF['naac']
    resDF['tags'] = resDF['tags'].apply(lambda x: x.lower())
    return resDF


def vectorize(narr):
    vector = cv.fit_transform(narr.astype('str')).toarray()
    similarity = cosine_similarity(vector)
    return similarity    

def recommend_search(instituteId,name):
    resDF = recommendation_foundation()
    resDF = generateTag(resDF)
    institute = institutes.find_one({"_id": ObjectId(instituteId)})
    city = institute['address']['city']
    street = institute['address']['street']
    state = institute['address']['state']
    pincode = institute['address']['pincode']
    naac = institute['naac']
    tags = name+ city + street +state +pincode+ naac
    myDict = {
         "name":name,
         "category":" ",
         "description":" ", 
         "price":" ", 
         "city": city,
         "street":street,
         "state":state,
         "pincode":pincode,
         "naac": naac,
         "tags": tags.lower()
    }
    newDF = resDF.append(myDict,ignore_index = True)
    newarr = newDF['tags'].values
    vector = vectorize(newarr)
    recommended_list = sorted(list(enumerate(vector[-1])),reverse=True,key= lambda x:x[1])
    recList = []
    for i in recommended_list[1:]:
        recList.append(resDF.iloc[i[0]]['_id_x'])
    return recList

def dashboard(instituteId):
    resDF = recommendation_foundation()
    resDF = generateTag(resDF)
    institute = institutes.find_one({"_id": ObjectId(instituteId)})
    city = institute['address']['city']
    street = institute['address']['street']
    state = institute['address']['state']
    pincode = institute['address']['pincode']
    naac = institute['naac']
    tags = city + street +state +pincode+ naac
    myDict = {
         "name":" ",
         "category":" ",
         "description":" ", 
         "price":" ", 
         "city": city,
         "street":street,
         "state":state,
         "pincode":pincode,
         "naac": naac,
         "tags": tags.lower()
    }
    print(myDict)
    newDF = resDF.append(myDict,ignore_index = True)
    newarr = newDF['tags'].values
    vector = vectorize(newarr)
    recommended_list = sorted(list(enumerate(vector[-1])),reverse=True,key= lambda x:x[1])
    recList = []
    for i in recommended_list[1:]:
        recList.append(resDF.iloc[i[0]]['_id_x'])
    return recList
    
def parse_json(data):
    return json.loads(json_util.dumps(data))

@recommendation.route("/",methods=['post'])
def dashboard_res():
    id = request.form['id']
    recs = dashboard(id)
    return jsonify(parse_json(recs))

@recommendation.route("/search",methods=['post'])
def recommendations_Seach():
    id = request.form['id']
    title = request.form['title']
    recs = recommend_search(id,title)
    return jsonify(parse_json(recs))
