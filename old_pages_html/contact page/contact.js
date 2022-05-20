const button = document.getElementById('mySubmit');
const notifs = document.getElementById('notifications');

const message = 'Thanks for reaching out! Your message has been sent and someone will get back to you soon!';

button.addEventListener('click', () => createNotification());

function createNotification(){
  const notif = document.createElement('div');
  notif.classList.add('notif');
  notif.innerText = message;
  notifs.appendChild(notif);

  setTimeout(() => {
  notif.remove();
  }, 3000);
}
