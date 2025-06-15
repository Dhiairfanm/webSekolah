(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })



  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });
})()

// Mock News Data (replace with actual data from a backend or API)
// Each news item now includes a 'comments' array
const newsData = [{
    id: 1,
    title: "Penerimaan Peserta Didik Baru (PPDB) SMPN 264 Jakarta Tahun Ajaran 2024 / 2025 ",
    category: "Pengumuman",
    date: "2024-05-30",
    image: "assets/img/berita/pengumuman1.png",
    snippet: "Proses Penerimaan Peserta Didik Baru (PPDB) untuk tahun ajaran 2024/2025 di SMPN 264 Jakarta telah dimulai",
    content: "Menandai babak baru bagi calon siswa-siswi yang ingin melanjutkan pendidikan di salah satu sekolah menengah pertama favorit di Jakarta. Sosialisasi dan persiapan PPDB ini menjadi fokus utama dalam memastikan kelancaran dan transparansi proses seleksi. Sebagaimana terlihat dalam sebuah kegiatan yang kemungkinan merupakan bagian dari sosialisasi PPDB, para staf pengajar dan panitia tampak aktif terlibat dalam memberikan informasi kepada masyarakat.",
    comments: [{
        name: "Budi Santoso",
        text: "Berita yang sangat informatif! Terima kasih.",
        date: "2024-06-01T10:00:00Z"
      },
      {
        name: "Siti Aminah",
        text: "Semoga penerimaan berjalan lancar.",
        date: "2024-06-01T11:30:00Z"
      }
    ]
  },
  {
    id: 2,
    title: "Penghargaan Perlombaan Literasi dan Numerasi Mendapat Peringkat 1",
    category: "Prestasi",
    date: "2024-04-01",
    image: "assets/img/berita/prestasi1.jpg",
    snippet: "Hawa Sucita, Siswi SMPN 264 Jakarta, Sabet Peringkat 1 Kompetisi Literasi dan Numerasi Se-Jakarta Barat",
    content: "Kabar gembira datang dari dunia pendidikan Jakarta Barat. Hawa Sucita, siswi berbakat dari SMPN 264 Jakarta, berhasil menorehkan prestasi gemilang dengan meraih peringkat pertama dalam Kompetisi Literasi dan Numerasi tingkat Jakarta Barat tahun 2024. Prestasi membanggakan ini menunjukkan keunggulan Hawa dalam menguasai kemampuan literasi dan numerasi yang merupakan fondasi penting dalam dunia pendidikan.Kompetisi ini sendiri diselenggarakan dengan tujuan untuk mengasah dan mengukur kemampuan siswa dalam memahami teks, menganalisis data, serta memecahkan masalah matematis.",
    comments: [{
      name: "Guru Pembimbing",
      text: "Bangga sekali dengan pencapaianmu nak!",
      date: "2024-06-01T14:00:00Z"
    }]
  },
  {
    id: 3,
    title: "Kegiatan MPLS di SMPN 264 Jakarta",
    category: "Kegiatan",
    date: "2024-07-11",
    image: "assets/img/berita/kegiatan1.png",
    snippet: "MPLS SMPN 264 Jakarta Semarak dengan Tarian Daerah, Sambut Peserta Didik Baru Penuh Semangat.",
    content: "Masa Pengenalan Lingkungan Sekolah (MPLS) di SMP Negeri 264 Jakarta tahun ajaran 2024-2025 diselenggarakan dengan meriah dan penuh kehangatan. Salah satu sorotan utama dalam kegiatan penyambutan peserta didik baru ini adalah penampilan tarian daerah yang memukau, menunjukkan kekayaan budaya Indonesia.",
    comments: []
  },
  {
    id: 4,
    title: "SMPN 264 Jakarta Gelar Ujian Semester Berbasis Komputer,",
    category: "Akademik",
    date: "2024-05-19",
    image: "assets/img/berita/akademik1.png",
    snippet: "SMPN 264 Jakarta kembali menunjukkan komitmennya dalam mengadopsi teknologi modern di bidang pendidikan dengan sukses melaksanakan Ujian Semester secara digital ",
    content: "Implementasi sistem ujian berbasis teknologi ini menjadi langkah strategis sekolah untuk meningkatkan efisiensi proses evaluasi, akurasi penilaian, serta membiasakan siswa dengan lingkungan ujian yang relevan di era digital. Penerapan ujian semester berbasis komputer ini membawa berbagai keunggulan, di antaranya adalah efisiensi waktu dalam distribusi soal dan pengumpulan jawaban, serta akurasi yang lebih tinggi dalam proses penilaian. Selain itu, langkah ini juga berkontribusi pada upaya sekolah untuk mengurangi penggunaan kertas dan mendukung program ramah lingkungan.",
    comments: [{
      name: "Orang Tua Siswa",
      text: "Semoga yang ikut ujian lulu semua, aamiin",
      date: "2024-05-21T09:00:00Z"
    }]
  },
  {
    id: 5,
    title: "SMPN 264 Jakarta Terapkan Ujian Mid Semester Berbasis Ponsel ",
    category: "Akademik",
    date: "2024-09-27",
    image: "assets/img/berita/akademik2.png",
    snippet: "SMPN 264 Jakarta kembali berinovasi dalam pelaksanaan evaluasi akademik dengan menggelar Ujian Mid Semester (UTS) yang memanfaatkan perangkat ponsel pintar siswa",
    content: "Penerapan ujian berbasis ponsel ini merupakan salah satu upaya SMPN 264 Jakarta untuk beradaptasi dengan kemajuan teknologi dan mempersiapkan siswa menghadapi tantangan di masa depan. Metode ini tidak hanya mengurangi penggunaan kertas dan biaya cetak, tetapi juga memberikan pengalaman ujian yang lebih interaktif dan relevan bagi generasi digital.",
    comments: []
  },
  {
    id: 6,
    title: "Perwakilan SMPN 264 Jakarta Raih Juara 1 dan 2 di Puncak Perayaan Hari Anak Nasional Tingkat Kota Jakarta Barat 2024 ",
    category: "Prestasi",
    date: "2024-07-23",
    image: "assets/img/berita/prestasi2.png",
    snippet: "SMPN 264 Jakarta kembali mengukir prestasi membanggakan dengan meraih Juara 1 dan Juara 2 dalam ajang perlombaan yang diselenggarakan pada Puncak Perayaan Hari Anak Nasional (HAN) tingkat Kota Jakarta Barat Tahun 2024",
    content: "Prestasi ganda yang diraih oleh perwakilan SMPN 264 Jakarta ini merupakan bukti nyata dari dedikasi siswa, bimbingan guru, serta dukungan penuh dari pihak sekolah dalam mengembangkan minat dan bakat peserta didik. Keberhasilan ini diharapkan dapat menjadi motivasi bagi seluruh siswa-siswi SMPN 264 Jakarta untuk terus berkarya dan berprestasi di berbagai bidang.",
    comments: [{
      name: "Bu Anggi",
      text: "Luar biasa! dan Selamat!",
      date: "2024-08-16T18:00:00Z"
    }]
  },
  {
    id: 7,
    title: "Simulasi Pemadaman Kebakaran di SMPN 264 Jakarta ",
    category: "Kegiatan",
    date: "2024-06-10",
    image: "assets/img/berita/kegiatan3.png",
    snippet: "SMPN 264 Jakarta menggelar simulasi pemadaman kebakaran yang melibatkan siswa dan dipandu langsung oleh petugas dari Dinas Pemadam Kebakaran (Damkar).",
    content: "Kegiatan ini berfokus pada penanganan awal kebocoran gas yang berpotensi menimbulkan api, sebuah skenario yang penting untuk dipahami oleh seluruh warga sekolah. Kegiatan ini bertujuan untuk memberikan pemahaman praktis kepada siswa tentang cara penanganan api kecil, khususnya yang berasal dari kebocoran tabung gas.",
    comments: []
  },

  {
    id: 8,
    title: "Perayaan Hari Guru Nasional di SMPN 264 Jakarta",
    category: "Kegiatan",
    date: "2024-11-25",
    image: "assets/img/berita/kegiatan2.png",
    snippet: "SMPN 264 Jakarta merayakan Hari Guru Nasional dengan berbagai kegiatan dan apresiasi untuk para pahlawan tanpa tanda jasa.",
    content: "Pada tanggal 25 November, seluruh warga SMPN 264 Jakarta dengan penuh suka cita merayakan Hari Guru Nasional. Berbagai acara seperti upacara bendera, penampilan seni dari siswa, dan pemberian penghargaan kepada guru-guru berprestasi diselenggarakan untuk menghormati dedikasi dan pengabdian para pendidik. Acara berlangsung meriah dan penuh kehangatan, menunjukkan rasa terima kasih yang mendalam dari siswa dan orang tua.",
    comments: [{
      name: "Alumni 2020",
      text: "Selamat Hari Guru! Kenangan indah bersama bapak/ibu guru.",
      date: "2024-11-25T15:00:00Z"
    }]
  },

  {
    id: 9,
    title: "Pemilihan Ketua Osis 2024/2025 di SMPN 264 Jakarta",
    category: "Kegiatan",
    date: "2024-09-05",
    image: "assets/img/berita/kegiatan4.png",
    snippet: "Suasana demokratis menyelimuti SMPN 264 Jakarta hari ini dengan digelarnya pemilihan Ketua OSIS untuk periode 2024-2025.",
    content: "Proses pemilihan yang berlangsung secara langsung dan transparan ini menjadi ajang edukasi bagi siswa-siswi mengenai pentingnya partisipasi dalam menentukan pemimpin. Diharapkan, dengan pemilihan yang demokratis ini, Ketua OSIS terpilih dapat menjalankan amanah dengan baik, membawa perubahan positif, serta menjadi representasi suara siswa dalam memajukan SMPN 264 Jakarta.",
    comments: []
  },
  // {
  //   id: 10,
  //   title: "Program Tahunan 'Jumat Bersih' Digelar Kembali",
  //   category: "Umum",
  //   date: "2024-05-03",
  //   image: "https://placehold.co/600x400/F0E68C/000000?text=Jumat+Bersih",
  //   snippet: "Program 'Jumat Bersih' kembali dilaksanakan untuk menjaga kebersihan dan kenyamanan lingkungan sekolah.",
  //   content: "Dalam upaya menjaga kebersihan dan menciptakan lingkungan belajar yang nyaman, SMPN 264 Jakarta secara rutin menggelar program 'Jumat Bersih'. Seluruh siswa, guru, dan staf berpartisipasi aktif dalam membersihkan area sekolah. Kegiatan ini tidak hanya bertujuan untuk kebersihan, tetapi juga untuk menumbuhkan rasa tanggung jawab dan kebersamaan di antara warga sekolah. Mari kita jaga kebersihan sekolah kita bersama!",
  //   comments: []
  // },
  // {
  //   id: 11,
  //   title: "Pembukaan Kelas Coding untuk Siswa",
  //   category: "Akademik",
  //   date: "2025-05-20", // Most recent
  //   image: "https://placehold.co/1200x400/AEC6CF/000000?text=Kelas+Coding",
  //   snippet: "SMPN 264 Jakarta meluncurkan kelas coding baru untuk mempersiapkan siswa menghadapi era digital.",
  //   content: "Merespon perkembangan teknologi yang pesat, SMPN 264 Jakarta dengan bangga membuka kelas coding bagi siswa-siswi. Program ini akan memperkenalkan dasar-dasar pemrograman, logika komputasi, dan pengembangan aplikasi sederhana. Diharapkan, kelas ini dapat membekali siswa dengan keterampilan digital yang relevan dan menumbuhkan minat mereka di bidang teknologi informasi.",
  //   comments: []
  // }, {
  //   id: 12,
  //   title: "Festival Seni dan Budaya Sekolah",
  //   category: "Kegiatan",
  //   date: "2025-05-15", // Second most recent
  //   image: "https://placehold.co/1200x400/FFDAB9/000000?text=Festival+Seni",
  //   snippet: "Festival Seni dan Budaya tahunan SMPN 264 Jakarta sukses digelar dengan berbagai penampilan menarik.",
  //   content: "SMPN 264 Jakarta kembali menggelar Festival Seni dan Budaya yang meriah. Acara ini menampilkan beragam bakat siswa dalam seni tari, musik, teater, dan pameran karya seni rupa. Festival ini bertujuan untuk mengembangkan kreativitas siswa dan melestarikan budaya lokal. Antusiasme penonton sangat tinggi, menunjukkan dukungan penuh terhadap kegiatan positif ini.",
  //   comments: []
  // }, {
  //   id: 13,
  //   title: "Pengumuman Hasil Ujian Nasional",
  //   category: "Pengumuman",
  //   date: "2025-05-10", // Third most recent
  //   image: "https://placehold.co/1200x400/D8BFD8/000000?text=Hasil+Ujian",
  //   snippet: "Hasil Ujian Nasional untuk siswa kelas 9 telah diumumkan. Selamat kepada para siswa yang telah lulus!",
  //   content: "Dengan ini diumumkan bahwa hasil Ujian Nasional untuk siswa kelas 9 SMPN 264 Jakarta telah tersedia. Para siswa dapat melihat hasilnya melalui portal sekolah atau datang langsung ke sekolah. Kami mengucapkan selamat kepada seluruh siswa yang telah berhasil menyelesaikan pendidikan di jenjang SMP. Semoga sukses dalam melanjutkan pendidikan ke jenjang yang lebih tinggi.",
  //   comments: []
  // }
];

let currentCategory = 'Semua';
let searchQuery = '';

const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search-input');
const categoryFilter = document.getElementById('category-filter');
const noResultsMessage = document.getElementById('no-results');

// Function to render news articles
function renderNews() {
  newsContainer.innerHTML = '';
  noResultsMessage.classList.add('hidden'); // Hide no results message initially

  const filteredNews = newsData.filter(news => {
    const matchesCategory = (currentCategory === 'Semua' || news.category === currentCategory);
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredNews.length === 0) {
    noResultsMessage.classList.remove('hidden'); // Show no results message
    return;
  }

  filteredNews.forEach(news => {
    const newsCardCol = document.createElement('div');
    newsCardCol.className = 'col'; // Bootstrap column class for grid layout

    const newsCard = document.createElement('div');
    newsCard.className = 'news-card card h-100 shadow-sm'; // Bootstrap card classes
    newsCard.innerHTML = `
        <img src="${news.image}" class="card-img-top" alt="${news.title}" onerror="this.onerror=null;this.src='https://placehold.co/600x400/cccccc/333333?text=Gambar+Tidak+Tersedia';">
        <div class="card-body d-flex flex-column">
            <span class="badge bg-primary text-white mb-2 align-self-start">${news.category}</span>
            <h5 class="card-title fw-semibold">${news.title}</h5>
            <p class="card-subtitle text-muted mb-3">${new Date(news.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p class="card-text news-snippet flex-grow-1">${news.snippet}</p>
            <p class="card-text news-full-content hidden flex-grow-1">${news.content}</p>
            <div class="comments-section hidden mt-3">
                <h6 class="fw-bold mb-2">Komentar:</h6>
                <div class="comments-list mb-3">
                    <!-- Comments will be rendered here by renderComments() -->
                </div>
                <div class="add-comment-form">
                    <h6 class="fw-bold mb-2">Tambahkan Komentar:</h6>
                    <div class="mb-2">
                        <input type="text" class="form-control form-control-sm comment-name-input" placeholder="Nama Anda">
                    </div>
                    <div class="mb-2">
                        <textarea class="form-control form-control-sm comment-text-input" rows="2" placeholder="Tulis komentar Anda..."></textarea>
                    </div>
                    <button class="btn btn-primary btn-sm add-comment-btn" data-news-id="${news.id}">Kirim Komentar</button>
                    <p class="error-message text-danger small mt-2 hidden"></p>
                </div>
            </div>
            <button class="read-more-btn btn btn-link p-0 text-decoration-none text-primary align-self-start" data-id="${news.id}">Baca Selengkapnya</button>
        </div>
    `;
    newsCardCol.appendChild(newsCard);
    newsContainer.appendChild(newsCardCol);
  });

  // Add event listeners for "Baca Selengkapnya" buttons
  document.querySelectorAll('.read-more-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const cardBody = event.target.closest('.card-body');
      const snippet = cardBody.querySelector('.news-snippet');
      const fullContent = cardBody.querySelector('.news-full-content');
      const commentsSection = cardBody.querySelector('.comments-section');
      const newsId = parseInt(event.target.dataset.id);

      if (snippet.classList.contains('hidden')) {
        // Currently showing full content and comments, switch to snippet
        snippet.classList.remove('hidden');
        fullContent.classList.add('hidden');
        commentsSection.classList.add('hidden');
        event.target.textContent = 'Baca Selengkapnya';
      } else {
        // Currently showing snippet, switch to full content and comments
        snippet.classList.add('hidden');
        fullContent.classList.remove('hidden');
        commentsSection.classList.remove('hidden');
        event.target.textContent = 'Sembunyikan';
        renderComments(newsId); // Render comments when full content is shown
      }
    });
  });

  // Add event listeners for "Kirim Komentar" buttons
  document.querySelectorAll('.add-comment-btn').forEach(button => {
    button.addEventListener('click', handleAddComment);
  });
}

// Function to render comments for a specific news item
function renderComments(newsId) {
  const newsItem = newsData.find(item => item.id === newsId);
  if (!newsItem) return;

  const card = document.querySelector(`.read-more-btn[data-id="${newsId}"]`).closest('.news-card');
  const commentsListDiv = card.querySelector('.comments-list');
  commentsListDiv.innerHTML = ''; // Clear existing comments

  if (newsItem.comments && newsItem.comments.length > 0) {
    newsItem.comments.forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.className = 'card card-body p-2 mb-2 comment-card'; // Bootstrap card for comments
      commentDiv.innerHTML = `
            <p class="mb-0 small fw-bold">${comment.name} <span class="text-muted fw-normal ms-2">${new Date(comment.date).toLocaleString('id-ID')}</span></p>
            <p class="mb-0 small">${comment.text}</p>
        `;
      commentsListDiv.appendChild(commentDiv);
    });
  } else {
    commentsListDiv.innerHTML = '<p class="text-muted small">Belum ada komentar.</p>';
  }
}

// Function to handle adding a new comment
function handleAddComment(event) {
  const newsId = parseInt(event.target.dataset.newsId);
  const cardBody = event.target.closest('.card-body');
  const nameInput = cardBody.querySelector('.comment-name-input');
  const textInput = cardBody.querySelector('.comment-text-input');
  const errorMessageElement = cardBody.querySelector('.error-message');

  const name = nameInput.value.trim();
  const text = textInput.value.trim();

  errorMessageElement.classList.add('hidden'); // Hide any previous error message

  if (name && text) {
    const newsItem = newsData.find(item => item.id === newsId);
    if (newsItem) {
      if (!newsItem.comments) {
        newsItem.comments = [];
      }
      newsItem.comments.push({
        name: name,
        text: text,
        date: new Date().toISOString() // Use ISO string for consistent date format
      });
      renderComments(newsId); // Re-render comments for this news item
      nameInput.value = ''; // Clear form
      textInput.value = '';
    }
  } else {
    errorMessageElement.textContent = 'Nama dan komentar tidak boleh kosong.';
    errorMessageElement.classList.remove('hidden');
  }
}

// Event listener for search input
searchInput.addEventListener('input', (event) => {
  searchQuery = event.target.value.trim();
  renderNews();
});

// Event listener for category filter buttons
categoryFilter.addEventListener('click', (event) => {
  if (event.target.classList.contains('category-button')) {
    // Remove active class from all buttons and revert to light style
    document.querySelectorAll('.category-button').forEach(btn => {
      btn.classList.remove('active', 'btn-primary');
      btn.classList.add('btn-light');
    });

    // Add active class to the clicked button and apply primary style
    event.target.classList.add('active', 'btn-primary');
    event.target.classList.remove('btn-light');

    currentCategory = event.target.dataset.category;
    renderNews();
  }
});

// Initial render of news when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', renderNews);

const chatAiButton = document.getElementById('chat-ai-button');
const chatAiModal = document.getElementById('chat-ai-modal');
const closeChatAiModalButton = document.getElementById('close-chat-ai-modal');
const chatAiMessages = document.getElementById('chat-ai-messages');
const chatAiInput = document.getElementById('chat-ai-input');
const chatAiSendButton = document.getElementById('chat-ai-send-button');
const chatAiLoading = document.getElementById('chat-ai-loading');

let chatHistory = []; // To store the conversation history

// Function to add a message to the chat display
function addChatMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `d-flex mb-2 ${sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`;
  messageDiv.innerHTML = `<div class="p-2 rounded ${sender === 'user' ? 'bg-primary text-white' : 'bg-light text-dark'}">${message}</div>`;
  chatAiMessages.appendChild(messageDiv);
  chatAiMessages.scrollTop = chatAiMessages.scrollHeight; // Scroll to bottom
}

// Function to send message to AI
async function sendMessageToAI() {
  const userMessage = chatAiInput.value.trim();
  if (userMessage === '') return;

  addChatMessage('user', userMessage);
  chatAiInput.value = ''; // Clear input

  chatAiLoading.classList.remove('hidden'); // Show loading indicator

  chatHistory.push({
    role: "user",
    parts: [{
      text: userMessage
    }]
  });

  const payload = {
    contents: chatHistory
  };
  const apiKey = "AIzaSyB3-Nb-kQzw8qbqCmZgdJ_6XeUVt7aeulk"; // If you want to use models other than gemini-2.0-flash or imagen-3.0-generate-002, provide an API key here. Otherwise, leave this as-is.
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    chatAiLoading.classList.add('hidden'); // Hide loading indicator

    if (result.candidates && result.candidates.length > 0 &&
      result.candidates[0].content && result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0) {
      const aiResponse = result.candidates[0].content.parts[0].text;
      addChatMessage('ai', aiResponse);
      chatHistory.push({
        role: "model",
        parts: [{
          text: aiResponse
        }]
      });
    } else {
      addChatMessage('ai', 'Maaf, saya tidak dapat memahami pertanyaan Anda. Bisakah Anda mengulanginya?');
      console.error('Unexpected AI response structure:', result);
    }
  } catch (error) {
    chatAiLoading.classList.add('hidden'); // Hide loading indicator
    addChatMessage('ai', 'Maaf, terjadi kesalahan saat berkomunikasi dengan AI. Silakan coba lagi nanti.');
    console.error('Error fetching AI response:', error);
  }
}

// Event listeners for AI Chatbot
chatAiButton.addEventListener('click', () => {
  chatAiModal.style.display = 'flex'; // Show the chat modal
  chatAiInput.focus(); // Focus on the input field
});

closeChatAiModalButton.addEventListener('click', () => {
  chatAiModal.style.display = 'none'; // Hide the chat modal
});

chatAiSendButton.addEventListener('click', sendMessageToAI);

chatAiInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendMessageToAI();
  }
});