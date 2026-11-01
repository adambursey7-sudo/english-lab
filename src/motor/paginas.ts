// Regla @page del PDF: cabecera con la academia y el título, pie con «Page N of M». Chrome la aplica al imprimir y al
// guardar en PDF (los márgenes con contenido necesitan Chrome o Edge recientes; si no, el PDF sale igual, sin ellos).

/** Texto seguro para dentro de un string CSS entre comillas dobles. */
export function cssTexto(t: string): string {
  return t.slice(0, 120).replace(/[\\"]/g, '\\$&').replace(/[\r\n]+/g, ' ');
}

export function reglaPagina(academia: string, titulo: string): string {
  const gris = 'font: 8.5pt Arial, Helvetica, sans-serif; color: #555;';
  return `@page { size: A4; margin: 18mm 15mm 18mm;
  @top-left { content: "${cssTexto(academia)}"; ${gris} }
  @top-right { content: "${cssTexto(titulo)}"; ${gris} }
  @bottom-center { content: "Page " counter(page) " of " counter(pages); ${gris} }
}
@page :first { @top-left { content: none; } @top-right { content: none; } }`;
}
