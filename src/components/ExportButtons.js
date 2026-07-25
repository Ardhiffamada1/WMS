"use client";

import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

export function ExportButtons({
  data,
  filename = "report",
  title = "Laporan Gudang",
}) {
  // Function to Export CSV
  const handleExportCSV = () => {
    if (!data || !data.length) return;

    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((obj) =>
      Object.values(obj)
        .map((val) => `"${val !== null && val !== undefined ? val : ""}"`)
        .join(","),
    );

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `${filename}_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to Print Report
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center gap-2 print:hidden">
      <Button
        type="button"
        onClick={handleExportCSV}
        variant="outline"
        size="sm"
        className="h-9 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl cursor-pointer"
      >
        <Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV
      </Button>
      <Button
        type="button"
        onClick={handlePrint}
        variant="outline"
        size="sm"
        className="h-9 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl cursor-pointer"
      >
        <Printer className="mr-1.5 h-3.5 w-3.5" /> Cetak Laporan
      </Button>
    </div>
  );
}
