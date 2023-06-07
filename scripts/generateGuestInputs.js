// Global variables
let guestData = []; // Array to store guest data

document.addEventListener('DOMContentLoaded', function () {
    const guestCountSelect = document.getElementById('guestCount');
    guestCountSelect.addEventListener('change', generateGuestInputs);
});

function generateGuestInputs() {
    const guestCountSelect = document.getElementById('guestCount');
    const guestInputsContainer = document.getElementById('guestInputsContainer');

    const totalGuestCount = parseInt(guestCountSelect.value);

    // Update existing guestData for persistent data
    for (let i = 0; i < totalGuestCount; i++) {
        const existingGuest = guestData[i];
        if (existingGuest) {
            existingGuest.index = i + 1;
        } else {
            const guest = { index: i + 1, name: '', dietaryRequirements: [], foodAllergies: '' };
            guestData.push(guest);
        }
    }

    // Remove excess guestData for reduced guest count
    if (guestData.length > totalGuestCount) {
        guestData.splice(totalGuestCount);
    }

    guestInputsContainer.innerHTML = '';

    for (let i = 0; i < totalGuestCount; i++) {
        const guest = guestData[i];

        const guestCard = document.createElement('div');
        guestCard.className = 'guestCard';
        guestInputsContainer.appendChild(guestCard);

        const guestNum = document.createElement('p');
        guestNum.className = 'guestNum';
        guestNum.textContent = `${guest.index}`;
        guestCard.appendChild(guestNum);

        const guestNameDiv = document.createElement('div');
        guestNameDiv.className = 'guestNameDiv';
        const guestName = document.createElement('input');
        guestName.type = 'text';
        guestName.name = `guest${guest.index}_name`;
        guestName.className = 'guestName';
        guestName.required = true;
        guestName.placeholder = 'Name';
        guestName.value = guest.name; // Set the input value from guest data
        guestNameDiv.appendChild(guestName);
        guestCard.appendChild(guestNameDiv);

        guestName.addEventListener('input', function () {
            guest.name = guestName.value;
        });

        const guestDietary = document.createElement('div');
        guestDietary.className = 'guestDietary';
        guestDietary.id = `dietaryRequirements${guest.index}`;

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
            checkbox.name = `dietaryRequirements${guest.index}_${option.value}`;
            checkbox.value = option.value;
            checkbox.id = `${option.value}${guest.index}`;
            checkbox.className = `dietaryRequirementCheckbox${guest.index} dietaryRequirementCheckbox`;
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
        foodAllergiesTextarea.id = `foodAllergies${guest.index}`;
        foodAllergiesTextarea.className = 'foodAllergies';
        foodAllergiesTextarea.placeholder = 'Let us know about anything else.';
        foodAllergiesTextarea.style.display = guest.dietaryRequirements.includes('Other') ? 'block' : 'none';
        foodAllergiesTextarea.required = guest.dietaryRequirements.includes('Other');
        foodAllergiesTextarea.value = guest.foodAllergies; // Set the textarea value from guest data
        foodAllergiesTextarea.name = `otherDiet${guest.index}`;

        foodAllergiesTextarea.addEventListener('input', function () {
            guest.foodAllergies = foodAllergiesTextarea.value;
        });

        guestDietary.appendChild(foodAllergiesTextarea);
        guestCard.appendChild(guestDietary);
    }
}

function handleDietaryRequirements(guestIndex) {
    const dietaryRequirementCheckboxes = document.getElementsByClassName(`dietaryRequirementCheckbox${guestIndex}`);
    const guest = guestData[guestIndex - 1];

    guest.dietaryRequirements = []; // Reset dietaryRequirements before updating

    for (let i = 0; i < dietaryRequirementCheckboxes.length; i++) {
        const checkbox = dietaryRequirementCheckboxes[i];
        const foodAllergiesTextarea = document.getElementById(`foodAllergies${guestIndex}`);

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
            const firstTextarea = document.getElementById(`foodAllergies${otherGuestIndexes[0]}`);
            const firstTextareaHeight = firstTextarea.scrollHeight;
            for (let i = 1; i < otherGuestIndexes.length; i++) {
                const textarea = document.getElementById(`foodAllergies${otherGuestIndexes[i]}`);
                textarea.style.height = firstTextareaHeight + 'px';
            }
        }
    }
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
