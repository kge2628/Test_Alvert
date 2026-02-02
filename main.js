const generatorBtn = document.getElementById('generator-btn');
const numberDisplay = document.querySelector('.number-display');

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