(() => {
  const display = document.getElementById('display');
  const keys = document.querySelector('.keys');
  let expression = '';

  function updateDisplay() {
    display.textContent = expression || '0';
  }

  function sanitizeForEval(str) {
    return str.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/[^0-9.+\-*/()%]/g, '');
  }

  function calculate() {
    try {
      const safe = sanitizeForEval(expression);
      // eslint-disable-next-line no-eval
      const result = eval(safe);
      expression = String(result);
    } catch (e) {
      expression = 'Error';
    }
    updateDisplay();
  }

  keys.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const action = btn.dataset.action;
    const val = btn.textContent.trim();

    if (action === 'clear') {
      expression = '';
      updateDisplay();
      return;
    }
    if (action === 'back') {
      expression = expression.slice(0, -1);
      updateDisplay();
      return;
    }
    if (action === 'percent') {
      // treat current value as percent
      try {
        const num = parseFloat(expression || '0');
        expression = String(num / 100);
      } catch {
        expression = '';
      }
      updateDisplay();
      return;
    }
    if (action === 'equals') {
      calculate();
      return;
    }

    // digits, operators, dot
    // prevent multiple leading zeros
    if (val === '.' && expression.slice(-1) === '.') return;
    expression += val;
    updateDisplay();
  });

  // keyboard support
  window.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || '+-*/().'.includes(e.key)) {
      expression += e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key;
      updateDisplay();
      e.preventDefault();
      return;
    }
    if (e.key === 'Enter' || e.key === '=') {
      calculate();
      e.preventDefault();
      return;
    }
    if (e.key === 'Backspace') {
      expression = expression.slice(0, -1);
      updateDisplay();
      e.preventDefault();
      return;
    }
    if (e.key === 'Escape') {
      expression = '';
      updateDisplay();
      e.preventDefault();
    }
  });

  // initialize
  updateDisplay();
})();
