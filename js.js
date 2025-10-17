const burgerBtn = document.getElementById('burgerBtn');
const burgerMenu = document.getElementById('burgerMenu');
const menuLinks = document.querySelectorAll('.burger-menu__list a');
const htmlElement = document.querySelector("html")

// Функция для открытия/закрытия меню
function toggleBurgerMenu() {

  burgerMenu.classList.toggle('active');
  burgerBtn.classList.toggle('active');

  // Блокируем прокрутку body при открытом меню
  htmlElement.classList.toggle('unscroll')
}

// Функция для плавной прокрутки
function smoothScrollToSection(targetId) {
  const targetSection = document.querySelector(targetId);
  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Функция для закрытия меню
function closeBurgerMenu() {
  burgerMenu.classList.remove('active');
  burgerBtn.classList.remove('active');
  htmlElement.classList.remove('unscroll');
}

// Вешаем обработчики
burgerBtn.addEventListener('click', toggleBurgerMenu);

// Обработчики для ссылок меню
menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');

    // Закрываем меню
    closeBurgerMenu();

    // Плавная прокрутка после закрытия меню
    setTimeout(() => {
      smoothScrollToSection(targetId);
    }, 400);
  });
});

// Закрытие меню при клике вне его области
document.addEventListener('click', (e) => {
  if (!burgerMenu.contains(e.target) && !burgerBtn.contains(e.target) && burgerMenu.classList.contains('active')) {
    closeBurgerMenu();
  }
});

// Закрытие меню при нажатии Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && burgerMenu.classList.contains('active')) {
    closeBurgerMenu();
  }
});

// Закрытие меню при ресайзе окна (если перешли на десктоп)
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && burgerMenu.classList.contains('active')) {
    closeBurgerMenu();
  }
});