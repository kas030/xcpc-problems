export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const href = (path = '') => `${base}/${path.replace(/^\/+|\/+$/g, '')}${path ? '/' : ''}`;
export const problemHref = (id: string) => href(`problems/${id}`);
