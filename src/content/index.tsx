import { MySettings } from '../types';
import { getBucket } from '@extend-chrome/storage';

const bucket = getBucket<MySettings>('settings', 'sync');

function timeStringToSeconds(targetTime: string | null | undefined) {
  // HH:MM:SS -> HH * 3600 + MM * 60 + SS
  if (!targetTime) return 0;

  const timeArray = targetTime.split(':');

  if (timeArray.length === 2) {
    timeArray.splice(0, 0, '0');
  }

  const hours = Number(timeArray[0]);
  const minutes = Number(timeArray[1]);
  const seconds = Number(timeArray[2]);
  return hours * 3600 + minutes * 60 + seconds;
}

const extractCurrentTimeSeconds = () => {
  const currentTimeElement = document.querySelector('.com-vod-VODTime span');
  const currentTime = currentTimeElement?.querySelectorAll('time')[0].textContent;
  return timeStringToSeconds(currentTime);
};

const extractTargetTimeSeconds = () => {
  const targetTimeElement = document.querySelector('.com-vod-VODTime span');
  const targetTime = targetTimeElement?.querySelectorAll('time')[1].textContent;
  return timeStringToSeconds(targetTime);
};

async function observePlaybackTime() {
  await waitLoading();
  const targetTimeSeconds = extractTargetTimeSeconds();
  const id = setInterval(observeInternal, 100);

  async function waitLoading() {
    while (!document.querySelector('.com-vod-VODTime')) {
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }

  function observeInternal() {
    const currentTimeSeconds = extractCurrentTimeSeconds();
    if (currentTimeSeconds >= targetTimeSeconds) {
      clearInterval(id);
      finishedWatching();
    }
  }
}

async function finishedWatching() {
  const linkElement = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
  const pageUrl = linkElement.href;
  const watchIdSegment = pageUrl.split('/').pop();
  const watchIdSegmentWithoutQuery = watchIdSegment?.split('?').shift();
  const watchId = watchIdSegmentWithoutQuery
    ?.split('?')[0]
    ?.slice(0, watchIdSegmentWithoutQuery.lastIndexOf('_p'));
  const numberOfEpisodes = watchIdSegmentWithoutQuery?.slice(
    watchIdSegmentWithoutQuery.lastIndexOf('_p') + 2
  );

  await fetch(`http://localhost:5000/Anime/Watched/${watchId}/${numberOfEpisodes}`, {
    method: 'POST',
  });
}

async function handleCloseReccomendButton() {
  const elem = document.querySelector(
    "button[tabindex='0'].com-vod-VODFirstProgramOfRecommendedSeriesInfo__cancel-button"
  ) as HTMLButtonElement;
  if (!elem) {
    return;
  }

  clearInterval(nextEpisodeTimer);

  const { reccomendCancel } = await bucket.get('reccomendCancel');
  if (reccomendCancel) {
    elem.click();
  }
  await finishedWatching();
}

async function handleCloseNextButtonaa() {
  const elem = document.querySelector(
    "button[tabindex='0'].com-vod-VODPlayerNextContentRecommendBase__cancel-button"
  ) as HTMLButtonElement;
  if (!elem) {
    return;
  }

  clearInterval(reccomendEpisodeTimer);

  const { nextEpisodeCancel } = await bucket.get('nextEpisodeCancel');
  if (nextEpisodeCancel) {
    elem.click();
  }
  await finishedWatching();
}

const reccomendEpisodeTimer = setInterval(handleCloseNextButtonaa, 100);
const nextEpisodeTimer = setInterval(handleCloseReccomendButton, 100);
observePlaybackTime();

export { };
