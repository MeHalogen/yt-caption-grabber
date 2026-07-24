export async function getCaptions(videoId: string): Promise<Array<{ text: string; start: number; duration: number }>> {
  if (!videoId) throw new Error('Video ID is required');
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const html = await res.text();
  const match = html.match(/"captionTracks":\s*(\[.*?\])/);
  if (!match) throw new Error('No captions found');
  const tracks = JSON.parse(match[1]);
  const defaultTrack = tracks.find((t: any) => t.languageCode === 'en' || t.isTranslatable === true) || tracks[0];
  if (!defaultTrack || !defaultTrack.baseUrl) throw new Error('No English or default caption track found');

  const captionRes = await fetch(defaultTrack.baseUrl);
  const captionXml = await captionRes.text();
  
  const matches = [...captionXml.matchAll(/<text start="([\d.]+)" dur="([\d.]+)"[^>]*>([^<]*)<\/text>/g)];
  return matches.map(m => ({
    start: parseFloat(m[1]),
    duration: parseFloat(m[2]),
    text: m[3]
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
  }));
}