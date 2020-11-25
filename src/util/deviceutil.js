const device = require('react-native-device-info');
import { NativeModules } from 'react-native';

// device.getImeiSync = NativeModules.IMEI.getImeiSync;
device.getImei = NativeModules.IMEI.getImei;
device.getApplicationId = NativeModules.IMEI.getApplicationId;

module.exports = device;
