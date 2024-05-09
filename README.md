# PetPals Project

![img](be/static/images/main_homepage.png)

# 가동 방법

본 홈페이지를 가동하는 데에는 터미널 두 개가 필요합니다.
먼저 프로젝트를 git clone 합니다.

```
git clone
pip install -r requirements.txt
```

### Backend

```
ce be
python manage.py runserver
```

### Frontend

```
ce fe
npm init
npm i

만약 오류가 발생할 경우
npm install --force redux-devtools-extension

이후 추가 설치
npm i --force @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic
npm install --force @mui/material @emotion/react @emotion/styled @mui/material @mui/styled-engine-sc styled-components  @fontsource/roboto  @material-ui/core @mui/icons-material @mui/x-charts
npm install react-icons

만약 설치 중 오류 발생 시
npm i --force react-icons
```

1. 터미널 하나를 켜고 cd be를 입력해 be 디렉토리로 들어간다.
2. 해당 디렉토리(manage.py가 있는)에서 python manage.py runserver를 통해 백엔드 서버를 올린다.
3. 터미널 하나를 추가로 열고 cd fe를 이용해 fe 디렉토리로 들어간다.
4. 해당 디렉토리에서 하단의 npm init ~ 과정을 통해 다른 부분들을 설치한 뒤, npm start를 누른다.

# lion_5team_project

fe 사용법
git clone -> cd fe -> npm init -> npm i -> npm start

안되면
npm install --force redux-devtools-extension ->npm start

# fe pull 이후 사용법

cd fe ->  밑에꺼 복붙 -> npm start

### npm i --force @ckeditor/ckeditor5-react @ckeditor/ckeditor5-build-classic

navbar드롭다운 전부 ckeditor

# 세번째 설치

npm install --force @mui/material @emotion/react @emotion/styled @mui/material @mui/styled-engine-sc styled-components  @fontsource/roboto  @material-ui/core @mui/icons-material @mui/x-charts

npm install react-icons 시도해서 오류 발생할 경우 npm i --force react-icons
