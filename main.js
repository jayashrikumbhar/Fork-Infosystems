// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Add smooth scrolling to all internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    const cards = document.querySelectorAll('.session-card, .key-point-card, .info-card, .contact-item, .overview-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add hover effects for session cards
    const sessionCards = document.querySelectorAll('.session-card');
    sessionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click-to-copy functionality for phone numbers
    const phoneNumbers = document.querySelectorAll('.contact-item p');
    phoneNumbers.forEach(phone => {
        if (phone.textContent.match(/\d{10}/)) {
            phone.style.cursor = 'pointer';
            phone.title = 'Click to copy';
            
            phone.addEventListener('click', function() {
                const text = this.textContent;
                navigator.clipboard.writeText(text).then(() => {
                    // Show temporary success message
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    this.style.color = '#10b981';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.color = '#6b7280';
                    }, 2000);
                });
            });
        }
    });

    // Add countdown timer for workshop date
    function updateCountdown() {
        const workshopDate = new Date('August 3, 2025 00:00:00').getTime();
        const now = new Date().getTime();
        const distance = workshopDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Create countdown element if it doesn't exist
        let countdownElement = document.getElementById('countdown');
        if (!countdownElement) {
            countdownElement = document.createElement('div');
            countdownElement.id = 'countdown';
            countdownElement.className = 'countdown';
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">Days</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">Hours</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">Minutes</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds}</span>
                    <span class="countdown-label">Seconds</span>
                </div>
            `;
            
            // Insert countdown after the header
            const header = document.querySelector('.header');
            header.parentNode.insertBefore(countdownElement, header.nextSibling);
        } else {
            const numbers = countdownElement.querySelectorAll('.countdown-number');
            numbers[0].textContent = days;
            numbers[1].textContent = hours;
            numbers[2].textContent = minutes;
            numbers[3].textContent = seconds;
        }

        if (distance < 0) {
            countdownElement.innerHTML = '<div class="workshop-live">Workshop is Live!</div>';
        }
    }

    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Add CSS for countdown
    const countdownCSS = `
        .countdown {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 20px 0;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            backdrop-filter: blur(10px);
        }
        
        .countdown-item {
            text-align: center;
            color: white;
        }
        
        .countdown-number {
            display: block;
            font-size: 2rem;
            font-weight: 700;
            line-height: 1;
        }
        
        .countdown-label {
            font-size: 0.9rem;
            opacity: 0.8;
        }
        
        .workshop-live {
            color: white;
            font-size: 1.5rem;
            font-weight: 600;
            text-align: center;
        }
        
        @media (max-width: 768px) {
            .countdown {
                gap: 10px;
                padding: 15px;
            }
            
            .countdown-number {
                font-size: 1.5rem;
            }
            
            .countdown-label {
                font-size: 0.8rem;
            }
        }
    `;

    // Inject CSS
    const style = document.createElement('style');
    style.textContent = countdownCSS;
    document.head.appendChild(style);

    // Add registration form link functionality
    const registrationSection = document.querySelector('.registration');
    if (registrationSection) {
        const registerButton = document.createElement('button');
        registerButton.className = 'register-btn';
        registerButton.innerHTML = '<i class="fas fa-edit"></i> Register Now';
        registerButton.style.cssText = `
            display: block;
            margin: 20px auto;
            padding: 15px 30px;
            background: linear-gradient(135deg, #2563eb, #1e40af);
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
        `;
        
        registerButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
        });
        
        registerButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.3)';
        });
        
        registerButton.addEventListener('click', function() {
            alert('Please contact 7757962804 or 9028276006 for registration link and details.');
        });
        
        //registrationSection.appendChild(registerButton);
    }

    // Add session time highlighting
    function highlightCurrentSession() {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();
        
        const sessions = [
            { start: 9 * 60 + 30, end: 11 * 60 + 30, element: document.querySelector('.session-card:nth-child(1)') },
            { start: 12 * 60, end: 14 * 60, element: document.querySelector('.session-card:nth-child(2)') },
            { start: 14 * 60 + 30, end: 16 * 60 + 30, element: document.querySelector('.session-card:nth-child(3)') }
        ];
        
        sessions.forEach(session => {
            if (session.element) {
                if (currentTime >= session.start && currentTime <= session.end) {
                    session.element.style.border = '3px solid #10b981';
                    session.element.style.transform = 'scale(1.02)';
                } else if (currentTime < session.start) {
                    session.element.style.opacity = '0.8';
                }
            }
        });
    }
    
    // Check if today is workshop day
    const today = new Date();
    const workshopDay = new Date('August 3, 2025');
    if (today.toDateString() === workshopDay.toDateString()) {
        highlightCurrentSession();
        setInterval(highlightCurrentSession, 60000); // Update every minute
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    console.log('ForkInfosystems Workshop Page Loaded Successfully!');
});
