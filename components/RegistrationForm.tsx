
import React, { useState } from 'react';
import { FormData } from '../types';

interface RegistrationFormProps {
  onSubmit: (data: FormData) => void;
  isSubmitting: boolean;
}

const INITIAL_STATE: FormData = {
  daerah: '',
  nama_sekolah: '',
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
  baptis_sd_total: 0, baptis_smp_total: 0, baptis_sma_total: 0,
  kpa_sd: 0, kpa_smp: 0, kpa_sma: 0
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<FormData>(INITIAL_STATE);

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
  const inputClasses = "w-full px-3 py-2 border rounded focus:ring-2 focus:ring-emerald-500 outline-none transition-all";
  const tableTh = "bg-slate-800 text-white text-xs p-2 text-center font-semibold";
  const tableTd = "p-1 border";
  const statInput = "w-full text-center p-1 text-sm border-none focus:ring-0 focus:bg-emerald-50 bg-transparent";

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Header Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-xl border-l-4 border-emerald-500">
        <div>
          <label className={labelClasses}>Konferens / Daerah</label>
          <select required name="daerah" value={formData.daerah} onChange={handleChange} className={inputClasses}>
            <option value="">-- Pilih Daerah --</option>
            <option value="JBC">JBC (Jakarta Banten)</option>
            <option value="CSM">CSM (Central Sumatera)</option>
            <option value="NSM">NSM (North Sumatera)</option>
            <option value="ESM">ESM (Eastern Sumatera)</option>
            <option value="SSM">SSM (South Sumatera)</option>
          </select>
        </div>
        <div>
          <label className={labelClasses}>Nama Sekolah</label>
          <input required type="text" name="nama_sekolah" value={formData.nama_sekolah} onChange={handleChange} placeholder="Contoh: SMA Advent Jakarta" className={inputClasses} />
        </div>
      </div>

      {/* Section 1: Siswa */}
      <section>
        <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center">
          <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3 text-sm">1</span>
          Data Siswa TA 2025-2026
        </h3>
        <div className="overflow-x-auto rounded-lg border shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={tableTh}>Agama</th>
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
                <tr key={row.key} className="hover:bg-slate-50">
                  <td className="p-3 border font-medium text-sm text-slate-700">{row.label}</td>
                  <td className={tableTd}><input type="number" name={`siswa_sd_${row.key}`} value={formData[`siswa_sd_${row.key}` as keyof FormData]} onChange={handleChange} className={statInput} /></td>
                  <td className={tableTd}><input type="number" name={`siswa_smp_${row.key}`} value={formData[`siswa_smp_${row.key}` as keyof FormData]} onChange={handleChange} className={statInput} /></td>
                  <td className={tableTd}><input type="number" name={`siswa_sma_${row.key}`} value={formData[`siswa_sma_${row.key}` as keyof FormData]} onChange={handleChange} className={statInput} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 2: Guru */}
      <section>
        <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center">
          <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3 text-sm">2</span>
          Data Guru (Pendidik)
        </h3>
        <div className="overflow-x-auto rounded-lg border shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={tableTh}>Kategori</th>
                <th className={tableTh}>SD</th>
                <th className={tableTh}>SMP</th>
                <th className={tableTh}>SMA</th>
                <th className={tableTh}>SMK</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-slate-100"><td colSpan={5} className="p-2 font-bold text-xs uppercase text-slate-500">Pendidikan Terakhir</td></tr>
              {['d3', 's1', 's2'].map(lvl => (
                <tr key={lvl} className="hover:bg-slate-50">
                  <td className="p-3 border text-sm capitalize">Tamatan {lvl.toUpperCase()}</td>
                  {['sd', 'smp', 'sma', 'smk'].map(unit => (
                    <td key={unit} className={tableTd}><input type="number" name={`guru_${unit}_${lvl}`} value={formData[`guru_${unit}_${lvl}` as keyof FormData]} onChange={handleChange} className={statInput} /></td>
                  ))}
                </tr>
              ))}
              <tr className="bg-slate-100"><td colSpan={5} className="p-2 font-bold text-xs uppercase text-slate-500">Status Kepegawaian</td></tr>
              {['indeks', 'tetap', 'honor'].map(status => (
                <tr key={status} className="hover:bg-slate-50">
                  <td className="p-3 border text-sm capitalize">{status}</td>
                  {['sd', 'smp', 'sma', 'smk'].map(unit => (
                    <td key={unit} className={tableTd}><input type="number" name={`guru_${unit}_${status}`} value={formData[`guru_${unit}_${status}` as keyof FormData]} onChange={handleChange} className={statInput} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Staff */}
      <section>
        <h3 className="text-lg font-bold text-emerald-700 mb-4 flex items-center">
          <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3 text-sm">3</span>
          Data Staff (Non-Pendidik)
        </h3>
        <div className="overflow-x-auto rounded-lg border shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={tableTh}>Kategori</th>
                <th className={tableTh}>SD</th>
                <th className={tableTh}>SMP</th>
                <th className={tableTh}>SMA</th>
                <th className={tableTh}>SMK</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-slate-100"><td colSpan={5} className="p-2 font-bold text-xs uppercase text-slate-500">Pendidikan Terakhir</td></tr>
              {['sma', 'd3', 's1'].map(lvl => (
                <tr key={lvl} className="hover:bg-slate-50">
                  <td className="p-3 border text-sm capitalize">Tamatan {lvl.toUpperCase()}</td>
                  {['sd', 'smp', 'sma', 'smk'].map(unit => (
                    <td key={unit} className={tableTd}><input type="number" name={`staf_${unit}_${lvl}`} value={formData[`staf_${unit}_${lvl}` as keyof FormData]} onChange={handleChange} className={statInput} /></td>
                  ))}
                </tr>
              ))}
              <tr className="bg-slate-100"><td colSpan={5} className="p-2 font-bold text-xs uppercase text-slate-500">Status Kepegawaian</td></tr>
              {['indeks', 'tetap', 'honor'].map(status => (
                <tr key={status} className="hover:bg-slate-50">
                  <td className="p-3 border text-sm capitalize">{status}</td>
                  {['sd', 'smp', 'sma', 'smk'].map(unit => (
                    <td key={unit} className={tableTd}><input type="number" name={`staf_${unit}_${status}`} value={formData[`staf_${unit}_${status}` as keyof FormData]} onChange={handleChange} className={statInput} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 4: Baptisan & KPA */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 bg-blue-50 rounded-xl border border-blue-100">
          <h4 className="font-bold text-blue-800 mb-4 flex items-center">
            <i className="fas fa-tint mr-2"></i> Total Baptisan Siswa
          </h4>
          <div className="space-y-3">
            {['sd', 'smp', 'sma'].map(unit => (
              <div key={unit} className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600 uppercase">Unit {unit}</span>
                <input type="number" name={`baptis_${unit}_total`} value={formData[`baptis_${unit}_total` as keyof FormData]} onChange={handleChange} className="w-24 p-2 border rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-100">
          <h4 className="font-bold text-emerald-800 mb-4 flex items-center">
            <i className="fas fa-users mr-2"></i> Jumlah KPA / Care Group
          </h4>
          <div className="space-y-3">
            {['sd', 'smp', 'sma'].map(unit => (
              <div key={unit} className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600 uppercase">Unit {unit}</span>
                <input type="number" name={`kpa_${unit}`} value={formData[`kpa_${unit}` as keyof FormData]} onChange={handleChange} className="w-24 p-2 border rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-5 rounded-xl text-white font-bold text-xl shadow-xl transition-all flex items-center justify-center ${
          isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 active:transform active:scale-95'
        }`}
      >
        {isSubmitting ? <><i className="fas fa-spinner fa-spin mr-3"></i> Mengirim Laporan...</> : <><i className="fas fa-paper-plane mr-3"></i> KIRIM LAPORAN SEKARANG</>}
      </button>
    </form>
  );
};

export default RegistrationForm;
