// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ===== Navigation & Mobile Menu =====
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-links a');
    
    // Handle scroll events for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // ===== Service Cards Modal =====
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceModal = document.querySelector('.service-modal');
    const modalContent = document.querySelector('.modal-body');
    const closeModal = document.querySelector('.close-modal');
    const serviceDetailsBtns = document.querySelectorAll('.service-details-btn');
    const modalCta = document.querySelector('.modal-cta');
    
    // Service details content
    const serviceDetails = {
        residential: {
            title: "Residential Cleaning Services",
            description: "Our residential cleaning services are designed to transform your home into a pristine, healthy environment. Whether you need regular maintenance or a one-time deep clean, our professional team will exceed your expectations.",
            features: [
                "Customized cleaning plans tailored to your home's specific needs",
                "Weekly, bi-weekly, or monthly scheduling options",
                "Thorough cleaning of all living spaces, kitchens, and bathrooms",
                "Special attention to high-touch surfaces and sanitization",
                "Eco-friendly cleaning products available upon request",
                "Move-in/move-out cleaning services with detailed checklist",
                "Holiday and special occasion preparation cleaning",
                "Satisfaction guaranteed with every visit"
            ]
        },
        commercial: {
            title: "Commercial Cleaning Services",
            description: "Maintain a professional, clean environment for your business with our comprehensive commercial cleaning solutions. We serve a wide range of industries with customized cleaning protocols designed for your specific space.",
            features: [
                "Daily, weekly, or custom schedule maintenance cleaning",
                "Office buildings and coworking spaces",
                "Retail stores and shopping centers",
                "Medical facilities with specialized sanitization protocols",
                "Educational institutions and daycare centers",
                "Banks and financial institutions",
                "Restaurants and food service establishments",
                "Industrial facilities and warehouses"
            ]
        },
        deep: {
            title: "Deep Cleaning Services",
            description: "Our intensive deep cleaning service goes beyond regular cleaning to tackle built-up dirt, grime, and allergens in all the hard-to-reach places. Ideal for seasonal cleaning or preparing for special occasions.",
            features: [
                "Comprehensive baseboard and crown molding cleaning",
                "Behind and under furniture and appliances",
                "Detailed window track, blind, and window cleaning",
                "Ceiling fans, light fixtures, and vents",
                "Cabinet interiors and exteriors",
                "Thorough bathroom descaling and sanitization",
                "Kitchen appliance deep cleaning",
                "Upholstery and carpet deep cleaning available"
            ]
        },
        construction: {
            title: "Post-Construction Cleanup",
            description: "After construction or renovation projects, our specialized team will transform your dust-filled space into a clean, move-in ready environment. We handle all the debris and construction residues with professional equipment and expertise.",
            features: [
                "Complete dust removal from all surfaces, including walls and ceilings",
                "Removal of construction debris and protective coverings",
                "Detailed cleaning of new fixtures and surfaces",
                "Window and glass cleaning to remove dust and stickers",
                "Floor treatment appropriate for new or existing flooring",
                "HVAC vent cleaning to remove construction dust",
                "Post-renovation sanitization of the entire space",
                "Final inspection to ensure move-in readiness"
            ]
        },
        specialized: {
            title: "Specialized Cleaning Services",
            description: "Our specialized cleaning services focus on specific areas or items that require special attention, equipment, or techniques. These targeted solutions ensure every aspect of your space receives the care it deserves.",
            features: [
                "Carpet and upholstery cleaning with hot water extraction",
                "Tile and grout deep cleaning and restoration",
                "Hardwood floor cleaning and polishing",
                "Chandelier and crystal fixture cleaning",
                "High ceiling and hard-to-reach area cleaning",
                "Oriental and area rug specialty cleaning",
                "Natural stone cleaning and sealing",
                "Antique and fine furniture cleaning"
            ]
        },
        eco: {
            title: "Eco-Friendly Cleaning",
            description: "Our eco-friendly cleaning service uses sustainable products and practices to provide a thorough clean while minimizing environmental impact. Perfect for those with sensitivities or a commitment to environmental responsibility.",
            features: [
                "Plant-based, biodegradable cleaning solutions",
                "Non-toxic, hypoallergenic products safe for children and pets",
                "Microfiber technology to reduce waste and improve effectiveness",
                "Water-saving cleaning techniques",
                "HEPA filtration vacuums for improved air quality",
                "Reduced plastic waste through concentrated products",
                "Energy-efficient equipment and practices",
                "Green Seal certified products and methods"
            ]
        }
    };
    
    // Open modal with service details
    function openServiceModal(serviceType) {
        const service = serviceDetails[serviceType];
        if (!service) return;
        
        // Create modal content
        let featuresHTML = '';
        service.features.forEach(feature => {
            featuresHTML += `<li>${feature}</li>`;
        });
        
        modalContent.innerHTML = `
            <h2>${service.title}</h2>
            <p>${service.description}</p>
            <h3>Our ${service.title} Include:</h3>
            <ul>${featuresHTML}</ul>
        `;
        
        // Show modal
        serviceModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Update CTA button text
        modalCta.textContent = `Request ${service.title}`;
        
        // Store service type on button for form selection later
        modalCta.dataset.service = serviceType;
    }
    
    // Add click event to service cards
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if the button inside was clicked
            if (e.target.classList.contains('service-details-btn')) return;
            
            const serviceType = this.dataset.service;
            openServiceModal(serviceType);
        });
    });
    
    // Add click event to "Learn More" buttons
    serviceDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent the card click event
            const serviceType = this.closest('.service-card').dataset.service;
            openServiceModal(serviceType);
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        serviceModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside
    serviceModal.addEventListener('click', function(e) {
        if (e.target === serviceModal) {
            serviceModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Modal CTA button
    modalCta.addEventListener('click', function() {
        serviceModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Scroll to contact form
        const contactForm = document.querySelector('#contact');
        contactForm.scrollIntoView({ behavior: 'smooth' });
        
        // Pre-select the service in the dropdown
        const serviceDropdown = document.querySelector('#service');
        if (serviceDropdown && this.dataset.service) {
            serviceDropdown.value = this.dataset.service;
        }
        
        // Focus the name field
        setTimeout(() => {
            document.querySelector('#name').focus();
        }, 1000);
    });
    
    // ===== Testimonial Carousel =====
    const testimonialContainer = document.querySelector('.testimonial-cards');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialContainer && prevBtn && nextBtn) {
        // Calculate the width to scroll
        const cardWidth = testimonialCards[0].offsetWidth + 30; // Width + gap
        
        prevBtn.addEventListener('click', () => {
            testimonialContainer.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
            testimonialContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });
        
        // Auto scroll testimonials
        let testimonialInterval;
        
        function startTestimonialAutoScroll() {
            testimonialInterval = setInterval(() => {
                if (testimonialContainer.scrollLeft + testimonialContainer.clientWidth >= testimonialContainer.scrollWidth - 10) {
                    // If reached the end, scroll back to start
                    testimonialContainer.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    testimonialContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
                }
            }, 5000); // Auto scroll every 5 seconds
        }
        
        // Start auto scroll
        startTestimonialAutoScroll();
        
        // Pause auto scroll when hovering over testimonials
        testimonialContainer.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialContainer.addEventListener('mouseleave', () => {
            startTestimonialAutoScroll();
        });
    }
    
    // ===== Contact Form Handling =====
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Gather form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // Here you would typically send the data to your server
            // For demo purposes, we'll just log it and show a success message
            console.log('Form submitted with data:', formData);
            
            // Show success message (you would add this element to your HTML)
            const successMessage = document.createElement('div');
            successMessage.classList.add('form-success-message');
            successMessage.innerHTML = `
                <h3>Thank you for your message, ${formData.name}!</h3>
                <p>We've received your inquiry and will contact you shortly.</p>
            `;
            
            // Clear the form
            contactForm.reset();
            
            // Replace form with success message
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
            
            // Reset form after 5 seconds (optional)
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        });
    }
    
    // ===== Smooth Scrolling for Navigation Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Initialize Featured Section Images =====
    const featuredImages = document.querySelectorAll('.featured-image');
    const imagePlaceholders = [
        '/api/placeholder/500/400?text=Advanced+Technology',
        '/api/placeholder/500/400?text=Eco-Friendly',
        '/api/placeholder/500/400?text=Expert+Team'
    ];
    
    // Set background images for featured sections
    featuredImages.forEach((image, index) => {
        if (imagePlaceholders[index]) {
            image.style.backgroundImage = `url('${imagePlaceholders[index]}')`;
        }
    });
    
    // ===== Reveal Animations on Scroll =====
    const revealElements = document.querySelectorAll('.service-card, .featured-item, .testimonial-card');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Initial check on page load
    window.addEventListener('load', revealOnScroll);
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Add revealed class for CSS animations
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .featured-item, .testimonial-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .service-card.revealed, .featured-item.revealed, .testimonial-card.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .featured-item:nth-child(even) {
            transform: translateY(30px);
        }
        
        .featured-item:nth-child(even).revealed {
            transform: translateY(0);
        }
        
        .service-card:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .service-card:nth-child(3) {
            transition-delay: 0.2s;
        }
        
        .service-card:nth-child(4) {
            transition-delay: 0.3s;
        }
        
        .service-card:nth-child(5) {
            transition-delay: 0.4s;
        }
        
        .service-card:nth-child(6) {
            transition-delay: 0.5s;
        }
    `;
    document.head.appendChild(style);
});