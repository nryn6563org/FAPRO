import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { FileBarChart, TrendingUp, TrendingDown, Building2, X, Circle } from 'lucide-react';
import { useState } from 'react';

type TabType = '신규리포트' | '목표가상향' | '목표가하향' | '기관관심리포트' | '외국인관심리포트' | '연기금관심리포트' | '증권사관심종목' | '목표가높음';

interface ReportData {
  date: string;
  stockName: string;
  currentPrice: number;
  changeRate: number;
  targetPrice: number;
  title: string;
  firm: string;
  rating: string;
  upside: number;
  content?: string;
  institutionalAmount?: string;
  foreignAmount?: string;
  pensionAmount?: string;
  reportCount?: number;
  highestTargetPrice?: number;
  lowestTargetPrice?: number;
  targetVsPrice?: string;
}

const mockReports: Record<TabType, ReportData[]> = {
  '신규리포트': [
    { 
      date: '01/22', 
      stockName: '두산에스나', 
      currentPrice: 52600, 
      changeRate: 1.94, 
      targetPrice: 69000, 
      title: '비메모리 턴어라운드와 직관적인 동행', 
      firm: '교보증권', 
      rating: 'BUY(신규)', 
      upside: 31.5,
      content: '국내 대표 시스템반도체 디자인하우스. DSP 전환의 성과가 보여줄 원년. 동사는 약 20년간 DSP를 사용한 통신 칩을 점유해왔다. 다만, 최근 칩 설계를 Cortex 기반인 ARM으로 전환. 합류한 최라현 프로젝트 매니저를 영입할 당시, DSP 전환 이후 가장 막혔던 상태는 달라진 개발 메뉴얼. 개발 매뉴얼이 영어로 일목 매우 제한되어 신규 매뉴얼 습득에 따른 리스크가 컸던 것으로 판단. 2018년 공적매출은 약 253억원, 2019년은 약 183억원 수준이었으나, 2024년 가능로 824억원 수준. 2025년에는 매출액을 상회할 것으로 기대. 섬싱온드리의 AI/HPC, Automotive 프로젝트 의뢰가 증가하는 국면에서 동사의 용역매출은 우상향 전망. 이에따라 올해 AI/HPC 프로젝트 중 하니가 양산을 시작할 것으로 기대. DSP 전환 이후 속스타일은 제품 매출 발생이 본격적으로 시작할 원년.'
    },
    { 
      date: '01/22', 
      stockName: '에이디테크놀로지', 
      currentPrice: 34750, 
      changeRate: 1.46, 
      targetPrice: 45000, 
      title: 'DSP 전환의 결실을 맺을 엔넨', 
      firm: '교보증권', 
      rating: 'BUY(신규)', 
      upside: 29.5,
      content: '국내 대표 시스템반도체 디자인하우스로서 비메모리 반도체 턴어라운드의 수혜가 기대됩니다. ARM 기반 DSP 칩 전환이 본격화되며 2025년 매출 성장이 가시화될 전망입니다. 특히 AI/HPC 및 Automotive 분야의 프로젝트 증가가 예상됩니다.'
    },
    { date: '01/22', stockName: '네패스', currentPrice: 15380, changeRate: -1.41, targetPrice: 20000, title: '지정학적 불확실성이 가져온 혼재', firm: '교보증권', rating: 'HOLD', upside: 30.1, content: '지정학적 불확실성으로 인한 단기 변동성이 예상되나, 중장기 성장 동력은 여전히 유효합니다.' },
    { date: '01/21', stockName: '아모센스', currentPrice: 10090, changeRate: 8.15, targetPrice: 16000, title: '블랭에서기 수혜 본격화, 동반된 리레이팅', firm: 'DS투자증권', rating: 'BUY', upside: 58.5, content: '블랭크 마스크 시장 확대에 따른 실적 개선이 기대됩니다.' },
    { date: '01/21', stockName: '유비쿼스', currentPrice: 11930, changeRate: 29.96, targetPrice: 22000, title: '아직 달글달지 않은 피지컬 AI 수혜주', firm: '하나증권', rating: 'BUY', upside: 84.4, content: '피지컬 AI 시장의 성장과 함께 동사의 솔루션 수요가 증가할 전망입니다.' },
    { date: '01/20', stockName: '에스티', currentPrice: 17530, changeRate: 2.57, targetPrice: 28000, title: 'HBM과 HPA가 이끄어낼 가파른 실적 기울기', firm: '리딩투자증권', rating: 'BUY', upside: 60.3, content: 'HBM 관련 수요 증가와 HPA 사업 확대로 실적 개선이 예상됩니다.' },
    { date: '01/20', stockName: '한솔케미칼', currentPrice: 261000, changeRate: 6.31, targetPrice: 325000, title: '반도체 업사이클과 2차전지 소재의 부활', firm: 'NH투자증권', rating: 'BUY', upside: 24.5, content: '반도체 업황 개선과 2차전지 소재 사업의 회복이 동반될 전망입니다.' },
    { date: '01/20', stockName: '삼성전자', currentPrice: 74500, changeRate: 2.05, targetPrice: 85000, title: 'AI 반도체 수요 증가로 목표가 상향', firm: 'KB증권', rating: 'BUY', upside: 14.1, content: 'AI 반도체 시장의 폭발적 성장에 따른 수혜가 예상되며, HBM3 생산 확대로 실적 개선이 기대됩니다.' },
    { date: '01/19', stockName: 'SK하이닉스', currentPrice: 142000, changeRate: 3.27, targetPrice: 160000, title: 'HBM3 출하 본격화 전망', firm: '미래에셋증권', rating: 'BUY', upside: 12.7, content: 'HBM3 제품의 본격적인 출하가 시작되며 수익성 개선이 예상됩니다.' },
    { date: '01/19', stockName: 'LG에너지솔루션', currentPrice: 423000, changeRate: -2.76, targetPrice: 520000, title: '북미 수주 확대 기대', firm: '한국투자증권', rating: 'BUY', upside: 22.9, content: '북미 시장에서의 대규모 수주 확대로 중장기 성장이 기대됩니다.' },
  ],
  '목표가상향': [
    { date: '01/22', stockName: '삼성전자', currentPrice: 74500, changeRate: 2.05, targetPrice: 85000, title: 'AI 반도체 수요 증가로 목표가 상향', firm: 'KB증권', rating: 'Buy', upside: 14.1 },
    { date: '01/22', stockName: 'SK하이닉스', currentPrice: 142000, changeRate: 3.27, targetPrice: 165000, title: 'HBM3E 수주 확대, 목표가 상향', firm: '신한투자증권', rating: 'Buy', upside: 16.2 },
    { date: '01/21', stockName: 'LG에너지솔루션', currentPrice: 423000, changeRate: -2.76, targetPrice: 550000, title: '북미 전기차 보조금 확대 기대', firm: '메리츠증권', rating: 'Buy', upside: 29.5 },
    { date: '01/21', stockName: '현대차', currentPrice: 234000, changeRate: 1.50, targetPrice: 270000, title: '전기차 판매 호조, 목표가 상향', firm: 'NH투자증권', rating: 'Buy', upside: 15.4 },
    { date: '01/20', stockName: '네이버', currentPrice: 234000, changeRate: 7.88, targetPrice: 280000, title: 'AI 검색 서비스 성장성 평가', firm: '한국투자증권', rating: 'Buy', upside: 19.6 },
    { date: '01/20', stockName: '카카오', currentPrice: 56700, changeRate: 7.80, targetPrice: 75000, title: '플랫폼 수익성 개선 지속', firm: '대신증권', rating: 'Buy', upside: 32.3 },
    { date: '01/19', stockName: 'POSCO홀딩스', currentPrice: 389000, changeRate: 3.60, targetPrice: 450000, title: '철강 가격 상승 반영', firm: '삼성증권', rating: 'Buy', upside: 15.7 },
    { date: '01/19', stockName: 'SK이노베이션', currentPrice: 145000, changeRate: 3.57, targetPrice: 180000, title: '배터리 사업 턴어라운드', firm: '키움증권', rating: 'Buy', upside: 24.1 },
    { date: '01/18', stockName: '셀트리온', currentPrice: 198000, changeRate: 5.04, targetPrice: 240000, title: '바이오시밀러 시장 확대', firm: '하나증권', rating: 'Buy', upside: 21.2 },
    { date: '01/18', stockName: '삼성바이오로직스', currentPrice: 876000, changeRate: 3.30, targetPrice: 980000, title: 'CMO 수주 확대 전망', firm: '유안타증권', rating: 'Buy', upside: 11.9 },
  ],
  '목표가하향': [
    { date: '01/22', stockName: 'LG전자', currentPrice: 123000, changeRate: -1.76, targetPrice: 115000, title: 'TV 수요 부진 지속', firm: '메리츠증권', rating: 'Sell', upside: 10.6 },
    { date: '01/21', stockName: '한온시스템', currentPrice: 12300, changeRate: -2.38, targetPrice: 11000, title: '전장 부품 수익성 악화', firm: 'KB증권', rating: 'Sell', upside: 13.8 },
    { date: '01/21', stockName: '만도', currentPrice: 56700, changeRate: -2.41, targetPrice: 52000, title: '북미 자동차 생산 감소', firm: '신한투자증권', rating: 'Sell', upside: 17.4 },
    { date: '01/20', stockName: '기아', currentPrice: 98600, changeRate: -2.47, targetPrice: 92000, title: '영업이익률 하락 전망', firm: '대신증권', rating: 'Sell', upside: 17.6 },
    { date: '01/20', stockName: '현대모비스', currentPrice: 267000, changeRate: -2.48, targetPrice: 250000, title: '부품 수주 둔화 우려', firm: '유안타증권', rating: 'Sell', upside: 16.1 },
    { date: '01/19', stockName: '넷마블', currentPrice: 67800, changeRate: 7.79, targetPrice: 60000, title: '신작 게임 흥행 부진', firm: '한국투자증권', rating: 'Sell', upside: 10.3 },
    { date: '01/19', stockName: '위메이드', currentPrice: 45600, changeRate: 7.80, targetPrice: 42000, title: '블록체인 게임 규제 우려', firm: '하나증권', rating: 'Sell', upside: 14.0 },
    { date: '01/18', stockName: '엔씨소프트', currentPrice: 198000, changeRate: 7.90, targetPrice: 180000, title: '중국 게임 시장 둔화', firm: '삼성증권', rating: 'Sell', upside: 11.1 },
    { date: '01/18', stockName: '펄어비스', currentPrice: 34500, changeRate: 7.81, targetPrice: 32000, title: '신규 IP 흥행 불확실성', firm: 'NH투자증권', rating: 'Sell', upside: 10.1 },
    { date: '01/17', stockName: '컴투스', currentPrice: 78900, changeRate: 7.94, targetPrice: 72000, title: '서머너즈워 매출 감소', firm: '키움증권', rating: 'Sell', upside: 10.3 },
  ],
  '기관관심리포트': [
    { date: '01/22', stockName: '삼성전자', currentPrice: 74500, changeRate: 2.05, targetPrice: 85000, title: 'AI 반도체 수요 증가로 목표가 상향', firm: 'KB증권', rating: 'Buy', upside: 14.1, institutionalAmount: '2.23억' },
    { date: '01/22', stockName: 'SK하이닉스', currentPrice: 142000, changeRate: 3.27, targetPrice: 160000, title: 'HBM3 출하 본격화 전망', firm: '미래에셋증권', rating: 'Buy', upside: 12.7, institutionalAmount: '1.87억' },
    { date: '01/21', stockName: 'LG에너지솔루션', currentPrice: 423000, changeRate: -2.76, targetPrice: 520000, title: '북미 수주 확대 기대', firm: '한국투자증권', rating: 'Buy', upside: 22.9, institutionalAmount: '3.45억' },
    { date: '01/21', stockName: '현대차', currentPrice: 234000, changeRate: 1.50, targetPrice: 245000, title: '전기차 판매 증가세 지속', firm: '신한투자증권', rating: 'Buy', upside: 15.4, institutionalAmount: '1.56억' },
    { date: '01/20', stockName: '네이버', currentPrice: 234000, changeRate: 7.88, targetPrice: 280000, title: 'AI 검색 서비스 확대', firm: '한국투자증권', rating: 'Buy', upside: 19.6, institutionalAmount: '2.94억' },
    { date: '01/20', stockName: 'POSCO홀딩스', currentPrice: 389000, changeRate: 3.60, targetPrice: 450000, title: '철강 업황 개선 기대', firm: '삼성증권', rating: 'Buy', upside: 15.7, institutionalAmount: '1.12억' },
    { date: '01/19', stockName: 'KB금융', currentPrice: 78900, changeRate: 3.68, targetPrice: 90000, title: '금리 인하 수혜 전망', firm: 'NH투자증권', rating: 'Buy', upside: 14.1, institutionalAmount: '0.98억' },
    { date: '01/19', stockName: '신한지주', currentPrice: 56700, changeRate: 3.85, targetPrice: 65000, title: '배당 매력 부각', firm: '메리츠증권', rating: 'Buy', upside: 14.6, institutionalAmount: '1.34억' },
    { date: '01/18', stockName: '삼성바이오로직스', currentPrice: 876000, changeRate: 3.30, targetPrice: 980000, title: 'CMO 수주 확대', firm: '유안타증권', rating: 'Buy', upside: 11.9, institutionalAmount: '4.21억' },
    { date: '01/18', stockName: '셀트리온', currentPrice: 198000, changeRate: 5.04, targetPrice: 240000, title: '바이오시밀러 성장', firm: '하나증권', rating: 'Buy', upside: 21.2, institutionalAmount: '2.67억' },
  ],
  '외국인관심리포트': [
    { date: '01/22', stockName: '삼성전자', currentPrice: 74500, changeRate: 2.05, targetPrice: 85000, title: 'AI 반도체 수요 증가로 목표가 상향', firm: 'KB증권', rating: 'Buy', upside: 14.1, foreignAmount: '3.5억' },
    { date: '01/22', stockName: 'SK하이닉스', currentPrice: 142000, changeRate: 3.27, targetPrice: 160000, title: 'HBM3 출하 본격화 전망', firm: '미래에셋증권', rating: 'Buy', upside: 12.7, foreignAmount: '2.8억' },
    { date: '01/21', stockName: '현대차', currentPrice: 234000, changeRate: 1.50, targetPrice: 245000, title: '전기차 판매 증가세 지속', firm: '신한투자증권', rating: 'Buy', upside: 15.4, foreignAmount: '1.7억' },
    { date: '01/21', stockName: 'LG에너지솔루션', currentPrice: 423000, changeRate: -2.76, targetPrice: 520000, title: '북미 수주 확대 기대', firm: '한국투자증권', rating: 'Buy', upside: 22.9, foreignAmount: '4.1억' },
    { date: '01/20', stockName: '네이버', currentPrice: 234000, changeRate: 7.88, targetPrice: 280000, title: 'AI 검색 서비스 확대', firm: '한국투자증권', rating: 'Buy', upside: 19.6, foreignAmount: '3.2억' },
    { date: '01/20', stockName: '카카오', currentPrice: 56700, changeRate: 7.80, targetPrice: 75000, title: '플랫폼 수익성 개선', firm: '대신증권', rating: 'Buy', upside: 32.3, foreignAmount: '2.6억' },
    { date: '01/19', stockName: '삼성바이오로직스', currentPrice: 876000, changeRate: 3.30, targetPrice: 980000, title: 'CMO 수주 확대', firm: '유안타증권', rating: 'Buy', upside: 11.9, foreignAmount: '5.3억' },
    { date: '01/19', stockName: 'POSCO홀딩스', currentPrice: 389000, changeRate: 3.60, targetPrice: 450000, title: '철강 업황 개선 기대', firm: '삼성증권', rating: 'Buy', upside: 15.7, foreignAmount: '2.9억' },
    { date: '01/18', stockName: 'LG화학', currentPrice: 389000, changeRate: 3.60, targetPrice: 450000, title: '배터리 소재 수요 확대', firm: '키움증권', rating: 'Buy', upside: 15.7, foreignAmount: '3.1억' },
    { date: '01/18', stockName: 'SK이노베이션', currentPrice: 145000, changeRate: 3.57, targetPrice: 180000, title: '배터리 사업 개선', firm: '하나증권', rating: 'Buy', upside: 24.1, foreignAmount: '2.4억' },
  ],
  '연기금관심리포트': [
    { date: '01/22', stockName: '삼성전자', currentPrice: 74500, changeRate: 2.05, targetPrice: 85000, title: 'AI 반도체 수요 증가로 목표가 상향', firm: 'KB증권', rating: 'Buy', upside: 14.1, pensionAmount: '4.3억' },
    { date: '01/22', stockName: 'KB금융', currentPrice: 78900, changeRate: 3.68, targetPrice: 90000, title: '금리 인하 수혜 전망', firm: 'NH투자증권', rating: 'Buy', upside: 14.1, pensionAmount: '3.8억' },
    { date: '01/21', stockName: '신한지주', currentPrice: 56700, changeRate: 3.85, targetPrice: 65000, title: '배당 매력 부각', firm: '메리츠증권', rating: 'Buy', upside: 14.6, pensionAmount: '2.7억' },
    { date: '01/21', stockName: '하나금융지주', currentPrice: 67800, changeRate: 3.83, targetPrice: 78000, title: '안정적 수익 구조', firm: '삼성증권', rating: 'Buy', upside: 14.4, pensionAmount: '3.6억' },
    { date: '01/20', stockName: 'POSCO홀딩스', currentPrice: 389000, changeRate: 3.60, targetPrice: 450000, title: '철강 업황 개선 기대', firm: '삼성증권', rating: 'Buy', upside: 15.7, pensionAmount: '4.1억' },
    { date: '01/20', stockName: '현대차', currentPrice: 234000, changeRate: 1.50, targetPrice: 245000, title: '전기차 판매 증가세 지속', firm: '신한투자증권', rating: 'Buy', upside: 15.4, pensionAmount: '3.9억' },
    { date: '01/19', stockName: '삼성물산', currentPrice: 134000, changeRate: 2.76, targetPrice: 155000, title: '건설 수주 호조', firm: '유안타증권', rating: 'Buy', upside: 15.6, pensionAmount: '2.5억' },
    { date: '01/19', stockName: 'SK텔레콤', currentPrice: 56700, changeRate: 1.50, targetPrice: 62000, title: '안정적 배당 매력', firm: '대신증권', rating: 'Buy', upside: 10.0, pensionAmount: '3.3억' },
    { date: '01/18', stockName: 'KT', currentPrice: 34500, changeRate: 1.50, targetPrice: 39000, title: '통신 사업 안정성', firm: 'NH투자증권', rating: 'Buy', upside: 13.0, pensionAmount: '2.8억' },
    { date: '01/18', stockName: 'LG유플러스', currentPrice: 12300, changeRate: 1.49, targetPrice: 14000, title: '5G 가입자 증가', firm: '한국투자증권', rating: 'Buy', upside: 13.8, pensionAmount: '3.0억' },
  ],
  '증권사관심종목': [
    { date: '01/22', stockName: '삼성전자', currentPrice: 74500, changeRate: 2.05, targetPrice: 85000, title: 'AI 반도체 수요 증가로 목표가 상향', firm: 'KB증권', rating: 'Buy', upside: 14.1, reportCount: 15, highestTargetPrice: 90000, lowestTargetPrice: 80000 },
    { date: '01/22', stockName: 'SK하이닉스', currentPrice: 142000, changeRate: 3.27, targetPrice: 160000, title: 'HBM3 출하 본격화 전망', firm: '미래에셋증권', rating: 'Buy', upside: 12.7, reportCount: 12, highestTargetPrice: 170000, lowestTargetPrice: 155000 },
    { date: '01/21', stockName: '네이버', currentPrice: 234000, changeRate: 7.88, targetPrice: 280000, title: 'AI 검색 서비스 확대', firm: '한국투자증권', rating: 'Buy', upside: 19.6, reportCount: 10, highestTargetPrice: 290000, lowestTargetPrice: 270000 },
    { date: '01/21', stockName: '카카오', currentPrice: 56700, changeRate: 7.80, targetPrice: 75000, title: '플랫폼 수익성 개선', firm: '대신증권', rating: 'Buy', upside: 32.3, reportCount: 9, highestTargetPrice: 78000, lowestTargetPrice: 70000 },
    { date: '01/20', stockName: '삼성바이오로직스', currentPrice: 876000, changeRate: 3.30, targetPrice: 980000, title: 'CMO 수주 확대', firm: '유안타증권', rating: 'Buy', upside: 11.9, reportCount: 8, highestTargetPrice: 1000000, lowestTargetPrice: 950000 },
    { date: '01/20', stockName: '셀트리온', currentPrice: 198000, changeRate: 5.04, targetPrice: 240000, title: '바이오시밀러 성장', firm: '하나증권', rating: 'Buy', upside: 21.2, reportCount: 7, highestTargetPrice: 250000, lowestTargetPrice: 230000 },
    { date: '01/19', stockName: 'LG에너지솔루션', currentPrice: 423000, changeRate: -2.76, targetPrice: 520000, title: '북미 수주 확대 기대', firm: '한국투자증권', rating: 'Buy', upside: 22.9, reportCount: 8, highestTargetPrice: 550000, lowestTargetPrice: 500000 },
    { date: '01/19', stockName: '삼성SDI', currentPrice: 567000, changeRate: -3.08, targetPrice: 650000, title: '배터리 수주 확대', firm: '메리츠증권', rating: 'Buy', upside: 15.0, reportCount: 6, highestTargetPrice: 680000, lowestTargetPrice: 620000 },
    { date: '01/18', stockName: '현대차', currentPrice: 234000, changeRate: 1.50, targetPrice: 245000, title: '전기차 판매 증가세 지속', firm: '신한투자증권', rating: 'Buy', upside: 15.4, reportCount: 9, highestTargetPrice: 270000, lowestTargetPrice: 240000 },
    { date: '01/18', stockName: '기아', currentPrice: 98600, changeRate: -2.47, targetPrice: 110000, title: '글로벌 판매 호조', firm: 'KB증권', rating: 'Buy', upside: 11.5, reportCount: 7, highestTargetPrice: 115000, lowestTargetPrice: 105000 },
  ],
  '목표가높음': [
    { date: '01/22', stockName: '삼성바이오로직스', currentPrice: 876000, changeRate: 3.30, targetPrice: 980000, title: 'CMO 수주 확대 전망', firm: '유안타증권', rating: 'Buy', upside: 11.9, targetVsPrice: '112%' },
    { date: '01/22', stockName: '삼성SDI', currentPrice: 567000, changeRate: -3.08, targetPrice: 650000, title: '배터리 수주 지속 확대', firm: '메리츠증권', rating: 'Buy', upside: 15.0, targetVsPrice: '115%' },
    { date: '01/21', stockName: 'LG에너지솔루션', currentPrice: 423000, changeRate: -2.76, targetPrice: 550000, title: '북미 전기차 보조금 확대 기대', firm: '메리츠증권', rating: 'Buy', upside: 29.5, targetVsPrice: '130%' },
    { date: '01/21', stockName: 'POSCO홀딩스', currentPrice: 389000, changeRate: 3.60, targetPrice: 450000, title: '철강 가격 상승 반영', firm: '삼성증권', rating: 'Buy', upside: 15.7, targetVsPrice: '116%' },
    { date: '01/20', stockName: '네이버', currentPrice: 234000, changeRate: 7.88, targetPrice: 280000, title: 'AI 검색 서비스 성장성 평가', firm: '한국투자증권', rating: 'Buy', upside: 19.6, targetVsPrice: '120%' },
    { date: '01/20', stockName: '현대차', currentPrice: 234000, changeRate: 1.50, targetPrice: 270000, title: '전기차 판매 호조, 목표가 상향', firm: 'NH투자증권', rating: 'Buy', upside: 15.4, targetVsPrice: '115%' },
    { date: '01/19', stockName: '셀트리온', currentPrice: 198000, changeRate: 5.04, targetPrice: 240000, title: '바이오시밀러 시장 확대', firm: '하나증권', rating: 'Buy', upside: 21.2, targetVsPrice: '121%' },
    { date: '01/19', stockName: 'SK이노베이션', currentPrice: 145000, changeRate: 3.57, targetPrice: 180000, title: '배터리 사업 턴어라운드', firm: '키움증권', rating: 'Buy', upside: 24.1, targetVsPrice: '124%' },
    { date: '01/18', stockName: 'SK하이닉스', currentPrice: 142000, changeRate: 3.27, targetPrice: 165000, title: 'HBM3E 수주 확대, 목표가 상향', firm: '신한투자증권', rating: 'Buy', upside: 16.2, targetVsPrice: '116%' },
    { date: '01/18', stockName: 'LG화학', currentPrice: 389000, changeRate: 3.60, targetPrice: 450000, title: '배터리 소재 수요 확대', firm: '키움증권', rating: 'Buy', upside: 15.7, targetVsPrice: '116%' },
  ],
};

const getRatingColor = (rating: string) => {
  switch (rating) {
    case 'Buy':
      return 'bg-green-100 text-green-700 border-green-300';
    case 'Hold':
      return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    case 'Sell':
      return 'bg-red-100 text-red-700 border-red-300';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

const getRatingLabel = (rating: string) => {
  switch (rating) {
    case 'Buy': return '매수';
    case 'Hold': return '보유';
    case 'Sell': return '매도';
    default: return rating;
  }
};

// 종목 로고 색상 생성 함수
const getStockColor = (stockName: string) => {
  const colors = [
    'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 'bg-pink-500',
    'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500',
    'bg-lime-500', 'bg-green-500', 'bg-emerald-500', 'bg-teal-500',
    'bg-cyan-500', 'bg-sky-500', 'bg-violet-500', 'bg-fuchsia-500'
  ];
  const index = stockName.charCodeAt(0) % colors.length;
  return colors[index];
};

export function ReportAnalysis() {
  const [activeTab, setActiveTab] = useState<TabType>('신규리포트');
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);

  const data = mockReports[activeTab];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">리포트 분석</h2>
        <p className="text-slate-600 mt-1">증권사 애널리스트 리포트 및 목표가 분석</p>
      </div>

      {/* 탭 영역 */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-8 gap-2">
            <Button
              variant={activeTab === '신규리포트' ? 'default' : 'outline'}
              onClick={() => setActiveTab('신규리포트')}
              className={`text-xs py-2 h-auto ${activeTab === '신규리포트' ? 'bg-blue-500 text-white' : ''}`}
            >
              신규리포트
            </Button>
            <Button
              variant={activeTab === '목표가상향' ? 'default' : 'outline'}
              onClick={() => setActiveTab('목표가상향')}
              className={`text-xs py-2 h-auto ${activeTab === '목표가상향' ? 'bg-blue-500 text-white' : ''}`}
            >
              목표가상향
            </Button>
            <Button
              variant={activeTab === '목표가하향' ? 'default' : 'outline'}
              onClick={() => setActiveTab('목표가하향')}
              className={`text-xs py-2 h-auto ${activeTab === '목표가하향' ? 'bg-blue-500 text-white' : ''}`}
            >
              목표가하향
            </Button>
            <Button
              variant={activeTab === '기관관심리포트' ? 'default' : 'outline'}
              onClick={() => setActiveTab('기관관심리포트')}
              className={`text-xs py-2 h-auto ${activeTab === '기관관심리포트' ? 'bg-blue-500 text-white' : ''}`}
            >
              기관관심리포트
            </Button>
            <Button
              variant={activeTab === '외국인관심리포트' ? 'default' : 'outline'}
              onClick={() => setActiveTab('외국인관심리포트')}
              className={`text-xs py-2 h-auto ${activeTab === '외국인관심리포트' ? 'bg-blue-500 text-white' : ''}`}
            >
              외국인관심리포트
            </Button>
            <Button
              variant={activeTab === '연기금관심리포트' ? 'default' : 'outline'}
              onClick={() => setActiveTab('연기금관심리포트')}
              className={`text-xs py-2 h-auto ${activeTab === '연기금관심리포트' ? 'bg-blue-500 text-white' : ''}`}
            >
              연기금관심리포트
            </Button>
            <Button
              variant={activeTab === '증권사관심종목' ? 'default' : 'outline'}
              onClick={() => setActiveTab('증권사관심종목')}
              className={`text-xs py-2 h-auto ${activeTab === '증권사관심종목' ? 'bg-blue-500 text-white' : ''}`}
            >
              증권사관심종목
            </Button>
            <Button
              variant={activeTab === '목표가높음' ? 'default' : 'outline'}
              onClick={() => setActiveTab('목표가높음')}
              className={`text-xs py-2 h-auto ${activeTab === '목표가높음' ? 'bg-blue-500 text-white' : ''}`}
            >
              목표가높음
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 테이블 영역 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-end mb-4">
            <span className="text-sm text-slate-500">업데이트 01/22 09:25</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-center py-3 px-4 font-semibold text-slate-700">날짜</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">종목명</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-700">등락률</th>
                  {activeTab === '기관관심리포트' ? (
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">기관누적순매매금액</th>
                  ) : activeTab === '외국인관심리포트' ? (
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">외국인누적순매매금액</th>
                  ) : activeTab === '연기금관심리포트' ? (
                    <th className="text-right py-3 px-4 font-semibold text-slate-700">연기금누적순매매금액</th>
                  ) : activeTab === '증권사관심종목' ? (
                    <>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">리포트수량</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">최고목표가</th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">최저목표가</th>
                    </>
                  ) : activeTab === '목표가높음' ? (
                    <>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">목표가</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">주가대비</th>
                    </>
                  ) : (
                    <>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">목표가</th>
                      <th className="text-center py-3 px-4 font-semibold text-slate-700">투자의견</th>
                    </>
                  )}
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    {activeTab === '증권사관심종목' ? '최신리포트' : '제목'}
                  </th>
                  {activeTab !== '증권사관심종목' && (
                    <th className="text-center py-3 px-4 font-semibold text-slate-700">증권사</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {data.map((report, idx) => (
                  <tr 
                    key={idx} 
                    className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-center text-slate-600">{report.date}</td>
                    <td className="py-3 px-4 font-medium text-blue-600 cursor-pointer hover:underline">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full ${getStockColor(report.stockName)} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                          {report.stockName.charAt(0)}
                        </div>
                        <span>{report.stockName}</span>
                      </div>
                    </td>
                    <td className={`py-3 px-4 text-right font-semibold ${
                      report.changeRate > 0 
                        ? 'text-red-600' 
                        : report.changeRate < 0 
                        ? 'text-blue-600' 
                        : 'text-slate-600'
                    }`}>
                      {report.changeRate > 0 ? '+' : ''}{report.changeRate}%
                    </td>
                    {activeTab === '기관관심리포트' ? (
                      <td className="py-3 px-4 text-right font-semibold text-slate-900">
                        {report.institutionalAmount}
                      </td>
                    ) : activeTab === '외국인관심리포트' ? (
                      <td className="py-3 px-4 text-right font-semibold text-slate-900">
                        {report.foreignAmount}
                      </td>
                    ) : activeTab === '연기금관심리포트' ? (
                      <td className="py-3 px-4 text-right font-semibold text-slate-900">
                        {report.pensionAmount}
                      </td>
                    ) : activeTab === '증권사관심종목' ? (
                      <>
                        <td className="py-3 px-4 text-center font-semibold text-slate-900">
                          {report.reportCount}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-slate-900">
                          {report.highestTargetPrice.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-slate-900">
                          {report.lowestTargetPrice.toLocaleString()}
                        </td>
                      </>
                    ) : activeTab === '목표가높음' ? (
                      <>
                        <td className="py-3 px-4 text-right font-semibold text-slate-900">
                          {report.targetPrice.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-center font-semibold text-slate-900">
                          {report.targetVsPrice}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="py-3 px-4 text-right font-semibold text-slate-900">
                          {report.targetPrice.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant="outline" className={getRatingColor(report.rating)}>
                            {report.rating}
                          </Badge>
                        </td>
                      </>
                    )}
                    <td 
                      className="py-3 px-4 text-slate-700 max-w-md truncate cursor-pointer hover:text-blue-600 hover:underline"
                      onClick={() => setSelectedReport(report)}
                    >
                      {report.title}
                    </td>
                    {activeTab !== '증권사관심종목' && (
                      <td className="py-3 px-4 text-center text-slate-600">
                        {report.firm}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 하단 설명 및 페이징 */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-200">
            {/* 왼쪽 설명 문구 */}
            <div className="text-sm text-slate-600">
              {activeTab === '신규리포트' && (
                <span>신규리포트는 증권사에서 '신규매수'의견을 제시한 리포트 입니다.</span>
              )}
              {activeTab === '목표가상향' && (
                <span>해당 증권사에서 최근 3개월이내에 발표한 리포트 중, 직전 목표가 대비 목표가가 상향된 종목입니다.</span>
              )}
              {activeTab === '목표가하향' && (
                <span>해당 증권사에서 최근 3개월이내에 발표한 리포트 중, 직전 목표가 대비 목표가가 하향된 종목입니다.</span>
              )}
              {activeTab === '기관관심리포트' && (
                <span>리포트 발표 당일 기관의 순매수량이 큰 종목입니다.</span>
              )}
              {activeTab === '외국인관심리포트' && (
                <span>리포트 발표 당일 외국인의 순매수량이 큰 종목입니다.</span>
              )}
              {activeTab === '연기금관심리포트' && (
                <span>리포트 발표 당일 연기금의 순매수량이 큰 종목입니다.</span>
              )}
              {activeTab === '증권사관심종목' && (
                <span>오늘 증권사의 리포트가 많이 발생한 종목입니다.</span>
              )}
              {activeTab === '목표가높음' && (
                <span>오늘 발표한 리포트 중, 목표가와 현재가의 괴리율이 큰 종목입니다.</span>
              )}
            </div>

            {/* 오른쪽 페이징 */}
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed">
                ‹
              </button>
              <button className="px-3 py-1 bg-blue-500 text-white rounded">1</button>
              <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-100">2</button>
              <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-100">3</button>
              <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-100">4</button>
              <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-100">5</button>
              <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-100">
                ›
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 리포트 상세 팝업 */}
      {selectedReport && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto pointer-events-auto border border-slate-200">
            <div className="p-6">
              {/* 헤더 */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold pr-8">
                  [{selectedReport.stockName}]<br />
                  {selectedReport.title}
                </h3>
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* 증권사 및 날짜 */}
              <div className="text-sm text-slate-500 mb-6">
                {selectedReport.firm} | {selectedReport.date}
              </div>

              {/* 목표가 및 투자의견 */}
              <div className="space-y-3 mb-6">
                <div>
                  <span className="text-sm text-slate-600">목표가 : </span>
                  <span className="font-semibold">{selectedReport.targetPrice.toLocaleString()} 원</span>
                </div>
                <div>
                  <span className="text-sm text-slate-600">투자의견 : </span>
                  <span className="font-semibold">{selectedReport.rating}</span>
                </div>
              </div>

              {/* 상세 내용 */}
              <div className="text-sm text-slate-700 leading-relaxed">
                {selectedReport.content || '상세 내용이 제공되지 않습니다.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}