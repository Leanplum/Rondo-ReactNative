import React from 'react';
import {Leanplum} from '@leanplum/react-native-sdk';

import {Buttons} from './buttons.component';

export const TriggersComponent = () => {
  const buttonsData = [
    {
      id: 1,
      name: 'EVENTS: TESTEVENT',
      onPress: () => Leanplum.track('testEvent'),
    },
    {
      id: 2,
      name: 'STATE: TESTSTATE',
      onPress: () => Leanplum.advanceTo('testState'),
    },
    // {
    //   id: 3,
    //   name: 'USERATTREIBUTECHANGE',
    //   onPress: () => Leanplum.setUserAttributes(attrib)
    // },
    {
      id: 4,
      name: 'THIS SHOULD WORK 3 TIMES PER SESSION',
      onPress: () => Leanplum.advanceTo('sessionLimit'),
    },
    {
      id: 5,
      name: 'THIS SHOULD WORK 3 TIMES PER LIFETIME',
      onPress: () => Leanplum.advanceTo('lifetimeLimit'),
    },
    {
      id: 6,
      name: 'CHAINED TO IN APP',
      onPress: () => Leanplum.track('chainedInApp'),
    },
    {
      id: 7,
      name: 'DIFFERENT PRIORITY SAME TIME',
      onPress: () => Leanplum.track('DifferentPrioritySameTime'),
    },
  ];

  return <Buttons sourceData={buttonsData} />;
};
