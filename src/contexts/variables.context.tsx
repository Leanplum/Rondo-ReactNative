import React, {useContext, useState} from 'react';
import {
  STRING_VARIABLE_NAME,
  NUM_VARIABLE_NAME,
  BOOL_VARIABLE_NAME,
  ARR_VARIABLE_NAME,
  MAP_VARIABLE_NAME,
} from 'utils';

const variablesDefaultValue = {
  [STRING_VARIABLE_NAME]: 'string var default value',
  [NUM_VARIABLE_NAME]: 12,
  [BOOL_VARIABLE_NAME]: true,
  [ARR_VARIABLE_NAME]: [2],
  [MAP_VARIABLE_NAME]: {
    var1: 'default var 1',
    var2: 'default var 2',
  },
};

const VariablesContext = React.createContext<any>(undefined);

function VariablesProvider({children}: {children: any}) {
  const [variables, setVariables] = useState(variablesDefaultValue);
  return (
    <VariablesContext.Provider value={{variables, setVariables}}>
      {children}
    </VariablesContext.Provider>
  );
}

function useVariablesContext() {
  const ctx = useContext(VariablesContext);
  if (!ctx) {
    throw new Error('Variables must be consumed inside of Variables Provider');
  }
  return ctx;
}
export {VariablesProvider, useVariablesContext};
