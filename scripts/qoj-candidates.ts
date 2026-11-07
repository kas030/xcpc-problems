import { load } from 'cheerio';

export function extractQojCandidates(html: string, source: URL) {
  const $ = load(html);
  const candidates = new Map<number, { qojId: number; title: string; label?: string }>();
  $('a[href]').each((_, link) => {
    const url = new URL($(link).attr('href')!, source);
    if (url.origin !== source.origin) return;
    const match = url.pathname.match(/^(?:\/contest\/\d+)?\/problem\/(\d+)\/?$/);
    if (!match) return;
    const title = $(link).text().replace(/\s+/g, ' ').trim();
    if (!title || /^\d+$/.test(title)) return;
    const firstCell = $(link).closest('tr').find('td').first().text().trim();
    const label = /^[A-Z][0-9]?$/.test(firstCell) ? firstCell : undefined;
    candidates.set(Number(match[1]), { qojId: Number(match[1]), title, ...(label ? { label } : {}) });
  });
  return [...candidates.values()];
}
