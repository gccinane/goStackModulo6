import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, SubmitButton, Form, Input } from './styles';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
  };

  handleAddUser = () => {
    console.log();
    console.tron.log(this.state.newUser);
  };

  render() {
    const { newUser } = this.state;
    return (
      <Container>
        <Form>
          <Input
            placeholder="Adicionar usuário"
            autoCorrect={false}
            autoCapitalize="none"
            value={newUser}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
            onChangeText={(text) => this.setState({ newUser: text })}
          ></Input>
          <SubmitButton onPress={this.handleAddUser}>
            <Icon name="add" size={20} color="#fff" />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
