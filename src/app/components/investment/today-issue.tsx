import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { TrendingUp, TrendingDown, ChevronRight, Sparkles, RefreshCw } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

// AI이슈포착 버블 데이터
interface BubbleData {
  keyword: string;
  size: number;
  color: string;
  x: number;
  y: number;
}

export const aiBubbles: BubbleData[] = [
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
  { keyword: '통신', size: 18, color: 'rgb(171, 215, 255)', x: 10, y: 55 },
];

// 키워드별 데이터
interface KeywordData {
  chartData: any[];
  stocks: { name: string; rate: string }[];
  news: { title: string; content: string };
  relatedIssues: number[];
}

const keywordDataMap: Record<string, KeywordData> = {
  '원전': {
    chartData: [
      { date: '12/22', value: 18, 보성파워텍: 22, 우리기술: 19, 일진파워: 21, 우진엔텍: 19 },
      { date: '12/29', value: 21, 보성파워텍: 24, 우리기술: 20, 일진파워: 22, 우진엔텍: 20 },
      { date: '01/06', value: 24, 보성파워텍: 28, 우리기술: 23, 일진파워: 26, 우진엔텍: 22 },
      { date: '01/12', value: 48, 보성파워텍: 58, 우리기술: 45, 일진파워: 54, 우진엔텍: 46 },
      { date: '01/16', value: 84, 보성파워텍: 93, 우리기술: 78, 일진파워: 86, 우진엔텍: 80 },
    ],
    stocks: [
      { name: '보성파워텍', rate: '↑30%' },
      { name: '우리기술', rate: '↑29.97%' },
      { name: '일진파워', rate: '↑29.96%' },
      { name: '한신기계', rate: '↑29.92%' },
      { name: '우진엔텍', rate: '↑28.31%' },
    ],
    news: {
      title: '한-스웨덴, SMR 등 원전 개발·연구 협력…기후부 출범 첫 국제…',
      content: '우리나라와 스웨덴이 소형모듈원자로(SMR) 등 원전 개발·연구·구·관심과 협력 가능성을 타진하기로 했다. 이는 지난해 10월 기후에너지부 출범이후 첫번째…'
    },
    relatedIssues: [1, 2, 3, 4, 5]
  },
  '우주항공': {
    chartData: [
      { date: '12/22', value: 25, 한화에어로스페이스: 28, 'LIG넥스원': 26, 현대로템: 24 },
      { date: '12/29', value: 32, 한화에어로스페이스: 35, 'LIG넥스원': 33, 현대로템: 30 },
      { date: '01/06', value: 42, 한화에어로스페이스: 46, 'LIG넥스원': 44, 현대로템: 40 },
      { date: '01/12', value: 58, 한화에어로스페이스: 63, 'LIG넥스원': 60, 현대로템: 55 },
      { date: '01/16', value: 75, 한화에어로스페이스: 82, 'LIG넥스원': 78, 현대로템: 72 },
    ],
    stocks: [
      { name: '한화에어로스페이스', rate: '↑42.5%' },
      { name: 'LIG넥스원', rate: '↑38.2%' },
      { name: '현대로템', rate: '↑35.8%' },
      { name: 'KAI', rate: '↑32.1%' },
      { name: '퍼스텍', rate: '↑28.9%' },
    ],
    news: {
      title: '우주항공 산업 육성 정책 발표, 관련주 급등세',
      content: '정부가 우주항공 산업을 미래 성장동력으로 육성하겠다는 정책을 발표하면서 관련 기업들의 주가가 일제히 상승하고 있습니다. 특히 위성 개발 및 발사체 기술을 보유한 기업들이 주목받고 있습니다…'
    },
    relatedIssues: [6, 7, 8, 9, 10]
  },
  '반도체': {
    chartData: [
      { date: '12/22', value: 35, 삼성전자: 38, 'SK하이닉스': 40, 메리츠반도체: 36 },
      { date: '12/29', value: 42, 삼성전자: 45, 'SK하이닉스': 48, 메리츠반도체: 43 },
      { date: '01/06', value: 52, 삼성전자: 56, 'SK하이닉스': 60, 메리츠반도체: 54 },
      { date: '01/12', value: 68, 삼성전자: 72, 'SK하이닉스': 78, 메리츠반도체: 70 },
      { date: '01/16', value: 85, 삼성전자: 90, 'SK하이닉스': 95, 메리츠반도체: 88 },
    ],
    stocks: [
      { name: '삼성전자', rate: '↑15.3%' },
      { name: 'SK하이닉스', rate: '↑18.7%' },
      { name: '메리츠반도체', rate: '↑12.4%' },
      { name: '한미반도체', rate: '↑10.2%' },
      { name: '원익IPS', rate: '↑9.8%' },
    ],
    news: {
      title: 'AI 반도체 수요 급증, 국내 기업 수혜 전망',
      content: 'NVIDIA와 AMD의 실적 호조로 국내 AI 반도체 관련주들이 동반 상승세를 보이고 있습니다. 메모리 반도체 뿐만 아니라 시스템 반도체 기업들도 주목받고 있습니다…'
    },
    relatedIssues: [11, 12, 13, 14, 15]
  },
  '방산': {
    chartData: [
      { date: '12/22', value: 30, 한화에어로스페이스: 33, 'LIG넥스원': 32, 현대로템: 31 },
      { date: '12/29', value: 38, 한화에어로스페이스: 42, 'LIG넥스원': 40, 현대로템: 39 },
      { date: '01/06', value: 48, 한화에어로스페이스: 53, 'LIG넥스원': 51, 현대로템: 49 },
      { date: '01/12', value: 62, 한화에어로스페이스: 68, 'LIG넥스원': 65, 현대로템: 63 },
      { date: '01/16', value: 78, 한화에어로스페이스: 85, 'LIG넥스원': 82, 현대로템: 79 },
    ],
    stocks: [
      { name: '한화에어로스페이스', rate: '↑22.5%' },
      { name: 'LIG넥스원', rate: '↑21.8%' },
      { name: '현대로템', rate: '↑20.3%' },
      { name: '풍산', rate: '↑18.9%' },
      { name: '빅텍', rate: '↑17.2%' },
    ],
    news: {
      title: 'K-방산 수주 호재, 관련주 급등',
      content: '폴란드 추가 수주 확정 소식에 방산 업종이 강세를 보이며 투자자들의 관심이 집중되고 있습니다. 유럽과 중동 지역에서의 추가 수주 가능성도 높아지고 있습니다…'
    },
    relatedIssues: [16, 17, 18, 19, 20]
  },
  '바이오': {
    chartData: [
      { date: '12/22', value: 28, 삼성바이오로직스: 30, 셀트리온: 32, 유한양행: 29 },
      { date: '12/29', value: 35, 삼성바이오로직스: 38, 셀트리온: 40, 유한양행: 36 },
      { date: '01/06', value: 45, 삼성바이오로직스: 48, 셀트리온: 52, 유한양행: 46 },
      { date: '01/12', value: 60, 삼성바이오로직스: 64, 셀트리온: 68, 유한양행: 62 },
      { date: '01/16', value: 80, 삼성바이오로직스: 85, 셀트리온: 92, 유한양행: 82 },
    ],
    stocks: [
      { name: '삼성바이오로직스', rate: '↑35.2%' },
      { name: '셀트리온', rate: '↑38.5%' },
      { name: '유한양행', rate: '↑32.8%' },
      { name: '녹십자', rate: '↑28.4%' },
      { name: '한미약품', rate: '↑25.9%' },
    ],
    news: {
      title: '바이오 신약 임상 3상 성공, 기대감 고조',
      content: '국내 바이오 기업의 항암제 임상 3상 성공 소식에 관련주들이 급등하고 있습니다. FDA 승인 가능성이 높아지면서 투자자들의 관심이 집중되고 있습니다…'
    },
    relatedIssues: [21, 22, 23, 24, 25]
  },
  '금융': {
    chartData: [
      { date: '12/22', value: 22, 'KB금융': 24, 신한지주: 23, 하나금융지주: 22 },
      { date: '12/29', value: 28, 'KB금융': 30, 신한지주: 29, 하나금융지주: 28 },
      { date: '01/06', value: 36, 'KB금융': 39, 신한지주: 37, 하나금융지주: 36 },
      { date: '01/12', value: 48, 'KB금융': 52, 신한지주: 50, 하나금융지주: 48 },
      { date: '01/16', value: 62, 'KB금융': 67, 신한지주: 64, 하나금융지주: 62 },
    ],
    stocks: [
      { name: 'KB금융', rate: '↑8.7%' },
      { name: '신한지주', rate: '↑7.9%' },
      { name: '하나금융지주', rate: '↑7.2%' },
      { name: '우리금융지주', rate: '↑6.8%' },
      { name: 'BNK금융지주', rate: '↑5.9%' },
    ],
    news: {
      title: '금리 인하 기대감에 은행주 랠리',
      content: '미 연준의 금리 인하 시사로 국내 은행주들이 일제히 강세를 보이고 있습니다. 순이자마진(NIM) 개선 기대감도 함께 작용하고 있습니다…'
    },
    relatedIssues: [26, 27, 28, 29, 30]
  },
  '화장품': {
    chartData: [
      { date: '12/22', value: 20, 'LG생활건강': 22, '아모레퍼시픽': 24, '코스맥스': 21 },
      { date: '12/29', value: 26, 'LG생활건강': 28, '아모레퍼시픽': 31, '코스맥스': 27 },
      { date: '01/06', value: 34, 'LG생활건강': 37, '아모레퍼시픽': 40, '코스맥스': 35 },
      { date: '01/12', value: 46, 'LG생활건강': 50, '아모레퍼시픽': 54, '코스맥스': 47 },
      { date: '01/16', value: 60, 'LG생활건강': 65, '아모레퍼시픽': 70, '코스맥스': 62 },
    ],
    stocks: [
      { name: 'LG생활건강', rate: '↑12.5%' },
      { name: '아모레퍼시픽', rate: '↑15.3%' },
      { name: '코스맥스', rate: '↑10.8%' },
      { name: '한국콜마', rate: '↑9.2%' },
      { name: '코스메카코리아', rate: '↑8.5%' },
    ],
    news: {
      title: 'K-뷰티 중국 시장 반등, 화장품주 강세',
      content: '중국 시장에서 K-뷰티 제품들의 판매가 다시 증가하면서 국내 화장품 관련주들이 상승세를 보이고 있습니다. 면세점 매출도 함께 증가하고 있습니다…'
    },
    relatedIssues: [31, 32, 33, 34, 35]
  },
  '자동차': {
    chartData: [
      { date: '12/22', value: 18, 현대차: 20, 기아: 22, '현대모비스': 19 },
      { date: '12/29', value: 24, 현대차: 26, 기아: 28, '현대모비스': 25 },
      { date: '01/06', value: 32, 현대차: 35, 기아: 37, '현대모비스': 33 },
      { date: '01/12', value: 44, 현대차: 48, 기아: 51, '현대모비스': 45 },
      { date: '01/16', value: 58, 현대차: 63, 기아: 67, '현대모비스': 60 },
    ],
    stocks: [
      { name: '현대차', rate: '↑11.2%' },
      { name: '기아', rate: '↑13.5%' },
      { name: '현대모비스', rate: '↑10.8%' },
      { name: '만도', rate: '↑9.4%' },
      { name: 'HL만도', rate: '↑8.7%' },
    ],
    news: {
      title: '전기차 시장 확대 전망, 자동차주 주목',
      content: '글로벌 전기차 시장이 지속적으로 성장하면서 국내 완성차 및 부품 업체들에 대한 기대감이 높아지고 있습니다. 특히 배터리 기술 혁신이 주목받고 있습니다…'
    },
    relatedIssues: [36, 37, 38, 39, 40]
  },
};

// 이슈 전체 데이터
const allIssues = [
  // 원전 관련 (최근 5일)
  {
    id: 1,
    date: '01/20',
    title: '한-스웨덴 SMR 공동개발 MOU 체결',
    trend: 'up',
    changeRate: 18.5,
    summary: '우리나라와 스웨덴이 소형모듈원자로(SMR) 등 원전 개발·연구 협력 가능성을 타진하기로 했다.',
    newsContent: '한국과 스웨덴이 소형모듈원자로(SMR) 공동개발을 위한 양해각서(MOU)를 체결했습니다. 이번 협약으로 양국은 원전 기술 공유와 공동 연구개발을 통해 글로벌 원전 시장에서의 경쟁력을 강화할 계획입니다. 특히 차세대 원전 기술인 SMR 분야에서 협력을 확대하기로 했습니다.'
  },
  {
    id: 2,
    date: '01/19',
    title: '체코 원전 수주 확정, 관련 기업 주가 급등',
    trend: 'up',
    changeRate: 22.3,
    summary: '체코 원전 수주 확정 소식에 원전 관련 기업들의 주가가 급등하고 있습니다.',
    newsContent: '한국이 체코 신규 원전 건설 사업자로 최종 선정되면서 국내 원전 관련 기업들의 주가가 일제히 상승했습니다. 두산에너빌리티를 비롯한 주요 원전 설비 업체들은 장중 상한가를 기록했으며, 이번 수주로 약 24조 원 규모의 경제 효과가 예상됩니다.'
  },
  {
    id: 3,
    date: '01/18',
    title: 'SMR 개발 가속화, 원전 생태계 확장 기대',
    trend: 'up',
    changeRate: 16.2,
    summary: '소형모듈원자로(SMR) 개발이 가속화되면서 원전 생태계 전반이 주목받고 있습니다.',
    newsContent: '국내 SMR 개발이 본격화되면서 원전 생태계 전반에 긍정적인 영향을 미치고 있습니다. 정부는 2028년까지 SMR 표준설계 인가를 목표로 하고 있으며, 관련 부품 및 소재 기업들도 동반 성장할 것으로 전망됩니다. 전문가들은 SMR 시장 규모가 2035년까지 3000억 달러에 달할 것으로 예측하고 있습니다.'
  },
  {
    id: 4,
    date: '01/17',
    title: '원전 수출 확대 정책 발표',
    trend: 'up',
    changeRate: 14.8,
    summary: '정부가 원전 수출 확대를 위한 종합 지원책을 발표했습니다.',
    newsContent: '정부가 원전 수출 확대를 위한 종합 지원책을 발표했습니다. 금융 지원 확대, 해외 마케팅 강화, 기술 개발 투자 등을 통해 2030년까지 글로벌 원전 시장 점유율 20%를 목표로 하고 있습니다. 특히 중동과 동유럽 시장 공략에 집중할 계획입니다.'
  },
  {
    id: 5,
    date: '01/16',
    title: '원전 부품 국산화율 95% 달성',
    trend: 'up',
    changeRate: 12.5,
    summary: '원전 핵심 부품의 국산화율이 95%를 넘어서며 기술 자립도가 크게 향상됐습니다.',
    newsContent: '국내 원전 산업의 핵심 부품 국산화율이 95%를 돌파하며 기술 자립도가 크게 향상됐습니다. 원자로 냉각재 펌프, 증기발생기 등 주요 부품의 국산화에 성공하면서 수입 의존도를 낮추고 원가 경쟁력을 확보했습니다. 이는 해외 수주 경쟁에서도 큰 강점으로 작용할 전망입니다.'
  },
  // 우주항공 관련
  {
    id: 6,
    date: '01/20',
    title: '우주 산업 육성법 국회 통과',
    trend: 'up',
    changeRate: 25.8,
    summary: '우주 산업 육성법이 국회를 통과하면서 관련 기업들에 대��� 투자 심리가 개선되고 있습니다.',
    newsContent: '우주 산업 육성을 위한 특별법이 국회 본회의를 통과했습니다. 이번 법안은 우주 개발 예산 확대, 민간 기업 지원 강화, 국제 협력 확대 등을 주요 내용으로 하고 있습니다. 2030년까지 우주 산업 규모를 15조 원으로 확대하고, 달 탐사와 위성 발사 능력을 강화할 계획입니다.'
  },
  {
    id: 7,
    date: '01/19',
    title: '한국형 발사체 3연속 성공',
    trend: 'up',
    changeRate: 28.3,
    summary: '누리호 3차 발사가 성공하면서 우주 발사체 기술력을 입증했습니다.',
    newsContent: '한국형 발사체 누리호가 3차 발사에도 성공하면서 독자적인 위성 발사 능력을 확고히 했습니다. 이번 발사로 실용위성 8기를 궤도에 안착시키는 데 성공했으며, 향후 상업 위성 발사 시장 진출의 기반을 마련했습니다.'
  },
  {
    id: 8,
    date: '01/18',
    title: '달 탐사 프로젝트 2단계 착수',
    trend: 'up',
    changeRate: 21.5,
    summary: '정부가 달 탐사 프로젝트 2단계에 착수하며 우주 탐사를 본격화합니다.',
    newsContent: '정부가 달 탐사 프로젝트 2단계에 착수했습니다. 2030년까지 달 착륙선을 개발하고, 2032년 달 착륙을 목표로 하고 있습니다. 이를 위해 향후 5년간 3조 원의 예산을 투입할 계획이며, 민간 기업들도 적극 참여할 전망입니다.'
  },
  {
    id: 9,
    date: '01/17',
    title: '위성통신 시장 진출 본격화',
    trend: 'up',
    changeRate: 19.7,
    summary: '국내 기업들이 글로벌 위성통신 시장 진출을 본격화하고 있습니다.',
    newsContent: '국내 위성 제조 및 통신 기업들이 글로벌 시장 진출을 가속화하고 있습니다. 저궤도 위성 통신 서비스 개발에 박차를 가하고 있으며, 2025년 첫 서비스 출시를 목표로 하고 있습니다. 글로벌 위성통신 시장 규모는 2030년까지 500억 달러로 성장할 전망입니다.'
  },
  {
    id: 10,
    date: '01/16',
    title: '우주 방산 기술 개발 가속',
    trend: 'up',
    changeRate: 23.2,
    summary: '우주 기반 군사 기술 개발이 가속화되고 있습니다.',
    newsContent: '우주 기반 감시정찰 및 통신 시스템 개발이 본격화되고 있습니다. 군사용 통신위성과 정찰위성 개발에 향후 3년간 2조 원을 투입할 계획이며, 이는 국방 우주력 강화의 핵심 과제로 추진됩니다.'
  },
  // 반도체 관련
  {
    id: 11,
    date: '01/20',
    title: 'AI 반도체 수요 급증, 관련주 강세',
    trend: 'up',
    changeRate: 15.3,
    summary: 'NVIDIA와 AMD의 실적 호조로 국내 AI 반도체 관련주들이 동반 상승세를 보이고 있습니다.',
    newsContent: 'AI 반도체 수요가 폭발적으로 증가하면서 국내 메모리 반도체 업체들이 수혜를 입고 있습니다. 삼성전자와 SK하이닉스는 HBM(고대역폭메모리) 생산을 확대하고 있으며, 2025년 매출이 전년 대비 40% 이상 증가할 것으로 전망됩니다.'
  },
  {
    id: 12,
    date: '01/19',
    title: '차세대 반도체 공정 개발 성공',
    trend: 'up',
    changeRate: 18.2,
    summary: '2나노 공정 개발에 성공하며 글로벌 경쟁력을 확보했습니다.',
    newsContent: '국내 반도체 기업이 2나노 공정 개발에 성공하며 글로벌 파운드리 시장에서 경쟁력을 한층 강화했습니다. 이는 TSMC와의 기술 격차를 좁히는 중요한 성과로 평가받고 있으며, 2026년 양산을 목표로 하고 있습니다.'
  },
  {
    id: 13,
    date: '01/18',
    title: '반도체 장비 국산화 성과',
    trend: 'up',
    changeRate: 13.8,
    summary: '핵심 반도체 장비의 국산화율이 크게 향상됐습니다.',
    newsContent: '국내 반도체 장비 업체들이 핵심 장비 개발에 성공하며 국산화율을 높이고 있습니다. 특히 EUV 노광 관련 부품과 검사 장비에서 두각을 나타내고 있으며, 이는 반도체 생산 비용 절감에도 기여할 전망입니다.'
  },
  {
    id: 14,
    date: '01/17',
    title: '시스템 반도체 투자 확대',
    trend: 'up',
    changeRate: 16.5,
    summary: '비메모리 반도체 분야에 대규모 투자가 진행되고 있습니다.',
    newsContent: '정부와 민간이 시스템 반도체 육성에 향후 10년간 150조 원을 투입하기로 했습니다. AI 반도체, 자동차용 반도체 등 고부가가치 분야에 집중 투자하며, 2030년까지 글로벌 시장 점유율 10%를 목표로 하고 있습니다.'
  },
  {
    id: 15,
    date: '01/16',
    title: '반도체 인력 양성 프로그램 강화',
    trend: 'up',
    changeRate: 11.2,
    summary: '반도체 전문인력 부족 해소를 위한 대책이 발표됐습니다.',
    newsContent: '정부가 반도체 전문인력 양성을 위해 대학 정원 확대와 특성화 대학원 신설을 추진합니다. 2030년까지 15만 명의 반도체 인력을 양성하고, 산학 협력을 통한 실무 교육도 강화할 계획입니다.'
  },
  // 방산 관련
  {
    id: 16,
    date: '01/20',
    title: 'K-방산 폴란드 추가 수주 확정',
    trend: 'up',
    changeRate: 22.5,
    summary: '폴란드 추가 수주 확정 소식에 방산 업종이 강세를 보이며 투자자들의 관심이 집중되고 있습니다.',
    newsContent: '한국 방산 기업들이 폴란드로부터 K2 전차, K9 자주포 추가 수주를 확정했습니다. 계약 규모는 약 5조 원으로, 기존 계약 포함 총 15조 원 규모의 대형 프로젝트가 되었습니다. 이는 K-방산의 글로벌 경쟁력을 입증하는 쾌거로 평가받고 있습니다.'
  },
  {
    id: 17,
    date: '01/19',
    title: '중동 지역 방산 수출 협상 진행',
    trend: 'up',
    changeRate: 19.8,
    summary: '중동 국가들과의 방산 수출 협상이 활발히 진행되고 있습니다.',
    newsContent: 'UAE, 사우디아라비아 등 중동 국가들과 대규모 방산 수출 협상이 진행 중입니다. K9 자주포, 천궁 방공 시스템 등이 주요 협상 품목이며, 계약이 성사될 경우 10조 원 이상의 수출 효과가 예상됩니다.'
  },
  {
    id: 18,
    date: '01/18',
    title: '차세대 전투기 개발 가속화',
    trend: 'up',
    changeRate: 21.3,
    summary: 'KF-21 양산 일정이 앞당겨지며 관련 기업들이 주목받고 있습니다.',
    newsContent: '한국형 전투기 KF-21의 양산 일정이 예정보다 6개월 앞당겨졌습니다. 2026년부터 본격적인 양산에 돌입하며, 향후 해외 수출도 적극 추진할 계획입니다. 인도네시아를 비롯한 여러 국가가 도입 의사를 표명하고 있습니다.'
  },
  {
    id: 19,
    date: '01/17',
    title: '무인 전투체계 개발 본격화',
    trend: 'up',
    changeRate: 24.7,
    summary: 'AI 기반 무인 전투체계 개발이 본격화되고 있습니다.',
    newsContent: '국방부가 AI 기반 무인 전투체계 개발에 본격 착수했습니다. 무인 전투기, 무인 전투차량 등을 2028년까지 개발할 계획이며, 이를 위해 3조 원의 연구개발비를 투입합니다. 이는 미래 전장 환경에 대비한 핵심 사업으로 추진됩니다.'
  },
  {
    id: 20,
    date: '01/16',
    title: '방산 수출 100억 달러 돌파',
    trend: 'up',
    changeRate: 26.2,
    summary: '2025년 방산 수출액이 사상 최초로 100억 달러를 돌파했습니다.',
    newsContent: '한국의 방산 수출액이 사상 최초로 100억 달러를 넘어섰습니다. 이는 전년 대비 50% 증가한 수치로, K-방산의 글로벌 위상을 확인시켰습니다. 정부는 2027년까지 200억 달러 수출을 목표로 하고 있습니다.'
  },
  // 바이오 관련
  {
    id: 21,
    date: '01/20',
    title: '바이오 신약 임상 3상 성공',
    trend: 'up',
    changeRate: 35.2,
    summary: '국내 바이오 기업의 항암제 임상 3상 성공 소식에 관련주들이 급등하고 있습니다.',
    newsContent: '국내 바이오 기업이 개발한 항암 신약이 임상 3상에서 성공적인 결과를 얻었습니다. 기존 치료제 대비 생존율을 30% 향상시킨 것으로 나타났으며, FDA 승인을 위한 신청을 준비 중입니다. 글로벌 시장 규모는 연간 50억 달러로 추정됩니다.'
  },
  {
    id: 22,
    date: '01/19',
    title: 'mRNA 백신 기술 국산화 성공',
    trend: 'up',
    changeRate: 28.5,
    summary: 'mRNA 백신 플랫폼 기술 개발에 성공했습니다.',
    newsContent: '국내 바이오 기업이 mRNA 백신 플랫폼 기술 개발에 성공하며 차세대 백신 개발의 기반을 마련했습니다. 이 기술은 코로나19뿐만 아니라 독감, 암 백신 등 다양한 분야에 적용될 수 있어 시장 잠재력이 큽니다.'
  },
  {
    id: 23,
    date: '01/18',
    title: '바이오시밀러 글로벌 수출 확대',
    trend: 'up',
    changeRate: 31.8,
    summary: '국내 바이오시밀러 제품의 글로벌 수출이 급증하고 있습니다.',
    newsContent: '국내 바이오 기업들의 바이오시밀러 제품이 미국과 유럽 시장에서 큰 성공을 거두고 있습니다. 올해 수출액은 전년 대비 60% 증가한 80억 달러를 기록할 전망이며, 글로벌 시장 점유율도 15%로 확대됐습니다.'
  },
  {
    id: 24,
    date: '01/17',
    title: '세포·유전자 치료제 개발 가속',
    trend: 'up',
    changeRate: 29.3,
    summary: '차세대 치료제인 세포·유전자 치료제 개발이 본격화되고 있습니다.',
    newsContent: '국내 바이오 기업들이 세포 치료제와 유전자 치료제 개발에 박차를 가하고 있습니다. 정부는 이 분야 육성을 위해 향후 5년간 2조 원을 지원할 계획이며, 2030년까지 글로벌 시장 점유율 10% 달성을 목표로 하고 있습니다.'
  },
  {
    id: 25,
    date: '01/16',
    title: '바이오 벤처 투자 붐 지속',
    trend: 'up',
    changeRate: 27.6,
    summary: '바이오 벤처 기업에 대한 투자가 활발히 이루어지고 있습니다.',
    newsContent: '국내외 투자자들의 바이오 벤처 투자가 지속되고 있습니다. 올해 1분기에만 1조 원 이상의 투자금이 유치됐으며, 특히 AI 기반 신약 개발 기업들이 주목받고 있습니다. 전문가들은 바이오 산업이 향후 10년간 한국 경제의 핵심 성장 동력이 될 것으로 전망하고 있습니다.'
  },
  // 금융 관련
  {
    id: 26,
    date: '01/20',
    title: '금리 인하 기대감에 은행주 랠리',
    trend: 'up',
    changeRate: 8.7,
    summary: '미 연준의 금리 인하 시사로 국내 은행주들이 일제히 강세를 보이고 있습니다.',
    newsContent: '미국 연방준비제도의 금리 인하 시사로 글로벌 금융시장이 반등하고 있습니다. 국내 은행주들도 동반 상승하며, 특히 대형 시중은행들의 주가가 5% 이상 급등했습니다. 금리 인하 시 순이자마진 개선과 대출 수요 증가가 예상됩니다.'
  },
  {
    id: 27,
    date: '01/19',
    title: '디지털 금융 혁신 가속화',
    trend: 'up',
    changeRate: 12.3,
    summary: '금융권의 디지털 전환이 빠르게 진행되고 있습니다.',
    newsContent: '국내 금융권이 AI와 빅데이터를 활용한 디지털 금융 서비스를 속속 출시하고 있습니다. 비대면 금융 서비스 이용률이 70%를 넘어섰으며, 금융권은 IT 투자를 전년 대비 30% 확대할 계획입니다.'
  },
  {
    id: 28,
    date: '01/18',
    title: '자산운용사 수익률 개선',
    trend: 'up',
    changeRate: 10.5,
    summary: '국내 자산운용사들의 운용 성과가 크게 개선되고 있습니다.',
    newsContent: '국내 주요 자산운용사들의 펀드 수익률이 크게 개선되면서 자금 유입이 가속화되고 있습니다. 올해 주식형 펀드 평균 수익률은 15%를 넘어섰으며, 해외 주식 펀드로의 투자도 활발합니다.'
  },
  {
    id: 29,
    date: '01/17',
    title: '보험사 실적 개선 기대',
    trend: 'up',
    changeRate: 9.2,
    summary: '생명보험사들의 실적 개선이 기대되고 있습니다.',
    newsContent: '금리 하락 기조 속에서 보험사들의 투자 수익률이 개선되고 있습니다. 특히 주식과 대체투자 비중을 확대한 보험사들이 좋은 성과를 내고 있으며, 1분기 순이익은 전년 동기 대비 20% 이상 증가할 전망입니다.'
  },
  {
    id: 30,
    date: '01/16',
    title: '핀테크 기업 성장세 지속',
    trend: 'up',
    changeRate: 15.8,
    summary: '국내 핀테크 기업들의 성장세가 지속되고 있습니다.',
    newsContent: '국내 핀테크 기업들이 빠른 성장세를 이어가고 있습니다. 간편결제, 디지털 자산 거래 등 다양한 분야에서 이용자가 급증하고 있으며, 올해 핀테크 시장 규모는 30조 원을 넘어설 전망입니다.'
  },
  // 화장품 관련
  {
    id: 31,
    date: '01/20',
    title: 'K-뷰티 중국 시장 반등',
    trend: 'up',
    changeRate: 12.3,
    summary: '중국 시장에서 K-뷰티 제품들의 판매가 다시 증가하면서 화장품 업종이 강세입니다.',
    newsContent: '중국 시장에서 K-뷰티 제품들의 판매가 본격 반등하고 있습니다. 특히 스킨케어와 색조 화장품 분야에서 한국 브랜드의 시장 점유율이 상승하고 있으며, 올해 중국 수출액은 전년 대비 40% 증가할 전망입니다.'
  },
  {
    id: 32,
    date: '01/19',
    title: '글로벌 뷰티 시장 진출 확대',
    trend: 'up',
    changeRate: 14.7,
    summary: '국내 화장품 기업들의 글로벌 시장 진출이 가속화되고 있습니다.',
    newsContent: '국내 화장품 기업들이 미국, 유럽 등 글로벌 시장 공략을 강화하고 있습니다. 온라인 플랫폼을 활용한 직접 판매가 확대되고 있으며, 현지 유명 유통망과의 파트너십도 늘어나고 있습니다.'
  },
  {
    id: 33,
    date: '01/18',
    title: '친환경 화장품 수요 급증',
    trend: 'up',
    changeRate: 16.2,
    summary: '비건, 친환경 화장품에 대한 소비자 수요가 크게 증가하고 있습니다.',
    newsContent: 'ESG 경영이 확산되면서 비건, 친환경 화장품 시장이 급성장하고 있습니다. 국내 주요 화장품 기업들은 친환경 제품 라인업을 확대하고 있으며, 이 분야 매출이 전체의 30%를 차지할 정도로 성장했습니다.'
  },
  {
    id: 34,
    date: '01/17',
    title: '남성 화장품 시장 확대',
    trend: 'up',
    changeRate: 18.5,
    summary: '남성 그루밍 시장이 빠르게 성장하고 있습니다.',
    newsContent: '남성 화장품 시장이 빠른 성장세를 보이고 있습니다. MZ세대 남성들의 외모 관리 관심도가 높아지면서 남성 전용 스킨케어, 색조 제품 수요가 급증하고 있으며, 시장 규모는 연간 2조 원에 달합니다.'
  },
  {
    id: 35,
    date: '01/16',
    title: '화장품 ODM 기업 수출 호조',
    trend: 'up',
    changeRate: 13.8,
    summary: '화장품 ODM 기업들의 해외 수출이 증가하고 있습니다.',
    newsContent: '국내 화장품 ODM 기업들이 글로벌 브랜드들로부터 수주를 확대하고 있습니다. 기술력과 품질을 인정받아 유럽, 미국 명품 브랜드들의 제조를 맡고 있으며, 올해 수출액은 50억 달러를 넘어설 전망입니다.'
  },
  // 자동차 관련
  {
    id: 36,
    date: '01/20',
    title: '전기차 보조금 확대 발표',
    trend: 'up',
    changeRate: 9.8,
    summary: '정부의 전기차 보조금 확대 정책 발표로 자동차 관련주들이 반등세를 보이고 있습니다.',
    newsContent: '정부가 전기차 구매 보조금을 대폭 확대한다고 발표했습니다. 차량당 최대 1000만 원까지 지원하며, 충전 인프라 구축에도 5조 원을 투입할 계획입니다. 이에 따라 국내 전기차 시장이 더욱 활성화될 전망입니다.'
  },
  {
    id: 37,
    date: '01/19',
    title: '자율주행 기술 상용화 임박',
    trend: 'up',
    changeRate: 13.5,
    summary: '레벨 3 자율주행 기술의 상용화가 임박했습니다.',
    newsContent: '국내 완성차 기업들이 레벨 3 자율주행 기술 상용화를 앞두고 있습니다. 올해 하반기부터 고속도로에서 자율주행이 가능한 차량들이 출시될 예정이며, 2027년에는 레벨 4 기술도 선보일 계획입니다.'
  },
  {
    id: 38,
    date: '01/18',
    title: '수소차 시장 확대 전망',
    trend: 'up',
    changeRate: 11.2,
    summary: '수소 전기차 시장이 본격적으로 확대되고 있습니다.',
    newsContent: '수소 전기차에 대한 관심이 높아지면서 시장이 확대되고 있습니다. 정부는 수소 충전소를 2030년까지 1000개소로 늘릴 계획이며, 상용차를 중심으로 수소차 보급을 확대할 방침입니다.'
  },
  {
    id: 39,
    date: '01/17',
    title: '자동차 부품 수출 증가',
    trend: 'up',
    changeRate: 10.5,
    summary: '국내 자동차 부품 기업들의 수출이 증가하고 있습니다.',
    newsContent: '국내 자동차 부품 기업들의 해외 수출이 호조를 보이고 있습니다. 전기차 핵심 부품인 배터리 팩, 구동 모터, 전력 변환 장치 등의 수출이 급증하고 있으며, 올해 수출액은 500억 달러를 넘어설 전망입니다.'
  },
  {
    id: 40,
    date: '01/16',
    title: '차량용 반도체 국산화 성과',
    trend: 'up',
    changeRate: 12.8,
    summary: '차량용 반도체의 국산화율이 크게 향상됐습니다.',
    newsContent: '국내 반도체 기업들이 차량용 반도체 개발에 성공하며 국산화율을 높이고 있습니다. 자율주행과 전동화에 필수적인 차량용 반도체 확보로 완성차 기업들의 공급망 안정성이 크게 개선될 전망입니다.'
  },
];

// 미국이슈 버블 데이터
const usAiBubbles: BubbleData[] = [
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
  { keyword: '방산', size: 25, color: 'rgb(99, 135, 220)', x: 90, y: 45 },
];

export function TodayIssue() {
  const [selectedKeyword, setSelectedKeyword] = useState('원전');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState<'domestic' | 'us'>('domestic');
  const itemsPerPage = 5;

  // 현재 선택된 키워드의 데이터
  const currentData = keywordDataMap[selectedKeyword] || keywordDataMap['원전'];
  
  // 현재 키워드와 관련된 이슈만 필터링
  const filteredIssues = currentData.relatedIssues 
    ? allIssues.filter(issue => currentData.relatedIssues.includes(issue.id))
    : allIssues.slice(0, 5);

  // 페이징 처리
  const totalPages = Math.ceil(filteredIssues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentIssues = filteredIssues.slice(startIndex, endIndex);

  // 키워드 변경 시 페이지 초기화
  const handleKeywordChange = (keyword: string) => {
    setSelectedKeyword(keyword);
    setCurrentPage(1);
  };

  // 새로고침 함수
  const handleRefresh = () => {
    setLastUpdateTime(new Date());
  };

  // 시간 포맷팅
  const formatDateTime = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return {
      date: `${year}.${month}.${day}`,
      time: `${hours}:${minutes}:${seconds}`
    };
  };

  const { date: currentDate, time: currentTime } = formatDateTime(lastUpdateTime);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">오늘의 이슈</h2>
        <p className="text-slate-600 mt-1">실시간으로 업데이트되는 주요 시장 이슈</p>
      </div>

      {/* AI이슈포착 섹션 */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-lg">AI이슈포착</CardTitle>
              {selectedKeyword && <Badge className="ml-2 bg-blue-600 text-base px-3 py-1">{selectedKeyword}</Badge>}
            </div>
            <div className="text-sm text-slate-600 font-medium">{currentDate}</div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 왼쪽: 버블차트 */}
            <div className="relative">
              {/* 탭 메뉴 */}
              <div className="flex items-center justify-center mb-4 gap-2">
                <Button
                  variant={selectedTab === "domestic" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedTab("domestic");
                    setSelectedKeyword("원전");
                    setCurrentPage(1);
                  }}
                  className={selectedTab === "domestic" ? "bg-blue-600" : ""}
                >
                  국내이슈포착
                </Button>
                <Button
                  variant={selectedTab === "us" ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedTab("us");
                    setSelectedKeyword("금시장");
                    setCurrentPage(1);
                  }}
                  className={selectedTab === "us" ? "bg-blue-600" : ""}
                >
                  미국이슈포착
                </Button>
              </div>

              <div className="relative h-[500px] bg-slate-50 rounded-lg overflow-hidden">
                <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                  {(selectedTab === "domestic" ? aiBubbles : usAiBubbles).map((bubble, idx) => (
                    <g key={idx} onClick={() => handleKeywordChange(bubble.keyword)} className="cursor-pointer">
                      <circle cx={bubble.x} cy={bubble.y} r={bubble.size / 14} fill={bubble.color} opacity={selectedKeyword === bubble.keyword ? "1" : "0.85"} className="hover:opacity-100 transition-opacity" stroke={selectedKeyword === bubble.keyword ? "#1e40af" : "none"} strokeWidth={selectedKeyword === bubble.keyword ? "0.5" : "0"} />
                      <text x={bubble.x} y={bubble.y} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize={bubble.size / 24} fontWeight="600" className="pointer-events-none select-none">
                        {bubble.keyword}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* 우측하단 날짜/시간 및 새로고침 */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-slate-200">
                  <div className="text-xs text-slate-600">
                    <div className="font-semibold">{currentDate}</div>
                    <div className="text-slate-500">{currentTime}</div>
                  </div>
                  <div className="w-px h-8 bg-slate-300"></div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-blue-50" onClick={handleRefresh}>
                    <RefreshCw className="w-4 h-4 text-blue-600" />
                  </Button>
                </div>
              </div>
            </div>

            {/* 오른쪽: 검색빈도 차트 및 주요종목 */}
            <div className="flex flex-col h-[500px] space-y-4">
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-blue-600">{selectedKeyword} 검색빈도 및 종목 누적 등락률</h3>
                  <Button variant="ghost" size="sm" className="text-xs text-slate-500">
                    더보기 →
                  </Button>
                </div>

                <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentData.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                      <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          fontSize: "12px"
                        }}
                      />
                      <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={false} name={selectedKeyword} />
                      {Object.keys(currentData.chartData[0] || {})
                        .filter((key) => key !== "date" && key !== "value")
                        .map((key, idx) => (
                          <Line key={key} type="monotone" dataKey={key} stroke={["#3b82f6", "#f97316", "#8b5cf6", "#10b981"][idx % 4]} strokeWidth={1.5} dot={false} opacity={0.7} />
                        ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold mb-2">주요종목</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="text-red-600">— {selectedKeyword} 검색추이</span>
                  {currentData.stocks.map((stock, idx) => (
                    <span key={idx}>
                      — {stock.name} <span className="text-orange-600">{stock.rate}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold mb-2">{currentData.news.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{currentData.news.content}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 선택된 키워드 관련 이슈 히스토리 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{selectedKeyword} 관련 이슈 히스토리</h3>
          <div className="text-sm text-slate-500">총 {filteredIssues.length}건</div>
        </div>

        <div className="space-y-3">
          {currentIssues.map((issue) => (
            <Card key={issue.id} className="hover:shadow-md transition-shadow border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* 날짜 표시 영역 */}
                  <div className="flex-shrink-0 text-center">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center">
                      <div className="text-xs text-slate-500">2026</div>
                      <div className="text-lg font-bold text-blue-600">{issue.date}</div>
                    </div>
                  </div>

                  {/* 이슈 내용 */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-slate-900 flex-1">{issue.title}</h4>
                      <div className={`flex items-center gap-1 text-sm font-semibold ml-3 ${issue.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {issue.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span>
                          {issue.trend === "up" ? "+" : ""}
                          {issue.changeRate}%
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                      <span className="font-bold">[AI요약]</span> {issue.summary}
                    </p>

                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{issue.newsContent}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 페이징 */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
              이전
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" className={`w-8 h-8 ${currentPage === page ? "bg-blue-600" : ""}`} onClick={() => setCurrentPage(page)}>
                  {page}
                </Button>
              ))}
            </div>

            <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
              다음
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
