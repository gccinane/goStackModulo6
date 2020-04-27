import React from 'react';
import { WebView } from 'react-native-webview';

export default function Repository(props) {
  const { route } = props
  const { repository } = route.params
  return (
    <WebView
      source={{ uri: repository.html_url }}
      style={{ marginTop: 20 }}
    />
  );

}
