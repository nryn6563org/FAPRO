/**
 * 공시 분석 데이터 유틸리티
 * 리액트 원본 소스에서 추출된 상세 유형 및 서브 필터별 공시 데이터 정의
 */

export const disclosureCategories = [
  '수주공시',
  '지분공시',
  '신규투자공시',
  '전환사채공시',
  '실적공시(확정)',
  '실적공시(잠정)'
]

export const disclosureSubCategories = {
  수주공시: ['매출액 10%이상', '매출액 30%이상', '매출액 50%이상'],
  지분공시: ['주요주주지분변동', '최대주주지분변동'],
  신규투자공시: ['신규투자예정', '신규투자종료예정'],
  전환사채공시: ['전환사채발행공시', '전환사채 청구기간 시작'],
  '실적공시(확정)': ['전체보기', '어닝서프라이즈', '3년최고영업이익'],
  '실적공시(잠정)': ['전체보기', '어닝서프라이즈', '3년최고영업이익']
}

export const mockDisclosureData = {
  수주공시: {
    '매출액 10%이상': [
      { date: '01/22', stockName: '영우디에스피', amount: 7100000000, ratio: 11.9, period: '10개월', title: 'DISPLAY레이저비', counterparty: 'SAMSUNG DISPLAY VIETNAM', aiAnalysis: '삼성디스플레이 베트남 법인향 대규모 장비 수주로 올해 실적 턴어라운드가 기대됩니다.' },
      { date: '01/22', stockName: '아이에스티이', amount: 4400000000, ratio: 10.7, period: '8개월', title: '반도체 Automation 장비 판매', counterparty: '에스케이하이닉스', aiAnalysis: 'SK하이닉스향 자동화 장비 공급으로 반도체 업황 회복의 수혜를 직접적으로 받고 있습니다.' },
      { date: '01/21', stockName: 'HD현대마린엔진', amount: 36500000000, ratio: 11.5, period: '33개월', title: '선박엔진 공급계약', counterparty: 'XIAMEN XMXYG SHIPBUILDING', aiAnalysis: '장기 엔진 공급 계약을 통해 수주 잔고가 안정적으로 확보되었습니다.' }
    ],
    '매출액 30%이상': [
      { date: '01/22', stockName: '브이엠', amount: 18600000000, ratio: 36.4, period: '3개월', title: '반도체 제조장비', counterparty: 'SK hynix Semiconductor', aiAnalysis: '단기 대규모 수주로 1분기 실적 성장이 매우 가파를 것으로 전망됩니다.' }
    ],
    '매출액 50%이상': [
      { date: '01/21', stockName: '엔씨소프트', amount: 45000000000, ratio: 52.3, period: '12개월', title: '게임 라이선스 계약', counterparty: 'Tencent Games', aiAnalysis: '중국 시장 진출 본격화에 따른 라이선스 수익으로 영업이익률 개선이 기대됩니다.' }
    ]
  },
  지분공시: {
    주요주주지분변동: [
      { date: '01/22', stockName: '경농', reporter: '이용진', relationship: '대표이사', reason: '장내매수(+)', changeShares: 33299, totalRatio: 0.17, aiAnalysis: '경영진의 지분 매입은 주가 저평가 인식과 함께 책임 경영 강화 측면에서 긍정적입니다.' },
      { date: '01/21', stockName: '비엠캠텍', reporter: '박영철', relationship: '대표이사', reason: '장내매수(+)', changeShares: 29000, totalRatio: 0.11, aiAnalysis: '최근 주가 하락 구간에서의 내부자 매수는 중요한 반등 시그널일 수 있습니다.' }
    ],
    최대주주지분변동: [
      { date: '01/21', stockName: '대한강업', reporter: '(주)현대재포홀딩스', relationship: '최대주주', reason: '장내매수(+)', changeShares: 300500, totalRatio: 0.48, aiAnalysis: '최대주주의 공격적인 지분 확대는 지배력 강화 및 주주가치 제고에 기여합니다.' }
    ]
  },
  신규투자공시: {
    신규투자예정: [
      { date: '01/20', stockName: '코리아써키트', amount: 99300000000, ratio: 14.6, period: '2026.01.20 ~ 2026.12.31', purpose: '시설증설(첨단 패키징 시장 대응)', aiAnalysis: '고부가 패키징 시장 선점을 위한 대규모 시설 투자로 중장기 성장 동력을 확보했습니다.' },
      { date: '01/16', stockName: '와이엠텍', amount: 39100000000, ratio: 12.9, period: '2026.03.01 ~ 2028.04.30', purpose: '신규시설투자(매출 증대)', aiAnalysis: '생산 능력 확대를 통한 공급 부족 해소 및 점유율 상승이 예상됩니다.' }
    ],
    신규투자종료예정: [
      { date: '01/20', stockName: '한화에어로스페이스', amount: 65000000000, ratio: 8.2, period: '2024.03.01 ~ 2026.01.31', purpose: '항공우주 부품 생산시설 확충', aiAnalysis: '오랜 시간 준비한 생산 기지 완공으로 하반기부터 매출 가시화가 기대됩니다.' }
    ]
  },
  전환사채공시: {
    전환사채발행공시: [
      { date: '01/21', stockName: '비비안', title: '5회차 무기명식 사모 CB', amount: 15000000000, period: '2027.01.29 ~ 2028.12.29', exercisePrice: 2850, ratio: 57.3, aiAnalysis: '대규모 자금 조달로 인한 재무 구조 개선 효과가 있으나 전환 시 희석 위험이 존재합니다.' }
    ],
    '전환사채 청구기간 시작': [
      { date: '01/22', stockName: '블루산업개발', title: '3회차 무보증 사모 CB', amount: 3000000000, period: '2027.01.30 ~ 2028.12.30', exercisePrice: 3541, ratio: 5.9, aiAnalysis: '청구 기간 시작에 따른 잠재적 매도 물량 출회 가능성을 모니터링해야 합니다.' }
    ]
  },
  '실적공시(확정)': {
    전체보기: [
      { date: '01/07', stockName: '하이브', sales: 727181000000, salesYoY: 38.0, op: -42198000000, opYoY: -150.0, ni: -52033000000, niYoY: -216.0, aiAnalysis: '매출 성장에도 불구하고 마케팅비 및 일회성 비용 증가로 수익성이 일시적으로 악화되었습니다.' }
    ],
    어닝서프라이즈: [
      { date: '01/07', stockName: '하이브', sales: 705649000000, salesYoY: 10.0, op: 65919000000, opYoY: 30.0, ni: 15458000000, niYoY: 15.0, aiAnalysis: '주요 아티스트 활동 호조로 시장 컨센서스를 상회하는 견조한 실적을 기록했습니다.' }
    ],
    '3년최고영업이익': [
      { date: '01/07', stockName: '하이브', sales: 705649000000, salesYoY: 10.0, op: 65919000000, opYoY: 30.0, ni: 15458000000, niYoY: 15.0, aiAnalysis: '창사 이래 최대 분기 영업이익을 달성하며 강력한 수익 창출 능력을 입증했습니다.' }
    ]
  },
  '실적공시(잠정)': {
    전체보기: [
      { date: '01/22', stockName: '삼성에스디에스', sales: 3536803000000, salesYoY: -3.0, op: 226101000000, opYoY: 7.0, ni: 187906000000, niYoY: -5.0, aiAnalysis: '클라우드 사업부문의 성장이 전통적인 IT 서비스 매출 감소를 상쇄하며 이익 성장을 견인했습니다.' }
    ],
    어닝서프라이즈: [
      { date: '01/22', stockName: '삼성에스디에스', sales: 3536803000000, salesYoY: -3.0, op: 226101000000, opYoY: 7.0, ni: 187906000000, niYoY: -5.0, aiAnalysis: '어려운 환경 속에서도 운영 효율화를 통해 시장 기대치를 웃도는 영업이익을 달성했습니다.' }
    ],
    '3년최고영업이익': [
      { date: '01/22', stockName: '삼성에스디에스', sales: 3536803000000, salesYoY: -3.0, op: 226101000000, opYoY: 7.0, ni: 187906000000, niYoY: -5.0, aiAnalysis: '연간 기준 역대급 영업이익 행진을 이어가고 있으며 고마진 클라우드 비중이 계속 확대되고 있습니다.' }
    ]
  }
}
