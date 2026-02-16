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
                'tag': 'Tokens Boy',
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
                'page-title': 'Tokens Boy - Easy Tokens for Indian Clinics',
                'location-title': 'Our Location',
                'location-desc': 'Bangalore, Karnataka, India',
                'hours-title': 'Business Hours',
                'hours-desc': 'Mon - Sat: 9:00 AM - 7:00 PM',
                'form-name': 'Full Name',
                'form-email': 'Email Address',
                'form-phone': 'Phone Number',
                'form-message': 'Your Message',
                'form-submit': 'Send Message',
                'form-success': 'Thank you! Your message has been sent successfully. We will get back to you soon.',
                'form-name-placeholder': 'Enter your full name',
                'form-email-placeholder': 'Enter your email',
                'form-phone-placeholder': 'Enter your phone number',
                'form-message-placeholder': 'How can we help you?',
                'form-clinic-name': 'Clinic/Hospital Name',
                'form-clinic-name-placeholder': 'Enter clinic/hospital name',
                'form-location': 'Clinic/Hospital Address',
                'form-location-placeholder': 'Enter clinic/hospital address',
                'form-specialization': 'Specialization',
                'form-specialization-placeholder': 'Enter your specialization',
                'form-mandatory': 'This field is mandatory',
                'form-phone-error': 'Please enter a valid phone number',
                'form-email-error': 'Please enter a valid email address (hash # is not allowed)',
                'how-to-use-title': 'How does Tokens Boy work?',
                'how-to-use-subtitle': 'Watch our quick demonstrations to see how easy it is to manage your clinic and book appointments.',
                'doctor-demo-title': 'For Doctors,',
                'doctor-demo-desc': 'Learn how doctors can manage their clinic, view queues, and update token status in real-time.',
                'patient-demo-title': 'For Patients,',
                'patient-demo-desc': 'See how easy it is for patients to search for clinics, book slots, and track live status.',
                'subtitles-label': 'Demonstration Script:',
                'doctor-demo-subtitles': 'Welcome to the Tokens Boy Doctor App. In this video, we will show you how to manage your daily clinic schedule, view the live token queue, and update patient statuses in real-time with just one click.',
                'patient-demo-subtitles': 'Experience the convenience of booking appointments on the go. This demo walks you through finding the best local clinics, checking real-time token availability, and securing your slot instantly.'
            },
            'KN': {
                'home': 'ಮನೆ',
                'about': 'ನಮ್ಮ ಬಗ್ಗೆ',
                'services': 'ಸೇವೆಗಳು',
                'faq': 'FAQ',
                'contact': 'ಸಂಪರ್ಕಿಸಿ',
                'book': 'ನೇಮಕಾತಿ ಕಾಯ್ದಿರಿಸಿ',
                'tag': 'ಟೋಕನ್ಸ್ ಬಾಯ್',
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
                'page-title': 'ಟೋಕನ್ಸ್ ಬಾಯ್ - ಭಾರತೀಯ ಚಿಕಿತ್ಸಾಲಯಗಳಿಗೆ ಸುಲಭ ಟೋಕನ್ಗಳು',
                'location-title': 'ನಮ್ಮ ಸ್ಥಳ',
                'location-desc': 'ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ, ಭಾರತ',
                'hours-title': 'ವ್ಯವಹಾರದ ಸಮಯ',
                'hours-desc': 'ಸೋಮ - ಶನಿ: 9:00 AM - 7:00 PM',
                'form-name': 'ಪೂರ್ಣ ಹೆಸರು',
                'form-email': 'ಇಮೇಲ್ ವಿಳಾಸ',
                'form-phone': 'ಫೋನ್ ಸಂಖ್ಯೆ',
                'form-message': 'ನಿಮ್ಮ ಸಂದೇಶ',
                'form-submit': 'ಸಂದೇಶ ಕಳುಹಿಸಿ',
                'form-success': 'ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ. ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.',
                'form-name-placeholder': 'ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ',
                'form-email-placeholder': 'ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ',
                'form-phone-placeholder': 'ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ',
                'form-message-placeholder': 'ನಾವು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?',
                'form-clinic-name': 'ಕ್ಲಿನಿಕ್/ಆಸ್ಪತ್ರೆಯ ಹೆಸರು',
                'form-clinic-name-placeholder': 'ಕ್ಲಿನಿಕ್/ಆಸ್ಪತ್ರೆಯ ಹೆಸರನ್ನು ನಮೂದಿಸಿ',
                'form-location': 'ಕ್ಲಿನಿಕ್/ಆಸ್ಪತ್ರೆ ವಿಳಾಸ',
                'form-location-placeholder': 'ಕ್ಲಿನಿಕ್/ಆಸ್ಪತ್ರೆ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ',
                'form-specialization': 'ವಿಶೇಷತೆ',
                'form-specialization-placeholder': 'ನಿಮ್ಮ ವಿಶೇಷತೆಯನ್ನು ನಮೂದಿಸಿ',
                'form-mandatory': 'ಈ ಕ್ಷೇತ್ರ ಕಡ್ಡابةವಾಗಿದೆ',
                'form-phone-error': 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ',
                'form-email-error': 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ (# ಚಿಹ್ನೆಯನ್ನು ಅನುಮತಿಸಲಾಗುವುದಿಲ್ಲ)',
                'how-to-use-title': 'ಟೋಕನ್ಸ್ ಬಾಯ್ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ?',
                'how-to-use-subtitle': 'ನಿಮ್ಮ ಕ್ಲಿನಿಕ್ ಅನ್ನು ನಿರ್ವಹಿಸುವುದು ಮತ್ತು ನೇಮಕಾತಿಗಳನ್ನು ಕಾಯ್ದಿರಿಸುವುದು ಎಷ್ಟು ಸುಲಭ ಎಂದು ನೋಡಲು ನಮ್ಮ ತ್ವರಿತ ಪ್ರಾತ್ಯಕ್ಷಿಕೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ.',
                'doctor-demo-title': 'ವೈದ್ಯರಿಗಾಗಿ,',
                'doctor-demo-desc': 'ವೈದ್ಯರು ತಮ್ಮ ಕ್ಲಿನಿಕ್ ಅನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸಬಹುದು, ಸರತಿ ಸಾಲುಗಳನ್ನು ವೀಕ್ಷಿಸಬಹುದು ಮತ್ತು ನೈಜ ಸಮಯದಲ್ಲಿ ಟೋಕನ್ ಸ್ಥಿತಿಯನ್ನು ಹೇಗೆ ನವೀಕರಿಸಬಹುದು ಎಂಬುದನ್ನು ತಿಳಿಯಿರಿ.',
                'patient-demo-title': 'ರೋಗಿಗಳಿಗಾಗಿ,',
                'patient-demo-desc': 'ರೋಗಿಗಳು ಚಿಕಿತ್ಸಾಲಯಗಳನ್ನು ಹುಡುಕುವುದು, ಸ್ಲಾಟ್‌ಗಳನ್ನು ಕಾಯ್ದಿರಿಸುವುದು ಮತ್ತು ನೇರ ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುವುದು ಎಷ್ಟು ಸುಲಭ ಎಂದು ನೋಡಿ.',
                'subtitles-label': 'ಪ್ರಾತ್ಯಕ್ಷಿಕೆ ಸ್ಕ್ರಿಪ್ಟ್:',
                'doctor-demo-subtitles': 'ಟೋಕನ್ ಬಾಯ್ ಡಾಕ್ಟರ್ ಆಪ್‌ಗೆ ಸ್ವಾಗತ. ಈ ವೀಡಿಯೊದಲ್ಲಿ, ನಿಮ್ಮ ದೈನಂದಿನ ಕ್ಲಿನಿಕ್ ವೇಳಾಪಟ್ಟಿಯನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸುವುದು, ಲೈವ್ ಟೋಕನ್ ಕ್ಯೂ ವೀಕ್ಷಿಸುವುದು ಮತ್ತು ಕೇವಲ ಒಂದು ಕ್ಲಿಕ್‌ನಲ್ಲಿ ರೋಗಿಗಳ ಸ್ಥಿತಿಗಳನ್ನು ನೈಜ ಸಮಯದಲ್ಲಿ ನವೀಕರಿಸುವುದು ಹೇಗೆ ಎಂದು ನಾವು ನಿಮಗೆ ತೋರಿಸುತ್ತೇವೆ.',
                'patient-demo-subtitles': 'ಪ್ರಯಾಣದಲ್ಲಿರುವಾಗ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳನ್ನು ಬುಕ್ ಮಾಡುವ ಸೌಕರ್ಯವನ್ನು ಅನುಭವಿಸಿ. ಈ ಡೆಮೊ ನಿಮಗೆ ಉತ್ತಮ ಸ್ಥಳೀಯ ಚಿಕಿತ್ಸಾಲಯಗಳನ್ನು ಕಂಡುಹಿಡಿಯುವುದು, ನೈಜ-ಸಮಯದ ಟೋಕನ್ ಲಭ್ಯತೆಯನ್ನು ಪರಿಶೀಲಿಸುವುದು ಮತ್ತು ನಿಮ್ಮ ಸ್ಲಾಟ್ ಅನ್ನು ತಕ್ಷಣವೇ ಸುರಕ್ಷಿತಗೊಳಿಸುವುದರ ಮೂಲಕ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ.'
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
                'brand-name': 'Tokens Boy', 'get-it-on': 'Consíguelo en', 'google-play': 'Google Play', 'download-on': 'Descárgalo en',
                'app-store': 'App Store',
                'page-title': 'Tokens Boy - Tokens Fáciles para Clínicas Indias',
                'location-title': 'Nuestra Ubicación',
                'location-desc': 'Bangalore, Karnataka, India',
                'hours-title': 'Horario de Atención',
                'hours-desc': 'Lun - Sáb: 9:00 AM - 7:00 PM',
                'form-name': 'Nombre Completo',
                'form-email': 'Correo Electrónico',
                'form-phone': 'Número de Teléfono',
                'form-message': 'Tu Mensaje',
                'form-submit': 'Enviar Mensaje',
                'form-success': '¡Gracias! Tu mensaje ha sido enviado con éxito. Nos pondremos en contacto contigo pronto.',
                'form-name-placeholder': 'Ingrese su nombre completo',
                'form-email-placeholder': 'Ingrese su correo electrónico',
                'form-phone-placeholder': 'Ingrese su número de teléfono',
                'form-message-placeholder': '¿Cómo podemos ayudarle?',
                'form-clinic-name': 'Nombre de la Clínica/Hospital',
                'form-clinic-name-placeholder': 'Ingrese el nombre de la clínica/hospital',
                'form-location': 'Dirección de la Clínica/Hospital',
                'form-location-placeholder': 'Ingrese la dirección de la clínica/hospital',
                'form-specialization': 'Especialización',
                'form-specialization-placeholder': 'Ingrese su especialización',
                'form-mandatory': 'Este campo es obligatorio',
                'form-phone-error': 'Por favor, ingrese un número de teléfono válido',
                'form-email-error': 'Por favor, ingrese un correo electrónico válido (el símbolo # no está permitido)',
                'how-to-use-title': '¿Cómo funciona Tokens Boy?',
                'how-to-use-subtitle': 'Vea nuestras demostraciones rápidas para ver lo fácil que es administrar su clínica y reservar citas.',
                'doctor-demo-title': 'Demo de la App para Doctores',
                'doctor-demo-desc': 'Aprenda cómo los doctores pueden administrar su clínica, ver colas y actualizar el estado de los tokens en tiempo real.',
                'patient-demo-title': 'Demo de la App para Pacientes',
                'patient-demo-desc': 'Vea lo fácil que es para los pacientes buscar clínicas, reservar turnos y rastrear el estado en vivo.',
                'subtitles-label': 'Guion de la Demostración:',
                'doctor-demo-subtitles': 'Bienvenido a la App para Doctores de Tokens Boy. En este video, le mostraremos cómo administrar su agenda diaria de la clínica, ver la cola de tokens en vivo y actualizar los estados de los pacientes en tiempo real con solo un clic.',
                'patient-demo-subtitles': 'Experimente la comodidad de reservar citas sobre la marcha. Esta demostración lo guiará para encontrar las mejores clínicas locales, verificar la disponibilidad de tokens en tiempo real y asegurar su turno al instante.'
            },
            'FR': {
                'home': 'Accueil', 'about': 'À Propos', 'services': 'Services', 'faq': 'Questions Fréquentes', 'contact': 'Contact', 'book': 'Prendre RDV',
                'hero-title': 'Jetons Garçon',
                'hero-subtitle': 'Tokens Faciles pour Cliniques Indiennes',
                'tag': 'Tokens Boy',
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
                'brand-name': 'Tokens Boy', 'get-it-on': 'Disponible sur', 'google-play': 'Google Play', 'download-on': 'Télécharger sur',
                'app-store': 'App Store',
                'page-title': 'Tokens Boy - Tokens Faciles pour Cliniques Indiennes',
                'location-title': 'Notre Emplacement',
                'location-desc': 'Bangalore, Karnataka, Inde',
                'hours-title': 'Heures d\'Ouverture',
                'hours-desc': 'Lun - Sam: 9h00 - 19h00',
                'form-name': 'Nom Complet',
                'form-email': 'Adresse E-mail',
                'form-phone': 'Numéro de Téléphone',
                'form-message': 'Votre Message',
                'form-submit': 'Envoyer le Message',
                'form-success': 'Merci ! Votre message a été envoyé avec succès. Nous vous recontacterons bientôt.',
                'form-name-placeholder': 'Entrez votre nom complet',
                'form-email-placeholder': 'Entrez votre adresse e-mail',
                'form-phone-placeholder': 'Entrez votre numéro de téléphone',
                'form-message-placeholder': 'Comment pouvons-nous vous aider ?',
                'form-clinic-name': 'Nom de la Clinique/Hôpital',
                'form-clinic-name-placeholder': 'Entrez le nom de la clinique/hôpital',
                'form-location': 'Adresse de la Clinique/Hôpital',
                'form-location-placeholder': 'Entrez l\'adresse de la clinique/hôpital',
                'form-specialization': 'Spécialisation',
                'form-specialization-placeholder': 'Entrez votre spécialisation',
                'form-mandatory': 'Ce champ est obligatoire',
                'form-phone-error': 'Veuillez entrer un numéro de téléphone valide',
                'form-email-error': 'Veuillez entrer une adresse e-mail valide (le symbole # n\'est pas autorisé)',
                'how-to-use-title': 'Comment fonctionne Tokens Boy ?',
                'how-to-use-subtitle': 'Regardez nos démonstrations rapides pour voir à quel point il est facile de gérer votre clinique et de prendre rendez-vous.',
                'doctor-demo-title': 'Démo de l\'App Docteur',
                'doctor-demo-desc': 'Découvrez comment les médecins peuvent gérer leur clinique, voir les files d\'attente et mettre à jour le statut des jetons en temps réel.',
                'patient-demo-title': 'Démo de l\'App Patient',
                'patient-demo-desc': 'Voyez à quel point il est facile pour les patients de rechercher des cliniques, de réserver des créneaux et de suivre le statut en direct.',
                'subtitles-label': 'Script de Démonstration :',
                'doctor-demo-subtitles': 'Bienvenue sur l\'application Tokens Boy Doctor. Dans cette vidéo, nous allons vous montrer comment gérer votre emploi du temps quotidien, consulter la file d\'attente des jetons en direct et mettre à jour le statut des patients en temps réel en un seul clic.',
                'patient-demo-subtitles': 'Découvrez la commodité de prendre rendez-vous en déplacement. Cette démo vous guide pour trouver les meilleures cliniques locales, vérifier la disponibilité des jetons en temps réel et réserver votre créneau instantanément.'
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
                'brand-name': 'Tokens Boy', 'get-it-on': 'JETZT BEI', 'google-play': 'Google Play', 'download-on': 'Laden im',
                'app-store': 'App Store',
                'page-title': 'Tokens Boy - Einfache Tokens für indische Kliniken',
                'location-title': 'Unser Standort',
                'location-desc': 'Bangalore, Karnataka, Indien',
                'hours-title': 'Öffnungszeiten',
                'hours-desc': 'Mo - Sa: 9:00 - 19:00 Uhr',
                'form-name': 'Vollständiger Name',
                'form-email': 'E-Mail-Adresse',
                'form-phone': 'Telefonnummer',
                'form-message': 'Ihre Nachricht',
                'form-submit': 'Nachricht senden',
                'form-success': 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.',
                'form-name-placeholder': 'Geben Sie Ihren vollen Namen ein',
                'form-email-placeholder': 'Geben Sie Ihre E-Mail ein',
                'form-phone-placeholder': 'Geben Sie Ihre Telefonnummer ein',
                'form-message-placeholder': 'Wie können wir Ihnen helfen?',
                'form-clinic-name': 'Klinik-/Krankenhausname',
                'form-clinic-name-placeholder': 'Geben Sie den Klinik-/Krankenhausnamen ein',
                'form-location': 'Klinik-/Krankenhausadresse',
                'form-location-placeholder': 'Geben Sie die Klinik-/Krankenhausadresse ein',
                'form-specialization': 'Spezialisierung',
                'form-specialization-placeholder': 'Geben Sie Ihre Spezialisierung ein',
                'form-mandatory': 'Dieses Feld ist obligatorisch',
                'form-phone-error': 'Bitte geben Sie eine gültige Telefonnummer ein',
                'form-email-error': 'Bitte geben Sie eine gültige E-Mail-Adresse ein (das Symbol # ist nicht zulässig)',
                'how-to-use-title': 'Wie funktioniert Tokens Boy?',
                'how-to-use-subtitle': 'Sehen Sie sich unsere Kurzdemos an, um zu sehen, wie einfach es ist, Ihre Klinik zu verwalten und Termine zu buchen.',
                'doctor-demo-title': 'Arzt-App-Demo',
                'doctor-demo-desc': 'Erfahren Sie, wie Ärzte ihre Klinik verwalten, Warteschlangen einsehen und den Token-Status in Echtzeit aktualisieren können.',
                'patient-demo-title': 'Patienten-App-Demo',
                'patient-demo-desc': 'Sehen Sie, wie einfach es für Patienten ist, nach Kliniken zu suchen, Termine zu buchen und den Live-Status zu verfolgen.',
                'subtitles-label': 'Demonstrationsskript:',
                'doctor-demo-subtitles': 'Willkommen bei der Tokens Boy Doctor App. In diesem Video zeigen wir Ihnen, wie Sie Ihren täglichen Klinikplan verwalten, die Live-Token-Warteschlange anzeigen und den Patientenstatus in Echtzeit mit nur einem Klick aktualisieren können.',
                'patient-demo-subtitles': 'Erleben Sie den Komfort, Termine von unterwegs zu buchen. Diese Demo führt Sie durch die Suche nach den besten lokalen Kliniken, die Überprüfung der Token-Verfügbarkeit in Echtzeit und die sofortige Sicherung Ihres Termins.'
            },
            'IT': {
                'home': 'Home', 'about': 'Chi Siamo', 'services': 'Servizi', 'faq': 'Domande', 'contact': 'Contatti', 'book': 'Prenota Cita',
                'hero-title': 'Ragazzo dei Gettoni',
                'hero-subtitle': 'Token Semplici per Cliniche Indiane',
                'tag': 'Tokens Boy',
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
                'brand-name': 'Tokens Boy', 'get-it-on': 'DISPONIBILE SU', 'google-play': 'Google Play', 'download-on': 'Scarica su',
                'app-store': 'App Store',
                'page-title': 'Tokens Boy - Token Semplici per Cliniche Indiane',
                'location-title': 'La Nostra Posizione',
                'location-desc': 'Bangalore, Karnataka, India',
                'hours-title': 'Orari di Lavoro',
                'hours-desc': 'Lun - Sab: 9:00 - 19:00',
                'form-name': 'Nome Completo',
                'form-email': 'Indirizzo Email',
                'form-phone': 'Numero di Telefono',
                'form-message': 'Il Tuo Messaggio',
                'form-submit': 'Invia Messaggio',
                'form-success': 'Grazie! Il tuo messaggio è stato inviato correttamente. Ti ricontatteremo al più presto.',
                'form-name-placeholder': 'Inserisci il tuo nome completo',
                'form-email-placeholder': 'Inserisci la tua email',
                'form-phone-placeholder': 'Inserisci il tuo numero di telefono',
                'form-message-placeholder': 'Come possiamo aiutarti?',
                'form-clinic-name': 'Nome della Clinica/Ospedale',
                'form-clinic-name-placeholder': 'Inserire il nome della clinica/ospedale',
                'form-location': 'Indirizzo della Clinica/Ospedale',
                'form-location-placeholder': 'Inserisci l\'indirizzo della clinica/ospedale',
                'form-specialization': 'Specializzazione',
                'form-specialization-placeholder': 'Inserisci la tua specializzazione',
                'form-mandatory': 'Questo campo è obbligatorio',
                'form-phone-error': 'Inserisci un numero di telefono valido',
                'form-email-error': 'Inserisci un indirizzo email valido (il simbolo # non è consentito)',
                'how-to-use-title': 'Come funziona Tokens Boy?',
                'how-to-use-subtitle': 'Guarda le nostre brevi dimostrazioni per vedere quanto è facile gestire la tua clinica e prenotare appuntamenti.',
                'doctor-demo-title': 'Demo dell\'App per Medici',
                'doctor-demo-desc': 'Scopri come i medici possono gestire la loro clinica, visualizzare le code e aggiornare lo stato dei token in tempo reale.',
                'patient-demo-title': 'Demo dell\'App per Pazienti',
                'patient-demo-desc': 'Guarda quanto è facile per i pazienti cercare cliniche, prenotare slot e monitorare lo stato in tempo reale.',
                'subtitles-label': 'Script della Dimostrazione:',
                'doctor-demo-subtitles': 'Benvenuti nell\'App Doctor di Tokens Boy. In questo video vi mostreremo come gestire il vostro programma giornaliero, visualizzare la coda dei token in tempo reale e aggiornare lo stato dei pazienti con un solo clic.',
                'patient-demo-subtitles': 'Sperimentate la comodità di prenotare appuntamenti ovunque vi troviate. Questa demo vi guiderà nella ricerca delle migliori cliniche locali, nel controllo della disponibilità dei token in tempo reale e nella prenotazione istantanea del vostro slot.'
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
                'brand-name': 'Tokens Boy', 'get-it-on': 'DISPONÍVEL NO', 'google-play': 'Google Play', 'download-on': 'Baixar na',
                'app-store': 'App Store',
                'page-title': 'Tokens Boy - Tokens Fácéis para Clínicas Indianas',
                'location-title': 'Nossa Localização',
                'location-desc': 'Bangalore, Karnataka, Índia',
                'hours-title': 'Horário de Funcionamento',
                'hours-desc': 'Seg - Sáb: 9:00 - 19:00',
                'form-name': 'Nome Completo',
                'form-email': 'Endereço de E-mail',
                'form-phone': 'Número de Telefone',
                'form-message': 'Sua Mensagem',
                'form-submit': 'Enviar Mensagem',
                'form-success': 'Obrigado! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.',
                'form-name-placeholder': 'Digite seu nome completo',
                'form-email-placeholder': 'Digite seu e-mail',
                'form-phone-placeholder': 'Digite seu número de telefone',
                'form-message-placeholder': 'Como podemos ajudar?',
                'form-clinic-name': 'Nome da Clínica/Hospital',
                'form-clinic-name-placeholder': 'Insira o nome da clínica/hospital',
                'form-location': 'Endereço da Clínica/Hospital',
                'form-location-placeholder': 'Insira o endereço da clínica/hospital',
                'form-specialization': 'Especialização',
                'form-specialization-placeholder': 'Insira sua especialização',
                'form-mandatory': 'Este campo é obrigatório',
                'form-phone-error': 'Por favor, insira um número de telefone válido',
                'form-email-error': 'Por favor, insira um endereço de e-mail válido (o símbolo # não é permitido)',
                'how-to-use-title': 'Como funciona o Tokens Boy?',
                'how-to-use-subtitle': 'Assista às nossas demonstrações rápidas para ver como é fácil gerenciar sua clínica e agendar consultas.',
                'doctor-demo-title': 'Demo do App Médico',
                'doctor-demo-desc': 'Saiba como os médicos podem gerenciar sua clínica, visualizar filas e atualizar o status dos tokens em tempo real.',
                'patient-demo-title': 'Demo do App do Paciente',
                'patient-demo-desc': 'Veja como é fácil para os pacientes pesquisar clínicas, agendar horários e acompanhar o status ao vivo.',
                'subtitles-label': 'Roteiro da Demonstração:',
                'doctor-demo-subtitles': 'Bem-vindo ao Tokens Boy Doctor App. Neste vídeo, mostraremos como gerenciar sua agenda diária da clínica, visualizar a fila de tokens ao vivo e atualizar o status dos pacientes em tempo real com apenas um clique.',
                'patient-demo-subtitles': 'Experimente a conveniência de agendar consultas em qualquer lugar. Esta demonstração guia você na busca pelas melhores clínicas locais, na verificação da disponibilidade de tokens em tempo real e na reserva instantânea de sua vaga.'
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
                'brand-name': 'Tokens Boy', 'get-it-on': 'متوفر على', 'google-play': 'Google Play', 'download-on': 'حمل من',
                'app-store': 'App Store',
                'page-title': 'Tokens Boy - نظام توكن سهل للعيادات',
                'location-title': 'موقعنا',
                'location-desc': 'بنغالور، كارناتاكا، الهند',
                'hours-title': 'ساعات العمل',
                'hours-desc': 'الإثنين - السبت: 9:00 صباحًا - 7:00 مساءً',
                'form-name': 'الاسم الكامل',
                'form-email': 'البريد الإلكتروني',
                'form-phone': 'رقم الهاتف',
                'form-message': 'رسالتك',
                'form-submit': 'إرسال الرسالة',
                'form-success': 'شكرًا لك! تم إرسال رسالتك بنجاح. سنرد عليك قريبًا.',
                'form-name-placeholder': 'أدخل اسمك الكامل',
                'form-email-placeholder': 'أدخل بريدك الإلكتروني',
                'form-phone-placeholder': 'أدخل رقم هاتفك',
                'form-message-placeholder': 'كيف يمكننا مساعدتك؟',
                'form-clinic-name': 'اسم العيادة/المستشفى',
                'form-clinic-name-placeholder': 'أدخل اسم العيادة/المستشفى',
                'form-location': 'عنوان العيادة/المستشفى',
                'form-location-placeholder': 'أدخل عنوان العيادة/المستشفى',
                'form-specialization': 'التخصص',
                'form-specialization-placeholder': 'أدخل تخصصك',
                'form-mandatory': 'هذا الحقل إلزامي',
                'form-phone-error': 'يرجى إدخال رقم هاتف صالح',
                'form-email-error': 'يرجى إدخال بريد إلكتروني صالح (رمز # غير مسموح به)',
                'how-to-use-title': 'كيف يعمل برنامج Tokens Boy؟',
                'how-to-use-subtitle': 'شاهد عروضنا التوضيحية السريعة لترى مدى سهولة إدارة عيادتك وحجز المواعيد.',
                'doctor-demo-title': 'عرض تطبيق الطبيب',
                'doctor-demo-desc': 'تعرف على كيفية قيام الأطباء بإدارة عياداتهم، وعرض قوائم الانتظار، وتحديث حالة التوكن في الوقت الفعلي.',
                'patient-demo-title': 'عرض تطبيق المريض',
                'patient-demo-desc': 'شاهد مدى سهولة قيام المرضى بالبحث عن العيادات، وحجز المواعيد، وتتبع الحالة المباشرة.',
                'subtitles-label': 'نص العرض التوضيحي:',
                'doctor-demo-subtitles': 'مرحبًا بكم في تطبيق Tokens Boy Doctor. في هذا الفيديو، سنوضح لك كيفية إدارة جدول عيادتك اليومي، وعرض قائمة انتظار التوكن المباشرة، وتحديث حالات المرضى في الوقت الفعلي بنقرة واحدة فقط.',
                'patient-demo-subtitles': 'جرب راحة حجز المواعيد أثناء التنقل. يوجهك هذا العرض التوضيحي خلال العثور على أفضل العيادات المحلية، والتحقق من توفر التوكن في الوقت الفعلي، وتأمين موعدك على الفور.'
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
                        el.innerHTML = strings[key];
                    }
                }
            });

            // Update Elements with data-i18n-placeholder
            document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if (strings[key]) {
                    el.setAttribute('placeholder', strings[key]);
                }
            });

            // Update Required Field Messages
            document.querySelectorAll('[required]').forEach(el => {
                el.oninvalid = function (e) {
                    e.target.setCustomValidity("");
                    if (!e.target.validity.valid) {
                        if (e.target.id === 'phone' && e.target.value.length > 0 && (e.target.value.length < 7 || e.target.value.length > 15)) {
                            e.target.setCustomValidity(strings['form-phone-error'] || 'Please enter a valid phone number');
                        } else if (e.target.id === 'email' && e.target.value.length > 0) {
                            e.target.setCustomValidity(strings['form-email-error'] || 'Please enter a valid email address (hash # is not allowed)');
                        } else {
                            e.target.setCustomValidity(strings['form-mandatory'] || 'This field is mandatory');
                        }
                    }
                };
                el.oninput = function (e) {
                    e.target.setCustomValidity("");
                    // Numeric filtering for phone
                    if (e.target.id === 'phone') {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    }
                    // Filtering for email (exclude #)
                    if (e.target.id === 'email') {
                        e.target.value = e.target.value.replace(/[#]/g, '');
                    }
                };
            });

            // Update active state in dropdown
            langLinks.forEach(l => {
                if (l.getAttribute('data-lang') === lang) {
                    l.classList.add('active');
                } else {
                    l.classList.remove('active');
                }
            });

            // Trigger subtitle refresh for live translation
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
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

        // Initialize default language
        updateLanguage('EN');
    }

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponseMessage');

    if (contactForm && formResponse) {
        // --- Custom Country Selector Logic ---
        const trigger = document.getElementById('countrySelectTrigger');
        const options = document.querySelectorAll('.custom-options .option');
        const hiddenInput = document.getElementById('countryCode');
        const selectedFlag = trigger.querySelector('.selected-flag');
        const selectedCode = trigger.querySelector('.selected-code');
        const wrapper = trigger.closest('.custom-select-wrapper');

        if (trigger && options.length > 0) {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                wrapper.classList.toggle('open');
            });

            options.forEach(option => {
                option.addEventListener('click', (e) => {
                    const value = option.getAttribute('data-value');
                    const flag = option.getAttribute('data-flag');

                    // Update UI
                    selectedFlag.textContent = flag;
                    selectedCode.textContent = value;
                    hiddenInput.value = value;

                    // Update active state
                    options.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');

                    wrapper.classList.remove('open');
                });
            });

            // Close on click outside
            document.addEventListener('click', () => {
                wrapper.classList.remove('open');
            });
        }

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            // Get form data
            const cCode = document.getElementById('countryCode').value;
            const phoneNumber = document.getElementById('phone').value;
            const clinicName = document.getElementById('clinicName').value;
            const clinicAddress = document.getElementById('location').value;
            const specialization = document.getElementById('specialization').value;

            const templateParams = {
                from_name: document.getElementById('name').value,
                from_email: document.getElementById('email').value,

                // Phone Number (Matches template {{Phone Number}})
                'Phone Number': `${cCode} ${phoneNumber}`,

                clinic_name: clinicName,

                // Clinic Location (Matches template {{clinic_location}})
                clinic_location: clinicAddress,

                specialization: specialization,
                message: document.getElementById('message').value,
                to_name: 'Tokens Boy Support'
            };

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                // Trigger both main notification and auto-reply concurrently
                const [resultMain, resultAutoReply] = await Promise.all([
                    emailjs.send(
                        'service_gknrwsi',
                        'template_wxpqj5j',
                        templateParams
                    ),
                    emailjs.send(
                        'service_gknrwsi',
                        'template_zx0la2t', // Auto-reply template
                        templateParams
                    )
                ]);

                if (resultMain.status === 200) {
                    contactForm.reset();
                    formResponse.textContent = translations[langBtn.querySelector('span').textContent]?.['form-success'] || 'Thank you! Your message has been sent.';
                    formResponse.className = 'form-message success';
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('EmailJS error:', error);
                formResponse.textContent = 'Oops! Something went wrong. Please try again later.';
                formResponse.className = 'form-message error';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                // Hide message after 5 seconds
                setTimeout(() => {
                    formResponse.className = 'form-message';
                }, 5000);
            }
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

    let lastAppliedDeg = -999;

    function updateCarousel() {
        // Auto-rotation
        if (!isPaused) {
            currDeg -= ROTATION_SPEED;
            targetDeg = currDeg; // Keep target synced
        } else {
            // Smooth snapping to target when paused/clicked
            // Faster snapping (0.4 instead of 0.1) while dragging for instant feedback
            const lerpFactor = isDragging ? 0.4 : 0.1;
            if (Math.abs(targetDeg - currDeg) > 0.001) {
                currDeg += (targetDeg - currDeg) * lerpFactor;
            } else {
                currDeg = targetDeg;
            }
        }

        // Stabilization: Only update DOM if degrees changed significantly
        if (Math.abs(currDeg - lastAppliedDeg) > 0.05) {
            lastAppliedDeg = currDeg;

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
                let scale = 0.8; // Smaller base scale for inactive cards
                let pointerEvents = 'none';
                let zIndex = 0;
                let border = '1px solid rgba(255, 255, 255, 0.6)'; // Default border

                // VISIBILITY THRESHOLDS (360/8 = 45deg steps)
                if (dist < 25) {
                    // Center Front Card (Active)
                    opacity = 1;
                    scale = 1.1; // Prominent Center
                    pointerEvents = 'auto';
                    zIndex = 10;
                    if (!card.classList.contains('active-card')) {
                        card.classList.add('active-card');
                    }
                    border = '1px solid #FF6B35'; // Active Glow Border
                } else if (dist < 75) {
                    // Side Neighbors
                    opacity = 0.6; // Fade out neighbors
                    scale = 0.9;
                    pointerEvents = 'auto';
                    zIndex = 5;
                    if (card.classList.contains('active-card')) {
                        card.classList.remove('active-card');
                    }
                } else {
                    // All other cards completely hidden
                    opacity = 0;
                    scale = 0.5;
                    pointerEvents = 'none';
                    if (card.classList.contains('active-card')) {
                        card.classList.remove('active-card');
                    }
                }

                // Billboarding: Counter-rotate so card faces camera
                // Add a small delay/stabilization to the transform string
                const transform = `rotateY(${-totalAngle.toFixed(2)}deg) scale(${scale})`;
                if (card._lastTransform !== transform) {
                    card.style.transform = transform;
                    card._lastTransform = transform;
                }

                if (card._lastOpacity !== opacity) {
                    card.style.opacity = opacity;
                    card._lastOpacity = opacity;
                }

                if (card._lastBorder !== border) {
                    card.style.border = border;
                    card._lastBorder = border;
                }

                if (card._lastPE !== pointerEvents) {
                    card.style.pointerEvents = pointerEvents;
                    card._lastPE = pointerEvents;
                }

                if (wrapper._lastZI !== zIndex) {
                    wrapper.style.zIndex = zIndex;
                    wrapper._lastZI = zIndex;
                }
            });
        }

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
        const card = wrapper.querySelector('.problem-card');

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

            // Create ripple effect on click
            createRipple(card, event);
        });

        // MAGNETIC HOVER - 3D Tilt Effect
        if (card) {
            wrapper.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const cardCenterX = rect.left + rect.width / 2;
                const cardCenterY = rect.top + rect.height / 2;

                // Calculate mouse position relative to card center
                const mouseX = e.clientX - cardCenterX;
                const mouseY = e.clientY - cardCenterY;

                // Calculate tilt angles (max 15 degrees)
                const maxTilt = 15;
                const tiltX = (mouseY / (rect.height / 2)) * maxTilt;
                const tiltY = -(mouseX / (rect.width / 2)) * maxTilt;

                // Apply magnetic tilt (preserve existing transform from JS)
                const currentTransform = card.style.transform;
                const baseTransform = currentTransform.split('scale')[0]; // Keep rotation
                const scaleMatch = currentTransform.match(/scale\(([^)]+)\)/);
                const currentScale = scaleMatch ? scaleMatch[1] : '1';

                card.style.transform = `${baseTransform} scale(${currentScale}) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
                card.style.transition = 'transform 0.1s ease-out';
            });

            wrapper.addEventListener('mouseleave', () => {
                // Reset tilt smoothly
                card.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                // Remove the perspective tilt, keep base transform
                setTimeout(() => {
                    const currentTransform = card.style.transform;
                    const baseTransform = currentTransform.split('perspective')[0];
                    card.style.transform = baseTransform;
                }, 10);
            });
        }
    });

    // Ripple Effect Function
    function createRipple(card, event) {
        const ripple = document.createElement('div');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(247, 147, 30, 0.4) 0%, transparent 70%);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: rippleExpand 0.8s ease-out;
            z-index: 10;
        `;

        card.appendChild(ripple);
        setTimeout(() => ripple.remove(), 800);
    }

    // Add ripple animation to stylesheet dynamically
    if (!document.getElementById('ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes rippleExpand {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

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

// --- Live Synchronized Subtitles Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Timestamped Transcripts (Localized)
    // Placeholder timings - User should update these with exact words/seconds
    const videoTranscripts = {
        'EN': {
            'doctor': [
                { start: 0, end: 3, text: "♪ Music ♪" },
                { start: 3, end: 6, text: "Managing patients manually can be stressful." },
                { start: 6, end: 10, text: "Long queues, constant interruptions, and time loss." },
                { start: 10, end: 13, text: "Tokens Boy helps doctors manage clinic flow digitally." },
                { start: 13, end: 20, text: "From the app, the clinic can create and control tokens or appointments in real time." },
                { start: 20, end: 25, text: "You can see the full queue, call the next patient, and manage delays easily." },
                { start: 25, end: 31, text: "This means fewer interruptions, better consultation time, and a calm, organized clinic." },
                { start: 31, end: 36, text: "Tokens Boy gives doctors full control of your clinic workflow." },
                { start: 36, end: 40, text: "♪ Music ♪" }
            ],
            'patient': [
                { start: 0, end: 3, text: "♪ Music ♪" },
                { start: 3, end: 7, text: "Experience seamless healthcare at your fingertips." },
                { start: 7, end: 14, text: "With Tokens Boy patient app, easily book appointments for yourself or your loved ones in just a few taps." },
                { start: 14, end: 16, text: "Need to make a change?" },
                { start: 16, end: 20, text: "Reschedule your slot in advance without any hassle." },
                { start: 20, end: 24, text: "Stay informed with real-time notifications directly from your doctor." },
                { start: 24, end: 30, text: "Smarter appointments, smoother care, with Tokens Boy." },
                { start: 30, end: 34, text: "♪ Music ♪" }
            ]
        },
        'KN': {
            'doctor': [
                { start: 0, end: 3, text: "♪ ಸಂಗೀತ ♪" },
                { start: 3, end: 6, text: "ರೋಗಿಗಳನ್ನು ಕೈಯಾರೆ ನಿರ್ವಹಿಸುವುದು ಒತ್ತಡದಿಂದ ಕೂಡಿದೆ." },
                { start: 6, end: 10, text: "ಉದ್ದನೆಯ ಸರತಿ ಸಾಲುಗಳು, ನಿರಂತರ ಅಡಚಣೆಗಳು ಮತ್ತು ಸಮಯದ ನಷ್ಟ." },
                { start: 10, end: 13, text: "ಟೋಕನ್ಸ್ ಬಾಯ್ ವೈದ್ಯರಿಗೆ ಕ್ಲಿನಿಕ್ ಹರಿವನ್ನು ಡಿಜಿಟಲ್ ರೂಪದಲ್ಲಿ ನಿರ್ವಹಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ." },
                { start: 13, end: 20, text: " ಆ್ಯಪ್‌ನಿಂದ, ಕ್ಲಿನಿಕ್ ನೈಜ ಸಮಯದಲ್ಲಿ ಟೋಕನ್‌ಗಳು ಅಥವಾ ನೇಮಕಾತಿಗಳನ್ನು ರಚಿಸಬಹುದು ಮತ್ತು ನಿಯಂತ್ರಿಸಬಹುದು." },
                { start: 20, end: 25, text: "ನೀವು ಸಂಪೂರ್ಣ ಸರದಿಯನ್ನು ನೋಡಬಹುದು, ಮುಂದಿನ ರೋಗಿಯನ್ನು ಕರೆಯಬಹುದು ಮತ್ತು ವಿಳಂಬಗಳನ್ನು ಸುಲಭವಾಗಿ ನಿರ್ವಹಿಸಬಹುದು." },
                { start: 25, end: 31, text: "ಇದರರ್ಥ ಕಡಿಮೆ ಅಡಚಣೆಗಳು, ಉತ್ತಮ ಸಮಾಲೋಚನೆ ಸಮಯ ಮತ್ತು ಶಾಂತ, ಸಂಘಟಿತ ಕ್ಲಿನಿಕ್." },
                { start: 31, end: 36, text: "ಟೋಕನ್ಸ್ ಬಾಯ್ ವೈದ್ಯರಿಗೆ ನಿಮ್ಮ ಕ್ಲಿನಿಕ್ ಕೆಲಸದ ಹರಿವಿನ ಮೇಲೆ ಸಂಪೂರ್ಣ ನಿಯಂತ್ರಣವನ್ನು ನೀಡುತ್ತದೆ." },
                { start: 36, end: 40, text: "♪ ಸಂಗೀತ ♪" }
            ],
            'patient': [
                { start: 0, end: 3, text: "♪ ಸಂಗೀತ ♪" },
                { start: 3, end: 7, text: "ನಿಮ್ಮ ಬೆರಳ ತುದಿಯಲ್ಲಿ ತಡೆರಹಿತ ಆರೋಗ್ಯ ಸೇವೆಯನ್ನು ಅನುಭವಿಸಿ." },
                { start: 7, end: 14, text: "ಟೋಕನ್ಸ್ ಬಾಯ್ ಪೇಷಂಟ್ ಆ್ಯಪ್‌ನೊಂದಿಗೆ, ಕೇವಲ ಕೆಲವು ಟ್ಯಾಪ್‌ಗಳಲ್ಲಿ ನಿಮಗಾಗಿ ಅಥವಾ ನಿಮ್ಮ ಪ್ರೀತಿಪಾತ್ರರಿಗೆ ನೇಮಕಾತಿಗಳನ್ನು ಸುಲಭವಾಗಿ ಬುಕ್ ಮಾಡಿ." },
                { start: 14, end: 16, text: "ಬದಲಾವಣೆ ಮಾಡಬೇಕೆ?" },
                { start: 16, end: 20, text: "ಯಾವುದೇ ತೊಂದರೆಯಿಲ್ಲದೆ ನಿಮ್ಮ ಸ್ಲಾಟ್ ಅನ್ನು ಮುಂಚಿತವಾಗಿ ಮರುಹೊಂದಿಸಿ." },
                { start: 20, end: 23, text: "ನಿಮ್ಮ ವೈದ್ಯರಿಂದ ನೇರವಾಗಿ ನೈಜ-ಸಮಯದ ಅಧಿಸೂಚನೆಗಳೊಂದಿಗೆ ಮಾಹಿತಿಯನ್ನು ಪಡೆಯಿರಿ." },
                { start: 23, end: 28, text: "ಟೋಕನ್ಸ್ ಬಾಯ್‌ನೊಂದಿಗೆ ಸ್ಮಾರ್ಟರ್ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್‌ಗಳು, ಸುಗಮ ಆರೈಕೆ." },
                { start: 29, end: 34, text: "♪ ಸಂಗೀತ ♪" }
            ]
        },
        'ES': {
            'doctor': [
                { start: 0, end: 3, text: "♪ Música ♪" },
                { start: 3, end: 6, text: "Administrar pacientes manualmente puede ser estresante." },
                { start: 6, end: 10, text: "Largas colas, constantes interrupciones y pérdida de tiempo." },
                { start: 10, end: 13, text: "Tokens Boy ayuda a los médicos a gestionar el flujo de la clínica digitalmente." },
                { start: 13, end: 20, text: "Desde la aplicación, la clínica puede crear y controlar turnos o citas en tiempo real." },
                { start: 20, end: 25, text: "Puede ver la cola completa, llamar al siguiente paciente y gestionar retrasos fácilmente." },
                { start: 25, end: 31, text: "Esto significa menos interrupciones, mejor tiempo de consulta y una clínica tranquila y organizada." },
                { start: 31, end: 36, text: "Tokens Boy ofrece a los médicos el control total de su flujo de trabajo clínico." },
                { start: 36, end: 40, text: "♪ Música ♪" }
            ],
            'patient': [
                { start: 0, end: 3, text: "♪ Música ♪" },
                { start: 3, end: 7, text: "Experimente una atención médica perfecta al alcance de su mano." },
                { start: 7, end: 14, text: "Con la aplicación para pacientes Tokens Boy, reserve citas fácilmente para usted o sus seres queridos en solo unos pocos toques." },
                { start: 14, end: 16, text: "¿Necesita hacer un cambio?" },
                { start: 16, end: 20, text: "Reprograme su turno con anticipación sin problemas." },
                { start: 20, end: 24, text: "Manténgase informado con notificaciones en tiempo real directamente de su médico." },
                { start: 24, end: 30, text: "Citas más inteligentes, atención más fluida con Tokens Boy." },
                { start: 30, end: 34, text: "♪ Música ♪" }
            ]
        },
        'FR': {
            'doctor': [
                { start: 0, end: 3, text: "♪ Musique ♪" },
                { start: 3, end: 6, text: "Gérer les patients manuellement peut être stressant." },
                { start: 6, end: 10, text: "Longues files d'attente, interruptions constantes et perte de temps." },
                { start: 10, end: 13, text: "Tokens Boy aide les médecins à gérer le flux de la clinique de manière numérique." },
                { start: 13, end: 20, text: "Depuis l'application, la clinique peut créer et contrôler des jetons ou des rendez-vous en temps réel." },
                { start: 20, end: 25, text: "Vous pouvez voir la file d'attente complète, appeler le patient suivant et gérer facilement les retards." },
                { start: 25, end: 31, text: "Cela signifie moins d'interruptions, un meilleur temps de consultation et une clinique calme et organisée." },
                { start: 31, end: 36, text: "Tokens Boy donne aux médecins le plein contrôle de leur flux de travail clinique." },
                { start: 36, end: 40, text: "♪ Musique ♪" }
            ],
            'patient': [
                { start: 0, end: 3, text: "♪ Musique ♪" },
                { start: 3, end: 7, text: "Bénéficiez de soins de santé fluides à portée de main." },
                { start: 7, end: 14, text: "Avec l'application Patient Tokens Boy, prenez facilement rendez-vous pour vous ou vos proches en quelques gestes." },
                { start: 14, end: 16, text: "Besoin de faire un changement ?" },
                { start: 16, end: 20, text: "Reprogrammez votre créneau à l'avance sans tracas." },
                { start: 20, end: 24, text: "Restez informé grâce aux notifications en temps réel directement de votre médecin." },
                { start: 24, end: 30, text: "Des rendez-vous plus intelligents, des soins plus fluides avec Tokens Boy." },
                { start: 30, end: 34, text: "♪ Musique ♪" }
            ]
        },
        'DE': {
            'doctor': [
                { start: 0, end: 3, text: "♪ Musik ♪" },
                { start: 3, end: 6, text: "Die manuelle Patientenverwaltung kann stressig sein." },
                { start: 6, end: 10, text: "Lange Warteschlangen, ständige Unterbrechungen und Zeitverlust." },
                { start: 10, end: 13, text: "Tokens Boy hilft Ärzten, den Klinikablauf digital zu verwalten." },
                { start: 13, end: 20, text: "Über die App kann die Klinik Tokens oder Termine in Echtzeit erstellen und steuern." },
                { start: 20, end: 25, text: "Sie können die gesamte Warteschlange einsehen, den nächsten Patienten aufrufen und Verzögerungen einfach verwalten." },
                { start: 25, end: 31, text: "Das bedeutet weniger Unterbrechungen, mehr Beratungszeit und eine ruhige, organisierte Klinik." },
                { start: 31, end: 36, text: "Tokens Boy gibt Ärzten die volle Kontrolle über ihren Klinik-Arbeitsablauf." },
                { start: 36, end: 40, text: "♪ Musik ♪" }
            ],
            'patient': [
                { start: 0, end: 3, text: "♪ Musik ♪" },
                { start: 3, end: 7, text: "Erleben Sie eine nahtlose Gesundheitsversorgung auf Knopfdruck." },
                { start: 7, end: 14, text: "Mit der Tokens Boy Patienten-App können Sie mit nur wenigen Klicks Termine für sich selbst oder Ihre Angehörigen buchen." },
                { start: 14, end: 16, text: "Müssen Sie etwas ändern ?" },
                { start: 16, end: 20, text: "Verschieben Sie Ihren Termin im Voraus ohne Probleme." },
                { start: 20, end: 24, text: "Bleiben Sie mit Echtzeit-Benachrichtigungen direkt von Ihrem Arzt auf dem Laufenden." },
                { start: 24, end: 30, text: "Intelligentere Termine, reibungslosere Versorgung mit Tokens Boy." },
                { start: 30, end: 34, text: "♪ Musik ♪" }
            ]
        },
        'IT': {
            'doctor': [
                { start: 0, end: 3, text: "♪ Musica ♪" },
                { start: 3, end: 6, text: "Gestire i pazienti manualmente può essere stressante." },
                { start: 6, end: 10, text: "Lunghe code, costanti interruzioni e perdita di tempo." },
                { start: 10, end: 13, text: "Tokens Boy aiuta i medici a gestire digitalmente il fluxo della clinica." },
                { start: 13, end: 20, text: "Dall'app, la clinica può creare e controllare token o appuntamenti in tempo reale." },
                { start: 20, end: 25, text: "È possibile vedere l'intera coda, chiamare il prossimo paziente e gestire facilmente i ritardi." },
                { start: 25, end: 31, text: "Questo significa meno interruzioni, migliori tempi di consultazione e una clinica calma e organizzata." },
                { start: 31, end: 36, text: "Tokens Boy offre ai medici il pieno controllo sul flusso di lavoro della loro clinica." },
                { start: 36, end: 40, text: "♪ Musica ♪" }
            ],
            'patient': [
                { start: 0, end: 3, text: "♪ Musica ♪" },
                { start: 3, end: 7, text: "Sperimentate un'assistenza sanitaria senza intoppi a portata di mano." },
                { start: 7, end: 14, text: "Con l'App Paziente Tokens Boy, prenotate facilmente appuntamenti per voi o per i vostri cari in pochi tocchi." },
                { start: 14, end: 16, text: "Dovete apportare una modifica ?" },
                { start: 16, end: 20, text: "Riprogrammate il vostro slot in anticipo senza problemi." },
                { start: 20, end: 24, text: "Rimanete informati con notifiche in tempo reale direttamente dal vostro medico." },
                { start: 24, end: 30, text: "Appuntamenti più intelligenti, cure più fluide con Tokens Boy." },
                { start: 30, end: 34, text: "♪ Musica ♪" }
            ]
        },
        'PT': {
            'doctor': [
                { start: 0, end: 3, text: "♪ Música ♪" },
                { start: 3, end: 6, text: "Gerenciar pacientes manualmente pode ser estressante." },
                { start: 6, end: 10, text: "Longas filas, interrupções constantes e perda de tempo." },
                { start: 10, end: 13, text: "Tokens Boy ajuda os médicos a gerenciar o fluxo da clínica digitalmente." },
                { start: 13, end: 20, text: "A partir do aplicativo, a clínica pode criar e controlar tokens ou consultas em tempo real." },
                { start: 20, end: 25, text: "Você pode ver a fila completa, chamar o próximo paciente e gerenciar atrasos facilmente." },
                { start: 25, end: 31, text: "Isso significa menos interrupções, melhor tempo de consulta e uma clínica calma e organizada." },
                { start: 31, end: 36, text: "Tokens Boy dá aos médicos controle total sobre o fluxo de trabalho da clínica." },
                { start: 36, end: 40, text: "♪ Música ♪" }
            ],
            'patient': [
                { start: 0, end: 3, text: "♪ Música ♪" },
                { start: 3, end: 7, text: "Experimente cuidados de saúde integrados ao seu alcance." },
                { start: 7, end: 14, text: "Com o aplicativo do paciente Tokens Boy, agende consultas facilmente para você ou seus entes queridos em apenas alguns toques." },
                { start: 14, end: 16, text: "Precisa fazer uma alteração?" },
                { start: 16, end: 20, text: "Reagende sua vaga com antecedência, sem complicações." },
                { start: 20, end: 24, text: "Mantenha-se informado com notificações em tempo real diretamente do seu médico." },
                { start: 24, end: 30, text: "Consultas mais inteligentes, atendimento mais tranquilo com Tokens Boy." },
                { start: 30, end: 34, text: "♪ Música ♪" }
            ]
        },
        'AR': {
            'doctor': [
                { start: 0, end: 3, text: "♪ موسيقى ♪" },
                { start: 3, end: 6, text: "يمكن أن تكون إدارة المرضى يدويًا أمرًا مرهقًا." },
                { start: 6, end: 10, text: "طوابير طويلة، وانقطاعات مستمرة، وضياع للوقت." },
                { start: 10, end: 13, text: "يساعد Tokens Boy الأطباء على إدارة تدفق العيادة رقميًا." },
                { start: 13, end: 20, text: "من التطبيق، يمكن للعيادة إنشاء والتحكم في التوكنات أو المواعيد في الوقت الفعلي." },
                { start: 20, end: 25, text: "يمكنك رؤية قائمة الانتظار الكاملة، والاتصال بالمريض التالي، وإدارة التأخيرات بسهولة." },
                { start: 25, end: 31, text: "هذا يعني انقطاعات أقل، ووقت استشارة أفضل، وعيادة هادئة ومنظمة." },
                { start: 31, end: 36, text: "يمنحه Tokens Boy الأطباء سيطرة كاملة على سير عمل عيادتك." },
                { start: 36, end: 40, text: "♪ موسيقى ♪" }
            ],
            'patient': [
                { start: 0, end: 3, text: "♪ موسيقى ♪" },
                { start: 3, end: 7, text: "اختبر رعاية صحية سلسة في متناول يدك." },
                { start: 7, end: 14, text: "باستخدام تطبيق مريض Tokens Boy، يمكنك حجز المواعيد بسهولة لنفسك أو لأحبائك في بضع نقرات فقط." },
                { start: 14, end: 16, text: "هل تحتاج إلى إجراء تغيير؟" },
                { start: 16, end: 20, text: "قم بتغيير موعدك مسبقًا دون أي عناء." },
                { start: 20, end: 24, text: "ابق على اطلاع مع إشعارات في الوقت الفعلي مباشرة من طبيبك." },
                { start: 24, end: 30, text: "مواعيد أكثر ذكاءً، ورعاية أكثر سلاسة مع Tokens Boy." },
                { start: 30, end: 34, text: "♪ موسيقى ♪" }
            ]
        }
    };

    // Kannada Audio Assets
    const kannadaAudios = {
        'doctor': 'assets/audio kannada doctor.mp3',
        'patient': 'assets/audio kannada patient.mp3'
    };

    // Helper to aggregate all subtitles up to current time with word-by-word reveal
    function getAccumulatedSubtitles(currentTime, transcriptList) {
        if (!transcriptList) return "";

        let result = "";
        for (let i = 0; i < transcriptList.length; i++) {
            const item = transcriptList[i];

            if (currentTime >= item.start) {
                if (currentTime >= item.end) {
                    // Full sentence already spoken
                    result += item.text + " ";
                } else {
                    // Current active sentence - calculate word reveal
                    const words = item.text.split(" ");
                    const duration = item.end - item.start;
                    const elapsed = currentTime - item.start;
                    const wordCount = Math.floor((elapsed / duration) * words.length);

                    const visibleWords = words.slice(0, Math.max(1, wordCount)).join(" ");
                    result += visibleWords + " ";
                    break; // Stop at the active scrolling line
                }
            } else {
                break; // Sentence hasn't started yet
            }
        }
        return result.trim();
    }

    // Main sync function with Dual-Engine Audio support
    function initVideoSync(videoId, subtitleId, demoKey) {
        const video = document.getElementById(videoId);
        const subtitleBox = document.getElementById(subtitleId);

        if (!video || !subtitleBox) return;

        // Initialize Kannada Audio engine
        const knAudio = new Audio(kannadaAudios[demoKey]);
        knAudio.preload = "auto";

        const refreshSubtitles = () => {
            const currentLang = document.querySelector('.lang-btn span')?.textContent || 'EN';

            // Audio/Video Muting & Sync Logic
            if (currentLang === 'KN') {
                video.muted = true;
                if (!video.paused && !video.ended) {
                    if (knAudio.paused) knAudio.play().catch(() => { });
                }

                // Sync playback rates to minimize drift
                if (knAudio.playbackRate !== video.playbackRate) {
                    knAudio.playbackRate = video.playbackRate;
                }

                // Keep audio time in sync with video (Relaxed threshold: 0.5s)
                // Only seek if drift is significant to avoid stuttering/repeating words
                if (Math.abs(knAudio.currentTime - video.currentTime) > 0.5) {
                    knAudio.currentTime = video.currentTime;
                }
            } else {
                video.muted = false;
                if (!knAudio.paused) knAudio.pause();
            }

            const scripts = videoTranscripts[currentLang] || videoTranscripts['EN'];
            const demoScript = scripts[demoKey];

            const accumulatedText = getAccumulatedSubtitles(video.currentTime, demoScript);

            if (subtitleBox.innerText !== accumulatedText) {
                subtitleBox.innerText = accumulatedText || "";
                subtitleBox.scrollTop = subtitleBox.scrollHeight;
            }
        };

        // Event Listeners for seamless sync
        video.addEventListener('timeupdate', refreshSubtitles);
        video.addEventListener('seeked', () => {
            knAudio.currentTime = video.currentTime;
            refreshSubtitles();
        });

        video.addEventListener('play', () => {
            const currentLang = document.querySelector('.lang-btn span')?.textContent || 'EN';
            if (currentLang === 'KN') knAudio.play().catch(() => { });
        });

        video.addEventListener('pause', () => {
            knAudio.pause();
        });

        // Global refresh on language change
        window.addEventListener('languageChanged', () => {
            refreshSubtitles();
            if (document.querySelector('.lang-btn span')?.textContent !== 'KN') {
                knAudio.pause();
            }
        });
    }

    // Initialize synchronization for both videos
    initVideoSync('video-doctor', 'subtitles-doctor', 'doctor');
    initVideoSync('video-patient', 'subtitles-patient', 'patient');

    // --- Carousel Logic ---
    const track = document.querySelector('.carousel-track');
    const items = Array.from(document.querySelectorAll('.carousel-item'));
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dots = Array.from(document.querySelectorAll('.nav-dot'));

    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    // Function to update slide position
    const updateSlide = (index) => {
        if (index < 0) index = 0;
        if (index >= items.length) index = items.length - 1;

        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update items (for 3D focus effect)
        items.forEach((item, idx) => {
            item.classList.toggle('active', idx === currentIndex);
        });

        // Update dots
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });

        // Pause other videos when switching
        items.forEach((item, idx) => {
            const video = item.querySelector('video');
            if (idx !== currentIndex && video) {
                video.pause();
            }
        });
    };

    // Initialize first slide as active
    updateSlide(0);

    // Button click listeners
    nextBtn?.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            updateSlide(currentIndex + 1);
        }
    });

    prevBtn?.addEventListener('click', () => {
        if (currentIndex > 0) {
            updateSlide(currentIndex - 1);
        }
    });

    // Dot click listeners
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateSlide(index));
    });

    // --- Touch Support for Swipe ---
    track?.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    track?.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;

        // If horizontal movement is significant, prevent scrolling
        if (Math.abs(diff) > 10) {
            // e.preventDefault(); // Might cause issues with page scroll
        }
    });

    track?.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        // Threshold for swipe (50px)
        if (diff > 50) {
            // Swipe Left -> Next
            if (currentIndex < items.length - 1) updateSlide(currentIndex + 1);
        } else if (diff < -50) {
            // Swipe Right -> Prev
            if (currentIndex > 0) updateSlide(currentIndex - 1);
        }

        isDragging = false;
    });

    // --- Mouse Drag Support (Optional but professional) ---
    track?.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
    });

    window.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        const endX = e.clientX;
        const diff = startX - endX;

        if (diff > 100) {
            if (currentIndex < items.length - 1) updateSlide(currentIndex + 1);
        } else if (diff < -100) {
            if (currentIndex > 0) updateSlide(currentIndex - 1);
        }
        isDragging = false;
    });
});
