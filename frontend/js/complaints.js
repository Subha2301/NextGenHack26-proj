const container = document.getElementById('complaintsContainer');
const searchInput = document.getElementById('searchInput');
const filterLinks = document.querySelectorAll('.filter-link');

const complaints = [
  {
    title: "Broken Streetlight",
    description: "Streetlight not working near park.",
    status: "PENDING",
    location: "Park Street",
    createdAt: "2026-02-26",
    image: "uploads/streetlight.jpg"
  },
  {
    title: "Garbage Overflow",
    description: "Garbage not collected for 3 days.",
    status: "RESOLVED",
    location: "Main Square",
    createdAt: "2026-02-25",
    image: "uploads/garbage.jpg"
  },
  {
    title: "Pothole on Road",
    description: "Large pothole causing traffic issues.",
    status: "IN-PROGRESS",
    location: "Highway 12",
    createdAt: "2026-02-24",
    image: ""
  }
];

function renderComplaints(list) {
  container.innerHTML = '';
  list.forEach(c => {
    const card = document.createElement('div');
    card.className = 'complaint-card';
    card.innerHTML = `
      <h3>Title: ${c.title}</h3>
      <p>Description: ${c.description}</p>
      <p>Status: <span class="status ${c.status.toLowerCase()}">${c.status}</span></p>
      <p>Location: ${c.location}</p>
      <p>Date Submitted: ${new Date(c.createdAt).toLocaleDateString()}</p>
      ${c.image ? `<img src="${c.image}" alt="Complaint Image">` : ''}
    `;
    container.appendChild(card);
  });
}

function filterComplaints() {
  let filtered = complaints;

  const activeLink = document.querySelector('.filter-link.active');
  const status = activeLink.getAttribute('data-status');
  if (status) filtered = filtered.filter(c => c.status === status);

  const searchTerm = searchInput?.value.toLowerCase() || '';
  if (searchTerm) filtered = filtered.filter(c => c.title.toLowerCase().includes(searchTerm));

  renderComplaints(filtered);
}

searchInput?.addEventListener('input', filterComplaints);

filterLinks.forEach(link => {
  link.addEventListener('click', () => {
    filterLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    filterComplaints();
  });
});

renderComplaints(complaints);

// const token = localStorage.getItem("token");

// fetch("http://localhost:5000/api/complaints/my", {
//   headers: { "Authorization": token }
// })
// .then(res => res.json())
// .then(data => {
//   const container = document.getElementById("complaintsList");

//   data.forEach(c => {
//     container.innerHTML += `
//       <div class="card">
//         <h3>${c.title}</h3>
//         <p>${c.description}</p>
//         <span class="status ${c.status.toLowerCase()}">${c.status}</span>
//       </div>
//     `;
//   });
// });