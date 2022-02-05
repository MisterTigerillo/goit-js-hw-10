import { Notify } from 'notiflix/build/notiflix-notify-aio';

const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export function renderCountryInfo(data) {
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
        <p><b>Languages</b>: ${Object.values(card.languages)}</p>
        </li>`;
    })
    .join('');
  countryInfo.innerHTML = markup;
  countryList.innerHTML = '';
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
  countryInfo.innerHTML = '';
}
export function resetMarkup() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
