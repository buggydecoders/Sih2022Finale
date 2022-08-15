from flask import Blueprint,request,jsonify
import pandas as pd
import numpy as np
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
# nltk.download('vader_lexicon')
# nltk.download('wordnet')
# nltk.download('omw-1.4')
# nltk.download('punkt')
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from nltk.stem import PorterStemmer

sa = Blueprint('sa', __name__)

sentiments = SentimentIntensityAnalyzer()
lematizer = WordNetLemmatizer()

keywords = {
    "bad": -4,
    "angry": -4,
    "hot": -4,
    "hotter": -4,
    "not up to mark": -4
}

def getCleanText(text):
    text = text.lower()
    words = word_tokenize(text)
    wordd = []
    for w in words:
      word = lematizer.lemmatize(w)
      wordd.append(word)
    cleanText = ' '.join(wordd)
    return cleanText

def getSAScore(sentence):
    sentence = getCleanText(sentence)
    sentiments.lexicon.update(keywords)
    score=sentiments.polarity_scores(sentence)['compound']
    return score


@sa.route("/",methods=['post'])
def home():
    sent = request.form['feedback']
    score = getSAScore(sent)
    return jsonify(score)
