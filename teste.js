const resultado = document.querySelector(".resultado");

const epsilon = (8.85)*(Math.pow(10,-12));
const pi = Math.PI;

function calcular3_1(R, Z, Q, lamb, choice){
	equacaoLamb = `\\[E = \\frac{1}{4\\pi\\epsilon_0} * \\frac{Z * \\lambda}{(Z^2+R^2)^\\frac{3}{2}} * 2 \\pi R\\]`
	equacaoQ = `\\[E = frac{1}{4\\pi\epsilon_0} * frac{Q * Z}{(Z^2+R^2)^frac{3}{2}}\\]`
	
	if (choice){
		E = (1 / 4 * pi * epsilon) * ((Z * lamb)/(Z^2 + R^2)^3/2) * 2 * pi * R;
		resultado.innerHTML += equacaoLamb;
		resultado.innerHTML += `\\[E = \\frac{1}{4\\pi\\epsilon_0} * \\frac{${Z} * ${lamb}}{(${Z}^2+${R}^2)^\\frac{3}{2}} * 2 \\pi ${R}\\]`
		resultado.innerHTML += `\\[E = ${converterParaNotacao10x(E)}\\; c^2/N * m^2\\]`
	}
}

calcular3_1(10, 10, 10, 10, true);

function converterParaNotacao10x(numero) {
    let notacaoCientifica = numero.toExponential().split('e');
    let base = parseFloat(notacaoCientifica[0]);
    let expoente = parseInt(notacaoCientifica[1]);
  
    return `${base.toFixed(2)} ⋅ 10^{${expoente}}`;
}