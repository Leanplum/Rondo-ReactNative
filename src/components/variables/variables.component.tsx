import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {Leanplum} from 'leanplum';
import {Varstring} from './varstring.component';
import {Var} from './var.component';
import {Buttons} from './buttons.control';

const STRING_VARIABLE_NAME: string = 'stringVar';
const NUM_VARIABLE_NAME: string = 'numVar';
const BOOL_VARIABLE_NAME: string = 'boolVar';
const MAP_VARIABLE_NAME: string = 'mapVar';
const ARR_VARIABLE_NAME: string = 'arrayVar';
let isVariableSet = false;

// export function valueChangedHandlerString(event: any) {
//   console.log(
//     'STRING VARIABLE VALUE IS: ',
//     Leanplum.getVariable(STRING_VARIABLE_NAME),
//   );
// }

export const Variables = () => {
  //const [stringVar, setStringVar] = useState(STRING_VARIABLE_NAME);
  // const [stringVarDefaultValue, setStringVariableDefaultValue] = useState(
  //   'string var default value',
  // );

  // const [numVar, setNumVar] = useState(NUM_VARIABLE_NAME);
  // const [numVarDefaultValue, setNumVariableDefaultValue] = useState('12');
  var stringVarVal: String = 'string var default value';
  var numVarVal: Number = 12;
  var boolVarVal: Boolean = true;
  var isCallBack: Boolean = false;
  const valueChangedHandlerString = () => {
    console.log('valueChangedHandlerString is invoked');
    const val = Leanplum.getVariable(STRING_VARIABLE_NAME);
    if (val != undefined) {
      stringVarVal = val.toString();
      Alert.alert(STRING_VARIABLE_NAME + ' value is: ' + stringVarVal);
    }
    isCallBack = true;
  };
  const valueChangedHandlerNum = () => {
    console.log('valueChangedHandlerNum is invoked');
    const val = Leanplum.getVariable(NUM_VARIABLE_NAME);
    if (val != undefined) {
      numVarVal = +val;
      Alert.alert(NUM_VARIABLE_NAME + ' value is: ' + numVarVal.toString());
    }
    isCallBack = true;
  };
  const valueChangedHandlerBool = () => {
    console.log('valueChangedHandlerBool is invoked');
    const val = Leanplum.getVariable(BOOL_VARIABLE_NAME);
    if (val != undefined) {
      boolVarVal = !!val;
      Alert.alert(BOOL_VARIABLE_NAME + ' value is: ' + boolVarVal.toString());
    }
    isCallBack = true;
  };

  const valueChangedHandlerMap = () => {
    console.log('valueChangedHandlerMap is invoked');
    const val = Leanplum.getVariable(MAP_VARIABLE_NAME);
    if (val != undefined) {
      Alert.alert(MAP_VARIABLE_NAME + ' value is: ' + JSON.stringify(val));
    }
    isCallBack = true;
  };

  const valueChangedHandlerArr = () => {
    console.log('valueChangedHandlerArr is invoked');
    const val = Leanplum.getVariable(ARR_VARIABLE_NAME);
    if (val != undefined) {
      Alert.alert(ARR_VARIABLE_NAME + ' value is: ' + JSON.stringify(val));
    }
    isCallBack = true;
  };

  if (!isVariableSet && !isCallBack) {
    Leanplum.setVariable(STRING_VARIABLE_NAME, stringVarVal);
    Leanplum.setVariable(NUM_VARIABLE_NAME, numVarVal);
    Leanplum.setVariable(BOOL_VARIABLE_NAME, boolVarVal);
    Leanplum.addValueChangedHandler(
      STRING_VARIABLE_NAME,
      valueChangedHandlerString,
    );
    Leanplum.addValueChangedHandler(NUM_VARIABLE_NAME, valueChangedHandlerNum);
    Leanplum.addValueChangedHandler(
      BOOL_VARIABLE_NAME,
      valueChangedHandlerBool,
    );
    //SET MAP/LIST VARIABLE
    const myMap = {
      var1: 'var1 val',
      var2: 'var2 val',
    };

    const myArr = [1, 2, 3, 4, 5];
    Leanplum.setVariable(MAP_VARIABLE_NAME, myMap);
    Leanplum.addValueChangedHandler(MAP_VARIABLE_NAME, valueChangedHandlerMap);
    Leanplum.setVariable(ARR_VARIABLE_NAME, myArr);
    Leanplum.addValueChangedHandler(ARR_VARIABLE_NAME, valueChangedHandlerArr);
    ////////////////////
    isVariableSet = true;
  }

  console.log('NUM VAR IS:' + numVarVal);
  console.log('STR VAR IS:' + stringVarVal);
  console.log('BOOL VAR IS:' + boolVarVal);

  return (
    <ScrollView>
      <Var name={STRING_VARIABLE_NAME} defaultValue={stringVarVal.toString()} />
      <Var name={NUM_VARIABLE_NAME} defaultValue={numVarVal.toString()} />
      <Var name={BOOL_VARIABLE_NAME} defaultValue={boolVarVal.toString()} />
      <Buttons />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
  },
  button: {
    marginTop: 10,
  },
});
