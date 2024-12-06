import { FilePdf, FileText, FileCsv } from "lucide-react";
import { MapSuggestion } from "@/types/types";
import { toast } from "sonner";

interface ExportButtonsProps {
  suggestions: MapSuggestion[];
}

export const ExportButtons = ({ suggestions }: ExportButtonsProps) => {
  const handleExport = (format: "PDF" | "CSV" | "TXT") => {
    // Simulation d'export
    toast.success(`Export en ${format} réussi`);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => handleExport("PDF")}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        <FilePdf className="w-5 h-5" />
        PDF
      </button>
      <button
        onClick={() => handleExport("CSV")}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      >
        <FileCsv className="w-5 h-5" />
        CSV
      </button>
      <button
        onClick={() => handleExport("TXT")}
        className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
      >
        <FileText className="w-5 h-5" />
        TXT
      </button>
    </div>
  );
};