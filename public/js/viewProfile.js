const viewProfileHandler = async (event) => {
  event.preventDefault();

  const userData = document.querySelector("#viewProfileCard").value.trim();

  if (userData) {
    const response = await fetch("/profile/:id", {
        method: 'POST',
        body: JSON.stringify({userData}),
        headers: {
          'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        document.location.replace('/viewProfile')
    } else {
        alert(response.statusText)
    }
  }
};

document
    .querySelector()