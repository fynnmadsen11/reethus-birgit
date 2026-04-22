// Main JavaScript file for the website

// Active navigation link
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '/' && href === '#home')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Show/hide pet details based on radio selection
document.addEventListener('DOMContentLoaded', function() {
    const petYes = document.querySelector('input[name="pets"][value="yes"]');
    const petNo = document.querySelector('input[name="pets"][value="no"]');
    const petDetails = document.getElementById('petDetails');
    
    if (petYes && petNo && petDetails) {
        function updatePetDetails() {
            if (petYes.checked) {
                petDetails.classList.add('show');
                petDetails.style.display = 'block';
            } else {
                petDetails.classList.remove('show');
                petDetails.style.display = 'none';
            }
        }
        
        petYes.addEventListener('change', updatePetDetails);
        petNo.addEventListener('change', updatePetDetails);
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
