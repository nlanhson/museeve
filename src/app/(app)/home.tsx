import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LegendList } from '@legendapp/list/react-native';
import { fonts, colors } from '@/theme';

type Story = { id: string; label: string; own?: boolean };
type Post = {
  id: string;
  author: string;
  verified: boolean;
  location: string;
  track: string;
  trackMeta: string;
  caption: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
};

// Fixture content mirrors 463:16411 so the screen matches the validated design.
const STORIES: Story[] = [
  { id: 'own', label: 'Your story', own: true },
  { id: 's1', label: 'Aubrey_Wiso' },
  { id: 's2', label: 'Kathryn_Hod' },
  { id: 's3', label: 'Timmy80' },
  { id: 's4', label: 'Yvonne_Mac' },
  { id: 's5', label: 'Marc_Lveq' },
  { id: 's6', label: 'Sofia_Prz' },
];

const POSTS: Post[] = [
  {
    id: 'p1',
    author: 'Metallica',
    verified: true,
    location: 'Marseille, France',
    track: 'Enter Sandman',
    trackMeta: 'Metallica • Metal',
    caption:
      "Exploring a new interpretation of Debussy's Clair de Lune. Recording from tonight's rehearsal.",
    timestamp: '2h ago',
    likes: 39,
    comments: 39,
    shares: 39,
  },
];

function StoryAvatar({ story }: { story: Story }) {
  return (
    <View className="w-[60px] items-center gap-1">
      <View
        className={`h-[60px] w-[60px] items-center justify-center rounded-full ${story.own ? '' : 'border-md border-primary'}`}
      >
        <View className="h-[52px] w-[52px] rounded-full bg-elevated" />
        {story.own ? (
          <View className="absolute -bottom-0.5 -right-0.5 h-5 w-5 items-center justify-center rounded-full bg-fg-strong">
            <Text className="text-xs leading-[14px] text-ground">+</Text>
          </View>
        ) : null}
      </View>
      <Text
        numberOfLines={1}
        className="w-full text-center font-body text-2xs text-fg-muted"
      >
        {story.label}
      </Text>
    </View>
  );
}

function IconCount({ icon, count }: { icon: string; count: number }) {
  return (
    <Pressable accessibilityRole="button" className="flex-row items-center gap-1">
      <Text className="text-[18px] text-fg-strong">{icon}</Text>
      <Text className="font-body text-sm text-fg">{count}</Text>
    </Pressable>
  );
}

function PostCard({ post }: { post: Post }) {
  return (
    <View className="w-full">
      <View className="h-[58px] flex-row items-center gap-3 px-3">
        <View className="h-8 w-8 rounded-full border border-primary bg-elevated" />
        <View className="flex-1">
          <View className="flex-row items-center gap-1">
            <Text className="font-sans-semibold text-sm text-fg-strong">
              {post.author}
            </Text>
            {post.verified ? (
              <Text className="text-xs text-primary">✔︎</Text>
            ) : null}
          </View>
          <Text className="font-body text-xs text-fg-muted">
            {post.location}
          </Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Post options"
          hitSlop={8}
        >
          <Text className="text-md text-fg-strong">⋯</Text>
        </Pressable>
      </View>

      <View className="aspect-square w-full justify-end bg-elevated/50">
        <View
          className="m-3 flex-row items-center gap-2 rounded-full bg-ground/70 px-2 py-1.5"
          style={{ borderCurve: 'continuous' }}
        >
          <View className="h-8 w-8 rounded-full bg-primary-faded" />
          <View className="flex-1">
            <Text className="font-sans-medium text-xs text-fg-strong">
              {post.track}
            </Text>
            <Text className="font-body text-2xs text-fg-muted">
              {post.trackMeta}
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Pause"
            hitSlop={8}
          >
            <Text className="pr-1 text-md text-fg-strong">❚❚</Text>
          </Pressable>
        </View>
      </View>

      <View className="flex-row justify-center gap-1 py-2">
        <View className="h-1.5 w-[18px] rounded-full bg-primary" />
        {[1, 2, 3, 4].map((i) => (
          <View key={i} className="h-1.5 w-1.5 rounded-full bg-elevated" />
        ))}
      </View>

      <View className="flex-row items-center justify-between px-3">
        <View className="flex-row gap-4">
          <IconCount icon="♡" count={post.likes} />
          <IconCount icon="💬" count={post.comments} />
          <IconCount icon="➤" count={post.shares} />
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Support this artist"
          className="rounded-full border border-line-faded px-3 py-1"
        >
          <Text className="text-sm text-fg-strong">🫶</Text>
        </Pressable>
      </View>

      <Text className="px-3 pt-2 font-body text-sm text-fg">
        {post.caption}
      </Text>
      <Text className="px-3 pb-4 pt-1 font-body text-xs text-fg-muted">
        {post.timestamp}
      </Text>
    </View>
  );
}

/**
 * Home 463:16411. Tab icons/labels are placeholders in the design ("Tab 1-3",
 * square glyphs) — mirrored as-is until the design team names them.
 */
export default function Home() {
  const insets = useSafeAreaInsets();
  return (
    <View className="flex-1 bg-ground" style={{ paddingTop: insets.top }}>
      <View className="h-11 flex-row items-center justify-between px-3">
        <View className="h-11 w-11 items-start justify-center">
          <View className="h-6 w-6 rounded-xs border border-line-faded" />
        </View>
        <Text className="text-[20px] text-fg-strong">
          <Text style={{ fontFamily: fonts.display }}>Music </Text>
          <Text style={{ fontFamily: fonts.displayItalic }}>Everywhere</Text>
        </Text>
        <View className="h-11 w-11 items-end justify-center">
          <View className="h-6 w-6 rounded-xs border border-line-faded" />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 12, gap: 20 }}
        className="max-h-[98px] py-2"
      >
        {STORIES.map((s) => (
          <StoryAvatar key={s.id} story={s} />
        ))}
      </ScrollView>

      <LegendList
        data={POSTS}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => <PostCard post={item} />}
        estimatedItemSize={580}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      <View
        className="absolute w-full flex-row items-center justify-center gap-3 px-6"
        style={{ bottom: insets.bottom + 8 }}
      >
        <View
          className="h-[62px] flex-row items-center rounded-full bg-surface/95 px-2"
          style={{
            borderCurve: 'continuous',
            boxShadow: `0 4px 24px ${colors.primary}55`,
          }}
        >
          {['Tab 1', 'Tab 2', 'Tab 3'].map((label, i) => (
            <Pressable
              key={label}
              accessibilityRole="tab"
              accessibilityState={{ selected: i === 0 }}
              className={`h-[48px] w-[88px] items-center justify-center rounded-full ${i === 0 ? 'bg-primary-faded' : ''}`}
            >
              <View
                className={`h-4 w-4 rounded-xs ${i === 0 ? 'bg-primary-on' : 'border border-fg-muted'}`}
              />
              <Text
                className={`pt-0.5 font-body text-2xs ${i === 0 ? 'text-primary-on' : 'text-fg-muted'}`}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Search"
          className="h-[62px] w-[62px] items-center justify-center rounded-full bg-surface/95"
        >
          <Text className="text-[22px] text-fg-strong">⌕</Text>
        </Pressable>
      </View>
    </View>
  );
}
