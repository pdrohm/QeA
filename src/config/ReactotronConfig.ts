import Reactotron from 'reactotron-react-native';

Reactotron.configure({host: '192.168.3.3'}).useReactNative().connect();

export default Reactotron;