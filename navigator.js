import React from 'react';
import {StyleSheet} from 'react-native';
import Welcome from './pages/welcome';
import Loading from './pages/loading';
import Registration from './pages/registration';
import Menu from './pages/menu';
import Exercise from './pages/exercise';
import AlarmTree from './pages/alarm_tree';
import AlarmAdd from './pages/alarm_add';
import Statistics from './pages/statistics';
import Profile from './pages/profile';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="loading"
          component={Loading}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="welcome"
          component={Welcome}
          options={{
            title: 'DentalCity',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="registration"
          component={Registration}
          options={{
            title: 'Реєстрація',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
          }}
        />

        <Stack.Screen
          name="menu"
          component={Menu}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="exercise"
          component={Exercise}
          options={{
            title: 'Чистка зубів',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
          }}
        />

        <Stack.Screen
          name="alarm_tree"
          component={AlarmTree}
          options={{
            title: 'Сповіщення',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
          }}
        />
        <Stack.Screen
          name="alarm_new"
          component={AlarmAdd}
          options={{
            title: 'Сповіщення',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
          }}
        />
        <Stack.Screen
          name="statistic"
          component={Statistics}
          options={{
            title: 'Статистика',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
          }}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{
            title: 'Профіль',
            headerStyle: styles.header,
            headerTitleStyle: styles.headerTitle,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#628',
  },
  headerTitle: {
    color: '#fff',
  },
});
