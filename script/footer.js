const yearEL = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEL.textContent = `Copyright © ${currentYear} by Andrii Kuz.`;
