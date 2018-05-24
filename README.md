# Squawker

###### Experimenting with Image Recognition Software & Machine Learning

## Concept
Take a picture of any bird to find out what bird it is. The location where the picture was taken is then stored in a database to be used in various aspects of Ornithology such as habitat and migration patterns

#### Goals:
* Create an algorithm using Google Cloud Vision to reliably detect the correct species
* Get the user from taking their picture to results effortlessly on a mobile platform
* Use user feedback to test algorithm and return correct results on future attempts

## Development Status: Alpha
*A live demo of Squawker can be found [here]( https://pacific-tundra-22064.herokuapp.com/)*

#### Current features:
* Responsive & Mobile-friendly frontend with a Bootstrap framework (built using Handlebars.js)
* Google OAuth implemented with passport.js
* User's submitted photos are saved to Google Cloud Storage
* User's photos' routes are connected exclusively to their profile (One to Many)
* Google Cloud Vision detects correct species with existing web entities
* Cloud Vision result is compared to existing database of birds and returns results to user based on weight after several queries

#### Features in Development:
* Cloud Vision needs to detect correct species for pictures with no web entities (but with Visually Similar Images)
* Results need to be saved to a database so Cloud Vision is only called once per image
* Geolocation needs to be implemented and saved to a database when user receives correct results
* Photos should NOT be saved to database until Cloud Vision has detected it to fall under "bird" or "fauna" etc
* User response to "Did we get it right?" should be saved along with the picture to improve our image detection algorithm
* Image detection should be refactored to change it's weighted results based on tests and whether the image is correct or incorrect
* Find existing API or create our own with more substantial bird data (known locations, alternative names, etc)

---

### Notable Technologies Used

* Handlebars.js
* Bootstrap
* JavaScript / jQuery
* Node
* Express
* Passport.js
* Google Cloud Platform
	* Cloud Vision API
	* OAuth 2.0
	* Cloud Storage
* SQL / Sequelize
* Mocha / Chai (testing)
* Heroku / JawsDB (deployment)