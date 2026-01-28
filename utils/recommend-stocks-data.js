/**
 * 추천종목 데이터 유틸리티
 */

export const strategyStocks = {
  momentum: [
    {
      id: 1,
      rank: 1,
      name: "삼성전자",
      ticker: "005930",
      description: "AI 반도체 수요 급증에 따른 HBM3E 공급 본격화 기대감",
      tags: ["반도체", "HBM", "AI"],
      yield: 167.43,
      buyDate: "2023.07.15",
      buyPrice: 68500,
      sellDate: "2024.01.20",
      sellPrice: 74500,
      status: "TOP 1",
      isHero: true
    },
    {
      id: 2,
      rank: 2,
      name: "SK하이닉스",
      ticker: "000660",
      description: "메모리 반도체 전문 기업, HBM 시장 선도 업체",
      tags: ["반도체", "HBM3", "NVIDIA"],
      yield: 142.8,
      buyDate: "2023.08.10",
      buyPrice: 115000,
      sellDate: "보유중",
      sellPrice: 0,
      status: "TOP 2"
    },
    {
      id: 3,
      rank: 3,
      name: "카카오",
      ticker: "035720",
      description: "플랫폼 전반의 수익성 개선 및 AI 검색 서비스 확대",
      tags: ["IT", "AI", "플랫폼"],
      yield: 58.2,
      buyDate: "2023.11.05",
      buyPrice: 42000,
      sellDate: "2024.01.21",
      sellPrice: 56700,
      status: "TOP 3"
    },
    {
      id: 4,
      rank: 4,
      name: "현대차",
      ticker: "005380",
      description: "하이브리드 및 전기차 판매 호조에 따른 실적 개선",
      tags: ["자동차", "친환경", "실적"],
      yield: 45.7,
      buyDate: "2023.10.12",
      buyPrice: 185000,
      sellDate: "보유중",
      sellPrice: 0,
      status: "TOP 4"
    },
    {
      id: 5,
      rank: 5,
      name: "네이버",
      ticker: "035420",
      description: "검색 인프라의 AI 고도화 및 광고 효율 최적화",
      tags: ["IT", "플랫폼", "AI"],
      yield: 32.15,
      buyDate: "2023.09.20",
      buyPrice: 195000,
      sellDate: "보유중",
      sellPrice: 0,
      status: "TOP 5"
    },
    {
      id: 6,
      rank: 6,
      name: "LG전자",
      ticker: "066570",
      description: "전장 부품 수주 잔고 확대 및 안정적인 가전 수익성",
      tags: ["가전", "전장", "실적"],
      yield: 28.4,
      buyDate: "2023.11.15",
      buyPrice: 102000,
      sellDate: "보유중",
      sellPrice: 0,
      status: "TOP 6"
    },
    {
      id: 7,
      rank: 7,
      name: "셀트리온",
      ticker: "068270",
      description: "합병 이후 신약 모멘텀 강화 및 미국 시장 점유율 상승",
      tags: ["바이오", "제약", "신약"],
      yield: 75.2,
      buyDate: "2023.08.20",
      buyPrice: 154000,
      sellDate: "2024.01.18",
      sellPrice: 185000,
      status: "TOP 7"
    },
    {
      id: 8,
      rank: 8,
      name: "POSCO홀딩스",
      ticker: "005490",
      description: "리튬 가공 인프라 구축에 따른 이차전지 소재 가치 부각",
      tags: ["철강", "2차전지", "소재"],
      yield: 112.8,
      buyDate: "2023.07.01",
      buyPrice: 385000,
      sellDate: "보유중",
      sellPrice: 0,
      status: "TOP 8"
    },
    {
      id: 9,
      rank: 9,
      name: "대한항공",
      ticker: "003490",
      description: "여객 수요 회복 및 아시아나 합병 승인 기대감",
      tags: ["항공", "운송", "합병"],
      yield: 18.5,
      buyDate: "2023.12.05",
      buyPrice: 22800,
      sellDate: "보유중",
      sellPrice: 0,
      status: "TOP 9"
    },
    {
      id: 10,
      rank: 10,
      name: "KB금융",
      ticker: "105560",
      description: "배당 확대 및 자사주 소각 등 주주 환원 강화 정책",
      tags: ["금융", "은행", "배당"],
      yield: 24.3,
      buyDate: "2023.10.15",
      buyPrice: 54000,
      sellDate: "2024.01.22",
      sellPrice: 65400,
      status: "TOP 10"
    },
    {
      id: 11,
      rank: 11,
      name: "기아",
      ticker: "000270",
      description: "북미 시장 전기차 및 SUV 판매 호조 지속",
      tags: ["자동차", "친환경", "수출"],
      yield: 92.1,
      buyDate: "2023.06.10",
      buyPrice: 81500,
      sellDate: "보유중",
      sellPrice: 0,
      status: "TOP 11"
    },
    {
      id: 12,
      rank: 12,
      name: "한화솔루션",
      ticker: "009830",
      description: "북미 태양광 시장 정책 수혜 및 신기술 적용 가속화",
      tags: ["에너지", "태양광", "정책"],
      yield: -12.4,
      buyDate: "2023.09.15",
      buyPrice: 42000,
      sellDate: "보유중",
      sellPrice: 0,
      status: "TOP 12"
    },
    {
      id: 13,
      rank: 13,
      name: "엔씨소프트",
      ticker: "036570",
      description: "신작 출시 본격화 및 장르 다변화 전략 추진",
      tags: ["게임", "플랫폼", "신작"],
      yield: -8.5,
      buyDate: "2023.11.20",
      buyPrice: 235000,
      sellDate: "보유중",
      sellPrice: 0,
      status: "TOP 13"
    },
    {
      id: 14,
      rank: 14,
      name: "HMM",
      ticker: "011200",
      description: "해운 운임 상승에 따른 실적 턴어라운드 기대",
      tags: ["운송", "해운", "실적"],
      yield: 14.7,
      buyDate: "2023.12.10",
      buyPrice: 17500,
      sellDate: "보유중",
      sellPrice: 0,
      status: "TOP 14"
    },
    {
      id: 15,
      rank: 15,
      name: "아모레퍼시픽",
      ticker: "090430",
      description: "북미 및 유럽 시장 중심의 브랜드 리브랜딩 성과 가시화",
      tags: ["뷰티", "소비재", "글로벌"],
      yield: 21.8,
      buyDate: "2023.10.25",
      buyPrice: 118000,
      sellDate: "보유중",
      sellPrice: 0,
      status: "TOP 15"
    }
  ],
  price: [
    {
      id: 5,
      rank: 1,
      name: "POSCO홀딩스",
      ticker: "005490",
      description: "리튬 가공 공장 가동 가시화로 배터리 소재 가치 재조명",
      tags: ["철강", "리튬", "2차전지"],
      yield: 124.5,
      buyDate: "2023.06.20",
      buyPrice: 380000,
      sellDate: "2024.01.15",
      sellPrice: 442000,
      status: "TOP 1",
      isHero: true
    },
    {
      id: 6,
      rank: 2,
      name: "금양",
      ticker: "001570",
      description: "2차전지 소재 사업 확대 및 4680 배터리 개발",
      tags: ["2차전지", "소재", "급등"],
      yield: 98.6,
      buyDate: "2023.07.05",
      buyPrice: 52000,
      sellDate: "보유중",
      sellPrice: 0,
      status: "TOP 2"
    }
  ],
  supply: [
    {
      id: 7,
      rank: 1,
      name: "셀트리온",
      ticker: "068270",
      description: "통합 셀트리온 출범에 따른 비용 효율화 및 신약 기대",
      tags: ["바이오", "신약", "합병"],
      yield: 82.4,
      buyDate: "2023.09.15",
      buyPrice: 145000,
      sellDate: "2024.01.18",
      sellPrice: 185000,
      status: "TOP 1",
      isHero: true
    },
    {
      id: 8,
      rank: 2,
      name: "삼성바이오로직스",
      ticker: "207940",
      description: "수주 잔고 증가와 5공장 가동 기대감에 따른 외국인 순매수",
      tags: ["바이오", "CDMO", "외인"],
      yield: 65.2,
      buyDate: "2023.10.20",
      buyPrice: 705000,
      sellDate: "보유중",
      sellPrice: 0,
      status: "TOP 2"
    }
  ],
  performance: [
    {
      id: 9,
      rank: 1,
      name: "기아",
      ticker: "000270",
      description: "역대급 실적 지속 및 배당 성향 강화에 따른 저평가 해소",
      tags: ["자동차", "실적", "배당"],
      yield: 112.3,
      buyDate: "2023.05.10",
      buyPrice: 82000,
      sellDate: "보유중",
      sellPrice: 0,
      status: "TOP 1",
      isHero: true
    },
    {
      id: 10,
      rank: 2,
      name: "LG에너지솔루션",
      ticker: "373220",
      description: "북미 시장 대규모 수주 확대와 IRA 혜택 가시화",
      tags: ["2차전지", "배터리", "실적"],
      yield: 74.8,
      buyDate: "2023.08.25",
      buyPrice: 412000,
      sellDate: "2024.01.22",
      sellPrice: 423000,
      status: "TOP 2"
    }
  ]
};

export const categories = [
  { id: "momentum", label: "모멘텀특징주", description: "대박주는 그 이유가 있다.\n실속 모멘텀 발생 종목 포착" },
  { id: "price", label: "시세특징주", description: "시세의 흐름을 읽다.\n가격 변동성 기반 특징주 선별" },
  { id: "supply", label: "수급특징주", description: "수급의 힘을 포착하다.\n거래량 급증 및 수급 집중 종목" },
  { id: "performance", label: "실적특징주", description: "실적으로 증명하다.\n영업이익 증가 및 성장성 우수 종목" }
];

export const getStockInitial = (name) => {
  return name ? name[0] : ''
}
