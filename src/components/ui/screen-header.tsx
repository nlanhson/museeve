import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StepIndicator } from './step-indicator';

/** Back arrow left, optional step cluster right (545:29011 header row). */
export function ScreenHeader({
  step,
  total,
  onBack,
}: {
  step?: number;
  total?: number;
  onBack?: () => void;
}) {
  const { back, canGoBack } = useRouter();
  const showBack = onBack !== undefined || canGoBack();
  return (
    <View className="h-12 flex-row items-center justify-between">
      {showBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={12}
          onPress={onBack ?? back}
          className="h-11 w-11 items-start justify-center"
        >
          {({ pressed }) => (
            <Text
              className="text-[24px] text-fg-strong"
              style={{ opacity: pressed ? 0.6 : 1 }}
            >
              ←
            </Text>
          )}
        </Pressable>
      ) : (
        <View className="h-11 w-11" />
      )}
      {step !== undefined && total !== undefined ? (
        <StepIndicator step={step} total={total} />
      ) : null}
    </View>
  );
}
