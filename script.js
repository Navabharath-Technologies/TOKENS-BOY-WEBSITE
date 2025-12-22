document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Logic
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const nav = navMenu ? navMenu.parentElement : null;

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu li a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }

    // Smart Header Logic (Hide on Scroll Down, Show on Scroll Up)
    let lastScrollTop = 0;
    const mainNav = document.querySelector('.main-nav');

    if (mainNav) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop) {
                // Scrolling Down -> Hide Header
                mainNav.classList.add('nav-hidden');
            } else {
                // Scrolling Up -> Show Header
                mainNav.classList.remove('nav-hidden');
            }

            // Prevent negative scrolling issue
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // Scroll Reveal Animation Restoration
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop observing once visible
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback: Reveal all immediately if Observer not supported
        revealElements.forEach(element => {
            element.classList.add('visible');
        });
    }

    // Scroll Reveal Logic is handled above

    // --- FAQ Accordion Logic ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const parentItem = question.parentElement;
            const isAlreadyActive = parentItem.classList.contains('active');

            // Close ALL open FAQ items first
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle current
            if (!isAlreadyActive) {
                parentItem.classList.add('active');
            }
        });
    });

    // --- Language Switcher Logic (Improved) ---
    const langSwitcher = document.getElementById('langSwitcher');
    if (langSwitcher) {
        const langBtn = langSwitcher.querySelector('.lang-btn');
        const langLinks = langSwitcher.querySelectorAll('.lang-dropdown a');

        const translations = {
            'EN': {
                'home': 'Home',
                'about': 'About Us',
                'services': 'Services',
                'faq': 'FAQ',
                'contact': 'Contact',
                'book': 'Book Appointment',
                'hero-title': 'Tokens Boy',
                'hero-subtitle': 'Easy Tokens for Indian Clinics',
                'hero-desc': 'A streamlined, digitized queue and scheduling system designed for modern healthcare. Reduce wait times, eliminate confusion, and significantly improve patient experience with our smart token management solution.',
                'learn-more': 'Learn More',
                'about-subtitle': 'A streamlined, digitized queue and scheduling system designed for modern healthcare.',
                'about-f1': 'Reduces unnecessary calls and manual coordination.',
                'about-f2': 'Provides real-time updates to avoid clashes.',
                'about-f3': 'Eliminates confusion in the waiting area.',
                'about-f4': 'Significantly improves productivity and patient experience.',
                'patient-queue': 'PATIENT QUEUE',
                'display-footer': 'TOKEN BOY DIGITAL SYSTEM',
                'services-tag': 'Comprehensive Tokens Management Solutions',
                'services-subtitle': 'Discover all the features and services that make Tokens Boy the perfect choice for your clinic',
                's1-t': 'Digital Token', 's1-d': 'Modern token system for seamless flow.',
                's2-t': 'LED Display', 's2-d': 'Large LED boards for clear visibility.',
                's3-t': 'Mobile App', 's3-d': 'Track status via Tokens Boy App.',
                's4-t': 'SMS Alerts', 's4-d': 'Automated notifications for patients.',
                's5-t': 'Scheduling', 's5-d': 'Smart appointment booking system.',
                's6-t': 'Doctor App', 's6-d': 'Real-time doctor availability tracking.',
                's7-t': 'Analytics', 's7-d': 'Detailed clinic reports & insights.',
                's8-t': 'Multi-Clinic', 's8-d': 'Centralized management dashboard.',
                'faq-title': 'Frequently Asked Questions',
                'faq-subtitle': 'Find answers to common questions about Tokens Boy',
                'q1': 'How do I download and book an appointment?',
                'a1': 'Simply download the Tokens Boy app from the Google Play Store or Apple App Store. Register with your mobile number, search for your clinic/doctor, and book your slot instantly to generate your digital token.',
                'q2': 'How do patients receive live token updates?',
                'a2': 'Patients get real-time updates via the App (Live Status) and SMS notifications. You can see exactly how many people are ahead of you and get alerted when it\'s your turn, so you don\'t have to wait in the clinic.',
                'q3': 'Can patients reschedule appointments?',
                'a3': 'Absolutely! Patients can reschedule through the mobile app or by calling your clinic. The system automatically adjusts the queue and sends updated notifications to affected patients.',
                'q4': 'Does it support multiple doctors and departments?',
                'a4': 'Yes! Tokens Boy supports unlimited doctors and departments. Each doctor gets their own queue, and patients are automatically routed to the correct specialist. Perfect for multi-specialty clinics.',
                'q5': 'What kind of support do you provide?',
                'a5': 'We provide 24/7 phone and email support. You also get: 1) Dedicated account manager, 2) Free staff training, 3) Regular system updates, 4) Emergency on-site support when needed.',
                'q6': 'How secure is patient data?',
                'a6': 'We take security seriously. All data is encrypted (256-bit SSL), stored on secure Indian servers, and complies with healthcare data protection regulations. Regular backups ensure your data is never lost.',
                'get-started': 'Get Started',
                'get-started-tag': 'Book Your Visit Instantly',
                'get-started-desc': 'Download the Tokens Boy app for the fastest booking experience. Check availability, book your slot, and track your live status.',
                'download-app': 'Download Our App',
                'download-app-desc': 'Book appointments, track live status, and manage your health records on the go.',
                'contact-title': 'Contact Us',
                'contact-tag': 'Get In Touch',
                'contact-desc': 'We\'re here to help transform your clinic\'s patient management.',
                'phone-title': 'Phone Numbers',
                'phone-desc': 'General: +917996078472',
                'email-title': 'Email Address',
                'email-desc': 'support@tokensboy.com',
                'quick-links': 'Quick Links',
                'features': 'Features',
                'contact-info': 'Contact Info',
                'f1': 'Real-Time Updates',
                'f2': 'Queue Management',
                'f3': 'Live Status',
                'f4': 'Auto Notifications',
                'f5': 'Time Optimization',
                'brand-name': 'Tokens Boy',
                'get-it-on': 'Get it on',
                'google-play': 'Google Play',
                'download-on': 'Download on the',
                'app-store': 'App Store',
                'page-title': 'Tokens Boy - Easy Tokens for Indian Clinics'
            },
            'KN': {
                'home': 'ಮನೆ',
                'about': 'ನಮ್ಮ ಬಗ್ಗೆ',
                'services': 'ಸೇವೆಗಳು',
                'faq': 'FAQ',
                'contact': 'ಸಂಪರ್ಕಿಸಿ',
                'book': 'ನೇಮಕಾತಿ ಕಾಯ್ದಿರಿಸಿ',
                'hero-title': 'ಟೋಕನ್ಸ್ ಬಾಯ್',
                'hero-subtitle': 'ಭಾರತೀಯ ಚಿಕಿತ್ಸಾಲಯಗಳಿಗೆ ಸುಲಭ ಟೋಕನ್ಗಳು',
                'hero-desc': 'ಆಧುನಿಕ ಆರೋಗ್ಯ ರಕ್ಷಣೆಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಸುವ್ಯವಸ್ಥಿತ, ಡಿಜಿಟೈಸ್ಡ್ ಕ್ಯೂ ಮತ್ತು ಶೆಡ್ಯೂಲಿಂಗ್ ಸಿಸ್ಟಮ್. ಕಾಯುವ ಸಮಯವನ್ನು ಕಡಿಮೆ ಮಾಡಿ, ಗೊಂದಲವನ್ನು ನಿವಾರಿಸಿ ಮತ್ತು ನಮ್ಮ ಸ್ಮಾರ್ಟ್ ಟೋಕನ್ ಮ್ಯಾನೇಜ್ಮೆಂಟ್ ಪರಿಹಾರದೊಂದಿಗೆ ರೋಗಿಗಳ ಅನುಭವವನ್ನು ಗಮನಾರ್ಹವಾಗಿ ಸುಧಾರಿಸಿ.',
                'learn-more': 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ',
                'about-subtitle': 'ಆಧುನಿಕ ಆರೋಗ್ಯ ರಕ್ಷಣೆಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ ಸುವ್ಯವಸ್ಥಿತ, ಡಿಜಿಟೈಸ್ಡ್ ಕ್ಯೂ ಮತ್ತು ಶೆಡ್ಯೂಲಿಂಗ್ ಸಿಸ್ಟಮ್.',
                'about-f1': 'ಅನಗತ್ಯ ಕರೆಗಳು ಮತ್ತು ಹಸ್ತಚಾಲಿತ ಸಮನ್ವಯವನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ.',
                'about-f2': 'ಘರ್ಷಣೆಗಳನ್ನು ತಪ್ಪಿಸಲು ನೈಜ-ಸಮಯದ ನವೀಕರಣಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ.',
                'about-f3': 'ಕಾಯುವ ಪ್ರದೇಶದಲ್ಲಿನ ಗೊಂದಲವನ್ನು ನಿವಾರಿಸುತ್ತದೆ.',
                'about-f4': 'ಉತ್ಪಾದಕತೆ ಮತ್ತು ರೋಗಿಗಳ ಅನುಭವವನ್ನು ಗಮನಾರ್ಹವಾಗಿ ಸುಧಾರಿಸುತ್ತದೆ.',
                'patient-queue': 'ರೋಗಿಗಳ ಕ್ಯೂ',
                'display-footer': 'ಟೋಕನ್ಸ್ ಬಾಯ್ ಡಿಜಿಟಲ್ ಸಿಸ್ಟಮ್',
                'services-tag': 'ಸಮಗ್ರ ಟೋಕನ್ಗಳ ನಿರ್ವಹಣಾ ಪರಿಹಾರಗಳು',
                'services-subtitle': 'ಟೋಕನ್ಸ್ ಬಾಯ್ ಅನ್ನು ನಿಮ್ಮ ಚಿಕಿತ್ಸಾಲಯಕ್ಕೆ ಪರಿಪೂರ್ಣ ಆಯ್ಕೆಯನ್ನಾಗಿ ಮಾಡುವ ಎಲ್ಲಾ ವೈಶಿಷ್ಟ್ಯಗಳು ಮತ್ತು ಸೇವೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',
                's1-t': 'ಡಿಜಿಟಲ್ ಟೋಕನ್', 's1-d': 'ತಡೆರಹಿತ ಹರಿವಿಗಾಗಿ ಆಧುನಿಕ ಟೋಕನ್ ವ್ಯವಸ್ಥೆ.',
                's2-t': 'ಎಲ್ಇಡಿ ಪ್ರದರ್ಶನ', 's2-d': 'ಪಾರದರ್ಶಕತೆಗಾಗಿ ದೊಡ್ಡ ಎಲ್ಇಡಿ ಬೋರ್ಡ್ಗಳು.',
                's3-t': 'ಮೊಬೈಲ್ ಅಪ್ಲಿಕೇಶನ್', 's3-d': 'ಟೋಕನ್ಸ್ ಬಾಯ್ ಅಪ್ಲಿಕೇಶನ್ ಮೂಲಕ ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
                's4-t': 'SMS ಎಚ್ಚರಿಕೆಗಳು', 's4-d': 'ರೋಗಿಗಳಿಗೆ ಸ್ವಯಂಚಾಲಿತ ಅಧಿಸೂಚನೆಗಳು.',
                's5-t': 'ಶೆಡ್ಯೂಲಿಂಗ್', 's5-d': 'ಸ್ಮಾರ್ಟ್ ನೇಮಕಾತಿ ಬುಕಿಂಗ್ ವ್ಯವಸ್ಥೆ.',
                's6-t': 'ವೈದ್ಯರ ಅಪ್ಲಿಕೇಶನ್', 's6-d': 'ವೈದ್ಯರ ಲಭ್ಯತೆಯ ನೈಜ-ಸಮಯದ ಟ್ರ್ಯಾಕಿಂಗ್.',
                's7-t': 'ಅನಾಲಿಟಿಕ್ಸ್', 's7-d': 'ವಿವರವಾದ ಕ್ಲಿನಿಕ್ ವರದಿಗಳು ಮತ್ತು ಒಳನೋಟಗಳು.',
                's8-t': 'ಮಲ್ಟಿ-ಕ್ಲಿನಿಕ್', 's8-d': 'ಕೇಂದ್ರೀಕೃತ ನಿರ್ವಹಣಾ ಡ್ಯಾಶ್ಬೋರ್ಡ್.',
                'faq-title': 'ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು',
                'faq-subtitle': 'ಟೋಕನ್ಸ್ ಬಾಯ್ ಬಗ್ಗೆ ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಗಳನ್ನು ಹುಡುಕಿ',
                'q1': 'ನಾನು ಅಪ್ಲಿಕೇಶನ್ ಅನ್ನು ಡೌನ್ಲೋಡ್ ಮಾಡುವುದು ಮತ್ತು ನೇಮಕಾತಿಯನ್ನು ಕಾಯ್ದಿರಿಸುವುದು ಹೇಗೆ?',
                'a1': 'Google Play Store ಅಥವಾ Apple App Store ನಿಂದ ಟೋಕನ್ಸ್ ಬಾಯ್ ಅಪ್ಲಿಕೇಶನ್ ಅನ್ನು ಡೌನ್ಲೋಡ್ ಮಾಡಿ. ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯೊಂದಿಗೆ ನೋಂದಾಯಿಸಿ, ನಿಮ್ಮ ಕ್ಲಿನಿಕ್/ವೈದ್ಯರನ್ನು ಹುಡುಕಿ ಮತ್ತು ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಟೋಕನ್ ಪಡೆಯಲು ತಕ್ಷಣವೇ ಬುಕ್ ಮಾಡಿ.',
                'q2': 'ರೋಗಿಗಳು ಲೈವ್ ಟೋಕನ್ ನವೀಕರಣಗಳನ್ನು ಹೇಗೆ ಸ್ವೀಕರಿಸುತ್ತಾರೆ?',
                'a2': 'ರೋಗಿಗಳು ಅಪ್ಲಿಕೇಶನ್ (ಲೈವ್ ಸ್ಟೇಟಸ್) ಮತ್ತು SMS ಅಧಿಸೂಚನೆಗಳ ಮೂಲಕ ನೈಜ-ಸಮಯದ ನವೀಕರಣಗಳನ್ನು ಪಡೆಯುತ್ತಾರೆ. ನಿಮ್ಮ ಮುಂದೆ ಎಷ್ಟು ಜನರಿದ್ದಾರೆ ಎಂಬುದನ್ನು ನೀವು ನಿಖರವಾಗಿ ನೋಡಬಹುದು.',
                'q3': 'ರೋಗಿಗಳು ನೇಮಕಾತಿಗಳನ್ನು ಮರುಹೊಂದಿಸಬಹುದೇ?',
                'a3': 'ಖಂಡಿತವಾಗಿಯೂ! ರೋಗಿಗಳು ಮೊಬೈಲ್ ಅಪ್ಲಿಕೇಶನ್ ಮೂಲಕ ಅಥವಾ ನಿಮ್ಮ ಕ್ಲಿನಿಕ್‌ಗೆ ಕರೆ ಮಾಡುವ ಮೂಲಕ ಮರುಹೊಂದಿಸಬಹುದು. ಸಿಸ್ಟಮ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಕ್ಯೂ ಅನ್ನು ಹೊಂದಿಸುತ್ತದೆ ಮತ್ತು ಪೀಡಿತ ರೋಗಿಗಳಿಗೆ ನವೀಕರಿಸಿದ ಅಧಿಸೂಚನೆಗಳನ್ನು ಕಳುಹಿಸುತ್ತದೆ.',
                'q4': 'ಇದು ಬಹು ವೈದ್ಯರು ಮತ್ತು ವಿಭಾಗಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆಯೇ?',
                'a4': 'ಹೌದು! ಟೋಕನ್ಸ್ ಬಾಯ್ ಅನಿಯಮಿತ ವೈದ್ಯರು ಮತ್ತು ವಿಭಾಗಗಳನ್ನು ಬೆಂಬಲಿಸುತ್ತದೆ. ಪ್ರತಿಯೊಬ್ಬ ವೈದ್ಯರು ತಮ್ಮದೇ ಆದ ಕ್ಯೂ ಪಡೆಯುತ್ತಾರೆ ಮತ್ತು ರೋಗಿಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸರಿಯಾದ ತಜ್ಞರಿಗೆ ಕಳುಹಿಸಲಾಗುತ್ತದೆ. ಬಹು-ವಿಶೇಷ ಚಿಕಿತ್ಸಾಲಯಗಳಿಗೆ ಸೂಕ್ತವಾಗಿದೆ.',
                'q5': 'ನೀವು ಯಾವ ರೀತಿಯ ಬೆಂಬಲವನ್ನು ನೀಡುತ್ತೀರಿ?',
                'a5': 'ನಾವು 24/7 ಫೋನ್ ಮತ್ತು ಇಮೇಲ್ ಬೆಂಬಲವನ್ನು ನೀಡುತ್ತೇವೆ. ನೀವು ಇವುಗಳನ್ನು ಸಹ ಪಡೆಯುತ್ತೀರಿ: 1) ಮೀಸಲಾದ ಖಾತೆ ವ್ಯವಸ್ಥಾಪಕರು, 2) ಉಚಿತ ಸಿಬ್ಬಂದಿ ತರಬೇತಿ, 3) ನಿಯಮಿತ ಸಿಸ್ಟಮ್ ನವೀಕರಣಗಳು, 4) ಅಗತ್ಯವಿದ್ದಾಗ ತುರ್ತು ಆನ್-ಸೈಟ್ ಬೆಂಬಲ.',
                'q6': 'ರೋಗಿಗಳ ಡೇಟಾ ಎಷ್ಟು ಸುರಕ್ಷಿತವಾಗಿದೆ?',
                'a6': 'ನಾವು ಸುರಕ್ಷತೆಯನ್ನು ಗಂಭೀರವಾಗಿ ಪರಿಗಣಿಸುತ್ತೇವೆ. ಎಲ್ಲಾ ಡೇಟಾವನ್ನು ಎನ್‌ಕ್ರಿಪ್ಟ್ ಮಾಡಲಾಗಿದೆ (256-ಬಿಟ್ SSL), ಸುರಕ್ಷಿತ ಭಾರತೀಯ ಸರ್ವರ್‌ಗಳಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ ಮತ್ತು ಆರೋಗ್ಯ ರಕ್ಷಣೆ ಡೇಟಾ ರಕ್ಷಣೆ ನಿಯಮಗಳಿಗೆ ಬದ್ಧವಾಗಿದೆ. ನಿಯಮಿತ ಬ್ಯಾಕಪ್‌ಗಳು ನಿಮ್ಮ ಡೇಟಾ ಎಂದಿಗೂ ಕಳೆದುಹೋಗದಂತೆ ನೋಡಿಕೊಳ್ಳುತ್ತವೆ.',
                'get-started': 'ಶುರುಮಾಡಿ',
                'get-started-tag': 'ತಕ್ಷಣವೇ ನಿಮ್ಮ ಭೇಟಿಯನ್ನು ಕಾಯ್ದಿರಿಸಿ',
                'get-started-desc': 'ವೇಗವಾದ ಬುಕಿಂಗ್ ಅನುಭವಕ್ಕಾಗಿ ಟೋಕನ್ಸ್ ಬಾಯ್ ಅಪ್ಲಿಕೇಶನ್ ಡೌನ್ಲೋಡ್ ಮಾಡಿ. ಲಭ್ಯತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ, ನಿಮ್ಮ ಸ್ಲಾಟ್ ಬುಕ್ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಲೈವ್ ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ.',
                'download-app': 'ನಮ್ಮ ಅಪ್ಲಿಕೇಶನ್ ಡೌನ್ಲೋಡ್ ಮಾಡಿ',
                'download-app-desc': 'ನೇಮಕಾತಿಗಳನ್ನು ಕಾಯ್ದಿರಿಸಿ, ಲೈವ್ ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ಪ್ರಯಾಣದಲ್ಲಿರುವಾಗ ನಿಮ್ಮ ಆರೋಗ್ಯ ದಾಖಲೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ.',
                'contact-title': 'ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ',
                'contact-tag': 'ಸಂಪರ್ಕದಲ್ಲಿರಿ',
                'contact-desc': 'ನಿಮ್ಮ ಕ್ಲಿನಿಕ್ನ ರೋಗಿಗಳ ನಿರ್ವಹಣೆಯನ್ನು ಪರಿವರ್ತಿಸಲು ನಾವು ಇಲ್ಲಿ ಇದ್ದೇವೆ.',
                'phone-title': 'ಫೋನ್ ಸಂಖ್ಯೆಗಳು',
                'phone-desc': 'ಸಾಮಾನ್ಯ: +917996078472',
                'email-title': 'ಇಮೇಲ್ ವಿಳಾಸ',
                'email-desc': 'support@tokensboy.com',
                'quick-links': 'ತ್ವರಿತ ಲಿಂಕ್ಗಳು',
                'features': 'ವೈಶಿಷ್ಟ್ಯಗಳು',
                'contact-info': 'ಸಂಪರ್ಕ ಮಾಹಿತಿ',
                'f1': 'ನೈಜ-ಸಮಯದ ನವೀಕರಣಗಳು',
                'f2': 'ಕ್ಯೂ ನಿರ್ವಹಣೆ',
                'f3': 'ಲೈವ್ ಸ್ಥಿತಿ',
                'f4': 'ಸ್ವಯಂ ಅಧಿಸೂಚನೆಗಳು',
                'f5': 'ಸಮಯ ಆಪ್ಟಿಮೈಸೇಶನ್',
                'brand-name': 'ಟೋಕನ್ಸ್ ಬಾಯ್',
                'get-it-on': 'ಇದನ್ನು ಪಡೆದುಕೊಳ್ಳಿ',
                'google-play': 'Google Play',
                'download-on': 'ಇದರಿಂದ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
                'app-store': 'App Store',
                'page-title': 'ಟೋಕನ್ಸ್ ಬಾಯ್ - ಭಾರತೀಯ ಚಿಕಿತ್ಸಾಲಯಗಳಿಗೆ ಸುಲಭ ಟೋಕನ್ಗಳು'
            },
            'ES': {
                'home': 'Inicio', 'about': 'Sobre Nosotros', 'services': 'Servicios', 'faq': 'Preguntas Frecuentes', 'contact': 'Contacto', 'book': 'Reservar Cita',
                'hero-title': 'Chico Fichas', 'hero-subtitle': 'Tokens Fáciles para Clínicas Indias',
                'hero-desc': 'Un sistema digital de colas y programación diseñado para la salud moderna. Reduzca los tiempos de espera, elimine la confusión y mejore significativamente la experiencia del paciente con nuestra solución inteligente de gestión de tokens.',
                'learn-more': 'Saber Más', 'about-subtitle': 'Un sistema digital de colas y programación diseñado para la salud moderna.',
                'about-f1': 'Reduce llamadas innecesarias y coordinación manual.',
                'about-f2': 'Proporciona actualizaciones en tiempo real para evitar conflictos.',
                'about-f3': 'Elimina la confusión en el área de espera.',
                'about-f4': 'Mejora significativamente la productividad y la experiencia del paciente.',
                'patient-queue': 'COLA DE PACIENTES', 'display-footer': 'SISTEMA DIGITAL TOKENS BOY',
                'services-tag': 'Soluciones Integrales de Gestión de Tokens',
                'services-subtitle': 'Descubra todas las funciones y servicios que hacen de Tokens Boy la elección perfecta para su clínica',
                's1-t': 'Token Digital', 's1-d': 'Sistema moderno para un flujo fluido.',
                's2-t': 'Pantalla LED', 's2-d': 'Grandes tableros LED para una visibilidad clara.',
                's3-t': 'App Móvil', 's3-d': 'Siga el estado a través de la App Tokens Boy.',
                's4-t': 'Alertas SMS', 's4-d': 'Notificaciones automatizadas para pacientes.',
                's5-t': 'Programación', 's5-d': 'Sistema inteligente de reserva de citas.',
                's6-t': 'App para Médicos', 's6-d': 'Seguimiento en tiempo real de disponibilidad médica.',
                's7-t': 'Analítica', 's7-d': 'Informes detallados y perspectivas de la clínica.',
                's8-t': 'Multi-Clínica', 's8-d': 'Panel de gestión centralizado.',
                'faq-title': 'Preguntas Frecuentes', 'faq-subtitle': 'Encuentre respuestas a preguntas comunes sobre Tokens Boy',
                'q1': '¿Cómo descargo y reservo una cita?',
                'a1': 'Simplemente descargue la aplicación Tokens Boy desde Google Play Store o Apple App Store. Regístrese con su número de móvil, busque su clínica/médico y reserve su espacio al instante para generar su token digital.',
                'q2': '¿Cómo reciben los pacientes actualizaciones de tokens en vivo?',
                'a2': 'Los pacientes reciben actualizaciones en tiempo real a través de la aplicación (Estado en vivo) y notificaciones SMS. Puede ver exactamente cuántas personas hay delante de usted y recibir alertas cuando sea su turno, para que no tenga que esperar en la clínica.',
                'q3': '¿Pueden los pacientes reprogramar citas?',
                'a3': '¡Absolutamente! Los pacientes pueden reprogramar a través de la aplicación móvil o llamando a su clínica. El sistema ajusta automáticamente la cola y envía notificaciones actualizadas a los pacientes afectados.',
                'q4': '¿Soporta múltiples médicos y departamentos?',
                'a4': '¡Sí! Tokens Boy admite médicos y departamentos ilimitados. Cada médico tiene su propia cola y los pacientes son dirigidos automáticamente al especialista correcto. Perfecto para clínicas de múltiples especialidades.',
                'q5': '¿Qué tipo de soporte ofrecen?',
                'a5': 'Brindamos soporte telefónico y por correo electrónico las 24 horas, los 7 días de la semana. También obtiene: 1) Gerente de cuenta dedicado, 2) Capacitación gratuita para el personal, 3) Actualizaciones regulares del sistema, 4) Soporte de emergencia en el sitio cuando sea necesario.',
                'q6': '¿Qué tan seguros están los datos de los pacientes?',
                'a6': 'Nos tomamos la seguridad en serio. Todos los datos están cifrados (SSL de 256 bits), se almacenan en servidores indios seguros y cumplen con las regulaciones de protección de datos de salud. Las copias de seguridad regulares garantizan que sus datos nunca se pierdan.',
                'get-started': 'Comenzar', 'get-started-tag': 'Reserve su Visita al Instante',
                'get-started-desc': 'Descargue la aplicación Tokens Boy para la experiencia de reserva más rápida. Consulte la disponibilidad, reserve su espacio y siga su estado en vivo.',
                'download-app': 'Descargue Nuestra App', 'download-app-desc': 'Reserve citas, siga el estado en vivo y gestione sus registros de salud sobre la marcha.',
                'contact-title': 'Contáctenos', 'contact-tag': 'Póngase en Contacto',
                'contact-desc': 'Estamos aquí para ayudar a transformar la gestión de pacientes de su clínica.',
                'phone-title': 'Números de Teléfono', 'phone-desc': 'General: +917996078472',
                'email-title': 'Correo Electrónico', 'email-desc': 'support@tokensboy.com',
                'quick-links': 'Enlaces Rápidos', 'features': 'Características', 'contact-info': 'Información de Contacto',
                'f1': 'Actualizaciones en Vivo', 'f2': 'Gestión de Colas', 'f3': 'Estado en Tiempo Real', 'f4': 'Notificaciones SMS', 'f5': 'Optimización de Tiempo',
                'brand-name': 'Tokens Boy', 'get-it-on': 'Consíguelo en', 'google-play': 'Google Play', 'download-on': 'Descárgalo en', 'app-store': 'App Store',
                'page-title': 'Tokens Boy - Tokens Fáciles para Clínicas Indias'
            },
            'FR': {
                'home': 'Accueil', 'about': 'À Propos', 'services': 'Services', 'faq': 'FAQ', 'contact': 'Contact', 'book': 'Prendre RDV',
                'hero-title': 'Jetons Garçon', 'hero-subtitle': 'Tokens Faciles pour Cliniques Indiennes',
                'hero-desc': 'Un système numérique de gestion de file d\'attente conçu pour la santé moderne. Réduisez l\'attente, éliminez la confusion et améliorez l\'expérience patient avec notre solution intelligente.',
                'learn-more': 'En Savoir Plus', 'about-subtitle': 'Un système numérique conçu pour la gestion moderne de la santé.',
                'about-f1': 'Réduit les appels inutiles et la coordination manuelle.',
                'about-f2': 'Mises à jour en temps réel pour éviter les conflits.',
                'about-f3': 'Élimine la confusion dans la salle d\'attente.',
                'about-f4': 'Améliore considérablement la productivité et l\'expérience patient.',
                'patient-queue': 'FILE D\'ATTENTE', 'display-footer': 'SYSTÈME NUMÉRIQUE TOKENS BOY',
                'services-tag': 'Solutions Complètes de Gestion de Tokens',
                'services-subtitle': 'Découvrez tous les services qui font de Tokens Boy le choix idéal pour votre clinique',
                's1-t': 'Token Digital', 's1-d': 'Système moderne pour un flux fluide.',
                's2-t': 'Affichage LED', 's2-d': 'Grands panneaux LED pour une visibilité claire.',
                's3-t': 'App Mobile', 's3-d': 'Suivez votre statut via l\'App Tokens Boy.',
                's4-t': 'Alertes SMS', 's4-d': 'Notifications automatisées pour les patients.',
                's5-t': 'Planification', 's5-d': 'Système intelligent de réservation de rendez-vous.',
                's6-t': 'App Docteur', 's6-d': 'Suivi en temps réel de la disponibilité du médecin.',
                's7-t': 'Analytique', 's7-d': 'Rapports cliniques détaillés et perspectives.',
                's8-t': 'Multi-Clinique', 's8-d': 'Tableau de bord de gestion centralisé.',
                'faq-title': 'Questions Fréquentes', 'faq-subtitle': 'Réponses aux questions courantes sur Tokens Boy',
                'q1': 'Comment puis-je télécharger et prendre rendez-vous ?',
                'a1': 'Téléchargez simplement l\'application Tokens Boy depuis le Google Play Store ou l\'Apple App Store. Inscrivez-vous avec votre numéro de mobile, recherchez votre clinique/médecin et réservez votre créneau instatannément pour générer votre jeton numérique.',
                'q2': 'Comment les patients reçoivent-ils les mises à jour des jetons en direct ?',
                'a2': 'Les patients reçoivent des mises à jour en temps réel via l\'application (état en direct) et des notifications SMS. Vous pouvez voir exactement combien de personnes sont devant vous et être alerté quand c\'est votre tour, vous n\'avez donc pas à attendre à la clinique.',
                'q3': 'Les patients peuvent-ils reprogrammer des rendez-vous ?',
                'a3': 'Absolument ! Les patients peuvent reprogrammer via l\'application mobile ou en appelant votre clinique. Le système ajuste automatiquement la file d\'attente et envoie des notifications mises à jour aux patients concernés.',
                'q4': 'Prend-il en charge plusieurs médecins et services ?',
                'a4': 'Oui ! Tokens Boy prend en charge un nombre illimité de médecins et de services. Chaque médecin a sa propre file d\'attente et les patients sont automatiquement redirigés vers le bon spécialiste. Parfait pour les cliniques multispécialités.',
                'q5': 'Quel type de support offrez-vous ?',
                'a5': 'Nous offrons un support téléphonique et par e-mail 24h/24 et 7j/7. Vous bénéficiez également de : 1) Un gestionnaire de compte dédié, 2) Une formation gratuite du personnel, 3) Des mises à jour régulières du système, 4) Un support d\'urgence sur site si nécessaire.',
                'q6': 'Quelle est la sécurité des données des patients ?',
                'a6': 'Nous prenons la sécurité au sérieux. Toutes les données sont cryptées (SSL 256 bits), stockées sur des serveurs indiens sécurisés et conformes aux réglementations sur la protection des données de santé. Des sauvegardes régulières garantissent que vos données ne sont jamais perdues.',
                'get-started': 'Commencer', 'get-started-tag': 'Réservez Instantanément',
                'get-started-desc': 'Téléchargez l\'application Tokens Boy pour l\'expérience de réservation la plus rapide. Vérifiez la disponibilité, réservez votre créneau et suivez votre statut en direct.',
                'download-app': 'Téléchargez l\'App', 'download-app-desc': 'Prenez rendez-vous, suivez votre statut en direct et gérez vos dossiers de santé en déplacement.',
                'contact-title': 'Contactez-nous', 'contact-tag': 'Prendre Contact',
                'contact-desc': 'Nous aidons à transformer la gestion des patients dans votre clinique.',
                'phone-title': 'Téléphone', 'phone-desc': 'Général: +917996078472',
                'email-title': 'E-mail', 'email-desc': 'support@tokensboy.com',
                'quick-links': 'Liens Rapides', 'features': 'Fonctionnalités', 'contact-info': 'Coordonnées',
                'f1': 'Mises à jour Direct', 'f2': 'Gestion de File', 'f3': 'Statut Live', 'f4': 'Alertes SMS', 'f5': 'Optimisation du Temps',
                'brand-name': 'Tokens Boy', 'get-it-on': 'Disponible sur', 'google-play': 'Google Play', 'download-on': 'Télécharger sur', 'app-store': 'App Store',
                'page-title': 'Tokens Boy - Tokens Faciles pour Cliniques Indiennes'
            },
            'DE': {
                'home': 'Startseite', 'about': 'Über Uns', 'services': 'Dienste', 'faq': 'FAQ', 'contact': 'Kontakt', 'book': 'Termin buchen',
                'hero-title': 'Tokens Junge', 'hero-subtitle': 'Einfache Tokens für indische Kliniken',
                'hero-desc': 'Ein digitales Warteschlangen- und Planungssystem für die moderne Gesundheitsversorgung. Reduzieren Sie Wartezeiten und verbessern Sie die Patientenerfahrung.',
                'learn-more': 'Mehr erfahren', 'about-subtitle': 'Digitales System für modernes Gesundheitsmanagement.',
                'about-f1': 'Reduziert unnötige Anrufe und manuelle Koordination.',
                'about-f2': 'Echtzeit-Updates zur Vermeidung von Terminkonflikten.',
                'about-f3': 'Beseitigt Verwirrung im Wartebereich.',
                'about-f4': 'Verbessert die Produktivität und Patientenzufriedenheit erheblich.',
                'patient-queue': 'WARTESCHLANGE', 'display-footer': 'TOKENS BOY DIGITALE SYSTEME',
                'services-tag': 'Umfassende Token-Management-Lösungen',
                'services-subtitle': 'Entdecken Sie die Funktionen, die Tokens Boy zur perfekten Wahl machen',
                's1-t': 'Digitaler Token', 's1-d': 'Modernes Tokensystem für reibungslosen Ablauf.',
                's2-t': 'LED-Anzeige', 's2-d': 'Große LED-Tafeln für klare Sichtbarkeit.',
                's3-t': 'Mobile App', 's3-d': 'Status über die Tokens Boy App verfolgen.',
                's4-t': 'SMS-Alarme', 's4-d': 'Automatisierte Patienten-Benachrichtigungen.',
                's5-t': 'Terminplanung', 's5-d': 'Intelligentes Buchungssystem für Termine.',
                's6-t': 'Arzt-App', 's6-d': 'Echtzeit-Verfügbarkeitstracking für Ärzte.',
                's7-t': 'Analysen', 's7-d': 'Detaillierte Berichte und Einblicke.',
                's8-t': 'Multi-Klinik', 's8-d': 'Zentrales Management-Dashboard.',
                'faq-title': 'Häufig gestellte Fragen', 'faq-subtitle': 'Finden Sie Antworten auf häufige Fragen',
                'q1': 'Wie kann ich die App herunterladen und einen Termin buchen?',
                'a1': 'Laden Sie einfach die Tokens Boy App aus dem Google Play Store oder Apple App Store herunter. Registrieren Sie sich mit Ihrer Mobilnummer, suchen Sie nach Ihrer Klinik/Ihrem Arzt und buchen Sie sofort Ihren Platz, um Ihren digitalen Token zu generieren.',
                'q2': 'Wie erhalten Patienten Live-Token-Updates?',
                'a2': 'Patienten erhalten Echtzeit-Updates über die App (Live-Status) und SMS-Benachrichtigungen. Sie können genau sehen, wie viele Personen vor Ihnen sind, und werden benachrichtigt, wenn Sie an der Reihe sind, sodass Sie nicht in der Klinik warten müssen.',
                'q3': 'Können Patienten Termine verschieben?',
                'a3': 'Absolut! Patienten können über die mobile App oder durch Anruf in Ihrer Klinik einen neuen Termin vereinbaren. Das System passt die Warteschlange automatisch an und sendet aktualisierte Benachrichtigungen an die betroffenen Patienten.',
                'q4': 'Werden mehrere Ärzte und Abteilungen unterstützt?',
                'a4': 'Ja! Tokens Boy unterstützt unbegrenzt viele Ärzte und Abteilungen. Jeder Arzt erhält seine eigene Warteschlange, und Patienten werden automatisch zum richtigen Spezialisten geleitet. Perfekt für Kliniken mit mehreren Fachbereichen.',
                'q5': 'Welche Art von Support bieten Sie an?',
                'a5': 'Wir bieten rund um die Uhr Telefon- und E-Mail-Support an. Außerdem erhalten Sie: 1) Einen dedizierten Account Manager, 2) Kostenlose Personalschulung, 3) Regelmäßige System-Updates, 4) Notfall-Support vor Ort bei Bedarf.',
                'q6': 'Wie sicher sind die Patientendaten?',
                'a6': 'Wir nehmen Sicherheit ernst. Alle Daten sind verschlüsselt (256-Bit SSL), werden auf sicheren indischen Servern gespeichert und entsprechen den Datenschutzbestimmungen für das Gesundheitswesen. Regelmäßige Backups stellen sicher, dass Ihre Daten niemals verloren gehen.',
                'get-started': 'Starten', 'get-started-tag': 'Sofort Buchen',
                'get-started-desc': 'Laden Sie die Tokens Boy App für das schnellste Buchungserlebnis herunter. Prüfen Sie die Verfügbarkeit, buchen Sie Ihren Termin und verfolgen Sie Ihren Live-Status.',
                'download-app': 'App Laden', 'download-app-desc': 'Buchen Sie Termine, verfolgen Sie den Live-Status und verwalten Sie Ihre Gesundheitsakten von unterwegs.',
                'contact-title': 'Kontakt', 'contact-tag': 'Kontakt aufnehmen',
                'contact-desc': 'Wir helfen Ihnen, das Patientenmanagement Ihrer Klinik zu transformieren.',
                'phone-title': 'Telefon', 'phone-desc': 'Allgemein: +917996078472',
                'email-title': 'E-Mail', 'email-desc': 'support@tokensboy.com',
                'quick-links': 'Quick-Links', 'features': 'Features', 'contact-info': 'Kontakt-Infos',
                'f1': 'Echtzeit-Updates', 'f2': 'Warteschlangen', 'f3': 'Live-Status', 'f4': 'SMS-Alarme', 'f5': 'Zeitoptimierung',
                'brand-name': 'Tokens Boy', 'get-it-on': 'JETZT BEI', 'google-play': 'Google Play', 'download-on': 'Laden im', 'app-store': 'App Store',
                'page-title': 'Tokens Boy - Einfache Tokens für indische Kliniken'
            },
            'IT': {
                'home': 'Home', 'about': 'Chi Siamo', 'services': 'Servizi', 'faq': 'Domande', 'contact': 'Contatti', 'book': 'Prenota Cita',
                'hero-title': 'Ragazzo dei Gettoni', 'hero-subtitle': 'Token Semplici per Cliniche Indiane',
                'hero-desc': 'Un sistema digitale di code e programmazione per la sanità moderna. Riduci i tempi di attesa e migliora l\'esperienza del paziente con la nostra soluzione.',
                'learn-more': 'Leggi di più', 'about-subtitle': 'Sistema digitale per la sanità moderna.',
                'about-f1': 'Riduce le chiamate e il lavoro manuale.',
                'about-f2': 'Aggiornamenti in tempo reale per evitare conflitti.',
                'about-f3': 'Elimina la confusione nell\'area di attesa.',
                'about-f4': 'Migliora la produttività e la soddisfazione del paziente.',
                'patient-queue': 'CODA PAZIENTI', 'display-footer': 'SISTEMA DIGITALE TOKENS BOY',
                'services-tag': 'Soluzioni Complete per la Gestione dei Token',
                'services-subtitle': 'Scopri perché Tokens Boy è la scelta perfetta per la tua clinica',
                's1-t': 'Token Digitale', 's1-d': 'Sistema moderno per un flusso fluido.',
                's2-t': 'Display LED', 's2-d': 'Grandi schermi LED per massima visibilità.',
                's3-t': 'Mobile App', 's3-d': 'Segui lo stato tramite l\'App Tokens Boy.',
                's4-t': 'Alert SMS', 's4-d': 'Notifiche automatiche per tutti i pazienti.',
                's5-t': 'Planning', 's5-d': 'Sistema intelligente di prenotazione appuntamenti.',
                's6-t': 'App Medico', 's6-d': 'Monitoraggio disponibilità del medico live.',
                's7-t': 'Analisi', 's7-d': 'Report clinici dettagliati e statistiche.',
                's8-t': 'Multi-Clinica', 's8-d': 'Dashboard di gestione centralizzata.',
                'faq-title': 'Domande Frequenti', 'faq-subtitle': 'Risposte alle domande più comuni',
                'q1': 'Come posso scaricare l\'app e prenotare un appuntamento?',
                'a1': 'Basta scaricare l\'app Tokens Boy dal Google Play Store o dall\'Apple App Store. Registrati con il tuo numero di cellulare, cerca la tua clinica/medico e prenota istantaneamente il tuo posto per generare il tuo token digitale.',
                'q2': 'In che modo i pazienti ricevono gli aggiornamenti del token in tempo reale?',
                'a2': 'I pazienti ricevono aggiornamenti in tempo reale tramite l\'App (stato in tempo reale) e notifiche SMS. Puoi vedere esattamente quante persone ci sono davanti a te e ricevere un avviso quando è il tuo turno, così non devi aspettare in clinica.',
                'q3': 'I pazienti possono riprogrammare gli appuntamenti?',
                'a3': 'Assolutamente! I pazienti possono riprogrammare tramite l\'app mobile o chiamando la clinica. Il sistema regola automaticamente la coda e invia notifiche aggiornate ai pazienti interessati.',
                'q4': 'Supporta più medici e reparti?',
                'a4': 'Sì! Tokens Boy supporta medici e reparti illimitati. Ogni medico ha la sua coda e i pazienti vengono indirizzati automaticamente allo specialista corretto. Perfetto per cliniche polispecialistiche.',
                'q5': 'Che tipo di supporto fornite?',
                'a5': 'Forniamo supporto telefonico e via e-mail 24 ore su 24, 7 giorni su 7. Ottieni anche: 1) Account manager dedicato, 2) Formazione gratuita del personale, 3) Aggiornamenti regolari del sistema, 4) Supporto di emergenza in loco quando necessario.',
                'q6': 'Quanto sono sicuri i dati dei pazienti?',
                'a6': 'Prendiamo sul serio la sicurezza. Tutti i dati sono crittografati (SSL a 256 bit), archiviati su server indiani sicuri e conformi alle normative sulla protezione dei dati sanitari. Backup regolari garantiscono che i tuoi dati non vadano mai persi.',
                'get-started': 'Inizia', 'get-started-tag': 'Prenota Istantaneamente',
                'get-started-desc': 'Scarica l\'app Tokens Boy per l\'esperienza di prenotazione più rapida. Controlla la disponibilità, prenota il tuo posto e segui il tuo stato in tempo reale.',
                'download-app': 'Scarica l\'App', 'download-app-desc': 'Prenota appuntamenti, segui lo stato in tempo reale e gestisci le tue cartelle cliniche in movimento.',
                'contact-title': 'Contatti', 'contact-tag': 'Contattaci',
                'contact-desc': 'Trasformiamo la gestione della tua clinica insieme.',
                'phone-title': 'Telefono', 'phone-desc': 'Generale: +917996078472',
                'email-title': 'E-mail', 'email-desc': 'support@tokensboy.com',
                'quick-links': 'Link Rapidi', 'features': 'Funzioni', 'contact-info': 'Informazioni',
                'f1': 'Tempo Reale', 'f2': 'Gestione Code', 'f3': 'Stato Live', 'f4': 'SMS Alert', 'f5': 'Ottimizzazione',
                'brand-name': 'Tokens Boy', 'get-it-on': 'DISPONIBILE SU', 'google-play': 'Google Play', 'download-on': 'Scarica su', 'app-store': 'App Store',
                'page-title': 'Tokens Boy - Token Semplici per Cliniche Indiane'
            },
            'PT': {
                'home': 'Início', 'about': 'Sobre Nós', 'services': 'Serviços', 'faq': 'Perguntas', 'contact': 'Contatos', 'book': 'Agendar Cita',
                'hero-title': 'Garoto das Fichas', 'hero-subtitle': 'Tokens Fáceis para Clínicas Indianas',
                'hero-desc': 'Um sistema digital de filas e agendamento para a saúde moderna. Reduza o tempo de espera e melhore a experiência do paciente.',
                'learn-more': 'Saber Mais', 'about-subtitle': 'Sistema digital projetado para a gestão moderna da saúde.',
                'about-f1': 'Reduz chamadas desnecessárias e coordenação manual.',
                'about-f2': 'Atualizações em tempo real para evitar conflitos.',
                'about-f3': 'Elimina a confusão na área de espera.',
                'about-f4': 'Melhora a produtividade e a experiência do paciente.',
                'patient-queue': 'FILA DE PACIENTES', 'display-footer': 'SISTEMA DIGITAL TOKENS BOY',
                'services-tag': 'Soluções Completas de Gestão de Tokens',
                'services-subtitle': 'Descubra por que o Tokens Boy é a escolha perfeita para sua clínica',
                's1-t': 'Token Digital', 's1-d': 'Sistema moderno para um fluxo suave.',
                's2-t': 'Painel LED', 's2-d': 'Grandes painéis LED para visibilidade clara.',
                's3-t': 'Mobile App', 's3-d': 'Acompanhe o status pelo App Tokens Boy.',
                's4-t': 'Alertas SMS', 's4-d': 'Notificações automáticas para os pacientes.',
                's5-t': 'Agendamento', 's5-d': 'Sistema inteligente de reserva de vagas.',
                's6-t': 'App Médico', 's6-d': 'Tracking em tempo real da disponibilidade médica.',
                's7-t': 'Análise', 's7-d': 'Relatórios clínicos detalhados e insights.',
                's8-t': 'Multiclínica', 's8-d': 'Painel de gestão centralizado.',
                'faq-title': 'Perguntas Frequentes', 'faq-subtitle': 'Encontre respostas para dúvidas comuns',
                'q1': 'Como faço o download e agendo uma consulta?',
                'a1': 'Basta baixar o aplicativo Tokens Boy na Google Play Store ou Apple App Store. Registe-se com o seu número de telemóvel, procure a sua clínica/médico e reserve a sua vaga instantaneamente para gerar o seu token digital.',
                'q2': 'Como os pacientes recebem atualizações de tokens ao vivo?',
                'a2': 'Os pacientes recebem atualizações em tempo real através da aplicação (Estado ao vivo) e notificações SMS. Pode ver exatamente quantas pessoas estão à sua frente e ser alertado quando for a sua vez, para não ter de esperar na clínica.',
                'q3': 'Os pacientes podem reagendar consultas?',
                'a3': 'Com certeza! Os pacientes podem reagendar através da aplicação móvel ou ligando para a sua clínica. O sistema ajusta automaticamente a fila e envia notificações atualizadas aos pacientes afetados.',
                'q4': 'Suporta vários médicos e departamentos?',
                'a4': 'Sim! O Tokens Boy suporta médicos e departamentos ilimitados. Cada médico tem a sua própria fila e os pacientes são encaminhados automaticamente para o especialista correto. Perfeito para clínicas multiespecialidades.',
                'q5': 'Que tipo de suporte oferece?',
                'a5': 'Oferecemos suporte por telefone e e-mail 24 horas por dia, 7 dias por semana. Também recebe: 1) Gestor de conta dedicado, 2) Formação gratuita do pessoal, 3) Atualizações regulares do sistema, 4) Suporte de emergência no local, quando necessário.',
                'q6': 'Quão seguros estão os dados dos pacientes?',
                'a6': 'Levamos a segurança a sério. Todos os datos são encriptados (SSL de 256 bits), armazenados em servidores indianos seguros e cumprem os regulamentos de proteção de dados de saúde. Cópias de segurança regulares garantem que os seus datos nunca se percam.',
                'get-started': 'Iniciar', 'get-started-tag': 'Agende sua Visita',
                'get-started-desc': 'Baixe o aplicativo Tokens Boy para ter a experiência de reserva mais rápida. Verifique a disponibilidade, reserve a sua vaga e acompanhe o seu estado ao vivo.',
                'download-app': 'Baixe o App', 'download-app-desc': 'Agende consultas, acompanhe o estado ao vivo e gira os seus registos de saúde em qualquer lugar.',
                'contact-title': 'Contatos', 'contact-tag': 'Entre em Contato',
                'contact-desc': 'Estamos aqui para transformar a gestão de pacientes na sua clínica.',
                'phone-title': 'Telefone', 'phone-desc': 'Geral: +917996078472',
                'email-title': 'E-mail', 'email-desc': 'support@tokensboy.com',
                'quick-links': 'Links Rápidos', 'features': 'Funcionalidades', 'contact-info': 'Informações',
                'f1': 'Tempo Real', 'f2': 'Gestão de Filas', 'f3': 'Status Live', 'f4': 'Alertas SMS', 'f5': 'Otimização',
                'brand-name': 'Tokens Boy', 'get-it-on': 'DISPONÍVEL NO', 'google-play': 'Google Play', 'download-on': 'Baixar na', 'app-store': 'App Store',
                'page-title': 'Tokens Boy - Tokens Fáceis para Clínicas Indianas'
            },
            'AR': {
                'home': 'الرئيسية', 'about': 'من نحن', 'services': 'الخدمات', 'faq': 'أسئلة شائعة', 'contact': 'اتصل بنا', 'book': 'حجز موعد',
                'hero-title': 'توكنز بوي', 'hero-subtitle': 'نظام توكن سهل للعيادات',
                'hero-desc': 'نظام رقمي لإدارة الطوابير والمواعيد مصمم للرعاية الصحية الحديثة. قلل أوقات الانتظار وحسن تجربة المرضى.',
                'learn-more': 'تعرف أكثر', 'about-subtitle': 'نظام رقمي متكامل لإدارة العيادات والمراكز الطبية.',
                'about-f1': 'يقلل المكالمات غير الضرورية والتنسيق اليدوي.',
                'about-f2': 'تحديثات مباشرة لتجنب تضارب المواعيد.',
                'about-f3': 'يقضي على الفوضى في مناطق الانتظار.',
                'about-f4': 'يحسن الإنتاجية وتجربة المرضى بشكل كبير.',
                'patient-queue': 'طابور المرضى', 'display-footer': 'نظام توكن بوي الرقمي',
                'services-tag': 'حلول شاملة لإدارة التوكن والمواعيد',
                'services-subtitle': 'اكتشف لماذا توكن بوي هو الخيار الأمثل لعيادتك',
                's1-t': 'توكن رقمي', 's1-d': 'نظام حديث لتدفق المرضى بسلاسة.',
                's2-t': 'شاشة LED', 's2-d': 'شاشات كبيرة لوضوح حالة الطابور.',
                's3-t': 'تطبيق جوال', 's3-d': 'تتبع الحالة عبر تطبيق توكن بوي.',
                's4-t': 'تنبيهات SMS', 's4-d': 'إشعارات تلقائية فورية للمرضى.',
                's5-t': 'جدولة ذكية', 's5-d': 'نظام حجز مواعيد متطور وسهل.',
                's6-t': 'تطبيق الطبيب', 's6-d': 'تتبع توفر الأطباء في الوقت الفعلي.',
                's7-t': 'تحليلات', 's7-d': 'تقارير مفصلة عن أداء العيادة.',
                's8-t': 'إدارة فروع', 's8-d': 'لوحة تحكم مركزية للفروع المتعددة.',
                'faq-title': 'الأسئلة الشائعة', 'faq-subtitle': 'اكتشف إجابات على أسئلتك حول توكن بوي',
                'q1': 'كيف يمكنني تحميل التطبيق وحجز موعد؟',
                'a1': 'ببساطة قم بتحميل تطبيق Tokens Boy من متجر Google Play أو Apple App Store. سجل برقم هاتفك المحمول، وابحث عن عيادتك/طبيبك، واحجز مكانك على الفور لإنشاء التوكن الرقمي الخاص بك.',
                'q2': 'كيف يتلقى المرضى تحديثات التوكن المباشرة؟',
                'a2': 'يحصل المرضى على تحديثات في الوقت الفعلي عبر التطبيق (الحالة المباشرة) وإشعارات SMS. يمكنك معرفة عدد الأشخاص الذين يسبقونك بالضبط وتلقي تنبيه عندما يحين دورك، حتى لا تضطر إلى الانتظار في العيادة.',
                'q3': 'هل يمكن للمرضى إعادة جدولة المواعيد؟',
                'a3': 'بالتأكيد! يمكن للمرضى إعادة الجدولة من خلال تطبيق الهاتف المحمول أو عن طريق الاتصال بعيادتك. يقوم النظام تلقائيًا بتعديل الطابور وإرسال إشعارات محدثة للمرضى المتأثرين.',
                'q4': 'هل يدعم العديد من الأطباء والأقسام؟',
                'a4': 'نعم! يدعم Tokens Boy عدداً غير محدود من الأطباء والأقسام. يحصل كل طبيب على طابور خاص به، ويتم توجيه المرضى تلقائياً إلى الاختصاصي الصحيح. مثالي للعيادات متعددة التخصصات.',
                'q5': 'ما نوع الدعم الذي تقدمونه؟',
                'a5': 'نحن نقدم دعماً عبر الهاتف والبريد الإلكتروني على مدار الساعة طوال أيام الأسبوع. ستحصل أيضاً على: 1) مدير حساب مخصص، 2) تدريب مجاني للموظفين، 3) تحديثات منتظمة للنظام، 4) دعم فني في الموقع عند الضرورة.',
                'q6': 'ما مدى أمان بيانات المرضى؟',
                'a6': 'نحن نأخذ الأمان على محمل الجد. يتم تشفير جميع البيانات (SSL 256 بت)، وتخزينها على خوادم هندية آمنة، وتتوافق مع لوائح حماية البيانات الصحية. تضمن النسخ الاحتياطية المنتظمة عدم فقدان بياناتك أبداً.',
                'get-started': 'ابدأ الآن', 'get-started-tag': 'احجز زيارتك فوراً',
                'get-started-desc': 'حمّل تطبيق Tokens Boy للحصول على أسرع تجربة حجز. تحقق من التوفر، واحجز مكانك، وتابع حالتك المباشرة.',
                'download-app': 'حمل تطبيقنا', 'download-app-desc': 'احجز المواعيد، وتابع الحالة المباشرة، وأدر سجلاتك الصحية أثناء التنقل.',
                'contact-title': 'اتصل بنا', 'contact-tag': 'ابقى على تواصل',
                'contact-desc': 'نحن هنا لمساعدتك في تطوير إدارة المرضى في عيادتك.',
                'phone-title': 'أرقام الهاتف', 'phone-desc': 'العام: +917996078472',
                'email-title': 'البريد الإلكتروني', 'email-desc': 'support@tokensboy.com',
                'quick-links': 'روابط سريعة', 'features': 'المميزات', 'contact-info': 'معلومات التواصل',
                'f1': 'تحديثات لحظية', 'f2': 'إدارة طوابير', 'f3': 'حالة مباشرة', 'f4': 'تنبيهات SMS', 'f5': 'تحسين الوقت',
                'brand-name': 'Tokens Boy', 'get-it-on': 'متوفر على', 'google-play': 'Google Play', 'download-on': 'حمل من', 'app-store': 'App Store',
                'page-title': 'Tokens Boy - نظام توكن سهل للعيادات'
            }
        };

        function updateLanguage(lang) {
            const strings = translations[lang];
            if (!strings) return;

            // Updated label based on language logic for special cases
            const labelMap = {
                'EN': 'EN',
                'ES': 'ES',
                'FR': 'FR',
                'DE': 'DE',
                'IT': 'IT',
                'PT': 'PT',
                'AR': 'AR',
                'KN': 'KN'
            };
            langBtn.querySelector('span').textContent = labelMap[lang] || lang;

            // Update Elements with data-i18n
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (strings[key]) {
                    // Check if it's an anchor with nested elements or simple text
                    if (el.children.length === 0) {
                        el.textContent = strings[key];
                    } else {
                        // For elements like data-i18n="about-f1" that have <strong> tags
                        // It's safer to keep the inner HTML structure if we want to preserve <strong>
                        // But since translations vary, let's just update the text content 
                        // unless we want to embed HTML in translation strings.
                        // I will simplify and just update the text for now as per user request.
                        el.innerHTML = strings[key];
                    }
                }
            });

            // Update active state in dropdown
            langLinks.forEach(l => {
                if (l.getAttribute('data-lang') === lang) {
                    l.classList.add('active');
                } else {
                    l.classList.remove('active');
                }
            });
        }

        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langSwitcher.classList.toggle('active');
        });

        langLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = link.getAttribute('data-lang');
                const langLabel = link.getAttribute('data-label');

                // Update UI
                langBtn.querySelector('span').textContent = lang;
                langLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Apply translation (Simulated or Real)
                updateLanguage(lang);

                // Close
                langSwitcher.classList.remove('active');
            });
        });

        document.addEventListener('click', () => {
            langSwitcher.classList.remove('active');
        });
    }
});

// --- Advanced 3D Circular Carousel Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-3d');
    const cards = document.querySelectorAll('.card-wrapper');
    const scene = document.querySelector('.carousel-scene');

    if (!carousel || !cards.length) return;

    let currDeg = 0;
    let targetDeg = 0;
    let isPaused = false;

    // Configuration
    const ROTATION_SPEED = 0.2; // Base auto-rotation speed
    const CARD_COUNT = cards.length;
    const ANGLE_PER_CARD = 360 / CARD_COUNT;

    // Visibility thresholds (degrees from center front)
    // We want Center + Immediate Neighbors visible.
    // 8 Cards = 45 deg intervals. Neighbors are at 45. Next are at 90.
    // So cutoff around 60-70 degrees ensures only 3 are visible.
    const VISIBLE_RANGE = 70;

    function updateCarousel() {
        // Auto-rotation
        if (!isPaused) {
            currDeg -= ROTATION_SPEED;
            targetDeg = currDeg; // Keep target synced
        } else {
            // Smooth snapping to target when paused/clicked
            // Faster snapping (0.4 instead of 0.1) while dragging for instant feedback
            const lerpFactor = isDragging ? 0.4 : 0.1;
            if (Math.abs(targetDeg - currDeg) > 0.01) {
                currDeg += (targetDeg - currDeg) * lerpFactor;
            } else {
                currDeg = targetDeg;
            }
        }

        // Apply rotation to container
        carousel.style.transform = `rotateY(${currDeg}deg)`;

        // Update individual cards
        cards.forEach((wrapper, index) => {
            const card = wrapper.querySelector('.problem-card');
            if (!card) return;

            // Starting angle of the card in the ring
            const initialAngle = index * ANGLE_PER_CARD;

            // Current total angle of the card in world space
            let totalAngle = initialAngle + currDeg;

            // Normalize to -180 to 180 to find distance from "front" (0 deg)
            let normalizedAngle = (totalAngle % 360 + 360) % 360;
            if (normalizedAngle > 180) normalizedAngle -= 360;

            const dist = Math.abs(normalizedAngle);

            // Visibility & Styling Logic
            let opacity = 0;
            let scale = 0.85;
            let blur = 0;
            let pointerEvents = 'none';
            let zIndex = 0;

            // VISIBILITY THRESHOLDS (360/8 = 45deg steps)
            // Center is 0. Neighbors are +/- 45. Next is +/- 90.
            if (dist < 25) {
                // Center Front Card (Active)
                opacity = 1;
                scale = 1.15; // Prominent Center
                blur = 0;
                pointerEvents = 'auto';
                zIndex = 10;
                card.classList.add('active-card');
            } else if (dist < 75) {
                // Side Neighbors (Exact Left/Right are at 45deg)
                // NO FADE, NO BLUR requested
                opacity = 1;
                scale = 0.95; // Slightly smaller via scale only
                blur = 0;
                pointerEvents = 'auto';
                zIndex = 5;
                card.classList.remove('active-card');
            } else {
                // All other cards completely hidden
                opacity = 0;
                scale = 0.5; // Shrink hidden cards
                pointerEvents = 'none';
                card.classList.remove('active-card');
            }

            // Billboarding: Counter-rotate so card faces camera
            card.style.transform = `rotateY(${-totalAngle}deg) scale(${scale})`;
            card.style.opacity = opacity;
            card.style.filter = blur > 0 ? `blur(${blur}px)` : 'none';
            card.style.pointerEvents = pointerEvents;
            wrapper.style.zIndex = zIndex;
        });

        requestAnimationFrame(updateCarousel);
    }

    // Start Loop
    requestAnimationFrame(updateCarousel);

    // --- Interaction Controls ---

    // 1. Mouse Wheel Control (Speed & Direction)
    scene.addEventListener('wheel', (e) => {
        e.preventDefault();
        isPaused = true;

        // Use deltaY to scrub
        const sensitivity = 0.2;
        targetDeg -= e.deltaY * sensitivity;

        // Reset auto-play timer
        clearTimeout(scene.scrollTimeout);
        scene.scrollTimeout = setTimeout(() => {
            isPaused = false;
        }, 800);
    }, { passive: false });

    // 2. Hover Behavior (Pause)
    scene.addEventListener('mouseenter', () => {
        isPaused = true;
        // Snap targetDeg to nearest "slot" (optional, but keeps things clean)
        // For now, just pausing wherever we are is smoother for 'hover'.
        // If we want snapping on hover enter:
        // adjustTargetToNearestSlot();
    });

    scene.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    // 3. Click to Center Card
    cards.forEach((wrapper, index) => {
        wrapper.addEventListener('click', () => {
            // We want this card at 0 deg.
            // Card Angle + currDeg = 0 => currDeg = -Card Angle
            const cardAngle = index * ANGLE_PER_CARD;
            let desiredDeg = -cardAngle;

            // Find closer equivalent rotation (e.g. -360 vs 0)
            const currentRotations = Math.round((currDeg - desiredDeg) / 360);
            desiredDeg += currentRotations * 360;

            targetDeg = desiredDeg;
            isPaused = true; // Stay centered

            // Optionally resume after interaction?
            // setTimeout(() => isPaused = false, 2000);
        });
    });

    // 4. Touch Support (Mobile Swiping - Improved for Android)
    let touchStartX = 0;
    let initialDeg = 0;
    let isDragging = false;
    let lastTouchX = 0;
    let velocity = 0;

    scene.addEventListener('touchstart', (e) => {
        isPaused = true;
        isDragging = true;
        touchStartX = e.touches[0].clientX;
        lastTouchX = touchStartX;
        initialDeg = targetDeg;
        velocity = 0;

        // Prevent text selection during swipe
        document.body.style.userSelect = 'none';

        clearTimeout(scene.scrollTimeout);
    }, { passive: true });

    scene.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const currentX = e.touches[0].clientX;
        const diffX = currentX - touchStartX;

        // sensitivity: 0.35 provides a more 1:1 feel on mobile radius
        const sensitivity = 0.35;
        targetDeg = initialDeg + (diffX * sensitivity);

        // Track velocity for flicking
        velocity = currentX - lastTouchX;
        lastTouchX = currentX;
    }, { passive: true });

    scene.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;

        // Restore text selection
        document.body.style.userSelect = '';

        // Add inertia from velocity
        targetDeg += velocity * 1.5;

        // --- SNAP TO NEAREST CARD ---
        const ANGLE_PER_CARD = 360 / cards.length;

        // targetDeg relative to 0
        // We want CardIndex * ANGLE_PER_CARD + targetDeg = 0
        // So targetDeg = -CardIndex * ANGLE_PER_CARD

        let nearestSlot = Math.round(targetDeg / ANGLE_PER_CARD) * ANGLE_PER_CARD;
        targetDeg = nearestSlot;

        // Resume auto-rotation after delay
        scene.scrollTimeout = setTimeout(() => {
            isPaused = false;
        }, 3000);
    }, { passive: true });

});
