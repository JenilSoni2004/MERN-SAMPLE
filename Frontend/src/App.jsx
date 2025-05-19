import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: ""
  });
  const [editingUserId, setEditingUserId] = useState(null);


  const fetchUsers = () => {
    axios
      .get("/user/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users:", err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);





  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (editingUserId) {
    
    axios
      .patch(`/user/${editingUserId}`, form)
      .then((res) => {
        alert("User updated successfully");
        setEditingUserId(null);
        setForm({ firstName: "", lastName: "", email: "", jobTitle: "" });
        fetchUsers();
      })
      .catch((err) => {
        console.error("Error updating user:", err);
        alert("Failed to update user");
      });
  } else {
    
    axios
      .post("/user/", form)
      .then((res) => {
        alert("User added successfully");
        setForm({ firstName: "", lastName: "", email: "", jobTitle: "" });
        fetchUsers();
      })
      .catch((err) => {
        console.error("Error adding user:", err);
        alert("Failed to add user");
      });
  }
};




  const handleDelete = (id) => {
  if (confirm("Are you sure you want to delete this user?")) {
    axios
      .delete(`/user/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));
      })
      .catch((err) => {
        console.error("Failed to delete user:", err);
      });
  }
};


  return (
    <div>
      <h1>User Management</h1>

      <form onSubmit={handleSubmit}className="user-form">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={form.jobTitle}
          onChange={handleChange}
        />
        <button type="submit">Add User</button>
      </form>

      <br />

      {users.length > 0 ? (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Job Title</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.jobTitle}</td>
                <td>
        <button onClick={() => handleDelete(user._id)}>Delete</button>
      </td><td>
        <button onClick={() => {
  setEditingUserId(user._id);
  setForm({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    jobTitle: user.jobTitle,
  });
}}>
  Edit
</button>

      </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default App;
