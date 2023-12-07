function selecionarSistema(selecao) {
    aulasVideo = document.getElementById("aulasVideo");
    document.querySelector(".resultado_resumido").innerHTML= ""
    document.querySelector(".resultado_completo").innerHTML = ""
    document.querySelector(".resultado_completo").style.display = "none"
    if (selecao == 1) {
        document.querySelector("#sistema3_1").style.display = "flex"
        document.querySelector("#sistema3_2").style.display = "none"
        document.querySelector("#sistema3_3").style.display = "none"
        aulasVideo.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/KhxYH26ngW8?si=ueJ4wU3RSFe1KLKd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    } else if (selecao == 2) {
        document.querySelector("#sistema3_1").style.display = "none"
        document.querySelector("#sistema3_2").style.display = "flex"
        document.querySelector("#sistema3_3").style.display = "none"
        aulasVideo.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/g-xEzSaKXb4?si=idteO69osDUYMC5f" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    } else {
        document.querySelector("#sistema3_1").style.display = "none"
        document.querySelector("#sistema3_2").style.display = "none"
        document.querySelector("#sistema3_3").style.display = "flex"
        aulasVideo.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/_8K0vVL-k3g?si=jOaBgOCyJpshUEQJ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    }
    document.querySelector(".aulas").style.display = "flex"
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

function mostrarPDF(){
    pdfButton.innerHTML = '';
    pdf = document.getElementById("pdf");
    pdfButton = document.getElementById("pdfButton");
    if(pdf.style.display == "none"){
        pdf.style.display = "flex";
        pdfButton.innerHTML = 'Ocultar';
    } else {
        pdf.style.display = "none";
        pdfButton.innerHTML = 'Mostrar'
    }
}