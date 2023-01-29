from sklearn.feature_extraction.text import TfidfVectorizer
import pickle as pickle
from sklearn import metrics
from sklearn import svm
from sklearn.svm import SVC
from sklearn.metrics import classification_report, confusion_matrix
vectorizer = TfidfVectorizer(stop_words='english',
                             lowercase=True,
                             min_df=2,
                             ngram_range=(1, 3))
titles = {
    "0":[],
    "1":[]
}
with open (r'Datasets/ClickbaitDataset.txt',encoding='utf8') as f:
    titles["1"] = f.read().splitlines()
with open (r'Datasets/NonClickbaitDataset.txt',encoding='utf8') as f:
    titles["0"] = f.read().splitlines()
traininglabels = [0]*len(titles["0"]) + [1]*len(titles["1"])
trainingset = titles["0"] + titles["1"]
print(str(len(traininglabels)))
trainingset = vectorizer.fit_transform(trainingset, traininglabels)
print  (str(trainingset.shape))
params = {'kernel': 'rbf', 'C': 2, 'gamma': 1}
print("\nTraining model")
clf = svm.SVC(C=params['C'], kernel=params['kernel'], gamma=params['gamma'], probability=True)
print("Fitting Model")
clf.fit(trainingset, traininglabels)
with open("vectorizer", 'wb') as f:
    pickle.dump(vectorizer, f)
with open("trainedmodel", 'wb') as f:
    pickle.dump(clf, f)

