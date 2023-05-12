// Define password to access file upload
const password = "ALBERTSUCKS";

// Get HTML elements
const passwordForm = document.getElementById("password-form");
const uploadForm = document.getElementById("upload-form");
const imageGrid = document.getElementById("image-grid");
const passwordInput = document.getElementById("password");
const submitPasswordButton = document.getElementById("submit-password");
const submitUploadButton = document.getElementById("submit-upload");
const imageInput = document.getElementById("image");

// Check if password is correct
submitPasswordButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (passwordInput.value === password) {
    passwordForm.style.display = "none";
    uploadForm.style.display = "block";
    displayImages();
  } else {
    alert("Incorrect password!");
  }
});

// Save image to local storage
submitUploadButton.addEventListener("click", (e) => {
  e.preventDefault();
  const file = imageInput.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const imageData = reader.result;
    const images = JSON.parse(localStorage.getItem("images")) || [];
    images.push(imageData);
    localStorage.setItem("images", JSON.stringify(images));
    displayImages();
  };
});

// Display all saved images
function displayImages() {
  imageGrid.innerHTML = "";
  const images = JSON.parse(localStorage.getItem("images")) || [];
  for (const image of images) {
    const imgElement = document.createElement("img");
    imgElement.src = image;
    imgElement.style.maxWidth = "300px";
    imageGrid.appendChild(imgElement);
  }
}
