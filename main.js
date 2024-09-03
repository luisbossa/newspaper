const desNewsContainer = document.getElementById("description-news");
const container = document.querySelector(".container");
const toggleBtn = document.querySelector(".toggle-button");
const blockquote = document.getElementById("blockquote");
const subHeading = document.querySelector(".sub-heading");
const topNews = document.querySelector(".topNews");
const textFooter = document.querySelector(".text-footer");

/*----------------- FOOTER COMPANY NAME ----------------*/

let companyName = "BStudio";
textFooter.textContent = "© " + companyName;

/*----------------- 20 NEWS HOME PART----------------*/

fetch("https://api.crhoy.net/ultimas/20.json")
  .then((response) => response.json())
  .then((data) => {
    const subHeading = data.ultimas[0];
    const firstReport = data.ultimas[0];

    if (subHeading) {
      const content = `<p><span>${subHeading.date}</span></p>`;
      document
        .getElementById("sub-div")
        .insertAdjacentHTML("afterbegin", content);

      const span = document.querySelector(".sub-div span");

      document
        .getElementById("toggle-button")
        .addEventListener("click", toggleDarkMode);

      function toggleDarkMode() {
        span.classList.toggle("dark-mode");
      }
    }

    if (firstReport) {
      const content = `
        <img src="${firstReport.img}" class="home-img" alt="${firstReport.title}">
        <a href=${firstReport.url} target="_blank"><p class="heading-2">${firstReport.title}</p></a>
          `;
      document
        .getElementById("left-side")
        .insertAdjacentHTML("afterbegin", content);

      const underline = document.querySelector(".left-side a");

      document
        .getElementById("toggle-button")
        .addEventListener("click", toggleDarkMode);

      function toggleDarkMode() {
        underline.classList.toggle("dark-mode");
      }
    }

    const content = data.ultimas
      .map(
        (report) =>
          `<div class="news">
              <div class="img">
                <img src=${report.img} alt="image">
              </div>
            <div class="text">
              <div class="title">
                <a href=${report.url} target="_blank"><p>${report.title}</p></a>
              </div>
            </div>
         </div>`
      )
      .join("");

    document
      .getElementById("topNews")
      .insertAdjacentHTML("afterbegin", content);

    /*----------------- NEWS DESCRIPTION----------------*/

    const descriptionNews = data.ultimas;

    if (descriptionNews.length > 0) {
      const description = descriptionNews[0];
      const htmlContent = `
        <div class="news-item">  
          <div class="red-div">
            <div class="p-gap">
              <p><span class="p-color">${description.author[0]}</span>, nos presenta este reportaje a través de la pagina web de noticias crhoy.</p>
            </div>
            <div>
              <p>La noticia se clasifica dentro de la categoría <span class="p-color">${description.categories[0][1]}</span>.</p>
            </div>
          </div>

          <div class="normal-div">
            <div class="p-gap">
              <p>La pieza informativa se emitió a las <span class="p-color">${description.hour}</span>en un horario con audiencia.</p>
            </div>
            <div>
              <p>Para esta noticia se llebo a cabo una gran cobertura, incluyendo entrevistas con los presentes en el momento de los hechos.</p>
            </div>
          </div>

          <div class="normal-div">
            <div class="p-gap">
              <p>Para más detalles, puede contactar al autor de dicho informe, haciendo click: <a href=${description.author[1]} target="_blank"><span class="p-color">Aquí</span></a></p>
            </div>
            <div>
              <p>Para leer el artículo completo, puede visitar el siguiente enlace:
              <a href=${description.url} target="_blank"><span class="p-color">Ir</span></a></p>
            </div>
          </div>
        </div>
        `;
      desNewsContainer.innerHTML = htmlContent;

      const spans = document.querySelectorAll(".normal-div a");

      document
        .getElementById("toggle-button")
        .addEventListener("click", toggleDarkMode);

      function toggleDarkMode() {
        spans.forEach((span) => {
          span.classList.toggle("dark-mode");
        });
      }
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

/*----------------- TOGGLE LIGHT / DARK BTN ----------------*/

function toggleDarkMode() {
  document.body.classList.toggle("scrollbar-black");
  document.body.classList.toggle("scrollbar-red");
  document.body.classList.toggle("dark-mode");
  topNews.classList.toggle("scrollbar-red");
  topNews.classList.toggle("scrollbar-black");
  container.classList.toggle("dark-mode");
  subHeading.classList.toggle("dark-mode");
  toggleBtn.classList.toggle("dark-mode");
  topNews.classList.toggle("dark-mode");
  blockquote.classList.toggle("red-quote");
  textFooter.classList.toggle("dark-mode");
  toggleBtn.classList.toggle("show-icon");
}

document
  .getElementById("toggle-button")
  .addEventListener("click", toggleDarkMode);
