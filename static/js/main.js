document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerText = 'Sending...';

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            fetch('/api/contact/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': data.csrfmiddlewaretoken
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    message: data.message
                })
            })
                .then(response => response.json())
                .then(result => {
                    showToast(result.message || 'Message sent successfully!', 'success');
                    contactForm.reset();
                })
                .catch(error => {
                    showToast('Something went wrong. Please try again.', 'danger');
                    console.error('Error:', error);
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Get In Touch <i class="bi bi-arrow-right ms-2"></i>';
                });
        });
    }

    function showToast(message, type) {
        const toast = document.getElementById('popupToast');
        const toastMsg = document.getElementById('toastMessage');

        toastMsg.innerText = message;
        // Keep it ultra minimal: black background for success/info, alert color only for errors
        toast.style.background = type === 'success' ? '#111827' : '#000000';
        if (type === 'danger') toast.style.background = '#ef4444';

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getInstance(navbarCollapse).hide();
                }
            }
        });
    });
});
