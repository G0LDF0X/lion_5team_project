# PetPals Project

![img](be/static/images/main_homepage.png)

# 가동 방법

본 홈페이지를 가동하는 데에는 터미널 두 개가 필요합니다.
먼저 프로젝트를 git clone 합니다.

python 환경 = 3.10.14


현재 nfe 챗봇기능만 구현중 

```
git clone
pip install -r requirements.txt
```

### Backend

```
cd be
python manage.py runserver
```
### Chatbot
```
cd be
uvicorn chatbot.main:app --reload   
```
### Frontend

```
cd nfe
npm i
npm run dev
