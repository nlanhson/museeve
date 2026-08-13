import { Text, View } from 'react-native';
import type { ReactNode } from 'react';

/** Brand-serif heading over grey sans subtitle (468:27887, 709:10967, …). */
export function ScreenHeading({
  title,
  children,
  align = 'center',
}: {
  title: string;
  children?: ReactNode;
  align?: 'center' | 'left';
}) {
  const centered = align === 'center';
  return (
    <View className={centered ? 'items-center gap-2' : 'items-start gap-2'}>
      <Text
        className={`font-display text-[32px] leading-[40px] text-fg-strong ${centered ? 'text-center' : ''}`}
      >
        {title}
      </Text>
      {children ? (
        <Text
          className={`font-body text-sm text-fg-muted ${centered ? 'text-center' : ''}`}
        >
          {children}
        </Text>
      ) : null}
    </View>
  );
}
