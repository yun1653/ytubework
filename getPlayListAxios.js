const axios = require('axios');
const XLSX = require('xlsx');
const api_key = require('./realApiKey'); //실제 api key 로드

async function getPlaylistVideos(playlistId) {
  try {
    const API_KEY = api_key; //당신이 소유한 API KEY
    const playlistId = 'PLmWosSc-0BYLhhlccKKfhPrfMFOy-v9_D'; //제목추출 원하는 실제 재생목록의 playlistId

    const playlistUrl = `https://www.googleapis.com/youtube/v3/playlistItems`;

    let titles = [];
    let nextPageToken = null;

    //50개 이상의 영상을 추출하기 위해 반복문 사용
    while (true) {
      const response = await axios.get(playlistUrl, {
        params: {
          part: 'snippet',
          maxResults: 50, //1~50 사이이며 최대 50개.
          playlistId: playlistId,
          pageToken: nextPageToken, //50개 이상의 영상이 있으면 이 토큰이 있음
          key: API_KEY,
        },
      });
      nextPageToken = response.data.nextPageToken;
      const videoTitles = response.data.items.map((item) => item.snippet.title);
      titles = [...titles, ...videoTitles];

      //while 반복문을 돌다가 nextPageToken 값이 없으면 빠져나와라.
      if (!nextPageToken) {
        break;
      }
    }
    return titles;
  } catch (error) {
    console.error(error);
  }
}

//비동기 함수의 작업이 끝나면 엑셀로 보내라.
getPlaylistVideos()
  .then((titles) => {
    const data = [['Title']];
    titles.forEach((title) => data.push([[title]]));
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Titles');
    XLSX.writeFile(wb, 'titles.xlsx');
  })
  .catch((error) => console.error(error));
