import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const defaultDays = document.querySelector('[data-days]');
const defaultHours = document.querySelector('[data-hours]');
const defaultMinutes = document.querySelector('[data-minutes]');
const defaultSeconds = document.querySelector('[data-seconds]');

let counter;
const today = new Date();
startBtn.disabled = true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining time
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  //   return { days, hours, minutes, seconds };
  counter = { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > today) {
      //   console.log('date is correct');
      startBtn.disabled = false;
      startBtn.addEventListener('click', () => {
        startBtn.disabled = true;
        let timeDifference = selectedDates[0] - today;
        //   console.log(timeDifference);
        const timeCounter = setInterval(() => {
          convertMs(timeDifference);
          timeDifference -= 1000;
          defaultDays.textContent = addLeadingZero(counter.days);
          defaultHours.textContent = addLeadingZero(counter.hours);
          defaultMinutes.textContent = addLeadingZero(counter.minutes);
          defaultSeconds.textContent = addLeadingZero(counter.seconds);

          if (timeDifference <= 0) {
            clearInterval(timeCounter);
            // window.alert('Countdown is over');
            Notiflix.Notify.success('Countdown is over');
          }
        }, 1000);
      });
    } else {
      //   window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(inputDate, options);
