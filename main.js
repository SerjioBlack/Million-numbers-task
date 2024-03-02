document.getElementById('startButton').addEventListener('click', function() {
    const startTime = performance.now();
    readAndProcessFile('10m.txt').then(result => {
        displayResults(result);
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        console.log('Час виконання: ' + executionTime + ' мс');
    });
});

async function readAndProcessFile(filename) {
    const response = await fetch(filename);
    const text = await response.text();
    const numbers = text.trim().split('\n').map(Number);
    return {
        max: findMax(numbers),
        min: findMin(numbers),
        median: findMedian(numbers),
        mean: findMean(numbers),
        increasingSequence: findIncreasingSequence(numbers),
        decreasingSequence: findDecreasingSequence(numbers)
    };
}

function findMax(numbers) {
    let max = -Infinity;
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}

function findMin(numbers) {
    let min = Infinity;
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] < min) {
            min = numbers[i];
        }
    }
    return min;
}


function findMedian(numbers) {
    numbers.sort((a, b) => a - b);
    const middle = Math.floor(numbers.length / 2);
    if (numbers.length % 2 === 0) {
        return (numbers[middle - 1] + numbers[middle]) / 2;
    } else {
        return numbers[middle];
    }
}

function findMean(numbers) {
    const sum = numbers.reduce((acc, val) => acc + val, 0);
    return sum / numbers.length;
}

function findIncreasingSequence(numbers) {
    let maxSequence = [];
    let currentSequence = [];
    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] < numbers[i + 1]) {
            currentSequence.push(numbers[i]);
        } else {
            currentSequence.push(numbers[i]);
            if (currentSequence.length > maxSequence.length) {
                maxSequence = currentSequence;
            }
            currentSequence = [];
        }
    }
    currentSequence.push(numbers[numbers.length - 1]);
    if (currentSequence.length > maxSequence.length) {
        maxSequence = currentSequence;
    }
    return maxSequence;
}

function findDecreasingSequence(numbers) {
    let maxSequence = [];
    let currentSequence = [];
    for (let i = 0; i < numbers.length - 1; i++) {
        if (numbers[i] > numbers[i + 1]) {
            currentSequence.push(numbers[i]);
        } else {
            currentSequence.push(numbers[i]);
            if (currentSequence.length > maxSequence.length) {
                maxSequence = currentSequence;
            }
            currentSequence = [];
        }
    }
    currentSequence.push(numbers[numbers.length - 1]);
    if (currentSequence.length > maxSequence.length) {
        maxSequence = currentSequence;
    }
    return maxSequence;
}


function displayResults(results) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<h2>Результати:</h2>';
    resultDiv.innerHTML += `<p>Максимальне число: ${results.max}</p>`;
    resultDiv.innerHTML += `<p>Мінімальне число: ${results.min}</p>`;
    resultDiv.innerHTML += `<p>Медіана: ${results.median}</p>`;
    resultDiv.innerHTML += `<p>Середнє арифметичне: ${results.mean}</p>`;
    resultDiv.innerHTML += `<p>Найбільша послідовність чисел, що збільшується: ${results.increasingSequence.join(', ')}</p>`;
    resultDiv.innerHTML += `<p>Найбільша послідовність чисел, що зменшується: ${results.decreasingSequence.join(', ')}</p>`;
}
