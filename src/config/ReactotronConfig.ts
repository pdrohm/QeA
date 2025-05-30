import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';

declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}

const reactotron = Reactotron.setAsyncStorageHandler!(AsyncStorage)
  .configure({
    name: 'Meu Guru',
  })
  .useReactNative({
    asyncStorage: false,
    networking: {
      ignoreUrls: /symbolicate/,
    },
    editor: false,
    errors: { veto: () => false },
    overlay: false,
  })
  .connect();

console.tron = reactotron;

export default reactotron; 