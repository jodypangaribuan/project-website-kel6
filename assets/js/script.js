// LOGIC untuk keranjang
// ==================================================
// Inisialisasi Keranjang Posisi Masih Kosong
let value = 0;
let charts = [];

const modalChart = document.querySelector(".modal-chart");
const bag = document.querySelector(".bag");
if (bag) {
  bag.addEventListener("click", function () {
    modalChart.classList.toggle("show");
    if (charts.length >= 1) {
      document.querySelector(".modal-chart a").style.display = "inline-block";
    } else {
      document.querySelector(".modal-chart a").style.display = "none";
    }
    // Get database from Fetch into database
    let newdb = dataproduk.filter((item) => charts.includes(item.id));

    if (newdb.length !== 0) {
      // create element
      let element = newdb.map((item) => getChartList(item)).join("");
      document.querySelector(".charts").innerHTML = element;
    }
  });
}

function getChartList(item) {
  return `<div class="chart-list">
  <img src="assets/images/produk/${item.gambar}">
  <div class="modal-detail">
    <h1>${item.nama}</h1>
    <h4>${item.tipe}</h4>
    <p>${item.harga}</p>
  </div>
</div>`;
}

// Ambil element keranjang
const keranjang = document.querySelector(".count");
// Looping keranjang Apabila btnkeranjang di klik MAKA keranjang bertambah
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("keranjang")) {
    // Ambil ID Barang
    let id_barang = e.target.dataset.id;
    // Cek apakah barang sudah ada di keranjang
    if (charts.includes(id_barang)) {
      alert("Sudah ada");
      return;
    }
    alert("Sukses Tambah ke keranjang");
    // Ambil ID dan tambahkan ke variabel sementeara
    charts.push(id_barang);

    if (charts.length > 2) {
      modalChart.style.height = "300px";
    } else {
      modalChart.style.height = "auto";
    }

    value += 1;
    keranjang.innerText = value;
  }

  if (e.target.classList.contains("load-more-products")) {
    showdata += 10;
    // check apakah sudah maksimal
    if (showdata > dataproduk.length + 1) return;
    let data = "";
    data += dataproduk
      .map((item, index) => {
        if (index < showdata) return GetProduk(item);
      })
      .join("");
    var produkkami = document.querySelector(".product-kami");
    if (produkkami) produkkami.innerHTML = data;
  }
});

// Logic Untuk Promo (membuat hitung mundur yang diupdate setiap 1 detik)
// ==================================================
var mytime = setInterval(() => {
  // Membuat objek Date untuk waktu saat ini
  const waktuSekarang = new Date();
  const tanggalSekarang = waktuSekarang.getDate();
  if (tanggalSekarang === 31) {
    document.querySelector(".hari").innerText = "0";
    document.querySelector(".jam").innerText = "0";
    document.querySelector(".menit").innerText = "0";
    document.querySelector(".detik").innerText = "0";
    clearInterval(mytime);
  }
  // Waktu Target
  const tanggalTertentu = new Date("2023-12-30T00:00:00");
  // Selisih waktu
  const selisihWaktu = tanggalTertentu - waktuSekarang;
  // Mengkonversi selisih waktu menjadi hari, jam, menit, dan detik
  var hari = Math.floor(selisihWaktu / (24 * 60 * 60 * 1000));
  var jam = Math.floor(
    (selisihWaktu % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  var menit = Math.floor((selisihWaktu % (60 * 60 * 1000)) / (60 * 1000));
  var detik = Math.floor((selisihWaktu % (60 * 1000)) / 1000);

  // Jika Html punya element hari
  if (document.querySelector(".hari")) {
    document.querySelector(".hari").innerText = hari;
    document.querySelector(".jam").innerText = jam;
    document.querySelector(".menit").innerText = menit;
    document.querySelector(".detik").innerText = detik;
  }
}, 1000);

// LOGIC UNTUK TESTIMONIAL
// ==================================================
// Ambil testimonial pertama
let element = document.querySelector(".testimonial-item");
// Ambil Semua Testimonial (Hasilkan Node List)
const testimonialitem = document.querySelectorAll(".testimonial-item");
// JIka Testimonial item ada isinya
if (testimonialitem.length != 0) {
  // Ambil testimonial yg diklik
  testimonialitem.forEach((item) =>
    item.addEventListener("click", function (e) {
      // Jika sebelumnya ada class aktif matikan
      if (element.classList.contains("active"))
        element.classList.remove("active");
      // class aktif akan ditambahkan pada element yg baru diklik
      e.preventDefault();
      var gambar = item.querySelector("img").src;
      var nama = item.querySelector("h3").innerText;
      var komentar = item.querySelector("p").innerText;
      this.classList.add("active");
      element = this;

      // masukan ke parent testimonial
      document.querySelector(".testimonial-card img").src = gambar;
      document.querySelector(".testimonial-card .testimonial-name").innerText =
        nama;
      document.querySelector(".testimonial-card .testimonial-desc").innerText =
        komentar;
    })
  );
}

// LOGIC UNTUK DATA PRODUK YANG DINAMIS
// =============================================================
// 1 Deklarasi Dulu Datanya
const dataproduk = [
  // Alat Bangunan
  {
    id: "1",
    tipe: "Alat Bangunan",
    gambar: "a_alatpenutupcat.webp",
    nama: "alat penutup cat",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "2",
    tipe: "Alat Bangunan",
    gambar: "a_alatukursudut.webp",
    nama: "alat ukur sudut",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "3",
    tipe: "Alat Bangunan",
    gambar: "a_borlistrik.webp",
    nama: "bor listrik",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "4",
    tipe: "Alat Bangunan",
    gambar: "a_bortanah.webp",
    nama: "bor tanah",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "5",
    tipe: "Alat Bangunan",
    gambar: "a_bortangan.webp",
    nama: "bor tangan",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "6",
    tipe: "Alat Bangunan",
    gambar: "a_catsemprot.webp",
    nama: "cat semprot",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "7",
    tipe: "Alat Bangunan",
    gambar: "a_cetakansemen.webp",
    nama: "cetakan semen",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "8",
    tipe: "Alat Bangunan",
    gambar: "a_gergajibesi.webp",
    nama: "gergaji besi",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "9",
    tipe: "Alat Bangunan",
    gambar: "a_gergajimesin2.webp",
    nama: "gergaji mesin",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "10",
    tipe: "Alat Bangunan",
    gambar: "a_gergajibesibulat.webp",
    nama: "gergaji besi bulat",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "11",
    tipe: "Alat Bangunan",
    gambar: "a_gergajikayu.webp",
    nama: "gergaji kayu",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "12",
    tipe: "Alat Bangunan",
    gambar: "a_kunciinggris.webp",
    nama: "kunci inggris",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "13",
    tipe: "Alat Bangunan",
    gambar: "a_kuncipas.webp",
    nama: "kunci pas",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "14",
    tipe: "Alat Bangunan",
    gambar: "a_mesinpotong.webp",
    nama: "mesin potong",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "15",
    tipe: "Alat Bangunan",
    gambar: "a_meteran.webp",
    nama: "meteran",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "16",
    tipe: "Alat Bangunan",
    gambar: "a_obeng.webp",
    nama: "obeng",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "17",
    tipe: "Alat Bangunan",
    gambar: "a_palu.webp",
    nama: "palu",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "18",
    tipe: "Alat Bangunan",
    gambar: "a_pemotongpipa.webp",
    nama: "pemotong pipa",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "19",
    tipe: "Alat Bangunan",
    gambar: "a_penggaris.webp",
    nama: "penggaris",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "21",
    tipe: "Alat Bangunan",
    gambar: "a_pensil.webp",
    nama: "pensil",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "22",
    tipe: "Alat Bangunan",
    gambar: "a_spatula.webp",
    nama: "spatula",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "23",
    tipe: "Alat Bangunan",
    gambar: "a_tanglas.webp",
    nama: "tanglas",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "24",
    tipe: "Alat Bangunan",
    gambar: "a_tangpemotongkawat.webp",
    nama: "tang pemotong kawat",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "25",
    tipe: "Alat Bangunan",
    gambar: "a_tangpipa.webp",
    nama: "tang pipa",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },

  // Bahan Bangunan
  {
    id: "26",
    tipe: "Bahan Bangunan",
    gambar: "b_waterheater.webp",
    nama: "water heater",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "27",
    tipe: "Bahan Bangunan",
    gambar: "b_triplek.webp",
    nama: "triplek",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "28",
    tipe: "Bahan Bangunan",
    gambar: "b_teralisjendela.webp",
    nama: "teralis jendela",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "29",
    tipe: "Bahan Bangunan",
    gambar: "b_semen.webp",
    nama: "semen",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "30",
    tipe: "Bahan Bangunan",
    gambar: "b_sekop.webp",
    nama: "sekop",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "31",
    tipe: "Bahan Bangunan",
    gambar: "b_plesterandinding.webp",
    nama: "plesteran dinding",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "32",
    tipe: "Bahan Bangunan",
    gambar: "b_pipatembaga.webp",
    nama: "pipa tembaga",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "33",
    tipe: "Bahan Bangunan",
    gambar: "b_pipapvc.webp",
    nama: "pipa pvc",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "34",
    tipe: "Bahan Bangunan",
    gambar: "b_pintukayu.webp",
    nama: "pintu kayu",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "35",
    tipe: "Bahan Bangunan",
    gambar: "b_perekatkeramik.webp",
    nama: "perekat keramik",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "36",
    tipe: "Bahan Bangunan",
    gambar: "b_pemotongkeramik.webp",
    nama: "pemotong keramik",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "37",
    tipe: "Bahan Bangunan",
    gambar: "b_pasir.webp",
    nama: "pasir",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "38",
    tipe: "Bahan Bangunan",
    gambar: "b_papangipsum.webp",
    nama: "papan gipsum",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "39",
    tipe: "Bahan Bangunan",
    gambar: "b_lisplang.webp",
    nama: "lisplang",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "40",
    tipe: "Bahan Bangunan",
    gambar: "b_keramiklantai.webp",
    nama: "keramik lantai",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "41",
    tipe: "Bahan Bangunan",
    gambar: "b_kacajendela.webp",
    nama: "kaca jendela",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "42",
    tipe: "Bahan Bangunan",
    gambar: "b_insulasipanas.webp",
    nama: "insulasi panas",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "43",
    tipe: "Bahan Bangunan",
    gambar: "b_genteng.webp",
    nama: "genteng",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "44",
    tipe: "Bahan Bangunan",
    gambar: "b_cattembok.webp",
    nama: "cat tembok",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "45",
    tipe: "Bahan Bangunan",
    gambar: "b_catpelapiskayu.webp",
    nama: "cat pelapis kayu",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "46",
    tipe: "Bahan Bangunan",
    gambar: "b_besibeton.webp",
    nama: "besi beton",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "47",
    tipe: "Bahan Bangunan",
    gambar: "b_batubata.webp",
    nama: "batu bata",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "48",
    tipe: "Bahan Bangunan",
    gambar: "b_balokkayu.webp",
    nama: "balok kayu",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "49",
    tipe: "Bahan Bangunan",
    gambar: "b_bajaringan.webp",
    nama: "baja ringan",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
  {
    id: "50",
    tipe: "Bahan Bangunan",
    gambar: "b_atapseng.webp",
    nama: "atap seng",
    hapus: `Rp ${Math.floor(Math.random() * (200 - 101 + 1)) + 101}.000`,
    harga: `Rp ${Math.floor(Math.random() * (100 - 50 + 1)) + 50}.000`,
    garansi: Math.floor(Math.random() * 7 + 1),
  },
];

document.addEventListener("DOMContentLoaded", (event) => {
  const produk9 = document.querySelector(".product-item.produk9");
  let hargaku = "";
  if (produk9) hargaku = produk9.querySelector(".price").innerText;
  const bannerku = document.querySelector(".banner-text");
  if (bannerku) bannerku.innerHTML = `Harga dimulai dari ${hargaku}`;

  isLogin();

  // Fitur Login
  const getlogouts = document.querySelectorAll(".getlogout");
  if (getlogouts.length !== 0) {
    getlogouts.forEach((item) =>
      item.addEventListener("click", function () {
        sessionStorage.removeItem("islogin");
      })
    );
  }

  const getlogin = document.querySelector(".getlogin");
  if (getlogin) {
    getlogin.addEventListener("click", function () {
      sessionStorage.setItem("islogin", "masuk");
    });
  }
});

// 2. Menyiapkan element untuk Variabel produk
function GetProduk(produk) {
  return `<div class="product-item produk${produk.id}">
  <img src="./assets/images/produk/${produk.gambar}" width="300">
  <div class="content">
    <a class="category">${produk.tipe}</a>
    <a href="detail.html?id=${produk.id}" class="title">${produk.nama}</a>
    <div class="price-box">
      <p class="price">${produk.harga}</p>
      <del>${produk.hapus}</del>
    </div>
    <div class="price-btn">
      <button class="addtochart keranjang" data-id="${produk.id}">Tambah Keranjang</button>
    </div>
  </div>
</div>`;
}

// 3. Menyiapkan variabel untuk membuat element dari data yg sudah ada
let produk = "";

// 4. Mengambil Nilai URL contoh (?kategori=all)
const url = window.location.search.split("=")[1];

// Ambil
let showdata = 10;

// 5. Ambil Produk Sesuai Output URL
if (url == "all" || !url) {
  // Ambil Semua Produk
  // produk += dataproduk.map((item, index) => {
  //   return GetProduk(item);
  // }).join('');

  produk += dataproduk
    .map((item, index) => {
      if (index < showdata) return GetProduk(item);
    })
    .join("");
} else if (url == "bahan") {
  // Ambil Bahan Bangunan Saja
  produk += dataproduk
    .map((item, index) => {
      if (item.tipe == "Bahan Bangunan") return GetProduk(item);
    })
    .join("");

  document.querySelector(".load-more-products").style.display = "none";
} else if (url == "alat") {
  // Ambil Alat Bangunan Saja
  produk += dataproduk
    .map((item) => {
      if (item.tipe == "Alat Bangunan") return GetProduk(item);
    })
    .join("");

  document.querySelector(".load-more-products").style.display = "none";
}

// 6. Isi Ke Produk kami

var produkkami = document.querySelector(".product-kami");
if (produkkami) produkkami.innerHTML = produk;

// 1. Untuk Detail Produk
const produkid = window.location.search.split("=")[1];

// 2. Siapkan element untuk detail produk
function GetDetail(produkitem) {
  let element = `<img src="./assets/images/produk/${produkitem.gambar}">
  <div class="detail"> 
    <!-- Bintang -->
    <p class="garansi">Garansi ${produkitem.garansi} Tahun</p>
    <a href="#">${produkitem.nama}</a>
    <p class="deskripsi">${produkitem.tipe}</p>
    <!-- Harga -->
    <div class="price-box">
      <p class="price">${produkitem.harga}</p>
      <del>${produkitem.hapus}</del>
    </div>
    <a href="checkout.html" class="btn-keranjang">Checkout</a>
  </div>`;
  document.querySelector(".product-detail-item").innerHTML = element;
}

// Jika ada produk ID
if (parseInt(produkid)) {
  let produkitem = dataproduk.find((item) => item.id == produkid);
  GetDetail(produkitem);
}

// Live search
// Fungsi untuk mencari barang dengan regex
const searchInput = document.querySelector(".search-field");
const searchbutton = document.querySelector(".search-btn");
if (searchInput || searchbutton) {
  searchbutton.addEventListener("click", function () {
    if (searchInput.value) {
      const query = searchInput.value.trim();
      searchBarang(query);
    }
  });
}

function searchBarang(query) {
  const results = [];
  const regex = new RegExp(query, "i"); // 'i' berarti pencarian bersifat case-insensitive
  const produks = dataproduk.filter((item) => regex.test(item.nama));
  var produkku = produks.map((item) => GetProduk(item)).join("");

  var produkkami = document.querySelector(".product-kami");

  if (produkkami) {
    produkkami.scrollIntoView({ behavior: "smooth" });
    produkkami.innerHTML = produkku;
  }
}

// Livechat Tawk TO
var Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/653ee8a4a84dd54dc4868654/1hdurph36";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();

Tawk_API.customStyle = {
  visibility: {
    //for desktop only
    desktop: {
      position: "br", // bottom-right
      xOffset: 25, // 15px away from right
      yOffset: 40, // 40px up from bottom
    },
    // for mobile only
    mobile: {
      position: "br", // bottom-left
      xOffset: 25, // 15px away from right
      yOffset: 9, // 40px up from bottom
    },
    // change settings of bubble if necessary
    bubble: {
      rotate: "0deg",
      xOffset: -20,
      yOffset: 0,
    },
  },
};

function LoginMobileElement() {
  return `<a href="login.html" class="action-btn">
    <ion-icon name="person" title="Login"></ion-icon>
    <span>Login</span>
  </a>`;
}
function LogoutMobileElement() {
  return `<a href="login.html" class="action-btn getlogout">
    <ion-icon name="person" title="Logout"></ion-icon>
    <span>Logout</span>
  </a>`;
}

function LoginDesktopElement() {
  return '<a href="login.html" class="menu-title loginstyle">Login</a>';
}

function LogoutDesktopElement() {
  return '<a href="login.html" class="menu-title loginstyle getlogout">Logout</a>';
}
// Cek User Login
function isLogin() {
  const islogin = document.querySelector(".islogin");
  const islogin2 = document.querySelector(".islogin2");
  console.log(sessionStorage.getItem("islogin"));
  if (islogin || islogin2) {
    if (sessionStorage.getItem("islogin")) {
      islogin.innerHTML = LogoutDesktopElement();
      islogin2.innerHTML = LogoutMobileElement();
    } else {
      islogin.innerHTML = LoginDesktopElement();
      islogin2.innerHTML = LoginMobileElement();
    }
  }
}
