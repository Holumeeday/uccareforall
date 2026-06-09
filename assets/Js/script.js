document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('industryCardsContainer');
    if (!container) {
        console.error('Industry cards container not found!');
        return;
    }
    const cards = Array.from(container.children);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function shuffleCards() {
        let shuffledCards = [...cards];
        shuffleArray(shuffledCards);

        container.innerHTML = '';
        shuffledCards.forEach(card => {
            container.appendChild(card);
        });
    }

    shuffleCards();
    setInterval(shuffleCards, 3000);
});


document.addEventListener('DOMContentLoaded', function() {
    const learnMoreBtn = document.getElementById('learn-more-btn'); // Initial "Learn more"
    const initialAboutContent = document.getElementById('initial-about-content');
    const paginatedContent = document.getElementById('paginated-content');
    const visionPage = document.getElementById('vision-page');
    const missionPage = document.getElementById('mission-page');
    const paginationNavLinks = document.querySelectorAll('.pagination-nav-link'); // Selects Vision/Mission links
    const backToAboutBtn = document.getElementById('back-to-about-btn'); // "Back to About Us" link

    // Function to show a specific paginated page
    function showPage(pageId) {
        visionPage.style.display = 'none';
        missionPage.style.display = 'none';
        document.getElementById(pageId).style.display = 'block';

        // Optional: Add/remove an active class for the current pagination link
        paginationNavLinks.forEach(link => {
            if (link.dataset.page + '-page' === pageId) {
                link.classList.add('active-pagination-link'); // Add a class for active state
            } else {
                link.classList.remove('active-pagination-link');
            }
        });
    }

    // Event listener for initial "Learn more" button
    learnMoreBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior (e.g., jumping to top)
        initialAboutContent.style.display = 'none'; // Hide initial content
        paginatedContent.style.display = 'block'; // Show paginated content
        showPage('vision-page'); // Display "Our Vision" by default
    });

    // Event listeners for pagination navigation links (Vision/Mission)
    paginationNavLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            const pageToShow = this.dataset.page + '-page'; // Get the ID of the page to show
            showPage(pageToShow);
        });
    });

    // Event listener for "Back to About Us" link
    backToAboutBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        paginatedContent.style.display = 'none'; // Hide paginated content
        initialAboutContent.style.display = 'block'; // Show initial content
    });
});


document.addEventListener('DOMContentLoaded', function() {
            const filterButtons = document.querySelectorAll('.filter-btn');
            const projectItems = document.querySelectorAll('.project-item');

            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove 'active' class from all buttons and add to clicked button
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    const filterValue = this.getAttribute('data-filter');

                    projectItems.forEach(item => {
                        const status = item.getAttribute('data-status');
                        const category = item.getAttribute('data-category');

                        // Show item if it fits the filters or if 'all' is selected
                        if (filterValue === 'all' || filterValue === status || filterValue === category) {
                            item.classList.remove('hide');
                        } else {
                            item.classList.add('hide');
                        }
                    });
                });
            });
        });

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("year").textContent = new Date().getFullYear();
});



const projectDatabase = {
    "school-outreach": {
        title: '"My Body, My Right" School Seminar',
        tag: "School Campaign",
        heroImage: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1200", // Replace with your actual field photo
        lead: "Taking protective awareness directly into the classroom. Our school campaigns educate young hearts right where they learn.",
        body: `<p>At UC Careforall Initiative, we believe foundational community transformation begins in safe learning environments. This initiative focuses comprehensively on empowering children aged 5–18 with critical body autonomy education to safeguard against exploitation and sexual violence.</p>
               <p>Our teams take the message directly to the schools. In addition to delivering vital advocacy seminars, we distribute essential tools like school bags, pens, and books to ensure every student we reach has the equipment to grow, learn, and build a safe future.</p>`,
        location: "Lagos Mainland & Western Districts",
        status: "Active Deployment",
        channels: "School Campaign Network",
        stats: [
            { label: "Students Sensitized", value: "2,500+" },
            { label: "Materials Distributed", value: "Bags, Books, Pens" },
            { label: "Host Institutions", value: "14 Schools" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600"
        ]
    },
    "health-outreach": {
        title: "Community Free Health Check-up",
        tag: "Health Relief",
        heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200",
        lead: "Bringing professional medical care, free consultations, and life-saving medications directly to underserved communities.",
        body: `<p>Health is the foundation of individual empowerment. Our medical outreach programs bridge healthcare inequality by creating pop-up diagnostic clinics in locations facing limited clinical infrastructure.</p>
               <p>Residents receive free health consultations, blood sugar screenings, and blood pressure monitoring from qualified volunteers. We ensure that individuals diagnosed with vital symptoms walk away with completely free prescription medications and actionable guidance on wellness management.</p>`,
        location: "Ebute Metta, Lagos",
        status: "Active Camp",
        channels: "Medical Volunteer Branch",
        stats: [
            { label: "Free Consultations", value: "850+ Citizens" },
            { label: "Prescriptions Issued", value: "100% Free" },
            { label: "Volunteering Medics", value: "18 Doctors/Nurses" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1584515901367-f1c27beab752?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=600"
        ]
    },
    "tech-accelerator": {
        title: "Media & Tech Youth Accelerator",
        tag: "Skill Acquisition",
        heroImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200",
        lead: "Equipping the next generation of African creators and leaders with cutting-edge digital autonomy skills.",
        body: `<p>To create lasting community transformation, young people must be prepared for the modern digital economy. The Media & Tech Youth Accelerator provides structured, hands-on masterclasses designed to transform tech enthusiasts into self-sustaining entrepreneurs.</p>
               <p>Participants choose distinct vocational tracks, learning in-demand skills such as Digital Marketing strategies, high-end Phone Photography, and modern Drone Operations. Upon completion, students receive professional certifications to confidently monetize their talents.</p>`,
        location: "Eti-Osa Local Government Centre",
        status: "Ongoing Class",
        channels: "Youth Training Program",
        stats: [
            { label: "Active Cohort", value: "150+ Youths" },
            { label: "Practical Tracks", value: "3 Main Sectors" },
            { label: "Certification Rate", value: "94% Completion" }
        ],
        gallery: [
            "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600"
        ]
    }
};


    // ── TODO: Replace with your actual contact details ──
    const WHATSAPP_NUMBER = 'YOUR_WHATSAPP_NUMBER'; // e.g. '2348012345678' (no + or spaces)
    const CONTACT_EMAIL   = 'YOUR_EMAIL@uccareforall.com';

    // ── State ──
    let selectedAmount = null;
    let currentFreq    = 'onetime';

    document.getElementById('year').textContent = new Date().getFullYear();

    // ── Frequency toggle ──
    function setFreq(freq) {
      currentFreq = freq;
      document.getElementById('btn-onetime').classList.toggle('active', freq === 'onetime');
      document.getElementById('btn-monthly').classList.toggle('active', freq === 'monthly');
      const banner = document.getElementById('monthly-banner');
      banner.style.display = freq === 'monthly' ? 'flex' : 'none';
    }

    // ── Tier selection ──
    function selectTier(btn, amount) {
      document.querySelectorAll('.tier-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedAmount = amount;
      document.getElementById('custom-amount-wrap').style.display = 'none';
      document.getElementById('custom-input').value = '';
    }

    function selectCustom() {
      document.querySelectorAll('.tier-btn').forEach(b => b.classList.remove('selected'));
      document.getElementById('tier-custom-btn').classList.add('selected');
      selectedAmount = null;
      document.getElementById('custom-amount-wrap').style.display = 'block';
      document.getElementById('custom-input').focus();
    }

    function onCustomInput(val) {
      selectedAmount = val ? parseFloat(val) : null;
    }

    // ── File upload ──
    function handleFileSelect(input) {
      if (!input.files || !input.files[0]) return;
      const file = input.files[0];
      const preview = document.getElementById('upload-preview');
      document.getElementById('upload-filename').textContent = file.name;
      preview.classList.add('visible');
    }

    // Drag-over styling
    const zone = document.getElementById('upload-zone');
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag-over'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
    zone.addEventListener('drop', e => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      const dt = e.dataTransfer;
      if (dt.files.length) {
        document.getElementById('proof-file').files = dt.files;
        handleFileSelect(document.getElementById('proof-file'));
      }
    });

    // ── Copy account number ──
    function copyText(text, btnId) {
      navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById(btnId);
        btn.classList.add('copied');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
        }, 2000);
      });
    }

    // ── Validation ──
    function validate() {
      const name  = document.getElementById('donor-name').value.trim();
      const email = document.getElementById('donor-email').value.trim();
      const file  = document.getElementById('proof-file').files[0];
      const errEl = document.getElementById('form-error');
      const errTx = document.getElementById('error-text');

      if (!selectedAmount || selectedAmount <= 0) {
        errTx.textContent = 'Please select or enter a donation amount.';
        errEl.style.display = 'block';
        return false;
      }
      if (!name) {
        errTx.textContent = 'Please enter your full name.';
        errEl.style.display = 'block';
        return false;
      }
      if (!email || !email.includes('@')) {
        errTx.textContent = 'Please enter a valid email address.';
        errEl.style.display = 'block';
        return false;
      }
      if (!file) {
        errTx.textContent = 'Please upload your payment receipt before submitting.';
        errEl.style.display = 'block';
        return false;
      }

      errEl.style.display = 'none';
      return true;
    }

    // ── Build message body ──
    function buildMessage() {
      const name    = document.getElementById('donor-name').value.trim();
      const email   = document.getElementById('donor-email').value.trim();
      const phone   = document.getElementById('donor-phone').value.trim();
      const project = document.getElementById('donor-project').value || 'General Fund';
      const freq    = currentFreq === 'monthly' ? 'Monthly Recurring' : 'One-time';
      const amount  = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(selectedAmount);

      return `Donation Notification — Uccareforall Initiative

Donor Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Amount: ${amount}
Frequency: ${freq}
Project: ${project}

Payment proof attached.
Account donated to: 2112750107 — UBA — Uccareforall INT`;
    }

    // ── WhatsApp submission ──
    function submitViaWhatsApp() {
      if (!validate()) return;
      const message = encodeURIComponent(buildMessage());
      // TODO: Replace WHATSAPP_NUMBER with your number before going live
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      window.open(url, '_blank');
      showSuccess('whatsapp');
    }

    // ── Email submission ──
    function submitViaEmail() {
      if (!validate()) return;
      const subject = encodeURIComponent('Donation Proof — Uccareforall Initiative');
      const body    = encodeURIComponent(buildMessage() + '\n\n[Please attach your payment screenshot to this email]');
      // TODO: Replace CONTACT_EMAIL with your email before going live
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      showSuccess('email');
    }

    // ── Success overlay ──
    function showSuccess(channel) {
      const overlay = document.getElementById('success-overlay');
      const body    = document.getElementById('success-body');
      if (channel === 'whatsapp') {
        body.textContent = 'Your WhatsApp message has been opened with your donation details. Please attach your payment screenshot and hit send. We will confirm within 24 hours.';
      } else {
        body.textContent = 'Your email client has opened. Please attach your payment screenshot and send. We will confirm your donation within 24 hours and send you a receipt.';
      }
      overlay.classList.add('show');
    }

    function closeSuccess(e) {
      if (e.target === document.getElementById('success-overlay')) {
        document.getElementById('success-overlay').classList.remove('show');
      }
    }
 

    document.addEventListener("DOMContentLoaded", async () => {

    const modalContainer = document.getElementById("volunteer-modal-container");

    if (!modalContainer) return;

    try {

        const response = await fetch("/include/volunteer-modal.html");

        const modalHTML = await response.text();

        modalContainer.innerHTML = modalHTML;

    } catch (error) {

        console.error("Unable to load volunteer modal:", error);

    }

});