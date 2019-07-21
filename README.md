# SPEAK UP
----------
## Table of Contents 
1. [Preview](#preview)
1. [Overview](#overview)
2. [Technologies](#technologies)
3. [Local Installation](#installation)
4. [App Display](#display)

<a name="preview"></a>
## Preview 
The majority of crimes committed in the United States are never reported to the police. Worse still, the crimes that are reported are usually never solved. In 2016 a miserable 42 percent of violent crime and an even more miserable 36 percent of property crime was reported to US authorities.

In fact over a 12-year period from 2004 and 2015 more than 250,000 hate crimes in the United States went by unreported, according to a federal report released in 2018. It [found that](https://www.chicagotribune.com/nation-world/ct-hate-crimes-unreported-20170628-story.html) between 2011 and 2015 alone, 54% of violent hate crimes were not reported.
The report claimed that many victims fail to report such crimes for both personal and institutional reasons, with some immigrants reluctant to get the police involved for fear of deportation.For others, it is fear of losing a job, one’s family or simply distrust of the police that deters them from prosecuting.

According to National Crime Victimization Survey 2010-2016, the Majority of Sexual Assaults Are Not Reported to the Police. Only 230 out of every 1,000 sexual assaults are reported to police. That means about 3 out of 4 go unreported.

<a name="overview"></a>
## Overview 
A Node based app which primarily aims to give a voice to the minorities and women to speak up and report crimes such as sexual assault which are often not reported. 

<a name="technologies"></a>
## Technologies
 * Express.js 
 * Sequelize
 * MySQL
    * Local database
 * JawsDB
    * Deployed Heroku database 
 * Node.js | JavaScript
    * Ajax calls
 * Google Maps API
 * jQuery
 * Moment.js
 * HTML
 * Handlebars
 * CSS
 * Bootstrap
 * Materialize

<a name="installation"></a>
## Local Installation
### Step 1: Git Clone
Clone Burger-Sequelize to your local git repo like the following:
> git clone git@github.com:sajadgzd/project-2.git

or

> git clone https://github.com/sajadgzd/project-2.git

The Speak Up project and its files should now be in your project folder.

### Step 2: Install Dependencies
Install the following dependencies listed in the `package.json` file: 

> npm install

Once completed, you will see a `node_modules` folder in your local repo.

The dependencies should now be in the local `node_modules` folder.

### Step 3: Set up MySQL database 

Via terminal type in these bash command once you are in the db directory 

> mysql -u root -p
>
> enter your MySQL password 
>
> source schema.sql 
>
> exit 

### Step 4: Launch app 
Via terminal type in these bash command once you are in the Speak Up root directory 

> node server.js 

Go to your browser and type in `localhost:3000` in your URL bar. Now you should see the application open locally.
To visit deployed application, [click here](https://project-2-70181.herokuapp.com/)

<a name="display"></a>
## App Display
### Gif Demo
![Demo]("/public/images/demo1.gif")
### Live Demo
[Click Here](https://project-2-70181.herokuapp.com/)
