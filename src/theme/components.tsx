import { createBox, createText } from '@shopify/restyle';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import theme, { Theme } from './theme';

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

type ButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  icon?: React.ReactNode;
};

export const Button = ({ title, variant = 'primary', disabled, icon, style, ...props }: ButtonProps) => {
  const getBackgroundColor = () => {
    if (disabled) return 'lightGray';
    switch (variant) {
      case 'secondary':
        return 'cardBackground';
      case 'danger':
        return 'error';
      default:
        return 'primary';
    }
  };

  const getTextColor = () => {
    if (disabled) return 'textSecondary';
    return variant === 'secondary' ? 'textPrimary' : 'textOnPrimary';
  };

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: theme.colors[getBackgroundColor()],
          padding: theme.spacing.s,
          borderRadius: theme.borderRadii.s,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      disabled={disabled}
      {...props}
    >
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap="xs"
      >
        {icon}
        <Text 
          variant="body" 
          color={getTextColor()}
        >
          {title}
        </Text>
      </Box>
    </TouchableOpacity>
  );
}; 