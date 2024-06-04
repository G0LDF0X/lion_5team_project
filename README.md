# PetPals Project

![img](be/static/images/main_homepage.png)

# 가동 방법

본 홈페이지를 가동하는 데에는 터미널 두 개가 필요합니다.
먼저 프로젝트를 git clone 합니다.

python 환경 = 3.10.14

```
git clone
pip install -r requirements.txt
pip install pandas langchain sentence-transformers chromadb python-dotenv psycopg2
pip install -U langchain-community
```
### Backend

```
cd be
python manage.py runserver
```
### Chatbot
```
cd be
uvicorn chatbot.main:app --reload --port 8001
```
### Search1
매일 자동완성 데이터 업데이트 되로록 설정(db 업데이트 되면 기능 향상 가능)
```
cd be
uvicorn fastapi_app.main:app --reload --port 8002
```
### search2 (보류(프론트에서 처리중))


### Frontend

```
cd nfe
npm i
npm run dev




### 결제모듈
npm i @portone/browser-sdk

import * as PortOne from "@portone/browser-sdk/v2"; (반영완료)