
import { SchoolFormData, BaptismFormData } from "../types";

// Replace with your actual Web App URL after re-deploying the script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXv9GbqFnNiMVcICow5jALgmnYzQMIhZbqfN_k6G3yeu521SwjWZwx8lttFSORGRo/exec';

export const submitToGoogleSheets = async (data: SchoolFormData | BaptismFormData): Promise<boolean> => {
  try {
    const payload = {
      ...data,
      timestamp: new Date().toLocaleString('id-ID')
    };

    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return true;
  } catch (error) {
    console.error("Google Sheets Submission Error:", error);
    throw new Error("Gagal mengirim data. Silakan cek koneksi internet Anda.");
  }
};
