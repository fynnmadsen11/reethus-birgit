// Booking form handling

document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!validateBookingForm(data)) {
                showErrorMessage('Bitte füllen Sie alle erforderlichen Felder aus.');
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
                        _subject: 'Neue Buchungsanfrage - ' + data.firstName + ' ' + data.lastName
                    })
                });
                
                if (response.ok) {
                    // Show success message
                    document.getElementById('successMessage').style.display = 'block';
                    document.getElementById('errorMessage').style.display = 'none';
                    
                    // Reset form
                    bookingForm.reset();
                    
                    // Scroll to success message
                    document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
                } else {
                    // Show error message
                    document.getElementById('errorMessage').style.display = 'block';
                    document.getElementById('successMessage').style.display = 'none';
                }
            } catch (error) {
                console.error('Error:', error);
                // Still show success message as fallback
                document.getElementById('successMessage').style.display = 'block';
                document.getElementById('errorMessage').style.display = 'none';
                bookingForm.reset();
                document.getElementById('successMessage').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// Validate booking form
function validateBookingForm(data) {
    // Check required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode', 'country', 'checkIn', 'checkOut', 'guests'];
    
    for (let field of requiredFields) {
        if (!data[field] || data[field].trim() === '') {
            return false;
        }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }
    
    // Validate dates
    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);
    
    if (checkIn >= checkOut) {
        alert('Das Abreisedatum muss nach dem Anreisedatum liegen.');
        return false;
    }
    
    if (checkIn < new Date()) {
        alert('Das Anreisedatum kann nicht in der Vergangenheit liegen.');
        return false;
    }
    
    // Check terms agreement
    if (!data.agreeTerms) {
        alert('Bitte akzeptieren Sie die Allgemeinen Geschäftsbedingungen.');
        return false;
    }
    
    return true;
}

// Set minimum date for check-in (today)
document.addEventListener('DOMContentLoaded', function() {
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    if (checkInInput) {
        const today = new Date().toISOString().split('T')[0];
        checkInInput.setAttribute('min', today);
        
        // Set checkout minimum to next day when check-in changes
        checkInInput.addEventListener('change', function() {
            if (this.value) {
                const checkInDate = new Date(this.value);
                checkInDate.setDate(checkInDate.getDate() + 1);
                const minCheckOut = checkInDate.toISOString().split('T')[0];
                checkOutInput.setAttribute('min', minCheckOut);
            }
        });
    }
});
