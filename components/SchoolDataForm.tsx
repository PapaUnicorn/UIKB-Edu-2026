
import React, { useState } from 'react';
import { SchoolFormData } from '../types';

interface SchoolDataFormProps {
  onSubmit: (data: SchoolFormData) => void;
  isSubmitting: boolean;
}

const INITIAL_STATE: SchoolFormData = {
  type: 'school',
  daerah: '',
  nama_sekolah: '',
  tahun_ajaran_start: 2025,
  tahun_ajaran_end: 2026,
  siswa_sd_advent: 0, siswa_sd_protestan: 0, siswa_sd_katolik: 0, siswa_sd_islam: 0, siswa_sd_budha: 0,
  siswa_smp_advent: 0, siswa_smp_protestan: 0, siswa_smp_katolik: 0, siswa_smp_islam: 0, siswa_smp_budha: 0,
  siswa_sma_advent: 0, siswa_sma_protestan: 0, siswa_sma_katolik: 0, siswa_sma_islam: 0, siswa_sma_budha: 0,
  guru_sd_d3: 0, guru_sd_s1: 0, guru_sd_s2: 0,
  guru_smp_d3: 0, guru_smp_s1: 0, guru_smp_s2: 0,
  guru_sma_d3: 0, guru_sma_s1: 0, guru_sma_s2: 0,
  guru_smk_d3: 0, guru_smk_s1: 0, guru_smk_s2: 0,
  guru_sd_indeks: 0, guru_sd_tetap: 0, guru_sd_honor: 0,
  guru_smp_indeks: 0, guru_smp_tetap: 0, guru_smp_honor: 0,
  guru_sma_indeks: 0, guru_sma_tetap: 0, guru_sma_honor: 0,
  guru_smk_indeks: 0, guru_smk_tetap: 0, guru_smk_honor: 0,
  staf_sd_sma: 0, staf_sd_d3: 0, staf_sd_s1: 0,
  staf_smp_sma: 0, staf_smp_d3: 0, staf_smp_s1: 0,
  staf_sma_sma: 0, staf_sma_d3: 0, staf_sma_s1: 0,
  staf_smk_sma: 0, staf_smk_d3: 0, staf_smk_s1: 0,
  staf_sd_indeks: 0, staf_sd_tetap: 0, staf_sd_honor: 0,
  staf_smp_indeks: 0, staf_smp_tetap: 0, staf_smp_honor: 0,
  staf_sma_indeks: 0, staf_sma_tetap: 0, staf_sma_honor: 0,
  staf_smk_indeks: 0, staf_smk_tetap: 0, staf_smk_honor: 0,
  kpa_sd: 0, kpa_smp: 0, kpa_sma: 0
};

const SchoolDataForm: React.FC<SchoolDataFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<SchoolFormData>(INITIAL_STATE);

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
  const inputClasses = "w-full px-4 py-2 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all shadow-sm";
  const tableTh = "bg-slate-800 text-white text-xs p-3 text-center font-bold uppercase tracking-wider";
  const tableTd = "p-0 border border-slate-200";
  const statInput = "w-full text-center p-3 text-sm border-none focus:ring-2 focus:ring-emerald-200 bg-white hover:bg-slate-50 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
      {/* Header Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
        <div>
          <label className={labelClasses}>Konferens / Daerah</label>
          <select required name="daerah" value={formData.daerah} onChange={handleChange} className={inputClasses}>
            <option value="">-- Pilih Daerah --</option>
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
          <label className={labelClasses}>Tahun Ajaran</label>
          <div className="flex items-center space-x-2">
            <input required type="number" name="tahun_ajaran_start" value={formData.tahun_ajaran_start} onChange={handleChange} className={`${inputClasses} text-center`} placeholder="2025" min="2000" max="2100" />
            <span className="text-slate-400 font-bold">/</span>
            <input required type="number" name="tahun_ajaran_end" value={formData.tahun_ajaran_end} onChange={handleChange} className={`${inputClasses} text-center`} placeholder="2026" min="2000" max="2100" />
          </div>
        </div>
      </div>

      {/* Section 1: Siswa */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b flex items-center">
          <i className="fas fa-users text-emerald-600 mr-3"></i>
          <h3 className="text-lg font-bold text-slate-800">1. Data Siswa</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className={`${tableTh} text-left`}>Agama</th>
                <th className={tableTh}>SD (1-6)</th>
                <th className={tableTh}>SMP (7-9)</th>
                <th className={tableTh}>SMA (10-12)</th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Advent', key: 'advent' },
                { label: 'Protestan', key: 'protestan' },
                { label: 'Katolik', key: 'katolik' },
                { label: 'Islam', key: 'islam' },
                { label: 'Budha/Lain', key: 'budha' },
              ].map(row => (
                <tr key={row.key}>
                  <td className="p-4 border-b font-semibold text-sm text-slate-700 bg-slate-50/50 w-40">{row.label}</td>
                  <td className={tableTd}><input type="number" name={`siswa_sd_${row.key}`} value={formData[`siswa_sd_${row.key}` as keyof SchoolFormData] as any} onChange={handleChange} className={statInput} /></td>
                  <td className={tableTd}><input type="number" name={`siswa_smp_${row.key}`} value={formData[`siswa_smp_${row.key}` as keyof SchoolFormData] as any} onChange={handleChange} className={statInput} /></td>
                  <td className={tableTd}><input type="number" name={`siswa_sma_${row.key}`} value={formData[`siswa_sma_${row.key}` as keyof SchoolFormData] as any} onChange={handleChange} className={statInput} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Guru */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b flex items-center">
          <i className="fas fa-chalkboard-teacher text-emerald-600 mr-3"></i>
          <h3 className="text-lg font-bold text-slate-800">2. Data Guru (Pendidik)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className={`${tableTh} text-left`}>Kategori</th>
                <th className={tableTh}>SD</th>
                <th className={tableTh}>SMP</th>
                <th className={tableTh}>SMA</th>
                <th className={tableTh}>SMK</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-emerald-50"><td colSpan={5} className="p-2 font-bold text-xs uppercase text-emerald-700 text-center">Tingkat Pendidikan</td></tr>
              {['d3', 's1', 's2'].map(lvl => (
                <tr key={lvl}>
                  <td className="p-4 border-b text-sm font-medium text-slate-700 bg-slate-50/50">Tamatan {lvl.toUpperCase()}</td>
                  {['sd', 'smp', 'sma', 'smk'].map(unit => (
                    <td key={unit} className={tableTd}><input type="number" name={`guru_${unit}_${lvl}`} value={formData[`guru_${unit}_${lvl}` as keyof SchoolFormData] as any} onChange={handleChange} className={statInput} /></td>
                  ))}
                </tr>
              ))}
              <tr className="bg-emerald-50"><td colSpan={5} className="p-2 font-bold text-xs uppercase text-emerald-700 text-center">Status Kepegawaian</td></tr>
              {['indeks', 'tetap', 'honor'].map(status => (
                <tr key={status}>
                  <td className="p-4 border-b text-sm font-medium text-slate-700 bg-slate-50/50 capitalize">{status}</td>
                  {['sd', 'smp', 'sma', 'smk'].map(unit => (
                    <td key={unit} className={tableTd}><input type="number" name={`guru_${unit}_${status}`} value={formData[`guru_${unit}_${status}` as keyof SchoolFormData] as any} onChange={handleChange} className={statInput} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Staff (Tenaga Kependidikan) */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b flex items-center">
          <i className="fas fa-user-tie text-emerald-600 mr-3"></i>
          <h3 className="text-lg font-bold text-slate-800">3. Tenaga Kependidikan (Staff)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className={`${tableTh} text-left`}>Kategori</th>
                <th className={tableTh}>SD</th>
                <th className={tableTh}>SMP</th>
                <th className={tableTh}>SMA</th>
                <th className={tableTh}>SMK</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-slate-100"><td colSpan={5} className="p-2 font-bold text-xs uppercase text-slate-600 text-center">Tingkat Pendidikan</td></tr>
              {['sma', 'd3', 's1'].map(lvl => (
                <tr key={lvl}>
                  <td className="p-4 border-b text-sm font-medium text-slate-700 bg-slate-50/50">Tamatan {lvl.toUpperCase()}</td>
                  {['sd', 'smp', 'sma', 'smk'].map(unit => (
                    <td key={unit} className={tableTd}><input type="number" name={`staf_${unit}_${lvl}`} value={formData[`staf_${unit}_${lvl}` as keyof SchoolFormData] as any} onChange={handleChange} className={statInput} /></td>
                  ))}
                </tr>
              ))}
              <tr className="bg-slate-100"><td colSpan={5} className="p-2 font-bold text-xs uppercase text-slate-600 text-center">Status Kepegawaian</td></tr>
              {['indeks', 'tetap', 'honor'].map(status => (
                <tr key={status}>
                  <td className="p-4 border-b text-sm font-medium text-slate-700 bg-slate-50/50 capitalize">{status}</td>
                  {['sd', 'smp', 'sma', 'smk'].map(unit => (
                    <td key={unit} className={tableTd}><input type="number" name={`staf_${unit}_${status}`} value={formData[`staf_${unit}_${status}` as keyof SchoolFormData] as any} onChange={handleChange} className={statInput} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: KPA (Moved from Baptism) */}
      <section className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 shadow-sm">
        <h4 className="font-bold text-emerald-800 mb-6 flex items-center text-lg">
          <i className="fas fa-users-cog mr-3"></i> 4. Jumlah KPA / Care Group
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['sd', 'smp', 'sma'].map(unit => (
            <div key={unit} className="flex flex-col">
              <label className="text-xs font-bold text-emerald-700 uppercase mb-2">Unit {unit.toUpperCase()}</label>
              <input type="number" name={`kpa_${unit}`} value={formData[`kpa_${unit}` as keyof SchoolFormData] as any} onChange={handleChange} className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none text-center bg-white shadow-inner" placeholder="0" />
            </div>
          ))}
        </div>
      </section>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all flex items-center justify-center ${
          isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 active:transform active:scale-95'
        }`}
      >
        {isSubmitting ? <><i className="fas fa-spinner fa-spin mr-3"></i> Mengirim Data...</> : <><i className="fas fa-check-double mr-3"></i> SIMPAN STATISTIK SEKOLAH</>}
      </button>
    </form>
  );
};

export default SchoolDataForm;
