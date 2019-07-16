# SPEAK UP
----------
## Table of Contents 
1. [Overview](#overview)
2. [Technologies](#technologies)
3. [Local Installation](#installation)
4. [App Display](#display)


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
 * jQuery
 * HTML
 * CSS
 * Bootstrap

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
![Demo]()
### Live Demo
[Click Here](https://project-2-70181.herokuapp.com/)
