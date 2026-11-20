import type { PageSettings } from '../types';

export const contentCss = (page: PageSettings) => {
  const sizes = { A4: ['210mm', '297mm'], A5: ['148mm', '210mm'], Letter: ['216mm', '279mm'] } as const;
  const [portraitWidth, portraitHeight] = sizes[page.size];
  const width = page.orientation === 'portrait' ? portraitWidth : portraitHeight;
  const height = page.orientation === 'portrait' ? portraitHeight : portraitWidth;
  return `
html { background:#dfe3e8; }
body { box-sizing:border-box; width:${width}; min-height:${height}; margin:18mm auto; padding:${page.marginTop}mm ${page.marginRight}mm ${page.marginBottom}mm ${page.marginLeft}mm; color:#111; background-color:#fff; font-family:"Times New Roman", Tinos, serif; font-size:14pt; line-height:1.3; box-shadow:0 2px 18px rgba(0,0,0,.18); position:relative; background-image:repeating-linear-gradient(to bottom, transparent 0, transparent calc(${height} - 1px), rgba(99,112,124,.28) calc(${height} - 1px), rgba(99,112,124,.28) ${height}); }
p { margin:0 0 6pt; } table { border-collapse:collapse; width:100%; } td, th { border:1px solid #333; padding:3pt 5pt; vertical-align:top; } table.table-no-border td, table.table-no-border th { border:0; } img { max-width:100%; height:auto; } .mce-pagebreak { border:0; border-top:2px dashed #24618d; margin:24pt 0; height:1px; } .mce-pagebreak::after { content:'NGẮT TRANG'; display:block; text-align:center; color:#24618d; font:10pt Arial,sans-serif; background:#fff; width:80pt; margin:-8pt auto 0; } .dieu { counter-increment:dieu; } .khoan { counter-increment:khoan; } .diem { counter-increment:diem; }
`;
};

export const editorConfig = (page: PageSettings, onInit: (editor: any) => void) => ({
  selector: '#document-editor',
  height: 'calc(100vh - 170px)',
  menubar: 'file edit view insert format table tools',
  language: 'vi', language_url: './tinymce/langs/vi.js',
  base_url: './tinymce', suffix: '.min', license_key: 'gpl',
  plugins: 'advlist lists table image link charmap pagebreak searchreplace code wordcount fullscreen preview autosave insertdatetime visualblocks nonbreaking anchor directionality',
  toolbar_mode: 'wrap',
  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | outdent indent textindent | lineheight | numlist bullist legalnumbering | table image link charmap pagebreak | searchreplace code preview fullscreen | pagebackground watermark pageoptions templates | copyhtml htmlsource',
  font_family_formats: 'Times New Roman=times new roman,times,serif; Arial=arial,helvetica,sans-serif; Tahoma=tahoma,arial,sans-serif; Calibri=calibri,sans-serif; Cambria=cambria,georgia,serif; Courier New=courier new,courier,monospace',
  font_size_formats: '8pt 9pt 10pt 11pt 12pt 13pt 14pt 16pt 18pt 20pt 24pt 28pt 32pt 36pt',
  line_height_formats: '1 1.15 1.3 1.5 2',
  content_style: contentCss(page),
  content_css: false, body_class: 'legal-document',
  paste_data_images: true, automatic_uploads: false, image_advtab: true,
  table_default_attributes: { class: 'table-bordered' },
  table_class_list: [{ title: 'Có viền', value: 'table-bordered' }, { title: 'Không viền', value: 'table-no-border' }],
  table_cell_class_list: [{ title: 'Mặc định', value: '' }, { title: 'Không viền', value: 'cell-no-border' }],
  formats: { textIndent: { block: 'p', styles: { 'text-indent': '1.27cm' } }, noTextIndent: { block: 'p', styles: { 'text-indent': '0' } } },
  extended_valid_elements: 'p[style|class],span[style|class],table[style|class],thead,tbody,tfoot,tr,td[style|class|colspan|rowspan],th[style|class|colspan|rowspan],div[style|class],img[src|alt|width|height|style|class]',
  valid_styles: { '*': 'text-align,text-indent,line-height,margin,margin-top,margin-right,margin-bottom,margin-left,padding,color,background,background-color,font-family,font-size,font-weight,font-style,text-decoration,vertical-align,width,height,display,opacity,transform' },
  paste_preprocess: (_plugin: any, args: any) => { args.content = cleanWordHtml(args.content); },
  paste_postprocess: (_plugin: any, args: any) => { args.node.querySelectorAll?.('[class^="Mso"],[class*=" Mso"]').forEach((el: Element) => el.removeAttribute('class')); },
  setup: (editor: any) => { editor.on('init', () => onInit(editor)); },
});

export function cleanWordHtml(html: string) {
  return html.replace(/<!--[\s\S]*?-->/g, '').replace(/<xml[\s\S]*?<\/xml>/gi, '').replace(/<\/?o:p\s*\/?>/gi, '').replace(/\s+mso-[^:]+:[^;"']+;?/gi, '').replace(/\s+class="[^"]*Mso[^"]*"/gi, '');
}
