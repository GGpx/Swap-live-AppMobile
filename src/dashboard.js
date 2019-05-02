import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {};
export default class DashBoard extends Component<Props> {

  render() {
    return (
      <View style={styles.form}>
        <Text>Bienvenue</Text>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  form: {
    flexDirection: 'column',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    flex: 1,
  },
});
