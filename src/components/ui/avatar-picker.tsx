import { Pressable, Text, View } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * Circular avatar with camera badge (720:19575). Placeholder is the design's
 * red/orange striated artwork, approximated as a gradient until the asset ships.
 */
export function AvatarPicker({
  uri,
  onPicked,
}: {
  uri: string | null;
  onPicked: (uri: string) => void;
}) {
  const pick = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    const asset = res.assets?.[0];
    if (asset) onPicked(asset.uri);
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Choose profile photo"
      onPress={pick}
      className="self-center"
    >
      <View className="h-24 w-24 overflow-hidden rounded-full">
        {uri ? (
          <Image source={{ uri }} style={{ flex: 1 }} contentFit="cover" />
        ) : (
          <LinearGradient
            colors={['#d94f30', '#8b1c1c', '#5a0f0f']}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={{ flex: 1 }}
          />
        )}
      </View>
      <View className="absolute -bottom-0.5 -right-0.5 h-8 w-8 items-center justify-center rounded-full bg-elevated/90">
        <Text className="text-sm">📷</Text>
      </View>
    </Pressable>
  );
}
