import { galleryItems } from './gallery-items.js';
// Change code below this line
const list = document.querySelector('.gallery');

list.insertAdjacentHTML('beforeend', createGallery(galleryItems));
list.addEventListener('click', handleClick);

function handleClick(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }

  const currentGalerry = event.target.closest('.gallery__image');
  const currentGalerryId = currentGalerry.dataset.source;
  const galleryItem = galleryItems.find(
    ({ original }) => original === currentGalerryId
  );

  const instance = basicLightbox.create(
    `<div class="modal">
  <img src=${galleryItem.original} alt=${galleryItem.description}/></div>`,
    {
      onShow: instance => {
        document.addEventListener('keydown', closeModal);
      },
      onClose: instance => {
        document.removeEventListener('keydown', closeModal);
      },
    }
  );
  instance.show();

  // console.log(galleryItem);
  document.querySelector('.modal').addEventListener('click', () => {
    instance.close();
  });
  document.addEventListener('keydown', closeModal);
  function closeModal(event) {
    if (event.key === 'Escape' && instance.visible()) {
      instance.close();
    }
  }
}

function createGallery(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `
  <li class="gallery__item">
  <a class="gallery__link" href=${original}>
    <img
      class="gallery__image"
      src=${preview}
      data-source=${original}
      alt=${description}
    />
  </a>
</li>
`
    )
    .join('');
}
