import { useState } from "react";
import { Layer, MapSuggestion } from "@/types/types";
import { LayerUpload } from "@/components/LayerUpload";
import { MapSuggestion as MapSuggestionComponent } from "@/components/MapSuggestion";
import { ExportButtons } from "@/components/ExportButtons";
import { RefreshCw, Play, Map } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [suggestions, setSuggestions] = useState<MapSuggestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const sendToWebhook = async (data: any) => {
    try {
      const response = await fetch('https://hook.eu2.make.com/87cgun146mknrzormw5l63ltytqtmx94', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi au webhook');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur webhook:', error);
      toast.error("Erreur lors de l'envoi des données");
      throw error;
    }
  };

  const generateSuggestions = async () => {
    if (layers.length === 0) {
      toast.error("Veuillez ajouter au moins une couche");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Envoi des données au webhook
      await sendToWebhook({
        action: 'generate',
        layers: layers,
        timestamp: new Date().toISOString()
      });

      // Simulation de génération (gardée pour la démo)
      const newSuggestions: MapSuggestion[] = Array.from({ length: 5 }).map(
        (_, i) => ({
          id: i,
          title: `Carte ${i + 1} - Analyse spatiale`,
          layers,
          description: "Description de la carte générée automatiquement.",
          steps: [
            "Ouvrir QGIS",
            "Importer les couches",
            "Appliquer les géotraitements",
          ],
          keywords: ["analyse", "spatial", "cartographie"],
          decisionScore: Math.floor(Math.random() * 5) + 1,
        })
      );

      setSuggestions(newSuggestions);
      toast.success("Suggestions générées avec succès");
    } catch (error) {
      toast.error("Erreur lors de la génération des suggestions");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center mb-8">
            <Map className="w-16 h-16 text-purple-600 mr-4" />
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              CARTIDIA
            </h1>
          </div>
          <p className="text-2xl text-gray-600 font-light max-w-2xl mx-auto">
            Votre générateur d'idées de cartes
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-500 mx-auto rounded-full" />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <LayerUpload layers={layers} setLayers={setLayers} />

          <div className="flex justify-center gap-4">
            <button
              onClick={generateSuggestions}
              disabled={isGenerating || layers.length === 0}
              className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg
                ${
                  isGenerating || layers.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-90 transform hover:scale-105 transition-all"
                }`}
            >
              <Play className="w-5 h-5" />
              Générer
            </button>

            {suggestions.length > 0 && (
              <button
                onClick={generateSuggestions}
                disabled={isGenerating}
                className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg
                  ${
                    isGenerating
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:opacity-90 transform hover:scale-105 transition-all"
                  }`}
              >
                <RefreshCw
                  className={`w-5 h-5 ${isGenerating ? "animate-spin" : ""}`}
                />
                Régénérer
              </button>
            )}
          </div>

          {suggestions.length > 0 && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Suggestions de cartes
                </h2>
                <ExportButtons suggestions={suggestions} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {suggestions.map((suggestion) => (
                  <MapSuggestionComponent
                    key={suggestion.id}
                    suggestion={suggestion}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;