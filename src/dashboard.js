import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {};
export default class DashBoard extends Component<Props> {
  state = {
    user:{},
    conversations : []
  };
  componentDidUpdate() {
    if(this.props.user != this.state.user) {
      this.setState({user : this.props.user}) ;
      // faire un fetch pour récupérer la liste des conversations 
      // insérer dans this.state.conversations la liste recue par le serveur
    }
  }

  render() {
    this.componentDidUpdate()
    return (
      <View style={styles.form}>
        <Text>Bienvenue {this.state.user.name}</Text>
        {
          this.state.conversations.map(conversation => {
            <View>
              <Text>Conversation ... </Text>
            </View>
          })
        }
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
