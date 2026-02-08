alert("JS carregou");
/* ===== ELEMENTOS ===== */

function byId(id){
  return document.getElementById(id);
}

/* ===== FRASES ===== */

const frases = [
  "Disciplina vence desânimo.",
  "Nada muda se eu não mudar."
];

if(byId("frase")){
  let f = localStorage.frase || 0;
  byId("frase").innerText = frases[f];
  localStorage.frase = (Number(f)+1)%2;
}

/* ===== LOGIN ===== */

function login(){

let user = byId("user");
let pass = byId("pass");

if(!"Vitória" || !"1997") return;

let u = user.value;
let p = pass.value;

localStorage.logado="1";
location.href="inicio.html";

}else{

byId("erro").innerText="Dados incorretos";

}

}

/* ===== LOGOUT ===== */

function logout(){

localStorage.removeItem("logado");
location.href="index.html";

}

/* ===== PROTEÇÃO ===== */

if(
!location.href.includes("index.html") &&
localStorage.logado!=="1"
){
location.href="index.html";
}

/* ===== MENU ===== */

function openMenu(){
  byId("menu").classList.add("open");
  byId("overlay").classList.add("show");
}

function closeMenu(){
  byId("menu").classList.remove("open");
  byId("overlay").classList.remove("show");
}

/* ===== CHECKLIST ===== */

function saveCheck(){

let arr = JSON.parse(localStorage.checks || "[]");

arr.push({
data: new Date().toLocaleDateString(),
c1: byId("c1").checked,
c2: byId("c2").checked,
c3: byId("c3").checked,
c4: byId("c4").checked
});

localStorage.checks = JSON.stringify(arr);

alert("Checklist salvo 💖");

}

/* ===== CONTADOR ===== */

function update(){

let start = new Date("2026-02-09");
let now = new Date();

let d = Math.floor((now-start)/86400000)+1;

if(byId("contador")){
byId("contador").innerText = "Dia "+d+" de 120";
}

}

setInterval(update,1000);
update();

/* ===== CALENDÁRIO ===== */

function gerarCalendario(){

let hoje = new Date();

let ano = hoje.getFullYear();
let mes = hoje.getMonth();

let primeiro = new Date(ano,mes,1).getDay();
let ultimo = new Date(ano,mes+1,0).getDate();

let box = byId("calendario");

if(!box) return;

box.innerHTML="";

for(let i=0;i<primeiro;i++){
box.innerHTML+="<div></div>";
}

for(let d=1;d<=ultimo;d++){

let div=document.createElement("div");

div.innerText=d;

if(d===hoje.getDate()){
div.classList.add("hoje");
}

box.appendChild(div);
}

}

gerarCalendario();

/* ===== PESO ===== */

function salvarPeso(){

let v = byId("pesoInput").value;

if(!v) return;

let lista = JSON.parse(localStorage.pesos || "[]");

lista.push({
data:new Date().toLocaleDateString(),
peso:v
});

localStorage.pesos = JSON.stringify(lista);

byId("pesoInput").value="";

carregarPesos();

alert("Peso salvo 💖");

}

function carregarPesos(){

let box = byId("listaPeso");

if(!box) return;

let lista = JSON.parse(localStorage.pesos || "[]");

box.innerHTML="";

lista.reverse().forEach(i=>{

box.innerHTML +=
`<p><b>${i.data}</b> — ${i.peso} kg</p>`;

});

}

carregarPesos();

/* ===== DIÁRIO ===== */

function salvarDiario(){

let txt = byId("diarioTexto").value;

if(!txt.trim()){
alert("Escreva algo 💖");
return;
}

let lista = JSON.parse(localStorage.diario || "[]");

let agora = new Date();

lista.unshift({
texto:txt,
data:agora.toLocaleDateString(),
hora:agora.toLocaleTimeString()
});

localStorage.diario = JSON.stringify(lista);

byId("diarioTexto").value="";

mostrarDiario();

alert("Salvo 💕");

}

function mostrarDiario(){

let box = byId("listaDiario");

if(!box) return;

let lista = JSON.parse(localStorage.diario || "[]");

let html="";

lista.forEach(i=>{

html+=`
<div class="diario-item">
<small>${i.data} • ${i.hora}</small>
<p>${i.texto}</p>
</div>
`;

});

box.innerHTML = html || "<p>Nenhum registro 🌱</p>";

}

mostrarDiario();

/* ===== DIÁRIO HOME ===== */

function salvarDiarioHome(){

let txt = byId("diarioHome").value;

if(!txt.trim()){
alert("Escreva algo 💖");
return;
}

let lista = JSON.parse(localStorage.diario || "[]");

let agora = new Date();

lista.unshift({
texto:txt,
data:agora.toLocaleDateString(),
hora:agora.toLocaleTimeString()
});

localStorage.diario = JSON.stringify(lista);

byId("diarioHome").value="";

alert("Salvo 💕");

}

/* ===== TREINO ===== */

function registrarTreino(){

let chk = byId("treinoFeito");

if(!chk.checked){
alert("Marque primeiro 💖");
return;
}

let lista = JSON.parse(localStorage.treinos || "[]");

lista.unshift({
data:new Date().toLocaleDateString(),
hora:new Date().toLocaleTimeString()
});

localStorage.treinos = JSON.stringify(lista);

chk.checked=false;

alert("Treino salvo 💪💕");

}

/* ===== CAMINHADA ===== */

let walkStart=null;
let walkTimer=null;

function iniciarWalk(){

if(walkTimer) return;

walkStart=Date.now();

walkTimer=setInterval(atualizarWalk,1000);

}

function atualizarWalk(){

let diff = Date.now()-walkStart;

let s = Math.floor(diff/1000)%60;
let m = Math.floor(diff/60000)%60;
let h = Math.floor(diff/3600000);

let t =
String(h).padStart(2,"0")+":"+
String(m).padStart(2,"0")+":"+
String(s).padStart(2,"0");

if(byId("tempoWalk")){
byId("tempoWalk").innerText=t;
}

}

function encerrarWalk(){

if(!walkTimer){
alert("Inicie primeiro 💖");
return;
}

clearInterval(walkTimer);
walkTimer=null;

let tempo = byId("tempoWalk").innerText;

let lista = JSON.parse(localStorage.walks || "[]");

lista.unshift({
data:new Date().toLocaleDateString(),
hora:new Date().toLocaleTimeString(),
tempo:tempo
});

localStorage.walks = JSON.stringify(lista);

byId("tempoWalk").innerText="00:00:00";

mostrarWalk();

alert("Caminhada salva 🚶‍♀️💕");

}

function mostrarWalk(){

let box = byId("listaWalk");

if(!box) return;

let lista = JSON.parse(localStorage.walks || "[]");

let html="";

lista.forEach(i=>{

html+=`<p><b>${i.data}</b> • ${i.tempo}</p>`;

});

box.innerHTML = html || "<p>Nenhuma ainda 🌱</p>";

}

mostrarWalk();

/* ===== ALIMENTAÇÃO ===== */

function salvarComida(){

let status = byId("statusComida").value;
let obs = byId("obsComida").value;

if(!status){
alert("Selecione 💖");
return;
}

let lista = JSON.parse(localStorage.comidas || "[]");

lista.unshift({
data:new Date().toLocaleDateString(),
status:status,
obs:obs
});

localStorage.comidas = JSON.stringify(lista);

byId("statusComida").value="";
byId("obsComida").value="";

mostrarComidas();

alert("Salvo 🥗💕");

}

function mostrarComidas(){

let box = byId("listaComida");

if(!box) return;

let lista = JSON.parse(localStorage.comidas || "[]");

let html="";

lista.forEach(i=>{

let emoji="💛";

if(i.status==="ok") emoji="✅";
if(i.status==="adaptado") emoji="⚠️";
if(i.status==="fora") emoji="❌";

html+=`
<p>
<b>${i.data}</b> ${emoji}<br>
${i.obs||""}
</p>
`;

});

box.innerHTML = html || "<p>Nenhum ainda 🌱</p>";

}

mostrarComidas();

/* ===== ÁGUA ===== */

function salvarAgua(){

let v = byId("aguaInput").value;

if(!v){
alert("Digite 💧");
return;
}

let hoje = new Date().toLocaleDateString();

let lista = JSON.parse(localStorage.agua || "{}");

lista[hoje]=v;

localStorage.agua = JSON.stringify(lista);

mostrarAgua();

alert("Salvo 💙");

}

function mostrarAgua(){

let box = byId("aguaStatus");

if(!box) return;

let hoje = new Date().toLocaleDateString();

let lista = JSON.parse(localStorage.agua || "{}");

if(lista[hoje]){
box.innerText="Hoje: "+lista[hoje]+" L 💧";
}else{
box.innerText="Ainda não registrado 🌱";
}

}

mostrarAgua();

/* ===== LIXEIRAS ===== */

function limparDiario(){
if(confirm("Apagar todo o diário?")){
localStorage.removeItem("diario");
mostrarDiario();
alert("Diário limpo 💕");
}
}

function limparPeso(){
if(confirm("Apagar histórico de peso?")){
localStorage.removeItem("pesos");
carregarPesos();
alert("Peso limpo ⚖️");
}
}

function limparTreinos(){
if(confirm("Apagar registros de treino?")){
localStorage.removeItem("treinos");
alert("Treinos limpos 💪");
}
}

function limparCaminhada(){
if(confirm("Apagar caminhadas?")){
localStorage.removeItem("walks");
mostrarWalk();
alert("Caminhadas limpas 🚶‍♀️");
}
}

function limparComida(){
if(confirm("Apagar histórico alimentar?")){
localStorage.removeItem("comidas");
mostrarComidas();
alert("Alimentação limpa 🥗");
}
}

function limparChecklist(){
if(confirm("Apagar checklist?")){
localStorage.removeItem("checks");
alert("Checklist limpo ✅");
}
}

function limparAgua(){
if(confirm("Apagar registros de água?")){
localStorage.removeItem("agua");
mostrarAgua();
alert("Água limpa 💧");
}
}
