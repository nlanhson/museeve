import { Pressable, View } from 'react-native';
import { Image } from 'expo-image';
import { socialButtonFill } from '@/theme';

const icons = {
  google: require('@/assets/images/social-google.svg'),
  apple: require('@/assets/images/social-apple.svg'),
  facebook: require('@/assets/images/social-fb-1.svg'),
} as const;

type Provider = keyof typeof icons;

/** Circular translucent social auth button, Login 468:27868/27874/27876. */
export function SocialButton({
  provider,
  onPress,
}: {
  provider: Provider;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Continue with ${provider}`}
      onPress={onPress}
    >
      {({ pressed }) => (
        <View
          className="h-16 w-16 items-center justify-center rounded-full"
          style={{
            backgroundColor: socialButtonFill,
            opacity: pressed ? 0.7 : 1,
          }}
        >
          <Image
            source={icons[provider]}
            style={{ width: 32, height: 32 }}
            contentFit="contain"
          />
        </View>
      )}
    </Pressable>
  );
}
