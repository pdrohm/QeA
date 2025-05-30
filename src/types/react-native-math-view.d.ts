declare module 'react-native-math-view' {
  import { ViewStyle } from 'react-native';
  
  interface MathViewProps {
    math: string;
    style?: ViewStyle;
    color?: string;
  }
  
  const MathView: React.FC<MathViewProps>;
  export default MathView;
} 