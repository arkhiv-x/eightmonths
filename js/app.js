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
  let u = $("user")?.value.trim();
  let p = $("pass")?.value.trim();

  if(u==="Vitória" && p==="1997"){
    localStorage.logado="1";
    location.href="inicio.html";
  }else{
    if($("erro")) $("erro").innerText="Dados incorretos";
  }
}

function logout(){
  localStorage.removeItem("logado");
  location.href="index.html";
}

/* ================= PROTEÇÃO ================= */

if(!location.href.includes("index.html") && localStorage.logado!=="1"){
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

/* ================= CARDÁPIO SEMANAL ================= */

let semanaAtual = Number(localStorage.semanaAtual || 0);

const cardapios = [

  {
    inicio: "03/02",
    fim: "09/02",

    cafe: [
      "2 ovos (~100g)",
      "1 fatia de pão (~50g)",
      "Banana (~100g)",
      "Café/Leite 200ml"
    ],

    almoco: {
      proteina: "Frango",
      qtd: "130g",
      arroz: "150g",
      feijao: "—",
      salada: "Alface, Repolho, Cenoura"
    },

    tarde: [
      "Iogurte 170g",
      "Fruta (~100g)",
      "Castanha 10g"
    ],

    jantar: [
      "Proteína 100g",
      "Arroz/Massa 80g",
      "Salada livre"
    ],

    saladas: [
      "Alface 50g",
      "Cenoura 40g",
      "Pepino 40g"
    ],

    frutas: [
      "Banana 100g",
      "Maçã 120g",
      "Mamão 150g",
      "Laranja 130g"
    ]
  },

  {
    inicio: "10/02",
    fim: "16/02",

    cafe: [
      "Ovos mexidos (~100g)",
      "Pão integral (~50g)",
      "Maçã (~120g)",
      "Café 200ml"
    ],

    almoco: {
      proteina: "Carne",
      qtd: "130g",
      arroz: "140g",
      feijao: "—",
      salada: "Alface, Cenoura, Beterraba"
    },

    tarde: [
      "Vitamina de banana",
      "Iogurte",
      "Castanha"
    ],

    jantar: [
      "Carne 100g",
      "Arroz 80g",
      "Salada"
    ],

    saladas: [
      "Alface",
      "Cenoura",
      "Beterraba"
    ],

    frutas: [
      "Banana",
      "Maçã",
      "Melão",
      "Laranja"
    ]
  }

];

function mostrarCardapio(){

  let s = cardapios[semanaAtual];
  if(!s) return;

  $("cardapioSemana").innerText =
  `Semana ${semanaAtual+1} • ${s.inicio} a ${s.fim}`;

  $("cafeBox").innerHTML = `
  <b>☀️ Café da Manhã</b><br>
  • ${s.cafe.join("<br>• ")}
  `;

  $("almocoBox").innerHTML = `
  <b>🍱 Almoço (Marmita)</b><br>
  • Proteína: ${s.almoco.proteina} (${s.almoco.qtd})<br>
  • Arroz: ${s.almoco.arroz}<br>
  • Feijão: ${s.almoco.feijao}<br>
  • Salada: ${s.almoco.salada}
  `;

  $("tardeBox").innerHTML = `
  <b>🍎 Café da Tarde / Pré-Treino</b><br>
  • ${s.tarde.join("<br>• ")}
  `;

  $("jantarBox").innerHTML = `
  <b>🌙 Jantar</b><br>
  • ${s.jantar.join("<br>• ")}
  `;

  $("saladaBox").innerHTML = `
  <b>🥗 Saladas</b><br>
  • ${s.saladas.join("<br>• ")}
  `;

  $("frutaBox").innerHTML = `
  <b>🍌 Frutas</b><br>
  • ${s.frutas.join("<br>• ")}
  `;
}

function proximaSemana(){
  if(semanaAtual < cardapios.length-1){
    semanaAtual++;
    localStorage.semanaAtual = semanaAtual;
    mostrarCardapio();
  }
}

function semanaAnterior(){
  if(semanaAtual > 0){
    semanaAtual--;
    localStorage.semanaAtual = semanaAtual;
    mostrarCardapio();
  }
}

mostrarCardapio();

/* ================= LIXEIRAS ================= */

function limpar(nome, msg){
  if(confirm(msg)){
    localStorage.removeItem(nome);
    location.reload();
  }
}

function limparComida(){ limpar("comidas","Apagar alimentação?"); }
function limparAgua(){ limpar("agua","Apagar água?"); }
