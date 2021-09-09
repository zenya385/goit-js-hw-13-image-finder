import { outputRefs, loadBtn, searchFormRefs } from './const/refs';
import ApiServise from './apiService';
import itemImageTpl from '../templates/item-finder.hbs';

const newApiServise = new ApiServise();

function onSearch(event) {
  event.preventDefault();

  clearGalleryList();
  newApiServise.query = event.currentTarget.elements.query.value;
  newApiServise.resetPage();
  newApiServise.fetchGetImages().then(appendImagesMarkup);
}

function appendImagesMarkup(hits) {
  return outputRefs.insertAdjacentHTML('beforeend', itemImageTpl(hits));
}

const onLoadMore = () => {
  setTimeout(() => {
    const element = document.querySelector('.js-search');
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, 650);

  newApiServise
    .fetchGetImages()
    .then(appendImagesMarkup)
    .catch(err => console.log(err));
};

const clearGalleryList = function () {
  outputRefs.innerHTML = '';
};

searchFormRefs.addEventListener('submit', onSearch);
loadBtn.addEventListener('click', onLoadMore);
