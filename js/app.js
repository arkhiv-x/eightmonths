/* ================= UTIL ================= */

function $(id){
  return document.getElementById(id);
}

/* ================= FRASES ================= */

const frases = [
  "Disciplina vence desânimo.",
  "Nada muda se eu não mudar."
];

if($("frase")){
  let f = localStorage.frase || 0;
  $("frase").innerText = frases[f];
  localStorage.frase = (Number(f)+1)%frases.length;
}

/* ================= LOGIN ================= */

function login(){

  let u = $("user").value.trim();
  let p = $("pass").value.trim();

  if(u==="Vitória" && p==="1997"){

    localStorage.logado="1";
    location.href="inicio.html";

  }else{

    $("erro").innerText="Dados incorretos";

  }

}

/* ================= LOGOUT ================= */

function logout(){
  localStorage.removeItem("logado");
  location.href="index.html";
}

/* ================= PROTEÇÃO ================= */

if(
  !location.href.includes("index.html") &&
  localStorage.logado!=="1"
){
  location.href="index.html";
}

/* ================= MENU ================= */

function openMenu(){
  $("menu")?.classList.add("open");
  $("overlay")?.classList.add("show");
}

function closeMenu(){
  $("menu")?.classList.remove("open");
  $("overlay")?.classList.remove("show");
}

/* ================= CHECKLIST ================= */

function saveCheck(){

  let arr = JSON.parse(localStorage.checks || "[]");

  arr.unshift({
    data: new Date().toLocaleDateString(),
    c1: $("c1")?.checked,
    c2: $("c2")?.checked,
    c3: $("c3")?.checked,
    c4: $("c4")?.checked
  });

  localStorage.checks = JSON.stringify(arr);

  alert("Checklist salvo 💖");
}

/* ================= CONTADOR ================= */

function update(){

  let start = new Date("2026-02-09");
  let now = new Date();

  let d = Math.floor((now-start)/86400000)+1;

  if($("contador")){
    $("contador").innerText = "Dia "+d+" de 120";
  }
}

setInterval(update,1000);
update();

/* ================= CALENDÁRIO ================= */

function gerarCalendario(){

  let hoje = new Date();

  let ano = hoje.getFullYear();
  let mes = hoje.getMonth();

  let primeiro = new Date(ano,mes,1).getDay();
  let ultimo = new Date(ano,mes+1,0).getDate();

  let box = $("calendario");

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

/* ================= PESO ================= */

function salvarPeso(){

  let v = $("pesoInput")?.value;

  if(!v) return;

  let lista = JSON.parse(localStorage.pesos || "[]");

  lista.unshift({
    data:new Date().toLocaleDateString(),
    peso:v
  });

  localStorage.pesos = JSON.stringify(lista);

  $("pesoInput").value="";

  carregarPesos();

  alert("Peso salvo 💖");
}

function carregarPesos(){

  let box = $("listaPeso");
  if(!box) return;

  let lista = JSON.parse(localStorage.pesos || "[]");

  box.innerHTML="";

  lista.forEach(i=>{
    box.innerHTML+=
    `<p><b>${i.data}</b> — ${i.peso} kg</p>`;
  });
}

carregarPesos();

/* ================= DIÁRIO ================= */

function salvarDiario(){

  let txt = $("diarioTexto")?.value;

  if(!txt || !txt.trim()){
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

  $("diarioTexto").value="";

  mostrarDiario();

  alert("Salvo 💕");
}

function mostrarDiario(){

  let box = $("listaDiario");
  if(!box) return;

  let lista = JSON.parse(localStorage.diario || "[]");

  let html="";

  lista.forEach(i=>{

    html+=`
    <div class="diario-item">
      <small>${i.data} • ${i.hora}</small>
      <p>${i.texto}</p>
    </div>`;
  });

  box.innerHTML = html || "<p>Nenhum registro 🌱</p>";
}

mostrarDiario();

/* ================= DIÁRIO HOME ================= */

function salvarDiarioHome(){

  let txt = $("diarioHome")?.value;

  if(!txt || !txt.trim()){
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

  $("diarioHome").value="";

  alert("Salvo 💕");
}

/* ================= TREINO ================= */

function registrarTreino(){

  let chk = $("treinoFeito");

  if(!chk || !chk.checked){
    alert("Marque primeiro 💖");
    return;
  }

  let lista = JSON.parse(localStorage.treinos || "[]");

  let agora = new Date();

  lista.unshift({
    data: agora.toLocaleDateString(),
    hora: agora.toLocaleTimeString()
  });

  localStorage.treinos = JSON.stringify(lista);

  chk.checked=false;

  mostrarTreinos();

  alert("Treino salvo 💪💕");
}


function mostrarTreinos(){

  let box = $("listaTreinos");

  if(!box) return;

  let lista = JSON.parse(localStorage.treinos || "[]");

  let html = "";

  lista.forEach(i=>{

    html += `
    <div class="diario-item">
      <small>${i.data} • ${i.hora}</small>
      <p>✔️ Treino concluído</p>
    </div>
    `;

  });

  box.innerHTML = html || "<p>Nenhum treino ainda 🌱</p>";

}

mostrarTreinos();

/* ================= CAMINHADA ================= */

let walkStart=null;
let walkTimer=null;

function iniciarWalk(){

  if(walkTimer) return;

  walkStart=Date.now();
  walkTimer=setInterval(atualizarWalk,1000);
}

function atualizarWalk(){

  if(!walkStart) return;

  let diff = Date.now()-walkStart;

  let s = Math.floor(diff/1000)%60;
  let m = Math.floor(diff/60000)%60;
  let h = Math.floor(diff/3600000);

  let t =
  String(h).padStart(2,"0")+":"+
  String(m).padStart(2,"0")+":"+
  String(s).padStart(2,"0");

  if($("tempoWalk")){
    $("tempoWalk").innerText=t;
  }
}

function encerrarWalk(){

  if(!walkTimer){
    alert("Inicie primeiro 💖");
    return;
  }

  clearInterval(walkTimer);
  walkTimer=null;

  let tempo = $("tempoWalk").innerText;

  let lista = JSON.parse(localStorage.walks || "[]");

  lista.unshift({
    data:new Date().toLocaleDateString(),
    hora:new Date().toLocaleTimeString(),
    tempo:tempo
  });

  localStorage.walks = JSON.stringify(lista);

  $("tempoWalk").innerText="00:00:00";

  mostrarWalk();

  alert("Caminhada salva 🚶‍♀️💕");
}

function mostrarWalk(){

  let box = $("listaWalk");
  if(!box) return;

  let lista = JSON.parse(localStorage.walks || "[]");

  let html="";

  lista.forEach(i=>{
    html+=`<p><b>${i.data}</b> • ${i.tempo}</p>`;
  });

  box.innerHTML = html || "<p>Nenhuma ainda 🌱</p>";
}

mostrarWalk();

/* ================= ALIMENTAÇÃO ================= */

function salvarComida(){

  let status = $("statusComida")?.value;
  let obs = $("obsComida")?.value;

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

  $("statusComida").value="";
  $("obsComida").value="";

  mostrarComidas();

  alert("Salvo 🥗💕");
}

function mostrarComidas(){

  let box = $("listaComida");
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
    </p>`;
  });

  box.innerHTML = html || "<p>Nenhum ainda 🌱</p>";
}

mostrarComidas();

/* ================= ÁGUA ================= */

function salvarAgua(){

  let v = $("aguaInput")?.value;

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

  let box = $("aguaStatus");
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

/* ================= LIXEIRAS ================= */

function limpar(nome, msg){

  if(confirm(msg)){
    localStorage.removeItem(nome);
    location.reload();
  }
}

function limparDiario(){ limpar("diario","Apagar diário?"); }
function limparPeso(){ limpar("pesos","Apagar pesos?"); }
function limparTreinos(){ limpar("treinos","Apagar treinos?"); }
function limparCaminhada(){ limpar("walks","Apagar caminhadas?"); }
function limparComida(){ limpar("comidas","Apagar alimentação?"); }
function limparChecklist(){ limpar("checks","Apagar checklist?"); }
function limparAgua(){ limpar("agua","Apagar água?"); }

/* ================= CONFIG ================= */

function setTema(t){

  localStorage.tema = t;

  aplicarTema();
}

function aplicarTema(){

  let tema = localStorage.tema || "claro";

  if(tema==="escuro"){

    document.body.classList.add("dark");

  }else{

    document.body.classList.remove("dark");

  }
}

aplicarTema();


function salvarPerfil(){

  let nome = $("nomePerfil")?.value;
  let altura = $("alturaPerfil")?.value;
  let meta = $("metaPerfil")?.value;

  let perfil = {
    nome,
    altura,
    meta
  };

  localStorage.perfil = JSON.stringify(perfil);

  alert("Perfil salvo 💖");
}

function carregarPerfil(){

  if(!$("nomePerfil")) return;

  let perfil = JSON.parse(localStorage.perfil || "{}");

  $("nomePerfil").value = perfil.nome || "";
  $("alturaPerfil").value = perfil.altura || "";
  $("metaPerfil").value = perfil.meta || "";
}

carregarPerfil();


function limparTudo(){

  if(!confirm("Apagar TODOS os dados? 😢")) return;

  localStorage.clear();

  alert("Tudo limpo.");

  location.href="index.html";
}

/* ===== PERFIL ===== */

function salvarPerfilCompleto(){

let perfil = {
nome: $("perfilNome").value,
idade: $("perfilIdade").value,
altura: $("perfilAltura").value,
peso: $("perfilPeso").value,
tel: $("perfilTel").value,
email: $("perfilEmail").value,
insta: $("perfilInsta").value,
bio: $("perfilBio").value,
foto: $("fotoPerfil").src || "",
evolucao: JSON.parse(localStorage.evolucao || "[]")
};

localStorage.perfilCompleto = JSON.stringify(perfil);

$("nomeExibido").innerText = perfil.nome || "Seu nome";

alert("Perfil salvo com sucesso 💗");
}

function carregarPerfilCompleto(){

let perfil = JSON.parse(localStorage.perfilCompleto || "{}");
if(!perfil) return;

if($("perfilNome")){

$("perfilNome").value = perfil.nome || "";
$("perfilIdade").value = perfil.idade || "";
$("perfilAltura").value = perfil.altura || "";
$("perfilPeso").value = perfil.peso || "";
$("perfilTel").value = perfil.tel || "";
$("perfilEmail").value = perfil.email || "";
$("perfilInsta").value = perfil.insta || "";
$("perfilBio").value = perfil.bio || "";

if(perfil.nome){
$("nomeExibido").innerText = perfil.nome;
}

if(perfil.foto){
$("fotoPerfil").src = perfil.foto;
}
}

carregarEvolucao();
}

/* FOTO */

function salvarFoto(e){

let file = e.target.files[0];
if(!file) return;

let reader = new FileReader();

reader.onload = function(){
$("fotoPerfil").src = reader.result;

let perfil = JSON.parse(localStorage.perfilCompleto || "{}");
perfil.foto = reader.result;
localStorage.perfilCompleto = JSON.stringify(perfil);
};

reader.readAsDataURL(file);
}

/* ===== PERFIL COMPLETO ===== */

function salvarPerfilCompleto(){

let perfil = {
nome: $("perfilNome").value,
idade: $("perfilIdade").value,
altura: $("perfilAltura").value,
peso: $("perfilPeso").value,
tel: $("perfilTel").value,
email: $("perfilEmail").value,
insta: $("perfilInsta").value,
foto: localStorage.fotoPerfil || ""
};

localStorage.perfilCompleto = JSON.stringify(perfil);

$("nomeExibido").innerText = perfil.nome || "Seu nome";

alert("Perfil salvo 💖");
}

function carregarPerfilCompleto(){

if(!$("perfilNome")) return;

let perfil = JSON.parse(localStorage.perfilCompleto || "{}");

$("perfilNome").value = perfil.nome || "";
$("perfilIdade").value = perfil.idade || "";
$("perfilAltura").value = perfil.altura || "";
$("perfilPeso").value = perfil.peso || "";
$("perfilTel").value = perfil.tel || "";
$("perfilEmail").value = perfil.email || "";
$("perfilInsta").value = perfil.insta || "";

if(perfil.nome){
$("nomeExibido").innerText = perfil.nome;
}

if(perfil.foto){
$("fotoPerfil").src = perfil.foto;
}
}

/* FOTO PERFIL */

function salvarFoto(e){

let file = e.target.files[0];
if(!file) return;

let reader = new FileReader();

reader.onload = function(){

localStorage.fotoPerfil = reader.result;
$("fotoPerfil").src = reader.result;

};

reader.readAsDataURL(file);
}

/* ===== EVOLUÇÃO ===== */

function salvarEvolucao(e){

let file = e.target.files[0];
if(!file) return;

let reader = new FileReader();

reader.onload = function(){

let lista = JSON.parse(localStorage.evolucao || "[]");
lista.unshift(reader.result);

localStorage.evolucao = JSON.stringify(lista);
carregarEvolucao();

};

reader.readAsDataURL(file);
}

function carregarEvolucao(){

let box = $("galeriaEvolucao");
if(!box) return;

let lista = JSON.parse(localStorage.evolucao || "[]");

let html="";

lista.forEach(img=>{
html += `<img src="${img}" onclick="verImagem('${img}')">`;
});

box.innerHTML = html;
}

function verImagem(src){
let w = window.open("");
w.document.write(`<img src="${src}" style="width:100%">`);
}

/* ===== PERFIL ===== */

function carregarPerfil(){

  let dados = localStorage.perfil;

  if(!dados) return;

  let p = JSON.parse(dados);

  document.getElementById("nomePerfil").value = p.nome || "";
  document.getElementById("idadePerfil").value = p.idade || "";
  document.getElementById("alturaPerfil").value = p.altura || "";
  document.getElementById("pesoPerfil").value = p.peso || "";
  document.getElementById("telPerfil").value = p.telefone || "";
  document.getElementById("emailPerfil").value = p.email || "";
  document.getElementById("instaPerfil").value = p.instagram || "";
  document.getElementById("bioPerfil").value = p.bio || "";

  if(p.foto && document.getElementById("fotoPerfilPreview")){
    document.getElementById("fotoPerfilPreview").src = p.foto;
  }

}

document.addEventListener("DOMContentLoaded", ()=>{
  carregarPerfil();
});

/* FOTO DE PERFIL */

function mudarFotoPerfil(input){

  let file = input.files[0];

  if(!file) return;

  let reader = new FileReader();

  reader.onload = function(e){

    let img = document.getElementById("fotoPerfilPreview");

    img.src = e.target.result;

  };

  reader.readAsDataURL(file);

}

/* ===== MODO ESCURO ===== */

function toggleDark(){

  let chk = document.getElementById("modoEscuro");

  if(chk.checked){
    document.body.classList.add("dark");
    localStorage.tema = "dark";
  }else{
    document.body.classList.remove("dark");
    localStorage.tema = "light";
  }

}


/* CARREGAR TEMA */

document.addEventListener("DOMContentLoaded", ()=>{

  carregarTema();

});

  if(localStorage.tema === "dark"){

    document.body.classList.add("dark");

    let chk = document.getElementById("modoEscuro");

    if(chk) chk.checked = true;
  }

}

carregarTema();
