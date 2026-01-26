/**
 * 고객 관리 데이터 유틸리티
 */

export const mockClients = [
  {
    id: '1',
    name: '김영희',
    email: 'younghee.kim@example.com',
    phone: '010-1234-5678',
    aum: 35000000000,
    riskProfile: 'moderate',
    joinDate: '2023-03-15',
    lastContact: '2026-01-18',
    portfolio: { stocks: 45, bonds: 35, cash: 15, alternatives: 5 },
    returns: 12.5,
    notes: '안정적 투자 선호, 분기별 리밸런싱 요청',
    isFavorite: true
  },
  {
    id: '2',
    name: '이철수',
    email: 'cheolsoo.lee@example.com',
    phone: '010-2345-6789',
    aum: 28000000000,
    riskProfile: 'conservative',
    joinDate: '2022-11-20',
    lastContact: '2026-01-15',
    portfolio: { stocks: 30, bonds: 50, cash: 18, alternatives: 2 },
    returns: 8.3,
    notes: '은퇴 준비 고객, 안전자산 위주',
    isFavorite: false
  },
  {
    id: '3',
    name: '박민수',
    email: 'minsoo.park@example.com',
    phone: '010-3456-7890',
    aum: 22000000000,
    riskProfile: 'aggressive',
    joinDate: '2024-05-10',
    lastContact: '2026-01-19',
    portfolio: { stocks: 70, bonds: 10, cash: 10, alternatives: 10 },
    returns: 18.7,
    notes: '적극적 투자 성향, 테크 섹터 관심 높음',
    isFavorite: true
  },
  {
    id: '4',
    name: '정수진',
    email: 'soojin.jung@example.com',
    phone: '010-4567-8901',
    aum: 18000000000,
    riskProfile: 'moderate',
    joinDate: '2023-08-22',
    lastContact: '2026-01-17',
    portfolio: { stocks: 50, bonds: 30, cash: 15, alternatives: 5 },
    returns: 10.2,
    notes: '자녀 교육비 준비 중, 중기 투자 계획',
    isFavorite: false
  },
  {
    id: '5',
    name: '최동욱',
    email: 'dongwook.choi@example.com',
    phone: '010-5678-9012',
    aum: 15000000000,
    riskProfile: 'conservative',
    joinDate: '2024-01-15',
    lastContact: '2026-01-16',
    portfolio: { stocks: 35, bonds: 45, cash: 18, alternatives: 2 },
    returns: 7.8,
    notes: '안정적 배당 수익 선호',
    isFavorite: true
  },
  {
    id: '6',
    name: '송미경',
    email: 'mikyung.song@example.com',
    phone: '010-6789-0123',
    aum: 42000000000,
    riskProfile: 'aggressive',
    joinDate: '2023-06-12',
    lastContact: '2026-01-20',
    portfolio: { stocks: 65, bonds: 20, cash: 10, alternatives: 5 },
    returns: 15.3,
    notes: '해외주식 투자 비중 확대 희망',
    isFavorite: false
  },
  {
    id: '7',
    name: '강준호',
    email: 'junho.kang@example.com',
    phone: '010-7890-1234',
    aum: 31000000000,
    riskProfile: 'moderate',
    joinDate: '2023-09-05',
    lastContact: '2026-01-19',
    portfolio: { stocks: 48, bonds: 32, cash: 15, alternatives: 5 },
    returns: 11.8,
    notes: 'ESG 투자에 관심 많음',
    isFavorite: true
  },
  {
    id: '8',
    name: '윤지혜',
    email: 'jihye.yoon@example.com',
    phone: '010-8901-2345',
    aum: 26000000000,
    riskProfile: 'conservative',
    joinDate: '2024-02-28',
    lastContact: '2026-01-18',
    portfolio: { stocks: 28, bonds: 52, cash: 18, alternatives: 2 },
    returns: 6.9,
    notes: '주택 구입 자금 준비 중',
    isFavorite: false
  },
  {
    id: '9',
    name: '임태양',
    email: 'taeyang.lim@example.com',
    phone: '010-9012-3456',
    aum: 38000000000,
    riskProfile: 'aggressive',
    joinDate: '2022-12-10',
    lastContact: '2026-01-17',
    portfolio: { stocks: 72, bonds: 12, cash: 8, alternatives: 8 },
    returns: 20.1,
    notes: '바이오/헬스케어 섹터 집중 투자',
    isFavorite: true
  },
  {
    id: '10',
    name: '한소영',
    email: 'soyoung.han@example.com',
    phone: '010-0123-4567',
    aum: 29000000000,
    riskProfile: 'moderate',
    joinDate: '2023-04-18',
    lastContact: '2026-01-16',
    portfolio: { stocks: 52, bonds: 28, cash: 15, alternatives: 5 },
    returns: 13.2,
    notes: '연금 저축 계좌 추가 개설 필요',
    isFavorite: false
  },
  {
    id: '11',
    name: '오성민',
    email: 'seongmin.oh@example.com',
    phone: '010-1357-2468',
    aum: 19000000000,
    riskProfile: 'conservative',
    joinDate: '2024-07-22',
    lastContact: '2026-01-15',
    portfolio: { stocks: 32, bonds: 48, cash: 18, alternatives: 2 },
    returns: 7.2,
    notes: '보수적 자산 배분 선호',
    isFavorite: true
  },
  {
    id: '12',
    name: '서현우',
    email: 'hyunwoo.seo@example.com',
    phone: '010-2468-1357',
    aum: 45000000000,
    riskProfile: 'aggressive',
    joinDate: '2023-01-30',
    lastContact: '2026-01-20',
    portfolio: { stocks: 68, bonds: 15, cash: 10, alternatives: 7 },
    returns: 17.9,
    notes: '반도체 업종 비중 높음',
    isFavorite: false
  },
  {
    id: '13',
    name: '권나영',
    email: 'nayoung.kwon@example.com',
    phone: '010-3690-2581',
    aum: 24000000000,
    riskProfile: 'moderate',
    joinDate: '2023-11-08',
    lastContact: '2026-01-19',
    portfolio: { stocks: 46, bonds: 34, cash: 16, alternatives: 4 },
    returns: 9.8,
    notes: '배당주 중심 포트폴리오 구성',
    isFavorite: true
  },
  {
    id: '14',
    name: '조재훈',
    email: 'jaehun.cho@example.com',
    phone: '010-4812-3690',
    aum: 33000000000,
    riskProfile: 'aggressive',
    joinDate: '2024-03-14',
    lastContact: '2026-01-18',
    portfolio: { stocks: 75, bonds: 8, cash: 12, alternatives: 5 },
    returns: 22.4,
    notes: '신재생 에너지 섹터 관심',
    isFavorite: false
  },
  {
    id: '15',
    name: '배수진',
    email: 'soojin.bae@example.com',
    phone: '010-5924-3681',
    aum: 27000000000,
    riskProfile: 'moderate',
    joinDate: '2023-07-25',
    lastContact: '2026-01-17',
    portfolio: { stocks: 49, bonds: 31, cash: 15, alternatives: 5 },
    returns: 11.3,
    notes: '글로벌 분산투자 선호',
    isFavorite: true
  },
  {
    id: '16',
    name: '신도현',
    email: 'dohyun.shin@example.com',
    phone: '010-6147-2583',
    aum: 21000000000,
    riskProfile: 'conservative',
    joinDate: '2024-05-19',
    lastContact: '2026-01-16',
    portfolio: { stocks: 33, bonds: 47, cash: 18, alternatives: 2 },
    returns: 8.1,
    notes: '안정적 수익 추구, 위험 회피 성향',
    isFavorite: false
  },
  {
    id: '17',
    name: '홍지우',
    email: 'jiwoo.hong@example.com',
    phone: '010-7258-3694',
    aum: 36000000000,
    riskProfile: 'aggressive',
    joinDate: '2022-10-05',
    lastContact: '2026-01-20',
    portfolio: { stocks: 70, bonds: 13, cash: 10, alternatives: 7 },
    returns: 19.6,
    notes: '테마주 단기 매매 선호',
    isFavorite: true
  },
  {
    id: '18',
    name: '남궁민',
    email: 'min.namgung@example.com',
    phone: '010-8369-1470',
    aum: 30000000000,
    riskProfile: 'moderate',
    joinDate: '2023-12-20',
    lastContact: '2026-01-19',
    portfolio: { stocks: 51, bonds: 29, cash: 15, alternatives: 5 },
    returns: 12.7,
    notes: '퇴직연금 자산배분 컨설팅 진행 중',
    isFavorite: false
  }
]

export const getRiskBadgeClass = (risk) => {
  switch (risk) {
    case 'conservative': return 'client-badge-risk--low'
    case 'moderate': return 'client-badge-risk--mid'
    case 'aggressive': return 'client-badge-risk--high'
    default: return ''
  }
}

export const getRiskLabel = (risk) => {
  const map = { conservative: '안정형', moderate: '중립형', aggressive: '공격형' }
  return map[risk] || risk
}

export const getTabLabel = (tab) => {
  const map = { stocks: '주식', bonds: '채권', cash: '현금', alternatives: '대체투자' }
  return map[tab] || tab
}

export const getPortfolioItems = (tab) => {
  const items = {
    stocks: [
      { name: '삼성전자', return: '+12.5%', weight: '30%', date: '2024.03.15' },
      { name: 'SK하이닉스', return: '+28.3%', weight: '20%', date: '2024.05.20' },
      { name: 'NAVER', return: '+8.7%', weight: '15%', date: '2024.08.10' },
      { name: 'LG에너지솔루션', return: '-3.2%', weight: '10%', date: '2024.11.05' },
      { name: '현대차', return: '+5.1%', weight: '5%', date: '2025.01.12' }
    ],
    bonds: [
      { name: '국고채권 10년', return: '+3.2%', weight: '40%', date: '2023.06.10' },
      { name: '회사채 AA+', return: '+4.5%', weight: '30%', date: '2023.09.22' },
      { name: '국고채권 5년', return: '+2.8%', weight: '20%', date: '2024.02.15' },
      { name: '통안채 3년', return: '+2.1%', weight: '10%', date: '2024.07.30' }
    ],
    cash: [
      { name: 'CMA 통장', return: '+2.5%', weight: '65%', date: '2023.03.15' },
      { name: 'MMF', return: '+2.8%', weight: '35%', date: '2024.01.10' }
    ],
    alternatives: [
      { name: '글로벌 부동산 펀드', return: '+6.8%', weight: '50%', date: '2023.11.20' },
      { name: '금 ETF', return: '+11.3%', weight: '30%', date: '2024.04.15' },
      { name: '원자재 펀드', return: '-1.5%', weight: '20%', date: '2024.09.08' }
    ]
  }
  return items[tab] || []
}
