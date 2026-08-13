import { Text, View } from 'react-native';

/** `Step n/total` above an n-segment bar; active segment crimson (545:29011). */
export function StepIndicator({
  step,
  total,
}: {
  step: number;
  total: number;
}) {
  return (
    <View className="items-end gap-1">
      <Text className="font-body text-xs text-fg-muted">
        Step {step}/{total}
      </Text>
      <View className="flex-row gap-1">
        {Array.from({ length: total }, (_, i) => (
          <View
            key={i}
            className={`h-1 w-6 rounded-full ${i < step ? 'bg-primary' : 'bg-elevated'}`}
          />
        ))}
      </View>
    </View>
  );
}
