/**
 * 리포트 분석 데이터 유틸리티
 * 리액트 원본 소스에서 추출된 카테고리별 증권사 리포트 데이터 정의
 */

export const reportCategories = [
  '신규리포트',
  '목표가상향',
  '목표가하향',
  '기관관심리포트',
  '외국인관심리포트',
  '연기금관심리포트',
  '증권사관심종목',
  '목표가높음'
]

export const mockReportData = {
  신규리포트: [
    {
      date: '01/22',
      stockName: '두산에너빌리티',
      currentPrice: 52600,
      changeRate: 1.94,
      targetPrice: 69000,
      rating: 'BUY(신규)',
      title: '비메모리 턴어라운드와 본격적인 동행',
      firm: '교보증권',
      content: '국내 대표 시스템반도체 디자인하우스. DSP 전환의 성과가 보여줄 원년으로 기대됩니다. 주요 고객사의 공정 다변화와 AI 가속기 수요 대응 능력이 돋보입니다.'
    },
    {
      date: '01/22',
      stockName: '에이디테크놀로지',
      currentPrice: 34750,
      changeRate: 1.46,
      targetPrice: 45000,
      rating: 'BUY(신규)',
      title: 'DSP 전환의 결실을 맺을 시기',
      firm: '교보증권',
      content: '비메모리 반도체 시장의 성장과 함께 국내 디자인 하우스들의 역할이 증대되고 있습니다. 동사는 선단 공정 설계 능력을 바탕으로 해외 고객사 확보에 주력하고 있습니다.'
    },
    {
      date: '01/22',
      stockName: 'SK텔레콤',
      currentPrice: 56700,
      changeRate: 0.53,
      targetPrice: 70000,
      rating: 'BUY(신규)',
      title: 'AI 컴퍼니로의 성공적인 전환',
      firm: '하나증권',
      content: '통신 본업의 안정적인 캐시카우를 바탕으로 AI 데이터센터, 에이닷 등 신성장 동력 확보가 속도를 내고 있습니다.'
    },
    {
      date: '01/21',
      stockName: '네이버',
      currentPrice: 234000,
      changeRate: -0.85,
      targetPrice: 290000,
      rating: 'BUY',
      title: '커머스와 광고의 견고한 성장세',
      firm: '미래에셋증권',
      content: '생성형 AI 기술 적용을 통한 광고 효율 증대와 커머스 부문의 수익성 개선이 확인되고 있습니다.'
    },
    {
      date: '01/21',
      stockName: '삼성바이오로직스',
      currentPrice: 876000,
      changeRate: 1.25,
      targetPrice: 1100000,
      rating: 'BUY',
      title: '4공장 가동 효과 본격화',
      firm: '삼성증권',
      content: '대규모 수주 계약과 4공장 가동률 상승으로 실적 성장세가 지속될 것으로 전망됩니다.'
    }
  ],
  목표가상향: [
    {
      date: '01/22',
      stockName: '삼성전자',
      currentPrice: 74500,
      changeRate: 2.05,
      targetPrice: 95000,
      rating: 'BUY',
      title: 'HBM 공급 확대 및 메모리 가격 상승',
      firm: 'KB증권',
      content: 'HBM3E 양산 본격화와 감산 효과에 따른 메모리 가격 상승 폭이 예상보다 커 목표가를 상향합니다.'
    },
    {
      date: '01/22',
      stockName: '한화에어로스페이스',
      currentPrice: 286000,
      changeRate: 5.54,
      targetPrice: 350000,
      rating: 'BUY',
      title: '지속되는 수주 랠리와 폴란드 수출 효과',
      firm: '신한투자증권',
      content: 'K9 자주포 및 천무 등 폴란드향 수출 물량 인도가 가속화되며 실적 서프라이즈가 예상됩니다.'
    }
  ],
  목표가하향: [
    {
      date: '01/22',
      stockName: '현대차',
      currentPrice: 234000,
      changeRate: -1.76,
      targetPrice: 260000,
      rating: 'BUY',
      title: '피크 아웃 우려와 인센티브 증가',
      firm: '메리츠증권',
      content: '글로벌 수요 둔화에 따른 인센티브 상승이 우려되나, 주주환원 정책은 여전히 매력적입니다.'
    }
  ],
  기관관심리포트: [
    {
      date: '01/21',
      stockName: '유한양행',
      currentPrice: 89600,
      changeRate: 4.92,
      targetPrice: 120000,
      rating: 'BUY',
      title: '렉라자 글로벌 승인 임박',
      firm: 'DB금융투자',
      content: '기관 투자자들의 관심이 집중되는 폐암 신약 렉라자의 FDA 승인 모멘텀이 강화되고 있습니다.'
    }
  ],
  외국인관심리포트: [
    {
      date: '01/21',
      stockName: '카카오',
      currentPrice: 56700,
      changeRate: -0.35,
      targetPrice: 75000,
      rating: 'BUY',
      title: '경영 쇄신 및 핵심 사업 집중',
      firm: 'NH투자증권',
      content: '외국인 순매수 유입과 함께 경영 투명성 제고 노력이 호평을 받고 있습니다.'
    }
  ],
  연기금관심리포트: [
    {
      date: '01/22',
      stockName: 'KB금융',
      currentPrice: 78900,
      changeRate: 2.15,
      targetPrice: 95000,
      rating: 'BUY',
      title: '밸류업 프로그램의 직접적 수혜',
      firm: '대신증권',
      content: '주주가치 제고에 가장 적극적인 은행주로서 연기금의 비중 확대가 기대됩니다.'
    }
  ],
  증권사관심종목: [
    {
      date: '01/21',
      stockName: '포스코뷰처엠',
      currentPrice: 289000,
      changeRate: -2.99,
      targetPrice: 380000,
      rating: 'BUY',
      title: '양극재 출하량 회복 시그널',
      firm: '키움증권',
      content: '단기 실적 부진보다 장기적인 생산 능력 확장에 주목해야 할 시점입니다.'
    }
  ],
  목표가높음: [
    {
      date: '01/22',
      stockName: '크래프톤',
      currentPrice: 289000,
      changeRate: 0.78,
      targetPrice: 450000,
      rating: 'BUY',
      title: '배틀그라운드 IP의 저력 확인',
      firm: '한국투자증권',
      content: '현재가 대비 목표가 괴리율이 높아 밸류에이션 매력이 돋보이는 구간입니다.'
    }
  ]
}
