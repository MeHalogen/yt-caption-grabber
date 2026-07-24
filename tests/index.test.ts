import { describe, it, expect } from 'vitest';
import { getCaptions } from '../src/index.js';

describe('yt-caption-grabber', () => {
  it('should validate video id parameter check', async () => {
    await expect(getCaptions('')).rejects.toThrow('Video ID is required');
  });
});