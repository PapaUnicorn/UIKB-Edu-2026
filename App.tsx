
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';



const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        {/* Header */}
        <header className="bg-slate-900 text-white shadow-xl sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/dashboard" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <div className="bg-emerald-500 p-2 rounded-lg shadow-inner">
                <i className="fas fa-chart-line text-2xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tighter uppercase">Statistik UIKB 2026</h1>
                <p className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">Pendidikan & Pelayanan</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
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
    </Router>
  );
};

export default App;
