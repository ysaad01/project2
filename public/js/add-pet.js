async function newFormHandler(event) {
  event.preventDefault();

  const dog_name = document.querySelector('input[name="dog-name"]').value;
  const gender = document.querySelector('textarea[name="gender-text"]').value;
  const bio = document.querySelector('textarea[name="bio-text"]').value;

  const response = await fetch(`/api/pets`, {
    method: "POST",
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
  .querySelector(".new-pet-form")
  .addEventListener("submit", newFormHandler);
