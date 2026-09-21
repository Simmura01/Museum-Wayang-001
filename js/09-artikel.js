/* ============================================================
   09-ARTIKEL.JS
   Data & logika artikel di halaman Beranda.
   Tiga artikel: Sejarah Wayang, UNESCO, Melestarikan Wayang.
   ============================================================ */

const artikelData = {

    sejarah: {
        judul: 'History & Origins of Nusantara Wayang',
        kategori: '📜 History Article · Jakarta Wayang Museum',
        konten: `
            <img src="assets/images/artikel/sejarah.jpg" alt="History of Wayang Illustration" class="artikel-card-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <p class="art-intro">
                Wayang is one of the oldest and most culturally rich heritages born in the land of Nusantara.
                This shadow puppet performing art has existed since at least the 9th century AD, long before the great kingdoms
                of Nusantara reached their peak of glory.
            </p>

            <h4 class="art-section-heading">Historical Roots</h4>
            <p class="art-paragraph">
                The oldest evidence of wayang's existence was found in the Balitung inscription from 907 AD, which mentions the word
                <em>"mawayang"</em> — referring to leather shadow puppet performances. At that time, wayang had become
                an integral part of religious rituals, traditional ceremonies, and palace entertainment.
            </p>
            <p class="art-paragraph">
                Indian influence entered through trade routes and the spread of Hinduism-Buddhism, bringing the epic tales
                of the Mahabharata and Ramayana to Nusantara. However, local artists did not merely copy — they
                transformed these stories with the local wisdom of Java, Bali, and Sunda, giving birth to
                original characters like Semar, Gareng, Petruk, and Bagong (the Punakawan) who became symbols of the common people's wisdom.
            </p>

            <h4 class="art-section-heading">Development During the Kingdom Era</h4>
            <ul class="art-list">
                <li><strong>10th–13th Century (Kediri & Singhasari Kingdoms)</strong>
                    The Mahabharata epic was adapted to Javanese culture. The Punakawan characters began to emerge as original Nusantara innovations.</li>
                <li><strong>14th–16th Century (Majapahit)</strong>
                    Wayang reached the peak of its artistic maturity. The form of leather puppets was distilled into two-dimensional silhouettes rich in ornamentation.</li>
                <li><strong>15th–17th Century (Spread of Islam)</strong>
                    The Wali Songo, especially Sunan Kalijaga, used wayang as a wise medium for Islamic preaching,
                    introducing new stories breathing Islamic teachings without destroying tradition.</li>
                <li><strong>19th–20th Century (Colonial & Modern)</strong>
                    Under the influence of the VOC and Dutch colonial rule, wayang remained preserved due to the protection of Javanese kingdoms.
                    Wayang began to be documented academically by Western researchers.</li>
            </ul>

            <h4 class="art-section-heading">Main Types of Wayang</h4>
            <ul class="art-list">
                <li><strong>Wayang Kulit (Leather Puppets)</strong>The oldest and most well-known type. Made from finely carved buffalo hide, performed behind a white screen (kelir) with the light of a blencong lamp.</li>
                <li><strong>Wayang Golek (Wooden Puppets)</strong>Three-dimensional wooden puppets, popular in West and Central Java. Can be performed without a screen.</li>
                <li><strong>Wayang Klitik (Karucil)</strong>Flat puppets made of thin wood, originating from East Java, usually performing the tale of Damarwulan.</li>
                <li><strong>Wayang Beber</strong>The oldest form of wayang in the form of scrolls of painted cloth or paper, while the dalang (puppeteer) narrates the story verbally.</li>
            </ul>

            <h4 class="art-section-heading">The Role of the Dalang</h4>
            <p class="art-paragraph">
                A dalang is not merely a puppet manipulator — he is an artist, philosopher, and priest all in one.
                A dalang must master thousands of wayang characters, memorize dozens of plays, lead the gamelan orchestra,
                have different voices for dozens of characters, and possess a deep understanding of Javanese philosophy and
                Hindu-Buddhist-Islamic cosmology.
            </p>
            <p class="art-paragraph">
                All-night wayang performances (8–12 hours) are a tradition still maintained
                today in important ceremonies such as weddings, circumcisions, and village cleansing rituals.
            </p>

            <div class="art-penutup">
                 Wayang is the soul of Nusantara —<br>
                a reflection of humanity, nature, and the universe<br>
                that continues to live on in every generation.
            </div>
        `
    },

    unesco: {
        judul: 'Wayang & 2003 UNESCO Recognition',
        kategori: '🌐 International Article · Jakarta Wayang Museum',
        konten: `
            <img src="assets/images/artikel/images.jfif" alt="UNESCO Wayang Illustration" class="artikel-card-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <p class="art-intro">
                On November 7, 2003, in Paris, France, UNESCO officially designated Indonesian Wayang as a
                <em>Masterpiece of the Oral and Intangible Heritage of Humanity</em> — the highest recognition
                of the greatness of the Indonesian nation's cultural arts in the eyes of the world.
            </p>

            <h4 class="art-section-heading">Background of UNESCO Recognition</h4>
            <p class="art-paragraph">
                UNESCO established the Masterpiece of Oral and Intangible Heritage program in 1997, aiming
                to protect oral traditions and intangible cultural expressions from extinction due to globalization.
                Indonesia proposed wayang as a candidate after in-depth research demonstrating
                the unparalleled complexity and uniqueness of wayang.
            </p>
            <p class="art-paragraph">
                Claims from neighboring countries over several elements of Indonesian culture in the early 2000s also accelerated
                the Indonesian government's steps to register wayang with UNESCO as an assertion of cultural sovereignty.
            </p>

            <h4 class="art-section-heading">UNESCO Criteria Met by Wayang</h4>
            <ul class="art-list">
                <li><strong>Outstanding Universal Value</strong>
                    Wayang combines visual arts, music, literature, drama, philosophy, and spirituality in one performance — a complexity very rarely found in any cultural tradition in the world.</li>
                <li><strong>Intergenerational Transmission</strong>
                    Wayang knowledge is transmitted orally from senior dalangs to students over centuries, forming an organic and sustainable cultural education system.</li>
                <li><strong>Threat of Extinction</strong>
                    UNESCO identified wayang as facing a serious threat from modernization, changing entertainment tastes, and the lack of young dalang regeneration.</li>
                <li><strong>Existing Protection Efforts</strong>
                    The Indonesian government and cultural communities have shown real commitment through dalang schools, wayang festivals, and documentation.</li>
            </ul>

            <h4 class="art-section-heading">2003 UNESCO Convention</h4>
            <p class="art-paragraph">
                Along with the designation of Wayang as a Masterpiece, UNESCO opened for ratification the
                <strong>Convention for the Safeguarding of the Intangible Cultural Heritage (2003)</strong>.
                Indonesia ratified this convention through Presidential Regulation Number 78 of 2007, making
                Indonesia one of the first countries in Southeast Asia to fully commit to the protection
                of intangible cultural heritage.
            </p>

            <h4 class="art-section-heading">Legal Basis for Convention Ratification</h4>
            <div class="art-hukum-item">
                <p><strong>Presidential Regulation Number 78 of 2007</strong> on the Ratification of the Convention for the Safeguarding of the Intangible Cultural Heritage. With this Presidential Regulation, Indonesia is legally bound to protect, document, and preserve all intangible cultural heritage including wayang.</p>
                <a class="art-hukum-btn" href="https://peraturan.bpk.go.id/Details/42178/perpres-no-78-tahun-2007" target="_blank" rel="noopener">VIEW PRESIDENTIAL REG. NO. 78/2007 →</a>
            </div>

            <h4 class="art-section-heading">Impact of UNESCO Recognition</h4>
            <ul class="art-list">
                <li><strong>Cultural Tourism</strong>Foreign visitors to the Jakarta Wayang Museum increased significantly post-2003. Wayang became a leading cultural tourism attraction for Indonesia.</li>
                <li><strong>Cultural Diplomacy</strong>Indonesia actively stages wayang performances in various countries as part of cultural diplomacy and strengthening soft power.</li>
                <li><strong>Education Revitalization</strong>Various schools, studios, and arts colleges incorporated wayang into their curricula, supported by government funding.</li>
                <li><strong>Communal Intellectual Property Enforcement</strong>UNESCO recognition strengthened Indonesia's position in Communal Intellectual Property (KIK) disputes, preventing unilateral claims by foreign parties.</li>
            </ul>

            <div class="art-penutup">
                🌐 UNESCO recognition is not the end of the struggle —<br>
                but rather the beginning of our shared responsibility<br>
                to continue caring for wayang for the world.
            </div>
        `
    },

    pelestarian: {
        judul: 'Preserving Wayang: Cultural Heritage for Future Generations',
        kategori: '🌿 Conservation Article · Jakarta Wayang Museum',
        konten: `
            <img src="assets/images/artikel/ngajar.jpeg" alt="Wayang Conservation Illustration" class="artikel-card-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <p class="art-intro">
                Preserving wayang is not just about maintaining a performing art — it is a noble endeavor
                to protect national identity, nurture noble philosophical values, and ensure that future generations
                can still inherit this invaluable cultural wealth. The state is present through
                a robust set of legal foundations to support these preservation efforts.
            </p>

            <h4 class="art-section-heading">Why Does Wayang Need to be Preserved?</h4>
            <p class="art-paragraph">
                Wayang faces multidimensional pressures in the modern era: the onslaught of digital entertainment, decreased
                interest among the younger generation in learning to become dalangs, a lack of performance spaces, to cultural
                ownership disputes at the international level. Without systematic and continuous
                preservation steps, the majesty of wayang will only remain a memory.
            </p>
            <ul class="art-list">
                <li><strong>Dalang Regeneration Crisis</strong>
                    The number of professional dalangs continues to decline. The average age of active dalangs today is over 50, while there are very few young successors due to the long and complex learning process.</li>
                <li><strong>Digital Entertainment Competition</strong>
                    Generation Z is more familiar with social media and digital entertainment. Wayang must innovate in presentation without losing its traditional essence.</li>
                <li><strong>Risk of Foreign Claims</strong>
                    Several elements of Indonesian culture have been claimed by other countries. Without documentation and strong legal protection, wayang is vulnerable to the same.</li>
                <li><strong>Physical Degradation of Collections</strong>
                    Thousands of ancient wayang are stored in conditions requiring intensive conservation care. Leather and wood materials that are hundreds of years old are highly susceptible to damage.</li>
            </ul>

            <h4 class="art-section-heading">Pillars of Wayang Preservation</h4>
            <p class="art-paragraph">
                Wayang preservation requires a holistic approach covering four main pillars:
            </p>
            <ul class="art-list">
                <li><strong>🎓 Education & Regeneration</strong>
                    Integrating wayang into formal school curricula, establishing young dalang studios, providing scholarships for traditional arts students, and developing senior dalang apprenticeship programs.</li>
                <li><strong>📚 Documentation & Digitalization</strong>
                    Digitally documenting thousands of wayang collections, plays, and crafting techniques. The Jakarta Wayang Museum is committed to continuously developing digital platforms like the one you are using.</li>
                <li><strong>🌍 Diplomacy & Cultural Promotion</strong>
                    Actively bringing wayang performances to the international stage, collaborating with global cultural institutions, and asserting Indonesia's ownership of this heritage in international forums.</li>
                <li><strong>⚖️ Legal Protection</strong>
                    Enforcing cultural heritage protection regulations, registering communal intellectual property, and implementing international conventions ratified by Indonesia.</li>
            </ul>

            <h4 class="art-section-heading">Legal Foundations for Wayang Preservation</h4>
            <p class="art-paragraph">
                The state has prepared a comprehensive legal framework to support the preservation of wayang
                as the nation's cultural heritage:
            </p>

            <div class="art-hukum-item">
                <p><strong>Law No. 11 of 2010 on Cultural Heritage</strong> — This law regulates in detail the criteria for cultural heritage objects, protection mechanisms, the national cultural heritage register, and criminal provisions for violators. Ancient leather wayang aged over 50 years fall into the category of cultural heritage objects fully protected by the state.</p>
                <a class="art-hukum-btn" href="https://peraturan.bpk.go.id/Details/38552/uu-no-11-tahun-2010" target="_blank" rel="noopener">VIEW LAW NO. 11/2010 →</a>
            </div>

            <div class="art-hukum-item">
                <p><strong>Law No. 5 of 2017 on Cultural Advancement</strong> — The main legal foundation for the protection, development, utilization, and fostering of national culture. This law explicitly mentions wayang as one of the objects of cultural advancement. Article 4 asserts that cultural advancement aims to strengthen national identity amid world civilization.</p>
                <a class="art-hukum-btn" href="https://peraturan.bpk.go.id/Details/37642/uu-no-5-tahun-2017" target="_blank" rel="noopener">VIEW LAW NO. 5/2017 →</a>
            </div>

            <div class="art-hukum-item">
                <p><strong>Presidential Regulation No. 78 of 2007 on the 2003 UNESCO Convention</strong> — Indonesia ratified the UNESCO Convention for the Safeguarding of the Intangible Cultural Heritage. This ratification binds Indonesia under international law to create a national inventory of intangible cultural heritage, implement protection programs, and periodically report progress to UNESCO.</p>
                <a class="art-hukum-btn" href="https://peraturan.bpk.go.id/Details/42178/perpres-no-78-tahun-2007" target="_blank" rel="noopener">VIEW PRESIDENTIAL REG. NO. 78/2007 →</a>
            </div>

            <div class="art-hukum-item">
                <p><strong>Government Regulation No. 1 of 2022 on the National Register & Preservation of Cultural Heritage</strong> — An implementing regulation of Law No. 11/2010 which technically regulates the mechanisms for registration, designation, management, and maintenance of national cultural heritage including historical wayang.</p>
                <a class="art-hukum-btn" href="https://peraturan.bpk.go.id/Details/195523/pp-no-1-tahun-2022" target="_blank" rel="noopener">VIEW GOV. REG. NO. 1/2022 →</a>
            </div>

            <div class="art-hukum-item">
                <p><strong>Law No. 28 of 2014 on Copyright</strong> — Protects traditional cultural expressions (TCE) including wayang performances, wayang carving motifs, and derivative works. Article 38 asserts that copyright over traditional cultural expressions is held by the state.</p>
                <a class="art-hukum-btn" href="https://peraturan.bpk.go.id/Details/37743/uu-no-28-tahun-2014" target="_blank" rel="noopener">VIEW LAW NO. 28/2014 →</a>
            </div>

            <h4 class="art-section-heading">Our Role As the Next Generation</h4>
            <p class="art-paragraph">
                Wayang preservation is not only the task of the government and artists — every individual has a real
                role to play. Visiting museums, attending wayang performances, sharing wayang content
                on social media, supporting local wayang craftsmen, and teaching wayang values
                to children are small steps with massive impacts.
            </p>
            <p class="art-paragraph">
                By using this digital application of the Jakarta Wayang Museum, you have made a real
                contribution to wayang preservation efforts — keeping this magnificent heritage alive, relevant,
                and known to future generations.
            </p>

            <div class="art-penutup">
                🌿 Preserving Wayang means<br>
                Preserving the Soul of the Indonesian Nation.<br><br>
                Let us together protect this heritage<br>
                for our children and grandchildren.
            </div>
        `
    }
};

/**
 * Membuka modal detail artikel
 * @param {string} id - ID artikel ('sejarah' | 'unesco' | 'pelestarian')
 */
function bukaArtikel(id) {
    const data = artikelData[id];
    if (!data) return;

    document.getElementById('artikel-modal-judul').textContent = data.judul;
    document.getElementById('artikel-modal-kategori').textContent = data.kategori;
    document.getElementById('artikel-modal-body').innerHTML = data.konten;

    // Reset scroll ke atas
    document.getElementById('artikel-modal-body').scrollTop = 0;

    const modal = document.getElementById('modal-artikel');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

/**
 * Menutup modal detail artikel
 */
function tutupArtikel() {
    const modal = document.getElementById('modal-artikel');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Tutup modal saat klik backdrop
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal-artikel');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) tutupArtikel();
        });
    }

    const modalUU = document.getElementById('modal-uu');
    if (modalUU) {
        modalUU.addEventListener('click', function (e) {
            if (e.target === modalUU) tutupModalUU();
        });
    }
});

/* ============================================================
   DATA PERATURAN — konten dirangkum dari peraturan.bpk.go.id
   ============================================================ */
const uuData = {

    'uu11-2010': {
        judul: 'Law Number 11 of 2010',
        jenis: 'Law of the Republic of Indonesia',
        tentang: 'Cultural Heritage',
        berlaku: 'Effective: November 24, 2010',
        sumber: 'https://peraturan.bpk.go.id/Details/38552/uu-no-11-tahun-2010',
        unduh: 'https://peraturan.bpk.go.id/Download/27798/UU%20Nomor%2011%20Tahun%202010.pdf',
        abstrak: `This Law is an invitation for all of us to actively recognize and love the nation's cultural heritage. Cultural heritage is the cultural wealth of the nation as a manifestation of human thought and behavior that is significant for the understanding and development of history, science, and culture.

The state is present as a protector and facilitator — regulating the criteria for designating cultural heritage, organizing the National Register, and ensuring legal protection so that highly valuable objects like ancient leather wayang are not damaged, lost, or improperly transferred. Every heritage we protect today is a priceless gift for future generations.`,
        materi: [
            '✦ Criteria & Methods for Designating Cultural Heritage',
            '✦ National Register of Cultural Heritage (Official Recording)',
            '✦ Protection: Rescue, Security, Zoning, Maintenance',
            '✦ Development & Utilization of Cultural Heritage',
            '✦ Discovery and Registration of Cultural Heritage by the Public',
            '✦ Ownership, Possession & Transfer of Rights',
            '✦ Duties & Authorities of Central and Regional Governments',
            '✦ Funding, Compensation & Incentives for Heritage Guardians',
            '✦ Supervision & Legal Protection Provisions',
        ]
    },

    'perpres78-2007': {
        judul: 'Presidential Regulation Number 78 of 2007',
        jenis: 'Presidential Regulation of the Republic of Indonesia',
        tentang: 'Ratification of the Convention for the Safeguarding of the Intangible Cultural Heritage',
        berlaku: 'Effective: July 5, 2007',
        sumber: 'https://peraturan.bpk.go.id/Details/42178/perpres-no-78-tahun-2007',
        unduh: 'https://peraturan.bpk.go.id/Download/70823/PERPRES%20NO%2078%20TH%202007.pdf',
        abstrak: `This is tangible proof of Indonesia's commitment alongside the global community to ensure that intangible cultural heritage — such as wayang performing arts, oral traditions, local knowledge, and traditional ceremonies — remains alive and vibrant from generation to generation.

By ratifying the 2003 UNESCO Convention through this Presidential Regulation, Indonesia commits to creating a national inventory of intangible cultural heritage, carrying out real preservation programs, and sharing knowledge with the international community. Indonesia becomes part of a global movement that believes cultural wealth belongs to humanity and must be guarded together.`,
        materi: [
            '✦ Official Ratification of the 2003 UNESCO Convention',
            '✦ National Inventory of Intangible Cultural Heritage',
            '✦ Active Protection & Preservation Programs',
            '✦ Education & Raising Public Awareness',
            '✦ Periodic Reporting to UNESCO',
            '✦ International Cooperation in Intangible Culture',
            '✦ Participation of Communities, Groups & Individuals',
        ]
    },

    'pp1-2022': {
        judul: 'Government Regulation (PP) Number 1 of 2022',
        jenis: 'Government Regulation of the Republic of Indonesia',
        tentang: 'National Register and Preservation of Cultural Heritage',
        berlaku: 'Effective: January 3, 2022',
        sumber: 'https://peraturan.bpk.go.id/Details/195523/pp-no-1-tahun-2022',
        unduh: 'https://peraturan.bpk.go.id/Download/189346/PP%20Nomor%201%20Tahun%202022.pdf',
        abstrak: `This Government Regulation is a technical guide for all of us — the public and the government — to work hand-in-hand in recording and caring for national cultural heritage. As an implementing regulation of Law No. 11 of 2010, this PP concretely regulates the mechanisms for registration, designation, management, and maintenance of cultural heritage, including historical wayang stored in museums.

This PP also provides protection for Objects Suspected of being Cultural Heritage (ODCB), ensuring valuable items are not neglected before they can be registered. Preservation funding becomes a shared responsibility between the Central Government, Regional Governments, and the public — a cultural mutual cooperation for the nation's advancement.`,
        materi: [
            '✦ Registration Mechanism to the National Register',
            '✦ Protection of Objects Suspected as Cultural Heritage (ODCB)',
            '✦ Preservation: Protection, Development, Utilization',
            '✦ Management of Cultural Heritage Areas',
            '✦ Incentives & Compensation for Owners/Managers',
            '✦ Shared Funding: Central – Regional – Public',
            '✦ Supervision & Inter-Agency Coordination',
        ]
    },

    'uu5-2017': {
        judul: 'Law Number 5 of 2017',
        jenis: 'Law of the Republic of Indonesia',
        tentang: 'Cultural Advancement',
        berlaku: 'Effective: May 29, 2017',
        sumber: 'https://peraturan.bpk.go.id/Details/37642/uu-no-5-tahun-2017',
        unduh: 'https://peraturan.bpk.go.id/Download/26736/UU%20No%205%20Tahun%202017.pdf',
        abstrak: `This Law is a call and mandate for all elements of the nation to not only protect but also develop, utilize, and foster national culture to make it increasingly resilient and empowered. The state advances Indonesian National Culture amidst world civilization and makes Culture an investment for building the nation's future.

This Law explicitly mentions wayang as one of the objects of cultural advancement. Article 4 asserts that cultural advancement aims to strengthen national identity. This is not just about guarding the past — it is about building a nation with a strong and respected identity in the eyes of the world.`,
        materi: [
            '✦ Objects of Cultural Advancement (including Wayang)',
            '✦ Protection & Development of National Culture',
            '✦ Utilization & Fostering of Culture',
            '✦ Cultural Advancement: Strengthening National Identity',
            '✦ Master Plan for Cultural Advancement',
            '✦ National Cultural Information System',
            '✦ Funding & Role of Regional Governments',
            '✦ Public Participation in Cultural Advancement',
        ]
    },

    'uu5-2017-diplomasi': {
        judul: 'Law No. 5 of 2017 — Articles 35 & 43',
        jenis: 'Law of the Republic of Indonesia',
        tentang: 'Cultural Advancement: Cultural Diplomacy & Pride in the Eyes of the World',
        berlaku: 'Effective: May 29, 2017',
        sumber: 'https://peraturan.bpk.go.id/Details/37642/uu-no-5-tahun-2017',
        unduh: 'https://peraturan.bpk.go.id/Download/26736/UU%20No%205%20Tahun%202017.pdf',
        abstrak: `Article 35 of Law No. 5 of 2017 mandates that the government must conduct cultural diplomacy to strengthen Indonesia's position in international forums and maintain the nation's image. This is a call to be proactive — not waiting for claims, but proudly elevating our culture to the world stage.

Article 43 letters i & j specifically encourage international cooperation in the cultural field: cultural exchange, cross-border artistic collaboration, and active participation in world cultural forums. For wayang, these articles form the legal basis for bringing our noble art as a national ambassador — building friendship and shared pride among nations.`,
        materi: [
            '✦ Article 35: Cultural Diplomacy as a State Obligation',
            '✦ Article 43 (i): International Cooperation in Culture',
            '✦ Article 43 (j): Cross-National Cultural Exchange',
            '✦ Promotion of Indonesian Cultural Heritage in World Forums',
            '✦ Cultural Soft Power for National Pride',
            '✦ Artistic Collaboration & International Performances',
        ]
    }
};

/* ── URL Download disimpan agar bisa diakses oleh unduhUU() ── */
let _currentUUDownloadUrl = '';

/**
 * Membuka modal detail peraturan
 * @param {string} id - ID peraturan
 */
function bukaModalUU(id) {
    const data = uuData[id];
    if (!data) return;

    _currentUUDownloadUrl = data.unduh;

    // Isi header
    document.getElementById('uu-modal-judul').textContent = data.judul;
    document.getElementById('uu-modal-jenis').textContent = data.jenis;

    // Bangun konten body
    const materiHTML = data.materi.map(m => `<li>${m}</li>`).join('');
    document.getElementById('uu-modal-body').innerHTML = `
        <div class="uu-jenis-badge">${data.jenis}</div>
        <div class="uu-nomor">${data.judul}</div>
        <div class="uu-tentang">${data.tentang}</div>
        <div class="uu-divider"></div>

        <div class="uu-section-label">📋 Regulation Abstract</div>
        <div class="uu-abstrak">${data.abstrak.replace(/\n\n/g, '</div><div class="uu-abstrak" style="margin-top:10px;">')}</div>

        <div class="uu-section-label">📑 Main Points of Regulation</div>
        <ul class="uu-materi-list">${materiHTML}</ul>

        <div class="uu-berlaku">⚖️ ${data.berlaku}</div>
    `;

    // Isi bagian sumber
    document.getElementById('uu-modal-source').innerHTML = `
        <span class="uu-source-label">Official Source:</span>
        <a class="uu-source-link" href="${data.sumber}" target="_blank" rel="noopener">${data.sumber}</a>
    `;

    // Reset scroll ke atas
    document.getElementById('uu-modal-body').scrollTop = 0;

    const modal = document.getElementById('modal-uu');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

/**
 * Menutup modal detail peraturan
 */
function tutupModalUU() {
    const modal = document.getElementById('modal-uu');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

/**
 * Membuka halaman unduh PDF peraturan
 */
function unduhUU() {
    if (_currentUUDownloadUrl) {
        window.open(_currentUUDownloadUrl, '_blank', 'noopener');
    }
}
