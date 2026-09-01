document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Efek Teks Mengetik Otomatis (Typing)
    // ==========================================
    const typingText = document.getElementById("typing-text");
    const words = ["Web Developer", "Siswa RPL SMK Krian 1"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typingText) return;

        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Tahan saat kalimat selesai
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();


    // ==========================================
    // 2. Scroll Reveal (Munculkan Elemen Saat Scroll)
    // ==========================================
    const revealElements = document.querySelectorAll(".scroll-reveal");

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Panggil saat awal muat halaman


    // ==========================================
    // 3. Smooth Scroll dengan Offset Header
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70; // Sesuaikan tinggi header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ==========================================
    // 4. Salin Teks Kontak ke Clipboard (Aman & Stabil)
    // ==========================================
    const contactCards = document.querySelectorAll('.contact-card');

    contactCards.forEach(card => {
        card.addEventListener('click', () => {
            const strongTag = card.querySelector('strong');
            if (!strongTag) return;

            const textToCopy = strongTag.innerText;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = strongTag.innerText;
                
                // Mengubah teks sementara tanpa merusak struktur HTML bawaan
                strongTag.innerText = '✓ Disalin!';
                card.style.backgroundColor = '#dcfce7';
                card.style.borderColor = '#22c55e';

                setTimeout(() => {
                    strongTag.innerText = originalText;
                    card.style.backgroundColor = '';
                    card.style.borderColor = '';
                }, 2000);
            }).catch(err => {
                console.error('Gagal menyalin teks:', err);
            });
        });
    });

});
