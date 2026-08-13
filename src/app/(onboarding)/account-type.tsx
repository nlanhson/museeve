import { useRef, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  BrandBackground,
  PrimaryButton,
  Screen,
  ScreenHeader,
  ScreenHeading,
} from '@/components/ui';
import {
  useOnboardingStore,
  type AccountType,
} from '@/stores/onboarding.store';

type Card = {
  type: AccountType;
  title: string;
  intro: string;
  bullets: string[];
};

// Copy transcribed verbatim from 709:11230 / 709:11299 / 709:11379 —
// project/brief/figma-screen-inventory.md. Do not edit without the design team.
const CARDS: Card[] = [
  {
    type: 'artist',
    title: 'Artist',
    intro: 'For musicians, singers, DJs, Music Writers,...',
    bullets: [
      'As an Amateurs, Students, Teachers or professionals',
      'Share your works to build a worldwide audience',
      'Find other artists and collaborate to create music',
      'Rent equipments, Teach, Create masterclass',
      'Gain visibility in the music industry',
    ],
  },
  {
    type: 'fan',
    title: 'Fan',
    intro: 'For music lovers',
    bullets: [
      'Discover artists and stay updated on upcoming concerts, festivals,...',
      'Explore global music news in real-time, learn about diverse musical styles, and support your favorite artists',
      'Take music lessons, find teachers, attend masterclasses and rent equipments.',
    ],
  },
  {
    type: 'institution',
    title: 'Institution',
    intro: 'For businesses and organizations in the music industry.',
    bullets: [
      'Management & Production',
      'Events and Concerts',
      'Stores and Equipment',
      'Education and Training',
      'Others',
    ],
  },
];

/** Your account type 709:10967 — peeking paged carousel + Confirm. */
export default function AccountTypeScreen() {
  const router = useRouter();
  const setAccountType = useOnboardingStore((s) => s.setAccountType);
  const { width } = useWindowDimensions();
  const [page, setPage] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const CARD_W = width - 96; // neighbours peek on both edges
  const GAP = 12;
  const SIDE = (width - CARD_W) / 2;

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const p = Math.round(e.nativeEvent.contentOffset.x / (CARD_W + GAP));
    if (p !== page && p >= 0 && p < CARDS.length) setPage(p);
  };

  const confirm = () => {
    setAccountType(CARDS[page].type);
    router.push('/(onboarding)/phone');
  };

  return (
    <BrandBackground>
      {/* carousel bleeds to the screen edges, so the chassis is unpadded */}
      <Screen padded={false} bottomGap={8}>
        <View className="px-6">
          <ScreenHeader />
          <ScreenHeading title="Your account type">
            Choose your account type.{'\n'}You can switch later (30-day
            cooldown)
          </ScreenHeading>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_W + GAP}
          decelerationRate="fast"
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingHorizontal: SIDE,
            gap: GAP,
            alignItems: 'center',
          }}
          className="mt-5 flex-1"
        >
          {CARDS.map((card, i) => (
            <View
              key={card.type}
              className="overflow-hidden rounded-[20px] bg-primary-faded"
              style={{
                width: CARD_W,
                opacity: i === page ? 1 : 0.55,
                transform: [{ scale: i === page ? 1 : 0.94 }],
                borderCurve: 'continuous',
              }}
            >
              {/* Collage mosaic placeholder until the design team exports the photo sets */}
              <View className="h-56 w-full bg-elevated/40" />
              <View className="gap-2 p-4">
                <View className="flex-row items-center gap-3">
                  <Text className="font-display text-[26px] leading-[34px] text-fg-strong">
                    {card.title}
                  </Text>
                  <View className="flex-1 bg-fg-muted" style={{ height: 0.5 }} />
                  <Text className="text-sm text-fg-muted">→</Text>
                </View>
                <Text className="font-body text-sm text-fg">{card.intro}</Text>
                <View className="gap-1">
                  {card.bullets.map((b) => (
                    <View key={b} className="flex-row gap-2">
                      <Text className="font-body text-sm text-fg-muted">•</Text>
                      <Text className="flex-1 font-body text-sm text-fg-muted">
                        {b}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View className="flex-row justify-center gap-1.5 py-4">
          {CARDS.map((c, i) => (
            <View
              key={c.type}
              className={`h-2 w-2 rounded-full ${i === page ? 'bg-primary' : 'bg-elevated'}`}
            />
          ))}
        </View>

        <View className="px-6">
          <PrimaryButton label="Confirm" width="fill" onPress={confirm} />
        </View>
      </Screen>
    </BrandBackground>
  );
}
