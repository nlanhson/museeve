import { Text, View } from 'react-native';
import { colors } from '@/theme';

/** Two-line consent sentence, Login 468:27880. Links open nothing yet (mock build). */
export function LegalFooter() {
  return (
    <View className="items-center">
      <Text
        className="text-center font-body text-sm"
        style={{ color: colors.legal }}
      >
        By continuing, you agree to the{'\n'}
        <Text className="text-fg-strong">Terms of Use</Text> and the{' '}
        <Text className="text-fg-strong">Privacy Policy</Text>.
      </Text>
    </View>
  );
}
