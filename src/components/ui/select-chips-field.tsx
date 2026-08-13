import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { colors } from '@/theme';

type Props = {
  label: string;
  required?: boolean;
  placeholder: string;
  options: readonly string[];
  value: string[];
  onChange: (v: string[]) => void;
  /** single-select renders plain text instead of chips (Your level, Type of Institution) */
  multi?: boolean;
};

/**
 * Underline chassis with trailing chevron; filled state renders removable
 * chips inside the row (720:19771). Picker opens as a native form sheet.
 */
export function SelectChipsField({
  label,
  required = false,
  placeholder,
  options,
  value,
  onChange,
  multi = true,
}: Props) {
  const [open, setOpen] = useState(false);

  const toggle = (opt: string) => {
    if (!multi) {
      onChange([opt]);
      setOpen(false);
      return;
    }
    onChange(
      value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt],
    );
  };

  return (
    <View className="w-full gap-1">
      <Text className="font-sans-medium text-sm text-fg">
        {label}
        {required ? <Text className="text-danger"> *</Text> : null}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}. ${value.length ? value.join(', ') : placeholder}`}
        onPress={() => setOpen(true)}
        className="w-full flex-row items-center justify-between border-b border-line-faded px-3 py-2.5"
      >
        {value.length === 0 ? (
          <Text className="font-body text-md text-fg-placeholder">
            {placeholder}
          </Text>
        ) : multi ? (
          <View className="flex-1 flex-row flex-wrap gap-1.5">
            {value.map((v) => (
              <Pressable
                key={v}
                accessibilityRole="button"
                accessibilityLabel={`Remove ${v}`}
                onPress={() => onChange(value.filter((x) => x !== v))}
                className="flex-row items-center gap-1 rounded-full bg-elevated/60 px-2.5 py-0.5"
              >
                <Text className="font-body text-sm text-fg-strong">{v}</Text>
                <Text className="text-xs text-fg-muted">✕</Text>
              </Pressable>
            ))}
          </View>
        ) : (
          <Text className="font-body text-md text-fg-strong">{value[0]}</Text>
        )}
        <Text className="text-xs text-fg-muted">▾</Text>
      </Pressable>

      <Modal
        visible={open}
        animationType="slide"
        presentationStyle="formSheet"
        onRequestClose={() => setOpen(false)}
      >
        <View className="flex-1 bg-surface px-5 pt-5">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="font-sans-semibold text-md text-fg-strong">
              {label}
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => setOpen(false)}
              hitSlop={12}
            >
              <Text className="font-sans-semibold text-md text-primary">
                Done
              </Text>
            </Pressable>
          </View>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View className="gap-0.5 pb-8">
              {options.map((opt) => {
                const selected = value.includes(opt);
                return (
                  <Pressable
                    key={opt}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: selected }}
                    onPress={() => toggle(opt)}
                    className="flex-row items-center justify-between rounded-md px-3 py-3"
                    style={
                      selected ? { backgroundColor: colors.primaryFaded } : null
                    }
                  >
                    <Text className="font-body text-md text-fg">{opt}</Text>
                    {selected ? (
                      <Text className="text-md text-primary">✓</Text>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
