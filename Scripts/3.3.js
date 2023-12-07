
function converterParaNotacao10x(numero) {
    let notacaoCientifica = numero.toExponential().split('e');
    let base = parseFloat(notacaoCientifica[0]);
    let expoente = parseInt(notacaoCientifica[1]);
    
    return `${base.toFixed(2)} \\cdot 10^{${expoente}}`;
  }
    
  function calcularE() {
    const lambda = parseFloat(document.getElementById('lambda').value);
    const y = parseFloat(document.getElementById('y').value);
    const L = parseFloat(document.getElementById('l').value);
    const epsilon = parseFloat(document.getElementById('epsilon').value);
    
    const k = calcularK(epsilon);
    
    // Parte 1 da fórmula
    const parte1 = `\\[E = \\frac{2 \\cdot k \\cdot \\lambda}{y}\\]`;
    
    // Parte 2 da fórmula
    const parte2 = `\\[k = \\frac{1}{4 \\pi \\varepsilon_0}\\]`;
    
    // Parte 3 da fórmula
    const E = (2 * k * lambda / y) * (L / Math.sqrt(4 * y*2 + L*2));
    const parte3 = `\\[E = \\frac{2 \\cdot ${k.toFixed(5)} \\cdot ${lambda}}{${y}} \\cdot \\frac{${L}}{\\sqrt{4 \\cdot ${y}^2 + ${L}^2}} = ${converterParaNotacao10x(E)} \\, \\text{V/m}\\]`;

    // Cria a string da fórmula para exibição
    const formula = parte1 + parte2 + parte3;
    
    resultadoDiv.innerHTML = formula;
  }
    
  function calcularK(epsilon) {
    return 1 / (4 * Math.PI * epsilon);
  }
    
    // Função para mostrar o cálculo passo a passo
  function mostrarPassoAPasso() {
    const lambda = parseFloat(document.getElementById('lambda').value);
    const y = parseFloat(document.getElementById('y').value);
    const L = parseFloat(document.getElementById('l').value);
    const epsilon = parseFloat(document.getElementById('epsilon').value);
    
    const k = calcularK(epsilon);
    const passoAPassoDiv = document.getElementById('passoAPasso');
    
    // Cria a string com o cálculo passo a passo
    const passoAPasso = `
      <p>Passo 1: Calcule o valor de k</p>
      <p>\\[k = \\frac{1}{4 \\pi \\varepsilon_0} = \\frac{1}{4 \\pi \\cdot ${epsilon} } = ${k.toFixed(5)}\\]</p>
    
      <p>Passo 2: Calcule o campo elétrico devido à barra infinita</p>
      <p>\\[dE = \\frac{1}{4 \\pi \\varepsilon_0} \\cdot \\frac{dq}{r^2}\\]</p>
      <p>onde:</p>
      <ul>
        <li>\\(dq\\) é um elemento de carga da barra infinita</li>
        <li>\\(r\\) é a distância de \\(dq\\) até o ponto onde estamos calculando o campo elétrico</li>
      </ul>
    
      <p>Passo 3: Divida a barra infinita em pequenos elementos de carga (\\(dq\\))</p>
    
      <p>Passo 4: Calcule o campo elétrico devido a cada elemento de carga (\\(dE\\))</p>
    
      <p>Passo 5: Integre o campo elétrico devido a todos os elementos de carga para obter o campo elétrico total (\\(E\\))</p>
    
      <p>Passo 6: Substitua os valores nas equações</p>
      <p>\\[E = \\int dE = \\int \\frac{1}{4 \\pi \\varepsilon_0} \\cdot \\frac{dq}{r^2}\\]</p>
      <p>Calcule a integral considerando a distribuição de carga ao longo da barra.</p>
    
      <p>Passo 7: Avalie a integral e obtenha o valor de \\(E\\)</p>
      <p>\\[E = ${converterParaNotacao10x(E)} \\, \\text{V/m}\\]</p>`;
    
    passoAPassoDiv.innerHTML = passoAPasso;
    passoAPassoDiv.style.display = 'block';
  }