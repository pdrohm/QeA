declare module 'react-native-latex' {
  import { ViewStyle } from 'react-native';
  
  interface LatexProps {
    latex: string;
    style?: ViewStyle;
  }
  
  const Latex: React.FC<LatexProps>;
  export default Latex;
} 