import React from 'react';
import { CARS, TRACKS, DRIVING_STYLES } from '../constants';
import { CarIcon, TrackIcon, StyleIcon, SparklesIcon } from './icons/Icons';

interface SetupFormProps {
  car: string;
  setCar: (car: string) => void;
  track: string;
  setTrack: (track: string) => void;
  style: string;
  setStyle: (style: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const SetupForm: React.FC<SetupFormProps> = ({ car, setCar, track, setTrack, style, setStyle, onSubmit, isLoading }) => {
  
  const SelectInput = <T extends string,>({ label, value, onChange, options, icon, id }: { label: string; value: T; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: readonly T[] | { name: T, class: string }[]; icon: React.ReactNode; id: string; }) => (
    <div className="relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1 ml-2">{label}</label>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none pt-6">
        {icon}
      </div>
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={isLoading}
        className="w-full pl-10 pr-4 py-3 text-base bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out disabled:opacity-50 appearance-none"
      >
        {Array.isArray(options) && options.length > 0 && typeof options[0] === 'object' && options[0] !== null ? (
          (options as { name: T, class: string }[]).map(option => (
            <option key={option.name} value={option.name}>{option.name} ({option.class})</option>
          ))
        ) : (
          (options as T[]).map(option => (
            <option key={option} value={option}>{option}</option>
          ))
        )}
      </select>
    </div>
  );

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SelectInput id="car-select" label="Autó" value={car} onChange={(e) => setCar(e.target.value)} options={CARS} icon={<CarIcon />} />
        <SelectInput id="track-select" label="Pálya" value={track} onChange={(e) => setTrack(e.target.value)} options={TRACKS} icon={<TrackIcon />} />
        <SelectInput id="style-select" label="Vezetési stílus" value={style} onChange={(e) => setStyle(e.target.value)} options={DRIVING_STYLES} icon={<StyleIcon />} />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
      >
        <SparklesIcon />
        <span className="ml-2">{isLoading ? 'Generálás...' : 'Beállítás Létrehozása'}</span>
      </button>
    </form>
  );
};

export default SetupForm;