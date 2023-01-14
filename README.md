# 유튜브 작업 공간

## 유튜브 재생목록 안의 영상 제목을 엑셀파일로 만들기

youtube Data API Key를 이용하여 작업함  
<u>보안을 위해 실제 api key 값은 realApiKey.js 파일 안</u>에 넣어 두었으며 다른 파일에서 임포트 시켜서 사용함.

### getPlayListAxios.js

- axios, xlsx 라이브러리 사용했음
- 50개 이상 영상을 추가로 가져오기 위해 while 반복문 사용
- 50개 이상 영상을 위해 nextPageToken 사용
