
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

type Props = {};
export default class AcountForm extends Component<Props> {
  state = {

  }

  _onCreate() {
    console.log('onCreate')


    fetch(
      'http://10.1.171.108:3000/users', {
        method: 'POST',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.Login,
          password: this.state.Password,
        }),
      })
      .then((response) => response.text())
      .then((datas) => {
        // à la reponse
        console.log(datas);
        console.log(this.state)
        // si OK => donne accés au dashboard
        if (datas == "connexion OK") {
          // @todo deplacer --
          this.props.setParentState({ isLogged: true });
          console.log(this.state)
        } else {
          this.setState({ Password: '' })
          alert(datas);
        }
        // si NON OK => afficher message erreur + efface password
      })
  }
  render() {
    return (
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          autoCapitalize={'none'}
          placeholder="firstName"
          onChangeText={() => { }}
        />
        <TextInput
          style={styles.input}
          autoCapitalize={'none'}
          placeholder="lastName"
          onChangeText={() => { }}
        />
        <TextInput
          style={styles.input}
          autoCapitalize={'none'}
          placeholder="login"
          onChangeText={() => { }}
        />
        <TextInput
          style={styles.input}
          autoCapitalize={'none'}
          placeholder="password"
          onChangeText={() => { }}
        />
        <TouchableOpacity onPress={this._onCreate} style={styles.button}>
          <Text>Créer mon compte</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.props.setParentState({ isLogin: true }); }} style={styles.link}>
          <Text>J'ai déja un compte</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 10
  },
  form: {
    flexDirection: 'column',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    flex: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    alignSelf: 'stretch',
    marginHorizontal: 30,
    padding: 10,
  },
  link: {
    alignItems: 'flex-end',
    marginHorizontal: 30,
    marginTop: 30,
    padding: 10,
  },
  input: {
    height: 40,
    borderColor: 'silver',
    borderWidth: 1,
    alignSelf: 'stretch',
    // flex: 1,
    paddingHorizontal: 5,
    marginBottom: 10
  },
});