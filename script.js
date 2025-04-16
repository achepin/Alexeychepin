console.log("Скрипт загружен!");

// Инициализация модального окна
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.getElementById('modalClose');
const gallery = document.querySelector('.gallery');
const spinner = document.getElementById('submitSpinner');

// Обработка галереи
gallery.addEventListener('click', (e) => {
  if (e.target.tagName === 'IMG') {
    modal.style.display = 'block';
    modalImg.src = e.target.src;
    document.body.style.overflow = 'hidden';
    // Находим индекс текущего изображения
    currentImageIndex = Array.from(galleryImages).indexOf(e.target);
  }
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = '';
});

// Закрытие по клику вне изображения
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }
});

// Анимация появления секций
const sections = document.querySelectorAll('section');
sections.forEach(section => section.classList.add('fade-in'));

const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

// Улучшенная навигация по галерее
let currentImageIndex = 0;
const galleryImages = document.querySelectorAll('.gallery img');

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  modalImg.src = galleryImages[currentImageIndex].src;
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  modalImg.src = galleryImages[currentImageIndex].src;
}

document.addEventListener('keydown', (e) => {
  if (modal.style.display === 'block') {
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
    if (e.key === 'Escape') {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  }
});

// Добавляем обработчики для кнопок навигации
const prevButton = document.getElementById('prevImage');
const nextButton = document.getElementById('nextImage');

prevButton.addEventListener('click', showPrevImage);
nextButton.addEventListener('click', showNextImage);

// Обработка формы
const form = document.getElementById('contactForm');
const checkbox = document.getElementById('consentCheckbox');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');
const nameInput = form.querySelector('input[name="name"]');
const phoneInput = form.querySelector('input[name="phone"]');

function validateForm() {
  const isNameValid = nameInput.value.trim() !== '';
  const isPhoneValid = phoneInput.value.trim() !== '';
  const isCheckboxChecked = checkbox.checked;
  
  submitBtn.disabled = !(isNameValid && isPhoneValid && isCheckboxChecked);
}

// Добавляем слушатели для всех полей
[nameInput, phoneInput, checkbox].forEach(element => {
  element.addEventListener('input', validateForm);
  element.addEventListener('change', validateForm);
});

// Инициализируем состояние кнопки
validateForm();

// Валидация телефона
phoneInput.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length > 0) {
    value = '+7' + value.substring(1);
    value = value.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5');
  }
  e.target.value = value;
});

form.addEventListener('submit', async function (e) {
  e.preventDefault();
  
  const name = this.querySelector('input[name="name"]').value;
  const phone = this.querySelector('input[name="phone"]').value;

  submitBtn.disabled = true;
  spinner.style.display = 'inline-block';
  formMessage.textContent = '';

  const text = `📸 Новая заявка с сайта:\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}`;
  const TOKEN = '7667420836:AAETXgwHqVNz32upAx-4iOHhLJ-C4NSEYPU';
  const CHAT_ID = '199899972';
  const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
      }),
    });

    if (!response.ok) throw new Error("Ошибка HTTP: " + response.status);
    
    formMessage.textContent = 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.';
    formMessage.style.color = 'green';
    this.reset();
  } catch (error) {
    console.error("Ошибка при отправке:", error);
    formMessage.textContent = 'Произошла ошибка при отправке. Пожалуйста, попробуйте позже.';
    formMessage.style.color = 'red';
  } finally {
    submitBtn.disabled = false;
    spinner.style.display = 'none';
    checkbox.checked = false;
  }
});
