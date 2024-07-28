async function fetchUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();

        const tableBody = document.getElementById('user-table-body');
        tableBody.innerHTML = ''; // Clear existing rows

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td><input type="text" value="${user.name}" id="name-${user._id}"></td>
                <td><input type="email" value="${user.email}" id="email-${user._id}"></td>
                <td><input type="text" value="${user.password}" id="password-${user._id}"></td>
                <td>
                    <select id="role-${user._id}">
                        <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>admin</option>
                        <option value="teacher" ${user.role === 'teacher' ? 'selected' : ''}>teacher</option>
                        <option value="student" ${user.role === 'student' ? 'selected' : ''}>student</option>
                    </select>
                </td>
                <td><input type="text" value="${user.classIds}" id="classIds-${user._id}"></td>
                <td>
                    <button onclick="editUser('${user._id}')">Edit</button>
                    <button onclick="deleteUser('${user._id}')">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (err) {
        console.error('Error fetching users:', err);
    }
}

async function fetchTeachers() {
    try {
        const response = await fetch('/api/users?role=teacher');
        const teachers = await response.json();

        const tableBody = document.getElementById('teacher-table-body');
        tableBody.innerHTML = ''; // Clear existing rows

        teachers.forEach(teacher => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${teacher.id}</td>
                <td>${teacher.name}</td>
                <td>${teacher.email}</td>
                <td>${teacher.password}</td>
                <td>${teacher.role}</td>
                <td>${teacher.classIds}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (err) {
        console.error('Error fetching teachers:', err);
    }
}

async function fetchStudents() {
    try {
        const response = await fetch('/api/users?role=student');
        const teachers = await response.json();

        const tableBody = document.getElementById('student-table-body');
        tableBody.innerHTML = ''; // Clear existing rows

        teachers.forEach(teacher => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${teacher.id}</td>
                <td>${teacher.name}</td>
                <td>${teacher.email}</td>
                <td>${teacher.password}</td>
                <td>${teacher.role}</td>
                <td>${teacher.classIds}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (err) {
        console.error('Error fetching teachers:', err);
    }
}

async function fetchUsersByRole(role) {
    try {
        const response = await fetch(`/api/users/${role}`);
        const users = await response.json();

        const tableBody = document.getElementById(role-user-table-body);
        tableBody.innerHTML = ''; // Clear existing rows

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.password}</td>
                <td>${user.role}</td>
                <td>${user.classIds}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (err) {
        console.error(`Error fetching ${role}s:`, err);
    }
}

// TODO: FIX, fields are all set to null
async function editUser(userId) {
    const name = document.getElementById(`name-${userId}`).value;
    const email = document.getElementById(`email-${userId}`).value;
    const password = document.getElementById(`password-${userId}`).value;
    const role = document.getElementById(`role-${userId}`).value;
    const classIds = document.getElementById(`classIds-${userId}`).value;

    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, role, classIds })
        });

        if (response.ok) {
            alert('User updated successfully!');
            fetchUsers();
        } else {
            alert('Error updating user');
            console.error('Error updating user:', await response.text());
        }
    } catch (err) {
        console.error('Error updating user:', err);
    }
}

async function deleteUser(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('User deleted successfully!');
            fetchUsers();
        } else {
            alert('Error deleting user');
            console.error('Error deleting user:', await response.text());
        }
    } catch (err) {
        console.error('Error deleting user:', err);
    }
}

window.onload = () => {
    if (document.getElementById('user-table-body')) {
        fetchUsers();
    }
    if (document.getElementById('teacher-table-body')) {
        fetchTeachers();
    }
    if (document.getElementById('student-table-body')) {
        fetchStudents();
    }
};