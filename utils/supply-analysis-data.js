/**
 * 수급분석 데이터 유틸리티
 * 리액트 원본 소스에서 추출된 탭별 데이터 정의
 */

// 1. 매수비중 데이터
export const buyRatioData = {
  institution: [
    { date: '01/21', stockName: '삼성전자', buyRatio: 68.5, changeRate: 2.34 },
    { date: '01/21', stockName: 'SK하이닉스', buyRatio: 72.3, changeRate: 3.12 },
    { date: '01/21', stockName: 'LG에너지솔루션', buyRatio: 65.8, changeRate: 1.87 },
    { date: '01/21', stockName: '현대차', buyRatio: 61.2, changeRate: 0.95 },
    { date: '01/21', stockName: '삼성바이오로직스', buyRatio: 59.7, changeRate: -0.42 },
    { date: '01/21', stockName: 'POSCO홀딩스', buyRatio: 70.5, changeRate: 1.76 },
    { date: '01/21', stockName: 'KB금융', buyRatio: 66.3, changeRate: 0.88 },
    { date: '01/21', stockName: '신한지주', buyRatio: 64.1, changeRate: 1.12 },
    { date: '01/21', stockName: 'LG화학', buyRatio: 62.8, changeRate: 2.45 },
    { date: '01/21', stockName: '기아', buyRatio: 60.4, changeRate: 1.55 }
  ],
  foreign: [
    { date: '01/21', stockName: '카카오', buyRatio: 75.4, changeRate: 4.21 },
    { date: '01/21', stockName: '네이버', buyRatio: 70.9, changeRate: 2.88 },
    { date: '01/21', stockName: 'POSCO홀딩스', buyRatio: 68.3, changeRate: 1.56 },
    { date: '01/21', stockName: '삼성SDI', buyRatio: 66.7, changeRate: 2.15 },
    { date: '01/21', stockName: '기아', buyRatio: 63.2, changeRate: 1.23 },
    { date: '01/21', stockName: '셀트리온', buyRatio: 71.8, changeRate: 3.45 },
    { date: '01/21', stockName: 'LG전자', buyRatio: 69.5, changeRate: 0.95 },
    { date: '01/21', stockName: '하이브', buyRatio: 67.2, changeRate: -1.23 },
    { date: '01/21', stockName: 'SK이노베이션', buyRatio: 65.9, changeRate: 2.34 },
    { date: '01/21', stockName: '엔씨소프트', buyRatio: 64.5, changeRate: 1.67 }
  ]
}

// 2. 순매수 데이터
export const netBuyData = {
  institutionKospi: [
    { date: '01/21', stockName: '삼성전자', netBuyAmount: 1500, changeRate: 3.45 },
    { date: '01/21', stockName: '현대차', netBuyAmount: 1000, changeRate: 2.15 },
    { date: '01/21', stockName: 'LG화학', netBuyAmount: 800, changeRate: 1.87 },
    { date: '01/21', stockName: 'POSCO홀딩스', netBuyAmount: 950, changeRate: 2.56 },
    { date: '01/21', stockName: 'KB금융', netBuyAmount: 720, changeRate: 1.34 }
  ],
  institutionKosdaq: [
    { date: '01/21', stockName: 'SK하이닉스', netBuyAmount: 1200, changeRate: 4.21 },
    { date: '01/21', stockName: '셀트리온', netBuyAmount: 700, changeRate: 0.95 },
    { date: '01/21', stockName: '에코프로비엠', netBuyAmount: 850, changeRate: 5.67 },
    { date: '01/21', stockName: '엘앤에프', netBuyAmount: 780, changeRate: 4.32 },
    { date: '01/21', stockName: '포스코퓨처엠', netBuyAmount: 720, changeRate: 3.45 }
  ],
  foreignKospi: [
    { date: '01/21', stockName: '네이버', netBuyAmount: 1400, changeRate: 3.78 },
    { date: '01/21', stockName: '기아', netBuyAmount: 800, changeRate: 1.12 },
    { date: '01/21', stockName: '삼성전자', netBuyAmount: 1250, changeRate: 2.89 },
    { date: '01/21', stockName: '현대모비스', netBuyAmount: 920, changeRate: 1.67 },
    { date: '01/21', stockName: 'LG전자', netBuyAmount: 860, changeRate: 2.34 }
  ],
  foreignKosdaq: [
    { date: '01/21', stockName: '카카오', netBuyAmount: 1300, changeRate: 2.95 },
    { date: '01/21', stockName: 'LG에너지솔루션', netBuyAmount: 1100, changeRate: 2.34 },
    { date: '01/21', stockName: '삼성바이오로직스', netBuyAmount: 900, changeRate: 1.56 },
    { date: '01/21', stockName: '셀트리온헬스케어', netBuyAmount: 980, changeRate: 2.78 },
    { date: '01/21', stockName: '크래프톤', netBuyAmount: 870, changeRate: 3.45 }
  ]
}

// 3. 순매수 상위 신규진입 데이터
export const newEntryData = {
  institution: [
    { date: '01/21', stockName: '한화에어로스페이스', netBuyAmount: 456.78, changeRate: 5.67 },
    { date: '01/21', stockName: 'HD현대중공업', netBuyAmount: 389.45, changeRate: 6.23 },
    { date: '01/21', stockName: '두산에너빌리티', netBuyAmount: 312.67, changeRate: 4.85 },
    { date: '01/21', stockName: '포스코퓨처엠', netBuyAmount: 278.34, changeRate: 3.92 },
    { date: '01/21', stockName: 'HD한국조선해양', netBuyAmount: 245.89, changeRate: 2.78 }
  ],
  foreign: [
    { date: '01/21', stockName: '에코프로비엠', netBuyAmount: 523.12, changeRate: 7.45 },
    { date: '01/21', stockName: '엘앤에프', netBuyAmount: 467.56, changeRate: 5.89 },
    { date: '01/21', stockName: '포스코DX', netBuyAmount: 398.23, changeRate: 4.56 },
    { date: '01/21', stockName: 'SK스퀘어', netBuyAmount: 334.78, changeRate: 3.67 },
    { date: '01/21', stockName: 'HD현대일렉트릭', netBuyAmount: 289.45, changeRate: 2.89 }
  ]
}

// 4. 주요기관 순매수 상위 데이터
export const majorInstitutionData = {
  pension: [
    { date: '01/21', stockName: '삼성전자', netBuyAmount: 854.3, changeRate: 2.85 },
    { date: '01/21', stockName: 'SK하이닉스', netBuyAmount: 723.6, changeRate: 3.42 },
    { date: '01/21', stockName: '한국전력', netBuyAmount: 612.8, changeRate: 5.23 }
  ],
  trust: [
    { date: '01/21', stockName: '현대차', netBuyAmount: 945.7, changeRate: 2.56 },
    { date: '01/21', stockName: 'KB금융', netBuyAmount: 812.5, changeRate: 3.12 },
    { date: '01/21', stockName: '신한지주', netBuyAmount: 734.2, changeRate: 4.67 }
  ],
  private: [
    { date: '01/21', stockName: '카카오', netBuyAmount: 678.9, changeRate: 3.78 },
    { date: '01/21', stockName: '셀트리온', netBuyAmount: 612.4, changeRate: 2.45 },
    { date: '01/21', stockName: '삼성바이오로직스', netBuyAmount: 543.7, changeRate: 4.23 }
  ]
}

// 5. 연속순매수 데이터
export const continuousBuyData = {
  institution: [
    { date: '01/21', stockName: '네이버', consecutiveDays: 22, changeRate: 2.95 },
    { date: '01/21', stockName: '카카오', consecutiveDays: 18, changeRate: 3.42 },
    { date: '01/21', stockName: '엔씨소프트', consecutiveDays: 15, changeRate: 1.87 }
  ],
  foreign: [
    { date: '01/21', stockName: '삼성전자', consecutiveDays: 28, changeRate: 2.78 },
    { date: '01/21', stockName: 'SK하이닉스', consecutiveDays: 25, changeRate: 3.45 },
    { date: '01/21', stockName: 'LG에너지솔루션', consecutiveDays: 20, changeRate: 4.12 }
  ]
}

// 마켓 요약 지표
export const marketSummaryMetrics = [
  { label: '외국인 매매', value: '450.2억', trend: '+12.5%', trendVal: 1, type: 'foreign' },
  { label: '기관 매매', value: '-82.4억', trend: '-2.4%', trendVal: -1, type: 'institution' },
  { label: '연기금 매매', value: '115.8억', trend: '+4.1%', trendVal: 1, type: 'pension' },
  { label: '개인 매매', value: '-367.8억', trend: '+0.8%', trendVal: 1, type: 'retail' }
]
