import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getSheetData } from '../services/googleSheetsService';
import { SchoolFormData, BaptismFormData } from '../types';

type ViewData = (SchoolFormData | BaptismFormData)[];

// IMPORTANT: This is a very basic password protection for demo purposes.
// For a real-world application, implement a robust authentication service.
const ACCESS_PASSWORD = 'uikb2026';

const Dashboard: React.FC = () => {
    const [view, setView] = useState<'school' | 'baptism'>('school');
    const [data, setData] = useState<ViewData>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ACCESS_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert('Password salah!');
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            const fetchData = async () => {
                setLoading(true);
                setError(null);
                try {
                    const sheetName = view === 'school' ? 'SCHOOLDATA' : 'BAPTISM';
                    const sheetData = await getSheetData(sheetName);
                    setData(sheetData);
                } catch (err: any) {
                    setError(err.message || 'Gagal mengambil data dari Google Sheet.');
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [isAuthenticated, view]);

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 font-sans">
                <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-2xl text-center">
                    <i className="fas fa-lock text-5xl text-emerald-500 mb-6"></i>
                    <h2 className="text-2xl font-bold text-slate-800 mb-3">Akses Terbatas</h2>
                    <p className="text-slate-500 mb-8">Silakan masukkan kata sandi untuk melihat dashboard.</p>
                    <form onSubmit={handleAuth}>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg text-center focus:ring-2 focus:ring-emerald-500 outline-none transition"
                            placeholder="******"
                        />
                        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-lg mt-6 transition-transform active:scale-95">
                            Buka Dashboard
                        </button>
                    </form>
                    <Link to="/" className="inline-block mt-6 text-sm text-slate-500 hover:text-emerald-600">Kembali ke Formulir</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 font-sans p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-black text-slate-800">Dashboard Statistik</h1>
                    <div className="flex bg-white p-1.5 rounded-full border shadow-sm">
                        <button onClick={() => setView('school')} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${view === 'school' ? 'bg-emerald-500 text-white' : 'text-slate-600'}`}>Data Sekolah</button>
                        <button onClick={() => setView('baptism')} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${view === 'baptism' ? 'bg-blue-500 text-white' : 'text-slate-600'}`}>Data Baptisan</button>
                    </div>
                    <Link to="/" className="bg-white px-4 py-2 rounded-lg shadow-sm border text-sm font-semibold text-slate-700 hover:bg-slate-50">Kembali</Link>
                </div>

                {loading && <p className="text-center py-10">Loading data...</p>}
                {error && <p className="text-center py-10 text-red-500">Error: {error}</p>}

                {!loading && !error && (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-slate-800 text-white uppercase text-xs">
                                    <tr>
                                        {data.length > 0 && Object.keys(data[0]).map((key) => (
                                            <th key={key} className="py-4 px-5 text-left whitespace-nowrap">{key.replace(/_/g, ' ')}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {data.map((row, index) => (
                                        <tr key={index} className="hover:bg-slate-50">
                                            {Object.values(row).map((value: any, i) => (
                                                <td key={i} className="py-4 px-5 whitespace-nowrap text-slate-700">
                                                    {typeof value === 'boolean' ? value.toString() : value}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
