
import React, { useState } from 'react';
import SchoolDataForm from './components/SchoolDataForm';
import BaptismForm from './components/BaptismForm';
import { FormStatus, SchoolFormData, BaptismFormData } from './types';
import { submitToGoogleSheets } from './services/googleSheetsService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'school' | 'baptism'>('school');
  const [status, setStatus] = useState<FormStatus>({
    loading: false,
    success: false,
    error: null,
  });

  const handleFormSubmit = async (data: SchoolFormData | BaptismFormData) => {
    setStatus({ loading: true, success: false, error: null });
    try {
      await submitToGoogleSheets(data);
      setStatus({ loading: false, success: true, error: null });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Reset success message after 5 seconds
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
    } catch (err: any) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-500 p-2 rounded-lg shadow-inner">
              <i className="fas fa-chart-line text-2xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter uppercase">Statistik UIKB 2026</h1>
              <p className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">Pendidikan & Pelayanan</p>
            </div>
          </div>
          
          <nav className="flex bg-slate-800 p-1 rounded-full border border-slate-700 shadow-inner">
            <button 
              onClick={() => setActiveTab('school')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'school' ? 'bg-emerald-500 text-white shadow-md scale-105' : 'text-slate-400 hover:text-white'}`}
            >
              Statistik Sekolah
            </button>
            <button 
              onClick={() => setActiveTab('baptism')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'baptism' ? 'bg-blue-500 text-white shadow-md scale-105' : 'text-slate-400 hover:text-white'}`}
            >
              Data Baptisan
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 px-6">
        <div className="max-w-5xl mx-auto">
          
          {status.success && (
            <div className="mb-8 bg-green-500 text-white p-5 rounded-2xl shadow-xl flex items-center animate-bounce">
              <i className="fas fa-check-circle text-2xl mr-4"></i>
              <div>
                <p className="font-black text-lg">DATA BERHASIL DIKIRIM!</p>
                <p className="text-sm opacity-90">Informasi Anda telah diperbarui di Database Pusat UIKB.</p>
              </div>
            </div>
          )}

          {status.error && (
            <div className="mb-8 bg-red-600 text-white p-5 rounded-2xl shadow-xl flex items-center">
              <i className="fas fa-exclamation-triangle text-2xl mr-4"></i>
              <div>
                <p className="font-bold text-lg">GAGAL MENGIRIM DATA</p>
                <p className="text-sm opacity-90">{status.error}</p>
              </div>
            </div>
          )}

          {activeTab === 'school' ? (
            <div className="space-y-6">
              <div className="bg-emerald-600 text-white p-8 rounded-3xl shadow-2xl mb-10 relative overflow-hidden">
                <i className="fas fa-school absolute -right-10 -bottom-10 text-9xl opacity-10"></i>
                <h2 className="text-3xl font-black mb-2">Laporan Statistik Sekolah</h2>
                <p className="text-emerald-50 opacity-80 max-w-xl">Mohon masukkan data guru, siswa, dan staf secara akurat untuk periode tahun ajaran 2025-2026.</p>
              </div>
              <SchoolDataForm onSubmit={handleFormSubmit} isSubmitting={status.loading} />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-2xl mb-10 relative overflow-hidden">
                <i className="fas fa-dove absolute -right-10 -bottom-10 text-9xl opacity-10"></i>
                <h2 className="text-3xl font-black mb-2">Laporan Baptisan & KPA</h2>
                <p className="text-blue-50 opacity-80 max-w-xl">Lengkapi data pencapaian baptisan siswa dan jumlah kelompok Care Group (KPA) di sekolah Anda.</p>
              </div>
              <BaptismForm onSubmit={handleFormSubmit} isSubmitting={status.loading} />
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t py-12">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="flex justify-center space-x-6 mb-4 text-slate-400">
            <i className="fab fa-facebook hover:text-emerald-500 transition-colors cursor-pointer"></i>
            <i className="fab fa-instagram hover:text-emerald-500 transition-colors cursor-pointer"></i>
            <i className="fab fa-youtube hover:text-emerald-500 transition-colors cursor-pointer"></i>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Departemen Pendidikan UIKB &bull; Database v2.0
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
