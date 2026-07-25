# yt-caption-grabber

Extract YouTube video transcripts directly via player endpoints without needing developer API keys or oauth scopes.

## Features

- Fetches transcript XML data directly from public YouTube endpoints.
- Parses timeline checkpoints, matching transcripts to accurate start times and durations.
- Zero oauth configurations, quick performance.

## Installation

```bash
npm install yt-caption-grabber
```

## Usage

```typescript
import { getSubtitles } from 'yt-caption-grabber';

// Grab captions using a YouTube Video ID
try {
  const subtitles = await getSubtitles('dQw4w9WgXcQ');
  console.log(`Fetched ${subtitles.length} caption parts:`);
  console.log(subtitles[0]);
  /*
  Output:
  {
    text: 'Never gonna give you up',
    start: 0.45,
    duration: 2.1
  }
  */
} catch (error) {
  console.error('Failed to grab captions:', error);
}
```

## API Reference

### getSubtitles(videoId)

Retrieves parsed timeline-annotated subtitles for a YouTube video.

**Parameters:**
- `videoId`: `string` (e.g., `dQw4w9WgXcQ`)

**Returns:** `Promise<Array<{ text: string; start: number; duration: number }>>`

## License

MIT
