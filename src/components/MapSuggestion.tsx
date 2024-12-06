import { MapSuggestion as MapSuggestionType } from "@/types/types";
import { Star } from "lucide-react";

interface MapSuggestionProps {
  suggestion: MapSuggestionType;
}

export const MapSuggestion = ({ suggestion }: MapSuggestionProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-8 space-y-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <h3 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight">
          {suggestion.title}
        </h3>
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