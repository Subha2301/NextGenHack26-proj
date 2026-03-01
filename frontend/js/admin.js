const container = document.getElementById("adminComplaints");
const searchInput = document.getElementById("searchInput");
const filterLinks = document.querySelectorAll(".filter-link");

const complaints = [
  {
    id: 1,
    title: "Broken Streetlight",
    description: "Streetlight not working near park.",
    status: "PENDING",
    location: "Park Street",
    createdAt: "2026-02-26",
    image: "uploads/streetlight.jpg",
    user: "John Doe",
  },
  {
    id: 2,
    title: "Garbage Overflow",
    description: "Garbage not collected for 3 days.",
    status: "RESOLVED",
    location: "Main Square",
    createdAt: "2026-02-25",
    image: "uploads/garbage.jpg",
    user: "Jane Smith",
  },
  {
    id: 3,
    title: "Pothole on Road",
    description: "Large pothole causing traffic issues.",
    status: "IN-PROGRESS",
    location: "Highway 12",
    createdAt: "2026-02-24",
    image: "",
    user: "Alice Brown",
  },
];

function renderComplaints(filtered) {
  container.innerHTML = "";
  filtered.forEach((c) => {
    const card = document.createElement("div");
    card.className = "complaint-card";
    card.innerHTML = `
      <h3>${c.title}</h3>
      <p>User: ${c.user}</p>
      <p>Description: ${c.description}</p>
      <p>Location: ${c.location}</p>
      <p>Date Submitted: ${new Date(c.createdAt).toLocaleDateString()}</p>
      <p>Status: 
        <select class="status-select" data-id="${c.id}">
          <option value="PENDING" ${c.status === "PENDING" ? "selected" : ""}>PENDING</option>
          <option value="IN-PROGRESS" ${c.status === "IN-PROGRESS" ? "selected" : ""}>IN-PROGRESS</option>
          <option value="RESOLVED" ${c.status === "RESOLVED" ? "selected" : ""}>RESOLVED</option>
        </select>
      </p>
      ${c.image ? `<img src="${c.image}" alt="Complaint Image">` : ""}
    `;
    container.appendChild(card);
  });

  document.querySelectorAll(".status-select").forEach((select) => {
    select.addEventListener("change", (e) => {
      const id = e.target.getAttribute("data-id");
      const newStatus = e.target.value;
      // Here you would call backend API to update status
      console.log(`Update complaint ${id} to status ${newStatus}`);
      // Update locally for demo
      const complaint = complaints.find((c) => c.id == id);
      if (complaint) complaint.status = newStatus;
      filterComplaints();
    });
  });
}

function filterComplaints() {
  let filtered = complaints;

  const activeLink = document.querySelector(".filter-link.active");
  const status = activeLink.getAttribute("data-status");
  if (status) filtered = filtered.filter((c) => c.status === status);

  const searchTerm = searchInput?.value.toLowerCase() || "";
  if (searchTerm)
    filtered = filtered.filter((c) =>
      c.title.toLowerCase().includes(searchTerm),
    );
  renderComplaints(filtered);
}

searchInput?.addEventListener("input", filterComplaints);

filterLinks.forEach((link) => {
  link.addEventListener("click", () => {
    filterLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    filterComplaints();
  });
});

renderComplaints(complaints);

// const token = localStorage.getItem("token");

// fetch("http://localhost:5000/api/complaints", {
//   headers: { "Authorization": token }
// })
// .then(res => res.json())
// .then(data => {
//   const container = document.getElementById("adminComplaints");

//   data.forEach(c => {
//     container.innerHTML += `
//       <div class="card">
//         <h3>${c.title}</h3>
//         <p>${c.description}</p>
//         <p>User: ${c.user.name}</p>
//         <select onchange="updateStatus('${c._id}', this.value)">
//           <option value="PENDING">PENDING</option>
//           <option value="IN-PROGRESS">IN-PROGRESS</option>
//           <option value="RESOLVED">RESOLVED</option>
//         </select>
//       </div>
//     `;
//   });
// });

// function updateStatus(id, status) {
//   fetch("http://localhost:5000/api/complaints/" + id, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": token
//     },
//     body: JSON.stringify({ status })
//   })
//   .then(res => res.json())
//   .then(data => {
//     alert("Status updated");
//     location.reload();
//   });
// }
