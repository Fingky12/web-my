function sayHello() {
  alert("Halo! Terima kasih sudah mengklik tombol 😄");
}

console.log("Web sederhana siap digunakan!");

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

function kirimWhatsApp() {
  const nama = document.querySelector("input[type='text']").value;
  const email = document.querySelector("input[type='email']").value;
  const pesan = document.querySelector("textarea").value;

  const noHP = "6282264513231"; // Ganti dengan nomor WhatsApp kamu (pakai 62)
  const teks = `Halo, saya ${nama} (${email}) ingin menghubungi Anda:\n\n${pesan}`;

  const url = `https://wa.me/${noHP}?text=${encodeURIComponent(teks)}`;

  window.open(url, "_blank");
}

// Jalankan hanya di proyek.html
if (document.body.classList.contains("project")) {
  fetch("data.json")
    .then((res) => res.json())
    .then((data) => {
      const container = document.querySelector(".project-grid");
      container.innerHTML = "";

      data.forEach((item) => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `
          <h3><i class="fas ${item.ikon}"></i> ${item.judul}</h3>
          <p>${item.deskripsi}</p>
          <a class="btn-demo" href="${item.link}" target="_blank">🔗 Lihat Demo</a>
        `;
        container.appendChild(card);
      });
    });
}
