import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { getSheetData } from '../services/googleSheetsService';
import { SchoolFormData, BaptismFormData } from '../types';

type ViewData = (SchoolFormData | BaptismFormData)[];

// IMPORTANT: This is a very basic password protection for demo purposes.
// For a real-world application, implement a robust authentication service.
const ACCESS_PASSWORD = 'uikb2026';

const Dashboard: React.FC = () => {
    const [view, setView] = useState<'school' | 'baptism'>('school');
    const [data, setData] = useState<ViewData>([]);
    const [filteredData, setFilteredData] = useState<ViewData>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Filter State
    const [filterDaerah, setFilterDaerah] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ACCESS_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert('Password salah!');
        }
    };

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `Statistik_${view}_${new Date().toISOString().split('T')[0]}.xlsx`);
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
                    setFilteredData(sheetData);
                } catch (err: any) {
                    setError(err.message || 'Gagal mengambil data dari Google Sheet.');
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [isAuthenticated, view]);

    // Filtering Logic
    useEffect(() => {
        let result = data;

        if (filterDaerah) {
            result = result.filter(item => item.daerah === filterDaerah);
        }

        if (searchTerm) {
            result = result.filter(item =>
                item.nama_sekolah.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredData(result);
    }, [data, filterDaerah, searchTerm]);

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
                    <div className="flex items-center space-x-3">
                        <button onClick={handleExport} className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-sm font-semibold hover:bg-emerald-700 flex items-center gap-2">
                            <i className="fas fa-file-excel"></i> Export Excel
                        </button>
                        <Link to="/" className="bg-white px-4 py-2 rounded-lg shadow-sm border text-sm font-semibold text-slate-700 hover:bg-slate-50">Kembali</Link>
                    </div>
                </div>

                {/* Filter Controls */}
                {!loading && !error && (
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Filter Daerah</label>
                            <select
                                value={filterDaerah}
                                onChange={(e) => setFilterDaerah(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                            >
                                <option value="">Semua Daerah</option>
                                <option value="JBC">JBC (Jakarta Banten)</option>
                                <option value="CSM">CSM (Central Sumatera)</option>
                                <option value="NSM">NSM (North Sumatera)</option>
                                <option value="ESM">ESM (Eastern Sumatera)</option>
                                <option value="SSM">SSM (South Sumatera)</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Cari Nama Sekolah</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Ketik nama sekolah..."
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                            />
                        </div>
                    </div>
                )}

                {loading && <p className="text-center py-10">Loading data...</p>}
                {error && <p className="text-center py-10 text-red-500">Error: {error}</p>}

                {!loading && !error && (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-slate-800 text-white uppercase text-xs">
                                    <tr>
                                        {filteredData.length > 0 && Object.keys(filteredData[0]).map((key) => (
                                            <th key={key} className="py-4 px-5 text-left whitespace-nowrap">{key.replace(/_/g, ' ')}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {filteredData.length > 0 ? (
                                        filteredData.map((row, index) => (
                                            <tr key={index} className="hover:bg-slate-50">
                                                {Object.values(row).map((value: any, i) => (
                                                    <td key={i} className="py-4 px-5 whitespace-nowrap text-slate-700">
                                                        {typeof value === 'boolean' ? value.toString() : value}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={100} className="py-10 text-center text-slate-500 italic">
                                                Tidak ada data yang cocok dengan filter.
                                            </td>
                                        </tr>
                                    )}
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
