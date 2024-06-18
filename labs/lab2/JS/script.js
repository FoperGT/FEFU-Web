document.addEventListener('DOMContentLoaded', function() {
    const form = document.forms['calc-form'];
    const inputFields = document.getElementById('input-fields');
    const results = document.getElementById('results');

    function showInputFields() {
        const formType = form.elements['form'].value;
        let fieldsHTML = '';

        if (formType === 'exponential') {
            fieldsHTML = `
                <div class="form-group">
                    <label>Первое число:</label>
                    <div class="input-fields">
                        <input type="number" step="any" name="mod1" placeholder="Модуль" required>
                        <input type="number" step="any" name="arg1" placeholder="Аргумент" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Второе число:</label>
                    <div class="input-fields">
                        <input type="number" step="any" name="mod2" placeholder="Модуль" required>
                        <input type="number" step="any" name="arg2" placeholder="Аргумент" required>
                    </div>
                </div>`;
        } else if (formType === 'trigonometric') {
            fieldsHTML = `
                <div class="form-group">
                    <label>Первое число:</label>
                    <div class="input-fields">
                        <input type="number" step="any" name="mod1" placeholder="Модуль" required>
                        <input type="number" step="any" name="arg1angleA" placeholder="Угол" required>
                        <input type="number" step="any" name="arg1angleB" placeholder="Угол" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Второе число:</label>
                    <div class="input-fields">
                        <input type="number" step="any" name="mod2" placeholder="Модуль" required>
                        <input type="number" step="any" name="arg2angleA" placeholder="Угол" required>
                        <input type="number" step="any" name="arg2angleB" placeholder="Угол" required>
                    </div>
                </div>`;
        }

        inputFields.innerHTML = fieldsHTML;
    }

    document.getElementById('show-form').addEventListener('click', showInputFields);
    showInputFields();

    document.getElementById('calculate').addEventListener('click', function() {
        results.innerHTML = '';

        const formData = new FormData(form);
        const mod1 = parseFloat(formData.get('mod1'));
        const mod2 = parseFloat(formData.get('mod2'));
        const arg1 = parseFloat(formData.get('arg1') || formData.get('arg1angleA') || formData.get('arg1angleB'));
        const arg2 = parseFloat(formData.get('arg2') || formData.get('arg2angleA') || formData.get('arg2angleB'));

        clearErrors();

        let valid = true;
        if (isNaN(mod1)) {
            markError(form.elements['mod1']);
            valid = false;
        }
        if (isNaN(mod2)) {
            markError(form.elements['mod2']);
            valid = false;
        }
        if (isNaN(arg1)) {
            markError(form.elements['arg1'] || form.elements['arg1angleA'] || form.elements['arg1angleB']);
            valid = false;
        }
        if (isNaN(arg2)) {
            markError(form.elements['arg2'] || form.elements['arg2angleA'] || form.elements['arg2angleB']);
            valid = false;
        }

        if (!valid) {
            results.innerHTML = '<div id="error">Пожалуйста, введите корректные значения.</div>';
            return;
        }

        const operations = formData.getAll('operation');
        const formType = form.elements['form'].value;

        operations.forEach(op => {
            let result;
            if (formType === 'exponential') {
                switch (op) {
                    case 'add':
                        result = addExponentialComplex(mod1, arg1, mod2, arg2);
                        results.innerHTML += `<div class="result-item">Сумма: ${formatResult(result)}</div>`;
                        break;
                    case 'subtract':
                        result = subtractExponentialComplex(mod1, arg1, mod2, arg2);
                        results.innerHTML += `<div class="result-item">Разность: ${formatResult(result)}</div>`;
                        break;
                    case 'multiply':
                        result = multiplyExponentialComplex(mod1, arg1, mod2, arg2);
                        results.innerHTML += `<div class="result-item">Произведение: ${formatResult(result)}</div>`;
                        break;
                    case 'divide':
                        result = divideExponentialComplex(mod1, arg1, mod2, arg2);
                        results.innerHTML += `<div class="result-item">Частное: ${formatResult(result)}</div>`;
                        break;
                    default:
                        break;
                }
            } else if (formType === 'trigonometric') {
                switch (op) {
                    case 'add':
                        result = addTrigonometricComplex(mod1, arg1, mod2, arg2);
                        results.innerHTML += `<div class="result-item">Сумма: ${formatResult(result)}</div>`;
                        break;
                    case 'subtract':
                        result = subtractTrigonometricComplex(mod1, arg1, mod2, arg2);
                        results.innerHTML += `<div class="result-item">Разность: ${formatResult(result)}</div>`;
                        break;
                    case 'multiply':
                        result = multiplyTrigonometricComplex(mod1, arg1, mod2, arg2);
                        results.innerHTML += `<div class="result-item">Произведение: ${formatResult(result)}</div>`;
                        break;
                    case 'divide':
                        result = divideTrigonometricComplex(mod1, arg1, mod2, arg2);
                        results.innerHTML += `<div class="result-item">Частное: ${formatResult(result)}</div>`;
                        break;
                    default:
                        break;
                }
            }
        });
    });

    document.getElementById('clear').addEventListener('click', function() {
        form.reset();
        results.innerHTML = '';
        showInputFields();
    });

    function addExponentialComplex(mod1, arg1, mod2, arg2) {
        const mod = mod1 + mod2;
        const arg = arg1 + arg2;
        return { mod, arg };
    }

    function subtractExponentialComplex(mod1, arg1, mod2, arg2) {
        const mod = mod1 - mod2;
        const arg = arg1 - arg2;
        return { mod, arg };
    }

    function multiplyExponentialComplex(mod1, arg1, mod2, arg2) {
        const mod = mod1 * mod2 + ((arg1 * arg2) * (-1));
        const arg = mod1 * arg2 + arg1 * mod2;
        return { mod, arg };
    }

    function divideExponentialComplex(mod1, arg1, mod2, arg2) {
        let denominator = mod2 * mod2 + arg2 * arg2;
        let modIntermediate = mod1 * mod2 + arg1 * arg2;
        let argIntermediate = arg1 * mod2 - mod1 * arg2;
        let mod = modIntermediate / denominator;
        let arg = argIntermediate / denominator;
        return { mod, arg };
    }

    function addTrigonometricComplex(mod1, arg1, mod2, arg2) {
        
    
        return { mod, arg };
    }
    
    function subtractTrigonometricComplex(mod1, arg1, mod2, arg2) {

    
        return { mod, arg };
    }
    
    function multiplyTrigonometricComplex(mod1, arg1, mod2, arh2) {

    
        return { mod, arg };
    }
    
    function divideTrigonometricComplex(mod1, arg1, mod2, arg2) {


        return { mod, arg };
    }

    function formatResult(result) {
        const formType = form.elements['form'].value;
        if (formType === 'exponential') {
            return `${result.mod.toFixed(2)} + ${result.arg.toFixed(2)}i`;
        } else if (formType === 'trigonometric') {
            return `${result.mod.toFixed(2)} + ${result.arg.toFixed(2)}i`;
        }
    }

    function markError(input) {
        if (input) {
            input.classList.add('error');
        }
    }

    function clearErrors() {
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.classList.remove('error');
        });
    }
});
