import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import 'react-native-gesture-handler';
import {createAppContainer} from 'react-navigation';

import {AppNavigation} from 'navigations';

export default createAppContainer(AppNavigation);
