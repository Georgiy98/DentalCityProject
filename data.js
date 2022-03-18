import AsyncStorage from '@react-native-async-storage/async-storage';

export let Data = (function () {
  var instance;

  return {
    getInstance: function () {
      if (!instance) {
        instance = {};
      }
      return instance;
    },
    get: function (key) {
      return this.getInstance()[key];
    },
    update: function (data) {
      instance = {...this.getInstance(), ...data};
      for (let key in data) {
        AsyncStorage.setItem(key, '' + data[key]);
      }
    },
  };
})();
