// GANTI DENGAN URL DEPLOYMENT ANDA YANG TEPAT
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzlkt7qCe0bqzez5_ThJ2OpKJ2GJwdcv0V7_sUtrZ0ntx4j0VOH9MAw8UibCO5GQNaE/exec';

const view = document.getElementById('vw');
const progress = document.getElementById('pg');
let rows = [], currentIndex = 0, lastHash = '';

function hash(obj) {
  try {
    return btoa(JSON.stringify(obj));
  } catch {
    return '';
  }
}

async function fetchData() {
  progress.style.display = 'block';
  
  try {
    console.log('Mengambil data dari:', SHEET_URL);
    const response = await fetch(SHEET_URL, { cache: 'no-store' });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Data diterima:', data);
    
    if (!Array.isArray(data) || data.length < 2) {
      console.warn('Data tidak valid atau kosong');
      progress.style.display = 'none';
      return;
    }

    const newHash = hash(data);
    if (newHash === lastHash) {
      console.log('Data tidak berubah, skip update');
      progress.style.display = 'none';
      return;
    }

    lastHash = newHash;
    
    // Ambil baris data (skip header)
    rows = data.slice(1).map(row => {
      // Ambil kolom 1, 2, 3 dan filter yang kosong
      return [row[0], row[1], row[2]].filter(cell => cell && String(cell).trim());
    }).filter(row => row.length > 0); // Hanya baris yang punya data
    
    console.log('Rows yang diproses:', rows);
    
    if (rows.length > 0) {
      show();
    } else {
      view.innerHTML = '<div class="l" style="color:#d32f2f;">⚠️ Tidak ada data tersedia</div>';
    }
    
  } catch (error) {
    console.error('Error fetching data:', error);
    view.innerHTML = '<div class="l" style="color:#d32f2f;">⚠️ Gagal memuat data</div>';
  } finally {
    setTimeout(() => progress.style.display = 'none', 300);
  }
}

function show() {
  if (!rows || rows.length === 0) {
    console.warn('No rows to show');
    return;
  }

  const content = rows[currentIndex].join(' • ');
  console.log('Menampilkan:', content);
  
  view.innerHTML = `<div class="l">${content || 'Data tidak tersedia'}</div>`;
  currentIndex = (currentIndex + 1) % rows.length;
}

// Jalankan saat load
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, fetching data...');
  fetchData();
  
  // Update data setiap 15 detik
  setInterval(fetchData, 15000);
  
  // Ganti tampilan setiap 3 detik
  setInterval(() => {
    if (rows.length > 0) show();
  }, 3000);
});
