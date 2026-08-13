import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** horizontal padding on by default; hero screens opt out */
  padded?: boolean;
  /** extra space over the raw top inset (default 16) */
  topGap?: number;
  /** extra space over the raw bottom inset (default 16) */
  bottomGap?: number;
  className?: string;
};

/**
 * Full-bleed screen chassis. Every route draws edge-to-edge (headers off,
 * art under the status bar), so safe areas are applied here once instead of
 * per screen — content clears the status bar and the home indicator.
 */
export function Screen({
  children,
  padded = true,
  topGap = 16,
  bottomGap = 16,
  className = '',
}: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View
      className={`flex-1 ${padded ? 'px-6' : ''} ${className}`}
      style={{
        paddingTop: insets.top + topGap,
        paddingBottom: insets.bottom + bottomGap,
      }}
    >
      {children}
    </View>
  );
}
