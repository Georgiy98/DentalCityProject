import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import GoodButton from '../widgets/GoodButton';
import ModalDropdown from 'react-native-modal-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';
import NameValidator from '../widgets/validators/NameValidator';
import PhoneNumberValidator from '../widgets/validators/PhoneNumberValidator';
import DateValidator from '../widgets/validators/DateValidator';
import {Data} from '../data';
import {useBackHandler} from '@react-native-community/hooks';

export default function Registration({navigation}) {
  const [name, setName] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [phone, setPhone] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [city, setCity] = useState('Біла Церква');
  const [birthday, setBirthday] = useState(null);

  nameInputRef = useRef();
  phoneInputRef = useRef();
  birthdayInputRef = useRef();

  updateName = (value, is_valid) => {
    setName(value);
    setIsValidName(is_valid);
  };
  updatePhone = (text, is_valid) => {
    setPhone(text);
    setIsValidPhone(is_valid);
  };
  updateCity = (index, value) => {
    setCity(value);
  };

  updateBirthday = text => {
    setBirthday(text);
  };
  askSkipConfirmation = () => {
    Alert.alert(
      'Ви впевнені?',
      'Ви не зможете приймати участь у акціях та накопичувати бали, будучи не авторизованим',
      [
        {
          text: 'Ні',
          style: 'cancel',
        },
        {
          text: 'Так',
          onPress: () => {
            Data.update({
              is_registered: false,
              skip_registration: true,
            });
            navigation.navigate('menu');
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  register = () => {
    nameInputRef.current.updateStyleOnBlur();
    phoneInputRef.current.updateStyleOnBlur();
    birthdayInputRef.current.updateStyleOnBlur();
    if (isValidName && isValidPhone && birthday) {
      let birthday_str =
        ('0' + birthday.getDate()).slice(-2) +
        '.' +
        ('0' + (birthday.getMonth() + 1)).slice(-2) +
        '.' +
        birthday.getFullYear();
      Data.update({
        name: name,
        phone: phone,
        city: city,
        birthday: birthday_str,
        points: 0,
        is_registered: true,
        skip_registration: true,
        last_exercise_time: new Date().getTime(),
        last_exercise_completed: false,
      });
      navigation.navigate('menu');
    }
    console.log(
      'Data: ' +
        name +
        ' ' +
        isValidName +
        ' ' +
        phone +
        ' ' +
        isValidName +
        ' ' +
        city +
        ' ' +
        birthday,
    );
  };
  useBackHandler(() => {
    navigation.navigate(Data.getInstance().prev);
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.root}>
        <TouchableWithoutFeedback onPress={askSkipConfirmation}>
          <View style={styles.containerSkip}>
            <Text style={styles.textSkip}>Пропустити</Text>
          </View>
        </TouchableWithoutFeedback>
        <Text style={styles.header}>Авторизація</Text>
        <View style={styles.input_area}>
          <NameValidator ref={nameInputRef} onChangeValue={updateName} />
          <PhoneNumberValidator
            ref={phoneInputRef}
            onChangeValue={updatePhone}
          />
          <View style={[styles.horizontalContainer, styles.placeContainer]}>
            <Text style={styles.input_label}>Місцерозташування клінінки</Text>

            <ModalDropdown
              defaultIndex={0}
              defaultValue="Біла Церква"
              textStyle={{
                paddingTop: 1,
                paddingHorizontal: 5,
                fontSize: 15,
              }}
              options={['Біла Церква', 'Київ', 'Чернігів', 'Інше місто']}
              onSelect={updateCity}
              renderRightComponent={() => (
                <Icon name="caretdown" style={{paddingTop: 5}} />
              )}
            />
          </View>
          <DateValidator ref={birthdayInputRef} onChangeValue={setBirthday} />
          <View>
            <GoodButton onPress={register}>УВІЙТИ</GoodButton>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  containerSkip: {
    width: '90%',
    alignItems: 'flex-end',
    flex: 0.7,
  },
  textSkip: {
    color: '#b9f',
  },
  header: {
    flex: 0.5,
    fontSize: 25,
    fontWeight: 'bold',
  },
  input_area: {
    flex: 3,
    width: '90%',
  },
  placeContainer: {
    marginBottom: 40,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  input_label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    marginBottom: 15,
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
});
