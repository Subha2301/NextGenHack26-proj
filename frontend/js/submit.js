document.getElementById("complaintForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const imageFile = document.getElementById("image").files[0];
  const location = document.getElementById("location").value;
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("location", location);
  if (imageFile){
    formData.append("image", imageFile);
  }

  fetch("", {
    method: "POST",
    headers: {
      "Authorization": token
    },
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    alert("Complaint submitted!");
    window.location.href = "myComplaints.html";
  })
  .catch(err => {
    console.error(err);
    alert("Error submitting complaint");
  });
});