import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import api from '../services/api';

// import { Container } from './styles';

export default class User extends Component {
  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.shape({
          name: PropTypes.string,
          login: PropTypes.string,
        }),
      }),
    }).isRequired,

    navigation: PropTypes.shape({
      setOptions: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
  };

  async componentDidMount() {
    const { route, stars } = this.props;
    const user = route.params.user;

    const res = await api.get(`users/${user.login}/starred`);

    this.setState({ stars: res.data });
  }

  setDefaultOptions() {
    const { navigation, route } = this.props;
    navigation.setOptions({
      title: route.params.user.name,
    });
  }

  render() {
    this.setDefaultOptions();
    return <View></View>;
  }
}
