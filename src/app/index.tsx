import { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { BrandBackground, BrandLockup } from '@/components/ui';

/** Splash 468:29282 — hero lockup centred on the satin loop, then auth. */
export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => router.replace('/(auth)/login'), 2200);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <BrandBackground variant="splash">
      <View className="flex-1 items-center justify-center">
        <BrandLockup variant="hero" />
      </View>
    </BrandBackground>
  );
}
