let isLogin = true;
const form = document.getElementById('auth-form');
const toggle = document.getElementById('toggle-form');
const title = document.getElementById('form-title');
const button = document.getElementById('submit-btn'); // ✅ get button

toggle.addEventListener('click', () => {
  isLogin = !isLogin;
  title.innerText = isLogin ? 'Login' : 'Register';
  button.innerText = isLogin ? 'Login' : 'Register'; // ✅ update button label
  toggle.innerHTML = isLogin
    ? `Don't have an account? <a href="#">Register here</a>`
    : `Already have an account? <a href="#">Login here</a>`;
});


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = form.username.value;
  const password = form.password.value;

  const endpoint = isLogin ? '/auth/login' : '/auth/register';

  const res = await fetch(`https://task-manager-backend-z4pm.onrender.com${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  // const res = await fetch(`http://localhost:5000${endpoint}`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ username, password })
  // });

  const data = await res.json();
  console.log('Register response:', data); // ✅ add this
  alert(data.msg || 'Something went wrong');

  if (isLogin && res.ok) {
    localStorage.setItem('token', data.token);
    window.location.href = 'dashboard.html';
  } else {
    alert(data.msg || 'Something went wrong');
  }
});
