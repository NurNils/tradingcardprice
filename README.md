<!-- Logo -->
![Tradingcardprice Logo](/PROJECT/assets/logo.png)

# Tradingcardprice
Get the current market value of each deposited trading card.

<!-- Social Media -->
[![GitHub Repo stars](https://img.shields.io/github/stars/NurNils/tradingcardprice?style=social)](https://github.com/NurNils/tradingcardprice)

<!-- Devices -->
![Tradingcardprice Home](/PROJECT/assets/homepage.png?raw=true)

## About
This project was developed by Nils-Christopher Wiesenauer ([NurNils](https://github.com/NurNils)) and Jonas Bihr ([Rhib](https://github.com/Rhib)) during the 4th semester as part of the Webengineering II lecture at DHBW Stuttgart. The main purpose of this web application is to track and display the current market value of each deposited trading card.

💚 The system is based on the MEAN (MongoDB, Express.js, Angular, Node.js)-Stack with the CRUD (Create, Read, Update, Delete) functionality in the backend.

📈 Scrapy is used to track the [Ebay API](https://developer.ebay.com/docs) to get the values and appreciations. [More info](https://scrapy.org/)

🎓 The project was rated with a **1.6**

## Table of Contents

- [Installation and Usage](#Installation-and-Usage)
  - [Frontend](#Frontend)
  - [Backend](#Backend)
  - [Crawler](#Crawler)
- [Technologies](#Technologies)
  - [MongoDB](#MongoDB)
  - [Express.js](#Expressjs)
  - [Angular](#Angular)
  - [Node.js](#Nodejs)
- [Documentation](#Documentation)
  - [Home](#Home)
  - [Game Overview](#game-overview)
  - [TCG Series](#tcg-series)
  - [Card Set](#card-set)
  - [Overview Trading Card](#overview-trading-card)
  - [Trading Card Statistics](#trading-card-statistics)
  - [Register and Login page](#register-and-login-page)
  - [Presentation](#Presentation)

## Installation and Usage

### Frontend

This Tradingcardprice App was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.2. [More Info](/SOURCE/FRONTEND/tradingcardprice-app)

1. Run `npm install` to download all needed packages and it's dependencies.

2. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

3. Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Backend

This Tradingcardprice API was created with [Node.js](https://nodejs.org/) version 12.16.x. [More Info](/SOURCE/BACKEND/tradingcardprice-api)

1. Run `npm install` to download all needed packages and it's dependencies.

2. Go to the API folder and create a `.env` file with the following content (update if necessary):
```javascript
PRODUCTION=false
PORT=3000
JWT_SECRET="YOUR-JTW-SECRET"
DB_PORT=27017
DB_DOMAIN="localhost"
DB_TABLE="tradingcardprice"
DB_USER="username"
DB_PASSWORD="password"
EBAY_CLIENTID="YOUR-EBAY-CLIENT-ID" // Your ebay client ID
EBAY_MODE="PRODUCTION" // SANDBOX or PRODUCTION
```

3. Run `npm start` for a Node.js server. Navigate to `http://localhost:3000/` or defined port in `.env` file. The app will automatically reload if you change any of the source files because of [nodemon](https://nodemon.io/).

## Technologies

The system is based on the MEAN (MongoDB, Express.js, Angular, Node.js)-Stack with the CRUD (Create, Read, Update, Delete) functionality in the backend.

![MEAN Stack](/PROJECT/assets/mean-stack.jpeg?raw=true)

### MongoDB

MongoDB is a document-oriented NoSQL database used for high volume data storage.

### Express.js

Express.js is the most popular Node web framework and is the underlying li-brary for several other popular Node web frameworks. It provides many mechanisms.

### Angular

Angular is a TypeScript based front-end framework which is published as open source software.

### Node.js

Node.js is a JavaScript free and open source cross-platform for server-side programming that allows users to build network applications quickly.

## Home
![Tradingcardprice Home](/PROJECT/assets/homepage.png?raw=true)

The web application is available for everyone without registration. On the home page there is information about the project and its content. The website is responsive and therefore available on different devices.

## Game Overview
![Tradingcardprice Game Overview](/PROJECT/assets/game-overview.png?raw=true)

Two games have been created: Pokémon and Yu-Gi-Oh!
In the navigation you can navigate to the respective games. Here you get an overview of the game in the selected language (English or German).

## TCG Series
![Tradingcardprice TCG Series](/PROJECT/assets/series.png?raw=true)

In this overview you can find a description of the card game, as well as a list of all created card game sets in their respective collection. (e.q. "Base Series" collection contains the sets "Base Set", "Jungle Set", "Fossil Set", "Base Set 2", "Team Rocket", "Gym Heroes" and "Gym Challenge"). Here, all information were maintained in German and English and the appropriate logos and symbols were added.

## Card Set
![Tradingcardprice Card Set](/PROJECT/assets/base-set.png?raw=true)

If you now click on the desired card set (shown in the example "Base Set"), you get a list of all trading cards that are in this card set. In addition, a translated description and the logo of the set have been maintained. 
The displayed table can be sorted by number, name and rarity and furthermore filtered by any search criteria (input into the "Filter" input field). Here you can now click on any trading card to get more detailed information about it.

## Overview Trading Card
![Tradingcardprice Overview Trading Card](/PROJECT/assets/charizard-page.png?raw=true)

Arrived at the trading card "Charizard/Glurak", you can now find information about this card. In the past, when playing Pokemon trading cards, there were differences in the print runs. The first printing got a "1st Edition" feature icon (Seen in the bottom right two images). These different versions and misprint cards can also be seen in this overview.

## Trading Card Statistics
![Tradingcardprice Statistics](/PROJECT/assets/price-statistics.png?raw=true)

The second big point that we have implemented with our project is the price statistics. Such statistics can be seen in every trading card. Using the Ebay API and our crawler, we were able to crawl sales data for the "Charizard" trading card and generate price statistics and a table of sales. To do this, we stored the price, title, end date, auction ID, seller ID, and sale type of the auction, and added a link to the auction. Everything runs automatically in the backend and does not need to be executed manually.


## Register and Login page
![Tradingcardprice Register](/PROJECT/assets/register.png?raw=true)
![Tradingcardprice Login](/PROJECT/assets/login.png?raw=true)

The login and register page was implemented with the use of FormGroups and Validators in Angular. Here the user gets feedback about his input and learns whether it is valid or invalid.

## Presentation
The project presentation files can be be found [here](/PROJECT/presentation).