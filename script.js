document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const message = this.querySelector('textarea').value;

  const text = `📸 Новая заявка с сайта:\n\n👤 Имя: ${name}\n✉️ Email: ${email}\n💬 Сообщение: ${message}`;

  const TOKEN = '7667420836:AAETXgwHqVNz32upAx-4iOHhLJ-C4NSEYPU';
  const CHAT_ID = '7667420836';
  const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text,
    }),
  })
  .then(() => {
    document.getElementById('formMessage').textContent = 'Заявка отправлена!';
    this.reset();
  })
  .catch(() => {
    document.getElementById('formMessage').textContent = 'Ошибка при отправке';
  });
});
