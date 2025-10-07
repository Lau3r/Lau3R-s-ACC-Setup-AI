import React from 'react';
import type { ACCSetup } from '../types';

interface SetupDisplayProps {
  setup: ACCSetup;
}

const SetupCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-gray-800/60 rounded-lg shadow-lg p-4 border border-gray-700">
    <h3 className="text-lg font-bold text-blue-400 border-b border-gray-600 pb-2 mb-3">{title}</h3>
    <div className="space-y-2 text-sm">{children}</div>
  </div>
);

const DataPair: React.FC<{ label: string; value: string | number | undefined; unit?: string }> = ({ label, value, unit }) => (
  <div className="flex justify-between items-center bg-gray-900/50 p-2 rounded-md">
    <span className="text-gray-400">{label}:</span>
    <span className="font-semibold text-gray-100">{value ?? 'N/A'}{unit && ` ${unit}`}</span>
  </div>
);

const SetupDisplay: React.FC<SetupDisplayProps> = ({ setup }) => {
  return (
    <div key={setup.summary} className="space-y-6 animate-fade-in">
        <div className="bg-gray-800/60 rounded-lg shadow-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-4">
                Javasolt Beállítások
            </h2>
            <p className="text-gray-300 text-center">{setup.summary}</p>
        </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <SetupCard title="Gumiabroncsok">
            <h4 className="font-semibold text-gray-300 mt-2 mb-1">Nyomás (PSI)</h4>
            <DataPair label="Bal Első" value={setup.tyres.tyrePressures.frontLeft} unit="psi" />
            <DataPair label="Jobb Első" value={setup.tyres.tyrePressures.frontRight} unit="psi" />
            <DataPair label="Bal Hátsó" value={setup.tyres.tyrePressures.rearLeft} unit="psi" />
            <DataPair label="Jobb Hátsó" value={setup.tyres.tyrePressures.rearRight} unit="psi" />
            <h4 className="font-semibold text-gray-300 mt-3 mb-1">Kerékdőlés</h4>
            <DataPair label="Első" value={setup.tyres.alignment.camber.front} unit="°" />
            <DataPair label="Hátsó" value={setup.tyres.alignment.camber.rear} unit="°" />
            <h4 className="font-semibold text-gray-300 mt-3 mb-1">Kerékösszetartás</h4>
            <DataPair label="Első" value={setup.tyres.alignment.toe.front} unit="°" />
            <DataPair label="Hátsó" value={setup.tyres.alignment.toe.rear} unit="°" />
            <h4 className="font-semibold text-gray-300 mt-3 mb-1">Utánfutás</h4>
            <DataPair label="Első Caster" value={setup.tyres.alignment.caster} unit="°" />
        </SetupCard>
        
        <SetupCard title="Elektronika">
            <DataPair label="Kipörgésgátló 1" value={setup.electronics.tractionControl1} />
            <DataPair label="Kipörgésgátló 2" value={setup.electronics.tractionControl2} />
            <DataPair label="ABS" value={setup.electronics.abs} />
            <DataPair label="ECU Térkép" value={setup.electronics.ecuMap} />
        </SetupCard>

        <SetupCard title="Üzemanyag & Stratégia">
            <DataPair label="Üzemanyag" value={setup.fuelAndStrategy.fuel} unit="L" />
            <DataPair label="Boxkiállás Gumi Szett" value={setup.fuelAndStrategy.pitStopTyreSet} />
            <DataPair label="Boxkiállás Üzemanyag" value={setup.fuelAndStrategy.pitStopFuelToAdd} unit="L" />
        </SetupCard>

        <SetupCard title="Mechanikai Tapadás">
            <h4 className="font-semibold text-gray-300 mb-1">Stabilizátor</h4>
            <DataPair label="Első" value={setup.mechanicalGrip.antirollBar.front} />
            <DataPair label="Hátsó" value={setup.mechanicalGrip.antirollBar.rear} />
            <h4 className="font-semibold text-gray-300 mt-3 mb-1">Differenciálmű</h4>
            <DataPair label="Előfeszítés" value={setup.mechanicalGrip.preloadDifferential} unit="Nm" />
            <h4 className="font-semibold text-gray-300 mt-3 mb-1">Kerék Keménység</h4>
            <DataPair label="Első" value={setup.mechanicalGrip.wheelRate.front} unit="N/mm" />
            <DataPair label="Hátsó" value={setup.mechanicalGrip.wheelRate.rear} unit="N/mm" />
        </SetupCard>
        
        <SetupCard title="Lengéscsillapítók">
            <h4 className="font-semibold text-gray-300 mb-1">Bump</h4>
            <DataPair label="Első" value={setup.dampers.bump.front} />
            <DataPair label="Hátsó" value={setup.dampers.bump.rear} />
            <h4 className="font-semibold text-gray-300 mt-3 mb-1">Rebound</h4>
            <DataPair label="Első" value={setup.dampers.rebound.front} />
            <DataPair label="Hátsó" value={setup.dampers.rebound.rear} />
        </SetupCard>
        
        <SetupCard title="Aerodinamika">
            <h4 className="font-semibold text-gray-300 mb-1">Hasmagasság (mm)</h4>
            <DataPair label="Első" value={setup.aero.rideHeight.front} unit="mm" />
            <DataPair label="Hátsó" value={setup.aero.rideHeight.rear} unit="mm" />
            <h4 className="font-semibold text-gray-300 mt-3 mb-1">Szárnyak</h4>
            <DataPair label="Hátsó Szárny" value={setup.aero.rearWing} />
            <DataPair label="Splitter" value={setup.aero.splitter} />
            <h4 className="font-semibold text-gray-300 mt-3 mb-1">Hűtés</h4>
            <DataPair label="Fékcsatornák" value={setup.aero.brakeDucts} />
        </SetupCard>

      </div>
    </div>
  );
};

export default SetupDisplay;