## Problem Statement
Detecting and Filtering out the most annoying aspect of Youtube - Clickbaits!
The tedious problem of clickbaits remains unsolved till date.
bits_please proposes a user-friendly way to help out Youtube users avoid the clickbaits and unwanted youtube content with help of start-of-the-art technologies.

**Solution**

Detection of youtube clickbait content and highlighting the same by rendering the data for them in a different manner using a chrome extension.

**Tracks**

 - Machine Learning - SVM Classifier
 - Cloud Computing - Microsoft Azure
 - Web Development
 
**Technology Stack**
 - Scikit-learn
 - Youtube API
 - Rest API - Flask
 - Web Scraping 
 - Client Side Rendering - Javascript
 - Chrome Extension
 - Pickle

**Implementation :**
 - Collecting the Datasets : The dataset used is 
 [https://github.com/alessiovierti/youtube-clickbait-detector](https://github.com/alessiovierti/youtube-clickbait-detector)
 - Preprocessing the Dataset:
	-   tokenizing
	-   stopwords are removed
	-   words shorter than 2 characters are removed
 - Fitting the SVC Classifier with Dataset
 - Creating a layer of flask server on top of the trained model, which will provide REST endpoints to retrieve the response.
 - Flask server is deployed on Microsoft Azure.
 - Creating a chrome extension using manifest.json for configuration.
 #The extension will inject the content script when a certain url provided in manifest.json is triggered in the browser.
 #The extension will make POST requests to https://ytclickbait.azurewebsites.net REST endpoint and will make changes to the webpage based on the returned response.


**Pre requisites**

 - Google Chrome
 - An active internet connection

**Usage**

 1. Open google chrome
 2. Open the extension manager by navigating to chrome://extensions from the address bar or select Extensions from More Tools from Customise and Control Google Chrome (3 dots on top right corner of the window).
 3. In extension manager make sure to turn on Developer Mode then click on "Load Unpacked" button and select "chrome-extension" folder downloaded from the project folder.
 4. Restart Google Chrome.
 5. Open www.youtube.com.
 6. Type the query in search bar and press "Enter" or click Search button.
 7. Extension detects and highlights the clickbait content based on trained model hosted on *Microsoft Azure*.

**Troubleshooting**

 - Reload the webpage if the extension doesn't work.
 - Explore console to see if extension is working fine.

**Issues**

 - Since extension is in preview build user might have to wait for a while for the results to be displayed.
 - Clicking on suggestion box to search doesn't work as of now.
 - Extension works only for search queries entered in search box.
 - Extension returns results for top 20 videos.

 
	




 
