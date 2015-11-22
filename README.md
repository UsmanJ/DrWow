DrWow
======================

Synopsis
-----

DrWow is a web based application which allows patients to connect with doctors via the web. This will allow them to get consultations without having to wait days or weeks before their GP appointment.

For this project we used Node JS, Express, Angular JS, MongoDB, Opentok API and Mandrill API.

Features:
-------

```sh
As a user
So that I can sign up as either a patient or doctor
I should be able to sign up as a patient or doctor

As a user
So that I can log in
I should be able to log in

As a doctor
So that I can speak to a patient
I should be able to start a call session

As a patient
So that I can speak to a doctor
I should be able to join call sessions

As a doctor
So that I can see the patients details
I should be able to view patient details when they join my session

As a user
So that I can view my consultation
I should be emailed my consultation once the doctor has submitted it
```

Approach towards building the application
--------------------------------------

In order to build the application, we worked towards constructing an MVP. Starting by choosing the technologies to use for the application and picking the right API's for our needs. Once the technologies and API's were chosen, the team was split into two and assigned various tasks.

Two standups were conducted daily in order to discuss the progress of the project, any additional ideas, any blocks the team could have been facing and also to ensure that all members of the team were up to date with the progress of the project.

Pair programming was the route via which we built the application as it allowed knowledge to be shared efficiently and also to improve the team members communication with each other.

Technologies used:
------
* The application was coded in JavaScript
* Express was used for the back end
* AngularJS was used for the front end
* Protractor was used in order to conduct test-driven development.
* MongoDB was used for the databases

Installation:
------

To run the application you can either visit it on Heroku (https://drwhoteam.herokuapp.com/)

-- or --

* Download a clone of this repo
* Install all node packages by running 'npm install'
* Run it on your localhost by entering 'node server.js' in terminal
