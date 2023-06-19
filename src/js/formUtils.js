export function saveFormData(formData) {
    localStorage.setItem('formData', JSON.stringify(formData));
}

export function loadFormData() {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
        return JSON.parse(savedData);
    }
    return null;
}

export function clearFormDataFromCache() {
    localStorage.removeItem('formData');
}