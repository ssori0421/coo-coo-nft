# 🐹 Coo-Coo-Nft 🐹

## 1. Introduction

"COO-COO-NFT"는 무지개 다리를 건너 쿠쿠월드에 도착한 기니피그들이 모험과 페스티벌을 즐기며 살아가는 세계를 배경으로 한 NFT 프로젝트입니다.

기니피그의 소리를 표현하는 의성어를 합쳐 "COO-COO-NFT"라는 이름을 지었습니다.

이 프로젝트는 귀여운 캐릭터들과 독특한 스토리라인을 통해 사용자들에게 `재미`와 `수집의 즐거움`을 제공하며, `블록체인 기술`을 이용해 NFT로 거래할 수 있도록 설계되었습니다.

![](https://velog.velcdn.com/images/ssori0421/post/1f3202da-6def-4ed8-be0e-7f6f9e0f9743/image.png)

## 2. Deploy

[서비스 바로가기](https://coo-coo-nft.vercel.app/)

## 3. 디렉토리 구조

```
📦src
 ┣ components
 ┃ ┣ GardenNftCard.tsx
 ┃ ┣ Header.tsx
 ┃ ┣ Layout.tsx
 ┃ ┣ MintModal.tsx
 ┃ ┣ MyNftCard.tsx
 ┃ ┗ NftCardSlider.tsx
 ┣ hooks
 ┃ ┣ useApprovalStatue.ts
 ┃ ┣ useGetTokenPrice.ts
 ┃ ┣ useImageSlide.ts
 ┃ ┣ useNftMetadata.ts
 ┃ ┗ useNftMetadatas.ts
 ┣ lib
 ┃ ┣ contractAddress.ts
 ┃ ┣ homeSlideImages.ts
 ┃ ┣ mintContractAbi.json
 ┃ ┣ saleContractAbi.json
 ┃ ┗ worldView.ts
 ┣ pages
 ┃ ┣ adminPage.tsx
 ┃ ┣ coocooGardenPage.tsx
 ┃ ┣ detailNftPage.tsx
 ┃ ┣ detailWorldViewPage.tsx
 ┃ ┣ homePage.tsx
 ┃ ┣ myCoocooPage.tsx
 ┃ ┗ worldViewPage.tsx
 ┣ types
 ┃ ┗ metadata.ts
 ┣ App.tsx
 ┣ index.css
 ┣ main.tsx
 ┗ vite-env.d.ts

```

## 4. 기능

✅ **HEADER**

- 로컬 스토리지를 사용하여 사용자의 지갑 연결 상태를 저장하여 새로고침시에도 로그인 상태를 유지할 수 있습니다.

✅ **WORLD VIEW**

- 사용자에게 흥미와 관심을 불러일으키기 위해 `네 개의 에피소드`로 구성된 세계관을 보여주는 페이지 입니다.

✅ **COOCOO GARDEN**

- COO-COO NFT 마켓페이지 입니다.
- 민팅되어있는 `전체 NFT`를 보여주며, 사용자의 해당 NFT 소유 유무를 판별하여 구매 버튼을 `활성/비활성` 상태를 나타냅니다.
- 카드를 클릭하면 해당 NFT에 대한 `상세 정보`를 확인할 수 있습니다.

✅ **MY COOCOO**

- 사용자가 `구매한 COO-COO NFT`를 보여주는 마이페이지 입니다.
- 한 화면에 3개의 NFT 카드를 보여주며 화살표 버튼을 클릭하면 `슬라이드` 형식으로 다음 NFT 카드들을 보여줍니다.
- 처음 NFT 카드/마지막 NFT 카드의 경우 각각 슬라이드 버튼을 `비활성화`해서 해당 동작이 수행되지 않음을 표시하였습니다.

✅ **ADMIN**

- 이 프로젝트는 지갑 주소를 통해 컨트랙트를 발행한 `관리자`만이 `민팅`을 수행할 수 있도록 설계되어 있습니다.
- 따라서 관리자 페이지에 접근시 지갑 주소를 비교하여 일반 사용자의 경우 `메인 페이지`로 `리다이렉트` 되도록 하였습니다.

### 4. STACKS 📚

<div align=center> 
 <img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=JAVASCRIPT&logoColor=black">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
 </br>
  <img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=TYPESCRIPT&logoColor=black">
    <img src="https://img.shields.io/badge/SOLIDITY-CC4699?style=for-the-badge&logo=ZUSTAND&logoColor=black">
      <img src="https://img.shields.io/badge/AXIOS-5A29E4?style=for-the-badge&logo=AXIOS&logoColor=black">
  </br>
  <img src="https://img.shields.io/badge/CHAKRA UI-CC6699?style=for-the-badge&logo=SCSS&logoColor=black">
  <img src="https://img.shields.io/badge/REACT ROUTER DOM-47A248?style=for-the-badge&logo=MONGODB&logoColor=black">
    <img src="https://img.shields.io/badge/ETHERS-2088FF?style=for-the-badge&logo=GITHUB ACTIONS&logoColor=black">
  </br>
</div>

### 5. Git Convention 🖍️

| 태그     | 설명                                                                        |
| -------- | --------------------------------------------------------------------------- |
| feat     | 새로운 기능을 추가할 경우                                                   |
| chore    | 패키지 매니저 설정 등 여러가지 기능과 무관한 부분 들을 수정, 추가 하는 경우 |
| error    | 버그를 고친경우                                                             |
| HOTFIX   | 치명적인 버그 수정, 운영중 빠른 수정이 필요한 경우                          |
| design   | CSS 등 사용자 UI 디자인 변경                                                |
| style    | 코드 포맷 변경, 세미콜론 누락 등 기능상의 코드 수정이 없는 경우             |
| comment  | 주석 추가 및 변경                                                           |
| docs     | 문서를 수정한 경우                                                          |
| refactor | 프로덕션 코드 리팩토링                                                      |
| rename   | 파일명을 수정하거나 옮기는 작업                                             |
| remove   | 파일을 삭제하는 작업                                                        |
| test     | Test코드 추가                                                               |

## 6. 프로젝트 실행 방법

이 프로젝트는 `메타마스크 지갑`을 필요로 합니다.

먼저 `Chrome 브라우저`에 `Metamask`가 설치되어 있는지 확인해 주세요.

[메타마스크 지갑 설치하기](https://metamask.io/download/)

```bash
# 레포지토리 클론
git clone https://github.com/ssori0421/coo-coo-nft

# Vite 설정 및 실행
cd vite
npm install
npm run dev
```
