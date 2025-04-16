console.log("Скрипт загружен!");

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const message = this.querySelector('textarea').value;

  const text = `📸 Новая заявка с сайта:\n\n👤 Имя: ${name}\n✉️ Email: ${email}\n💬 Сообщение: ${message}`;

  const TOKEN = '7667420836:AAETXgwHqVNz32upAx-4iOHhLJ-C4NSEYPU';
  const CHAT_ID = '199899972';
  const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  console.log("Отправка в Telegram:", text);

  fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text,
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Ошибка HTTP: " + response.status);
    }
    console.log("Успешно отправлено в Telegram");
    document.getElementById('formMessage').textContent = 'Заявка отправлена!';
    this.reset();
  })
  .catch(error => {
    console.error("Ошибка при отправке:", error);
    document.getElementById('formMessage').textContent = 'Ошибка при отправке';
  });
});
