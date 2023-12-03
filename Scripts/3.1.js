const form = document.getElementById("electricFieldForm");
const select = document.getElementById("selecionar_variavel_achar");
const resultadoResumido = document.querySelector(".resultado_resumido");
const resultadoCompleto = document.querySelector(".resultado_completo");

select.addEventListener("change", (event) => {
    if (select.value == "Q") {
        document.querySelector("#campos_entrada1").innerHTML = `
        <span>R - Raio do anel</span>
        <input class="entradaNumeros" type="number" id="R31" step="0.01" required>
        <span>Z - Posição no Eixo Z</span>
        <input class="entradaNumeros" type="number" id="Z31" step="0.01" required>
        <span>Q - Carga total do anel</span>
        <input class="entradaNumeros" type="number" id="X31" step="0.01" required>
        <div class="buttons" onclick="calcular3_1()">Calcular</div>
        `
    } else if(select.value == "L"){
        document.querySelector("#campos_entrada1").innerHTML = `
        <span>R - Raio do anel</span>
        <input class="entradaNumeros" type="number" id="R31" step="0.01" required>
        <span>Z - Posição no Eixo Z</span>
        <input class="entradaNumeros" type="number" id="Z31" step="0.01" required>
        <span>&#955 - Densidade de carga linear</span>
        <input class="entradaNumeros" type="number" id="X31" step="0.01" required>
        <div class="buttons" onclick="calcular3_1()">Calcular</div>
        `
    }
    else {
        document.querySelector("#campos_entrada1").innerHTML = ``
    }

    event.preventDefault()
});

function calcular3_1(){
    resultadoCompleto.innerHTML = "";
    resultadoResumido.innerHTML = "";
    let R = parseFloat(document.getElementById("R31").value);
    let Z = parseFloat(document.getElementById("Z31").value);
    let X = parseFloat(document.getElementById("X31").value);

    R = Math.abs(R);
    Z = Math.abs(Z);
    X = Math.abs(X);

    insertMathJax(R, Z, X);
}


function insertMathJax(R, Z, X) {
    let e = 8.85 * Math.pow(10, -12);

    let eq1_1 = X * Z;
    let eq1_2 = Z * Z + R * R;
    let eq2_1 = Math.pow(eq1_2, 3/2);
    let E, notation;

    // \\frac => Fração
    // \\cdot => Multiplicação
    // \\vec => Vetor
    // \\approx => Aproximado
    // \\, => Espaço
    
    if (select.value == "Q") {
        E = eq1_1 / (4 * e * Math.PI * eq2_1);
        [E, notation] = transformToScientificNotation(E);


        resultadoCompleto.innerHTML += `$$ \\vec E = \\frac{1}{4 \\cdot \\pi \\cdot \\epsilon 0} \\cdot \\frac{Q \\cdot Z}{(Z^2 + R^2)^\\frac{3}{2}} $$`;
        resultadoCompleto.innerHTML += `$$ \\vec E = \\frac{1}{4 \\cdot \\pi \\cdot \\epsilon 0} \\cdot \\frac{${X} \\cdot ${Z}}{(${Z}^2 + ${R}^2)^\\frac{3}{2}} $$`;
        resultadoCompleto.innerHTML += `$$ \\vec E = \\frac{1}{4 \\cdot \\pi \\cdot \\epsilon 0} \\cdot \\frac{${eq1_1}}{(${eq1_2})^\\frac{3}{2}} $$`;
        resultadoCompleto.innerHTML += `$$ \\vec E \\approx \\frac{${eq1_1}}{4 \\cdot \\pi \\cdot \\epsilon \\cdot ${round(eq2_1, 3)}} $$`;
        resultadoCompleto.innerHTML += `$$ \\vec E \\approx ${round(E, 3)} ${notation} \\, \\left.\\mathrm{N}\\middle/\\mathrm{C}\\right. $$`;
        resultadoResumido.innerHTML += `$$ \\vec E \\approx ${round(E, 3)} ${notation} \\, \\left.\\mathrm{N}\\middle/\\mathrm{C}\\right. $$`;
        resultadoResumido.innerHTML += `<div id="mostrarButton" class="buttons" onclick="mostrarCalculos()">Mostrar Cálculos</div>`
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        return;
    } 


    let eq1_3 = 2 * R;
    let eq2_2 = eq1_3 * eq1_1;
    let eq2_3 = 4 * eq2_1;

    E = eq2_2 / (eq2_3 * e);
    [E, notation] = transformToScientificNotation(E);


    resultadoCompleto.innerHTML += `$$ \\vec E = \\frac{1}{4 \\cdot \\pi \\cdot \\epsilon 0} \\cdot \\frac{Z \\cdot \\lambda }{(Z^2 + R^2)^\\frac{3}{2}} \\cdot 2 \\cdot \\pi \\cdot R $$`;
    resultadoCompleto.innerHTML += `$$ \\vec E = \\frac{1}{4 \\cdot \\pi \\cdot \\epsilon 0} \\cdot \\frac{${Z} \\cdot ${X}}{(${Z}^2 + ${R}^2)^\\frac{3}{2}} \\cdot 2 \\cdot \\pi \\cdot ${R} $$`;
    resultadoCompleto.innerHTML += `$$ \\vec E = \\frac{1}{4 \\cdot \\pi \\cdot \\epsilon 0} \\cdot \\frac{${eq1_1}}{(${eq1_2})^\\frac{3}{2}} \\cdot ${eq1_3} \\cdot \\pi $$`;
    resultadoCompleto.innerHTML += `$$ \\vec E \\approx \\frac{${eq2_2} \\cdot \\pi}{${round(eq2_3, 3)} \\cdot \\pi \\cdot \\epsilon 0} $$`;
    resultadoCompleto.innerHTML += `$$ \\vec E \\approx ${round(E, 3)} ${notation} \\, \\left.\\mathrm{N}\\middle/\\mathrm{C}\\right. $$`;
    resultadoResumido.innerHTML += `$$ \\vec E \\approx ${round(E, 3)} ${notation} \\, \\left.\\mathrm{N}\\middle/\\mathrm{C}\\right. $$`;
    resultadoResumido.innerHTML += `<div id="mostrarButton" class="buttons" onclick="mostrarCalculos()">Mostrar Cálculos</div>`
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
}


function transformToScientificNotation(E) {
    let n = 0, notation;
    let sign = E < 1 ? -1 : 1;

    while (E > 10) {
        E /= 10;
        n++;
    }

    while (E < 1) {
        E *= 10;
        n++;
    }

    notation = n != 0 ? `\\cdot \\mathrm{10}^{${n*sign}}` : ``;

    return [E, notation];
}


function round(x, places) {
    return Math.round(x * Math.pow(10, places)) / Math.pow(10, places);
} 