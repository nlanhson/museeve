import { Text, TextInput, View } from 'react-native';
import { colors } from '@/theme';

/**
 * Country code + divider + number over one shared hairline (545:29011).
 * Country selection is display-only in the mock build: FR +33, per the design.
 */
export function PhoneField({
  value,
  onChangeText,
}: {
  value: string;
  onChangeText: (v: string) => void;
}) {
  return (
    <View className="w-full gap-1">
      <Text className="font-sans-medium text-sm text-fg">Phone number</Text>
      <View className="w-full flex-row items-center border-b border-line-faded">
        <View className="flex-row items-center gap-1.5 py-2.5 pl-3">
          <Text className="text-md">🇫🇷</Text>
          <Text className="font-body text-md text-fg-strong">+33</Text>
          <Text className="text-xs text-fg-muted">▾</Text>
        </View>
        <View className="mx-3 h-6 bg-line-faded" style={{ width: 0.5 }} />
        <TextInput
          value={value}
          onChangeText={(t) => onChangeText(t.replace(/[^\d ]/g, ''))}
          placeholder="6 12 34 56 78"
          placeholderTextColor={colors.fgPlaceholder}
          keyboardType="phone-pad"
          className="flex-1 py-2.5 pr-3 font-body text-md text-fg-strong"
        />
      </View>
    </View>
  );
}
