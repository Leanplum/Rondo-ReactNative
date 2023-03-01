import React from 'react';
import {Leanplum} from '@leanplum/react-native-sdk';

import {ListComponent} from './list.component';

export const PushComponent = () => {
  const listData = [
    {
      id: 1,
      name: 'pushRender',
      onPress: () => Leanplum.track('pushRender'),
    },
    {
      id: 2,
      name: 'pushAction',
      onPress: () => Leanplum.track('pushAction'),
    },
    {
      id: 3,
      name: 'pushImage',
      onPress: () => Leanplum.track('pushImage'),
    },
    {
      id: 4,
      name: 'pushExistingAction',
      onPress: () => Leanplum.track('pushExistingAction'),
    },
    {
      id: 5,
      name: 'pushURL',
      onPress: () => Leanplum.track('pushURL'),
    },
    {
      id: 6,
      name: 'pushOptions',
      onPress: () => Leanplum.track('pushOptions'),
    },
    {
      id: 7,
      name: 'pushLocal',
      onPress: () => Leanplum.track('pushLocal'),
    },
    {
      id: 8,
      name: 'pushLocalCancel',
      onPress: () => Leanplum.track('pushLocalCancel'),
    },
    {
      id: 9,
      name: 'pushMuted',
      onPress: () => Leanplum.track('pushMuted'),
    },
    {
      id: 10,
      name: 'pushLocalSamePriorityTime',
      onPress: () => Leanplum.track('pushLocalSamePriorityTime'),
    },
    {
      id: 11,
      name: 'pushLocalSamePriorityDifferentTime',
      onPress: () => Leanplum.track('pushLocalSamePriorityDifferentTime'),
    },
    {
      id: 12,
      name: 'register',
      onPress: () => Leanplum.track('register'),
    },
    {
      id: 13,
      name: 'registerPush',
      onPress: () => Leanplum.track('registerPush'),
    },
  ];
  return <ListComponent sourceData={listData} />;
};
