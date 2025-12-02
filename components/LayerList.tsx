import React from 'react';
import { MapLayer } from '../types';
import { Eye, EyeOff, Trash2, Loader2, MapPin } from 'lucide-react';

interface LayerListProps {
  layers: MapLayer[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onFocus: (id: string) => void;
  isLoading: boolean;
}

export const LayerList: React.FC<LayerListProps> = ({ 
  layers, 
  onToggle, 
  onDelete, 
  onFocus,
  isLoading
}) => {
  if (layers.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 flex flex-col items-center">
        {isLoading ? (
          <>
            <Loader2 className="animate-spin text-indigo-500 mb-3" size={32} />
            <p className="font-medium text-gray-700">Veriler GitHub'dan Yükleniyor...</p>
            <p className="text-xs mt-1 text-gray-400">Haritalar işlenirken lütfen bekleyin.</p>
          </>
        ) : (
          <>
            <p className="text-sm">Yüklü katman yok.</p>
            <p className="text-xs mt-1">Başlamak için dosya yükleyin veya sayfayı yenileyin.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3 pb-4">
      {layers.map((layer) => (
        <div 
          key={layer.id} 
          className={`bg-white p-3 rounded-lg shadow-sm border transition-all duration-200 flex flex-col gap-2 ${!layer.visible ? 'opacity-60 bg-gray-50' : 'border-gray-200'}`}
        >
          <div className="flex items-center justify-between">
            {/* Tıklanabilir İsim Alanı */}
            <div 
              onClick={() => onFocus(layer.id)}
              className="flex items-center gap-2 overflow-hidden cursor-pointer group hover:opacity-80 transition-opacity flex-1"
              title="Haritada bu katmana git"
            >
              <div 
                className="w-3 h-3 rounded-full flex-shrink-0 shadow-sm" 
                style={{ backgroundColor: layer.color }}
              />
              <span className="font-medium text-sm text-gray-700 truncate group-hover:text-indigo-600 transition-colors">
                {layer.name}
              </span>
              <MapPin size={12} className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={(e) => { e.stopPropagation(); onToggle(layer.id); }}
                className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded"
                title={layer.visible ? "Katmanı Gizle" : "Katmanı Göster"}
              >
                {layer.visible ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onDelete(layer.id); }}
                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded"
                title="Katmanı Sil"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex items-center justify-center gap-2 py-2 text-xs text-indigo-600 bg-indigo-50 rounded animate-pulse">
           <Loader2 size={12} className="animate-spin" />
           Diğer dosyalar yükleniyor...
        </div>
      )}
    </div>
  );
};