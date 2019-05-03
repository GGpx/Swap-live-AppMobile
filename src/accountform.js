
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';

const server = 'http://10.1.171.58:3000' ;
//const server = 'http://swaplive.it-students.fr' ;

type Props = {};
export default class AcountForm extends Component<Props> {
  state = {
    firstName: "",
    lastName: "",
    login: "",
    password: "",
  }

  _onCreate() {
    console.log('onCreate')

    // console.log(JSON.stringify({
    //   Name: this.state.name,
    //   lastName: this.state.lastName,
    //   email: this.state.email,
    //   password: this.state.password
    // }));

    fetch(
      server+'/users', {
        method: 'POST',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
          'credentials': 'same-origin',
        },
        body: JSON.stringify({
          name: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.login,
          password: this.state.password
        })
      })
      .then((response) => response.json())
      .then((datas) => {
        // à la reponse
        console.log(datas);
        console.log(this.state)
        // si OK => donne accés au dashboard
        if (datas.state == "ok") {
          // @todo deplacer --
          fetch(server+'/users/'+datas.id, {
            headers: {
              // Accept: 'application/json',
              'credentials': 'same-origin',
            }
          })
            .then((response) => response.json())
            .then((userDatas) => {
              console.log(userDatas)
              this.props.setParentState({ isLogged: true, user:userDatas });
              this.setState({ Password: '' })
            });
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
          onChangeText={(text) => {this.setState({ firstName: text }) }}
        />
        <TextInput
          style={styles.input}
          autoCapitalize={'none'}
          placeholder="lastName"
          onChangeText={(text) => {this.setState({ lastName: text }) }}
        />
        <TextInput
          style={styles.input}
          autoCapitalize={'none'}
          placeholder="login"
          onChangeText={(text) => {this.setState({ login: text }) }}
        />
        <TextInput
          style={styles.input}
          autoCapitalize={'none'}
          placeholder="password"
          onChangeText={(text) => {this.setState({ password: text }) }}
        />
        <TouchableOpacity onPress={this._onCreate.bind(this)} style={styles.button}>
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
