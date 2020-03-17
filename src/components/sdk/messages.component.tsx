import React from 'react';
import {Leanplum} from 'react-native-leanplum';

import {ListComponent} from './list.component';

export const MessagesComponent = () => {
  const listData = [
    {
      id: 1,
      name: 'alert',
      onPress: () => Leanplum.track('alert')
    },
    {
      id: 2,
      name: 'centerPopup',
      onPress: () => Leanplum.track('centerPopup')
    },
    {
      id: 3,
      name: 'confirm',
      onPress: () => Leanplum.track('confirm')
    },
    {
      id: 4,
      name: 'interstitial',
      onPress: () => Leanplum.track('interstitial')
    },
    {
      id: 5,
      name: 'richInterstitial',
      onPress: () => Leanplum.track('richInterstitial')
    },
    {
      id: 6,
      name: 'webInterstitial',
      onPress: () => Leanplum.track('webInterstitial')
    },
    {
      id: 7,
      name: 'banner',
      onPress: () => Leanplum.track('banner')
    },
  ];
  return <ListComponent sourceData={listData} />;
};
