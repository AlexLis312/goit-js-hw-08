// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

console.log(galleryItems);

const galleryList = document.querySelector('.gallery');

const makeMarkup = createGalleryImages(galleryItems);
galleryList.insertAdjacentHTML('beforeend', makeMarkup);

function createGalleryImages(items) {
  return items
    .map(({ original, preview, description }) => {
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
    .join('');
}

galleryList.addEventListener('click', onImageClick);

function onImageClick(event) {
  event.preventDefault();
  const galleryImage = event.target;
  if (galleryImage.nodeName === 'IMG') {
    creareModalFromImage(galleryImage.dataset.source);
  }
}

function creareModalFromImage(image) {
  const instance = SimpleLightbox.create(
    `
    <div class="modal">
        <img src="${image}">
    </div>
`,
    {
      onShow: instance => {
        document.addEventListener('keydown', onEscKeyPress);
      },
      onClose: instance => {
        document.removeEventListener('keydown', onEscKeyPress);
      },
    }
  );

  instance.show();

  addEventListener('keydown', onEscKeyPress);
  function onEscKeyPress(event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  }
}
