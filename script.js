 // Theme Toggle
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = themeToggle.querySelector('i');
        
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        });
        
        // Sticky Navigation
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            header.classList.toggle('sticky', window.scrollY > 0);
        });
        
        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Progress Bar Animation
        function animateProgressBars() {
            const progressBars = document.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
        }
        
        // Counter Animation
        function animateCounters() {
            const counters = document.querySelectorAll('.counter');
            const speed = 200;
            
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    
                    const inc = target / speed;
                    
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 10);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                updateCount();
            });
        }
        
        // Intersection Observer for animations
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };
        
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const experienceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    experienceObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        skillsObserver.observe(document.getElementById('skills'));
        experienceObserver.observe(document.getElementById('experience'));
        
        // Download CV functionality
        document.getElementById('download-cv').addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a dummy CV content
            const cvContent = `
                Name: Muhammad Saad Qasim
                Profession: MERN Stack Developer
                Experience: 1 Year
                
                Skills:
                - HTML, CSS, JavaScript
                - React, Node.js, Express
                - MongoDB, MySQL
                - Tailwind CSS, Chakra UI
                
                Projects:
                - E-commerce Platform
                - Task Management System
                - Social Media Dashboard
                - Twitter Clone
                - Banking Platform
                
                Contact:
                Email: saadqasim19@example.com
                Phone: (+92) 303-566-443
            `;
            
            // Create a Blob and download
            const blob = new Blob([cvContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'saad_qasim_cv.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Show download confirmation
            this.innerHTML = '<i class="fas fa-check"></i> CV Downloaded';
            setTimeout(() => {
                this.innerHTML = 'Download CV';
            }, 2000);
        });