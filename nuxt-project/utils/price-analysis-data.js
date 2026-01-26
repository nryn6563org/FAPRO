/**
 * 시세분석 데이터 유틸리티
 * 리액트 원본 소스에서 추출된 정적 데이터 및 차트 데이터 정의
 */

// 코스피 차트 데이터
export const kospiData = {
  '1일': [
    { time: '09:00', value: 4827 }, { time: '09:30', value: 4835 }, { time: '10:00', value: 4845 },
    { time: '10:30', value: 4852 }, { time: '11:00', value: 4860 }, { time: '11:30', value: 4868 },
    { time: '12:00', value: 4875 }, { time: '12:30', value: 4882 }, { time: '13:00', value: 4890 },
    { time: '13:30', value: 4897 }
  ],
  '3개월': [
    { time: '10/21', value: 4720 }, { time: '11/01', value: 4760 }, { time: '11/15', value: 4680 },
    { time: '12/01', value: 4820 }, { time: '12/15', value: 4850 }, { time: '01/01', value: 4890 },
    { time: '01/21', value: 4897 }
  ],
  '1년': [
    { time: '01/24', value: 4450 }, { time: '03/24', value: 4620 }, { time: '05/24', value: 4580 },
    { time: '07/24', value: 4720 }, { time: '09/24', value: 4680 }, { time: '11/24', value: 4820 },
    { time: '01/25', value: 4897 }
  ]
}

// 코스닥 차트 데이터
export const kosdaqData = {
  '1일': [
    { time: '09:00', value: 924 }, { time: '09:30', value: 928 }, { time: '10:00', value: 932 },
    { time: '10:30', value: 936 }, { time: '11:00', value: 940 }, { time: '11:30', value: 944 },
    { time: '12:00', value: 948 }, { time: '12:30', value: 950 }
  ],
  '3개월': [
    { time: '10/21', value: 890 }, { time: '11/01', value: 910 }, { time: '11/15', value: 895 },
    { time: '12/01', value: 925 }, { time: '12/15', value: 940 }, { time: '01/01', value: 948 },
    { time: '01/21', value: 950 }
  ],
  '1년': [
    { time: '01/24', value: 627 }, { time: '03/24', value: 714 }, { time: '05/24', value: 801 },
    { time: '07/24', value: 827 }, { time: '09/24', value: 876 }, { time: '11/24', value: 900 },
    { time: '12/25', value: 976 }
  ]
}

// 탭별 시세 현황 데이터
export const priceStatusData = {
  이슈종목: [
    { date: '01/20', time: '09:08', stockName: '유비쿼스', currentPrice: 0, changeRate: 0, issueContent: '피지컬SI 수혜 전망…PBR 역사적 저점 분석에 상승세' },
    { date: '01/20', time: '15:00', stockName: '우진', currentPrice: 25200, changeRate: 13.26, issueContent: '국내 유일 원전 계측기 공급사…후대특형 원전 필요 발...' },
    { date: '01/20', time: '14:30', stockName: '카카오페이', currentPrice: 53800, changeRate: 12.08, issueContent: '스테이블코인 법안 기대에 강세' },
    { date: '01/20', time: '14:28', stockName: '일진파워', currentPrice: 17610, changeRate: 29.96, issueContent: '신규원전 건설 업종 현안 원인 일진 전기철강까지 \'...' },
    { date: '01/20', time: '14:22', stockName: '오로비덱', currentPrice: 5140, changeRate: 25.83, issueContent: '신규 원전 필요 현안 원전계 초기협상 기대감까지...' }
  ],
  '52주신고가': [
    { date: '01/20', time: '15:30', stockName: '삼성전자', currentPrice: 72500, changeRate: 3.42, issueContent: 'AI 반도체 수요 증가로 52주 신고가 경신' },
    { date: '01/20', time: '14:25', stockName: 'SK하이닉스', currentPrice: 145000, changeRate: 4.18, issueContent: 'HBM 공급 확대 소식에 52주 최고가 달성' },
    { date: '01/20', time: '13:15', stockName: '셀트리온', currentPrice: 198500, changeRate: 2.85, issueContent: '바이오시밀러 수출 호조로 신고가 경신' }
  ],
  '52주신저가': [
    { date: '01/20', time: '15:10', stockName: '카카오', currentPrice: 42500, changeRate: -5.22, issueContent: '규제 우려로 52주 신저가 기록' },
    { date: '01/20', time: '14:05', stockName: '네이버', currentPrice: 185000, changeRate: -3.89, issueContent: '광고 매출 감소 우려로 신저가' }
  ],
  상한가: [
    { date: '01/20', time: '09:15', stockName: '보성파워텍', currentPrice: 12500, changeRate: 30.00, issueContent: '원전 수출 호재로 상한가' },
    { date: '01/20', time: '09:20', stockName: '일진파워', currentPrice: 17610, changeRate: 29.96, issueContent: '신규 원전 건설 수혜로 상한가' }
  ],
  하한가: [
    { date: '01/20', time: '09:10', stockName: 'ABC테크', currentPrice: 2450, changeRate: -30.00, issueContent: '실적 악화 우려로 하한가' }
  ],
  거래비중상위: [
    { date: '01/20', time: '15:30', stockName: '삼성전자', currentPrice: 72500, changeRate: 2.11, issueContent: '외국인 순매수 1위, 기관 매수세 집중' }
  ],
  관리종목: [],
  거래정지: [],
  투자주의: [],
  투자경고: [],
  투자위험: []
}
