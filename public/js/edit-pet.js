async function editFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const dog_name = document.querySelector('input[name="dog-name"]').value;
  const gender = document.querySelector('textarea[name="gender-text"]').value;
  const bio = document.querySelector('textarea[name="bio-text"]').value;

  const response = await fetch(`/api/pets/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      dog_name,
      gender,
      bio,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".edit-pet-form")
  .addEventListener("submit", editFormHandler);
