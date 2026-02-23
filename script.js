const teamsData = [
  "TSM", "FURIA", "SHOPIFY REBELLION", "NRG", "VITALITY",
  "KARMINE CORP", "FALCONS", "SPACESTATION", "GENTLEMATES",
  "PWR", "TWISTED MINDS", "MIBR", "GEEKAY ESPORTS",
  "NINJAS IN PYJAMAS", "VIRTUS.PRO", "FIVE FEARS"
];

const teamsList = document.getElementById("teams");
const canvas = document.getElementById("previewCanvas");
const ctx = canvas.getContext("2d");
const nameInput = document.getElementById("personName");
const charCounter = document.getElementById("charCounter");

/* Crear lista */
teamsData.forEach(team => {
  const li = document.createElement("li");
  li.textContent = team;
  teamsList.appendChild(li);
});

/* Sortable */
new Sortable(teamsList, {
  animation: 150,
  onSort: updateCanvas
});

/* Contador */
nameInput.addEventListener("input", () => {
  const length = nameInput.value.length;
  charCounter.textContent = `${length}/25`;

  if (length >= 25) {
    charCounter.classList.add("limit");
  } else {
    charCounter.classList.remove("limit");
  }

  updateCanvas();
});

/* Dibujar */
function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "bold 40px Arial";
  ctx.fillText("POWER RANKINGS", 300, 120);

  // Nombre persona
  ctx.font = "bold 36px Arial";
  ctx.fillText(nameInput.value.toUpperCase(), 538, 255);

  // Equipos
  ctx.font = "28px Arial";

  let startY = 355;

  [...teamsList.children].forEach((li, index) => {
    ctx.fillText(`#${index + 1} ${li.textContent}`, 200, startY + (index * 50));
  });
}

/* Descargar imagen */
function downloadImage() {
  const link = document.createElement("a");
  link.download = "rocket-street-power-ranking.png";
  link.href = canvas.toDataURL();
  link.click();
}

/* Descargar solo */
document.getElementById("downloadOnlyBtn")
  .addEventListener("click", downloadImage);

/* Descargar + compartir */
document.getElementById("downloadShareBtn")
  .addEventListener("click", () => {
    downloadImage();

    const tweetText = encodeURIComponent(
      "Estos son mis Power Rankings 🚀 @RocketStreet"
    );

    window.open(
      `https://twitter.com/intent/tweet?text=${tweetText}`,
      "_blank"
    );
  });

/* Discord */
document.getElementById("discordBtn")
  .addEventListener("click", () => {
    window.open("https://discord.gg/zWMaC4Qwak", "_blank");
  });

updateCanvas();
