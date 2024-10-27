import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </li>`;
    })
    .join("");
}

const galleryMarkup = createGalleryMarkup(galleryItems);
galleryContainer.innerHTML = galleryMarkup;

console.log(galleryItems);

galleryContainer.addEventListener("click", onGalleryClick);

function onGalleryClick(e) {
  e.preventDefault();
  const isImage = e.target.classList.contains("gallery__image");
  if (!isImage) return;

  const imageSource = e.target.dataset.source;
  console.log("Url-ul imaginii mari:", imageSource);

  const instance = basicLightbox.create(
    `<img src="${imageSource}"> width="800" height="600"`,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", onEscapePress);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", onEscapePress);
      },
    }
  );

  function onEscapePress(e) {
    if (e.key === "Escape") {
      instance.close();
    }
  }

  instance.show();
}
