import { fetchCountries } from './js/fetchCountries';
import { renderCountryInfo, resetMarkup } from './js/markup';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputField = document.querySelector('#search-box');

inputField.focus();
inputField.addEventListener('input', debounce(onInputType, DEBOUNCE_DELAY));

function onInputType(e) {
  const countryName = e.target.value.trim();
  console.log(countryName);

  if (countryName === '') {
    resetMarkup();
    return;
  }
  fetchCountries(countryName).then(renderCountryInfo).catch(errorCase);
}

function errorCase() {
  Notify.failure('Oops, there is no country with that name');
}
