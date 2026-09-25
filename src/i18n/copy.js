// Single source of truth for all UI copy. `bm` and `en` must have identical key
// sets — scripts/check-i18n.js fails the build otherwise.
// Do not translate: the SSM number, the phone number, the business name.
// Placeholders use {name} syntax and are filled by t(key, vars).

export const copy = {
  bm: {
    meta: {
      title: 'FZS Success — Pembiayaan Peribadi Kerajaan & Swasta',
    },
    nav: {
      cta: 'Semak Kelayakan',
      ctaShort: 'Semak Layak',
      langLabel: 'Tukar bahasa',
      menu: {
        kalkulator: 'Kalkulator',
        siapa: 'Siapa kami bantu',
        cara: 'Cara ia berfungsi',
        dokumen: 'Dokumen',
        kenapa: 'Kenapa FZS',
        faq: 'Soalan lazim',
        hubungi: 'Hubungi',
      },
    },
    hero: {
      headline: 'Pembiayaan Peribadi Penjawat Awam & Swasta',
      sub: 'Kami bantu anda banding pakej pembiayaan daripada beberapa bank dan koperasi, dan uruskan permohonan dari awal hingga akhir.',
      cta: 'Semak Kelayakan Percuma',
      reassurance: 'Tiada bayaran pendahuluan. Semakan mengambil masa kurang 1 minit.',
      // Generic until a real consultant photo replaces the stock image.
      photoAlt: 'Seorang profesional tersenyum',
    },
    trust: {
      noFee: 'Tanpa bayaran pendahuluan',
      human: 'Perunding sebenar, bukan bot',
    },
    calc: {
      optional: 'Pilihan',
      toggleTitle: 'Kalkulator anggaran kelayakan',
      toggleSub: 'Nak tahu anggaran jumlah pembiayaan anda? Buka kalkulator ini.',
      intro: 'Masukkan butiran slip gaji anda untuk melihat anggaran. Ini anggaran kasar sahaja — perunding kami akan buat semakan sebenar.',
      gajiPokok: 'Gaji Pokok Bulanan (RM)',
      gajiPokokHelp: 'Gaji pokok sahaja, tidak termasuk elaun.',
      jumlahPotongan: 'Jumlah Potongan Bulanan (RM)',
      jumlahPotonganHelp: 'Semua potongan dalam slip gaji anda, termasuk KWSP dan pinjaman sedia ada.',
      umur: 'Umur',
      umurSuffix: 'tahun',
      lokasi: 'Lokasi Tempat Bertugas',
      lokasiBandar: 'Bandar',
      lokasiLuarBandar: 'Luar Bandar',
      lokasiHelp: 'Bandar: Kuala Lumpur, Putrajaya, Selangor, Pulau Pinang, Johor Bahru dan ibu negeri lain. Pilih Luar Bandar jika anda bertugas di kawasan luar bandar.',
      tempoh: 'Tempoh Pembiayaan',
      tempohValue: '{n} tahun',
      tempohMaxNote: 'Tempoh maksimum bagi umur anda: {n} tahun.',
      jenisPotongan: 'Jenis Potongan',
      jenisBpa: 'BPA / ANGKASA',
      jenisTerus: 'Potongan Gaji Terus',
      submit: 'Kira Anggaran',
      errors: {
        required: 'Sila isi ruangan ini.',
        minSalary: 'Gaji pokok minimum ialah RM {min}.',
        tooHigh: 'Jumlah potongan mesti kurang daripada gaji pokok.',
        ageRange: 'Umur mestilah antara {min} hingga {max} tahun.',
        summary: 'Sila semak ruangan yang ditanda.',
      },
    },
    result: {
      label: 'Anggaran kelayakan anda',
      badge: 'Anggaran',
      tenure: 'Berdasarkan tempoh {years} tahun',
      caveat: 'Ini anggaran sahaja dan bukan tawaran. Jumlah sebenar bergantung pada slip gaji, tempoh perkhidmatan, dan komitmen sedia ada yang perlu diselesaikan. Kelulusan dan kadar ditentukan oleh pihak bank.',
      dsr: 'Berdasarkan angka yang dimasukkan, potongan semasa anda terlalu tinggi untuk pembiayaan baru buat masa ini. Perunding kami masih boleh tengok pilihan lain dengan anda.',
      age: 'Umur anda melebihi had tempoh pembiayaan bagi pakej dalam panel kami. Hubungi kami untuk pilihan lain.',
      waCta: 'WhatsApp Perunding Kami',
      waMessage: 'Hi FZS Success, saya baru buat semakan kelayakan di laman web dan ingin tahu pilihan lain.',
    },
    lead: {
      eyebrow: 'Semakan percuma',
      heading: 'Mohon semakan kelayakan anda',
      intro: 'Isi borang ringkas ini. Perunding kami akan hubungi anda untuk semakan sebenar dengan bank — percuma, tanpa sebarang komitmen.',
      nama: 'Nama Penuh',
      telefon: 'Nombor Telefon Bimbit',
      telefonHelp: 'Contoh: 012-345 6789',
      emel: 'Alamat E-mel',
      emelHelp: 'Untuk kami hantar maklumat susulan.',
      majikan: 'Nama Majikan',
      majikanHelp: 'Contoh: Jabatan Pendidikan Negeri Selangor, Tenaga Nasional Berhad.',
      consent: 'Saya bersetuju FZS Success menghubungi saya berkenaan permohonan pembiayaan.',
      submit: 'Hantar untuk Semakan',
      sending: 'Menghantar…',
      privacy: 'Kami tidak meminta kad pengenalan atau slip gaji di sini.',
      errors: {
        nama: 'Sila masukkan nama anda (sekurang-kurangnya 3 huruf).',
        telefon: 'Sila masukkan nombor telefon bimbit Malaysia yang sah.',
        emel: 'Sila masukkan alamat e-mel yang sah.',
        majikan: 'Sila masukkan nama majikan anda.',
        rateLimit: 'Permohonan anda telah dihantar. Sila tunggu sebentar sebelum menghantar semula.',
      },
      honeypot: 'Syarikat',
      altHeading: 'Lebih suka berbual dahulu?',
      altBody: 'Hubungi perunding kami terus di WhatsApp. Kami balas dalam waktu bekerja.',
      altCta: 'WhatsApp Kami',
      altMessage: 'Hi FZS Success, saya ingin bertanya tentang pembiayaan peribadi.',
    },
    success: {
      heading: 'Terima kasih, {nama}!',
      body: 'Perunding kami akan hubungi anda di {telefon} dalam waktu bekerja.',
      faster: 'Nak lebih cepat?',
      waCta: 'WhatsApp Kami Sekarang',
      waMessage: 'Hi FZS Success, saya {nama}. Saya baru buat semakan kelayakan di laman web.',
    },
    who: {
      eyebrow: 'Siapa kami bantu',
      heading: 'Untuk kakitangan kerajaan dan swasta',
      cards: [
        {
          title: 'Penjawat Awam',
          body: 'Kakitangan kerajaan persekutuan dan negeri, termasuk yang mempunyai potongan gaji BPA atau ANGKASA.',
        },
        {
          title: 'Kakitangan Swasta',
          body: 'Pekerja tetap syarikat swasta yang menerima gaji bulanan melalui bank dan mencarum KWSP.',
        },
        {
          title: 'Badan Berkanun & GLC',
          body: 'Kakitangan badan berkanun, agensi kerajaan dan syarikat GLC terpilih.',
        },
        {
          title: 'Pesara Berpencen',
          body: 'Pesara yang menerima pencen bulanan.',
        },
      ],
      link: 'Mohon semakan',
    },
    how: {
      eyebrow: 'Cara ia berfungsi',
      heading: 'Empat langkah, satu perunding',
      steps: [
        {
          title: 'Semak kelayakan anda',
          body: 'Masukkan gaji dan potongan. Dapatkan anggaran serta-merta.',
        },
        {
          title: 'Kami banding pakej',
          body: 'Perunding kami semak pakej daripada panel bank dan koperasi kami.',
        },
        {
          title: 'Sediakan dokumen',
          body: 'Kami beritahu dokumen yang diperlukan dan bantu anda susun.',
        },
        {
          title: 'Bank buat keputusan',
          body: 'Permohonan dihantar. Keputusan dan kadar ditentukan oleh bank.',
        },
      ],
      stepLabel: 'Langkah {n}',
      bottomLine: 'Tak pasti sama ada anda layak?',
      bottomCta: 'Semak Sekarang',
    },
    docs: {
      eyebrow: 'Dokumen',
      heading: 'Dokumen yang biasanya diperlukan',
      items: [
        'Salinan Kad Pengenalan',
        'Slip gaji 3 bulan terkini',
        'Penyata bank 3 bulan terkini',
        'Penyata KWSP terkini',
        'Surat pengesahan majikan (jika diminta)',
      ],
      note: 'Senarai penuh bergantung pada pakej yang dipohon. Perunding akan sahkan dengan anda.',
    },
    why: {
      eyebrow: 'Kenapa FZS Success',
      heading: 'Perunding, bukan pemberi pinjaman',
      cards: [
        {
          title: 'Panel pelbagai bank & koperasi',
          body: 'Kami tidak terikat kepada satu institusi, jadi kami cari pakej yang paling sesuai dengan keadaan anda.',
        },
        {
          title: 'Perunding yang boleh dihubungi',
          body: 'Anda berurusan dengan orang sebenar, bukan borang automatik. Nombor kami ada di bawah.',
        },
        {
          title: 'Berdaftar dan telus',
          body: 'Syarikat berdaftar SSM. Kami terangkan kos dan komitmen sebelum anda tandatangan apa-apa.',
        },
      ],
    },
    scam: {
      heading: 'Awas Penipuan Pinjaman',
      p1Before: 'FZS Success ',
      p1Strong: 'TIDAK PERNAH',
      p1After: ' meminta bayaran pendahuluan, "yuran proses", "duit stamping", atau apa-apa bayaran sebelum pembiayaan anda diluluskan dan dikeluarkan oleh bank.',
      p2: 'Kami juga tidak akan meminta kad pengenalan, kata laluan perbankan, atau nombor OTP melalui WhatsApp atau media sosial.',
      p3: 'Jika sesiapa mendakwa mewakili kami dan meminta bayaran pendahuluan, sila hubungi kami terus di nombor rasmi di bawah.',
      official: 'Nombor rasmi:',
    },
    faq: {
      eyebrow: 'Soalan lazim',
      heading: 'Soalan yang kerap ditanya',
      items: [
        {
          q: 'Adakah FZS Success sebuah bank?',
          a: 'Tidak. Kami perunding pembiayaan. Kami bantu anda memohon daripada bank dan koperasi. Kelulusan dan kadar ditentukan sepenuhnya oleh pihak bank.',
        },
        {
          q: 'Siapa yang layak memohon?',
          a: 'Kakitangan kerajaan dan swasta yang bekerja tetap, kakitangan badan berkanun terpilih, serta pesara berpencen. Kelayakan bergantung pada gaji, tempoh perkhidmatan, dan komitmen semasa anda.',
        },
        {
          q: 'Berapa lama proses ini mengambil masa?',
          a: 'Semakan awal boleh dibuat pada hari yang sama. Masa kelulusan bergantung sepenuhnya pada bank dan kelengkapan dokumen anda.',
        },
        {
          q: 'Adakah saya perlu bayar apa-apa kepada FZS Success?',
          a: 'Tiada bayaran pendahuluan. Sebarang kos yang berkaitan akan diterangkan kepada anda sebelum anda menandatangani apa-apa dokumen.',
        },
        {
          q: 'Anggaran dalam kalkulator ini tepat tak?',
          a: 'Ia anggaran sahaja. Jumlah sebenar bergantung pada slip gaji, umur, tempoh perkhidmatan, dan komitmen sedia ada yang perlu diselesaikan. Perunding kami akan buat semakan sebenar.',
        },
        {
          q: 'Bagaimana data saya digunakan?',
          a: 'Maklumat anda digunakan semata-mata untuk menyemak kelayakan dan menghubungi anda berkenaan permohonan. Kami tidak menjual data anda kepada pihak ketiga.',
        },
      ],
    },
    final: {
      heading: 'Sedia untuk tahu kedudukan anda?',
      line: 'Semakan percuma, kurang seminit, dan tiada komitmen.',
      primary: 'Semak Kelayakan',
      secondary: 'WhatsApp Kami',
      waMessage: 'Hi FZS Success, saya ingin tahu lebih lanjut tentang pembiayaan peribadi.',
      stats: [
        { value: 'RM0', label: 'Bayaran pendahuluan' },
        { value: '< 1 min', label: 'Untuk semakan awal' },
      ],
    },
    footer: {
      tagline: 'Perunding pembiayaan peribadi untuk kakitangan kerajaan, swasta dan pesara di Malaysia.',
      registration: 'No. Pendaftaran SSM',
      whatsapp: 'WhatsApp',
      hours: 'Waktu operasi',
      // TODO: confirm operating hours with client.
      hoursValue: 'Akan dimaklumkan',
      linksHeading: 'Pautan',
      disclaimer: 'FZS Success ialah perunding pembiayaan berdaftar dan bukan sebuah bank atau pemberi pinjaman berlesen. Kami tidak memberi pinjaman wang. Semua permohonan tertakluk kepada penilaian, terma dan kelulusan institusi kewangan yang berkaitan. Kadar keuntungan dan jumlah pembiayaan ditentukan sepenuhnya oleh pihak bank.',
      rights: 'Hak cipta terpelihara.',
    },
    floatingWa: {
      label: 'WhatsApp FZS Success',
      message: 'Hi FZS Success, saya ingin bertanya tentang pembiayaan peribadi.',
    },
  },

  en: {
    meta: {
      title: 'FZS Success — Personal Financing, Public & Private Sector',
    },
    nav: {
      cta: 'Check Eligibility',
      ctaShort: 'Check Now',
      langLabel: 'Change language',
      menu: {
        kalkulator: 'Calculator',
        siapa: 'Who we help',
        cara: 'How it works',
        dokumen: 'Documents',
        kenapa: 'Why FZS',
        faq: 'FAQ',
        hubungi: 'Contact',
      },
    },
    hero: {
      headline: 'Personal Financing for Public & Private Sectors',
      sub: 'We compare financing packages across several banks and cooperatives, and handle your application from start to finish.',
      cta: 'Check Your Eligibility',
      reassurance: 'No upfront payment. Takes under a minute.',
      // Generic until a real consultant photo replaces the stock image.
      photoAlt: 'A smiling professional',
    },
    trust: {
      noFee: 'No upfront fees',
      human: 'Real consultants, not bots',
    },
    calc: {
      optional: 'Optional',
      toggleTitle: 'Eligibility estimate calculator',
      toggleSub: 'Want a rough idea of how much you could get? Open the calculator.',
      intro: 'Enter the figures from your payslip to see an estimate. This is a rough guide only — our consultants will do the real check.',
      gajiPokok: 'Monthly Basic Salary (RM)',
      gajiPokokHelp: 'Basic salary only, excluding allowances.',
      jumlahPotongan: 'Total Monthly Deductions (RM)',
      jumlahPotonganHelp: 'Every deduction on your payslip, including EPF and existing loans.',
      umur: 'Age',
      umurSuffix: 'years',
      lokasi: 'Work Location',
      lokasiBandar: 'Urban',
      lokasiLuarBandar: 'Rural',
      lokasiHelp: 'Urban: Kuala Lumpur, Putrajaya, Selangor, Penang, Johor Bahru and other state capitals. Choose Rural if you are posted outside a city.',
      tempoh: 'Financing Tenure',
      tempohValue: '{n} years',
      tempohMaxNote: 'Maximum tenure for your age: {n} years.',
      jenisPotongan: 'Deduction Type',
      jenisBpa: 'BPA / ANGKASA',
      jenisTerus: 'Direct Salary Deduction',
      submit: 'Calculate Estimate',
      errors: {
        required: 'Please fill in this field.',
        minSalary: 'The minimum basic salary is RM {min}.',
        tooHigh: 'Total deductions must be lower than your basic salary.',
        ageRange: 'Age must be between {min} and {max}.',
        summary: 'Please check the highlighted fields.',
      },
    },
    result: {
      label: 'Your estimated eligibility',
      badge: 'Estimate',
      tenure: 'Based on a {years}-year tenure',
      caveat: 'This is an estimate only, not an offer. The actual amount depends on your payslip, length of service, and any existing commitments that need to be settled. Approval and rates are decided by the bank.',
      dsr: 'Based on the figures you entered, your current deductions are too high for new financing at the moment. Our consultants can still look at other options with you.',
      age: 'Your age is beyond the tenure limit of the packages on our panel. Contact us to discuss other options.',
      waCta: 'WhatsApp Our Consultant',
      waMessage: 'Hi FZS Success, I just checked my eligibility on your website and would like to know my other options.',
    },
    lead: {
      eyebrow: 'Free eligibility check',
      heading: 'Request your eligibility check',
      intro: 'Fill in this short form. Our consultants will contact you and check with the actual banks — free, with no obligation.',
      nama: 'Full Name',
      telefon: 'Mobile Number',
      telefonHelp: 'Example: 012-345 6789',
      emel: 'Email Address',
      emelHelp: 'So we can send you follow-up details.',
      majikan: 'Employer Name',
      majikanHelp: 'For example: Selangor State Education Department, Tenaga Nasional Berhad.',
      consent: 'I agree to be contacted by FZS Success about my financing application.',
      submit: 'Send for Review',
      sending: 'Sending…',
      privacy: 'We never ask for your IC or payslip on this page.',
      errors: {
        nama: 'Please enter your name (at least 3 characters).',
        telefon: 'Please enter a valid Malaysian mobile number.',
        emel: 'Please enter a valid email address.',
        majikan: 'Please enter your employer name.',
        rateLimit: 'Your details have been sent. Please wait a moment before sending again.',
      },
      honeypot: 'Company',
      altHeading: 'Prefer to talk first?',
      altBody: 'Message our consultants directly on WhatsApp. We reply during working hours.',
      altCta: 'WhatsApp Us',
      altMessage: 'Hi FZS Success, I would like to ask about personal financing.',
    },
    success: {
      heading: 'Thank you, {nama}!',
      body: 'One of our consultants will contact you at {telefon} during working hours.',
      faster: 'Prefer to talk sooner?',
      waCta: 'WhatsApp Us Now',
      // Prefilled message stays in BM — the consultants work in BM.
      waMessage: 'Hi FZS Success, saya {nama}. Saya baru buat semakan kelayakan di laman web.',
    },
    who: {
      eyebrow: 'Who we help',
      heading: 'For both public and private sector employees',
      cards: [
        {
          title: 'Civil Servants',
          body: 'Federal and state government employees, including those with BPA or ANGKASA salary deductions.',
        },
        {
          title: 'Private Sector Employees',
          body: 'Permanent employees of private companies paid monthly through a bank and contributing to EPF.',
        },
        {
          title: 'Statutory Bodies & GLCs',
          body: 'Staff of statutory bodies, government agencies and selected GLCs.',
        },
        {
          title: 'Pensioners',
          body: 'Retirees who receive a monthly pension.',
        },
      ],
      link: 'Request a check',
    },
    how: {
      eyebrow: 'How it works',
      heading: 'Four steps, one consultant',
      steps: [
        {
          title: 'Check your eligibility',
          body: 'Enter your salary and deductions. Get an instant estimate.',
        },
        {
          title: 'We compare packages',
          body: 'Our consultants review packages from our panel of banks and cooperatives.',
        },
        {
          title: 'Prepare your documents',
          body: 'We tell you which documents are needed and help you put them together.',
        },
        {
          title: 'The bank decides',
          body: 'Your application is submitted. The decision and the rate are set by the bank.',
        },
      ],
      stepLabel: 'Step {n}',
      bottomLine: 'Not sure if you qualify?',
      bottomCta: 'Check Now',
    },
    docs: {
      eyebrow: 'Documents',
      heading: 'Documents you will usually need',
      items: [
        'Copy of your IC (MyKad)',
        'Latest 3 months of payslips',
        'Latest 3 months of bank statements',
        'Latest EPF (KWSP) statement',
        'Employer confirmation letter (if requested)',
      ],
      note: 'The full list depends on the package you apply for. Your consultant will confirm it with you.',
    },
    why: {
      eyebrow: 'Why FZS Success',
      heading: 'A consultant, not a lender',
      cards: [
        {
          title: 'A panel of banks & cooperatives',
          body: 'We are not tied to a single institution, so we look for the package that best fits your situation.',
        },
        {
          title: 'Consultants you can reach',
          body: 'You deal with real people, not an automated form. Our number is listed below.',
        },
        {
          title: 'Registered and transparent',
          body: 'An SSM-registered company. We explain all costs and commitments before you sign anything.',
        },
      ],
    },
    scam: {
      heading: 'Beware of Loan Scams',
      p1Before: 'FZS Success will ',
      p1Strong: 'NEVER',
      p1After: ' ask for an upfront payment, a "processing fee", "stamping money", or any other payment before your financing has been approved and disbursed by the bank.',
      p2: 'We will also never ask for your IC, online banking password, or OTP number over WhatsApp or social media.',
      p3: 'If anyone claims to represent us and asks for an upfront payment, please contact us directly on our official number below.',
      official: 'Official number:',
    },
    faq: {
      eyebrow: 'FAQ',
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'Is FZS Success a bank?',
          a: 'No. We are a financing consultancy. We help you apply to banks and cooperatives. Approval and rates are decided entirely by the bank.',
        },
        {
          q: 'Who can apply?',
          a: 'Permanent employees in both the public and private sectors, staff of selected statutory bodies, and pensioners. Eligibility depends on your salary, length of service, and current commitments.',
        },
        {
          q: 'How long does the process take?',
          a: 'An initial check can be done on the same day. Approval time depends entirely on the bank and on how complete your documents are.',
        },
        {
          q: 'Do I have to pay FZS Success anything?',
          a: 'There is no upfront payment. Any related costs will be explained to you before you sign any documents.',
        },
        {
          q: 'How accurate is the calculator estimate?',
          a: 'It is an estimate only. The actual amount depends on your payslip, age, length of service, and any existing commitments that need to be settled. Our consultants will carry out the proper check.',
        },
        {
          q: 'How is my data used?',
          a: 'Your details are used only to check your eligibility and to contact you about your application. We do not sell your data to third parties.',
        },
      ],
    },
    final: {
      heading: 'Ready to see where you stand?',
      line: 'A free check that takes under a minute, with no obligation.',
      primary: 'Check Eligibility',
      secondary: 'WhatsApp Us',
      waMessage: 'Hi FZS Success, I would like to know more about personal financing.',
      stats: [
        { value: 'RM0', label: 'Upfront payment' },
        { value: '< 1 min', label: 'For an initial check' },
      ],
    },
    footer: {
      tagline: 'Personal financing consultants for public and private sector employees and pensioners in Malaysia.',
      registration: 'SSM Registration No.',
      whatsapp: 'WhatsApp',
      hours: 'Operating hours',
      // TODO: confirm operating hours with client.
      hoursValue: 'To be confirmed',
      linksHeading: 'Links',
      disclaimer: 'FZS Success is a registered financing consultancy and is not a bank or a licensed lender. We do not lend money. All applications are subject to the assessment, terms and approval of the financial institution concerned. Profit rates and financing amounts are determined solely by the bank.',
      rights: 'All rights reserved.',
    },
    floatingWa: {
      label: 'WhatsApp FZS Success',
      message: 'Hi FZS Success, I would like to ask about personal financing.',
    },
  },
};
