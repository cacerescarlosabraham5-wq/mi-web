// RETO: CALCULADORA BÁSICA - SOLUCIÓN COMPLETA [cite: 595]
function calcular() { [cite: 596]
    // 1. Obtener valores de los elementos HTML [cite: 597]
    let num1 = parseFloat(document.getElementById("num1").value); [cite: 598]
    let num2 = parseFloat(document.getElementById("num2").value); [cite: 599]
    let operacion = document.getElementById("operacion").value; [cite: 599]

    // 2. Validar entrada [cite: 600]
    if (isNaN(num1) || isNaN(num2)) { [cite: 601]
        document.getElementById("resultado").innerHTML = "❌ Ingresa números válidos"; [cite: 602, 603]
        return; [cite: 603]
    }

    // 3. Calcular según la operación seleccionada [cite: 604]
    let resultado; [cite: 605]
    
    switch(operacion) { [cite: 606]
        case "suma": [cite: 607]
            resultado = num1 + num2; [cite: 608]
            break; [cite: 609]
        case "resta": [cite: 610]
            resultado = num1 - num2; [cite: 611]
            break; [cite: 612]
        case "multiplicar": [cite: 613]
            resultado = num1 * num2; [cite: 614]
            break; [cite: 615]
        case "dividir": [cite: 616]
            // Controlar división por cero [cite: 617]
            if (num2 === 0) { [cite: 617]
                document.getElementById("resultado").innerHTML = "❌ No se puede dividir por cero"; [cite: 618, 619]
                return; [cite: 620]
            }
            resultado = num1 / num2; [cite: 621]
            break; [cite: 621]
        default:
            document.getElementById("resultado").innerHTML = "❌ Operación inválida";
            return;
    }

    // 4. Mostrar resultado en la página web (Corregido template literal) [cite: 622]
    document.getElementById("resultado").innerHTML = `Resultado: ${resultado.toFixed(2)}`; [cite: 623, 624]
}