const teamsData = [
  { name:"FURIA", logo:"logos/furia.png" },
  { name:"MIBR", logo:"logos/mibr.png" },
  { name:"TEAM SECRET", logo:"logos/secret.png" },
  { name:"BS+ COMPETITION", logo:"logos/bs.png" },
  { name:"BIGODES", logo:"logos/bigodes.png" },
  { name:"NUTORIOUS", logo:"logos/notorious.png" },
  { name:"ENOSIS", logo:"logos/enosis.png" },
  { name:"NOVADRIFT", logo:"logos/rocket.png" },
  { name:"0 ESFORÇO FC", logo:"logos/rocket.png" },
  { name:"OVERLOOKED", logo:"logos/overlooked.png" },
  { name:"SANGRES", logo:"logos/rocket.png" },
  { name:"W KEY", logo:"logos/rocket.png" },
  { name:"DREAM ESPORTS", logo:"logos/dream.png" },
  { name:"CARIE TEAM", logo:"logos/rocket.png" },
  { name:"NOVA LEGION", logo:"logos/novalegion.png" },
  { name:"DEFIED", logo:"logos/rocket.png" }
];

const teamsUl = document.getElementById("teams");

function renderTeams() {
  teamsUl.innerHTML = "";
  teamsData.forEach((team, index) => {
    const li = document.createElement("li");
    // 🔥 Reagregadas las comillas invertidas (backticks) para que funcionen las variables
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
    ctx.fillStyle="ffffff";
    ctx.textAlign="center";
    ctx.font="bold 60px BourgeoisBold";
    ctx.fillText(name.toUpperCase(),538,255);
  }

  const teams = document.querySelectorAll("#teams li");
  let startY = 335;   
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
