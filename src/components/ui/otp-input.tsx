import { useEffect, useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { colors } from '@/theme';

type Props = {
  length?: number;
  value: string;
  onChange: (code: string) => void;
  onComplete?: (code: string) => void;
};

/**
 * 6 rounded cells (~48px, radius 14, dark fill); the active cell shows a
 * blinking caret. Nodes 468:27887 / 720:19453. One hidden input drives it so
 * the whole row is a single focus target for screen readers.
 */
export function OtpInput({ length = 6, value, onChange, onComplete }: Props) {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const [caretOn, setCaretOn] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setCaretOn((c) => !c), 530);
    return () => clearInterval(t);
  }, []);

  const handleChange = (raw: string) => {
    const code = raw.replace(/\D/g, '').slice(0, length);
    onChange(code);
    if (code.length === length) onComplete?.(code);
  };

  const activeIndex = Math.min(value.length, length - 1);

  return (
    <Pressable
      accessibilityLabel={`One-time code, ${length} digits`}
      onPress={() => inputRef.current?.focus()}
      className="w-full flex-row justify-between"
    >
      {Array.from({ length }, (_, i) => {
        const digit = value[i] ?? '';
        const active = focused && i === activeIndex && value.length < length;
        return (
          <View
            key={i}
            className="h-12 w-12 items-center justify-center rounded-lg bg-primary-faded/80"
            style={{
              borderCurve: 'continuous',
              borderWidth: 1,
              borderColor: active ? colors.fgMuted : colors.line,
            }}
          >
            {digit !== '' ? (
              <Text className="font-sans-medium text-[24px] leading-[32px] text-fg-strong">
                {digit}
              </Text>
            ) : active && caretOn ? (
              <View className="h-6 w-[2px] bg-fg-strong" />
            ) : null}
          </View>
        );
      })}
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        maxLength={length}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="absolute h-px w-px opacity-0"
      />
    </Pressable>
  );
}
