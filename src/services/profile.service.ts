import { delay } from './mock';
import type { ProfileDraft } from '@/stores/onboarding.store';

export const profileService = {
  async submitProfile(_draft: ProfileDraft): Promise<{ ok: boolean }> {
    await delay(900);
    return { ok: true };
  },
};
