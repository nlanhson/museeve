import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BrandLockup } from '@/components/ui';
import { fonts } from '@/theme';

/** Your profile / Is ready 545:28983 — celebratory, auto-advances to Home. */
export default function ProfileReady() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const t = setTimeout(() => router.replace('/(app)/home'), 2400);
    return () => clearTimeout(t);
  }, [router]);

  return (
    <LinearGradient
      colors={['#2a0a0a', '#1c0606', '#141414']}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <View
        className="flex-1 items-center"
        style={{ paddingTop: insets.top + 48 }}
      >
        <BrandLockup />
      </View>
      <View
        className="flex-1 justify-center"
        style={{ paddingHorizontal: 40, paddingBottom: insets.bottom + 64 }}
      >
        <Text
          className="text-[44px] leading-[54px] text-fg-strong"
          style={{ fontFamily: fonts.display }}
        >
          Your profile
        </Text>
        <Text
          className="text-[44px] leading-[54px] text-fg-strong"
          style={{ fontFamily: fonts.displayItalic }}
        >
          Is ready
        </Text>
        <Text className="pt-3 font-body text-sm text-fg-muted">
          𝄞 ♪♫
        </Text>
      </View>
    </LinearGradient>
  );
}
