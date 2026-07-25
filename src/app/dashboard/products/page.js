import { createClient } from "@/lib/supabase/server";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import AddProductDialog from "./AddProductDialog";

export default async function ProductsPage() {
  const supabase = await createClient();

  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase
      .from("products")
      .select("*, categories(name)")
      .order("created_at", { ascending: false }),
    supabase.from("categories").select("*"),
  ]);

  return (
    <div className="space-y-8">
      {/* Header Halaman */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 pb-5">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Product Catalog
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            Manajemen katalog barang dan penetapan lokasi rak pergudangan
          </p>
        </div>
        <AddProductDialog categories={categories || []} />
      </div>

      {/* Tabel Produk Minimalis */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 p-6">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-200 dark:border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400 text-xs py-3">SKU</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">
                Nama Produk
              </TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">
                Kategori
              </TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">HPP</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">
                Harga Jual
              </TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">Stok</TableHead>
              <TableHead className="text-zinc-400 text-xs py-3">
                Lokasi Rak
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-sm text-zinc-500 py-8"
                >
                  Belum ada data produk terdaftar
                </TableCell>
              </TableRow>
            ) : (
              products?.map((p) => (
                <TableRow
                  key={p.id}
                  className="border-zinc-200/60 dark:border-zinc-800/50"
                >
                  <TableCell className="font-mono text-sm text-zinc-500 py-3.5">
                    {p.sku}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-zinc-900 dark:text-zinc-200 py-3.5">
                    {p.name}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-500 py-3.5">
                    {p.categories?.name || "-"}
                  </TableCell>
                  <TableCell className="text-sm font-mono text-zinc-600 dark:text-zinc-400 py-3.5">
                    Rp {Number(p.cost_price).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-sm font-mono text-zinc-900 dark:text-zinc-200 py-3.5">
                    Rp {Number(p.selling_price).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100 py-3.5">
                    {p.stock} {p.unit}
                  </TableCell>
                  <TableCell className="text-sm font-mono text-zinc-500 py-3.5">
                    {p.location}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
