import { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  type KeyboardTypeOptions,
} from 'react-native';
import { colors } from '@/theme';

type Props = {
  label: string;
  required?: boolean;
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words';
  multiline?: boolean;
  testID?: string;
};

/**
 * Label above a borderless input with a single bottom hairline.
 * Login 468:27846: label DM Sans Medium 14, gap 4; input px-12 py-10, 16/24.
 */
export function UnderlineField({
  label,
  required = false,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  autoCapitalize = 'none',
  multiline = false,
  testID,
}: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <View className="w-full gap-1">
      <Text className="font-sans-medium text-sm text-fg">
        {label}
        {required ? <Text className="text-danger"> *</Text> : null}
      </Text>
      <View
        className="w-full border-b"
        style={{ borderColor: focused ? colors.fgMuted : colors.lineFaded }}
      >
        <TextInput
          testID={testID}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.fgPlaceholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="px-3 py-2.5 font-body text-md text-fg-strong"
          style={multiline ? { minHeight: 72, textAlignVertical: 'top' } : null}
        />
      </View>
    </View>
  );
}
