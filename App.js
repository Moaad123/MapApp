import React from 'react';
//import Navigator from './routes/route_pages';
import {View,StatusBar,StyleSheet} from 'react-native';
import Navigator from './routes/route_pages'; 

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#9E2D2D" barStyle="light-content" />
      <Navigator/>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex:1,
  },
});
