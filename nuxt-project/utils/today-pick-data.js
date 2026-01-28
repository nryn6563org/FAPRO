/**
 * 오늘의 종목 Pick 데이터 유틸리티 (히스토리 데이터 포함)
 */

export const historyPicks = [
  {
    date: '01월 22일 (목)',
    picks: [
      {
        rank: 1,
        ticker: '005930',
        name: '삼성전자',
        description: '글로벌 반도체 및 전자제품 제조 선도 기업',
        price: 72500,
        changeAmount: 1500,
        changeRate: 2.11,
        issues: ['반도체', 'AI', 'HBM'],
        reason: 'AI 반도체 수요가 급증하면서 HBM(고대역폭 메모리) 시장에서의 점유율이 빠르게 확대되고 있습니다. NVIDIA, AMD 등 글로벌 빅테크 기업들과의 협력이 강화되며 실적 개선이 본격화될 것으로 전망됩니다.',
        chartData: [68000, 69500, 70200, 69800, 71000, 71500, 72500],
        isFavorite: false
      },
      {
        rank: 2,
        ticker: '000660',
        name: 'SK하이닉스',
        description: '메모리 반도체 전문 기업, HBM 시장 선도 업체',
        price: 145000,
        changeAmount: 3200,
        changeRate: 2.26,
        issues: ['반도체', 'HBM3', 'NVIDIA'],
        reason: 'HBM3 제품 출하가 본격화되면서 수익성이 크게 개선되고 있습니다. NVIDIA와의 독점 공급 계약을 통해 안정적인 물량 확보가 가능합니다.',
        chartData: [138000, 140000, 139500, 141000, 142500, 143800, 145000],
        isFavorite: false
      },
      {
        rank: 3,
        ticker: '079550',
        name: 'LIG넥스원',
        description: '국내 최대 방산 전문 기업, 방위산업 선도 업체',
        price: 125000,
        changeAmount: -1200,
        changeRate: -0.95,
        issues: ['방산', 'K-방산', '정부지원'],
        reason: 'K-방산 수출이 급증하면서 대규모 수주가 지속적으로 확대되고 있습니다. 중장기 성장성이 매우 우수한 상황입니다.',
        chartData: [128000, 127500, 126800, 127000, 126500, 126200, 125000],
        isFavorite: false
      },
      {
        rank: 4,
        ticker: '035720',
        name: '카카오',
        description: '국내 최대 모바일 플랫폼 및 콘텐츠 서비스 기업',
        price: 56700,
        changeAmount: 4200,
        changeRate: 8.0,
        issues: ['플랫폼', 'AI검색', '콘텐츠'],
        reason: '플랫폼 전반의 수익성 개선이 가시화되고 있으며, AI 검색 서비스 확대를 통한 신규 성장동력 확보가 진행 중입니다.',
        chartData: [52000, 52500, 53200, 54000, 54800, 55500, 56700],
        isFavorite: false
      },
      {
        rank: 5,
        ticker: '373220',
        name: 'LG에너지솔루션',
        description: '글로벌 2차전지 제조 및 배터리 솔루션 선도 기업',
        price: 423000,
        changeAmount: -12000,
        changeRate: -2.76,
        issues: ['2차전지', '전기차', '북미수주'],
        reason: '북미 시장에서의 대규모 수주 확대가 기대되며, 전기차 시장의 지속적인 성장에 따른 배터리 수요 증가가 예상됩니다.',
        chartData: [438000, 435000, 432000, 430000, 428000, 425000, 423000],
        isFavorite: false
      }
    ]
  },
  {
    date: '01월 21일 (수)',
    picks: [
      {
        rank: 1,
        ticker: '005490',
        name: 'POSCO홀딩스',
        description: '철강 제조 및 미래 핵심소재 전문 지주회사',
        price: 442000,
        changeAmount: 8500,
        changeRate: 1.96,
        issues: ['철강', '리튬', '2차전지'],
        reason: '리튬 가공 공장 가동 가시화로 배터리 소재 가치가 재조명받고 있습니다. 철강 수요 회복과 맞물려 실적 턴어라운드가 기대됩니다.',
        chartData: [420000, 425000, 430000, 428000, 435000, 438000, 442000],
        isFavorite: false
      },
      {
        rank: 2,
        ticker: '000270',
        name: '기아',
        description: '글로벌 완성차 제도 및 모빌리티 서비스 기업',
        price: 98000,
        changeAmount: 1200,
        changeRate: 1.24,
        issues: ['자동차', '전기차', '북미수출'],
        reason: '북미 시장에서의 높은 점유율과 고부가가치 차량(SUV/EV) 중심의 판매 믹스 개선으로 역대급 실적 행진을 이어가고 있습니다.',
        chartData: [92000, 93500, 94000, 95000, 96200, 97000, 98000],
        isFavorite: false
      },
      {
        rank: 3,
        ticker: '068270',
        name: '셀트리온',
        description: '글로벌 바이오 의약품 개발 및 생산 선도 기업',
        price: 185000,
        changeAmount: -500,
        changeRate: -0.27,
        issues: ['바이오', '신약', '합병'],
        reason: '통합 셀트리온 출범에 따른 비용 효율화와 짐펜트라의 미국 시장 연착륙 기대감이 조화를 이루고 있습니다.',
        chartData: [190000, 188000, 187500, 189000, 186000, 184500, 185000],
        isFavorite: false
      },
      {
        rank: 4,
        ticker: '012450',
        name: '한화에어로스페이스',
        description: '항공엔진 제조 및 방산 제품 생산 전문 기업',
        price: 152000,
        changeAmount: 2300,
        changeRate: 1.54,
        issues: ['방산', '항공우주', '폴란드수주'],
        reason: '폴란드향 대규모 수출 물량의 인도 본격화로 매출과 이익이 동시에 급격히 성장하고 있는 구간입니다.',
        chartData: [145000, 147000, 148500, 147500, 150000, 151200, 152000],
        isFavorite: false
      },
      {
        rank: 5,
        ticker: '003550',
        name: 'LG',
        description: 'LG그룹의 지주회사, 전자/화학/통신 사업 선도',
        price: 92400,
        changeAmount: 3100,
        changeRate: 3.47,
        issues: ['지주사', '주주환원', '밸류업'],
        reason: '정부의 기업 밸류업 프로그램 수혜 기대감과 함께 자회사들의 안정적인 배당 수익 및 주주 환원 강화 정책이 긍정적입니다.',
        chartData: [88000, 89500, 89000, 90200, 91500, 91000, 92400],
        isFavorite: false
      }
    ]
  },
  {
    date: '01월 20일 (화)',
    picks: [
      { rank: 1, name: '삼성바이오로직스', ticker: '207940', price: 812000, changeAmount: 11000, changeRate: 1.37, issues: ['바이오', 'CDMO'], reason: '수주 잔고 증가와 5공장 가동 기대감.', description: '글로벌 바이오 의약품 위탁 개발 생산 기업', chartData: [800000, 805000, 812000], isFavorite: false },
      { rank: 2, name: 'HD현대중공업', ticker: '329180', price: 128500, changeAmount: 1200, changeRate: 0.94, issues: ['조선', '친환경선박'], reason: '선가 상승 및 카타르발 수주 가시화.', description: '글로벌 조선 산업 선도 기업', chartData: [125000, 126000, 128500], isFavorite: false },
      { rank: 3, name: '엔씨소프트', ticker: '036570', price: 215000, changeAmount: -4200, changeRate: -1.92, issues: ['게임', '신작'], reason: '신작 TL 평점 및 중국 판호 발급 기대.', description: '국내 대표 온라인 게임 개발 및 플랫폼 기업', chartData: [225000, 220000, 215000], isFavorite: false },
      { rank: 4, name: '크래프톤', ticker: '259960', price: 234000, changeAmount: 1500, changeRate: 0.64, issues: ['게임', '배틀그라운드'], reason: '견조한 배그 매출과 인도 시장 성장.', description: '글로벌 게임 제작 및 배급 기업', chartData: [230000, 232000, 234000], isFavorite: false },
      { rank: 5, name: '하이브', ticker: '352820', price: 245000, changeAmount: 5500, changeRate: 2.3, issues: ['엔터', '아티스트'], reason: '멀티 레이블 전략 안착 및 플랫폼 입점.', description: '글로벌 엔터테인먼트 라이프스타일 플랫폼 기업', chartData: [238000, 240000, 245000], isFavorite: false }
    ]
  },
  {
    date: '01월 19일 (월)',
    picks: [
      { rank: 1, name: 'SK이노베이션', ticker: '096770', price: 128400, changeAmount: 2100, changeRate: 1.66, issues: ['에너지', '배터리'], reason: '정제마진 개선 및 SK온 흑자 전환 기대.', description: '종합 에너지 및 석유화학 비즈니스 기업', chartData: [125000, 126500, 128400], isFavorite: false },
      { rank: 2, name: '삼성SDI', ticker: '006400', price: 382000, changeAmount: -3500, changeRate: -0.91, issues: ['2차전지', '각형배터리'], reason: '프리미엄 배터리 수요 지속 및 차세대 공정.', description: '글로벌 에너지 솔루션 및 전자재료 기업', chartData: [390000, 388000, 382000], isFavorite: false },
      { rank: 3, name: '네이버', ticker: '035420', price: 212500, changeAmount: 1500, changeRate: 0.71, issues: ['IT', 'AI', '커머스'], reason: '광고 업황 회복 및 생성형 AI 유료화 기대.', description: '국내 최대 검색 포털 및 인터넷 서비스 기업', chartData: [208000, 210000, 212500], isFavorite: false },
      { rank: 4, name: '삼성물산', ticker: '028260', price: 148500, changeAmount: 2200, changeRate: 1.5, issues: ['지주사', '주주환원'], reason: '자사주 소각 등 강력한 주주 친화 정책.', description: '종합 상사 및 건설 중심의 다각화된 기업', chartData: [145000, 146500, 148500], isFavorite: false },
      { rank: 5, name: '메리츠금융지주', ticker: '138040', price: 78500, changeAmount: 3400, changeRate: 4.53, issues: ['금융', '배당'], reason: '연결 이익의 50% 주주환원 원칙 유지.', description: '다양한 금융 서비스를 제공하는 국내 금융 지주사', chartData: [72000, 75000, 78500], isFavorite: false }
    ]
  },
  {
    date: '01월 16일 (금)',
    picks: [
      { rank: 1, name: 'KT', ticker: '030200', price: 38400, changeAmount: 200, changeRate: 0.52, issues: ['통신', '배당'], reason: '안정적인 배당 성향과 클라우드 사업 성장.', description: '국내 대표 유무선 통신 및 플랫폼 기업', chartData: [38000, 38200, 38400], isFavorite: false },
      { rank: 2, name: 'S-Oil', ticker: '010950', price: 68500, changeAmount: -400, changeRate: -0.58, issues: ['정유', '배당'], reason: '유가 변동성 완화 및 고배당 메리트.', description: '글로벌 경쟁력을 갖춘 종합 에너지 및 화학 기업', chartData: [69500, 69000, 68500], isFavorite: false },
      { rank: 3, name: '대한항공', ticker: '003490', price: 24200, changeAmount: 650, changeRate: 2.76, issues: ['항공', 'LCC합병'], reason: '여객 수요 폭증 및 아시아나 합병 가시화.', description: '대한민국의 대표적인 글로벌 네트워크 항공사', chartData: [23200, 23500, 24200], isFavorite: false },
      { rank: 4, name: 'KB금융', ticker: '105560', price: 65400, changeAmount: 1100, changeRate: 1.71, issues: ['금융', '밸류업'], reason: '금리 환경 수혜 및 압도적인 이익 창출력.', description: '다양한 금융 포트폴리오를 보유한 금융 그룹', chartData: [63500, 64200, 65400], isFavorite: false },
      { rank: 5, name: '현대건설', ticker: '000720', price: 34200, changeAmount: 850, changeRate: 2.55, issues: ['건설', '원전'], reason: '해외 수주 회복 및 대형 원전 사업 기대감.', description: '토목, 건축, 플랜트 선도의 종합 건설 기업', chartData: [32500, 33200, 34200], isFavorite: false }
    ]
  }
]

export const getStockColor = (stockName) => {
  const colors = [
    'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500',
    'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500',
    'bg-lime-500', 'bg-green-500', 'bg-emerald-500', 'bg-teal-500',
    'bg-cyan-500', 'bg-sky-500', 'bg-violet-500', 'bg-fuchsia-500'
  ]
  const index = stockName.charCodeAt(0) % colors.length
  return colors[index]
}
