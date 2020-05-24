# Flashcards

This very useful app will make you learn new topics like JavaScript programming, in an instant.

## Features

The main (Home) screen shows the list of the topics for which quizes are available. Select one quiz deck by tapping on the tile you like.

### Home

In the Home screen you can start adding a new deck of cards by tapping New Deck in the top right corner.

### Deck view

Once you select a tile, you will be presented with the deck view. The view has two tabs in the bottom of the screen to switch between the game mode and the edit more. In the Edit mode you can add new questions to the game, and in Play mode you can play a quiz.

### The game play

Once you start a game, the app will show you the cards one by one. When a card is presented, it shows the question and you need to think what the correct answer is. Once you’ve decided, press the Show Answer button and the correct answer will be revealed. Now press either Correct or Incorrect button, depending if you answered correctly or not. I’m counting on your clear conscience here. Press the Next when you decide your answer with finality. Once you reach the end of the deck, we will show your score. If you’re happy, you can go back to Home and select a different deck, and if you’re not, you can Play Again. Tapping Back to Deck takes you to the front page of the current deck.

## Set-up

The game has been bootstrapped with `create-react-native-app` and is essentially an Expo-managed project. It works on iOS and Android as well as on web, to a limited degree.

### Install

Install the app by running the following in the root folder of the project:
`yarn install`

You must have installed the Expo-CLI beforehand.

### Run

To start the app in a web browser run:
`yarn web`

Once the web browser has started, it will show you the console screen and the app screen. If you want to see the app in the iOS simulator, select the Run on iOS simulator option fron the web console. Ditto for Android. This is assuming that you have installed their respective simulators/emulators beforehand.

Alternatively you can run:
`yarn ios`
or
`yarn android`
to start the app on a simulator right away.

### Build

To builld the app, I used the expo service. It works so long that you have an Expo account created and you have logged in. I’ve only made a production build for Android because I don’t have an account with iOS deeloper portal yet.

To build for Android use:
`expo build:android`
And select the `apk` option.

### Testing

I have tested the app in the following environments:

1. on the web, which showed that all functionalities work correctly except for Local Notifications, which are currently not supported by Expo web,
2. iOS simulator – everything worked like a charm,
3. Android devce – I bult the app using expo as described above and I tested it on a Xiaomi Redmi 8.
4. Expo app – on two devices: iPhone 11 Pro and Xiaomi Redmi 8.

## Going forward

I’ve implemented the requirements from the project rubric and the project description. Moreover I added the following:

- Redux store – the state of the app is stored in a Redux store and it is backed up to a local `AsyncStorage` whenever it changes.
