/**
 * 오늘의 이슈 데이터 유틸리티
 * 리액트 원본 소스에서 추출된 정적 데이터 및 초기값 정의
 */

// AI이슈포착 버블 데이터 (국내)
export const domesticBubbles = [
  { keyword: '원전', size: 120, color: 'rgb(244, 67, 54)', x: 35, y: 45 },
  { keyword: '우주항공', size: 100, color: 'rgb(244, 67, 54)', x: 55, y: 45 },
  { keyword: '화장품', size: 90, color: 'rgb(244, 67, 54)', x: 25, y: 30 },
  { keyword: '전선', size: 85, color: 'rgb(244, 67, 54)', x: 45, y: 30 },
  { keyword: 'STO', size: 75, color: 'rgb(244, 67, 54)', x: 20, y: 50 },
  { keyword: '방산', size: 70, color: 'rgb(244, 67, 54)', x: 25, y: 60 },
  { keyword: '전력설비', size: 75, color: 'rgb(244, 67, 54)', x: 45, y: 60 },
  { keyword: '특목', size: 60, color: 'rgb(255, 138, 128)', x: 65, y: 30 },
  { keyword: '반도체', size: 55, color: 'rgb(255, 138, 128)', x: 70, y: 45 },
  { keyword: '바이오', size: 50, color: 'rgb(255, 205, 210)', x: 30, y: 70 },
  { keyword: '자동차', size: 55, color: 'rgb(255, 205, 210)', x: 50, y: 15 },
  { keyword: '제약', size: 45, color: 'rgb(255, 205, 210)', x: 60, y: 15 },
  { keyword: '금융', size: 40, color: 'rgb(255, 205, 210)', x: 40, y: 15 },
  { keyword: '보험', size: 35, color: 'rgb(255, 205, 210)', x: 15, y: 15 },
  { keyword: '운송', size: 35, color: 'rgb(255, 205, 210)', x: 30, y: 15 },
  { keyword: '화학', size: 35, color: 'rgb(255, 205, 210)', x: 10, y: 30 },
  { keyword: '카지노', size: 35, color: 'rgb(255, 205, 210)', x: 60, y: 30 },
  { keyword: '조선', size: 30, color: 'rgb(255, 205, 210)', x: 70, y: 60 },
  { keyword: '전교', size: 30, color: 'rgb(255, 205, 210)', x: 55, y: 60 },
  { keyword: '유도', size: 28, color: 'rgb(255, 205, 210)', x: 15, y: 60 },
  { keyword: '기계', size: 28, color: 'rgb(255, 205, 210)', x: 45, y: 75 },
  { keyword: '태양광', size: 28, color: 'rgb(255, 205, 210)', x: 60, y: 70 },
  { keyword: '정보통신', size: 25, color: 'rgb(99, 180, 255)', x: 25, y: 75 },
  { keyword: '엔터', size: 25, color: 'rgb(99, 180, 255)', x: 18, y: 40 },
  { keyword: '식품', size: 22, color: 'rgb(99, 180, 255)', x: 12, y: 50 },
  { keyword: '건설', size: 20, color: 'rgb(99, 180, 255)', x: 8, y: 42 },
  { keyword: '유통', size: 18, color: 'rgb(171, 215, 255)', x: 12, y: 35 },
  { keyword: '통신', size: 18, color: 'rgb(171, 215, 255)', x: 10, y: 55 }
]

// AI이슈포착 버블 데이터 (미국)
export const usBubbles = [
  { keyword: '금시장', size: 130, color: 'rgb(244, 67, 54)', x: 40, y: 50 },
  { keyword: '시장진입', size: 110, color: 'rgb(244, 67, 54)', x: 60, y: 50 },
  { keyword: '렌탈수요', size: 85, color: 'rgb(99, 135, 220)', x: 35, y: 25 },
  { keyword: '주택시장', size: 80, color: 'rgb(99, 135, 220)', x: 20, y: 40 },
  { keyword: '여행수요', size: 75, color: 'rgb(99, 135, 220)', x: 50, y: 25 },
  { keyword: 'AI전력', size: 70, color: 'rgb(99, 135, 220)', x: 70, y: 35 },
  { keyword: '신용서비스', size: 68, color: 'rgb(99, 135, 220)', x: 80, y: 50 },
  { keyword: '클라우드', size: 65, color: 'rgb(99, 135, 220)', x: 15, y: 60 },
  { keyword: '카지노회복', size: 62, color: 'rgb(99, 135, 220)', x: 25, y: 75 },
  { keyword: '스포츠베팅', size: 60, color: 'rgb(99, 135, 220)', x: 10, y: 25 },
  { keyword: '고용시장', size: 58, color: 'rgb(99, 135, 220)', x: 5, y: 45 },
  { keyword: '구독모델', size: 52, color: 'rgb(99, 135, 220)', x: 40, y: 10 },
  { keyword: '온라인쇼핑', size: 50, color: 'rgb(99, 135, 220)', x: 30, y: 85 },
  { keyword: '모기지', size: 48, color: 'rgb(99, 135, 220)', x: 55, y: 85 },
  { keyword: '신용카드수요', size: 45, color: 'rgb(99, 135, 220)', x: 45, y: 70 },
  { keyword: '자율주행', size: 42, color: 'rgb(99, 135, 220)', x: 70, y: 70 },
  { keyword: '암호화폐', size: 40, color: 'rgb(99, 135, 220)', x: 85, y: 65 },
  { keyword: '금융인프라', size: 35, color: 'rgb(99, 135, 220)', x: 85, y: 30 },
  { keyword: '물류혁신', size: 35, color: 'rgb(99, 135, 220)', x: 62, y: 12 },
  { keyword: '의료정보', size: 32, color: 'rgb(99, 135, 220)', x: 25, y: 12 },
  { keyword: '원자력', size: 30, color: 'rgb(99, 135, 220)', x: 58, y: 65 },
  { keyword: '항공수요', size: 28, color: 'rgb(99, 135, 220)', x: 85, y: 80 },
  { keyword: '배터리', size: 28, color: 'rgb(99, 135, 220)', x: 70, y: 85 },
  { keyword: '방산', size: 25, color: 'rgb(99, 135, 220)', x: 90, y: 45 }
]

// 키워드별 분석 데이터 매핑
export const keywordDataMap = {
  원전: {
    chartData: [
      { date: '12/22', value: 18, 보성파워텍: 22, 우리기술: 19, 일진파워: 21, 우진엔텍: 19 },
      { date: '12/29', value: 21, 보성파워텍: 24, 우리기술: 20, 일진파워: 22, 우진엔텍: 20 },
      { date: '01/06', value: 24, 보성파워텍: 28, 우리기술: 23, 일진파워: 26, 우진엔텍: 22 },
      { date: '01/12', value: 48, 보성파워텍: 58, 우리기술: 45, 일진파워: 54, 우진엔텍: 46 },
      { date: '01/16', value: 84, 보성파워텍: 93, 우리기술: 78, 일진파워: 86, 우진엔텍: 80 }
    ],
    stocks: [
      { name: '보성파워텍', rate: '↑30%' },
      { name: '우리기술', rate: '↑29.97%' },
      { name: '일진파워', rate: '↑29.96%' },
      { name: '한신기계', rate: '↑29.92%' },
      { name: '우진엔텍', rate: '↑28.31%' }
    ],
    news: {
      title: '한-스웨덴, SMR 등 원전 개발·연구 협력…기후부 출범 첫 국제…',
      content: '우리나라와 스웨덴이 소형모듈원자로(SMR) 등 원전 개발·연구·구·관심과 협력 가능성을 타진하기로 했다. 이는 지난해 10월 기후에너지부 출범이후 첫번째…'
    },
    relatedIssues: [1, 2, 3, 4, 5]
  },
  우주항공: {
    chartData: [
      { date: '12/22', value: 25, 한화에어로스페이스: 28, LIG넥스원: 26, 현대로템: 24 },
      { date: '12/29', value: 32, 한화에어로스페이스: 35, LIG넥스원: 33, 현대로템: 30 },
      { date: '01/06', value: 42, 한화에어로스페이스: 46, LIG넥스원: 44, 현대로템: 40 },
      { date: '01/12', value: 58, 한화에어로스페이스: 63, LIG넥스원: 60, 현대로템: 55 },
      { date: '01/16', value: 75, 한화에어로스페이스: 82, LIG넥스원: 78, 현대로템: 72 }
    ],
    stocks: [
      { name: '한화에어로스페이스', rate: '↑42.5%' },
      { name: 'LIG넥스원', rate: '↑38.2%' },
      { name: '현대로템', rate: '↑35.8%' },
      { name: 'KAI', rate: '↑32.1%' },
      { name: '퍼스텍', rate: '↑28.9%' }
    ],
    news: {
      title: '우주항공 산업 육성 정책 발표, 관련주 급등세',
      content: '정부가 우주항공 산업을 미래 성장동력으로 육성하겠다는 정책을 발표하면서 관련 기업들의 주가가 일제히 상승하고 있습니다.'
    },
    relatedIssues: [1, 2] // 편의상 공유
  }
  // 추가 키워드 데이터는 원본 소스 참고하여 확장 가능
}

// 이슈 히스토리 전체 데이터
export const allIssues = [
  {
    id: 1,
    date: '01/20',
    title: '한-스웨덴 SMR 공동개발 MOU 체결',
    trend: 'up',
    changeRate: 18.5,
    summary: '우리나라와 스웨덴이 소형모듈원자로(SMR) 등 원전 개발·연구 협력 가능성을 타진하기로 했다.',
    newsContent: '한국과 스웨덴이 소형모듈원자로(SMR) 공동개발을 위한 양해각서(MOU)를 체결했습니다. 이번 협약으로 양국은 원전 기술 공유와 공동 연구개발을 통해 글로벌 원전 시장에서의 경쟁력을 강화할 계획입니다.'
  },
  {
    id: 2,
    date: '01/19',
    title: '체코 원전 수주 확정, 관련 기업 주가 급등',
    trend: 'up',
    changeRate: 22.3,
    summary: '체코 원전 수주 확정 소식에 원전 관련 기업들의 주가가 급등하고 있습니다.',
    newsContent: '한국이 체코 신규 원전 건설 사업자로 최종 선정되면서 국내 원전 관련 기업들의 주가가 일제히 상승했습니다.'
  },
  {
    id: 3,
    date: '01/18',
    title: 'SMR 개발 가속화, 원전 생태계 확장 기대',
    trend: 'up',
    changeRate: 16.2,
    summary: '소형모듈원자로(SMR) 개발이 가속화되면서 원전 생태계 전반이 주목받고 있습니다.',
    newsContent: '국내 SMR 개발이 본격화되면서 원전 생태계 전반에 긍정적인 영향을 미치고 있습니다.'
  },
  {
    id: 4,
    date: '01/17',
    title: '원전 수출 확대 정책 발표',
    trend: 'up',
    changeRate: 14.8,
    summary: '정부가 원전 수출 확대를 위한 종합 지원책을 발표했습니다.',
    newsContent: '정부가 원전 수출 확대를 위한 종합 지원책을 발표했습니다. 금융 지원 확대, 해외 마케팅 강화 등을 골자로 합니다.'
  },
  {
    id: 5,
    date: '01/16',
    title: '원전 부품 국산화율 95% 달성',
    trend: 'up',
    changeRate: 12.5,
    summary: '원전 핵심 부품의 국산화율이 95%를 넘어서며 기술 자립도가 크게 향상됐습니다.',
    newsContent: '국내 원전 산업의 핵심 부품 국산화율이 95%를 돌파하며 기술 자립도가 크게 향상됐습니다.'
  }
]
