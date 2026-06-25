const form = document.querySelector(".contact-form");
// form.style.display = "none";

const trainers = [
  {
    name: "Ждаміров Артем",
    role: "Досвід 7+ років",
    bio: "Швидкубер, який займає 3 місце в Україні зі складання 3х3 однією рукою та знає як досягнути найкращий результат. ",
    photo:
      "https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png",
    bg: "#f0c4b8",
    socials: { wca: "https://www.worldcubeassociation.org/persons/2022ZHDA01" },
  },
  {
    name: "Мухін Олексій",
    role: "Досвід 6+ років",
    bio: "Швидкубер універсал, який навчить стабільних технік для складання різних видів головоломок.",
    photo:
      "https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png",
    bg: "#b8d4f0",
    socials: { wca: "https://www.worldcubeassociation.org/persons/2021MUKH02" },
  },
  {
    name: "Христин Богдан",
    role: "Досвід 4+ років",
    bio: "Швидкубер який навчить послідовно опанувати найважливіші техніки складання.",
    photo:
      "https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png",
    bg: "#f0e0b0",
    socials: { wca: "https://www.worldcubeassociation.org/" },
  },
  {
    name: "Лемега Назарій",
    role: "Досвід 3+ років",
    bio: "Амбіційний швидкубер, який навчить впевнено рухатись до бажаного результату зі старту.",
    photo:
      "https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png",
    bg: "#d8b8f0",
    socials: { wca: "https://www.worldcubeassociation.org/persons/2023LEME01" },
  },
];

const icons = {
  telegram: `<img height="24" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/960px-Telegram_2019_Logo.svg.png"/>`,
  wca: `<img height="24" src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_Cube_Association_Logo.png"/>`,
};

function cardTemplate({ name, role, bio, photo, bg, socials }) {
  const socialLinks = Object.entries(socials)
    .map(
      ([platform, url]) =>
        `<a href="${url}" aria-label="${platform}">${icons[platform]}</a>`
    )
    .join("");

  return `
    <div class="team-card">
      <div class="team-card__photo" style="--bg: ${bg}">
        <img src="${photo}" alt="${name}" />
      </div>
      <div class="team-card__body">
        <h3 class="team-card__name">${name}</h3>
        <span class="team-card__role">${role}</span>
        <p class="team-card__bio">${bio}</p>
        <div class="team-card__socials">${socialLinks}</div>
      </div>
    </div>
  `;
}

function animatePopup(event){
  const toast = document.querySelector("#toast");

  toast.classList.add("show");

  setTimeout(() => {
      toast.classList.remove("show");
  }, 3200);
  event.target.reset();
}

const cards = trainers.map(cardTemplate).join("");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#floatingInput").value;
  const contact = document.querySelector("#floatingNumber").value;
  const level = document.querySelector("#level-select").value;

  try {
    const message = `
      👤 Ім'я: ${name}
      📞 Контакт: ${contact}
      📊 Рівень: ${level}
    `.trim();

    const res = await fetch(
      "https://reportsapi-a7tx.onrender.com/ahead/sendMessage",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      }
    );

    const data = await res.json();
    animatePopup(e);
    return;
  } catch (err) {
    animatePopup(e);
    console.error(err);
  }
});

document.getElementById("teamGrid").innerHTML = cards;
document.getElementById("teamSwiper").innerHTML = trainers
  .map((t) => `<div class="swiper-slide">${cardTemplate(t)}</div>`)
  .join("");

new Swiper(".team-swiper", {
  slidesPerView: "auto",
  spaceBetween: 16,
  centeredSlides: true,
  grabCursor: true,
  pagination: {
    el: ".team-swiper-pagination",
    clickable: true,
  },
});
