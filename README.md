WMS Apex Enterprise adalah aplikasi Warehouse Management System (WMS) 
modern berbasis web yang dirancang untuk efisiensi tinggi dalam 
manajemen persediaan barang, pelacakan mutasi stok (Inbound/Outbound), 
Stock Opname, serta cetak label otomatis (Barcode/QR Code).

Dibuat dengan standar antarmuka Minimalist Monochrome 2026, aplikasi 
ini mendukung penuh mode Dark/Light Theme yang responsif untuk 
perangkat desktop maupun ponsel.

-------------------------------------------------------------------
🔑 AKUN DEMO / KREDENSIAL
-------------------------------------------------------------------

Gunakan kredensial demo di bawah ini untuk mengakses dashboard 
aplikasi secara langsung tanpa perlu registrasi ulang:

1. ROLE: ADMIN / MANAGER
   - Email    : admin@wms-apex.com
   - Password : admin123
   - Akses    : Full Access (User Control, Opname, Master Data, Audit Logs)

2. ROLE: STAFF GUDANG
   - Email    : staff@wms-apex.com
   - Password : staff123
   - Akses    : Inbound, Outbound, Inventory Viewer, Catalog

3. ROLE: MANAGER GUDANG
   - Email    : manager@wms.com
   - Password : manager123
   - Akses    : View All, Laporan, Kelola Katalog & Supplier

-------------------------------------------------------------------
🛠️ TECH STACK
-------------------------------------------------------------------

- Framework        : Next.js 16 (App Router & Server Actions)
- Styling          : Tailwind CSS v4
- Database & Auth  : Supabase Cloud (PostgreSQL + SSR Auth)
- Icons & UI       : Lucide React, Tailwind UI Component Standards
- Theme System     : next-themes (Dark Mode / Light Mode)
- Deployment       : Vercel Cloud Platform

-------------------------------------------------------------------
✨ FITUR-FITUR UTAMA
-------------------------------------------------------------------

1. Executive Dashboard & Realtime Analytics
   - Card meringkas Total SKU Catalog, Kuantitas Stok, Warning Stok Kritis, 
     dan Aktivitas Mutasi Terakhir.
   - Peringatan otomatis (Alert) untuk barang yang menyentuh Minimum Stock.

2. Katalog Produk & Cetak Label QR/Barcode
   - Manajemen Master Data Produk (SKU, Nama, HPP, Harga Jual, Lokasi Rak).
   - Modal Dialog Cetak Label Stiker Thermal (ukuran stiker rak/kardus) 
     dilengkapi QR Code SKU otomatis via QuickChart API.

3. Stock Control (Inbound & Outbound)
   - Inbound (Stock In): Form barang masuk dari supplier/vendor dengan 
     pencatatan otomatis ke stok utama.
   - Outbound (Stock Out): Form barang keluar untuk pengiriman/penjualan 
     dengan validasi batas stok.

4. Physical Stock Opname & Penyesuaian
   - Fitur verifikasi fisik barang vs data sistem.
   - Pencatatan selisih barang (rusak/kadaluarsa) dan kalkulasi otomatis 
     ke Audit Log Transaction.

5. Audit Log Transaksi & Ekspor Laporan
   - Catatan histori mutasi barang secara immutable.
   - Export Buttons: Dukungan ekspor laporan ke format .CSV dan fitur Cetak.

6. Search Bar Realtime & Mobile Drawer
   - Global Search (Cmd + K): Pencatatan kata kunci di URL query state 
     (?search=...) untuk filter langsung berdasarkan SKU, Nama, atau Rak.
   - Responsive Layout: Sidebar fixed di desktop dan berubah menjadi 
     Slide-in Drawer dengan overlay gelap pada layar HP/Tablet.

-------------------------------------------------------------------
🚀 CARA MENJALANKAN SECARA LOKAL (LOCAL SETUP)
-------------------------------------------------------------------

1. Clone Repository:
   git clone https://github.com/USERNAME/wms-apex-enterprise.git
   cd wms-apex-enterprise

2. Install Dependencies:
   npm install

3. Set Environment Variables (.env.local):
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

4. Jalankan Development Server:
   npm run dev

   Buka http://localhost:3000 di browser.

-------------------------------------------------------------------
Dikelola dan Dikembangkan oleh Ardhiffa Mada Perdana — Full-Stack Developer
===================================================================
