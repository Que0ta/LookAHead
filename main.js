const form = document.querySelector(".contact-form");
form.style.display = "none";

const trainers = [
  {
    name: "Ім'я",
    role: "Роль",
    bio: "Опис члена команди",
    photo:
      "https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png",
    bg: "#b8d4f0",
    socials: { telegram: "#", wca: "#" },
  },
  {
    name: "Ім'я",
    role: "Роль",
    bio: "Опис члена команди",
    photo:
      "https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png",
    bg: "#f0c4b8",
    socials: { telegram: "#", wca: "#" },
  },
  {
    name: "Ім'я",
    role: "Роль",
    bio: "Опис члена команди",
    photo:
      "https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png",
    bg: "#f0e0b0",
    socials: { telegram: "#", wca: "#" },
  },
  {
    name: "Ім'я",
    role: "Роль",
    bio: "Опис члена команди",
    photo:
      "https://static.vecteezy.com/system/resources/thumbnails/048/216/761/small/modern-male-avatar-with-black-hair-and-hoodie-illustration-free-png.png",
    bg: "#d8b8f0",
    socials: { telegram: "#", wca: "#" },
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

const cards = trainers.map(cardTemplate).join("");

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
