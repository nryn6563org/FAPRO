/**
 * 테마/업종 데이터 유틸리티
 * 리액트 원본 소스 및 요구사항에 맞춰 각 카테고리별 10개의 종목 데이터 정의
 */

// 테마 목업 데이터
export const mockThemes = [
  {
    id: 1,
    name: 'AI 반도체',
    change: 12.5,
    stockCount: 23,
    topStocks: [
      { name: '삼성전자', currentPrice: 74500, change: 1500, changeRate: 2.05 },
      { name: 'SK하이닉스', currentPrice: 142000, change: 4500, changeRate: 3.27 },
      { name: '메리츠반도체', currentPrice: 28900, change: -800, changeRate: -2.69 },
      { name: 'DB하이텍', currentPrice: 52300, change: 2100, changeRate: 4.18 },
      { name: '엔비디아코리아', currentPrice: 18700, change: 900, changeRate: 5.06 },
      { name: '한미반도체', currentPrice: 64200, change: 1800, changeRate: 2.89 },
      { name: '원익IPS', currentPrice: 36500, change: -1200, changeRate: -3.18 },
      { name: '코미코', currentPrice: 24800, change: 1300, changeRate: 5.53 },
      { name: '리노공업', currentPrice: 156000, change: 5000, changeRate: 3.31 },
      { name: 'SFA반도체', currentPrice: 19400, change: 700, changeRate: 3.74 }
    ]
  },
  {
    id: 2,
    name: 'K-방산',
    change: 18.9,
    stockCount: 18,
    topStocks: [
      { name: '한화에어로스페이스', currentPrice: 286000, change: 15000, changeRate: 5.54 },
      { name: 'LIG넥스원', currentPrice: 198000, change: 9800, changeRate: 5.21 },
      { name: '현대로템', currentPrice: 58900, change: 3200, changeRate: 5.75 },
      { name: '퍼스텍', currentPrice: 42300, change: 2800, changeRate: 7.09 },
      { name: '비츠로테크', currentPrice: 23500, change: 1900, changeRate: 8.80 },
      { name: '빅텍', currentPrice: 18900, change: 1200, changeRate: 6.78 },
      { name: '풍산', currentPrice: 38700, change: 2100, changeRate: 5.74 },
      { name: '한화', currentPrice: 34500, change: 1800, changeRate: 5.50 },
      { name: '대한항공', currentPrice: 28600, change: 1500, changeRate: 5.54 },
      { name: '한국항공우주', currentPrice: 54300, change: 2100, changeRate: 4.02 }
    ]
  },
  {
    id: 3,
    name: '2차전지',
    change: -3.2,
    stockCount: 45,
    topStocks: [
      { name: 'LG에너지솔루션', currentPrice: 423000, change: -12000, changeRate: -2.76 },
      { name: '삼성SDI', currentPrice: 567000, change: -18000, changeRate: -3.08 },
      { name: '포스코퓨처엠', currentPrice: 289000, change: -8900, changeRate: -2.99 },
      { name: '에코프로비엠', currentPrice: 178000, change: -5600, changeRate: -3.05 },
      { name: 'LG화학', currentPrice: 389000, change: -11000, changeRate: -2.75 },
      { name: '엘앤에프', currentPrice: 156000, change: -4800, changeRate: -2.98 },
      { name: '코스모신소재', currentPrice: 48900, change: -1500, changeRate: -2.98 },
      { name: '천보', currentPrice: 67800, change: -2100, changeRate: -3.01 },
      { name: '에코프로', currentPrice: 92300, change: -2800, changeRate: -2.95 },
      { name: '솔루스첨단소재', currentPrice: 34500, change: -1100, changeRate: -3.09 }
    ]
  },
  {
    id: 4,
    name: '바이오',
    change: 5.7,
    stockCount: 67,
    topStocks: [
      { name: '삼성바이오로직스', currentPrice: 876000, change: 28000, changeRate: 3.30 },
      { name: '셀트리온', currentPrice: 198000, change: 9500, changeRate: 5.04 },
      { name: '유한양행', currentPrice: 89600, change: 4200, changeRate: 4.92 },
      { name: '녹십자', currentPrice: 156000, change: 7800, changeRate: 5.26 },
      { name: 'SK바이오팜', currentPrice: 78900, change: 3900, changeRate: 5.20 },
      { name: '한미약품', currentPrice: 234000, change: 11000, changeRate: 4.93 },
      { name: '종근당', currentPrice: 128000, change: 6400, changeRate: 5.26 },
      { name: '대웅제약', currentPrice: 145000, change: 7200, changeRate: 5.23 },
      { name: '에이비엘바이오', currentPrice: 24500, change: 1200, changeRate: 5.15 },
      { name: '레고켐바이오', currentPrice: 56700, change: 2800, changeRate: 5.19 }
    ]
  },
  {
    id: 5,
    name: '수소에너지',
    change: 8.3,
    stockCount: 28,
    topStocks: [
      { name: '두산퓨얼셀', currentPrice: 45600, change: 3200, changeRate: 7.55 },
      { name: '효성중공업', currentPrice: 89400, change: 6800, changeRate: 8.23 },
      { name: '현대로템', currentPrice: 58900, change: 4500, changeRate: 8.27 },
      { name: '에스퓨얼셀', currentPrice: 24500, change: 1800, changeRate: 7.93 },
      { name: '범한퓨얼셀', currentPrice: 34200, change: 2600, changeRate: 8.23 },
      { name: '상아프론테크', currentPrice: 41200, change: 3100, changeRate: 8.14 },
      { name: '미코', currentPrice: 12300, change: 900, changeRate: 7.89 },
      { name: '비나텍', currentPrice: 45600, change: 3500, changeRate: 8.31 },
      { name: '제이엔케이히터', currentPrice: 7890, change: 600, changeRate: 8.23 },
      { name: '유니크', currentPrice: 5670, change: 450, changeRate: 8.62 }
    ]
  },
  {
    id: 6,
    name: '전기차',
    change: -1.8,
    stockCount: 32,
    topStocks: [
      { name: '현대차', currentPrice: 234000, change: -4200, changeRate: -1.76 },
      { name: '기아', currentPrice: 98600, change: -1800, changeRate: -1.79 },
      { name: '현대모비스', currentPrice: 267000, change: -4800, changeRate: -1.77 },
      { name: '현대위아', currentPrice: 78900, change: -1400, changeRate: -1.74 },
      { name: '만도', currentPrice: 56700, change: -1000, changeRate: -1.73 },
      { name: '한온시스템', currentPrice: 12300, change: -220, changeRate: -1.76 },
      { name: '우리산업', currentPrice: 23400, change: -400, changeRate: -1.68 },
      { name: '대유에이텍', currentPrice: 4560, change: -80, changeRate: -1.72 },
      { name: '엠케이전자', currentPrice: 15600, change: -280, changeRate: -1.76 },
      { name: '상신브레이크', currentPrice: 6780, change: -120, changeRate: -1.74 }
    ]
  },
  {
    id: 7,
    name: '메타버스',
    change: 6.4,
    stockCount: 25,
    topStocks: [
      { name: '네이버', currentPrice: 234000, change: 14100, changeRate: 6.41 },
      { name: '카카오', currentPrice: 56700, change: 3400, changeRate: 6.38 },
      { name: '하이브', currentPrice: 189000, change: 11400, changeRate: 6.42 },
      { name: '엔씨소프트', currentPrice: 198000, change: 11900, changeRate: 6.39 },
      { name: '넷마블', currentPrice: 67800, change: 4100, changeRate: 6.43 },
      { name: '펄어비스', currentPrice: 34500, change: 2100, changeRate: 6.47 },
      { name: '위메이드', currentPrice: 45600, change: 2800, changeRate: 6.54 },
      { name: '자이언트스텝', currentPrice: 23400, change: 1500, changeRate: 6.85 },
      { name: '덱스터', currentPrice: 18900, change: 1200, changeRate: 6.78 },
      { name: '위지윅스튜디오', currentPrice: 12300, change: 800, changeRate: 6.96 }
    ]
  },
  {
    id: 8,
    name: '친환경',
    change: 4.9,
    stockCount: 38,
    topStocks: [
      { name: 'SK에코플랜트', currentPrice: 67800, change: 3200, changeRate: 4.95 },
      { name: '한화솔루션', currentPrice: 34500, change: 1600, changeRate: 4.86 },
      { name: 'HD현대에너지', currentPrice: 23400, change: 1100, changeRate: 4.93 },
      { name: 'OCI홀딩스', currentPrice: 123000, change: 6000, changeRate: 5.13 },
      { name: '씨에스윈드', currentPrice: 56700, change: 2800, changeRate: 5.19 },
      { name: '에코โปร', currentPrice: 92300, change: 4500, changeRate: 5.13 },
      { name: '에스에너지', currentPrice: 15600, change: 800, changeRate: 5.41 },
      { name: '대명에너지', currentPrice: 24500, change: 1200, changeRate: 5.15 },
      { name: '유니슨', currentPrice: 5670, change: 280, changeRate: 5.19 },
      { name: '현대건설', currentPrice: 45600, change: 2200, changeRate: 5.07 }
    ]
  }
]

// 업종 목업 데이터
export const mockSectors = [
  {
    id: 1,
    name: '은행',
    change: 4.2,
    stockCount: 8,
    topStocks: [
      { name: 'KB금융', currentPrice: 78900, change: 2800, changeRate: 3.68 },
      { name: '신한지주', currentPrice: 56700, change: 2100, changeRate: 3.85 },
      { name: '하나금융지주', currentPrice: 67800, change: 2500, changeRate: 3.83 },
      { name: '우리금융지주', currentPrice: 18900, change: 700, changeRate: 3.85 },
      { name: 'JB금융지주', currentPrice: 13400, change: 500, changeRate: 3.88 },
      { name: 'BNK금융지주', currentPrice: 9800, change: 400, changeRate: 4.26 },
      { name: 'DGB금융지주', currentPrice: 12300, change: 500, changeRate: 4.24 },
      { name: '기업은행', currentPrice: 23400, change: 900, changeRate: 4.00 },
      { name: '카카오뱅크', currentPrice: 28900, change: 1100, changeRate: 3.96 },
      { name: '제주은행', currentPrice: 15600, change: 600, changeRate: 4.00 }
    ]
  },
  {
    id: 2,
    name: '반도체',
    change: 15.8,
    stockCount: 32,
    topStocks: [
      { name: '삼성전자', currentPrice: 74500, change: 9800, changeRate: 15.15 },
      { name: 'SK하이닉스', currentPrice: 142000, change: 18900, changeRate: 15.35 },
      { name: '한미반도체', currentPrice: 64200, change: 8500, changeRate: 15.26 },
      { name: 'DB하이텍', currentPrice: 52300, change: 6900, changeRate: 15.20 },
      { name: '리노공업', currentPrice: 156000, change: 20800, changeRate: 15.38 },
      { name: '원익IPS', currentPrice: 36500, change: 4900, changeRate: 15.51 },
      { name: 'SFA반도체', currentPrice: 19400, change: 2600, changeRate: 15.48 },
      { name: '주성엔지니어링', currentPrice: 28900, change: 3800, changeRate: 15.14 },
      { name: '고영', currentPrice: 18700, change: 2500, changeRate: 15.43 },
      { name: '이오테크닉스', currentPrice: 167000, change: 22000, changeRate: 15.17 }
    ]
  },
  {
    id: 3,
    name: '자동차',
    change: -2.5,
    stockCount: 24,
    topStocks: [
      { name: '현대차', currentPrice: 234000, change: -6000, changeRate: -2.50 },
      { name: '기아', currentPrice: 98600, change: -2500, changeRate: -2.47 },
      { name: '현대모비스', currentPrice: 267000, change: -6800, changeRate: -2.48 },
      { name: 'HL만도', currentPrice: 56700, change: -1400, changeRate: -2.41 },
      { name: '현대위아', currentPrice: 78900, change: -2000, changeRate: -2.47 },
      { name: '현대글로비스', currentPrice: 189000, change: -4800, changeRate: -2.48 },
      { name: '한온시스템', currentPrice: 12300, change: -300, changeRate: -2.38 },
      { name: '에스엘', currentPrice: 45600, change: -1200, changeRate: -2.56 },
      { name: '평화정공', currentPrice: 6780, change: -170, changeRate: -2.45 },
      { name: '동희오토', currentPrice: 23400, change: -600, changeRate: -2.50 }
    ]
  },
  {
    id: 4,
    name: '화학',
    change: 3.6,
    stockCount: 41,
    topStocks: [
      { name: 'LG화학', currentPrice: 389000, change: 13500, changeRate: 3.60 },
      { name: 'SK이노베이션', currentPrice: 145000, change: 5000, changeRate: 3.57 },
      { name: '한화솔루션', currentPrice: 34500, change: 1200, changeRate: 3.60 },
      { name: '롯데케미칼', currentPrice: 156000, change: 5400, changeRate: 3.59 },
      { name: '금호석유', currentPrice: 123000, change: 4300, changeRate: 3.62 },
      { name: 'KCC', currentPrice: 267000, change: 9300, changeRate: 3.61 },
      { name: '강원에너지', currentPrice: 45600, change: 1600, changeRate: 3.64 },
      { name: '코스모화학', currentPrice: 23400, change: 800, changeRate: 3.54 },
      { name: '대한유화', currentPrice: 189000, change: 6600, changeRate: 3.62 },
      { name: '태광산업', currentPrice: 678000, change: 23000, changeRate: 3.51 }
    ]
  },
  {
    id: 5,
    name: '인터넷',
    change: 7.9,
    stockCount: 19,
    topStocks: [
      { name: '네이버', currentPrice: 234000, change: 17100, changeRate: 7.88 },
      { name: '카카오', currentPrice: 56700, change: 4100, changeRate: 7.80 },
      { name: '크래프톤', currentPrice: 289000, change: 21100, changeRate: 7.88 },
      { name: '엔씨소프트', currentPrice: 198000, change: 14500, changeRate: 7.90 },
      { name: '넷마블', currentPrice: 67800, change: 4900, changeRate: 7.79 },
      { name: '위메이드', currentPrice: 45600, change: 3300, changeRate: 7.80 },
      { name: '펄어비스', currentPrice: 34500, change: 2500, changeRate: 7.81 },
      { name: '컴투스', currentPrice: 78900, change: 5800, changeRate: 7.94 },
      { name: '카카오게임즈', currentPrice: 23400, change: 1700, changeRate: 7.83 },
      { name: '웹젠', currentPrice: 18900, change: 1400, changeRate: 8.00 }
    ]
  },
  {
    id: 6,
    name: '건설',
    change: 2.8,
    stockCount: 35,
    topStocks: [
      { name: '삼성물산', currentPrice: 134000, change: 3600, changeRate: 2.76 },
      { name: '현대건설', currentPrice: 45600, change: 1200, changeRate: 2.70 },
      { name: 'GS건설', currentPrice: 29800, change: 800, changeRate: 2.76 },
      { name: 'DL이앤씨', currentPrice: 67800, change: 1800, changeRate: 2.73 },
      { name: '대우건설', currentPrice: 5890, change: 160, changeRate: 2.79 },
      { name: 'HDC현대산업개발', currentPrice: 15600, change: 450, changeRate: 2.97 },
      { name: 'DL건설', currentPrice: 23400, change: 650, changeRate: 2.86 },
      { name: '금호건설', currentPrice: 7890, change: 220, changeRate: 2.87 },
      { name: '계룡건설', currentPrice: 12300, change: 340, changeRate: 2.84 },
      { name: '동부건설', currentPrice: 5670, change: 160, changeRate: 2.91 }
    ]
  },
  {
    id: 7,
    name: '증권',
    change: 5.3,
    stockCount: 22,
    topStocks: [
      { name: '삼성증권', currentPrice: 45600, change: 2300, changeRate: 5.31 },
      { name: '미래에셋증권', currentPrice: 8900, change: 450, changeRate: 5.33 },
      { name: '키움증권', currentPrice: 123000, change: 6200, changeRate: 5.31 },
      { name: '한국금융지주', currentPrice: 67800, change: 3400, changeRate: 5.28 },
      { name: 'NH투자증권', currentPrice: 12300, change: 620, changeRate: 5.30 },
      { name: '대신증권', currentPrice: 18900, change: 950, changeRate: 5.30 },
      { name: '메리츠증권', currentPrice: 5670, change: 290, changeRate: 5.39 },
      { name: '유안타증권', currentPrice: 3450, change: 170, changeRate: 5.18 },
      { name: '한화투자증권', currentPrice: 4560, change: 230, changeRate: 5.31 },
      { name: '현대차증권', currentPrice: 9800, change: 480, changeRate: 5.15 }
    ]
  },
  {
    id: 8,
    name: '통신',
    change: 1.5,
    stockCount: 12,
    topStocks: [
      { name: 'SK텔레콤', currentPrice: 56700, change: 840, changeRate: 1.50 },
      { name: 'KT', currentPrice: 34500, change: 510, changeRate: 1.50 },
      { name: 'LG유플러스', currentPrice: 12300, change: 180, changeRate: 1.49 },
      { name: 'SK스퀘어', currentPrice: 67800, change: 1000, changeRate: 1.50 },
      { name: '인포바인', currentPrice: 23400, change: 340, changeRate: 1.47 },
      { name: '다산네트웍스', currentPrice: 4560, change: 70, changeRate: 1.56 },
      { name: '우리넷', currentPrice: 8900, change: 130, changeRate: 1.48 },
      { name: '텔코웨어', currentPrice: 12300, change: 180, changeRate: 1.49 },
      { name: '코위버', currentPrice: 5670, change: 80, changeRate: 1.43 },
      { name: '에치에프알', currentPrice: 18900, change: 280, changeRate: 1.50 }
    ]
  }
]
