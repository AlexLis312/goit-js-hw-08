import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const videoIframe = document.querySelector('#vimeo-player');
const player = new Vimeo(videoIframe);

const savedPlaybackTime = localStorage.getItem('videoplayer-current-time');

const updatePlaybackTime = function (event) {
  localStorage.setItem('videoplayer-current-time', event.seconds);
};

player.on('timeupdate', throttle(updatePlaybackTime, 1000));

if (savedPlaybackTime) {
  player.setCurrentTime(savedPlaybackTime);
}
