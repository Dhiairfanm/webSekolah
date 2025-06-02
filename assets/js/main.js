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
    title: "Pendaftaran Siswa Baru Tahun Ajaran 2024/2025 Dibuka!",
    category: "Pengumuman",
    date: "2024-05-30",
    image: "https://placehold.co/600x400/ADD8E6/000000?text=Pendaftaran",
    snippet: "SMPN 264 Jakarta dengan bangga mengumumkan pembukaan pendaftaran siswa baru untuk tahun ajaran 2024/2025. Segera daftarkan putra-putri Anda!",
    content: "Pendaftaran siswa baru di SMPN 264 Jakarta untuk tahun ajaran 2024/2025 telah resmi dibuka. Kami mengundang calon siswa dan orang tua untuk mengunjungi situs web sekolah kami atau datang langsung ke sekretariat pendaftaran. Berbagai program unggulan dan fasilitas modern siap mendukung perkembangan akademik dan non-akademik siswa. Jangan lewatkan kesempatan ini untuk bergabung dengan keluarga besar SMPN 264 Jakarta! Detail lengkap mengenai persyaratan dan jadwal dapat ditemukan di halaman PSB kami.",
    comments: [{
        name: "Budi Santoso",
        text: "Berita yang sangat informatif! Terima kasih.",
        date: "2024-06-01T10:00:00Z"
      },
      {
        name: "Siti Aminah",
        text: "Semoga pendaftaran berjalan lancar.",
        date: "2024-06-01T11:30:00Z"
      }
    ]
  },
  {
    id: 2,
    title: "Perlombaan Sains Tingkat Kota Berlangsung Sukses",
    category: "Prestasi",
    date: "2024-05-28",
    image: "https://placehold.co/600x400/90EE90/000000?text=Sains",
    snippet: "Siswa-siswi SMPN 264 Jakarta menunjukkan performa luar biasa dalam perlombaan sains tingkat kota, meraih beberapa penghargaan.",
    content: "Perlombaan Sains Tingkat Kota yang diadakan minggu lalu menjadi ajang pembuktian bagi bakat-bakat muda dari SMPN 264 Jakarta. Tim perwakilan sekolah berhasil meraih juara 1 dalam kategori Fisika dan juara 3 dalam kategori Biologi. Prestasi ini merupakan hasil kerja keras dan dedikasi siswa serta bimbingan dari guru-guru pembimbing. Selamat kepada para pemenang! Kami berharap mereka dapat terus menginspirasi siswa lain.",
    comments: [{
      name: "Guru Pembimbing",
      text: "Bangga sekali dengan pencapaian anak-anak!",
      date: "2024-06-01T14:00:00Z"
    }]
  },
  {
    id: 3,
    title: "Kegiatan Ekstrakurikuler Baru: Klub Robotika",
    category: "Kegiatan",
    date: "2024-05-25",
    image: "https://placehold.co/600x400/FFD700/000000?text=Robotika",
    snippet: "SMPN 264 Jakarta meluncurkan klub robotika baru untuk mengembangkan minat siswa dalam teknologi dan rekayasa.",
    content: "Untuk memperkaya pengalaman belajar siswa, SMPN 264 Jakarta kini resmi meluncurkan klub robotika. Klub ini akan menjadi wadah bagi siswa yang tertarik pada dunia teknologi, pemrograman, dan rekayasa. Dengan bimbingan dari instruktur ahli, siswa akan belajar merancang, membangun, dan memprogram robot. Mari bergabung dan wujudkan ide-ide inovatif Anda! Pendaftaran dibuka setiap hari kerja.",
    comments: []
  },
  {
    id: 4,
    title: "Workshop Penulisan Kreatif untuk Siswa Kelas 9",
    category: "Akademik",
    date: "2024-05-20",
    image: "https://placehold.co/600x400/FFB6C1/000000?text=Menulis",
    snippet: "Workshop intensif diadakan untuk meningkatkan kemampuan menulis kreatif siswa kelas 9, persiapan menghadapi ujian.",
    content: "Dalam rangka mempersiapkan siswa kelas 9 menghadapi ujian akhir dan mengembangkan potensi menulis mereka, SMPN 264 Jakarta menyelenggarakan workshop penulisan kreatif. Workshop ini menghadirkan penulis profesional yang berbagi tips dan teknik menulis efektif. Diharapkan, kegiatan ini dapat memotivasi siswa untuk lebih mencintai dunia literasi dan meningkatkan nilai ujian mereka.",
    comments: [{
      name: "Orang Tua Siswa",
      text: "Acara yang sangat bermanfaat untuk anak-anak.",
      date: "2024-05-21T09:00:00Z"
    }]
  },
  {
    id: 5,
    title: "Pengumuman Libur Hari Raya Idul Adha",
    category: "Pengumuman",
    date: "2024-06-10",
    image: "https://placehold.co/600x400/DDA0DD/000000?text=Libur",
    snippet: "Sekolah akan diliburkan pada tanggal 17-18 Juni 2024 dalam rangka Hari Raya Idul Adha.",
    content: "Diberitahukan kepada seluruh siswa, guru, dan staf SMPN 264 Jakarta bahwa kegiatan belajar mengajar akan diliburkan pada tanggal 17 dan 18 Juni 2024 dalam rangka memperingati Hari Raya Idul Adha 1445 H. Kegiatan sekolah akan kembali normal pada tanggal 19 Juni 2024. Selamat merayakan Idul Adha bagi yang merayakan. Mohon diperhatikan jadwal ini.",
    comments: []
  },
  {
    id: 6,
    title: "Tim Basket Putri Meraih Juara 2 di Turnamen Antar Sekolah",
    category: "Prestasi",
    date: "2024-05-15",
    image: "https://placehold.co/600x400/B0C4DE/000000?text=Basket",
    snippet: "Tim basket putri SMPN 264 Jakarta menunjukkan semangat juang tinggi dan berhasil meraih posisi kedua.",
    content: "Tim basket putri SMPN 264 Jakarta kembali menorehkan prestasi gemilang dengan meraih juara 2 dalam Turnamen Basket Antar Sekolah se-Jakarta Selatan. Pertandingan final yang sengit menunjukkan kegigihan dan kerja sama tim yang solid. Kami bangga dengan pencapaian ini dan berharap dapat terus meningkatkan prestasi di masa mendatang. Dukungan dari seluruh warga sekolah sangat berarti.",
    comments: [{
      name: "Pelatih Basket",
      text: "Luar biasa! Terus berlatih dan raih juara 1!",
      date: "2024-05-16T18:00:00Z"
    }]
  },
  {
    id: 7,
    title: "Kunjungan Edukasi ke Museum Nasional",
    category: "Kegiatan",
    date: "2024-05-10",
    image: "https://placehold.co/600x400/C0C0C0/000000?text=Museum",
    snippet: "Siswa kelas 7 dan 8 melakukan kunjungan edukasi ke Museum Nasional untuk memperkaya pengetahuan sejarah dan budaya.",
    content: "Sebagai bagian dari program pembelajaran interaktif, siswa kelas 7 dan 8 SMPN 264 Jakarta baru-baru ini mengunjungi Museum Nasional. Kunjungan ini bertujuan untuk memberikan pengalaman belajar langsung tentang sejarah, seni, dan budaya Indonesia. Para siswa sangat antusias mengikuti tur dan sesi diskusi yang diadakan. Kegiatan ini diharapkan dapat menumbuhkan rasa cinta tanah air dan wawasan yang lebih luas.",
    comments: []
  },
  {
    id: 8,
    title: "Jadwal Ujian Akhir Semester Genap",
    category: "Akademik",
    date: "2024-06-05",
    image: "https://placehold.co/600x400/FFDAB9/000000?text=Ujian",
    snippet: "Informasi lengkap mengenai jadwal Ujian Akhir Semester (UAS) Genap untuk semua tingkatan kelas.",
    content: "Diberitahukan kepada seluruh siswa SMPN 264 Jakarta, jadwal Ujian Akhir Semester (UAS) Genap telah dirilis. Ujian akan dilaksanakan mulai tanggal 24 Juni hingga 28 Juni 2024. Mohon persiapkan diri dengan baik dan pastikan untuk memeriksa jadwal yang telah ditempel di papan pengumuman sekolah atau diakses melalui portal siswa. Selamat belajar dan semoga sukses!",
    comments: []
  },
  {
    id: 9,
    title: "Perayaan Hari Guru Nasional di SMPN 264 Jakarta",
    category: "Kegiatan",
    date: "2024-11-25",
    image: "assets/img/berita/berita-2.jpeg",
    snippet: "SMPN 264 Jakarta merayakan Hari Guru Nasional dengan berbagai kegiatan dan apresiasi untuk para pahlawan tanpa tanda jasa.",
    content: "Pada tanggal 25 November, seluruh warga SMPN 264 Jakarta dengan penuh suka cita merayakan Hari Guru Nasional. Berbagai acara seperti upacara bendera, penampilan seni dari siswa, dan pemberian penghargaan kepada guru-guru berprestasi diselenggarakan untuk menghormati dedikasi dan pengabdian para pendidik. Acara berlangsung meriah dan penuh kehangatan, menunjukkan rasa terima kasih yang mendalam dari siswa dan orang tua.",
    comments: [{
      name: "Alumni 2020",
      text: "Selamat Hari Guru! Kenangan indah bersama bapak/ibu guru.",
      date: "2024-11-25T15:00:00Z"
    }]
  },
  {
    id: 10,
    title: "Program Tahunan 'Jumat Bersih' Digelar Kembali",
    category: "Umum",
    date: "2024-05-03",
    image: "https://placehold.co/600x400/F0E68C/000000?text=Jumat+Bersih",
    snippet: "Program 'Jumat Bersih' kembali dilaksanakan untuk menjaga kebersihan dan kenyamanan lingkungan sekolah.",
    content: "Dalam upaya menjaga kebersihan dan menciptakan lingkungan belajar yang nyaman, SMPN 264 Jakarta secara rutin menggelar program 'Jumat Bersih'. Seluruh siswa, guru, dan staf berpartisipasi aktif dalam membersihkan area sekolah. Kegiatan ini tidak hanya bertujuan untuk kebersihan, tetapi juga untuk menumbuhkan rasa tanggung jawab dan kebersamaan di antara warga sekolah. Mari kita jaga kebersihan sekolah kita bersama!",
    comments: []
  },
  {
    id: 11,
    title: "Pembukaan Kelas Coding untuk Siswa",
    category: "Akademik",
    date: "2025-05-20", // Most recent
    image: "https://placehold.co/1200x400/AEC6CF/000000?text=Kelas+Coding",
    snippet: "SMPN 264 Jakarta meluncurkan kelas coding baru untuk mempersiapkan siswa menghadapi era digital.",
    content: "Merespon perkembangan teknologi yang pesat, SMPN 264 Jakarta dengan bangga membuka kelas coding bagi siswa-siswi. Program ini akan memperkenalkan dasar-dasar pemrograman, logika komputasi, dan pengembangan aplikasi sederhana. Diharapkan, kelas ini dapat membekali siswa dengan keterampilan digital yang relevan dan menumbuhkan minat mereka di bidang teknologi informasi.",
    comments: []
  }, {
    id: 12,
    title: "Festival Seni dan Budaya Sekolah",
    category: "Kegiatan",
    date: "2025-05-15", // Second most recent
    image: "https://placehold.co/1200x400/FFDAB9/000000?text=Festival+Seni",
    snippet: "Festival Seni dan Budaya tahunan SMPN 264 Jakarta sukses digelar dengan berbagai penampilan menarik.",
    content: "SMPN 264 Jakarta kembali menggelar Festival Seni dan Budaya yang meriah. Acara ini menampilkan beragam bakat siswa dalam seni tari, musik, teater, dan pameran karya seni rupa. Festival ini bertujuan untuk mengembangkan kreativitas siswa dan melestarikan budaya lokal. Antusiasme penonton sangat tinggi, menunjukkan dukungan penuh terhadap kegiatan positif ini.",
    comments: []
  }, {
    id: 13,
    title: "Pengumuman Hasil Ujian Nasional",
    category: "Pengumuman",
    date: "2025-05-10", // Third most recent
    image: "https://placehold.co/1200x400/D8BFD8/000000?text=Hasil+Ujian",
    snippet: "Hasil Ujian Nasional untuk siswa kelas 9 telah diumumkan. Selamat kepada para siswa yang telah lulus!",
    content: "Dengan ini diumumkan bahwa hasil Ujian Nasional untuk siswa kelas 9 SMPN 264 Jakarta telah tersedia. Para siswa dapat melihat hasilnya melalui portal sekolah atau datang langsung ke sekolah. Kami mengucapkan selamat kepada seluruh siswa yang telah berhasil menyelesaikan pendidikan di jenjang SMP. Semoga sukses dalam melanjutkan pendidikan ke jenjang yang lebih tinggi.",
    comments: []
  }
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