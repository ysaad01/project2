async function newFormHandler(event) {
  event.preventDefault();

  const dog_name = document.querySelector('input[name="post-title"]').value;
  const gender = document.querySelector('textarea[name="post-text"]').value;
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
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
