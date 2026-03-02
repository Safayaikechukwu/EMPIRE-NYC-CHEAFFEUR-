import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

interface AddressInputProps {
  placeholder: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

interface GeoapifySuggestion {
  properties: {
    place_id: string;
    formatted: string;
    name?: string;
    address_line1: string;
    address_line2: string;
    lat: number;
    lon: number;
  };
}

export const AddressInput: React.FC<AddressInputProps> = ({
  placeholder,
  label,
  value,
  onChange,
  required = false,
  icon,
  className = "",
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<GeoapifySuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!inputValue || inputValue.length < 3 || !showSuggestions) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        // Bias towards NYC (-74.006, 40.7128) and filter by US
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(inputValue)}&filter=countrycode:us&bias=proximity:-74.006,40.7128&apiKey=${apiKey}`
        );
        const data = await response.json();
        if (data.features) {
          setSuggestions(data.features);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [inputValue, apiKey, showSuggestions]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelect = (suggestion: GeoapifySuggestion) => () => {
    const description = suggestion.properties.formatted;
    setInputValue(description);
    setShowSuggestions(false);
    onChange(description);
    
    console.log("📍 Coordinates: ", { 
      lat: suggestion.properties.lat, 
      lng: suggestion.properties.lon 
    });
  };

  const renderSuggestions = () =>
    suggestions.map((suggestion) => {
      const { place_id, address_line1, address_line2 } = suggestion.properties;

      return (
        <li
          key={place_id}
          onClick={handleSelect(suggestion)}
          className="px-4 py-3 hover:bg-text-primary/10 cursor-pointer transition-colors border-b border-border-primary last:border-0"
        >
          <div className="text-sm text-text-primary font-medium">{address_line1}</div>
          <div className="text-[10px] text-text-secondary/60 uppercase tracking-wider">{address_line2}</div>
        </li>
      );
    });

  return (
    <div className={`space-y-1.5 text-left relative ${className}`} ref={containerRef}>
      <label className="text-[9px] uppercase tracking-widest text-text-secondary/70 font-semibold block">
        {label}
      </label>
      <div className="relative">
        {icon || <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gold" />}
        <input
          required={required}
          value={inputValue}
          onChange={handleInput}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full bg-text-primary/5 border border-border-primary rounded-sm py-2.5 sm:py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-gold/50 transition-colors placeholder:text-text-secondary/40 text-text-primary"
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-[100] w-full mt-1 bg-bg-primary border border-border-primary rounded-sm shadow-2xl overflow-hidden backdrop-blur-xl max-h-60 overflow-y-auto custom-scrollbar">
          {renderSuggestions()}
        </ul>
      )}
    </div>
  );
};
