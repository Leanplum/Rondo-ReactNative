import React from 'react';
import {Leanplum} from '@leanplum/react-native-sdk';

import {Buttons} from './buttons.component';

export const TriggersComponent = () => {
  const buttonsData = [
    {
      id: 1,
      name: 'track "testEvent',
      onPress: () => Leanplum.track('testEvent'),
    },
    {
      id: 2,
      name: 'Advance to "testState"',
      onPress: () => Leanplum.advanceTo('testState'),
    },
    // {
    //   id: 3,
    //   name: 'Change User Attribute',
    //   onPress: () => Leanplum.setUserAttributes({"age": "4"})
    // },
    {
      id: 4,
      name: 'Work 3 times per session',
      onPress: () => Leanplum.advanceTo('sessionLimit'),
    },
    {
      id: 5,
      name: 'Work 3 times per lifetime',
      onPress: () => Leanplum.advanceTo('lifetimeLimit'),
    },
    {
      id: 6,
      name: 'Chained To InApp',
      onPress: () => Leanplum.track('chainedInApp'),
    },
    {
      id: 7,
      name: 'Open Url',
      onPress: () => Leanplum.track('openURL'),
      iOSOnly: true
    },
    {
      id: 8,
      name: 'Register Push',
      onPress: () => Leanplum.track('registerPush'),
      iOSOnly: true
    },
    {
      id: 9,
      name: 'Request App Rating',
      onPress: () => Leanplum.track('appRating'),
      iOSOnly: true
    },
    {
      id: 10,
      name: 'Different Priority Same Time',
      onPress: () => Leanplum.track('DifferentPrioritySameTime'),
    },
  ];

  return <Buttons sourceData={buttonsData} />;
};
