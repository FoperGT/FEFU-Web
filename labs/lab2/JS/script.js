document.addEventListener('DOMContentLoaded', function() {
    const form = document.forms['calc-form'];
    const inputFields = document.getElementById('input-fields');
    const results = document.getElementById('results');

    let currentFields = [];

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
            currentFields = ['mod1', 'arg1', 'mod2', 'arg2'];
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
                        <input type="number" step="any" name="arg2angleA" placeholder="Угол(в градусах)" required>
                        <input type="number" step="any" name="arg2angleB" placeholder="Угол(в градусах)" required>
                    </div>
                </div>`;
            currentFields = ['mod1', 'arg1angleA', 'arg1angleB', 'mod2', 'arg2angleA', 'arg2angleB'];
        }

        inputFields.innerHTML = fieldsHTML;
    }

    document.getElementById('show-form').addEventListener('click', showInputFields);
    showInputFields();

    document.getElementById('calculate').addEventListener('click', function() {
        results.innerHTML = '';

        const formData = new FormData(form);

        clearErrors();

        let valid = true;
        currentFields.forEach(fieldName => {
            const field = form.elements[fieldName];
            const value = parseFloat(formData.get(fieldName));
            if (isNaN(value)) {
                markError(field);
                valid = false;
            }
        });

        if (!valid) {
            results.innerHTML = '<div id="error">Пожалуйста, введите корректные значения.</div>';
            return;
        }

        const operations = formData.getAll('operation');
        const formType = form.elements['form'].value;

        operations.forEach(op => {
            let result;
            if (formType === 'exponential') {
                const mod1 = parseFloat(formData.get('mod1'));
                const arg1 = parseFloat(formData.get('arg1'));
                const mod2 = parseFloat(formData.get('mod2'));
                const arg2 = parseFloat(formData.get('arg2'));

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
                const mod1 = parseFloat(formData.get('mod1'));
                const arg1angleA = parseFloat(formData.get('arg1angleA'));
                const arg1angleB = parseFloat(formData.get('arg1angleB'));
                const mod2 = parseFloat(formData.get('mod2'));
                const arg2angleA = parseFloat(formData.get('arg2angleA'));
                const arg2angleB = parseFloat(formData.get('arg2angleB'));

                switch (op) {
                    case 'add':
                        result = addTrigonometricComplex(mod1, arg1angleA, arg1angleB, mod2, arg2angleA, arg2angleB);
                        results.innerHTML += `<div class="result-item">Сумма: ${formatResult(result)}</div>`;
                        break;
                    case 'subtract':
                        result = subtractTrigonometricComplex(mod1, arg1angleA, arg1angleB, mod2, arg2angleA, arg2angleB);
                        results.innerHTML += `<div class="result-item">Разность: ${formatResult(result)}</div>`;
                        break;
                    case 'multiply':
                        result = multiplyTrigonometricComplex(mod1, arg1angleA, arg1angleB, mod2, arg2angleA, arg2angleB);
                        results.innerHTML += `<div class="result-item">Произведение: ${formatResult(result)}</div>`;
                        break;
                    case 'divide':
                        result = divideTrigonometricComplex(mod1, arg1angleA, arg1angleB, mod2, arg2angleA, arg2angleB);
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
        const denominator = mod2 * mod2 + arg2 * arg2;

        const modIntermediate = mod1 * mod2 + arg1 * arg2;
        const argIntermediate = arg1 * mod2 - mod1 * arg2;

        const mod = modIntermediate / denominator;
        const arg = argIntermediate / denominator;

        return { mod, arg };
    }

    function addTrigonometricComplex(mod1, arg1angleA, arg1angleB, mod2, arg2angleA, arg2angleB) {
        const modIntermediate1 = mod1 * (Math.cos(degreesToRadians(arg1angleA)));
        const argIntermediate1 = mod1 * (Math.sin(degreesToRadians(arg1angleB)));

        const modIntermediate2 = mod2 * (Math.cos(degreesToRadians(arg2angleA)));
        const argIntermediate2 = mod2 * (Math.sin(degreesToRadians(arg2angleB)));

        const mod = modIntermediate1 + modIntermediate2;
        const arg = argIntermediate1 + argIntermediate2;

        return { mod, arg };
    }

    function subtractTrigonometricComplex(mod1, arg1angleA, arg1angleB, mod2, arg2angleA, arg2angleB) {
        const modIntermediate1 = mod1 * (Math.cos(degreesToRadians(arg1angleA)));
        const argIntermediate1 = mod1 * (Math.sin(degreesToRadians(arg1angleB)));

        const modIntermediate2 = mod2 * (Math.cos(degreesToRadians(arg2angleA)));
        const argIntermediate2 = mod2 * (Math.sin(degreesToRadians(arg2angleB)));

        const mod = modIntermediate1 - modIntermediate2;
        const arg = argIntermediate1 - argIntermediate2;

        return { mod, arg };
    }

    function multiplyTrigonometricComplex(mod1, arg1angleA, arg1angleB, mod2, arg2angleA, arg2angleB) {
        const parenthesis1Part1 = mod1 * Math.cos(degreesToRadians(arg1angleA));
        const parenthesis1Part2 = mod1 * Math.sin(degreesToRadians(arg1angleB)); 

        const parenthesis2Part1 = mod2 * Math.cos(degreesToRadians(arg2angleA));
        const parenthesis2Part2 = mod2 * Math.sin(degreesToRadians(arg2angleB)); 

        const modArgument1 = parenthesis1Part1 * parenthesis2Part1;
        const modArgument2 = parenthesis1Part2 * parenthesis2Part2 * (-1);

        const argArgument1 = parenthesis1Part1 * parenthesis2Part2;
        const argArgument2 = parenthesis1Part2 * parenthesis2Part1;

        const mod = modArgument1 + modArgument2;
        const arg = argArgument1 + argArgument2;

        return { mod, arg };
    }

    function divideTrigonometricComplex(mod1, arg1angleA, arg1angleB, mod2, arg2angleA, arg2angleB) {
        const parenthesis1Part1 = mod1 * Math.cos(degreesToRadians(arg1angleA)); 
        const parenthesis1Part2 = mod1 * Math.sin(degreesToRadians(arg1angleB)); 

        const parenthesis2Part1 = mod2 * Math.cos(degreesToRadians(arg2angleA)); 
        const parenthesis2Part2 = mod2 * Math.sin(degreesToRadians(arg2angleB)); 

        const modNumerator1 = parenthesis1Part1 * parenthesis2Part1;
        const modNumerator2 = parenthesis1Part2 * parenthesis2Part2; 
        const argNumerator1 = parenthesis1Part1 * parenthesis2Part2; 
        const argNumerator2 = parenthesis1Part2 * parenthesis2Part1 * (-1);

        const modDenominator1 = parenthesis2Part1 * parenthesis2Part1; 
        const modDenominator2 = parenthesis2Part1 * parenthesis2Part2 * (-1); 
        const argDenominator1 = parenthesis2Part2 * parenthesis2Part1; 
        const argDenominator2 = parenthesis2Part2 * parenthesis2Part2;

        const denominator = modDenominator1 + modDenominator2 + argDenominator1 + argDenominator2;

        const mod = (modNumerator1 + modNumerator2) / denominator;
        const arg = (argNumerator1 + argNumerator2) / denominator;

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

    function degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }
});
