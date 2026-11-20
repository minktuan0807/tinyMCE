# Văn bản Việt

Trình soạn thảo văn bản hành chính tĩnh, tối ưu cho thể thức Nghị định 30/2020/NĐ-CP. Ứng dụng dùng Vite + TypeScript + TinyMCE 8 GPL tự host, không cần backend hay API key.

## Chạy local

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm run preview
```

`dist/` là artifact có thể deploy trực tiếp. `vite.config.mjs` đặt `base: './'`, TinyMCE dùng `base_url: './tinymce'`, nên các asset hoạt động khi site được đặt dưới `https://user.github.io/repo/`.

## GitHub Pages

Workflow `.github/workflows/deploy.yml` dùng Node 20, `npm ci`, `npm run build`, upload `dist` và deploy bằng GitHub Pages. Trong Settings → Pages, chọn Source: GitHub Actions.

## Cấu trúc

- `src/editor/`: cấu hình TinyMCE và thiết lập trang.
- `src/export/`: DOMPurify, juice và tạo HTML đầy đủ.
- `src/templates/`: mỗi mẫu là một file HTML độc lập, thêm mẫu mới bằng cách thêm file và đăng ký import trong `src/main.ts`.
- `src/styles/`: giao diện ứng dụng, trang giấy và in.
- `public/tinymce/`: được tạo bởi `npm run copy-tinymce`, gồm runtime, skin, icon, theme, model, plugin và `langs/vi.js`.
- `public/fonts/`: Tinos local, dùng cùng stack với Times New Roman.

## Tính năng

Có menubar/toolbar kiểu Word, bảng có lựa chọn không viền, ảnh từ URL hoặc data URL, dán Word được lọc `mso-*`/`Mso*`/`xml`/`o:p`, page break Ctrl+Enter, tìm và thay thế, thiết lập trang, nền trang, hình mờ, mẫu Quyết định/Công văn/Tờ trình/Biên bản/Hợp đồng, autosave localStorage, nhập HTML, tải HTML, ba kiểu copy HTML, mã nguồn HTML và in qua iframe ẩn.

## Ghi chú giới hạn

- Đường nền lặp mỗi 297mm trong editor chỉ là gợi ý trực quan, không phải phân trang thật như Microsoft Word. In/export dùng `page-break-after: always` cho page break cứng.
- TinyMCE miễn phí không có Export to Word/PowerPaste/Page Embed. Dán Word được xử lý bằng `paste_preprocess`/`paste_postprocess`; một số định dạng Word đặc thù có thể cần chỉnh tay.
- Package `juice` được khai báo để đáp ứng pipeline inline CSS, nhưng bản browser của package phụ thuộc CommonJS/Node và không chạy ổn định trong Vite static runtime hiện tại. Nút inline-style dùng fallback DOM/CSS local, chỉ xử lý các selector đơn giản; nếu cần email/CMS phức tạp nên chạy Juice ở build/server side.
- Đánh số Điều/Khoản/Điểm là nút chèn class nền tảng để người dùng tiếp tục nhập nội dung. CSS counter nâng cao chưa tự sinh lại toàn bộ nhãn trong mọi cấu trúc danh sách.
- Nền/hình mờ dùng URL hoặc data URL. Không có server upload; ảnh dán từ clipboard được giữ bằng `paste_data_images`.

## License

TinyMCE được khởi tạo với `license_key: 'gpl'`. Hãy kiểm tra yêu cầu GPL của TinyMCE và các package khi phân phối sản phẩm của bạn.
