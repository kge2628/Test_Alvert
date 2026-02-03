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

// Formspree form submission handling
const partnershipForm = document.getElementById('partnership-form');
const formStatus = document.getElementById('form-status');

if (partnershipForm) {
    partnershipForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(partnershipForm);
        try {
            const response = await fetch(partnershipForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.textContent = '문의가 성공적으로 접수되었습니다!';
                formStatus.style.color = 'green';
                partnershipForm.reset(); // Clear the form
            } else {
                const data = await response.json();
                if (data.errors) {
                    formStatus.textContent = data.errors.map(error => error.message).join(', ');
                } else {
                    formStatus.textContent = '문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.';
                }
                formStatus.style.color = 'red';
            }
        } catch (error) {
            formStatus.textContent = '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.';
            formStatus.style.color = 'red';
            console.error('Form submission error:', error);
        }
    });
}