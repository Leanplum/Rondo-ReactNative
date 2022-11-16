import React, { useEffect, useState, useContext } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { ThemeContext, Button } from 'react-native-elements';
import { Leanplum, MigrationConfig } from '@leanplum/react-native-sdk';

const globalScope: any = global;

export const MigrationScreen = () => {
    const [migrationConfig, setMigrationConfig] = useState<MigrationConfig>();
  
    useEffect(() => {
        async function initScreen() {
            const migrationConfigValue = await Leanplum.migrationConfig();
            setMigrationConfig(migrationConfigValue);
          }
          initScreen();
    }, []);

    const { theme } = useContext(ThemeContext);

    const singleParam = { "param1": "value1" };
    const intParam = `int_param_${Number.MAX_SAFE_INTEGER}`;
    const floatParam = `float_param_${Number.MAX_VALUE}`;

    const trackParams: any = {
        "string_param_str": "str",
        "bool_param_true": true,
        "date_param_now": new Date(),
        "null": null
    };
    trackParams[intParam] = Number.MAX_SAFE_INTEGER;
    trackParams[floatParam] = Number.MAX_VALUE;

    const additionalParams = {
        "list_param_a_1_b_2": ["a", 1, "b", 2],
        "list_param_empty": []
    };

    const attributeParams = Object.assign({}, trackParams, additionalParams);

    const DOB = {
        "DOB": new Date(Date.parse("1999-01-10"))
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View>
                    <Text style={{ color: theme?.colors?.primary }}>
                        Migration Manager
                    </Text>
                    <View style={styles.propertyView}>
                        <Text style={styles.label}>State: </Text>
                        <Text style={{ color: theme?.colors?.secondary }}>{migrationConfig?.state}</Text>
                    </View>
                    <View style={styles.propertyView}>
                        <Text style={styles.label}>Account Id: </Text>
                        <Text style={{ color: theme?.colors?.secondary }}>{migrationConfig?.accountId}</Text>
                    </View>
                    <View style={styles.propertyView}>
                        <Text style={styles.label}>Account Token: </Text>
                        <Text style={{ color: theme?.colors?.secondary }}>{migrationConfig?.accountToken}</Text>
                    </View>
                    <View style={styles.propertyView}>
                        <Text style={styles.label}>Account Region: </Text>
                        <Text style={{ color: theme?.colors?.secondary }}>{migrationConfig?.accountRegion}</Text>
                    </View>
                    <View style={styles.propertyView}>
                        <Text style={styles.label}>Attribute Mappings: </Text>
                        <Text style={{ color: theme?.colors?.secondary }}>{JSON.stringify(migrationConfig?.attributeMappings)}</Text>
                    </View>
                </View>
                <View>
                    <Text style={{ color: theme?.colors?.primary }}>
                        User Attributes
                    </Text>
                    <View style={styles.buttonView}>
                        <Button
                            title="setUserAttributes(one-attribute)"
                            onPress={() =>
                                Leanplum.setUserAttributes(singleParam)
                            }
                        />
                    </View>
                    <View style={styles.buttonView}>
                        <Button
                            title="setUserAttributes(all-type-attributes)"
                            buttonStyle={styles.button}
                            onPress={() =>
                                Leanplum.setUserAttributes(attributeParams)
                            }
                        />
                    </View>
                    <View style={styles.buttonView}>
                        <Button
                            title="set DOB"
                            buttonStyle={styles.button}
                            onPress={() =>
                                Leanplum.setUserAttributes(DOB)
                            }
                        />
                    </View>
                </View>
                <View>
                    <Text style={{ color: theme?.colors?.primary }}>
                        Track
                    </Text>
                    <View style={styles.buttonView}>
                        <Button
                            title="track(event)"
                            buttonStyle={styles.button}
                            onPress={() =>
                                Leanplum.track("track(event)")
                            }
                        />
                    </View>
                    <View style={styles.buttonView}>
                    <Button
                        title="track(event info)"
                        buttonStyle={styles.button}
                        onPress={() =>
                            Leanplum.track("track(event all-type-params)", trackParams)
                        }
                    />
                    </View>
                </View>
                <View>
                    <Text style={{ color: theme?.colors?.primary }}>
                        Advance
                    </Text>
                    <View style={styles.buttonView}>
                    <Button
                        title="advance(event)"
                        buttonStyle={styles.button}
                        onPress={() =>
                            Leanplum.advanceTo("advance(state)")
                        }
                    />
                    </View>
                    <View style={styles.buttonView}>
                    <Button
                        title="advance(event info)"
                        buttonStyle={styles.button}
                        onPress={() =>
                            Leanplum.advanceTo("advance(event info)", "info")
                        }
                    />
                    </View>
                    <View style={styles.buttonView}>
                    <Button
                        title="advance(event info one-param)"
                        buttonStyle={styles.button}
                        onPress={() =>
                            Leanplum.advanceTo("advance(event info one-param)", "info", singleParam)
                        }
                    />
                    </View>
                    <View style={styles.buttonView}>
                    <Button
                        title="advance(event info all-type-params)"
                        buttonStyle={styles.button}
                        onPress={() =>
                            Leanplum.advanceTo("advance(event info all-type-params)", "info", trackParams)
                        }
                    />
                    </View>
                </View>
                <View>
                    <Text style={{ color: theme?.colors?.primary }}>
                        Track Purchase
                    </Text>
                    <View style={styles.buttonView}>
                    <Button
                        title="trackPurchase(event 0 null null)"
                        buttonStyle={styles.button}
                        onPress={() =>
                            Leanplum.trackPurchase(0.0, null, null, "trackPurchase(event 0 null null)")
                        }
                    />
                    </View>
                    <View style={styles.buttonView}>
                    <Button
                        title="trackPurchase(event value currency one-param)"
                        buttonStyle={styles.button}
                        onPress={() =>
                            Leanplum.trackPurchase(2.5, "BGN", singleParam, "trackPurchase(event value currency one-param)")
                        }
                    />
                    </View>
                    <View style={styles.buttonView}></View>
                    <Button
                        title="trackPurchase(event value currency all-type-params)"
                        buttonStyle={styles.button}
                        onPress={() =>
                            Leanplum.trackPurchase(2.5, "BGN", trackParams, "trackPurchase(event value currency all-type-params)")
                        }
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        padding: 10,
        flex: 1,
        flexDirection: 'column',
    },
    switchView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    buttonView: {
        marginVertical: 5,
    },
});
