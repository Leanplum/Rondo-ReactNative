import React, {useState} from 'react';
import {ScrollView, StyleSheet, Image} from 'react-native';
import {Leanplum} from 'leanplum';
import {Var} from './var.component';
import {Buttons} from './buttons.control';

const STRING_VARIABLE_NAME: string = 'var_text';
const NUM_VARIABLE_NAME: string = 'var_number';
const BOOL_VARIABLE_NAME: string = 'var_bool';
const MAP_VARIABLE_NAME: string = 'mapVar';
const ARR_VARIABLE_NAME: string = 'arrayVar';
const ASSET_VARIABLE_NAME: string = 'var_file';

let isVariableSet = false;

export class Variables extends React.Component<any, any> {
  state = {
    stringVarVal: 'string var default value',
    numVarVal: 12,
    boolVarVal: true,
    assetVarVal:
      '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',
  };

  valueChangedHandlerString = () => {
    const val = Leanplum.getVariable(STRING_VARIABLE_NAME);
    if (val != undefined) {
      this.setState({stringVarVal: val.toString()});
    }
  };

  valueChangedHandlerNum = () => {
    const val = Leanplum.getVariable(NUM_VARIABLE_NAME);
    if (val != undefined) {
      this.setState({numVarVal: val});
    }
  };

  valueChangedHandlerBool = () => {
    const val = Leanplum.getVariable(BOOL_VARIABLE_NAME);
    if (val != undefined) {
      this.setState({boolVarVal: val});
    }
  };

  valueChangedHandlerMap = () => {
    const val = Leanplum.getVariable(MAP_VARIABLE_NAME);
    if (val != undefined) {
      console.log(MAP_VARIABLE_NAME + ' value is: ' + JSON.stringify(val));
    }
  };

  valueChangedHandlerArr = () => {
    const val = Leanplum.getVariable(ARR_VARIABLE_NAME);
    if (val != undefined) {
      console.log(ARR_VARIABLE_NAME + ' value is: ' + JSON.stringify(val));
    }
  };

  valueChangedHandlerAsset = () => {
    const val = Leanplum.getVariable(ASSET_VARIABLE_NAME);
    if (val != undefined) {
      this.setState({assetVarVal: val});
    }
  };

  public componentDidMount() {
    if (!isVariableSet) {
      Leanplum.setVariable(STRING_VARIABLE_NAME, this.state.stringVarVal);
      Leanplum.setVariable(NUM_VARIABLE_NAME, this.state.numVarVal);
      Leanplum.setVariable(BOOL_VARIABLE_NAME, this.state.boolVarVal);
      Leanplum.addValueChangedHandler(
        STRING_VARIABLE_NAME,
        this.valueChangedHandlerString,
      );
      Leanplum.addValueChangedHandler(
        NUM_VARIABLE_NAME,
        this.valueChangedHandlerNum,
      );
      Leanplum.addValueChangedHandler(
        BOOL_VARIABLE_NAME,
        this.valueChangedHandlerBool,
      );
      Leanplum.setAsset(ASSET_VARIABLE_NAME, 'Mario.png');
      Leanplum.addValueChangedHandler(
        ASSET_VARIABLE_NAME,
        this.valueChangedHandlerAsset,
      );
      //SET MAP/LIST VARIABLE
      // const myMap = {
      //   var1: 'var1 val',
      //   var2: 'var2 val',
      // };

      // const myArr = [1, 2, 3, 4, 5];
      // Leanplum.setVariable(MAP_VARIABLE_NAME, myMap);
      // Leanplum.addValueChangedHandler(
      //   MAP_VARIABLE_NAME,
      //   this.valueChangedHandlerMap,
      // );
      // Leanplum.setVariable(ARR_VARIABLE_NAME, myArr);
      // Leanplum.addValueChangedHandler(
      //   ARR_VARIABLE_NAME,
      //   this.valueChangedHandlerArr,
      // );
      ////////////////////
      isVariableSet = true;
    }
  }

  public render() {
    return (
      <ScrollView>
        <Var
          name={STRING_VARIABLE_NAME}
          defaultValue={this.state.stringVarVal.toString()}
        />
        <Var
          name={NUM_VARIABLE_NAME}
          defaultValue={this.state.numVarVal.toString()}
        />
        <Var
          name={BOOL_VARIABLE_NAME}
          defaultValue={this.state.boolVarVal.toString()}
        />
        <Image
          style={{
            width: 51,
            height: 51,
            resizeMode: 'contain',
          }}
          source={{uri: `data:image/png;base64,${this.state.assetVarVal}`}}
        />
        <Buttons />
      </ScrollView>
    );
  }

  styles = StyleSheet.create({
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
}
