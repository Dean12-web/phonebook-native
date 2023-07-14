import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import reducer from './src/reducers'

import { Provider } from 'react-redux';
import PhoneBox from './src/components/PhoneBox';

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
{/* <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home"component={PhoneBox}/>
          <Stack.Screen name="Add" component={PhoneForm} />
        </Stack.Navigator>
    </NavigationContainer> */}
function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <PhoneBox />
        {/* <UserBox/> */}
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});
export default App;
