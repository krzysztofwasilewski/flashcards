import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions';

import {AsyncStorage} from 'react-native';

const NOTIFICATION_KEY = 'flashcards:notifications';

function createNotificationObject(allowsSound) {
  return {
    title: 'Flashcards!',
    body: 'It’s been over a day since you completed your last quiz…',
    ios: {
      sound: allowsSound,
      _displayInForeground: true
    }
  };
}

export async function scheduleLocalNotification() {
  const currentNotificationId = await AsyncStorage.getItem(
    NOTIFICATION_KEY
  ).then(JSON.parse);
  console.log('Current notification ID:', currentNotificationId);
  if (currentNotificationId) {
    // We have 1 notification scheduled already
    Notifications.cancelScheduledNotificationAsync(currentNotificationId);
  }

  // check that we still have the permission because it ay have been witdrawn since last time we wrote to AsyncStorage
  const {status: permisionStatus, allowsSound} = await Permissions.askAsync(
    Permissions.USER_FACING_NOTIFICATIONS
  );
  console.log('Status and allow sound:', permisionStatus, allowsSound);
  if (permisionStatus === 'granted') {
    const newNotificationId = await Notifications.scheduleLocalNotificationAsync(
      createNotificationObject(allowsSound),
      {
        time: new Date().setDate(new Date().getDate() + 1) // 24 hours fron now.
      }
    );
    console.log('new notification id:', newNotificationId);
    AsyncStorage.setItem(
      NOTIFICATION_KEY,
      JSON.stringify(newNotificationId)
    ).catch(e => console.log('Caught error from Asyncstorage.setItem()', e));
  }
}
