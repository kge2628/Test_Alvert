const generatorBtn = document.getElementById('generator-btn');
const numberDisplay = document.querySelector('.number-display');
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

// Function to apply the saved theme on page load
function applySavedTheme() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
    }
}

// Event listener for the theme toggle button
themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    // Save the preference to localStorage
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

generatorBtn.addEventListener('click', () => {
    numberDisplay.innerHTML = '';
    const lottoNumbers = generateLottoNumbers();
    lottoNumbers.forEach((number, index) => {
        setTimeout(() => {
            const numberElement = document.createElement('div');
            numberElement.classList.add('number');
            numberElement.textContent = number;
            numberDisplay.appendChild(numberElement);
        }, index * 200);
    });
});

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

// Apply the theme when the script loads
applySavedTheme();