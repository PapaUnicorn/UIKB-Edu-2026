
// --- KONFIGURASI ---
var SPREADSHEET_ID = '1GS5bukiMhGia7xYVK2WrhnsDprhTHejJRiHNzUMpbGM';

function doPost(e) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  try {
    var data = JSON.parse(e.postData.contents);
    var sheetName = (data.type === 'baptism') ? 'BAPTISM' : 'SCHOOLDATA';
    var sheet = ss.getSheetByName(sheetName);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    var row = [];
    
    if (data.type === 'school') {
      // Structure for SCHOOLDATA
      row = [
        data.timestamp,
        data.daerah,
        data.nama_sekolah,
        data.tahun_ajaran_start + "/" + data.tahun_ajaran_end,
        // SISWA
        data.siswa_sd_advent, data.siswa_sd_protestan, data.siswa_sd_katolik, data.siswa_sd_islam, data.siswa_sd_budha,
        data.siswa_smp_advent, data.siswa_smp_protestan, data.siswa_smp_katolik, data.siswa_smp_islam, data.siswa_smp_budha,
        data.siswa_sma_advent, data.siswa_sma_protestan, data.siswa_sma_katolik, data.siswa_sma_islam, data.siswa_sma_budha,
        // GURU EDU
        data.guru_sd_d3, data.guru_sd_s1, data.guru_sd_s2,
        data.guru_smp_d3, data.guru_smp_s1, data.guru_smp_s2,
        data.guru_sma_d3, data.guru_sma_s1, data.guru_sma_s2,
        data.guru_smk_d3, data.guru_smk_s1, data.guru_smk_s2,
        // GURU STATUS
        data.guru_sd_indeks, data.guru_sd_tetap, data.guru_sd_honor,
        data.guru_smp_indeks, data.guru_smp_tetap, data.guru_smp_honor,
        data.guru_sma_indeks, data.guru_sma_tetap, data.guru_sma_honor,
        data.guru_smk_indeks, data.guru_smk_tetap, data.guru_smk_honor,
        // STAF EDU
        data.staf_sd_sma, data.staf_sd_d3, data.staf_sd_s1,
        data.staf_smp_sma, data.staf_smp_d3, data.staf_smp_s1,
        data.staf_sma_sma, data.staf_sma_d3, data.staf_sma_s1,
        data.staf_smk_sma, data.staf_smk_d3, data.staf_smk_s1,
        // STAF STATUS
        data.staf_sd_indeks, data.staf_sd_tetap, data.staf_sd_honor,
        data.staf_smp_indeks, data.staf_smp_tetap, data.staf_smp_honor,
        data.staf_sma_indeks, data.staf_sma_tetap, data.staf_sma_honor,
        data.staf_smk_indeks, data.staf_smk_tetap, data.staf_smk_honor,
        // KPA
        data.kpa_sd, data.kpa_smp, data.kpa_sma
      ];
    } else {
      // Structure for BAPTISM
      row = [
        data.timestamp,
        data.daerah,
        data.nama_sekolah,
        data.tanggal_laporan,
        data.baptis_sd_total,
        data.baptis_smp_total,
        data.baptis_sma_total
      ];
    }
    
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({result: 'success', sheet: sheetName}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({result: 'error', error: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
