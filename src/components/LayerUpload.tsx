import { Plus, Layers, X } from "lucide-react";
import { Layer } from "@/types/types";
import { useState } from "react";
import { toast } from "sonner";

interface LayerUploadProps {
  layers: Layer[];
  setLayers: (layers: Layer[]) => void;
}

export const LayerUpload = ({ layers, setLayers }: LayerUploadProps) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    if (layers.length + files.length > 3) {
      toast.error("Maximum 3 couches autorisées");
      return;
    }

    const newLayers = files.map(file => {
      const extension = file.name.split('.').pop()?.toUpperCase();
      const format = ["SHP", "GEOPACKAGE", "GEOJSON", "CSV"].includes(extension || "") 
        ? extension as Layer["format"]
        : "SHP";
      
      return {
        name: file.name,
        format
      };
    });

    setLayers([...layers, ...newLayers]);
    toast.success("Couches ajoutées avec succès");
  };

  const removeLayer = (index: number) => {
    const newLayers = layers.filter((_, i) => i !== index);
    setLayers(newLayers);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          ${layers.length >= 3 ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-blue-500"}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => {
          if (layers.length < 3) {
            // Simuler un clic sur input file
            document.getElementById("fileInput")?.click();
          }
        }}
      >
        <input
          id="fileInput"
          type="file"
          className="hidden"
          multiple
          accept=".shp,.gpkg,.geojson,.csv"
          onChange={(e) => {
            if (e.target.files) {
              handleFiles(Array.from(e.target.files));
            }
          }}
        />
        <div className="flex flex-col items-center gap-2">
          <Plus className="w-12 h-12 text-gray-400" />
          <p className="text-lg font-medium">Déposez vos fichiers ici</p>
          <p className="text-sm text-gray-500">
            ou cliquez pour sélectionner (max. 3 couches)
          </p>
          <p className="text-xs text-gray-400">
            Formats acceptés : SHP, Geopackage, GeoJSON, CSV
          </p>
        </div>
      </div>

      {layers.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium flex items-center gap-2">
            <Layers className="w-5 h-5" />
            Couches importées
          </h3>
          <div className="space-y-2">
            {layers.map((layer, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white rounded-lg border"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{layer.name}</span>
                  <span className="text-xs text-gray-500">({layer.format})</span>
                </div>
                <button
                  onClick={() => removeLayer(index)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};