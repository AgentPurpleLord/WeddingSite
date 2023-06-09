function rsvpSubmit() {
    const form = document.getElementById('rsvp-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const guestCountSelect = document.getElementById('guest-count');
        const totalGuestCount = parseInt(guestCountSelect.value);

        const formData = new FormData();

        for (let i = 1; i <= totalGuestCount; i++) {
            const guestNameField = document.querySelector(`input[name="guest${i}-name"]`);
            const guestName = guestNameField.value;

            const dietaryRequirements = [];
            const dietaryCheckboxes = document.getElementsByClassName(`dietary-requirements-checkbox${i}`);

            const otherDietInfo = document.querySelector(`textarea[name="other-diet${i}"]`);
            formData.append(`other-diet${i}`, otherDietInfo.value); // Append the value with the correct name

            formData.append('date', new Date().toISOString());
            formData.append('attendance', document.querySelector('input[name="attendance"]:checked').value);
            formData.append(`guest-name-${i}`, guestName);
            const checkboxArray = Array.from(dietaryCheckboxes);
            checkboxArray.forEach(checkbox => {
                if (checkbox.checked) {
                    const value = checkbox.value.replace(`dietary-requirements${i}_`, '');
                    dietaryRequirements.push(value);
                }
            });

            formData.append(`dietaryRequirements${i}`, dietaryRequirements.join(', '));
        }

        fetch(form.action, {
            method: form.method,
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Form submitted successfully', data);
                // Handle the success response
            })
            .catch(error => {
                console.error('Error submitting the form', error);
                // Handle the error
            });
    });
}

