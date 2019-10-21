# Tablo v2 (가제/미완)

기존 [Tablo](https://github.com/junhobaik/tablo) 웹앱을 개선하고 Feed(rss) 구독 기능을 추가한 새로운 웹앱.

간단히 즐겨찾기 기능과 rss 구독 기능을 위한 웹앱이라고 소개할 수 있다.  
크게 즐겨찾기 기능이라 할 수 있는 링크들이 모인 TAB, 그리고 구독한 사이트의 게시물 목록을 보여주즌 FEED으로 나뉜다.

TAB은 카테고리 별로 원하는 링크를 담아 관리한다.  
웹앱에서 현재 브라우저의 모든 열린 탭들을 확인하고 원하는 사이트를 TAB에 추가하거나,
웹서핑 중에 스크랩한 링크들 그리고 FEED에 있는 게시물 중 스크랩한 링크들이 있는 Cart에서 TAB에 추가할 수 있다.  
카테고리 순서 변경이나 링크 아이템들의 순서 변경과 추가는 모두 드래그 앤 드랍으로 이루어진다.

FEED는 구독한 사이트들의 게시물 목록이 출력된다.   
Feed 메뉴에서는 게시물 목록에서 특정 사이트, 또는 카테고리안의 모든 사이트의 게시물을 숨길 수 있다.
feed 주소 추가 과정에서는 유효성 검사를 통해 사이트가 구독이 가능한 사이트인지 검사하고 주소가 정확하지 않다면 대표적인 feed 주소들을 해당 주소에 대입하여 주소를 고쳐준다.

----

### Tech Stack

*~~취소선~~은 도입 예정*

- Framework: 
  - **React**
   - **redux (react-redux)**
- Bundler: **Parcel**
- Style:
  - **SASS (SCSS)**
  - **semantic-ui-react**
- Linter & Formatter: **ESLint** & **Prettier**
- etc: 
  - **chrome APIs**
  - ~~Google Analytics~~
