import React, { useState, useCallback } from 'react';
import { CARS, TRACKS, DRIVING_STYLES } from './constants';
import type { ACCSetup } from './types';
import { startChatAndGenerateSetup, finetuneSetup } from './services/geminiService';
import type { Chat } from '@google/genai';

import Header from './components/Header';
import SetupForm from './components/SetupForm';
import SetupDisplay from './components/SetupDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import FeedbackForm from './components/FeedbackForm';

const App: React.FC = () => {
  const [car, setCar] = useState<string>(CARS[0].name);
  const [track, setTrack] = useState<string>(TRACKS[0]);
  const [style, setStyle] = useState<string>(DRIVING_STYLES[0]);
  const [setup, setSetup] = useState<ACCSetup | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSetup = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSetup(null);
    setChat(null);

    try {
      const result = await startChatAndGenerateSetup(car, track, style);
      setSetup(result.setup);
      setChat(result.chat);
    } catch (e) {
      console.error(e);
      setError('Hiba történt a beállítások létrehozása közben. Kérjük, próbálja újra később.');
    } finally {
      setIsLoading(false);
    }
  }, [car, track, style]);
  
  const handleFinetuneSetup = useCallback(async (feedback: string) => {
    if (!chat) {
        setError("Nincs aktív chat munkamenet a finomhangoláshoz.");
        return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const finetunedSetup = await finetuneSetup(chat, feedback);
      setSetup(finetunedSetup);
    } catch (e) {
      console.error(e);
      setError('Hiba történt a beállítások finomhangolása közben. Kérjük, próbálja újra később.');
    } finally {
      setIsLoading(false);
    }

  }, [chat]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main className="mt-8">
          <div className="bg-gray-800/50 rounded-xl shadow-2xl p-6 backdrop-blur-sm border border-gray-700">
            <h2 className="text-xl font-bold text-center text-blue-400">Válaszd ki a kritériumokat</h2>
            <p className="text-center text-gray-400 mt-2 mb-6">Add meg az autót, a pályát és a vezetési stílusod, hogy személyre szabott beállítást kapj.</p>
            <SetupForm
              car={car}
              setCar={setCar}
              track={track}
              setTrack={setTrack}
              style={style}
              setStyle={setStyle}
              onSubmit={handleGenerateSetup}
              isLoading={isLoading}
            />
          </div>

          {isLoading && (
            <div className="mt-8 flex flex-col items-center justify-center text-center p-6 bg-gray-800/50 rounded-xl shadow-2xl border border-gray-700">
              <LoadingSpinner />
              <p className="mt-4 text-lg font-semibold text-blue-400">Beállítások generálása...</p>
              <p className="text-gray-400">Az AI versenymérnökünk dolgozik az ügyön. Ez eltarthat egy pillanatig.</p>
            </div>
          )}

          {error && (
            <div className="mt-8 text-center p-6 bg-red-900/50 border border-red-700 rounded-xl">
              <h3 className="text-xl font-bold text-red-400">Hoppá!</h3>
              <p className="mt-2 text-red-300">{error}</p>
            </div>
          )}

          {setup && !isLoading && (
            <div className="mt-8">
              <SetupDisplay setup={setup} />
              <FeedbackForm onSubmit={handleFinetuneSetup} isLoading={isLoading} />
            </div>
          )}

        </main>
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Powered by Gemini AI. Készült az Assetto Corsa Competizione rajongói számára.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;