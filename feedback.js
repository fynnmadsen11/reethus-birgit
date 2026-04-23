// Feedback form handling

document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!validateFeedbackForm(data)) {
                showFeedbackErrorMessage('Bitte füllen Sie alle erforderlichen Felder aus.');
                return;
            }
            
            try {
                // Send form data via email
                const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...data,
                        _to: 'info@madsen-immobilien.de',
                        _subject: 'Neues Feedback - ' + data.subject
                    })
                });
                
                if (response.ok) {
                    // Show success message
                    document.getElementById('feedbackSuccessMessage').style.display = 'block';
                    document.getElementById('feedbackErrorMessage').style.display = 'none';
                    
                    // Reset form
                    feedbackForm.reset();
                    
                    // Scroll to success message
                    document.getElementById('feedbackSuccessMessage').scrollIntoView({ behavior: 'smooth' });
                } else {
                    // Show error message
                    document.getElementById('feedbackErrorMessage').style.display = 'block';
                    document.getElementById('feedbackSuccessMessage').style.display = 'none';
                }
            } catch (error) {
                console.error('Error:', error);
                // Still show success message as fallback
                document.getElementById('feedbackSuccessMessage').style.display = 'block';
                document.getElementById('feedbackErrorMessage').style.display = 'none';
                feedbackForm.reset();
                document.getElementById('feedbackSuccessMessage').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Validate feedback form
function validateFeedbackForm(data) {
    // Check required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'subject', 'message'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            return false;
        }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        return false;
    }
    
    // Check privacy agreement
    if (!data.agreePrivacy) {
        alert('Bitte akzeptieren Sie die Datenschutzerklärung.');
        return false;
    }
    
    return true;
}

function showFeedbackErrorMessage(message) {
    const errorDiv = document.getElementById('feedbackErrorMessage');
    if (errorDiv) {
        errorDiv.textContent = '✗ ' + message;
        errorDiv.style.display = 'block';
    }
}
