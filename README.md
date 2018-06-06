# Kalliope-app

[![Build Status](https://travis-ci.org/kalliope-project/kalliope-app.svg?branch=master)](https://travis-ci.org/kalliope-project/kalliope)

The Ionic app code for [Kalliope](https://github.com/kalliope-project/kalliope)

<p align="center">
    <img src="images/kalliope_app_presentation.png">
</p>

## Installation

### NodeJs
First install nodejs.
We suggest to use the [node version manager](https://github.com/creationix/nvm#installation)

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

Make sure you are using at least the node v0.7:

```bash
nvm current
>>> v7.10.0
```

### ionic & Cordova

The application is based on [Ionic(and cordova)](http://ionicframework.com/docs/intro/installation/)

```bash
npm install -g ionic cordova
```

### clone the kalliope-app repo

Clone this repo:

```bash
git@github.com:kalliope-project/kalliope-app.git
```
or by using https:
```bash
https://github.com/kalliope-project/kalliope-app.git
```

### Start kalliope Core

Make Sure your [Kalliope Core](https://github.com/kalliope-project/kalliope) is running :

Under your "Kalliope Core" directory:

The __API__ and __CORS__ must be allowed in the kalliope Core "setting.yml" file.
Then starts the Kalliope CORE :
```bash
kalliope start
```


### run the application on your browser

Under this fresh cloned repo, access the "kalliope" directory and run the ionic server :

```bash
ionic serve -b
```
On a fresh install the applciation dependencies will be installed as well using npm.

The application is now running and accessible using your browser : "http://localhost:8100"



## Builds/run for mobile device

### Android

Run the app on Android device directly
```
ionic cordova run android
```
Note: running the app with the option -c does not work !
Note: You might need to define the gralde wrapper version with:

```
export CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL=https\://services.gradle.org/distributions/gradle-4.4-all.zip
```


Create an APK
```
ionic cordova build android --release
```

### iOS
- TODO
