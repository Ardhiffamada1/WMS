"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode, Printer } from "lucide-react";

export default function PrintLabelDialog({ product }) {
  const [open, setOpen] = useState(false);

  // Generate URL Barcode / QR Code gratis via API QuickChart
  const qrUrl = `https://quickchart.io/qr?text=${encodeURIComponent(product.sku)}&size=150`;

  const handlePrintLabel = () => {
    window.print();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
        >
          <QrCode className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 rounded-2xl p-6">
        <DialogHeader className="pb-2 border-b border-zinc-100 dark:border-zinc-900">
          <DialogTitle className="text-base font-bold">
            Cetak Label Stiker Rak
          </DialogTitle>
        </DialogHeader>

        {/* Area Label Stiker untuk Thermal Printer */}
        <div
          id="printable-label"
          className="my-6 p-6 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl bg-zinc-50 dark:bg-zinc-900 text-center space-y-3"
        >
          <div className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-2">
            <span className="text-xs font-bold uppercase font-mono tracking-wider">
              WMS APEX STICKER
            </span>
            <span className="text-[10px] font-mono font-bold bg-zinc-200 dark:bg-zinc-800 px-2 py-0.5 rounded">
              {product.location}
            </span>
          </div>

          <div className="flex items-center justify-center py-2">
            <img
              src={qrUrl}
              alt={`QR ${product.sku}`}
              className="h-28 w-28 rounded-lg bg-white p-1 border border-zinc-200"
            />
          </div>

          <div>
            <p className="text-sm font-bold leading-tight text-zinc-900 dark:text-zinc-100">
              {product.name}
            </p>
            <p className="text-xs font-mono font-bold text-zinc-500 mt-1">
              {product.sku}
            </p>
          </div>
        </div>

        <Button
          onClick={handlePrintLabel}
          className="w-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-semibold h-10 rounded-xl cursor-pointer"
        >
          <Printer className="mr-2 h-4 w-4" /> Print Label Stiker
        </Button>
      </DialogContent>
    </Dialog>
  );
}
