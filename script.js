const teamsData = [
  { name:"TSM", logo:"logos/tsm.png" },
  { name:"FURIA", logo:"logos/furia.png" },
  { name:"SHOPIFY REBELLION", logo:"logos/shopify.png" },
  { name:"NRG", logo:"logos/nrg.png" },
  { name:"VITALITY", logo:"logos/vitality.png" },
  { name:"KARMINE CORP", logo:"logos/kc.png" },
  { name:"FALCONS", logo:"logos/falcons.png" },
  { name:"SPACESTATION", logo:"logos/ssg.png" },
  { name:"GENTLEMATES", logo:"logos/gentlemates.png" },
  { name:"PWR", logo:"logos/pwr.png" },
  { name:"TWISTED MINDS", logo:"logos/twisted.png" },
  { name:"MIBR", logo:"logos/mibr.png" },
  { name:"GEEKAY ESPORTS", logo:"logos/geekay.png" },
  { name:"NINJAS IN PYJAMAS", logo:"logos/nip.png" },
  { name:"VIRTUS.PRO", logo:"logos/vp.png" },
  { name:"FIVE FEARS", logo:"logos/5f.png" }
];

const teamsUl = document.getElementById("teams");

function renderTeams() {
  teamsUl.innerHTML = "";
  teamsData.forEach((team, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="position">#${index+1}</span>
      <div class="logo-box"><img src="${team.logo}"></div>
      <span class="team-name">${team.name}</span>
    `;
    teamsUl.appendChild(li);
  });
}
renderTeams();

new Sortable(teamsUl, {
  animation: 150,
  onEnd: () => {
    updatePositions();
    generateImage();
  }
});

function updatePositions(){
  document.querySelectorAll("#teams li").forEach((item, i) => {
    item.querySelector(".position").textContent = `#${i+1}`;
  });
}

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1080;
canvas.height = 1350;

function loadImage(src) {
  return new Promise(resolve=>{
    const img = new Image();
    img.onload = ()=> resolve(img);
    img.src = src;
  });
}

async function generateImage() {

  ctx.clearRect(0,0,canvas.width,canvas.height);

  const bg = await loadImage("background.png");
  ctx.drawImage(bg,0,0,canvas.width,canvas.height);

  let name = document.getElementById("personName").value.slice(0,25);

  if(name){
    ctx.fillStyle="#bbff00";
    ctx.textAlign="center";
    ctx.font="bold 60px BourgeoisBold";
    ctx.fillText(name.toUpperCase(),538,255);
  }

  const teams = document.querySelectorAll("#teams li");
  let startY = 335;   // 🔥 CAMBIO PEDIDO
  const spacing = 65;

  for(let i=0;i<teams.length;i++){
    const teamName=teams[i].querySelector(".team-name").textContent;
    const logoSrc=teams[i].querySelector("img").src;
    const logo=await loadImage(logoSrc);

    ctx.drawImage(logo,210,startY-35,45,45);

    ctx.fillStyle="white";
    ctx.textAlign="left";
    ctx.font="bold 36px BourgeoisBold";
    ctx.fillText(teamName.toUpperCase(),300,startY);

    startY+=spacing;
  }

  document.getElementById("previewImage").src=canvas.toDataURL("image/png");
}

/* CONTADOR + LIMITE ROJO */

document.getElementById("personName").addEventListener("input", function(){

  const counter = document.getElementById("charCounter");
  counter.textContent = `${this.value.length} / 25`;

  if(this.value.length >= 25){
    counter.classList.add("limit");
    this.classList.add("limit");
  } else {
    counter.classList.remove("limit");
    this.classList.remove("limit");
  }

  generateImage();
});

/* SOLO DESCARGAR */

document.getElementById("downloadBtn").addEventListener("click",()=>{

  const imageData = canvas.toDataURL("image/png");

  const link=document.createElement("a");
  link.download="rocket-street-power-ranking.png";
  link.href=imageData;
  link.click();
});

/* DESCARGAR + ABRIR X */

document.getElementById("shareBtn").addEventListener("click",()=>{

  const imageData = canvas.toDataURL("image/png");

  const link=document.createElement("a");
  link.download="rocket-street-power-ranking.png";
  link.href=imageData;
  link.click();

  const tweetText="Estos son mis Power Rankings 🚀 @RocketStreet";
  const twitterUrl=`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  window.open(twitterUrl, "_blank");
});

generateImage();
