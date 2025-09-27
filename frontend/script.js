const apiURL = "http://localhost:5001/users"; // Backend URL
const userTableBody = document.querySelector("#userTable tbody");
const userForm = document.getElementById("userForm");

// GET all users
function fetchUsers() {
  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      userTableBody.innerHTML = ""; // Clear table
      data.forEach(user => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.age}</td>
          <td><button onclick="deleteUser(${user.id})">Delete</button></td>
        `;
        userTableBody.appendChild(row);
      });
    });
}

// POST new user
userForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;

  fetch(apiURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, age })
  })
  .then(() => {
    userForm.reset();
    fetchUsers();
  });
});

// DELETE user
function deleteUser(id) {
  fetch(`${apiURL}/${id}`, { method: "DELETE" })
    .then(() => fetchUsers());
}

// Initial fetch
fetchUsers();
