
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { Button, Item, Input, Icon } from 'native-base'

//const server = 'http://10.1.171.58:3000' ;
const server = 'http://swaplive.it-students.fr' ;

type Props = {};
export default class LoginForm extends Component<Props> {
  state = {
    Login: "",
    Password: "",
  }
  _onLogin() {
    console.log('onLogin')
    // recuperer valeurs des inputs
    // console.log(this.state) ;
    // envoyer au server
    console.log(this.state);
    console.log(JSON.stringify({
      login: this.state.Login,
      password: this.state.Password
    }));

    fetch(
      server+'/login', {
        method: 'POST',
        headers: {
          // Accept: 'application/json',
          'Content-Type': 'application/json',
          'credentials': 'same-origin',
        },
        body: JSON.stringify({
          email: this.state.Login,
          password: this.state.Password
        })
      })
      .then((response) => { return response.json() })
      .then((datas) => {
        // à la reponse
        console.log(datas);
        console.log(this.state)
        // si OK => donne accés au dashboard
        if (datas.result == "connexion réussis YALLLLA") {
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
        <Item regular>
          <Icon active type="FontAwesome" name='user' />
          <Input
            autoCapitalize={'none'}
            placeholder="login"
            value={this.state.Login}
            onChangeText={(text) => { this.setState({ Login: text }) }}
          />
        </Item>
        <Item regular>
          <Icon active name='lock' />
          <Input
            autoCapitalize={'none'}
            placeholder="password"
            value={this.state.Password}
            onChangeText={(text) => { this.setState({ Password: text }) }}
          />
        </Item>
        <Button rounded danger block onPress={this._onLogin.bind(this)}>
          <Text>Identification</Text>
        </Button>
        <TouchableOpacity onPress={() => { this.props.setParentState({ isLogin: false }); }} style={styles.link}>
          <Text>Créer mon compte</Text>
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
