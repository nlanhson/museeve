import { create } from 'zustand';
import type { UploadedDocument } from '@/services/documents.service';

export type AccountType = 'artist' | 'fan' | 'institution';

export type ProfileDraft = {
  avatarUri: string | null;
  userName: string;
  professions: string[]; // artist only, required
  genres: string[];
  level: string[]; // artist only, single
  areas: string[];
  bio: string;
  honorAccepted: boolean; // artist only, gates the CTA
  // institution
  organizationName: string;
  institutionType: string[];
  websiteLink: string;
};

const emptyDraft: ProfileDraft = {
  avatarUri: null,
  userName: '',
  professions: [],
  genres: [],
  level: [],
  areas: [],
  bio: '',
  honorAccepted: false,
  organizationName: '',
  institutionType: [],
  websiteLink: '',
};

type OnboardingState = {
  email: string;
  accountType: AccountType | null;
  phone: string;
  draft: ProfileDraft;
  documents: UploadedDocument[];
  stripeEmail: string | null;
  setEmail: (email: string) => void;
  setAccountType: (t: AccountType) => void;
  setPhone: (phone: string) => void;
  patchDraft: (patch: Partial<ProfileDraft>) => void;
  addDocument: (doc: UploadedDocument) => void;
  setStripeEmail: (email: string) => void;
  reset: () => void;
};

export const useOnboardingStore = create<OnboardingState>()((set) => ({
  email: '',
  accountType: null,
  phone: '',
  draft: emptyDraft,
  documents: [],
  stripeEmail: null,
  setEmail: (email) => set({ email }),
  setAccountType: (accountType) => set({ accountType }),
  setPhone: (phone) => set({ phone }),
  patchDraft: (patch) =>
    set((state) => ({ draft: { ...state.draft, ...patch } })),
  addDocument: (doc) =>
    set((state) => ({ documents: [...state.documents, doc] })),
  setStripeEmail: (stripeEmail) => set({ stripeEmail }),
  reset: () =>
    set({
      email: '',
      accountType: null,
      phone: '',
      draft: emptyDraft,
      documents: [],
      stripeEmail: null,
    }),
}));
