import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

/** Server-only keys for inputs that Astro's module graph cannot track. */
export function buildCacheKey(value: unknown): string {
  return createHash('sha256').update(JSON.stringify(value)).digest('hex');
}

// Scope this reader to one getStaticPaths invocation, so dev rebuilds see edits.
export function createFileDigestReader() {
  const pending = new Map<string, Promise<string>>();
  return (path: string): Promise<string> => {
    let digest = pending.get(path);
    if (!digest) {
      digest = readFile(path).then(bytes => createHash('sha256').update(bytes).digest('hex'));
      pending.set(path, digest);
    }
    return digest;
  };
}
