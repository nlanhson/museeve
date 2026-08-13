import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

/** `Didn't receive?` + crimson countdown → tappable Resend (468:27887, 54s). */
export function ResendRow({ onResend }: { onResend: () => void }) {
  const [secondsLeft, setSecondsLeft] = useState(54);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  const counting = secondsLeft > 0;
  return (
    <View className="flex-row items-center gap-1">
      <Text className="font-body text-sm text-fg-muted">
        Didn&apos;t receive?
      </Text>
      <Pressable
        accessibilityRole="button"
        disabled={counting}
        onPress={() => {
          onResend();
          setSecondsLeft(54);
        }}
      >
        <Text className="font-sans-semibold text-sm text-primary">
          {counting ? `Resend in ${secondsLeft}s` : 'Resend'}
        </Text>
      </Pressable>
    </View>
  );
}
