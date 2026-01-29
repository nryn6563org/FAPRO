/**
 * @file news-data.js
 * @description 뉴스속보 페이지를 위한 Mock Data와 유틸리티입니다.
 */

export const NEWS_CATEGORIES = [
  { id: 'all', label: '전체' },
  { id: 'market', label: '시장보드' },
  { id: 'stock', label: '종목속보' },
  { id: 'overseas', label: '해외증시' },
  { id: 'ai', label: 'AI분석' }
];

export const mockNews = [
  {
    id: 1,
    category: 'market',
    title: '코스피, 기관 매수세에 1%대 상승 출발... 2600선 탈환 시도',
    source: '금융경제',
    time: '방금 전',
    tags: ['코스피', '기관매수'],
    isNew: true,
    isAI: false
  },
  {
    id: 2,
    category: 'ai',
    title: '[AI분석] 삼성전자, 4분기 실적 발표 앞두고 외국인 수급 개선 시그널 포착',
    source: 'RASSI AI',
    time: '5분 전',
    tags: ['삼성전자', '외국인', 'AI리포트'],
    isNew: true,
    isAI: true
  },
  {
    id: 3,
    category: 'stock',
    title: '에코프로비엠, 유럽 대규모 양극재 공급 계약 체결 소식에 급등',
    source: '증권뉴스',
    time: '12분 전',
    tags: ['에코프로비엠', '2차전지'],
    isNew: true,
    isAI: false
  },
  {
    id: 4,
    category: 'overseas',
    title: '뉴욕증시, 인플레이션 둔화 기대감에 S&P500 사상 최고치 경신',
    source: '글로벌경제',
    time: '30분 전',
    tags: ['S&P500', '뉴욕증시'],
    isNew: false,
    isAI: false
  },
  {
    id: 5,
    category: 'market',
    title: '한은 총재 "물가 안정 확신까지 긴축 기조 유지 필요"',
    source: '중앙일보',
    time: '45분 전',
    tags: ['한국은행', '금리'],
    isNew: false,
    isAI: false
  },
  {
    id: 6,
    category: 'ai',
    title: '[AI전략] 고배당주 테마 순환매 지속... 금융/통신 섹터 주목',
    source: 'RASSI AI',
    time: '1시간 전',
    tags: ['배당주', 'AI전략'],
    isNew: false,
    isAI: true
  }
];
