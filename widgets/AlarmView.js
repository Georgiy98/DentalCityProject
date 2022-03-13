import React, {useState} from 'react';
import {View} from 'react-native';
import {useBackHandler} from '@react-native-community/hooks';

export default function AlarmView({navigation}) {
  const [daysOfWeek, setDaysOfWeek] = useState();
  return (
    <View style={styles.body}>
      <View style={{flex: 0.3}}></View>
      <View style={styles.baseLine}>
        <Text style={styles.timeText}>{this.state.rule.label}</Text>
        <View style={styles.leftPart}>
          <Text
            style={{
              fontWeight: this.state.rule.daysOfWeek.includes(1)
                ? 'bold'
                : 'normal',
            }}>
            П
          </Text>
          <Text
            style={{
              fontWeight: this.state.rule.daysOfWeek.includes(2)
                ? 'bold'
                : 'normal',
            }}>
            В
          </Text>
          <Text
            style={{
              fontWeight: this.state.rule.daysOfWeek.includes(3)
                ? 'bold'
                : 'normal',
            }}>
            С
          </Text>
          <Text
            style={{
              fontWeight: this.state.rule.daysOfWeek.includes(4)
                ? 'bold'
                : 'normal',
            }}>
            Ч
          </Text>
          <Text
            style={{
              fontWeight: this.state.rule.daysOfWeek.includes(5)
                ? 'bold'
                : 'normal',
            }}>
            П
          </Text>
          <Text
            style={{
              fontWeight: this.state.rule.daysOfWeek.includes(6)
                ? 'bold'
                : 'normal',
            }}>
            С
          </Text>
          <Text
            style={{
              fontWeight: this.state.rule.daysOfWeek.includes(7)
                ? 'bold'
                : 'normal',
            }}>
            В
          </Text>
          <Switch
            value={this.state.enabled}
            onValueChange={this.setEnabledStatus}
          />
        </View>
      </View>
      <View style={styles.lowPart}>
        <Icon name="closesquareo" size={15} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#b9f',
    marginBottom: 5,
    height: 80,
    borderRadius: 20,
  },
  baseLine: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  leftPart: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    justifyContent: 'space-between',
  },
  lowPart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 25,
    width: 100,
  },
  button: {
    backgroundColor: '#628',
    padding: 10,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    borderRadius: 4,
  },
});
