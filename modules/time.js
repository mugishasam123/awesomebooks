import { DateTime } from '../node_modules/luxon/build/es6/luxon.js';

export default class Time {
  show = () => {
    const date = document.querySelector('#date');
    const time = DateTime.now();

    date.innerHTML = time.toLocaleString(DateTime.DATETIME_FULL_WITH_SECONDS).replace('PST', '');
  };
}
