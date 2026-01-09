
import { GoogleGenAI, Type } from "@google/genai";
import { FormData } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

export const getSmartSuggestions = async (partialData: Partial<FormData>): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Berdasarkan data pendaftaran berikut: ${JSON.stringify(partialData)}. Berikan saran singkat (maksimal 2 kalimat) untuk meningkatkan deskripsi 'Motivasi' agar terlihat lebih profesional dan menarik bagi tim seleksi sekolah. Gunakan Bahasa Indonesia yang sopan.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });
    
    // Fixed: The GenerateContentResponse features a text property (not a method).
    return response.text || "Tetap semangat dalam mengisi formulir!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Lengkapi data Anda dengan teliti.";
  }
};

export const extractDataFromBio = async (bio: string): Promise<Partial<FormData>> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Ekstrak informasi pendaftaran dari teks berikut: "${bio}". 
      Hasilkan output dalam format JSON murni. Jika data tidak ditemukan, biarkan string kosong.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            namaLengkap: { type: Type.STRING },
            namaSekolah: { type: Type.STRING },
            kelas: { type: Type.STRING },
            email: { type: Type.STRING },
            whatsapp: { type: Type.STRING },
            alamat: { type: Type.STRING },
          }
        }
      }
    });

    // Fixed: Accessed .text property directly and trimmed.
    const text = response.text || "{}";
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("AI Extraction Error:", error);
    return {};
  }
};
