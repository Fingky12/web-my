let semuaProyek = [];
let filterAktif = "all";

function renderProyek(data) {
  const container = document.getElementById("project-container");
  const search = document.getElementById("search").value.toLowerCase();
  container.innerHTML = "";

  const hasil = data.filter(item => {
    const cocokJudul = item.judul.toLowerCase().includes(search);
    const cocokKategori = filterAktif === "all" || item.kategori === filterAktif;
    return cocokJudul && cocokKategori;
  });

  if (hasil.length === 0) {
    container.innerHTML = "<p>Tidak ada proyek ditemukan.</p>";
    return;
  }

  hasil.forEach(item => {
    const card = document.createElement("div");
    card.className = "project-card";
    const btn = item.link
      ? `<a class="btn-demo" href="${item.link}" target="_blank">🔗 Lihat Demo</a>`
      : `<span class="btn-demo disabled">🚧 Belum tersedia</span>`;

    card.innerHTML = `
      <h3><i class="fas ${item.ikon}"></i> ${item.judul}</h3>
      <p>${item.deskripsi}</p>
      <p class="info-tag">
        <span class="badge">${item.kategori}</span>
        <span class="badge badge-secondary">${item.tahun}</span>
      </p>
      ${btn}
    `;
    container.appendChild(card);
  });
}

function filterKategori(kat) {
  filterAktif = kat;
  renderProyek(semuaProyek);
}

function tambahProyek() {
  const proyekBaru = {
    judul: document.getElementById("judul").value,
    deskripsi: document.getElementById("deskripsi").value,
    ikon: document.getElementById("ikon").value,
    kategori: document.getElementById("kategori").value,
    tahun: document.getElementById("tahun").value,
    link: document.getElementById("link").value || null
  };

  semuaProyek.push(proyekBaru);
  localStorage.setItem("proyekUser", JSON.stringify(semuaProyek));
  renderProyek(semuaProyek);
  alert("Proyek berhasil ditambahkan!");
}

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([
    fetch("data.json").then(res => res.json()).catch(() => []),
    JSON.parse(localStorage.getItem("proyekUser") || "[]")
  ]).then(([jsonData, localData]) => {
    semuaProyek = [...jsonData, ...localData];
    renderProyek(semuaProyek);
  });

  document.getElementById("search").addEventListener("input", () => {
    renderProyek(semuaProyek);
  });
});

// 🌗 Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

// ✍️ Typing animation
const teks = ["Selamat Datang", "Di Web-My", "Portofolio Developer"];
let i = 0, j = 0, currentText = "", isDeleting = false;
function ketik() {
  const display = document.getElementById("type-text");
  if (i < teks.length) {
    currentText = teks[i];
    if (isDeleting) {
      display.innerText = currentText.substring(0, j--);
      if (j < 0) {
        isDeleting = false;
        i = (i + 1) % teks.length;
      }
    } else {
      display.innerText = currentText.substring(0, j++);
      if (j === currentText.length + 1) {
        isDeleting = true;
        setTimeout(ketik, 800);
        return;
      }
    }
    setTimeout(ketik, 120);
  }
}
if (document.getElementById("type-text")) ketik();

// 🌫️ Scroll fade
window.addEventListener("scroll", () => {
  document.querySelectorAll(".scroll-fade").forEach(el => {
    const posisi = el.getBoundingClientRect().top;
    if (posisi < window.innerHeight - 100) el.classList.add("active");
  });
});
