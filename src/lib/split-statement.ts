import { PDFDocument } from 'pdf-lib';

export async function splitStatement(source: Uint8Array, page: number, endPage: number) {
  const booklet = await PDFDocument.load(source, { updateMetadata: false });
  if (!Number.isInteger(page) || !Number.isInteger(endPage) || page < 1 || endPage < page || endPage > booklet.getPageCount()) {
    throw new Error(`题面页码范围无效：${page}–${endPage}，题册共 ${booklet.getPageCount()} 页`);
  }
  const problem = await PDFDocument.create({ updateMetadata: false });
  const pages = await problem.copyPages(booklet, Array.from({ length: endPage - page + 1 }, (_, i) => page - 1 + i));
  for (const item of pages) problem.addPage(item);
  return problem.save();
}
