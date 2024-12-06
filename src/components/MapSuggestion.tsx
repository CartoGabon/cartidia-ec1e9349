import { MapSuggestion as MapSuggestionType } from "@/types/types";
import { Star } from "lucide-react";

interface MapSuggestionProps {
  suggestion: MapSuggestionType;
}

export const MapSuggestion = ({ suggestion }: MapSuggestionProps) => {
  return (
    <div className="bg-white rounded-lg border p-6 space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-gray-900">{suggestion.title}</h3>
        <div className="flex items-center gap-1">
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

      <div className="space-y-1">
        <h4 className="font-medium text-gray-700">Couches utilisées</h4>
        <div className="flex flex-wrap gap-2">
          {suggestion.layers.map((layer, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 rounded-md text-sm text-gray-600"
            >
              {layer.name}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <h4 className="font-medium text-gray-700">Description</h4>
        <p className="text-gray-600">{suggestion.description}</p>
      </div>

      <div className="space-y-1">
        <h4 className="font-medium text-gray-700">Étapes de réalisation</h4>
        <ol className="list-decimal list-inside space-y-1">
          {suggestion.steps.map((step, index) => (
            <li key={index} className="text-gray-600">{step}</li>
          ))}
        </ol>
      </div>

      <div className="space-y-1">
        <h4 className="font-medium text-gray-700">Mots-clés</h4>
        <div className="flex flex-wrap gap-2">
          {suggestion.keywords.map((keyword, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};