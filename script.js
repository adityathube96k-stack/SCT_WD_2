const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let resetNext = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;

    if (value === 'C') {
      currentInput = '';
      display.textContent = '0';
    } else if (value === '←') {
      currentInput = currentInput.slice(0, -1);
      display.textContent = currentInput || '0';
    } else if (value === '=') {
      try {
        currentInput = eval(currentInput).toString();
        display.textContent = currentInput;
        resetNext = true;
      } catch {
        display.textContent = 'Error';
        currentInput = '';
      }
    } else {
      if (resetNext) {
        currentInput = '';
        resetNext = false;
      }
      currentInput += value;
      display.textContent = currentInput;
    }
  });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
  const allowedKeys = '0123456789/*-+.';

  if (allowedKeys.includes(e.key)) {
    currentInput += e.key;
    display.textContent = currentInput;
  } else if (e.key === 'Enter') {
    try {
      currentInput = eval(currentInput).toString();
      display.textContent = currentInput;
    } catch {
      display.textContent = 'Error';
      currentInput = '';
    }
  } else if (e.key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    display.textContent = currentInput || '0';
  } else if (e.key === 'Escape') {
    currentInput = '';
    display.textContent = '0';
  }
});
