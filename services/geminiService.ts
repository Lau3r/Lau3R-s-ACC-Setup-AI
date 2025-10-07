import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { ACCSetup } from '../types';

const setupSchema = {
    type: Type.OBJECT,
    properties: {
        summary: { type: Type.STRING, description: "A brief summary and explanation of the setup choices in Hungarian." },
        tyres: {
            type: Type.OBJECT,
            properties: {
                tyreCompound: { type: Type.STRING, description: "Dry or Wet" },
                tyrePressures: {
                    type: Type.OBJECT,
                    properties: {
                        frontLeft: { type: Type.NUMBER },
                        frontRight: { type: Type.NUMBER },
                        rearLeft: { type: Type.NUMBER },
                        rearRight: { type: Type.NUMBER },
                    },
                    required: ["frontLeft", "frontRight", "rearLeft", "rearRight"],
                },
                alignment: {
                    type: Type.OBJECT,
                    properties: {
                        camber: {
                            type: Type.OBJECT,
                            properties: { front: { type: Type.NUMBER }, rear: { type: Type.NUMBER } },
                            required: ["front", "rear"],
                        },
                        toe: {
                            type: Type.OBJECT,
                            properties: { front: { type: Type.NUMBER }, rear: { type: Type.NUMBER } },
                            required: ["front", "rear"],
                        },
                        caster: { type: Type.NUMBER },
                    },
                    required: ["camber", "toe", "caster"],
                },
            },
            required: ["tyreCompound", "tyrePressures", "alignment"],
        },
        electronics: {
            type: Type.OBJECT,
            properties: {
                tractionControl1: { type: Type.NUMBER },
                tractionControl2: { type: Type.NUMBER },
                abs: { type: Type.NUMBER },
                ecuMap: { type: Type.STRING, description: "e.g., '1 (Fastest)', '2 (Race)'" },
            },
            required: ["tractionControl1", "tractionControl2", "abs", "ecuMap"],
        },
        fuelAndStrategy: {
            type: Type.OBJECT,
            properties: {
                fuel: { type: Type.NUMBER, description: "Fuel for a typical race length, e.g., 20 minutes." },
                pitStopTyreSet: { type: Type.NUMBER },
                pitStopFuelToAdd: { type: Type.NUMBER },
            },
            required: ["fuel", "pitStopTyreSet", "pitStopFuelToAdd"],
        },
        mechanicalGrip: {
            type: Type.OBJECT,
            properties: {
                antirollBar: {
                    type: Type.OBJECT,
                    properties: { front: { type: Type.NUMBER }, rear: { type: Type.NUMBER } },
                    required: ["front", "rear"],
                },
                preloadDifferential: { type: Type.NUMBER },
                wheelRate: {
                    type: Type.OBJECT,
                    properties: { front: { type: Type.NUMBER }, rear: { type: Type.NUMBER } },
                    required: ["front", "rear"],
                },
                bumpstopRate: {
                    type: Type.OBJECT,
                    properties: { front: { type: Type.NUMBER }, rear: { type: Type.NUMBER } },
                    required: ["front", "rear"],
                },
                bumpstopRange: {
                    type: Type.OBJECT,
                    properties: { front: { type: Type.NUMBER }, rear: { type: Type.NUMBER } },
                    required: ["front", "rear"],
                },
            },
            required: ["antirollBar", "preloadDifferential", "wheelRate", "bumpstopRate", "bumpstopRange"],
        },
        dampers: {
            type: Type.OBJECT,
            properties: {
                bump: {
                    type: Type.OBJECT,
                    properties: { front: { type: Type.NUMBER }, rear: { type: Type.NUMBER } },
                    required: ["front", "rear"],
                },
                rebound: {
                    type: Type.OBJECT,
                    properties: { front: { type: Type.NUMBER }, rear: { type: Type.NUMBER } },
                    required: ["front", "rear"],
                },
            },
            required: ["bump", "rebound"],
        },
        aero: {
            type: Type.OBJECT,
            properties: {
                rideHeight: {
                    type: Type.OBJECT,
                    properties: { front: { type: Type.NUMBER }, rear: { type: Type.NUMBER } },
                    required: ["front", "rear"],
                },
                rearWing: { type: Type.NUMBER },
                splitter: { type: Type.NUMBER },
                brakeDucts: { type: Type.NUMBER },
            },
            required: ["rideHeight", "rearWing", "splitter", "brakeDucts"],
        },
    },
    required: ["summary", "tyres", "electronics", "fuelAndStrategy", "mechanicalGrip", "dampers", "aero"],
};

const parseAndValidateResponse = (responseText: string): ACCSetup => {
    try {
        const parsedJson = JSON.parse(responseText.trim());
        // Basic validation could be added here if needed
        return parsedJson as ACCSetup;
    } catch (e) {
        console.error("Failed to parse JSON response:", responseText);
        throw new Error("Invalid JSON response from API.");
    }
};

export const startChatAndGenerateSetup = async (car: string, track: string, style: string): Promise<{setup: ACCSetup, chat: Chat}> => {
    if (!process.env.API_KEY) {
        throw new Error("API_KEY environment variable not set");
    }
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const systemInstruction = `You are an expert race engineer for the Assetto Corsa Competizione (ACC) simulator. Your task is to generate a complete and competitive race setup. Provide all values as numbers, without units, and respond only with the JSON object matching the provided schema. The setup should be a good, well-balanced starting point for a 20-minute race. Ensure the 'summary' field is in Hungarian.`;
    
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            responseSchema: setupSchema,
        }
    });

    const prompt = `Generate a setup for the following criteria:\n- Car: ${car}\n- Track: ${track}\n- Driving Style: ${style}`;

    const response = await chat.sendMessage({ message: prompt });
    const setup = parseAndValidateResponse(response.text);

    return { setup, chat };
};

export const finetuneSetup = async (chat: Chat, feedback: string): Promise<ACCSetup> => {
    
    const prompt = `The user's feedback on the current setup is: "${feedback}". Please fine-tune the setup based on this feedback and return the complete, updated setup in the same JSON format.`;

    const response = await chat.sendMessage({ message: prompt });
    const setup = parseAndValidateResponse(response.text);

    return setup;
};
