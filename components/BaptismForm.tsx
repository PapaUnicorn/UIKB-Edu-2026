
import React, { useState } from 'react';
import { BaptismFormData } from '../types';

interface BaptismFormProps {
  onSubmit: (data: BaptismFormData) => void;
  isSubmitting: boolean;
}

const INITIAL_STATE: BaptismFormData = {
  type: 'baptism',
  daerah: '',
  nama_sekolah: '',
  tanggal_laporan: new Date().toISOString().split('T')[0],
  baptis_sd_total: 0,
  baptis_smp_total: 0,
  baptis_sma_total: 0,
  baptis_smk_total: 0
};

const BaptismForm: React.FC<BaptismFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<BaptismFormData>(INITIAL_STATE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'number' ? parseInt(value) || 0 : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const labelClasses = "block text-sm font-bold text-slate-700 mb-2";
  const inputClasses = "w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div>
          <label className={labelClasses}>Konferens / Daerah</label>
          <select required name="daerah" value={formData.daerah} onChange={handleChange} className={inputClasses}>
            <option value="">-- Pilih Daerah Pelapor --</option>
            <option value="JBC">JBC (Jakarta Banten Conference)</option>
            <option value="CSM">CSM (Central Sumatera Mission)</option>
            <option value="NSM">NSM (North Sumatera Mission)</option>
            <option value="ESM">ESM (Eastern Sumatera Mission)</option>
            <option value="SSM">SSM (South Sumatera Mission)</option>
          </select>
        </div>
        <div>
          <label className={labelClasses}>Nama Sekolah</label>
          <input required type="text" name="nama_sekolah" value={formData.nama_sekolah} onChange={handleChange} placeholder="Pahoman Adventist School" className={inputClasses} />
        </div>
        <div>
          <label className={labelClasses}>Tanggal Laporan</label>
          <input required type="date" name="tanggal_laporan" value={formData.tanggal_laporan} onChange={handleChange} className={inputClasses} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl border border-slate-200 shadow-sm">
        <h4 className="font-bold text-blue-700 mb-8 flex items-center text-xl justify-center">
          <i className="fas fa-tint mr-3"></i> Total Baptisan Siswa
        </h4>
        <div className="space-y-6">
          {['sd', 'smp', 'sma', 'smk'].map(unit => (
            <div key={unit} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
              <span className="text-sm font-black text-blue-800 uppercase tracking-widest">Unit {unit.toUpperCase()}</span>
              <input type="number" name={`baptis_${unit}_total`} value={formData[`baptis_${unit}_total` as keyof BaptismFormData] as any} onChange={handleChange} className="w-40 px-6 py-3 border border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-300 outline-none text-center font-bold text-lg bg-white shadow-inner" />
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-5 rounded-2xl text-white font-black text-xl shadow-2xl transition-all flex items-center justify-center ${
          isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:transform active:scale-95'
        }`}
      >
        {isSubmitting ? <><i className="fas fa-spinner fa-spin mr-3"></i> Mengirim Data...</> : <><i className="fas fa-save mr-3"></i> SIMPAN DATA BAPTISAN</>}
      </button>
    </form>
  );
};

export default BaptismForm;
