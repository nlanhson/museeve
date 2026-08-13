import { delay } from './mock';

export type UploadedDocument = {
  id: string;
  name: string;
  sizeLabel: string;
};

export const documentsService = {
  /** Fake upload: resolves after a short "network" pause. */
  async upload(name: string): Promise<UploadedDocument> {
    await delay(1100);
    return {
      id: `${Date.now()}-${name}`,
      name,
      sizeLabel: '200 KB',
    };
  },
};
