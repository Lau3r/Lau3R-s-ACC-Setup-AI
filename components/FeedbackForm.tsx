import React, { useState } from 'react';
import { SparklesIcon } from './icons/Icons';

interface FeedbackFormProps {
    onSubmit: (feedback: string) => void;
    isLoading: boolean;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit, isLoading }) => {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (feedback.trim()) {
            onSubmit(feedback);
            setFeedback('');
        }
    };

    return (
        <div className="mt-8 bg-gray-800/50 rounded-xl shadow-2xl p-6 backdrop-blur-sm border border-gray-700 animate-fade-in">
            <h3 className="text-xl font-bold text-center text-blue-400">Finomhangolás</h3>
            <p className="text-center text-gray-400 mt-2 mb-6">
                Milyen az autó? Írd le a tapasztalataidat, és az AI finomhangolja a beállításokat.
                (Pl. "Túlságosan alulkormányzott a lassú kanyarokban.")
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Írd le a tapasztalataidat..."
                    disabled={isLoading}
                    className="w-full h-24 p-3 text-base bg-gray-700/50 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out disabled:opacity-50 resize-none"
                />
                <button
                    type="submit"
                    disabled={isLoading || !feedback.trim()}
                    className="w-full flex items-center justify-center bg-teal-600 hover:bg-teal-700 disabled:bg-teal-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-teal-500/50"
                >
                    <SparklesIcon />
                    <span className="ml-2">{isLoading ? 'Finomhangolás...' : 'Beállítások Finomhangolása'}</span>
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;
