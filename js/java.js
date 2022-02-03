/* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("main").style.marginLeft = "300px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.6)";
}
  
  /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.body.style.backgroundColor = "rgba(0,0,0,0.6)";
}

var WORDS_EN = {
    "dashboard":"Dashboard",
    "name": "Digital Scale",
    "node": "NODE",
    "lang-connectedOn":"CONNECTED ON",
    "reading-interval": "Readings every",
    "sensors": "Sensors",
    "integrations": "INTEGRATIONS",
    "configurations" : "Configurations",
};
var WORDS_PT = {
    "dashboard":"Painel de Controlo",
    "name": "Balança Digital",
    "node": "NÓ",
    "lang-connectedOn":"LIGADO A",
    "group": "Grupo",
    "integrations": "INTEGRAÇÕES",
    "configurations" : "Configurações",
};

function loadsLanguage(lang) {
    if (lang === null) {
        window.navigator.language.startsWith("en") ? lang = "EN" : lang = "PT";
    }
    localStorage.setItem('lang', lang);
    $('span[class^="lang"]').each(function () {
        var langVar = (this.className).replace('lang-', '');
        var text = window['WORDS_' + lang][langVar];
        $(this).text(text);
    });
    $('option[class^="lang"]').each(function () {
        var langVar = (this.className).replace('lang-', '');
        var text = window['WORDS_' + lang][langVar];
        if (!text) {
            text = langVar;
        }
        $(this).text(text);
    });
}

function showMessage(pt, en) {
    localStorage.getItem('lang').toString() === "PT" ? alert(pt) : alert(en);
}

function showText(pt, en) {
    return localStorage.getItem('lang').toString() === "PT" ? pt : en;

}

$(document).ready(function () {

    let lang = localStorage.getItem('lang');
    if (lang) {
        loadsLanguage(lang);
    } else {
        window.navigator.language.startsWith("en") ? loadsLanguage("EN") : loadsLanguage("PT");
    }
    /*loadConfig();*/
    $('#node_id').on('keypress', function (e) {
        if (e.which === 32)
            return false;
    });
    $('.menu-item').click(function (e) {
        let menu = $(e.currentTarget).data('menu');
        toggleActive(menu);

    });

});

setInterval(function (){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            document.getElementById("weight").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET","weight_read",true);
    xhttp.send();
}, 100);


