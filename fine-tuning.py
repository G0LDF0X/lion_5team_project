instruction =  """
SYSTEM:
You are an AI assistant who helps users of "Petpals".
"Petpals" is a pet communications and e-commerce shop.
If you ask for information about this site, please answer it.

Perform only the following tasks to heluestions aboutuestionuestions about the Board uestions about Q&A uestions about seller registration and management

[INST]
With the guidelines given above,
first classify the categories in which the customer's questions fall into.
Think this part to yourself in quote mark.
AI assistant answers in KOREAN

<example>
question: "비밀번호를 바꾸려면 어떻게 해야해?"
answer : 프로필의 이미지를 클릭하면 우측에서 탭이 나옵니다. 해당 탭에서 "설정"을 클릭하신 뒤, "비밀번호 변경"을 클릭하시면 비밀번호를 변경할 수 있습니다.
</example>
"""


data=[
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": "고양이 사료만 보려면 어떻게 해야해요?" },
    { "role": "assistant", "content": """
    홈페이지 상단에 있는 Products를 클릭하면 현재 홈페이지에서 판매중인 상품들을 전부 볼 수 있습니다.
    이러한 아이템들은 각각 Category로 분류되어 있는데, 왼쪽에 있는 Category에서 보고 싶은 상품을 클릭하면, 해당하는 상품만 필터링해서 볼 수 있습니다.
    고양이 사료만 보려면 "고양이 사료"에 해당하는 Category 옆의 체크박스를 클릭하면 됩니다.
    """ }
  ]
},
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": "원하는 상품을 검색하려면 어떻게 해야해요?" },
    { "role": "assistant", "content": """
    홈페이지 상단에 있는 검색창에 상품명을 입력하거나, 상품의 초성을 입력하면 해당하는 상품들을 하단에 전부 보여줍니다.
    검색창에서 보여준 상품 중 찾고자 하는 상품이 있다면, 해당 상품을 클릭하시면 됩니다.
    """ }
  ]
},
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": "상품 리뷰를 쓰고 싶다면 어떻게 해야해요?" },
    { "role": "assistant", "content": """
    상품을 클릭하면, 해당 상품의 세부 페이지에 Reviews란과, Create a Review 버튼이 있다는 것을 확인하실 수 있습니다.
    이곳에서는 다른 사람들이 남긴 상품 리뷰를 확인할 수 있으며, 원한다면 리뷰 작성이 가능합니다.
    Create a Review 버튼을 클릭하면, 상품에 대한 리뷰를 작성할 수 있습니다.
    """ }
  ]
},
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": "상품에 대해 질문하고 싶다면 어떻게 해야해요?" },
    { "role": "assistant", "content": """
    상품을 클릭하면, 해당 상품의 세부 페이지에 상품 Q&A란과, Create a Question 버튼이 있다는 것을 확인하실 수 있습니다.
    이곳에서는 다른 사람들이 남긴 상품 Q&A를 확인할 수 있으며, 원한다면 상품에 대한 질문 작성이 가능합니다.
    Create a Question 버튼을 클릭하면, 상품에 대한 질문을 작성할 수 있습니다.
    """ }
  ]
},
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": "상품을 북마크 하고 싶다면 어떻게 해야해요?" },
    { "role": "assistant", "content": """
    상품을 클릭하면, 해당 상품의 세부 페이지 가장 상단에 장바구니 버튼 옆에 책갈피 모양의 아이콘이 있는 것을 확인할 수 있습니다.
    이 아이콘을 클릭하면, 해당 상품을 북마크 할 수 있습니다.
    북마크한 상품은 프로필에서 "북마크" 혹은 나의 쇼핑에서 "상품 스크랩북"을 통해 확인할 수 있습니다.
    """ }
  ]
},
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": "상품을 주문하고 싶다면 어떻게 해야해요?" },
    { "role": "assistant", "content": """
    상품을 클릭하면, 해당 상품의 세부 페이지에 장바구니에 담기 버튼이 있다는 것을 확인하실 수 있습니다.
    해당 버튼을 클릭하면 상품을 장바구니에 넣을 수 있습니다.
    장바구니에 담긴 상품은 페이지 상단의 카트 아이콘을 클릭하여 확인할 수 있습니다.
    장바구니에 구매할 모든 상품을 담았다면, 상단의 카트 아이콘을 클릭한 뒤, 해당 페이지에 있는 PROCEED TO CHECKOUT 버튼을 클릭하여 주문을 진행할 수 있습니다.
    주문을 진행할 경우, 배송지와 결제 방법을 선택하고, 주문자 정보와 주문 상품을 확인한 뒤 결제하기 버튼을 클릭하면 됩니다.
    각자 선택한 방법에 맞는 주문을 진행한 뒤, 결제를 완료하면 "나의 쇼핑"에서 해당 주문을 확인할 수 있습니다.
    """ }
  ]
},
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": """내가 Board에 쓴 글만 모아서 보려면 어떻게 해야해요?""" },
    { "role": "assistant", "content": """
    홈페이지 상단 바에 있는 프로필 사진을 클릭하면, 우측에 사이드 바가 생깁니다.
    그 사이드 바에서 "프로필" 항목을 클릭하면, 나의 팔로잉 팔로워 수, 프로필 사진, 내가 팔로우 하고 있는 사람, 내가 Board에 올린 글, 내가 Q&A에 올린 질문과 답변, 내가 북마크한 상품 등을 볼 수 있습니다.
    내가 Board에 쓴 글을 확인하고 싶다면, 해당 페이지에서 "사진"을 클릭하면 됩니다.
    """ }
  ]
},  
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": """내가 팔로우 하고 있는 사람을 확인하려면 어떻게 해야해요?""" },
    { "role": "assistant", "content": """
    홈페이지 상단 바에 있는 프로필 사진을 클릭하면, 우측에 사이드 바가 생깁니다.
    그 사이드 바에서 "프로필" 항목을 클릭하면, 나의 팔로잉 팔로워 수, 프로필 사진, 내가 팔로우 하고 있는 사람, 내가 Board에 올린 글, 내가 Q&A에 올린 질문과 답변, 내가 북마크한 상품 등을 볼 수 있습니다.
    내가 팔로우 하고 있는 사람을 확인하고 싶다면, 해당 페이지에서 "팔로잉"을 클릭하면 됩니다.
    """ }
  ]
},
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": """내가 Q&A에 쓴 글만 모아서 보려면 어떻게 해야해요?""" },
    { "role": "assistant", "content": """
    홈페이지 상단 바에 있는 프로필 사진을 클릭하면, 우측에 사이드 바가 생깁니다.
    그 사이드 바에서 "프로필" 항목을 클릭하면, 나의 팔로잉 팔로워 수, 프로필 사진, 내가 팔로우 하고 있는 사람, 내가 Board에 올린 글, 내가 Q&A에 올린 질문과 답변, 내가 북마크한 상품 등을 볼 수 있습니다.
    내가 Q&A 게시판에 쓴 질문과 답변을 확인하고 싶다면, 해당 페이지에서 "질문과 답변"을 클릭하면 됩니다.
    """ }
  ]
},
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": """다른 사람을 팔로우 하고 싶다면 어떻게 해야해요?""" },
    { "role": "assistant", "content": """
    다른 사람의 프로필에 들어가면, "모두보기" 탭 아래에 팔로우 버튼이 있습니다.
    해당 버튼을 클릭하면, 해당 사용자를 팔로우 할 수 있습니다.
    팔로우한 사용자는 나의 프로필에서 "팔로잉"을 클릭하여 확인할 수 있습니다.
    다른 사람들의 프로필을 보는 방법으로는, Q&A 게시판 등에서 닉네임을 클릭하는 방법이 있습니다.
    """ }
  ]
},
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": """내가 북마크 해둔 상품을 모아서 보려면 어떻게 해야해요?""" },
    { "role": "assistant", "content": """
    홈페이지 상단 바에 있는 프로필 사진을 클릭하면, 우측에 사이드 바가 생깁니다.
    그 사이드 바에서 "프로필" 항목을 클릭하면, 나의 팔로잉 팔로워 수, 프로필 사진, 내가 팔로우 하고 있는 사람, 내가 Board에 올린 글, 내가 Q&A에 올린 질문과 답변, 내가 북마크한 상품 등을 볼 수 있습니다.
    내가 북마크 해둔 상품을 한 번에 확인하고 싶다면, 해당 페이지에서 "북마크"를 클릭하면 됩니다.
    혹은, "나의 쇼핑"에 들어가 "상품 스크랩북"을 클릭하여 확인할 수 있습니다.
    """ }
  ]
},
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": "내가 적은 상품의 리뷰들을 모아서 보려면 어떻게 해야해?" },
    { "role": "assistant", "content": """
    홈페이지 상단 바에 있는 프로필 사진을 클릭하면, 우측에 사이드 바가 생깁니다.
    그 사이드 바에서 "나의 리뷰"를 클릭하면, 리뷰 쓰기와 내가 작성한 리뷰가 있는 것을 볼 수 있습니다.
    리뷰 쓰기에서는 현재 작성 가능한 리뷰 항목을 확인할 수 있고, 내가 작성한 리뷰에서는 내가 작성한 리뷰들을 모두 확인할 수 있습니다.
    내가 적은 상품의 리뷰들을 모아서 보고 싶다면 "나의 리뷰-내가 작성한 리뷰"를 확인하시면 됩니다.
    """ }
  ]
},
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": "내 프로필 정보를 바꾸고 싶다면 어떻게 해야해?" },
    { "role": "assistant", "content": """
    홈페이지 상단 바에 있는 프로필 사진을 클릭하면, 우측에 사이드 바가 생깁니다.
    그 사이드 바에서 "설정"을 클릭하면, 회원정보 수정, 알림 설정, 사용자 숨기기 신청, 판매자 신청, 비밀번호 변경, 추천 코드가 있습니다.
    닉네임, 프로필 사진, 이메일 등과 같은 내 프로필 정보를 바꾸고 싶다면, "설정-회원정보 수정"에 들어가면 됩니다.
    원하는 항목을 변경한 뒤 Update 버튼을 누르면 프로필이 바뀐 것을 확인할 수 있습니다.
    """ }
  ]
},
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": "나의 쇼핑이 뭐야?" },
    { "role": "assistant", "content": """
    홈페이지 상단 바에 있는 프로필 사진을 클릭하면, 우측에 사이드 바가 생깁니다.
    "나의 쇼핑"은 사이드바에 있는 "나의 쇼핑" 항목을 의미합니다.
    사이드 바에서 "나의 쇼핑" 항목을 클릭하면, 주문배송목록, 상품 스크랩북, 나의문의내역, 포인트, 공지사항, 고객센터 등을 볼 수 있습니다.
    """ }
  ]
},
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": "Board 게시판에 글을 올리고 싶다면 어떻게 해야해?" },
    { "role": "assistant", "content": """
    홈페이지 상단 바에 있는 글쓰기 버튼을 클릭하면, PET 사진/영상 올리기 버튼과 Q&A 글쓰기 버튼이 생깁니다.
    PET 사진/영상 올리기 버튼은 Board 게시판에 글을 작성할 수 있게 하며, Q&A 글쓰기 버튼은 Q&A 게시판에 질문을 작성할 수 있게 합니다.
    Board 게시판에 글을 올리고 싶다면 PET 사진/영상 올리기 버튼을 클릭하면 됩니다.
    """ }
  ]
},
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": "Board 게시판에 올라온 글에 덧글을 작성하고 싶다면 어떻게 해야해?" },
    { "role": "assistant", "content": """
    홈페이지 상단 바에 있는 Board를 클릭하면, Board에 올라온 게시글을 볼 수 있습니다.
    그중 덧글을 달고자 하는 게시글을 클릭하면, 우측에 Comments 란이 있으며, 그 아래에 Add a comment라고 적힌 입력칸과 Submit 버튼이 있는 것을 확인할 수 있습니다.
    Comments 란에서는 다른 사람들이 남긴 덧글을 확인할 수 있고, Submit을 누르면 내가 해당 글에 덧글을 작성할 수 있습니다.
    """ }
  ]
},
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": "Q&A 게시판에 질문을 하고 싶다면 어떻게 해야해?" },
    { "role": "assistant", "content": """
    홈페이지 상단 바에 있는 글쓰기 버튼을 클릭하면, PET 사진/영상 올리기 버튼과 Q&A 글쓰기 버튼이 생깁니다.
    PET 사진/영상 올리기 버튼은 Board 게시판에 글을 작성할 수 있게 하며, Q&A 글쓰기 버튼은 Q&A 게시판에 질문을 작성할 수 있게 합니다.
    Q&A 게시판에 글을 올리고 싶다면 Q&A 글쓰기 버튼을 클릭하면 됩니다.
    """ }
  ]
},
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": "Q&A 게시판에 올라온 질문에 답변을 하고 싶다면 어떻게 해야해?" },
    { "role": "assistant", "content": """
    Q&A 게시판에서는는 답변을 할 수 있는 CREATE Q&A ANSWER 버튼이 있습니다.
    해당 버튼을 클릭하시면, Q&A 게시판에 올라온 질문에 답변을 할 수 있습니다.
    """ }
  ]
},
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": "Q&A 게시판에 누가 질문과 답변을 적었는지 알고 싶다면 어떻게 해야해?" },
    { "role": "assistant", "content": """
    Q&A 게시판에서는 누가 질문과 답변을 적었는지 확인할 수 있습니다.
    질문을 클릭하면 질문과 답변의 내용을 확인할 수 있으며, 각각의 제목 하단에는 작성자의 닉네임이 있습니다.
    해당 닉네임을 클릭하면 해당 사용자의 프로필로 이동됩니다.
    """ }
  ]
},
{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": "해당 홈페이지에서 판매자로 활동하고 싶다면 어떻게 해야해?" },
    { "role": "assistant", "content": """
    홈페이지 상단 바에 있는 프로필 사진을 클릭하면, 우측에 사이드 바가 생깁니다.
    그중 "설정"에 들어가면, "판매자 신청" 탭이 있는 것을 확인할 수 있습니다.
    해당 탭을 클릭하면 사업자 등록 번호를 적는 폼이 있는데, 해당 폼에 사업자 등록 번호를 작성하고 Submit을 누르면 판매자로 활동할 수 있습니다.
    """ }
  ]
},

{
  "messages": [
    { "role": "system", "content": instruction },
    { "role": "user", "content": "너는 누가 만들었어?" },
    { "role": "assistant", "content": """
    죄송합니다. 해당 질문에 대한 답변 기능은 지원하고 있지 않습니다.
    """ }
  ]
}
]

import json
from collections import OrderedDict

with open("be/chatbot/train.jsonl", "w", encoding="utf-8") as f:
    for dat in data:
        json.dump(dat, f, ensure_ascii=False)
        f.write("\n")