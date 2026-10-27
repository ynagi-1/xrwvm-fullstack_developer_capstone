import os
from pathlib import Path
import nltk
from flask import Flask, jsonify
from nltk.sentiment import SentimentIntensityAnalyzer
app=Flask(__name__)
nltk.data.path.insert(0,str(Path(__file__).parent))
analyzer=SentimentIntensityAnalyzer()
@app.get('/')
def home():
    return jsonify(service='Sentiment Analyzer',status='ok')
@app.get('/analyze/<path:input_txt>')
def analyze_sentiment(input_txt):
    scores=analyzer.polarity_scores(input_txt)
    compound=scores['compound']
    sentiment='positive' if compound>=0.05 else 'negative' if compound<=-0.05 else 'neutral'
    return jsonify(sentiment=sentiment,scores=scores)
if __name__=='__main__':
    app.run(host='0.0.0.0',port=int(os.environ.get('PORT','5000')))
