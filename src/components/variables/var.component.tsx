import React from 'react';
import {View} from 'react-native';
import {Input} from 'react-native-elements';

type VariableProps = {
  name: string;
  defaultValue: any;
};

export const Var = ({name, defaultValue}: VariableProps) => {
  return (
    <View>
      <Input
        autoCapitalize="none"
        editable={false}
        label={name}
        value={
          typeof defaultValue === 'string'
            ? defaultValue
            : defaultValue.toString()
        }
      />
    </View>
  );
};
