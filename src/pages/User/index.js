import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { ActivityIndicator } from 'react-native';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static propTypes = {
    route: PropTypes.shape({
      params: PropTypes.shape({
        user: PropTypes.shape({
          name: PropTypes.string,
          login: PropTypes.string,
          bio: PropTypes.string,
          avatar: PropTypes.string,
        }),
      }),
    }).isRequired,

    navigation: PropTypes.shape({
      setOptions: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loading: false,
    page: 1,
    refreshing: false,
  };

  componentDidMount() {
    this.load();
  }

  async loadMore() {
    const { page } = this.state;
    await this.setState({ page: page + 1 });
    this.load();
  }

  handleNavigate = repository => {
    const { navigation } = this.props;
    console.tron.log(repository)
    console.tron.log('deus')

    this.props.navigation.navigate('Repository', { repository });
  };

  refreshList() {
    this.setState({ page: 1, refreshing: true, stars: [] });
    this.load();
  }

  async load() {
    const { route } = this.props;
    const { stars, page } = this.state;
    const user = route.params.user;
    page === 1 && this.setState({ loading: true });
    const res = await api.get(`users/${user.login}/starred`, {
      params: {
        per_page: 20,
        page: page,
      },
    });
    this.setState(
      page > 1
        ? { stars: [...stars, ...res.data], loading: false }
        : { stars: res.data, loading: false, refreshing: false }
    );
  }

  setDefaultOptions() {
    const { navigation, route } = this.props;
    navigation.setOptions({
      title: route.params.user.name,
    });
  }

  render() {
    this.setDefaultOptions();
    const { route } = this.props;
    const { stars, loading, refreshing } = this.state;

    const user = route.params.user;
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <ActivityIndicator />
        ) : (
            <Stars
              data={stars}
              keyExtractor={(star) => String(star.id)}
              refreshing={refreshing}
              onRefresh={() => this.refreshList()}
              onEndReachedThreshold={0.2}
              onEndReached={() => this.loadMore()}
              renderItem={({ item }) => (
                <Starred onPress={() => this.handleNavigate(item)}>
                  <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
              )}
            />
          )}
      </Container>
    );
  }
}
