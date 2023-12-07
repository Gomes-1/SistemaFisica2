const select32 = document.getElementById("choose3.2");
const quadro32 = document.getElementById("campos_entrada2");

select32.addEventListener("change", (event) => {
    if (select32.value == "Q") {
        resultadoCompleto.innerHTML = '';
        resultadoResumido.innerHTML = '';
        quadro32.innerHTML = `
            <span>R - Raio do disco (m)</span>
            <input class="entradaNumeros" type="number" id="R32" step="0.01" required>
            <span>Z - Posição no Eixo Z (m)</span>
            <input class="entradaNumeros" type="number" id="Z32" step="0.01" required>
            <span>Q - Carga total do disco</span>
            <div class="entradasContainer">
                <input class="entradaNumeros" type="number" id="X32" step="0.01" required>
                <select class="tipoInput" id="tipo_entrada_32">
                    <option value="C">C</option>
                    <option value="mC">mC</option>
                    <option value="µC">µC</option>
                    <option value="nC">nC</option>
                    <option value="pC">pC</option>
                </select>
            </div>
            <div class="buttons" onclick="calcular3_2()">Calcular</div>
        `;
    } else if (select32.value == "S") {
        resultadoCompleto.innerHTML = '';
        resultadoResumido.innerHTML = '';
        quadro32.innerHTML = `
            <span>R - Raio do disco (m)</span>
            <input class="entradaNumeros" type="number" id="R32" step="0.01" required>
            <span>Z - Posição no Eixo Z (m)</span>
            <input class="entradaNumeros" type="number" id="Z32" step="0.01" required>
            <span>&#963 - Densidade de carga linear</span>
            <div class="entradasContainer">
                <input class="entradaNumeros" type="number" id="X32" step="0.01" required>
                <select class="tipoInput" id="tipo_entrada_32">
                    <option value="C">C</option>
                    <option value="mC">mC</option>
                    <option value="µC">µC</option>
                    <option value="nC">nC</option>
                    <option value="pC">pC</option>
                </select>
            </div>
            <div class="buttons" onclick="calcular3_2()">Calcular</div>
        `;
    } else {
        quadro32.innerHTML = ``;
    }

    event.preventDefault();
});

function calcular3_2() {
    resultadoCompleto.innerHTML = "";
    resultadoResumido.innerHTML = "";
    let R = parseFloat(document.getElementById("R32").value);
    let Z = parseFloat(document.getElementById("Z32").value);
    let X = document.querySelector("#tipo_entrada_32").value == 'C' ? parseFloat(document.getElementById("X32").value) : conversorCoulomb(document.querySelector("#tipo_entrada_32").value, 'C', document.getElementById("X32").value);

    R = Math.abs(R);
    Z = Math.abs(Z);
    X = Math.abs(X);

    inserirEquacao(R, Z, X);
}

function inserirEquacao(R, Z, X) {
    let S = X;
    let e = 8.85 * Math.pow(10, -12);

    if (select32.value == "Q") {
        S = X / (Math.PI * R * R);
        resultadoCompleto.innerHTML += `$$ |E| = \\frac{Q}{\\pi \\cdot R^2} $$`;
        resultadoCompleto.innerHTML += `$$ |E| = \\frac{${X}}{\\pi \\cdot ${R}^2} $$`;
        resultadoCompleto.innerHTML += `$$ |E| ≈ ${notacaoCientifica(S)} $$`;
    }

    let eq1_1 = S / (2 * e);
    let eq2_1 = eq1_1 * Z;
    let eq2_2 = Z * Z + R * R;
    let eq3_1 = eq2_1 / Math.sqrt(eq2_2);
    let E = eq1_1 - eq3_1;

    resultadoCompleto.innerHTML += `$$ |E| = \\frac{\\sigma}{2 \\cdot \\epsilon 0} \\cdot  \\left[1 - \\frac{Z}{(Z^2 + R^2)^\\frac{1}{2}}\\right] $$`;
    resultadoCompleto.innerHTML += `$$ |E| = \\frac{${notacaoCientifica(S)}}{2 \\cdot \\epsilon 0} \\cdot  \\left[1 - \\frac{${Z}}{(${Z}^2 + ${R}^2)^\\frac{1}{2}}\\right] $$`;
    resultadoCompleto.innerHTML += `$$ |E| = ${notacaoCientifica(eq1_1)} \\cdot  \\left[1 - \\frac{${Z}}{(${Z}^2 + ${R}^2)^\\frac{1}{2}}\\right] $$`;
    resultadoCompleto.innerHTML += `$$ |E| = ${notacaoCientifica(eq1_1)} - \\frac{${notacaoCientifica(eq2_1)}}{(${notacaoCientifica(eq2_2)})^\\frac{1}{2}} $$`;
    resultadoCompleto.innerHTML += `$$ |E| = ${notacaoCientifica(eq1_1)} - ${notacaoCientifica(eq3_1)} $$`;
    resultadoCompleto.innerHTML += `$$ |E| ≈ ${notacaoCientifica(E)} \\, \\left.\\mathrm{N}\\middle/\\mathrm{C}\\right. $$`;
    resultadoResumido.innerHTML += `$$ |E| ≈ ${notacaoCientifica(E)} \\, \\left.\\mathrm{N}\\middle/\\mathrm{C}\\right. $$`;
    resultadoResumido.innerHTML += `<div id="mostrarButton" class="buttons" onclick="mostrarCalculos()">Mostrar Cálculos</div>`;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}

function notacaoCientifica(x) {
    const [mantissa, exponent] = x.toExponential().split('e');
    const truncatedMantissa = parseFloat(mantissa).toFixed(3);
    return truncatedMantissa + ' × 10^{' + (exponent.startsWith('+') ? exponent.slice(1) : exponent) + '}';
}

function round(x, precision) {
    return x.toPrecision(precision);
}
