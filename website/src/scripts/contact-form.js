document.addEventListener('DOMContentLoaded', function(event) {
    const form = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit');

    let formSubmitted = 0;
    let isSubmitting = false;

    submitButton.addEventListener('click', function(event) {
        event.preventDefault();

        // Don't let user repeatedly submit data after successfully submitting
        // Maybe user made mistake on first submit and wants to resumbit, so allow a 2nd,
        // but not a 3rd
        if (formSubmitted > 1) {
            event.preventDefault();
            return;
        }

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        isSubmitting = true;

        const formData = new FormData(form);
        const data = {};
        formData.forEach(function(value, key) {
            data[key] = value;
        });

        data['phone'] = data['phone'].replace(/\D/g, '');

        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('');
            }
            return response.json();
        })
        .then(data => {
            var resultDiv = document.getElementById('result');
            if (data.status == 'success') {
                resultDiv.innerHTML = 'Sucess! We will contact you soon';
                resultDiv.className = 'successMessage';
                formSubmitted += 1;
            } else {
                resultDiv.innerHTML = 'Error: ' + data.message;
                resultDiv.className = 'errorMessage';
            }
            console.log(data);
        })
        .catch(error => {
            var resultDiv = document.getElementById('result');
            resultDiv.innerHTML = 'Error: ' + error.message;
            resultDiv.className = 'error';
            console.error('There was a problem with the fetch operation:', error);
        })
        .finally(() => {
            isSubmitting = false;
        });
    });
});
