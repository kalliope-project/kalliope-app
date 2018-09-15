# Kalliope-app

[![Build Status](https://travis-ci.org/kalliope-project/kalliope-app.svg?branch=master)](https://travis-ci.org/kalliope-project/kalliope)

The Ionic app code for [Kalliope](https://github.com/kalliope-project/kalliope)

<p align="center">
    <img src="images/kalliope_app_presentation_5.png">
</p>

## Installation

### NodeJs
First install nodejs.
We suggest to use the [node version manager](https://github.com/creationix/nvm#installation)

```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

Make sure you are using at least the node v10.9.0:

```bash
nvm install 10
nvm use 10
nvm current
>>> v10.9.0
```

### ionic & Cordova

The application is based on [Ionic(and cordova)](http://ionicframework.com/docs/intro/installation/)

```bash
npm install -g ionic cordova

cordova --version
>>> 8.0.0
ionic --version
>>> 4.1.1
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

Install the node dependencies :
```bash
cd /pathOfTheProject/kalliope-app/kalliope/
npm install
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

The application is now running and accessible using your browser : "http://localhost:8100"

In case the application is missing the 'cordova' package to run on the browser you can run :
```bash
ionic cordova run browser
```


## Builds/run for mobile device

### Android

##### Requirement
- Java 8 SDK (Note: greater version of java are not supported by ionic yet)
```bash
sudo apt-get install openjdk-8-jdk

java -version
>>> openjdk version "1.8.0_181"
>>> OpenJDK Runtime Environment (build 1.8.0_181-8u181-b13-0ubuntu0.18.04.1-b13)
>>> OpenJDK 64-Bit Server VM (build 25.181-b13, mixed mode)

javac -version
>>> javac 1.8.0_181
```

- Android 8.1 SDK (Oreo)
- Gradle 4.4
- Build Tools
- Android Virtual Device (AVD)

You can install them manually but it is strongly recommended to install Android Studio which brings most of them.
"https://developer.android.com/studio/"

Export env variables (add to your .bashrc):
```bash
 export ANDROID_HOME=~/Android/Sdk
 export PATH=${PATH}:${ANDROID_HOME}/tools
 export PATH=${PATH}:${ANDROID_HOME}/platform-tools

 export PATH=$PATH:$GRADLE_HOME/bin
```

##### Run on your phone

 - Install all the cordova android plugin by setting up an ionic platform:
```
ionic cordova platform add android@7.1.0
```

Note: You might need to define the `JAVA_HOME` and gradle wrapper version with:
```
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL=https\://services.gradle.org/distributions/gradle-4.4-all.zip
```

 - Activate the Debugger mode on your Android phone.


 - Run the app on Android device directly
```
ionic cordova run android
```
Note: running the app with the option -c does not work !

##### Debug

 - You have access to log using Android Studio and Logcat.
 - On your AVD console.
 - Running Chrome -> Developper Tools -> Remote Device

##### Release

Create an APK
```
ionic cordova build android --release
```

### iOS
- TODO
