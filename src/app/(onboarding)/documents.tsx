import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import {
  PrimaryButton,
  Screen,
  ScreenHeader,
  ScreenHeading,
} from '@/components/ui';
import { documentsService } from '@/services/documents.service';
import { useOnboardingStore } from '@/stores/onboarding.store';

/**
 * Upload supporting documents — idle 550:37118, source picker 720:21640
 * (a centred light modal card, not a bottom sheet), uploaded list 621:12857.
 */
export default function Documents() {
  const router = useRouter();
  const documents = useOnboardingStore((s) => s.documents);
  const addDocument = useOnboardingStore((s) => s.addDocument);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const pickFrom = async (_source: 'files' | 'drive') => {
    setPickerOpen(false);
    const res = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*'],
    });
    const asset = res.assets?.[0];
    if (!asset) return;
    setUploading(true);
    const doc = await documentsService.upload(asset.name);
    addDocument(doc);
    setUploading(false);
  };

  const count = documents.length;

  return (
    <View className="flex-1 bg-ground">
      <Screen className="justify-between">
        <View className="gap-6">
          <ScreenHeader step={3} total={3} />
          <ScreenHeading title="Upload supporting documents" align="left" />
          <Text className="-mt-2 font-body text-sm italic text-fg-muted">
            Please provide any documents that can justify your legal status or
            activity.
          </Text>
          <View className="flex-row items-center gap-1.5">
            <Text className="font-sans-semibold text-sm text-primary">
              Learn more
            </Text>
            <Text className="text-sm text-fg-muted">ⓘ</Text>
          </View>

          <View
            className="gap-3 rounded-lg bg-surface p-4"
            style={{ borderCurve: 'continuous' }}
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <Text className="text-[22px]">🗎</Text>
                <Text className="font-body text-sm italic text-fg-muted">
                  {uploading
                    ? 'Uploading…'
                    : count === 0
                      ? 'No file uploaded'
                      : `${count} file${count > 1 ? 's' : ''} uploaded`}
                </Text>
              </View>
              <Pressable
                accessibilityRole="button"
                disabled={uploading}
                onPress={() => setPickerOpen(true)}
                hitSlop={8}
              >
                <Text className="font-sans-semibold text-sm text-primary">
                  Upload
                </Text>
              </Pressable>
            </View>
            {documents.map((doc) => (
              <View
                key={doc.id}
                className="flex-row items-center gap-3 border-t border-line pt-3"
              >
                <Text className="text-[20px]">🗎</Text>
                <View className="flex-1">
                  <Text className="font-body text-sm text-fg-strong">
                    {doc.name}
                  </Text>
                  <Text className="font-body text-xs text-fg-muted">
                    <Text className="text-success">✓ Uploaded</Text> •{' '}
                    {doc.sizeLabel}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {count > 0 ? (
          <PrimaryButton
            label="Continue to Verify"
            width="fill"
            onPress={() => router.push('/(onboarding)/stripe')}
          />
        ) : null}
      </Screen>

      <Modal
        visible={pickerOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setPickerOpen(false)}
      >
        <Pressable
          className="flex-1 items-center justify-center px-8"
          onPress={() => setPickerOpen(false)}
        >
          <Pressable
            className="w-full gap-3 rounded-[20px] bg-[#e8e6e4] p-5"
            style={{ borderCurve: 'continuous' }}
            onPress={() => {}}
          >
            <Text className="text-center font-sans-medium text-md text-fg-reverse">
              How would you like to upload?
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => pickFrom('files')}
              className="items-center rounded-lg bg-[#d8d5d2] py-3"
            >
              <Text className="font-sans-medium text-md text-fg-reverse">
                Choose from Files
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              onPress={() => pickFrom('drive')}
              className="items-center rounded-lg bg-[#d8d5d2] py-3"
            >
              <Text className="font-sans-medium text-md text-fg-reverse">
                Choose from Drive
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
