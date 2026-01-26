/**
 * 추천종목 데이터 유틸리티
 */

export const strategyStocks = {
  momentum: [
    {
      id: 1,
      rank: 1,
      name: '삼성전자',
      ticker: '005930',
      description: 'AI 반도체 수요 급증에 따른 HBM3E 공급 본격화 기대감',
      tags: ['반도체', 'HBM', 'AI'],
      yield: 167.43,
      buyDate: '2023.07.15',
      buyPrice: 68500,
      sellDate: '2024.01.20',
      sellPrice: 74500,
      status: 'TOP 1',
      isHero: true
    },
    {
      id: 2,
      rank: 2,
      name: 'SK하이닉스',
      ticker: '000660',
      description: '메모리 반도체 전문 기업, HBM 시장 선도 업체',
      tags: ['반도체', 'HBM3', 'NVIDIA'],
      yield: 142.8,
      buyDate: '2023.08.10',
      buyPrice: 115000,
      sellDate: '보유중',
      sellPrice: 0,
      status: 'TOP 2'
    },
    {
      id: 3,
      rank: 3,
      name: '카카오',
      ticker: '035720',
      description: '플랫폼 전반의 수익성 개선 및 AI 검색 서비스 확대',
      tags: ['IT', 'AI', '플랫폼'],
      yield: 58.2,
      buyDate: '2023.11.05',
      buyPrice: 42000,
      sellDate: '2024.01.21',
      sellPrice: 56700,
      status: 'TOP 3'
    },
    {
      id: 4,
      rank: 4,
      name: '현대차',
      ticker: '005380',
      description: '하이브리드 및 전기차 판매 호조에 따른 실적 개선',
      tags: ['자동차', '친환경', '실적'],
      yield: 45.7,
      buyDate: '2023.10.12',
      buyPrice: 185000,
      sellDate: '보유중',
      sellPrice: 0,
      status: 'TOP 4'
    }
  ],
  price: [
    {
      id: 5,
      rank: 1,
      name: 'POSCO홀딩스',
      ticker: '005490',
      description: '리튬 가공 공장 가동 가시화로 배터리 소재 가치 재조명',
      tags: ['철강', '리튬', '2차전지'],
      yield: 124.5,
      buyDate: '2023.06.20',
      buyPrice: 380000,
      sellDate: '2024.01.15',
      sellPrice: 442000,
      status: 'TOP 1',
      isHero: true
    },
    {
      id: 6,
      rank: 2,
      name: '금양',
      ticker: '001570',
      description: '2차전지 소재 사업 확대 및 4680 배터리 개발',
      tags: ['2차전지', '소재', '급등'],
      yield: 98.6,
      buyDate: '2023.07.05',
      buyPrice: 52000,
      sellDate: '보유중',
      sellPrice: 0,
      status: 'TOP 2'
    }
  ],
  supply: [
    {
      id: 7,
      rank: 1,
      name: '셀트리온',
      ticker: '068270',
      description: '통합 셀트리온 출범에 따른 비용 효율화 및 신약 기대',
      tags: ['바이오', '신약', '합병'],
      yield: 82.4,
      buyDate: '2023.09.15',
      buyPrice: 145000,
      sellDate: '2024.01.18',
      sellPrice: 185000,
      status: 'TOP 1',
      isHero: true
    },
    {
      id: 8,
      rank: 2,
      name: '삼성바이오로직스',
      ticker: '207940',
      description: '수주 잔고 증가와 5공장 가동 기대감에 따른 외국인 순매수',
      tags: ['바이오', 'CDMO', '외인'],
      yield: 65.2,
      buyDate: '2023.10.20',
      buyPrice: 705000,
      sellDate: '보유중',
      sellPrice: 0,
      status: 'TOP 2'
    }
  ],
  performance: [
    {
      id: 9,
      rank: 1,
      name: '기아',
      ticker: '000270',
      description: '역대급 실적 지속 및 배당 성향 강화에 따른 저평가 해소',
      tags: ['자동차', '실적', '배당'],
      yield: 112.3,
      buyDate: '2023.05.10',
      buyPrice: 82000,
      sellDate: '보유중',
      sellPrice: 0,
      status: 'TOP 1',
      isHero: true
    },
    {
      id: 10,
      rank: 2,
      name: 'LG에너지솔루션',
      ticker: '373220',
      description: '북미 시장 대규모 수주 확대와 IRA 혜택 가시화',
      tags: ['2차전지', '배터리', '실적'],
      yield: 74.8,
      buyDate: '2023.08.25',
      buyPrice: 412000,
      sellDate: '2024.01.22',
      sellPrice: 423000,
      status: 'TOP 2'
    }
  ]
}

export const categories = [
  { id: 'momentum', label: '모멘텀특징주' },
  { id: 'price', label: '시세특징주' },
  { id: 'supply', label: '수급특징주' },
  { id: 'performance', label: '실적특징주' }
]

export const getStockInitial = (name) => {
  return name ? name[0] : ''
}
