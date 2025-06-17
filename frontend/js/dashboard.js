document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
});

const statuses = ['todo', 'in_progress', 'done'];

function renderTask(task) {
  const taskEl = document.createElement('div');
  taskEl.className = `task ${task.priority}`;
  taskEl.dataset.id = task._id;
  taskEl.innerHTML = `
    <h4>${task.title}</h4>
    <p>${task.description}</p>
    <small>Due: ${new Date(task.due_date).toLocaleDateString()}</small><br/>

    <label>Status:</label>
    <select class="status-dropdown">
      <option value="todo" ${task.status === 'todo' ? 'selected' : ''}>To Do</option>
      <option value="in_progress" ${task.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
      <option value="done" ${task.status === 'done' ? 'selected' : ''}>Done</option>
    </select>

    <button class="delete-btn">🗑️ Delete</button>
    <button class="comment-btn">💬 Comments</button>
    <button class="activity-btn">📜 Activity</button>

  `;
  return taskEl;
}




function renderAllTasks(tasks) {
  statuses.forEach(status => {
    document.getElementById(`${status}-tasks`).innerHTML = '';
  });

  tasks.forEach(task => {
    const el = renderTask(task);
    document.getElementById(`${task.status}-tasks`).appendChild(el);
  });

  attachStatusDropdowns();
  attachDeleteHandlers();
  attachCommentButtons(); // ✅ ADD THIS HERE
  attachActivityButtons();
}



function attachStatusDropdowns() {
  const dropdowns = document.querySelectorAll('.status-dropdown');

  dropdowns.forEach(drop => {
    drop.addEventListener('change', async (e) => {
      const taskId = drop.parentElement.dataset.id;
      const newStatus = drop.value;
      await api(`/tasks/${taskId}`, 'PUT', { status: newStatus });
      loadTasks(); // Refresh the view
    });
  });
}

function attachDeleteHandlers() {
  const deleteButtons = document.querySelectorAll('.delete-btn');

  deleteButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const taskId = btn.parentElement.dataset.id;
      const confirmed = confirm('Are you sure you want to delete this task?');
      if (!confirmed) return;

      await api(`/tasks/${taskId}`, 'DELETE');
      loadTasks(); // Refresh view
    });
  });
}

function attachCommentButtons() {
  const commentButtons = document.querySelectorAll('.comment-btn');
  commentButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const taskId = btn.parentElement.dataset.id;
      document.getElementById('comment-modal').classList.remove('hidden');
      document.getElementById('submit-comment').dataset.taskId = taskId;
      loadComments(taskId);
    });
  });
}

function attachActivityButtons() {
  const activityButtons = document.querySelectorAll('.activity-btn');

  activityButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const taskId = btn.parentElement.dataset.id;
      const logs = await api(`/tasks/${taskId}/activity`);
      const list = document.getElementById('activity-list');
      list.innerHTML = '';
      logs.forEach(log => {
        const el = document.createElement('div');
        const time = new Date(log.createdAt).toLocaleString();
        el.textContent = `🔁 ${log.action} by ${log.user_id.username} at ${time}`;
        list.appendChild(el);
      });
      document.getElementById('activity-modal').classList.remove('hidden');
    });
  });
}

document.getElementById('close-activity').addEventListener('click', () => {
  document.getElementById('activity-modal').classList.add('hidden');
});


async function loadComments(taskId) {
  const res = await api(`/tasks/${taskId}/comments`);
  const list = document.getElementById('comment-list');
  list.innerHTML = '';
  res.forEach(c => {
    const el = document.createElement('div');
    el.textContent = `${c.user_id.username}: ${c.text}`;
    list.appendChild(el);
  });
}



async function loadTasks() {
  const tasks = await api('/tasks');
  renderAllTasks(tasks);
}

document.getElementById('task-form').addEventListener('submit', async e => {
  e.preventDefault();
  const task = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    priority: document.getElementById('priority').value,
    due_date: document.getElementById('due_date').value,
    status: 'todo'
  };

  await api('/tasks', 'POST', task);
  loadTasks();
});



loadTasks();


document.getElementById('submit-comment').addEventListener('click', async () => {
  const taskId = document.getElementById('submit-comment').dataset.taskId;
  const text = document.getElementById('new-comment').value;
  if (!text.trim()) return;

  await api(`/tasks/${taskId}/comments`, 'POST', { text });
  document.getElementById('new-comment').value = '';
  loadComments(taskId);
});

document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('comment-modal').classList.add('hidden');
});
