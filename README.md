#INSTALLATION

##BACKEND

From /backend run 

´´´
composer install

´´´

setup a vhost for backend
point vhost htdoc to /backend/web
edit .env on /backend to add database info (check the backend/readme for more info how to setup backend).

###Step 2

Create a new WP page and select template "custom"

###Step 3

Visit the site and you see an uploader page.
Upload the csv file to add data to backend.

###STEP4
Add Co-worker fron "General settings"


##FRONTEND

change the API URL in frontend/src/config/config.js

From /frontend run

´´´
yarn install
yarn build

´´´

##Sätta upp apache

setup a vhost for front-end
point vhost htdoc to /frontend/build





