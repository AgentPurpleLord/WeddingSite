// Global variables
let guestData = []; // Array to store guest data

document.addEventListener('DOMContentLoaded', function () {
    const guestCountSelect = document.getElementById('guest-count');
    guestCountSelect.addEventListener('change', generateGuestInputs);
    // Retrieve guest data from localStorage
    const storedGuestData = localStorage.getItem('guestData');
    if (storedGuestData) {
        guestData = JSON.parse(storedGuestData);
        guestCountSelect.value = guestData.length; // Set the guest count select value
    }
    generateGuestInputs(); // Generate guest inputs on page load
});

function generateGuestInputs() {
    const guestCountSelect = document.getElementById('guest-count');
    const guestInputsContainer = document.getElementById('guest-inputs-container');

    const totalGuestCount = parseInt(guestCountSelect.value);

    // Update existing guestData for persistent data
    for (let i = 0; i < totalGuestCount; i++) {
        const existingGuest = guestData[i];
        if (existingGuest) {
            existingGuest.index = i + 1;
        } else {
            const guest = {index: i + 1, name: '', dietaryRequirements: [], foodAllergies: ''};
            guestData.push(guest);
        }
    }

    // Remove excess guestData for reduced guest count
    if (guestData.length > totalGuestCount) {
        guestData.splice(totalGuestCount);
    }

    guestInputsContainer.innerHTML = '';

    localStorage.setItem('guestData', JSON.stringify(guestData));

    for (const element of guestData) {
        const guest = element;

        const guestCard = document.createElement('div');
        guestCard.className = 'guest-card';
        guestInputsContainer.appendChild(guestCard);

        const guestNum = document.createElement('p');
        guestNum.className = 'guest-num';
        guestNum.textContent = `${guest.index}`;
        guestCard.appendChild(guestNum);

        const guestNameDiv = document.createElement('div');
        guestNameDiv.className = 'guest-name-div';
        const guestName = document.createElement('input');
        guestName.type = 'text';
        guestName.name = `guest${guest.index}-name`;
        guestName.className = 'guest-name';
        guestName.required = true;
        guestName.placeholder = 'Your name...';
        guestName.value = guest.name; // Set the input value from guest data
        guestNameDiv.appendChild(guestName);
        guestCard.appendChild(guestNameDiv);

        guestName.addEventListener('input', function () {
            guest.name = guestName.value;
            localStorage.setItem('guestData', JSON.stringify(guestData));
        });

        const guestDietary = document.createElement('div');
        guestDietary.className = 'guest-dietary';
        guestDietary.id = `dietary-requirements${guest.index}`;

        const dietaryOptions = [
            { value: 'Vegetarian', label: 'Vegetarian' },
            { value: 'Vegan', label: 'Vegan' },
            { value: 'Gluten-free', label: 'Gluten-free' },
            { value: 'Nut-free', label: 'Nut-free' },
            { value: 'Dairy-free', label: 'Dairy-free' },
            { value: 'Other', label: 'Other' }
        ];

        dietaryOptions.forEach(option => {
            const holderDiv = document.createElement('div');
            guestDietary.appendChild(holderDiv);

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = `dietary-requirements${guest.index}_${option.value}`;
            checkbox.value = option.value;
            checkbox.id = `${option.value}${guest.index}`;
            checkbox.className = `dietary-requirements-checkbox${guest.index} dietary-requirements-checkbox`;
            checkbox.onchange = handleDietaryRequirements.bind(null, guest.index);

            const checkboxLabel = document.createElement('label');
            checkboxLabel.textContent = option.label;
            checkboxLabel.htmlFor = `${option.value}${guest.index}`;

            holderDiv.appendChild(checkbox);
            holderDiv.appendChild(checkboxLabel);

            if (guest.dietaryRequirements.includes(option.value)) {
                checkbox.checked = true;
            }
        });

        const foodAllergiesTextarea = document.createElement('textarea');
        foodAllergiesTextarea.id = `food-allergies${guest.index}`;
        foodAllergiesTextarea.className = 'food-allergies';
        foodAllergiesTextarea.placeholder = 'Let us know about anything else.';
        foodAllergiesTextarea.style.display = guest.dietaryRequirements.includes('Other') ? 'block' : 'none';
        foodAllergiesTextarea.required = guest.dietaryRequirements.includes('Other');
        foodAllergiesTextarea.value = guest.foodAllergies; // Set the textarea value from guest data
        foodAllergiesTextarea.name = `other-diet${guest.index}`;

        foodAllergiesTextarea.addEventListener('input', function () {
            guest.foodAllergies = foodAllergiesTextarea.value;
            localStorage.setItem('guestData', JSON.stringify(guestData));
        });

        guestDietary.appendChild(foodAllergiesTextarea);
        guestCard.appendChild(guestDietary);
    }
}

function handleDietaryRequirements(guestIndex) {
    const dietaryRequirementCheckboxes = document.getElementsByClassName(`dietary-requirements-checkbox${guestIndex}`);
    const guest = guestData[guestIndex - 1];

    guest.dietaryRequirements = []; // Reset dietaryRequirements before updating

    for (const element of dietaryRequirementCheckboxes) {
        const checkbox = element;
        const foodAllergiesTextarea = document.getElementById(`food-allergies${guestIndex}`);

        if (checkbox.checked) {
            guest.dietaryRequirements.push(checkbox.value);
            foodAllergiesTextarea.style.display = 'block';
            foodAllergiesTextarea.required = true;
            foodAllergiesTextarea.addEventListener('input', adjustTextareaHeight);
        } else {
            foodAllergiesTextarea.style.display = 'none';
            foodAllergiesTextarea.required = false;
            foodAllergiesTextarea.removeEventListener('input', adjustTextareaHeight);
        }
    }

    if (guest.dietaryRequirements.includes('Other')) {
        const otherGuestIndexes = getGuestIndexesByValue('Other');
        if (otherGuestIndexes.length > 1) {
            const firstTextarea = document.getElementById(`food-allergies${otherGuestIndexes[0]}`);
            const firstTextareaHeight = firstTextarea.scrollHeight;
            for (let i = 1; i < otherGuestIndexes.length; i++) {
                const textarea = document.getElementById(`food-allergies${otherGuestIndexes[i]}`);
                textarea.style.height = firstTextareaHeight + 'px';
            }
        }
    }
    localStorage.setItem('guestData', JSON.stringify(guestData));
}

function getGuestIndexesByValue(value) {
    return guestData.reduce(function (indexes, guest, index) {
        if (guest.dietaryRequirements.includes(value)) {
            indexes.push(index + 1);
        }
        return indexes;
    }, []);
}

function adjustTextareaHeight(event) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}
