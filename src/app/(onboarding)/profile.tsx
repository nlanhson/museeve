import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  AvatarPicker,
  PrimaryButton,
  ScreenHeader,
  ScreenHeading,
  SelectChipsField,
  UnderlineField,
} from '@/components/ui';
import { profileService } from '@/services/profile.service';
import { useOnboardingStore } from '@/stores/onboarding.store';

const GENRES = [
  'Classical',
  'Pop',
  'Rock',
  'Jazz',
  'Metal',
  'Hip-hop',
  'Electronic',
  'Folk',
] as const;
const AREAS = [
  'Western Europe',
  'Southeast Asia',
  'North America',
  'South America',
  'Africa',
  'Oceania',
] as const;
const PROFESSIONS = [
  'Guitarist',
  'Vocalist',
  'Drummer',
  'Pianist',
  'DJ',
  'Composer',
  'Teacher',
  'Producer',
] as const;
const LEVELS = ['Amateur', 'Student', 'Professional', 'Teacher'] as const;
const INSTITUTION_TYPES = [
  'Management & Production',
  'Event Organizer',
  'Stores and Equipment',
  'Education and Training',
  'Others',
] as const;

/**
 * One route, three variants (figma-screen-inventory.md):
 * Fan 720:19575 · Artist 720:20210 (adds profession/level/honor) ·
 * Institution 545:33033 (org fields, Continue → documents).
 */
export default function ProfileSetup() {
  const router = useRouter();
  const accountType = useOnboardingStore((s) => s.accountType);
  const draft = useOnboardingStore((s) => s.draft);
  const patchDraft = useOnboardingStore((s) => s.patchDraft);
  const [busy, setBusy] = useState(false);

  const isArtist = accountType === 'artist';
  const isInstitution = accountType === 'institution';

  const valid = isInstitution
    ? draft.organizationName.trim() !== '' &&
      draft.institutionType.length > 0 &&
      draft.areas.length > 0
    : isArtist
      ? draft.userName.trim() !== '' &&
        draft.professions.length > 0 &&
        draft.honorAccepted
      : draft.userName.trim() !== '';

  const insets = useSafeAreaInsets();

  const submit = async () => {
    if (!valid || busy) return;
    setBusy(true);
    await profileService.submitProfile(draft);
    setBusy(false);
    router.push(isInstitution ? '/(onboarding)/documents' : '/(onboarding)/ready');
  };

  return (
    <View className="flex-1 bg-ground">
      <ScrollView
        contentInsetAdjustmentBehavior="never"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: insets.top + 16,
          paddingBottom: insets.bottom + 24,
        }}
      >
        <View className="gap-6">
          <ScreenHeader
            step={isInstitution ? 2 : 2}
            total={isInstitution ? 3 : 2}
          />
          <ScreenHeading
            title={
              accountType === 'fan' ? 'Create your profile' : 'Setup your profile'
            }
            align="left"
          />
          <AvatarPicker
            uri={draft.avatarUri}
            onPicked={(uri) => patchDraft({ avatarUri: uri })}
          />

          {isInstitution ? (
            <>
              <UnderlineField
                label="Organization name"
                required
                value={draft.organizationName}
                onChangeText={(v) => patchDraft({ organizationName: v })}
                placeholder="Enter your organization name"
                autoCapitalize="words"
              />
              <SelectChipsField
                label="Type of Institution"
                required
                placeholder="Select type of institution"
                options={INSTITUTION_TYPES}
                value={draft.institutionType}
                onChange={(v) => patchDraft({ institutionType: v })}
                multi={false}
              />
              <SelectChipsField
                label="Your area"
                required
                placeholder="Select your area"
                options={AREAS}
                value={draft.areas}
                onChange={(v) => patchDraft({ areas: v })}
              />
              <UnderlineField
                label="Your website link"
                value={draft.websiteLink}
                onChangeText={(v) => patchDraft({ websiteLink: v })}
                placeholder="Enter your website link"
                keyboardType="url"
              />
            </>
          ) : (
            <>
              <UnderlineField
                label="User name"
                required
                value={draft.userName}
                onChangeText={(v) => patchDraft({ userName: v })}
                placeholder="Enter user name"
                autoCapitalize="words"
              />
              {isArtist ? (
                <SelectChipsField
                  label="Your profession"
                  required
                  placeholder="Select"
                  options={PROFESSIONS}
                  value={draft.professions}
                  onChange={(v) => patchDraft({ professions: v })}
                />
              ) : null}
              <SelectChipsField
                label={isArtist ? 'Your genres' : 'Your favourite genres'}
                placeholder="Select"
                options={GENRES}
                value={draft.genres}
                onChange={(v) => patchDraft({ genres: v })}
              />
              {isArtist ? (
                <SelectChipsField
                  label="Your level"
                  placeholder="Select"
                  options={LEVELS}
                  value={draft.level}
                  onChange={(v) => patchDraft({ level: v })}
                  multi={false}
                />
              ) : null}
              <SelectChipsField
                label={isArtist ? 'Your area' : 'Your interested areas'}
                placeholder="Select"
                options={AREAS}
                value={draft.areas}
                onChange={(v) => patchDraft({ areas: v })}
              />
              <UnderlineField
                label="Bio"
                value={draft.bio}
                onChangeText={(v) => patchDraft({ bio: v })}
                placeholder="Describe about yourself"
                autoCapitalize="sentences"
                multiline
              />
              {isArtist ? (
                <Pressable
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: draft.honorAccepted }}
                  onPress={() =>
                    patchDraft({ honorAccepted: !draft.honorAccepted })
                  }
                  className="flex-row gap-3"
                >
                  <View
                    className={`mt-0.5 h-5 w-5 items-center justify-center rounded-xs border ${draft.honorAccepted ? 'border-primary bg-primary' : 'border-line-faded'}`}
                  >
                    {draft.honorAccepted ? (
                      <Text className="text-xs text-fg-strong">✓</Text>
                    ) : null}
                  </View>
                  <View className="flex-1 gap-1">
                    <Text className="font-body text-sm italic text-fg">
                      I declare, on my honor, that:
                    </Text>
                    {[
                      'I am an artist or actively involved in music.',
                      'The information provided in my profile is accurate and truthful.',
                      'I understand that providing false information may result in account restrictions or removal.',
                    ].map((line) => (
                      <View key={line} className="flex-row gap-2">
                        <Text className="font-body text-sm text-fg-muted">
                          •
                        </Text>
                        <Text className="flex-1 font-body text-sm text-fg-muted">
                          {line}
                        </Text>
                      </View>
                    ))}
                  </View>
                </Pressable>
              ) : null}
            </>
          )}

          <View className="pt-2">
            <PrimaryButton
              label={isInstitution ? 'Continue' : 'Explore now'}
              width={isInstitution ? 'fill' : 'hug'}
              disabled={!valid || busy}
              onPress={submit}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
