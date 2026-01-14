
export interface SchoolFormData {
  type: 'school';
  daerah: string;
  nama_sekolah: string;
  tahun_ajaran_start: number;
  tahun_ajaran_end: number;
  // Siswa
  siswa_sd_advent: number; siswa_sd_protestan: number; siswa_sd_katolik: number; siswa_sd_islam: number; siswa_sd_budha: number;
  siswa_smp_advent: number; siswa_smp_protestan: number; siswa_smp_katolik: number; siswa_smp_islam: number; siswa_smp_budha: number;
  siswa_sma_advent: number; siswa_sma_protestan: number; siswa_sma_katolik: number; siswa_sma_islam: number; siswa_sma_budha: number;
  siswa_smk_advent: number; siswa_smk_protestan: number; siswa_smk_katolik: number; siswa_smk_islam: number; siswa_smk_budha: number;
  // Guru
  guru_sd_sma: number; guru_sd_d3: number; guru_sd_s1: number; guru_sd_s2: number;
  guru_smp_sma: number; guru_smp_d3: number; guru_smp_s1: number; guru_smp_s2: number;
  guru_sma_sma: number; guru_sma_d3: number; guru_sma_s1: number; guru_sma_s2: number;
  guru_smk_sma: number; guru_smk_d3: number; guru_smk_s1: number; guru_smk_s2: number;
  guru_sd_indeks: number; guru_sd_tetap: number; guru_sd_honor: number;
  guru_smp_indeks: number; guru_smp_tetap: number; guru_smp_honor: number;
  guru_sma_indeks: number; guru_sma_tetap: number; guru_sma_honor: number;
  guru_smk_indeks: number; guru_smk_tetap: number; guru_smk_honor: number;
  // Tenaga Kependidikan (Staff)
  staf_sd_sma: number; staf_sd_d3: number; staf_sd_s1: number; staf_sd_s2: number;
  staf_smp_sma: number; staf_smp_d3: number; staf_smp_s1: number; staf_smp_s2: number;
  staf_sma_sma: number; staf_sma_d3: number; staf_sma_s1: number; staf_sma_s2: number;
  staf_smk_sma: number; staf_smk_d3: number; staf_smk_s1: number; staf_smk_s2: number;
  staf_sd_indeks: number; staf_sd_tetap: number; staf_sd_honor: number;
  staf_smp_indeks: number; staf_smp_tetap: number; staf_smp_honor: number;
  staf_sma_indeks: number; staf_sma_tetap: number; staf_sma_honor: number;
  staf_smk_indeks: number; staf_smk_tetap: number; staf_smk_honor: number;
  // KPA
  kpa_sd: number;
  kpa_smp: number;
  kpa_sma: number;
  kpa_smk: number;
  timestamp?: string;
}

export interface BaptismFormData {
  type: 'baptism';
  daerah: string;
  nama_sekolah: string;
  tanggal_laporan: string;
  baptis_sd_total: number;
  baptis_smp_total: number;
  baptis_sma_total: number;
  baptis_smk_total: number;
  timestamp?: string;
}



export interface FormStatus {
  loading: boolean;
  success: boolean;
  error: string | null;
}
