let usuarios = [];
let currentPage = 1;
let itemsPerPage = 10;

fetch('https://dummyjson.com/users') 
  .then(res => res.json())
  .then(data => {
    usuarios = data.users;
    renderUsers();
  })
  .catch(err => {
    console.error("Error al obtener usuarios:", err);
    alert("No se pudieron cargar los usuarios.");
  });

function renderUsers() {
  const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const filteredUsers = usuarios.filter(user =>
    user.username.toLowerCase().includes(searchTerm) ||
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const usersToShow = filteredUsers.slice(start, start + itemsPerPage);

  const tbody = document.getElementById('tabla-usuarios');
  tbody.innerHTML = '';

  if (usersToShow.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5">No se encontraron usuarios.</td></tr>';
    return;
  }

  usersToShow.forEach(user => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${user.id}</td>
      <td>${user.username}</td>
      <td>${user.firstName} ${user.lastName}</td>
      <td>${user.email}</td>
      <td>
        <button class="btn btn-sm btn-info btn-ver-mas" 
                data-id="${user.id}" 
                data-bs-toggle="modal" 
                data-bs-target="#userDetailsModal">
          Ver más
        </button>
      </td>
    `;
    tbody.appendChild(fila);
  });

  renderPagination(totalPages);
}

function showUserDetails(id) {
  const user = usuarios.find(u => u.id === id);
  if (!user) return;

  document.getElementById('modal-id').textContent = user.id;
  document.getElementById('modal-username').textContent = user.username;
  document.getElementById('modal-fullname').textContent = `${user.firstName} ${user.lastName}`;
  document.getElementById('modal-email').textContent = user.email;
  document.getElementById('modal-gender').textContent = user.gender || 'N/A';
  document.getElementById('modal-city').textContent = user.address?.city || 'N/A';
  document.getElementById('modal-phone').textContent = user.phone || 'N/A';
  document.getElementById('modal-birthdate').textContent = user.birthDate || 'N/A';
  document.getElementById('modal-bloodgroup').textContent = user.bloodGroup || 'N/A';
}

document.getElementById('searchInput')?.addEventListener('input', () => {
  currentPage = 1;
  renderUsers();
});

document.getElementById('itemsPerPage')?.addEventListener('change', function () {
  itemsPerPage = parseInt(this.value);
  currentPage = 1;
  renderUsers();
});


function renderPagination(totalPages) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = "page-item";
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      renderUsers();
    });
    if (i === currentPage) li.classList.add("active");
    pagination.appendChild(li);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("btn-ver-mas")) {
      const userId = parseInt(e.target.getAttribute("data-id"));
      showUserDetails(userId);
    }
  });
});