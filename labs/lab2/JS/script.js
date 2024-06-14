document.addEventListener('DOMContentLoaded', function() {
    const form = document.forms['calc-form'];
    const inputFields = document.getElementById('input-fields');
    const results = document.getElementById('results');

    function showInputFields() {
        const formType = form.elements['form'].value;
        let fieldsHTML = '';

        if (formType === 'exponential') {
            fieldsHTML = `
                <div>
                    <label>Первое число (модуль и аргумент):</label>
                    <input type="number" step="any" name="mod1" placeholder="Модуль" required>
                    <input type="number" step="any" name="arg1" placeholder="Аргумент" required>
                </div>
                <div>
                    <label>Второе число (модуль и аргумент):</label>
                    <input type="number" step="any" name="mod2" placeholder="Модуль" required>
                    <input type="number" step="any" name="arg2" placeholder="Аргумент" required>
                </div>`;
        } else {
            fieldsHTML = `
                <div>
                    <label>Первое число (модуль и угол):</label>
                    <input type="number" step="any" name="mod1" placeholder="Модуль" required>
                    <input type="number" step="any" name="angle1" placeholder="Угол (в радианах)" required>
                </div>
                <div>
                    <label>Второе число (модуль и угол):</label>
                    <input type="number" step="any" name="mod2" placeholder="Модуль" required>
                    <input type="number" step="any" name="angle2" placeholder="Угол (в радианах)" required>
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
        const arg1 = parseFloat(formData.get('arg1') || formData.get('angle1'));
        const arg2 = parseFloat(formData.get('arg2') || formData.get('angle2'));

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
            markError(form.elements['arg1'] || form.elements['angle1']);
            valid = false;
        }
        if (isNaN(arg2)) {
            markError(form.elements['arg2'] || form.elements['angle2']);
            valid = false;
        }

        if (!valid) {
            results.innerHTML = '<div id="error">Пожалуйста, введите корректные значения.</div>';
            return;
        }

        const operations = formData.getAll('operation');
        operations.forEach(op => {
            let result;
            switch (op) {
                case 'add':
                    result = addComplex(mod1, arg1, mod2, arg2);
                    results.innerHTML += `<div class="result-item">Сумма: ${formatResult(result)}</div>`;
                    break;
                case 'subtract':
                    result = subtractComplex(mod1, arg1, mod2, arg2);
                    results.innerHTML += `<div class="result-item">Разность: ${formatResult(result)}</div>`;
                    break;
                case 'multiply':
                    result = multiplyComplex(mod1, arg1, mod2, arg2);
                    results.innerHTML += `<div class="result-item">Произведение: ${formatResult(result)}</div>`;
                    break;
                case 'divide':
                    result = divideComplex(mod1, arg1, mod2, arg2);
                    results.innerHTML += `<div class="result-item">Частное: ${formatResult(result)}</div>`;
                    break;
                default:
                    break;
            }
        });
    });

    document.getElementById('clear').addEventListener('click', function() {
        form.reset();
        results.innerHTML = '';
        showInputFields();
    });

    function addComplex(mod1, arg1, mod2, arg2) {
        const mod = mod1 + mod2;
        const arg = arg1 + arg2;
          
        return { mod, arg };
    }

    function subtractComplex(mod1, arg1, mod2, arg2) {
        const mod = mod1 - mod2;
        const arg = arg1 + arg2;
          
        return { mod, arg };
    }
    

    function multiplyComplex(mod1, arg1, mod2, arg2) {
        const mod = mod1 * mod2 + ((arg1 * arg2) * (-1));
        const arg = mod1 * arg2 + arg1 * mod2;

        return { mod, arg };
    }

    function divideComplex(mod1, arg1, mod2, arg2) {
        let denominator = mod2 * mod2 + arg2 * arg2;

        let modIntermediate = mod1 * mod2 + arg1 * arg2;
        let argIntermediate = arg1 * mod2 - mod1 * arg2;

        let mod = modIntermediate / denominator;
        let arg = argIntermediate / denominator;

        return { mod, arg };
    }

    function formatResult(result) {
        const formType = form.elements['form'].value;
        if (formType === 'exponential') {
            return `${result.mod.toFixed(2)} + ${result.arg.toFixed(2)}i`;
        } else {
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
