const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imageLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = "";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images where loaded
function imageLoaded(){
  imageLoaded++;
  if(imageLoaded === totalImages){
    ready = true;
    loader.hidden = true;
  }
  count = 30;
}

// Helper Function to set Attributes on DOM
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for adding Photos to DOM

function displayPhotos() {
  imageLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    //Create <a></a> to link to Unsplash
    const item = document.createElement("a");
    // item.setAttribute("href", photo.links.html);
    // item.setAttribute("target", "_blank");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    //Create <img> for photo
    const img = document.createElement("img");
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    setAttributes(item, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    //Event Listener - When images finish loading
    img.addEventListener("load",imageLoaded);

    //Put <img> inside <a></a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = response.json();
  } catch (error) {
    //Catch Error Here
  }
}

// Check to see if scrolling near bottom of page
window.addEventListener("scroll",() => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000
    && ready){
      ready = false;
    getPhotos();
  }
});
  // On Load
  .getPhotos();
