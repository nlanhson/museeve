import { Image } from 'expo-image';

const lockupHero = require('@/assets/images/brand-lockup.svg');
const lockupCompact = require('@/assets/images/brand-lockup-login.svg');

type Props = { variant?: 'hero' | 'compact' };

/** Monogram + Music / Everywhere. Hero: splash 468:29282 (210×225). Compact: login 468:27840 (116×124). */
export function BrandLockup({ variant = 'compact' }: Props) {
  if (variant === 'hero') {
    return (
      <Image
        source={lockupHero}
        style={{ width: 210.733, height: 225 }}
        contentFit="contain"
      />
    );
  }
  return (
    <Image
      source={lockupCompact}
      style={{ width: 116.137, height: 124 }}
      contentFit="contain"
    />
  );
}
