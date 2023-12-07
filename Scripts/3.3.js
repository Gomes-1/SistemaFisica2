const select33 = document.getElementById("choose3.3");
const quadro33 = document.getElementById("campos_entrada3");

select33.addEventListener("change", () => {
    if (select33.value == "F") {
        resultadoCompleto.innerHTML = '';
        resultadoResumido.innerHTML = '';
        quadro33.innerHTML = `
        <span>Y - Distância</span>
        <div class="entradasContainer">
            <input class="entradaNumeros" type="number" id="Y33" step="0.01" required>
            <select class="tipoInput" id="tipo_entrada_33Y">
                <option value="m">m</option>
                <option value="cm">cm</option>
                <option value="mm">mm</option>
            </select>
        </div>
        <span>L - Comprimento da barra</span>
        <div class="entradasContainer">
            <input class="entradaNumeros" type="number" id="L33" step="0.01" required>
            <select class="tipoInput" id="tipo_entrada_33L">
                <option value="m">m</option>
                <option value="cm">cm</option>
                <option value="mm">mm</option>
            </select>
        </div>
        <span>&#955 - Densidade de carga linear</span>
        <input class="entradaNumeros" type="number" id="Lam33" step="0.01" required>
        <div class="buttons" onclick="calcular3_3()">Calcular</div>
        `

    } else if(select33.value == "I"){
        resultadoCompleto.innerHTML = '';
        resultadoResumido.innerHTML = '';
        quadro33.innerHTML = `
        <span>Y - Distância</span>
        <div class="entradasContainer">
            <input class="entradaNumeros" type="number" id="Y33" step="0.01" required>
            <select class="tipoInput" id="tipo_entrada_33Y">
                <option value="m">m</option>
                <option value="cm">cm</option>
                <option value="mm">mm</option>
            </select>
        </div>
        <span>&#955 - Densidade de carga linear</span>
        <input class="entradaNumeros" type="number" id="Lam33" step="0.01" required>
        <div class="buttons" onclick="calcular3_3()">Calcular</div>
        `
    }
    else {
        quadro33.innerHTML = ``
    }
});

function calcular3_3(){
  resultadoCompleto.innerHTML = '';
  resultadoResumido.innerHTML = '';

  if(select33.value == "F"){
    calcularEF();
  } else {
    calcularEI();
  }
}

function calcularEF() {
  const lambda = parseFloat(document.getElementById('Lam33').value);
  const y = document.querySelector("#tipo_entrada_33Y").value == 'm' ? parseFloat(document.getElementById("Y33").value) : conversorDistancia(document.querySelector("#tipo_entrada_33Y").value, 'm', document.getElementById("Y33").value);
  const L = document.querySelector("#tipo_entrada_33L").value == 'm' ? parseFloat(document.getElementById("L33").value) : conversorDistancia(document.querySelector("#tipo_entrada_33L").value, 'm', document.getElementById("L33").value);
  const epsilon = 8.85 * Math.pow(10, -12);
  const k = calcularK(epsilon);

  const parte5 = '\\[E = \\frac{2 \\cdot k \\cdot \\lambda}{y} \\cdot \\frac{L}{\\sqrt{4y^2 + L^2}}\\]';

  // Parte 3 da fórmula
  const E = (2 * k * lambda / y) * (L / Math.sqrt(4 * y * 2 + L * 2));
  const parte3 = `\\[E = \\frac{2 \\cdot ${k.toFixed(5)} \\cdot ${lambda}}{${y}} \\cdot \\frac{${L}}{\\sqrt{4 \\cdot ${y}^2 + ${L}^2}} = ${converterParaNotacao10x(E)} \\, \\text{V/m}\\]`;



  // Atualiza a fórmula na variável 'formula'
  const formula = `Informações Formulas: ${parte5}Resultado Barra Finita: ${parte3}`;

  resultadoResumido.innerHTML = `\\[E = ${converterParaNotacao10x(E)} \\, \\text{V/m}\\]`;
  resultadoResumido.innerHTML += `<div id="mostrarButton" class="buttons" onclick="mostrarCalculos()">Mostrar Cálculos</div>`;
  resultadoCompleto.innerHTML = formula;
  MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}



function calcularEI(){
  const lambda = parseFloat(document.getElementById('Lam33').value);
  const y = document.querySelector("#tipo_entrada_33Y").value == 'm' ? parseFloat(document.getElementById("Y33").value) : conversorDistancia(document.querySelector("#tipo_entrada_33Y").value, 'm', document.getElementById("Y33").value);
  const epsilon = 8.85 * Math.pow(10, -12);
  const k = calcularK(epsilon);

  // Parte 1 da fórmula
  const parte1 = `\\[E = \\frac{2 \\cdot k \\cdot \\lambda}{y}\\]`;

  // Parte 4 da fórmula
  const resultadoParte4 = (2 * k * lambda / y);
  const parte4 = `\\[E = \\frac{2 \\cdot ${k.toFixed(5)} \\cdot ${lambda}}{${y}} = ${converterParaNotacao10x(resultadoParte4)} \\, \\text{V/m}\\]`;

  // Atualiza a fórmula na variável 'formula'
  const formula = `Informações Formulas:${parte1}Resultado Barra Infinita: ${parte4}`;

  resultadoResumido.innerHTML = `\\[E = ${converterParaNotacao10x(resultadoParte4)} \\, \\text{V/m}\\]`;
  resultadoResumido.innerHTML += `<div id="mostrarButton" class="buttons" onclick="mostrarCalculos()">Mostrar Cálculos</div>`;
  resultadoCompleto.innerHTML = formula;
  MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}

function calcularK(epsilon) {
  return 1 / (4 * Math.PI * epsilon);
}

function converterParaNotacao10x(numero) {
  let notacaoCientifica = numero.toExponential().split('e');
  let base = parseFloat(notacaoCientifica[0]);
  let expoente = parseInt(notacaoCientifica[1]);

  return `${base.toFixed(2)} \\cdot 10^{${expoente}}`;
}