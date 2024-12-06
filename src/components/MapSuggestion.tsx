import { MapSuggestion as MapSuggestionType } from "@/types/types";
import { Share2, Star } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface MapSuggestionProps {
  suggestion: MapSuggestionType;
}

export const MapSuggestion = ({ suggestion }: MapSuggestionProps) => {
  const handleShare = async () => {
    const shareData = {
      title: "CarteidIA - Suggestion de carte",
      text: `${suggestion.title}\n\nDescription: ${suggestion.description}\n\nMots-clés: ${suggestion.keywords.join(", ")}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast.success("Partagé avec succès");
      } else {
        await navigator.clipboard.writeText(
          `${shareData.title}\n\n${shareData.text}\n\n${shareData.url}`
        );
        toast.success("Lien copié dans le presse-papier");
      }
    } catch (error) {
      toast.error("Erreur lors du partage");
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight">
            {suggestion.title}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handleShare}
            className="rounded-full"
            title="Partager"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1 bg-gray-50 p-2 rounded-lg">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < suggestion.decisionScore
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-gray-800">Couches utilisées</h4>
        <div className="flex flex-wrap gap-2">
          {suggestion.layers.map((layer, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
            >
              {layer.name}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-gray-800">Description</h4>
        <p className="text-gray-600 leading-relaxed">{suggestion.description}</p>
      </div>

      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-gray-800">Étapes de réalisation</h4>
        <ol className="list-decimal list-inside space-y-2">
          {suggestion.steps.map((step, index) => (
            <li key={index} className="text-gray-600 leading-relaxed pl-2">{step}</li>
          ))}
        </ol>
      </div>

      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-gray-800">Mots-clés</h4>
        <div className="flex flex-wrap gap-2">
          {suggestion.keywords.map((keyword, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-sm font-medium"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};