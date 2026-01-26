import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { useState } from 'react';

type TabType = '매수비중' | '순매수' | '순매수 상위 신규진입' | '주요기관 순매수 상위' | '연속순매수';

interface SupplyData {
  date: string;
  stockName: string;
  buyRatio: number;
  changeRate: number;
  institution: string; // '기관' or '외국인' or '연기금' or '투신' or '사모펀드'
  market?: string; // '코스피' or '코스닥' (순매수 탭에서만 사용)
  netBuyAmount?: number; // 순매수금액 (억원 단위, 순매수 탭에서만 사용)
  consecutiveDays?: number; // 연속순매수일수 (연속순매수 탭에서만 사용)
}

// 탭별 목업 데이터
const mockDataByTab: Record<TabType, SupplyData[]> = {
  '매수비중': [
    { date: '01/21', stockName: '삼성전자', buyRatio: 68.5, changeRate: 2.34, institution: '기관' },
    { date: '01/21', stockName: 'SK하이닉스', buyRatio: 72.3, changeRate: 3.12, institution: '기관' },
    { date: '01/21', stockName: 'LG에너지솔루션', buyRatio: 65.8, changeRate: 1.87, institution: '기관' },
    { date: '01/21', stockName: '현대차', buyRatio: 61.2, changeRate: 0.95, institution: '기관' },
    { date: '01/21', stockName: '삼성바이오로직스', buyRatio: 59.7, changeRate: -0.42, institution: '기관' },
    { date: '01/21', stockName: 'POSCO홀딩스', buyRatio: 70.5, changeRate: 1.76, institution: '기관' },
    { date: '01/21', stockName: 'KB금융', buyRatio: 66.3, changeRate: 0.88, institution: '기관' },
    { date: '01/21', stockName: '신한지주', buyRatio: 64.1, changeRate: 1.12, institution: '기관' },
    { date: '01/21', stockName: 'LG화학', buyRatio: 62.8, changeRate: 2.45, institution: '기관' },
    { date: '01/21', stockName: '기아', buyRatio: 60.4, changeRate: 1.55, institution: '기관' },
    { date: '01/21', stockName: '카카오', buyRatio: 75.4, changeRate: 4.21, institution: '외국인' },
    { date: '01/21', stockName: '네이버', buyRatio: 70.9, changeRate: 2.88, institution: '외국인' },
    { date: '01/21', stockName: 'POSCO홀딩스', buyRatio: 68.3, changeRate: 1.56, institution: '외국인' },
    { date: '01/21', stockName: '삼성SDI', buyRatio: 66.7, changeRate: 2.15, institution: '외국인' },
    { date: '01/21', stockName: '기아', buyRatio: 63.2, changeRate: 1.23, institution: '외국인' },
    { date: '01/21', stockName: '셀트리온', buyRatio: 71.8, changeRate: 3.45, institution: '외국인' },
    { date: '01/21', stockName: 'LG전자', buyRatio: 69.5, changeRate: 0.95, institution: '외국인' },
    { date: '01/21', stockName: '하이브', buyRatio: 67.2, changeRate: -1.23, institution: '외국인' },
    { date: '01/21', stockName: 'SK이노베이션', buyRatio: 65.9, changeRate: 2.34, institution: '외국인' },
    { date: '01/21', stockName: '엔씨소프트', buyRatio: 64.5, changeRate: 1.67, institution: '외국인' },
  ],
  '순매수': [
    { date: '01/21', stockName: '삼성전자', buyRatio: 85.2, changeRate: 3.45, institution: '기관', market: '코스피', netBuyAmount: 1500 },
    { date: '01/21', stockName: '현대차', buyRatio: 72.3, changeRate: 2.15, institution: '기관', market: '코스피', netBuyAmount: 1000 },
    { date: '01/21', stockName: 'LG화학', buyRatio: 68.9, changeRate: 1.87, institution: '기관', market: '코스피', netBuyAmount: 800 },
    { date: '01/21', stockName: 'POSCO홀딩스', buyRatio: 75.4, changeRate: 2.56, institution: '기관', market: '코스피', netBuyAmount: 950 },
    { date: '01/21', stockName: 'KB금융', buyRatio: 70.8, changeRate: 1.34, institution: '기관', market: '코스피', netBuyAmount: 720 },
    { date: '01/21', stockName: '신한지주', buyRatio: 68.2, changeRate: 0.98, institution: '기관', market: '코스피', netBuyAmount: 680 },
    { date: '01/21', stockName: '하나금융지주', buyRatio: 66.5, changeRate: 1.23, institution: '기관', market: '코스피', netBuyAmount: 620 },
    { date: '01/21', stockName: '삼성생명', buyRatio: 64.3, changeRate: 0.76, institution: '기관', market: '코스피', netBuyAmount: 580 },
    { date: '01/21', stockName: 'SK', buyRatio: 62.7, changeRate: 1.45, institution: '기관', market: '코스피', netBuyAmount: 540 },
    { date: '01/21', stockName: 'LG', buyRatio: 61.2, changeRate: 0.89, institution: '기관', market: '코스피', netBuyAmount: 500 },
    { date: '01/21', stockName: 'SK하이닉스', buyRatio: 78.6, changeRate: 4.21, institution: '기관', market: '코스닥', netBuyAmount: 1200 },
    { date: '01/21', stockName: '셀트리온', buyRatio: 65.4, changeRate: 0.95, institution: '기관', market: '코스닥', netBuyAmount: 700 },
    { date: '01/21', stockName: '에코프로비엠', buyRatio: 72.8, changeRate: 5.67, institution: '기관', market: '코스닥', netBuyAmount: 850 },
    { date: '01/21', stockName: '엘앤에프', buyRatio: 69.5, changeRate: 4.32, institution: '기관', market: '코스닥', netBuyAmount: 780 },
    { date: '01/21', stockName: '포스코퓨처엠', buyRatio: 67.3, changeRate: 3.45, institution: '기관', market: '코스닥', netBuyAmount: 720 },
    { date: '01/21', stockName: 'SK머티리얼즈', buyRatio: 65.8, changeRate: 2.78, institution: '기관', market: '코스닥', netBuyAmount: 680 },
    { date: '01/21', stockName: '천보', buyRatio: 63.5, changeRate: 3.12, institution: '기관', market: '코스닥', netBuyAmount: 640 },
    { date: '01/21', stockName: '리노공업', buyRatio: 61.9, changeRate: 2.34, institution: '기관', market: '코스닥', netBuyAmount: 600 },
    { date: '01/21', stockName: '원익IPS', buyRatio: 60.2, changeRate: 1.87, institution: '기관', market: '코스닥', netBuyAmount: 560 },
    { date: '01/21', stockName: '피에스케이', buyRatio: 58.7, changeRate: 2.56, institution: '기관', market: '코스닥', netBuyAmount: 520 },
    { date: '01/21', stockName: '네이버', buyRatio: 82.7, changeRate: 3.78, institution: '외국인', market: '코스피', netBuyAmount: 1400 },
    { date: '01/21', stockName: '기아', buyRatio: 68.6, changeRate: 1.12, institution: '외국인', market: '코스피', netBuyAmount: 800 },
    { date: '01/21', stockName: '삼성전자', buyRatio: 79.5, changeRate: 2.89, institution: '외국인', market: '코스피', netBuyAmount: 1250 },
    { date: '01/21', stockName: '현대모비스', buyRatio: 74.3, changeRate: 1.67, institution: '외국인', market: '코스피', netBuyAmount: 920 },
    { date: '01/21', stockName: 'LG전자', buyRatio: 71.8, changeRate: 2.34, institution: '외국인', market: '코스피', netBuyAmount: 860 },
    { date: '01/21', stockName: 'SK이노베이션', buyRatio: 69.2, changeRate: 1.98, institution: '외국인', market: '코스피', netBuyAmount: 790 },
    { date: '01/21', stockName: '한국전력', buyRatio: 67.5, changeRate: 3.12, institution: '외국인', market: '코스피', netBuyAmount: 740 },
    { date: '01/21', stockName: 'SK텔레콤', buyRatio: 65.3, changeRate: 0.87, institution: '외국인', market: '코스피', netBuyAmount: 690 },
    { date: '01/21', stockName: 'KT&G', buyRatio: 63.8, changeRate: 1.45, institution: '외국인', market: '코스피', netBuyAmount: 650 },
    { date: '01/21', stockName: '삼성물산', buyRatio: 62.1, changeRate: 0.98, institution: '외국인', market: '코스피', netBuyAmount: 610 },
    { date: '01/21', stockName: '카카오', buyRatio: 79.5, changeRate: 2.95, institution: '외국인', market: '코스닥', netBuyAmount: 1300 },
    { date: '01/21', stockName: 'LG에너지솔루션', buyRatio: 75.8, changeRate: 2.34, institution: '외국인', market: '코스닥', netBuyAmount: 1100 },
    { date: '01/21', stockName: '삼성바이오로직스', buyRatio: 71.2, changeRate: 1.56, institution: '외국인', market: '코스닥', netBuyAmount: 900 },
    { date: '01/21', stockName: '셀트리온헬스케어', buyRatio: 73.6, changeRate: 2.78, institution: '외국인', market: '코스닥', netBuyAmount: 980 },
    { date: '01/21', stockName: '크래프톤', buyRatio: 70.4, changeRate: 3.45, institution: '외국인', market: '코스닥', netBuyAmount: 870 },
    { date: '01/21', stockName: '펄어비스', buyRatio: 68.9, changeRate: 1.89, institution: '외국인', market: '코스닥', netBuyAmount: 820 },
    { date: '01/21', stockName: '에코프로', buyRatio: 66.7, changeRate: 4.12, institution: '외국인', market: '코스닥', netBuyAmount: 760 },
    { date: '01/21', stockName: '파두', buyRatio: 64.5, changeRate: 2.67, institution: '외국인', market: '코스닥', netBuyAmount: 710 },
    { date: '01/21', stockName: '알테오젠', buyRatio: 62.8, changeRate: 3.23, institution: '외국인', market: '코스닥', netBuyAmount: 670 },
    { date: '01/21', stockName: '씨젠', buyRatio: 61.3, changeRate: 1.78, institution: '외국인', market: '코스닥', netBuyAmount: 630 },
  ],
  '순매수 상위 신규진입': [
    { date: '01/21', stockName: '한화에어로스페이스', buyRatio: 89.5, changeRate: 5.67, institution: '기관', netBuyAmount: 456.78 },
    { date: '01/21', stockName: 'HD현대중공업', buyRatio: 84.3, changeRate: 6.23, institution: '기관', netBuyAmount: 389.45 },
    { date: '01/21', stockName: '두산에너빌리티', buyRatio: 78.9, changeRate: 4.85, institution: '기관', netBuyAmount: 312.67 },
    { date: '01/21', stockName: '포스코퓨처엠', buyRatio: 73.6, changeRate: 3.92, institution: '기관', netBuyAmount: 278.34 },
    { date: '01/21', stockName: 'HD한국조선해양', buyRatio: 70.2, changeRate: 2.78, institution: '기관', netBuyAmount: 245.89 },
    { date: '01/21', stockName: 'HD현대일렉트릭', buyRatio: 67.8, changeRate: 4.12, institution: '기관', netBuyAmount: 223.56 },
    { date: '01/21', stockName: '한국항공우주', buyRatio: 65.4, changeRate: 3.45, institution: '기관', netBuyAmount: 198.23 },
    { date: '01/21', stockName: '두산밥캣', buyRatio: 63.2, changeRate: 2.89, institution: '기관', netBuyAmount: 176.45 },
    { date: '01/21', stockName: 'HD현대마린솔루션', buyRatio: 61.5, changeRate: 3.67, institution: '기관', netBuyAmount: 154.78 },
    { date: '01/21', stockName: 'LS일렉트릭', buyRatio: 59.8, changeRate: 2.34, institution: '기관', netBuyAmount: 132.56 },
    { date: '01/21', stockName: '에코프로비엠', buyRatio: 86.7, changeRate: 7.45, institution: '외국인', netBuyAmount: 523.12 },
    { date: '01/21', stockName: '엘앤에프', buyRatio: 82.4, changeRate: 5.89, institution: '외국인', netBuyAmount: 467.56 },
    { date: '01/21', stockName: '포스코DX', buyRatio: 77.8, changeRate: 4.56, institution: '외국인', netBuyAmount: 398.23 },
    { date: '01/21', stockName: 'SK스퀘어', buyRatio: 74.5, changeRate: 3.67, institution: '외국인', netBuyAmount: 334.78 },
    { date: '01/21', stockName: 'HD현대일렉트릭', buyRatio: 71.9, changeRate: 2.89, institution: '외국인', netBuyAmount: 289.45 },
    { date: '01/21', stockName: '삼성E&A', buyRatio: 69.3, changeRate: 4.23, institution: '외국인', netBuyAmount: 256.78 },
    { date: '01/21', stockName: 'SK에코플랜트', buyRatio: 67.6, changeRate: 3.56, institution: '외국인', netBuyAmount: 223.45 },
    { date: '01/21', stockName: 'GS건설', buyRatio: 65.2, changeRate: 2.78, institution: '외국인', netBuyAmount: 198.67 },
    { date: '01/21', stockName: '대림산업', buyRatio: 63.8, changeRate: 3.12, institution: '외국인', netBuyAmount: 176.34 },
    { date: '01/21', stockName: 'DL이앤씨', buyRatio: 61.4, changeRate: 2.45, institution: '외국인', netBuyAmount: 154.23 },
  ],
  '주요기관 순매수 상위': [
    { date: '01/21', stockName: '삼성전자', buyRatio: 92.3, changeRate: 2.85, institution: '연기금', netBuyAmount: 854.3 },
    { date: '01/21', stockName: 'SK하이닉스', buyRatio: 88.7, changeRate: 3.42, institution: '연기금', netBuyAmount: 723.6 },
    { date: '01/21', stockName: '한국전력', buyRatio: 85.2, changeRate: 5.23, institution: '연기금', netBuyAmount: 612.8 },
    { date: '01/21', stockName: 'LG에너지솔루션', buyRatio: 82.6, changeRate: 4.15, institution: '연기금', netBuyAmount: 567.4 },
    { date: '01/21', stockName: 'POSCO홀딩스', buyRatio: 79.4, changeRate: 1.87, institution: '연기금', netBuyAmount: 498.9 },
    { date: '01/21', stockName: '삼성SDI', buyRatio: 77.2, changeRate: 3.56, institution: '연기금', netBuyAmount: 445.2 },
    { date: '01/21', stockName: '현대모비스', buyRatio: 74.8, changeRate: 2.34, institution: '연기금', netBuyAmount: 398.7 },
    { date: '01/21', stockName: 'LG화학', buyRatio: 72.5, changeRate: 1.98, institution: '연기금', netBuyAmount: 356.4 },
    { date: '01/21', stockName: '기아', buyRatio: 70.3, changeRate: 2.67, institution: '연기금', netBuyAmount: 312.8 },
    { date: '01/21', stockName: 'SK텔레콤', buyRatio: 68.1, changeRate: 1.45, institution: '연기금', netBuyAmount: 278.5 },
    { date: '01/21', stockName: '현대차', buyRatio: 90.8, changeRate: 2.56, institution: '투신', netBuyAmount: 945.7 },
    { date: '01/21', stockName: 'KB금융', buyRatio: 87.5, changeRate: 3.12, institution: '투신', netBuyAmount: 812.5 },
    { date: '01/21', stockName: '신한지주', buyRatio: 84.3, changeRate: 4.67, institution: '투신', netBuyAmount: 734.2 },
    { date: '01/21', stockName: 'LG화학', buyRatio: 81.7, changeRate: 2.34, institution: '투신', netBuyAmount: 656.8 },
    { date: '01/21', stockName: '네이버', buyRatio: 78.9, changeRate: 1.95, institution: '투신', netBuyAmount: 589.3 },
    { date: '01/21', stockName: '하나금융지주', buyRatio: 76.4, changeRate: 3.45, institution: '투신', netBuyAmount: 523.6 },
    { date: '01/21', stockName: '삼성물산', buyRatio: 74.2, changeRate: 2.12, institution: '투신', netBuyAmount: 478.9 },
    { date: '01/21', stockName: 'SK', buyRatio: 71.8, changeRate: 1.78, institution: '투신', netBuyAmount: 434.5 },
    { date: '01/21', stockName: 'LG전자', buyRatio: 69.5, changeRate: 2.89, institution: '투신', netBuyAmount: 389.2 },
    { date: '01/21', stockName: 'SK이노베이션', buyRatio: 67.3, changeRate: 1.56, institution: '투신', netBuyAmount: 345.7 },
    { date: '01/21', stockName: '카카오', buyRatio: 88.4, changeRate: 3.78, institution: '사모펀드', netBuyAmount: 678.9 },
    { date: '01/21', stockName: '셀트리온', buyRatio: 85.6, changeRate: 2.45, institution: '사모펀드', netBuyAmount: 612.4 },
    { date: '01/21', stockName: '삼성바이오로직스', buyRatio: 82.3, changeRate: 4.23, institution: '사모펀드', netBuyAmount: 543.7 },
    { date: '01/21', stockName: '크래프톤', buyRatio: 79.8, changeRate: 3.56, institution: '사모펀드', netBuyAmount: 487.2 },
    { date: '01/21', stockName: 'SK이노베이션', buyRatio: 76.5, changeRate: 2.12, institution: '사모펀드', netBuyAmount: 423.6 },
    { date: '01/21', stockName: '엔씨소프트', buyRatio: 74.3, changeRate: 3.89, institution: '사모펀드', netBuyAmount: 378.4 },
    { date: '01/21', stockName: '넷마블', buyRatio: 71.9, changeRate: 2.67, institution: '사모펀드', netBuyAmount: 334.8 },
    { date: '01/21', stockName: 'LG에너지솔루션', buyRatio: 69.6, changeRate: 1.98, institution: '사모펀드', netBuyAmount: 298.5 },
    { date: '01/21', stockName: '에코프로비엠', buyRatio: 67.2, changeRate: 4.12, institution: '사모펀드', netBuyAmount: 256.3 },
    { date: '01/21', stockName: '펄어비스', buyRatio: 65.1, changeRate: 2.34, institution: '사모펀드', netBuyAmount: 223.7 },
  ],
  '연속순매수': [
    { date: '01/21', stockName: '네이버', buyRatio: 87.6, changeRate: 2.95, institution: '기관', consecutiveDays: 22 },
    { date: '01/21', stockName: '카카오', buyRatio: 83.4, changeRate: 3.42, institution: '기관', consecutiveDays: 18 },
    { date: '01/21', stockName: '엔씨소프트', buyRatio: 79.8, changeRate: 1.87, institution: '기관', consecutiveDays: 15 },
    { date: '01/21', stockName: '넷마블', buyRatio: 76.5, changeRate: 2.15, institution: '기관', consecutiveDays: 12 },
    { date: '01/21', stockName: '크래프톤', buyRatio: 73.2, changeRate: 1.56, institution: '기관', consecutiveDays: 9 },
    { date: '01/21', stockName: '펄어비스', buyRatio: 70.8, changeRate: 2.34, institution: '기관', consecutiveDays: 7 },
    { date: '01/21', stockName: '위메이드', buyRatio: 68.5, changeRate: 3.12, institution: '기관', consecutiveDays: 6 },
    { date: '01/21', stockName: '컴투스', buyRatio: 66.3, changeRate: 1.78, institution: '기관', consecutiveDays: 5 },
    { date: '01/21', stockName: '게임빌', buyRatio: 64.1, changeRate: 2.45, institution: '기관', consecutiveDays: 4 },
    { date: '01/21', stockName: '웹젠', buyRatio: 62.4, changeRate: 1.89, institution: '기관', consecutiveDays: 3 },
    { date: '01/21', stockName: '삼성전자', buyRatio: 91.2, changeRate: 2.78, institution: '외국인', consecutiveDays: 28 },
    { date: '01/21', stockName: 'SK하이닉스', buyRatio: 88.5, changeRate: 3.45, institution: '외국인', consecutiveDays: 25 },
    { date: '01/21', stockName: 'LG에너지솔루션', buyRatio: 85.7, changeRate: 4.12, institution: '외국인', consecutiveDays: 20 },
    { date: '01/21', stockName: '셀트리온', buyRatio: 82.3, changeRate: 2.67, institution: '외국인', consecutiveDays: 17 },
    { date: '01/21', stockName: '삼성바이오로직스', buyRatio: 79.6, changeRate: 1.89, institution: '외국인', consecutiveDays: 14 },
    { date: '01/21', stockName: 'LG화학', buyRatio: 77.4, changeRate: 3.23, institution: '외국인', consecutiveDays: 11 },
    { date: '01/21', stockName: '현대차', buyRatio: 75.2, changeRate: 2.56, institution: '외국인', consecutiveDays: 9 },
    { date: '01/21', stockName: 'POSCO홀딩스', buyRatio: 72.8, changeRate: 1.98, institution: '외국인', consecutiveDays: 8 },
    { date: '01/21', stockName: 'KB금융', buyRatio: 70.5, changeRate: 2.34, institution: '외국인', consecutiveDays: 6 },
    { date: '01/21', stockName: '신한지주', buyRatio: 68.3, changeRate: 1.67, institution: '외국인', consecutiveDays: 5 },
  ],
};

export function SupplyAnalysis() {
  const [selectedTab, setSelectedTab] = useState<TabType>('매수비중');

  const tabs: TabType[] = [
    '매수비중', '순매수', '순매수 상위 신규진입', '주요기관 순매수 상위', '연속순매수'
  ];

  const currentData = mockDataByTab[selectedTab];

  // 현재 날짜/시간
  const now = new Date();
  const currentDate = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`;
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  // 기관과 외국인 데이터 분리
  const institutionData = currentData.filter(item => item.institution === '기관');
  const foreignData = currentData.filter(item => item.institution === '외국인');

  // 순매수 탭인 경우 시장별로 추가 분리
  const institutionKospiData = currentData.filter(item => item.institution === '기관' && item.market === '코스피');
  const institutionKosdaqData = currentData.filter(item => item.institution === '기관' && item.market === '코스닥');
  const foreignKospiData = currentData.filter(item => item.institution === '외국인' && item.market === '코스피');
  const foreignKosdaqData = currentData.filter(item => item.institution === '외국인' && item.market === '코스닥');

  // 주요기관 순매수 상위 탭인 경우 기관별로 분리
  const pensionData = currentData.filter(item => item.institution === '연기금');
  const investmentTrustData = currentData.filter(item => item.institution === '투신');
  const privateFundData = currentData.filter(item => item.institution === '사모펀드');

  // 종목별 색상 생성 함수
  const getStockColor = (stockName: string) => {
    const colors = [
      'bg-blue-500',
      'bg-purple-500',
      'bg-green-500',
      'bg-orange-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-red-500',
    ];
    const index = stockName.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">수급분석</h2>
        <p className="text-slate-600 mt-1">기관 및 외국인 매수 동향 분석</p>
      </div>

      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <CardTitle className="text-lg mb-4">수급 현황</CardTitle>

          {/* 탭 메뉴 */}
          <div className="flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <Button key={tab} variant={selectedTab === tab ? "default" : "outline"} size="sm" className={selectedTab === tab ? "bg-blue-600" : ""} onClick={() => setSelectedTab(tab)}>
                {tab}
              </Button>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* 업데이트 시간 표시 */}
          <div className="flex justify-end mb-4">
            <span className="text-sm text-slate-600">
              업데이트 {currentDate} {currentTime}
            </span>
          </div>

          {/* 기관 및 외국인 테이블 좌우 배치 */}
          {selectedTab === "순매수" ? (
            // 순매수 탭: 4개 테이블 (2x2 그리드)
            <div className="grid grid-cols-2 gap-6">
              {/* 기관 코스피 */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-slate-800">기관 코스피</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-300">
                        <th className="text-left py-1.5 px-1.5 font-semibold text-slate-700 text-xs">날짜</th>
                        <th className="text-left py-1.5 px-1.5 font-semibold text-slate-700 text-xs">종목명</th>
                        <th className="text-right py-1.5 px-1.5 font-semibold text-slate-700 text-xs">순매수금액</th>
                        <th className="text-right py-1.5 px-1.5 font-semibold text-slate-700 text-xs">등락률</th>
                      </tr>
                    </thead>
                    <tbody>
                      {institutionKospiData.map((stock, index) => (
                        <tr key={index} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                          <td className="py-1.5 px-1.5 text-xs text-slate-600">{stock.date}</td>
                          <td className="py-1.5 px-1.5 font-medium text-slate-900 text-xs">
                            <div className="flex items-center gap-1.5">
                              <div className={`w-5 h-5 rounded-full ${getStockColor(stock.stockName)} flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0`}>{stock.stockName.charAt(0)}</div>
                              <span>{stock.stockName}</span>
                            </div>
                          </td>
                          <td className="py-1.5 px-1.5 text-right font-semibold text-blue-600 text-xs">{stock.netBuyAmount}억</td>
                          <td className={`py-1.5 px-1.5 text-right font-semibold text-xs ${stock.changeRate > 0 ? "text-red-600" : stock.changeRate < 0 ? "text-blue-600" : "text-slate-600"}`}>
                            {stock.changeRate > 0 ? "+" : ""}
                            {stock.changeRate.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 기관 코스닥 */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-slate-800">기관 코스닥</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-300">
                        <th className="text-left py-1.5 px-1.5 font-semibold text-slate-700 text-xs">날짜</th>
                        <th className="text-left py-1.5 px-1.5 font-semibold text-slate-700 text-xs">종목명</th>
                        <th className="text-right py-1.5 px-1.5 font-semibold text-slate-700 text-xs">순매수금액</th>
                        <th className="text-right py-1.5 px-1.5 font-semibold text-slate-700 text-xs">등락률</th>
                      </tr>
                    </thead>
                    <tbody>
                      {institutionKosdaqData.map((stock, index) => (
                        <tr key={index} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                          <td className="py-1.5 px-1.5 text-xs text-slate-600">{stock.date}</td>
                          <td className="py-1.5 px-1.5 font-medium text-slate-900 text-xs">
                            <div className="flex items-center gap-1.5">
                              <div className={`w-5 h-5 rounded-full ${getStockColor(stock.stockName)} flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0`}>{stock.stockName.charAt(0)}</div>
                              <span>{stock.stockName}</span>
                            </div>
                          </td>
                          <td className="py-1.5 px-1.5 text-right font-semibold text-blue-600 text-xs">{stock.netBuyAmount}억</td>
                          <td className={`py-1.5 px-1.5 text-right font-semibold text-xs ${stock.changeRate > 0 ? "text-red-600" : stock.changeRate < 0 ? "text-blue-600" : "text-slate-600"}`}>
                            {stock.changeRate > 0 ? "+" : ""}
                            {stock.changeRate.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 외국인 코스피 */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-slate-800">외국인 코스피</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-300">
                        <th className="text-left py-1.5 px-1.5 font-semibold text-slate-700 text-xs">날짜</th>
                        <th className="text-left py-1.5 px-1.5 font-semibold text-slate-700 text-xs">종목명</th>
                        <th className="text-right py-1.5 px-1.5 font-semibold text-slate-700 text-xs">순매수금액</th>
                        <th className="text-right py-1.5 px-1.5 font-semibold text-slate-700 text-xs">등락률</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foreignKospiData.map((stock, index) => (
                        <tr key={index} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                          <td className="py-1.5 px-1.5 text-xs text-slate-600">{stock.date}</td>
                          <td className="py-1.5 px-1.5 font-medium text-slate-900 text-xs">
                            <div className="flex items-center gap-1.5">
                              <div className={`w-5 h-5 rounded-full ${getStockColor(stock.stockName)} flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0`}>{stock.stockName.charAt(0)}</div>
                              <span>{stock.stockName}</span>
                            </div>
                          </td>
                          <td className="py-1.5 px-1.5 text-right font-semibold text-blue-600 text-xs">{stock.netBuyAmount}억</td>
                          <td className={`py-1.5 px-1.5 text-right font-semibold text-xs ${stock.changeRate > 0 ? "text-red-600" : stock.changeRate < 0 ? "text-blue-600" : "text-slate-600"}`}>
                            {stock.changeRate > 0 ? "+" : ""}
                            {stock.changeRate.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 외국인 코스닥 */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-slate-800">외국인 코스닥</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-300">
                        <th className="text-left py-1.5 px-1.5 font-semibold text-slate-700 text-xs">날짜</th>
                        <th className="text-left py-1.5 px-1.5 font-semibold text-slate-700 text-xs">종목명</th>
                        <th className="text-right py-1.5 px-1.5 font-semibold text-slate-700 text-xs">순매수금액</th>
                        <th className="text-right py-1.5 px-1.5 font-semibold text-slate-700 text-xs">등락률</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foreignKosdaqData.map((stock, index) => (
                        <tr key={index} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                          <td className="py-1.5 px-1.5 text-xs text-slate-600">{stock.date}</td>
                          <td className="py-1.5 px-1.5 font-medium text-slate-900 text-xs">
                            <div className="flex items-center gap-1.5">
                              <div className={`w-5 h-5 rounded-full ${getStockColor(stock.stockName)} flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0`}>{stock.stockName.charAt(0)}</div>
                              <span>{stock.stockName}</span>
                            </div>
                          </td>
                          <td className="py-1.5 px-1.5 text-right font-semibold text-blue-600 text-xs">{stock.netBuyAmount}억</td>
                          <td className={`py-1.5 px-1.5 text-right font-semibold text-xs ${stock.changeRate > 0 ? "text-red-600" : stock.changeRate < 0 ? "text-blue-600" : "text-slate-600"}`}>
                            {stock.changeRate > 0 ? "+" : ""}
                            {stock.changeRate.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : selectedTab === "주요기관 순매수 상위" ? (
            // 주요기관 순매수 상위 탭: 3개 테이블 (연기금, 투신, 사모펀드)
            <div className="grid grid-cols-3 gap-4">
              {/* 연기금 */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-slate-800">연기금</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-300">
                        <th className="text-left py-1.5 px-1.5 font-semibold text-slate-700 text-xs">날짜</th>
                        <th className="text-left py-1.5 px-1.5 font-semibold text-slate-700 text-xs">종목명</th>
                        <th className="text-right py-1.5 px-1.5 font-semibold text-slate-700 text-xs">순매수</th>
                        <th className="text-right py-1.5 px-1.5 font-semibold text-slate-700 text-xs">등락률</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pensionData.map((stock, index) => (
                        <tr key={index} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                          <td className="py-1.5 px-1.5 text-xs text-slate-600">{stock.date}</td>
                          <td className="py-1.5 px-1.5 font-medium text-slate-900 text-xs">
                            <div className="flex items-center gap-1.5">
                              <div className={`w-5 h-5 rounded-full ${getStockColor(stock.stockName)} flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0`}>{stock.stockName.charAt(0)}</div>
                              <span className="truncate">{stock.stockName}</span>
                            </div>
                          </td>
                          <td className="py-1.5 px-1.5 text-right font-semibold text-blue-600 text-xs">{stock.netBuyAmount}억</td>
                          <td className={`py-1.5 px-1.5 text-right font-semibold text-xs ${stock.changeRate > 0 ? "text-red-600" : stock.changeRate < 0 ? "text-blue-600" : "text-slate-600"}`}>
                            {stock.changeRate > 0 ? "+" : ""}
                            {stock.changeRate.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 투신 */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-slate-800">투신</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-300">
                        <th className="text-left py-1.5 px-1.5 font-semibold text-slate-700 text-xs">날짜</th>
                        <th className="text-left py-1.5 px-1.5 font-semibold text-slate-700 text-xs">종목명</th>
                        <th className="text-right py-1.5 px-1.5 font-semibold text-slate-700 text-xs">순매수</th>
                        <th className="text-right py-1.5 px-1.5 font-semibold text-slate-700 text-xs">등락률</th>
                      </tr>
                    </thead>
                    <tbody>
                      {investmentTrustData.map((stock, index) => (
                        <tr key={index} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                          <td className="py-1.5 px-1.5 text-xs text-slate-600">{stock.date}</td>
                          <td className="py-1.5 px-1.5 font-medium text-slate-900 text-xs">
                            <div className="flex items-center gap-1.5">
                              <div className={`w-5 h-5 rounded-full ${getStockColor(stock.stockName)} flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0`}>{stock.stockName.charAt(0)}</div>
                              <span className="truncate">{stock.stockName}</span>
                            </div>
                          </td>
                          <td className="py-1.5 px-1.5 text-right font-semibold text-blue-600 text-xs">{stock.netBuyAmount}억</td>
                          <td className={`py-1.5 px-1.5 text-right font-semibold text-xs ${stock.changeRate > 0 ? "text-red-600" : stock.changeRate < 0 ? "text-blue-600" : "text-slate-600"}`}>
                            {stock.changeRate > 0 ? "+" : ""}
                            {stock.changeRate.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 사모펀드 */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-slate-800">사모펀드</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-300">
                        <th className="text-left py-1.5 px-1.5 font-semibold text-slate-700 text-xs">날짜</th>
                        <th className="text-left py-1.5 px-1.5 font-semibold text-slate-700 text-xs">종목명</th>
                        <th className="text-right py-1.5 px-1.5 font-semibold text-slate-700 text-xs">순매수</th>
                        <th className="text-right py-1.5 px-1.5 font-semibold text-slate-700 text-xs">등락률</th>
                      </tr>
                    </thead>
                    <tbody>
                      {privateFundData.map((stock, index) => (
                        <tr key={index} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                          <td className="py-1.5 px-1.5 text-xs text-slate-600">{stock.date}</td>
                          <td className="py-1.5 px-1.5 font-medium text-slate-900 text-xs">
                            <div className="flex items-center gap-1.5">
                              <div className={`w-5 h-5 rounded-full ${getStockColor(stock.stockName)} flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0`}>{stock.stockName.charAt(0)}</div>
                              <span className="truncate">{stock.stockName}</span>
                            </div>
                          </td>
                          <td className="py-1.5 px-1.5 text-right font-semibold text-blue-600 text-xs">{stock.netBuyAmount}억</td>
                          <td className={`py-1.5 px-1.5 text-right font-semibold text-xs ${stock.changeRate > 0 ? "text-red-600" : stock.changeRate < 0 ? "text-blue-600" : "text-slate-600"}`}>
                            {stock.changeRate > 0 ? "+" : ""}
                            {stock.changeRate.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            // 다른 탭들: 기존 2개 테이블
            <div className="grid grid-cols-2 gap-6">
              {/* 기관 테이블 */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-slate-800">기관</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-300">
                        <th className="text-left py-1.5 px-1.5 font-semibold text-slate-700 text-xs">날짜</th>
                        <th className="text-left py-1.5 px-1.5 font-semibold text-slate-700 text-xs">종목명</th>
                        <th className="text-right py-1.5 px-1.5 font-semibold text-slate-700 text-xs">{selectedTab === "순매수 상위 신규진입" ? "순매수" : "매수비중"}</th>
                        <th className="text-right py-1.5 px-1.5 font-semibold text-slate-700 text-xs">등락률</th>
                      </tr>
                    </thead>
                    <tbody>
                      {institutionData.map((stock, index) => (
                        <tr key={index} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                          <td className="py-1.5 px-1.5 text-xs text-slate-600">{stock.date}</td>
                          <td className="py-1.5 px-1.5 font-medium text-slate-900 text-xs">
                            <div className="flex items-center gap-1.5">
                              <div className={`w-5 h-5 rounded-full ${getStockColor(stock.stockName)} flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0`}>{stock.stockName.charAt(0)}</div>
                              <span>{stock.stockName}</span>
                            </div>
                          </td>
                          <td className="py-1.5 px-1.5 text-right font-semibold text-blue-600 text-xs">{selectedTab === "순매수 상위 신규진입" ? `${stock.netBuyAmount}억` : selectedTab === "연속순매수" ? `${stock.consecutiveDays}일` : `${stock.buyRatio.toFixed(1)}%`}</td>
                          <td className={`py-1.5 px-1.5 text-right font-semibold text-xs ${stock.changeRate > 0 ? "text-red-600" : stock.changeRate < 0 ? "text-blue-600" : "text-slate-600"}`}>
                            {stock.changeRate > 0 ? "+" : ""}
                            {stock.changeRate.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 외국인 테이블 */}
              <div>
                <h3 className="text-sm font-semibold mb-2 text-slate-800">외국인</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-slate-300">
                        <th className="text-left py-1.5 px-1.5 font-semibold text-slate-700 text-xs">날짜</th>
                        <th className="text-left py-1.5 px-1.5 font-semibold text-slate-700 text-xs">종목명</th>
                        <th className="text-right py-1.5 px-1.5 font-semibold text-slate-700 text-xs">{selectedTab === "순매수 상위 신규진입" ? "순매수" : selectedTab === "연속순매수" ? "연속매수" : "매수비중"}</th>
                        <th className="text-right py-1.5 px-1.5 font-semibold text-slate-700 text-xs">등락률</th>
                      </tr>
                    </thead>
                    <tbody>
                      {foreignData.map((stock, index) => (
                        <tr key={index} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                          <td className="py-1.5 px-1.5 text-xs text-slate-600">{stock.date}</td>
                          <td className="py-1.5 px-1.5 font-medium text-slate-900 text-xs">
                            <div className="flex items-center gap-1.5">
                              <div className={`w-5 h-5 rounded-full ${getStockColor(stock.stockName)} flex items-center justify-center text-white font-bold text-[10px] flex-shrink-0`}>{stock.stockName.charAt(0)}</div>
                              <span>{stock.stockName}</span>
                            </div>
                          </td>
                          <td className="py-1.5 px-1.5 text-right font-semibold text-blue-600 text-xs">{selectedTab === "순매수 상위 신규진입" ? `${stock.netBuyAmount}억` : selectedTab === "연속순매수" ? `${stock.consecutiveDays}일` : `${stock.buyRatio.toFixed(1)}%`}</td>
                          <td className={`py-1.5 px-1.5 text-right font-semibold text-xs ${stock.changeRate > 0 ? "text-red-600" : stock.changeRate < 0 ? "text-blue-600" : "text-slate-600"}`}>
                            {stock.changeRate > 0 ? "+" : ""}
                            {stock.changeRate.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}