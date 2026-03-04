export async function readToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export async function fetchToDataURL(url?: string) {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) return null;
  } catch {
    return null;
  }

  const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) return null;

  const arr = await res.arrayBuffer();
  if (arr.byteLength > 10 * 1024 * 1024) return null;

  const base64 = Buffer.from(arr).toString('base64');

  return `data:${res.headers.get('content-type')};base64,${base64}`;
}
