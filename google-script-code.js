
// --- KONFIGURASI ---
var SPREADSHEET_ID = '1_Jh6Ol1B4w-cIY9GQMOCsC44d8w9x3Uc4ti63WzA3ss';

function doPost(e) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  try {
    var data = JSON.parse(e.postData.contents);
    var sheetName = (data.type === 'baptism') ? 'BAPTISM' : 'SCHOOLDATA';
    var sheet = ss.getSheetByName(sheetName);

    // Buat sheet jika belum ada
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    // Cek apakah sheet masih kosong (untuk buat Header)
    if (sheet.getLastRow() === 0) {
      var headers = [];
      if (data.type === 'school') {
        headers = [
          "Timestamp", "Daerah", "Nama Sekolah", "Tahun Ajaran",
          "Siswa SD Advent", "Siswa SD Protestan", "Siswa SD Katolik", "Siswa SD Islam", "Siswa SD Budha",
          "Siswa SMP Advent", "Siswa SMP Protestan", "Siswa SMP Katolik", "Siswa SMP Islam", "Siswa SMP Budha",
          "Siswa SMA Advent", "Siswa SMA Protestan", "Siswa SMA Katolik", "Siswa SMA Islam", "Siswa SMA Budha",
          "Siswa SMK Advent", "Siswa SMK Protestan", "Siswa SMK Katolik", "Siswa SMK Islam", "Siswa SMK Budha",
          "Guru SD SMA", "Guru SD D3", "Guru SD S1", "Guru SD S2",
          "Guru SMP SMA", "Guru SMP D3", "Guru SMP S1", "Guru SMP S2",
          "Guru SMA SMA", "Guru SMA D3", "Guru SMA S1", "Guru SMA S2",
          "Guru SMK SMA", "Guru SMK D3", "Guru SMK S1", "Guru SMK S2",
          "Guru SD Indeks", "Guru SD Tetap", "Guru SD Honor",
          "Guru SMP Indeks", "Guru SMP Tetap", "Guru SMP Honor",
          "Guru SMA Indeks", "Guru SMA Tetap", "Guru SMA Honor",
          "Guru SMK Indeks", "Guru SMK Tetap", "Guru SMK Honor",
          "Staf SD SMA", "Staf SD D3", "Staf SD S1", "Staf SD S2",
          "Staf SMP SMA", "Staf SMP D3", "Staf SMP S1", "Staf SMP S2",
          "Staf SMA SMA", "Staf SMA D3", "Staf SMA S1", "Staf SMA S2",
          "Staf SMK SMA", "Staf SMK D3", "Staf SMK S1", "Staf SMK S2",
          "Staf SD Indeks", "Staf SD Tetap", "Staf SD Honor",
          "Staf SMP Indeks", "Staf SMP Tetap", "Staf SMP Honor",
          "Staf SMA Indeks", "Staf SMA Tetap", "Staf SMA Honor",
          "Staf SMK Indeks", "Staf SMK Tetap", "Staf SMK Honor",
          "KPA SD", "KPA SMP", "KPA SMA", "KPA SMK"
        ];
      } else {
        headers = [
          "Timestamp", "Daerah", "Nama Sekolah", "Tanggal Laporan",
          "Total Baptis SD", "Total Baptis SMP", "Total Baptis SMA", "Total Baptis SMK"
        ];
      }
      sheet.appendRow(headers);
      // Format header agar tebal dan berwarna
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#e2e8f0");
    }

    var row = [];
    if (data.type === 'school') {
      row = [
        data.timestamp,
        data.daerah,
        data.nama_sekolah,
        data.tahun_ajaran_start + "/" + data.tahun_ajaran_end,
        data.siswa_sd_advent, data.siswa_sd_protestan, data.siswa_sd_katolik, data.siswa_sd_islam, data.siswa_sd_budha,
        data.siswa_smp_advent, data.siswa_smp_protestan, data.siswa_smp_katolik, data.siswa_smp_islam, data.siswa_smp_budha,
        data.siswa_sma_advent, data.siswa_sma_protestan, data.siswa_sma_katolik, data.siswa_sma_islam, data.siswa_sma_budha,
        data.siswa_smk_advent, data.siswa_smk_protestan, data.siswa_smk_katolik, data.siswa_smk_islam, data.siswa_smk_budha,
        data.guru_sd_sma, data.guru_sd_d3, data.guru_sd_s1, data.guru_sd_s2,
        data.guru_smp_sma, data.guru_smp_d3, data.guru_smp_s1, data.guru_smp_s2,
        data.guru_sma_sma, data.guru_sma_d3, data.guru_sma_s1, data.guru_sma_s2,
        data.guru_smk_sma, data.guru_smk_d3, data.guru_smk_s1, data.guru_smk_s2,
        data.guru_sd_indeks, data.guru_sd_tetap, data.guru_sd_honor,
        data.guru_smp_indeks, data.guru_smp_tetap, data.guru_smp_honor,
        data.guru_sma_indeks, data.guru_sma_tetap, data.guru_sma_honor,
        data.guru_smk_indeks, data.guru_smk_tetap, data.guru_smk_honor,
        data.staf_sd_sma, data.staf_sd_d3, data.staf_sd_s1, data.staf_sd_s2,
        data.staf_smp_sma, data.staf_smp_d3, data.staf_smp_s1, data.staf_smp_s2,
        data.staf_sma_sma, data.staf_sma_d3, data.staf_sma_s1, data.staf_sma_s2,
        data.staf_smk_sma, data.staf_smk_d3, data.staf_smk_s1, data.staf_smk_s2,
        data.staf_sd_indeks, data.staf_sd_tetap, data.staf_sd_honor,
        data.staf_smp_indeks, data.staf_smp_tetap, data.staf_smp_honor,
        data.staf_sma_indeks, data.staf_sma_tetap, data.staf_sma_honor,
        data.staf_smk_indeks, data.staf_smk_tetap, data.staf_smk_honor,
        data.kpa_sd, data.kpa_smp, data.kpa_sma, data.kpa_smk
      ];
    } else {
      row = [
        data.timestamp,
        data.daerah,
        data.nama_sekolah,
        data.tanggal_laporan,
        data.baptis_sd_total,
        data.baptis_smp_total,
        data.baptis_sma_total,
        data.baptis_smk_total
      ];
    }

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ result: 'success', sheet: sheetName }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheetName = e.parameter.sheetName || 'SCHOOLDATA'; // Default to SCHOOLDATA if not specified
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: 'Sheet not found: ' + sheetName }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var range = sheet.getDataRange();
    var values = range.getValues();
    var headers = values.shift(); // Get headers

    var data = values.map(function (row) {
      var obj = {};
      row.forEach(function (value, index) {
        // Simple header normalization (optional, but good for JSON keys)
        // var key = headers[index].toLowerCase().replace(/ /g, '_'); 
        // Using original headers as keys for now to match user request
        obj[headers[index]] = value;
      });
      return obj;
    });

    return ContentService.createTextOutput(JSON.stringify({ result: 'success', data: data }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ result: 'error', error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
