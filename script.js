function selecionarSistema(selecao) {
    document.querySelector(".resultado_resumido").innerHTML= ""
    document.querySelector(".resultado_completo").innerHTML = ""
    document.querySelector(".resultado_completo").style.display = "none"
    if (selecao == 1) {
        document.querySelector("#sistema3_1").style.display = "flex"
        document.querySelector("#sistema3_2").style.display = "none"
        document.querySelector("#sistema3_3").style.display = "none"
    } else if (selecao == 2) {
        document.querySelector("#sistema3_1").style.display = "none"
        document.querySelector("#sistema3_2").style.display = "flex"
        document.querySelector("#sistema3_3").style.display = "none"
    } else {
        document.querySelector("#sistema3_1").style.display = "none"
        document.querySelector("#sistema3_2").style.display = "none"
        document.querySelector("#sistema3_3").style.display = "flex"
    }
}

function converterParaNotacao10x(numero) {
    let notacaoCientifica = numero.toExponential().split('e');
    let base = parseFloat(notacaoCientifica[0]);
    let expoente = parseFloat(notacaoCientifica[1]);
  
    return `${base.toFixed(2)} ⋅ 10^{${expoente}}`;
}

function mostrarCalculos() {
    if (document.querySelector(".resultado_completo").style.display == "none") {
        document.querySelector(".resultado_completo").style.display = "block"
        document.querySelector("#mostrarButton").innerHTML = 'Ocultar Cálculos'
    } else {
        document.querySelector(".resultado_completo").style.display = "none"
        document.querySelector("#mostrarButton").innerHTML = 'Mostrar Cálculos'
    }
}