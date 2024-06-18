import rainbowBridge1 from '../../public/worldViewImages/rainbowBridge1.webp';
import popoForest from '../../public/worldViewImages/popoForest.webp';
import shimmeringLake1 from '../../public/worldViewImages/shimmeringLake1.webp';
import coocooGrassland from '../../public/worldViewImages/coocooGrassland.webp';

interface IWorldViewData {
  id: number;
  title: string;
  src: string;
  contentTitle1: string;
  content1: string;
  contentTitle2: string;
  content2: string;
}

const worldViewData: IWorldViewData[] = [
  {
    id: 1,
    title: '- EP.01 무지개 다리의 비밀 -',
    src: rainbowBridge1,
    contentTitle1: '서막',
    content1:
      '쿠쿠 동산으로 향하는 기니피그들의 첫 번째 모험은 바로 무지개 다리를 건너는 것이었습니다. 무지개 다리는 일곱 가지 빛깔로 빛나며, 다리 위를 걸을 때마다 기니피그들은 마음속에 작은 소원을 빌 수 있었습니다. 쿤, 밤비, 그리고 뚱이, 포포는 두근거리는 마음으로 다리를 건너기 시작했습니다.',
    contentTitle2: '다리 건너기',
    content2:
      '쿤이 먼저 다리를 건너며 소원을 빌었습니다. 그의 소원은 친구들과 함께 행복한 모험을 즐기는 것이었습니다. 밤비는 두 번째로 다리를 건너며 지혜를 더 얻기를 소원했고, 뚱이는 마지막으로 다리를 건너며 쿠쿠 동산의 모든 비밀을 알 수 있기를 빌었습니다. 포포는 마지막에 다리를 건너며 무지개 다리의 비밀을 알고 싶어 했습니다. 다리의 끝에 서자, 쿠쿠 동산의 전경이 한눈에 들어왔습니다. 끝없이 펼쳐진 초원과 신비로운 숲, 그리고 반짝이는 호수가 그들을 기다리고 있었습니다.',
  },
  {
    id: 2,
    title: '- EP.02 포포 숲의 신비로운 탐험-',
    src: popoForest,
    contentTitle1: '서막',
    content1:
      '기니피그들이 무지개 다리를 건넌 후, 그들의 다음 목적지는 포포 숲이었습니다. 포포 숲은 나무들이 울창하게 자라 있는 신비로운 장소로, 다양한 동물 친구들이 살고 있었습니다. 쿤, 밤비, 뚱이, 포포는 숲 속의 비밀을 찾아 탐험을 시작했습니다.',
    contentTitle2: '숲 속의 모험',
    content2:
      '숲을 탐험하던 중, 쿤은 미나리와 파프리카가 자라는 작은 정원을 발견했습니다. 그들은 신선한 채소들을 즐기며 잠시 휴식을 취했습니다. 그러던 중, 포포는 숲 깊숙한 곳에서 반짝이는 무언가를 발견했습니다. 그것은 바로 보물 상자였습니다. 밤비는 보물 상자를 열어 그 안에 숨겨진 보석들과 함께 쿠쿠 동산의 비밀에 대한 단서를 발견했습니다.',
  },
  {
    id: 3,
    title: '- EP.03 코코 가든의 꽃 축제 -',
    src: coocooGrassland,
    contentTitle1: '서막',
    content1:
      '포포 숲에서 보물을 발견한 후, 기니피그들은 쿠쿠 초원으로 향했습니다. 쿠쿠 초원은 끝없이 펼쳐진 푸른 초원으로, 다양한 꽃들이 만발해 있었습니다. 그날은 마침 코코 가든에서 꽃 축제가 열리는 날이었습니다. 꽃 축제는 기니피그들이 서로 꽃을 이용해 장식품을 만들고 선물하며 즐기는 특별한 날이었습니다.',
    contentTitle2: '꽃 축제의 즐거움',
    content2:
      '기니피그들은 꽃 축제에 참여하여 다양한 게임과 활동을 즐겼습니다. 쿤은 친구들과 함께 가장 아름다운 꽃 장식품을 만들기 위해 노력했습니다. 밤비는 기발한 아이디어로 장식품을 완성했고, 뚱이는 친구들을 응원하며 축제를 즐겼습니다. 꽃 축제의 마지막에는 가장 아름다운 꽃 장식품을 만든 기니피그에게 특별한 보상이 주어졌습니다. 쿤, 밤비, 뚱이, 포포는 함께 만든 장식품으로 최고의 상을 받았고, 이는 그들에게 큰 자부심과 행복을 안겨주었습니다.',
  },
  {
    id: 4,
    title: '- EP.04 반짝이는 호수의 마법 -',
    src: shimmeringLake1,
    contentTitle1: '서막',
    content1:
      '코코 가든에서의 축제가 끝난 후, 기니피그들은 반짝이는 호수로 향했습니다. 반짝이는 호수는 물이 맑고 투명하며, 호수 바닥에는 아름다운 보석들이 깔려 있었습니다. 햇빛이 호수에 반사되면 무지갯빛으로 빛나는 이곳은 기니피그들에게 완벽한 놀이터였습니다.',
    contentTitle2: '호수에서의 발견',
    content2:
      '쿤이 먼저 호수에 뛰어들었고, 밤비와 뚱이도 뒤따라 들어갔습니다. 물은 시원하고 상쾌했으며, 기니피그들은 물놀이를 즐기기 시작했습니다. 수영을 하던 중 쿤은 호수 바닥에 아름다운 보석들이 깔려 있는 것을 발견했습니다. 그 보석들은 햇빛에 반사되어 반짝이며 호수 전체를 무지갯빛으로 물들였습니다. 기니피그들은 호수 주변의 과일 나무에서도 신나는 시간을 보냈습니다. 나무에는 달콤한 과일들이 주렁주렁 열려 있어, 기니피그들은 마음껏 과일을 즐기며 행복한 시간을 보냈습니다. 포포는 호수에서 발견한 보석 하나를 주머니에 넣고, 친구들에게 이 보석들이 어떤 비밀을 가지고 있을지 이야기했습니다.',
  },
];

export default worldViewData;