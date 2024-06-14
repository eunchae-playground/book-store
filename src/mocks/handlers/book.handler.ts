import { http, HttpResponse } from "msw";
import { BestSellerBooksResponse } from "../../models/book.model";

const mockBestSellerBooks: BestSellerBooksResponse = [
  {
    id: 6,
    categoryId: 1,
    title: "컬러의 세계",
    bookFormat: "종이책",
    isbn: "0",
    summary: "우리가 사랑한 영화 속 컬러 팔레트",
    detail:
      "컬러의 세계는 무궁무진하다. 콘텐츠에서 색은 필수적인 역할을 한다. 감정을 이끌어내기도 하고, 별다른 부연 설명 없이 설득력 있는 주장을 펼치기도 한다. 마케팅, 브랜딩, 드라마, 영화 등의 분야에서 항상 색의 역할이 강조되어 온 이유다.",
    author: "찰스 브라메스코 ",
    totalPages: 100,
    tableOfContents: "목차 내용",
    price: 15690,
    pubDate: "2019-01-01",
    image: "https://picsum.photos/id/1/600",
    likeCount: 1,
    categoryName: "동화",
  },
  {
    id: 7,
    categoryId: 1,
    title: "연잎 부침",
    bookFormat: "종이책",
    isbn: "1",
    summary: "초록 향기가 가득한 싱그러운 여름날",
    detail:
      "초록 향기가 가득한 싱그러운 여름날, 동물 친구들이 어디론가 향한다. 서둘러 도착한 곳은 연잎이 곱게 떠오른 연못. 동물 친구들은 연못에서 특별한 여름 축제를 열기로 한다. 그립고 반가운 친구들이 모두 모이는 신나는 여름날. 고소하고, 맛있는 연잎 부침과 함께라면 더욱 즐겁다.",
    author: "백유연",
    totalPages: 100,
    tableOfContents: "목차 내용",
    price: 13500,
    pubDate: "2023-12-01",
    image: "https://picsum.photos/id/2/600",
    likeCount: 2,
    categoryName: "동화",
  },
  {
    id: 8,
    categoryId: 1,
    title: "폭염 살인",
    bookFormat: "종이책",
    isbn: "2",
    summary: "폭주하는 더위는 어떻게 우리 삶을 파괴하는가",
    detail:
      "바야흐로 대폭염 시대, 해마다 ‘역대급 더위’를 경신하는 가운데 지구는 점점 더 빠르고 더 뜨거운 멸종을 향해가고 있다. 전력난과 물가 폭등, 슈퍼 산불과 전염병에 이르기까지, 폭염은 우리 삶을 전방위로 압박할 것이며, 그 끝에는 죽음 외에 아무것도 남지 않을 것이다.",
    author: "제프 구델 ",
    totalPages: 100,
    tableOfContents: "목차 내용",
    price: 10100,
    pubDate: "2023-11-01",
    image: "https://picsum.photos/id/3/600",
    likeCount: 0,
    categoryName: "동화",
  },
  {
    id: 9,
    categoryId: 2,
    title: "모든 아이는 예민하다",
    bookFormat: "종이책",
    isbn: "3",
    summary: "소아정신건강의학과 의사가 들려주는",
    detail:
      "20여 년간 소아청소년정신건강의학과에서 진료해온 의사가 쓴 예민한 아이의 유형, 사례, 치료 모음집이다. 사회는 그 속에서 살아가는 사람들에게 특정한 증상을 만들어낸다. 저자가 최근 10년간 진료실에서 만난 아이 중 다수는 특히 ‘불안’을 호소했다. 이 아이들은 매우 예민했는데, 어린이집, 유치원, 초등학교 진학 모두를 버거워했다. 무난히 성장기를 통과하는 또래들과 달리 어떤 아이들에게는 삶이 허들 넘기의 연속이다.",
    author: "김원효",
    totalPages: 100,
    tableOfContents: "목차 내용",
    price: 16200,
    pubDate: "2024-04-08",
    image: "https://picsum.photos/id/4/600",
    likeCount: 0,
    categoryName: "소설",
  },
];

const bestSellerBooks = http.get(
  "http://localhost:3000/books/best-seller",
  () => {
    return HttpResponse.json(mockBestSellerBooks, { status: 200 });
  }
);

const bookHandlers = [bestSellerBooks];

export default bookHandlers;
