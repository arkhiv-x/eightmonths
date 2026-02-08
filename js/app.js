/* FRASES */

const frases=[
"Disciplina vence desânimo.",
"Nada muda se eu não mudar."
];

if(document.getElementById("frase")){

let f=localStorage.frase||0;

frase.innerText=frases[f];

localStorage.frase=(+f+1)%2;

}

/* LOGIN */

function login(){

let u=document.getElementById("user").value;
let p=document.getElementById("pass").value;

if(u==="Vitória" && p==="1997"){

localStorage.logado="1";
window.location="inicio.html";

}else{

document.getElementById("erro").innerText="Dados incorretos";

}

}

/* LOGOUT */

function logout(){

localStorage.removeItem("logado");
window.location="index.html";

}

/* PROTEÇÃO */

if(
!window.location.href.includes("index.html") &&
localStorage.logado!=="1"
){
window.location="index.html";
}

/* MENU */

function openMenu(){
menu.classList.add("open");
overlay.classList.add("show");
}

function closeMenu(){
menu.classList.remove("open");
overlay.classList.remove("show");
}

/* CHECK */

function saveCheck(){

let arr=JSON.parse(localStorage.checks||"[]");

arr.push({
d:new Date().toLocaleDateString(),
c1:c1.checked,
c2:c2.checked,
c3:c3.checked,
c4:c4.checked
});

localStorage.checks=JSON.stringify(arr);

alert("Salvo 💖");

}

/* CONTADOR */

function update(){

let start=new Date("2026-02-09");
let now=new Date();

let d=Math.floor((now-start)/86400000)+1;

if(document.getElementById("contador")){
contador.innerText="Dia "+d+" de 120";
}

}

setInterval(update,1000);
update();

/* CALENDÁRIO */

function gerarCalendario(){

let hoje=new Date();

let ano=hoje.getFullYear();
let mes=hoje.getMonth();

let primeiro=new Date(ano,mes,1).getDay();
let ultimo=new Date(ano,mes+1,0).getDate();

let box=document.getElementById("calendario");

if(!box) return;

box.innerHTML="";

for(let i=0;i<primeiro;i++){
box.innerHTML+="<div></div>";
}

for(let d=1;d<=ultimo;d++){

let div=document.createElement("div");

div.innerText=d;

if(
d===hoje.getDate()
){
div.classList.add("hoje");
}

box.appendChild(div);
}

}

/* DIÁRIO HOME */

function salvarDiarioHome(){

let txt=document.getElementById("diarioHome").value;

if(!txt) return;

let arr=JSON.parse(localStorage.diario||"[]");

arr.push({
d:new Date().toLocaleString(),
t:txt
});

localStorage.diario=JSON.stringify(arr);

document.getElementById("diarioHome").value="";

alert("Salvo 💖");

}

/* INICIAR */

gerarCalendario();

/* ===== PESO ===== */

function salvarPeso(){

let v=document.getElementById("pesoInput").value;

if(!v) return;

let lista=JSON.parse(localStorage.pesos||"[]");

lista.push({
d:new Date().toLocaleDateString(),
p:v
});

localStorage.pesos=JSON.stringify(lista);

document.getElementById("pesoInput").value="";

carregarPesos();

alert("Peso salvo 💖");

}

function carregarPesos(){

let box=document.getElementById("listaPeso");

if(!box) return;

let lista=JSON.parse(localStorage.pesos||"[]");

box.innerHTML="";

lista.slice().reverse().forEach(i=>{

box.innerHTML+=
`<p><b>${i.d}</b> — ${i.p} kg</p>`;

});

}

carregarPesos();

/* DIÁRIO */

function salvarDiario(){

let texto = document.getElementById("diarioTexto").value;

if(texto.trim()===""){
alert("Escreva algo primeiro 💖");
return;
}

let lista = JSON.parse(localStorage.diario || "[]");

let agora = new Date();

lista.unshift({
texto: texto,
data: agora.toLocaleDateString(),
hora: agora.toLocaleTimeString()
});

localStorage.diario = JSON.stringify(lista);

document.getElementById("diarioTexto").value = "";

mostrarDiario();

alert("Salvo com carinho 💕");
}


function mostrarDiario(){

let lista = JSON.parse(localStorage.diario || "[]");

let html = "";

lista.forEach(item=>{

html += `
<div class="diario-item">

<small>${item.data} • ${item.hora}</small>

<p>${item.texto}</p>

</div>
`;

});

if(document.getElementById("listaDiario")){
document.getElementById("listaDiario").innerHTML = html || "<p>Nenhum registro ainda 🌱</p>";
}

}

mostrarDiario();

/* DIÁRIO DA HOME */

function salvarDiarioHome(){

let texto = document.getElementById("diarioHome").value;

if(!texto || texto.trim()===""){
alert("Escreva algo primeiro 💖");
return;
}

let lista = JSON.parse(localStorage.diario || "[]");

let agora = new Date();

lista.unshift({
texto: texto,
data: agora.toLocaleDateString(),
hora: agora.toLocaleTimeString()
});

localStorage.diario = JSON.stringify(lista);

document.getElementById("diarioHome").value = "";

alert("Salvo no diário 💕");

}
