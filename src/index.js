import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const inputField = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputField.focus();
inputField.addEventListener('input', debounce(onInputType, 300));

function onInputType(e) {
  const countryName = e.target.value.trim();
  console.log(countryName);

  fetchCountries(countryName).then(renderCountryInfo).catch(errorCase);
}

function fetchCountries(name) {
  console.log('HTTP');
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`,
  ).then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
    //   console.log(response);
  });
}
function errorCase() {
  Notify.failure('Oops, there is no country with that name');
}

function renderCountryInfo(data) {
  const singleCard = 1;
  const limitCard = 10;
  if (data.length === singleCard) {
    oneCardMarkup(data);
    return;
  } else if (data.length > singleCard && data.length <= limitCard) {
    multiCardMarkup(data);
    return;
  }
  Notify.info('Too many matches found. Please enter a more specific name.');
  //   console.log(data.length);
}
function oneCardMarkup(card) {
  const markup = card
    .map(card => {
      return `<li class='country-info__item'>
      <div class='country-info__thumb'>
        <img class='country-info__flag' src="${card.flags.svg}" alt="country flag">
        <p class=country-info__name><b>${card.name.official}</b></p>

      </div>
        <p><b>Capital</b>: ${card.capital}</p>
        <p><b>Population</b>: ${card.population}</p>
        <p><b>Languages</b>: ${Object.values(card.languages)[0]}</p>
        </li>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
}
function multiCardMarkup(cards) {
  const markup = cards
    .map(card => {
      return `<li class='country-list__item'>
        <img class='country-list__flag' src="${card.flags.svg}" alt="country flag">
        <p><b>${card.name.official}</b></p>
        </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}
