import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { useState } from 'react';

type MainTabType = '수주공시' | '지분공시' | '신규투자공시' | '전환사채공시' | '실적공시(확정)' | '실적공시(잠정)';

type SubTabType = {
  '수주공시': '매출액 10%이상' | '매출액 30%이상' | '매출액 50%이상';
  '지분공시': '주요주주지분변동' | '최대주주지분변동';
  '신규투자공시': '신규투자예정' | '신규투자종료예정';
  '전환사채공시': '전환사채발행공시' | '전환사채 청구기간 시작';
  '실적공시(확정)': '전체보기' | '어닝서프라이즈' | '3년최고영업이익';
  '실적공시(잠정)': '전체보기' | '어닝서프라이즈' | '3년최고영업이익';
};

interface OrderDisclosure {
  date: string;
  stockName: string;
  contractAmount: string;
  salesRatio: string;
  contractPeriod: string;
  contractContent: string;
  contractParty: string;
}

interface ShareholdingDisclosure {
  date: string;
  stockName: string;
  reporter: string;
  relation: string;
  reportReason: string;
  shares: string;
  changeRate: string;
}

interface InvestmentDisclosure {
  date: string;
  stockName: string;
  investmentAmount: string;
  assetRatio: string;
  investmentStart: string;
  investmentEnd: string;
  purpose: string;
  investmentDetails: string;
}

interface ConvertibleBondDisclosure {
  date: string;
  stockName: string;
  issuer: string;
  issueAmount: string;
  managerNum: string;
  shareNum: string;
  exercisePrice: string;
  exerciseRate: string;
  exercisePeriod: string;
}

interface EarningsDisclosure {
  date: string;
  stockName: string;
  period: string;
  salesActual: string;
  salesGrowth: string;
  opActual: string;
  opGrowth: string;
  opMargin: string;
  npActual: string;
  npGrowth: string;
}

const mockOrderData: Record<SubTabType['수주공시'], OrderDisclosure[]> = {
  '매출액 10%이상': [
    { date: '01/22', stockName: '영우디에스피', contractAmount: '71억', salesRatio: '11.9%', contractPeriod: '10개월', contractContent: 'DISPLAY레이저비', contractParty: 'SAMSUNG DISPLAY VIETNAM CO.,LTD.' },
    { date: '01/22', stockName: '아이에스티이', contractAmount: '44억', salesRatio: '10.7%', contractPeriod: '8개월', contractContent: '반도체 Automation 장비 판매', contractParty: '에스케이하이닉스 주식회사' },
    { date: '01/22', stockName: 'SK바이오팜', contractAmount: '666억', salesRatio: '12.1%', contractPeriod: '-', contractContent: '의약품 공급계약', contractParty: 'SK Life Science,Inc.' },
    { date: '01/21', stockName: 'HD현대마린엔진', contractAmount: '365억', salesRatio: '11.5%', contractPeriod: '33개월', contractContent: '선박엔진 공급계약', contractParty: 'XIAMEN XMXYG SHIPBUILDING TRADING CO.,LTD.' },
    { date: '01/20', stockName: '파이버프로', contractAmount: '49억', salesRatio: '14.9%', contractPeriod: '4개월', contractContent: '광섬유장치(IMU) 공급계약', contractParty: 'Viavi Solutions Inc.' },
    { date: '01/19', stockName: '브이엠', contractAmount: '186억', salesRatio: '26.4%', contractPeriod: '3개월', contractContent: '반도체 제조장비', contractParty: 'SK hynix Semiconductor (China) Ltd.' },
  ],
  '매출액 30%이상': [
    { date: '01/22', stockName: '브이엠', contractAmount: '186억', salesRatio: '36.4%', contractPeriod: '3개월', contractContent: '반도체 제조장비', contractParty: 'SK hynix Semiconductor' },
    { date: '01/21', stockName: '에이치엘비', contractAmount: '125억', salesRatio: '32.8%', contractPeriod: '6개월', contractContent: '의약품 공급계약', contractParty: 'Global Pharma Inc.' },
    { date: '01/20', stockName: '파트론', contractAmount: '89억', salesRatio: '31.2%', contractPeriod: '5개월', contractContent: '통신부품 공급', contractParty: 'Samsung Electronics' },
  ],
  '매출액 50%이상': [
    { date: '01/21', stockName: '엔씨소프트', contractAmount: '450억', salesRatio: '52.3%', contractPeriod: '12개월', contractContent: '게임 라이선스 계약', contractParty: 'Tencent Games' },
    { date: '01/19', stockName: '큐렉소', contractAmount: '280억', salesRatio: '58.9%', contractPeriod: '8개월', contractContent: '바이오 시약 공급', contractParty: 'Bio Solutions Ltd.' },
  ],
};

const mockShareholdingData: Record<SubTabType['지분공시'], ShareholdingDisclosure[]> = {
  '주요주주지분변동': [
    { date: '01/22', stockName: '경농', reporter: '이용진', relation: '등기임원/대표이사/사실상지배주주', reportReason: '장내매수(+)', shares: '33,299', changeRate: '0.17%' },
    { date: '01/22', stockName: '솔루엠', reporter: '전성호', relation: '등기임원/대표이사/사실상지배주주', reportReason: '장내매수(+)', shares: '10,000', changeRate: '0.02%' },
    { date: '01/21', stockName: '대한강업', reporter: '(주)현대재포풀덩스', relation: '-/-/사실상지배주주', reportReason: '장내매수(+)', shares: '300,500', changeRate: '0.48%' },
    { date: '01/21', stockName: '비엠캠텍', reporter: '박영철', relation: '등기임원/대표이사/10%이상주주', reportReason: '장내매수(+)', shares: '29,000', changeRate: '0.11%' },
    { date: '01/21', stockName: '에이직랜드', reporter: '이석수', relation: '등기임원/사내이사/-', reportReason: '시간외매매(-)', shares: '-108,700', changeRate: '-1.13%' },
  ],
  '최대주주지분변동': [
    { date: '01/22', stockName: '경농', reporter: '이용진', relation: '등기임원/대표이사/사실상지배주주', reportReason: '장내매수(+)', shares: '33,299', changeRate: '0.17%' },
    { date: '01/21', stockName: '대한강업', reporter: '(주)현대재포풀덩스', relation: '-/-/사실상지배주주', reportReason: '장내매수(+)', shares: '300,500', changeRate: '0.48%' },
  ],
};

const mockInvestmentData: Record<SubTabType['신규투자공시'], InvestmentDisclosure[]> = {
  '신규투자예정': [
    { date: '01/20', stockName: '코리아써키트', investmentAmount: '993억', assetRatio: '14.6%', investmentStart: '2026/01/20', investmentEnd: '2026/12/31', purpose: '시설증설(기계장치, 부대시설 등)', investmentDetails: '-메모리반도체 및 첨단 패키징시장 대응을 …' },
    { date: '01/16', stockName: '와이엠텍', investmentAmount: '391억', assetRatio: '12.9%', investmentStart: '2026/03/01', investmentEnd: '2028/04/30', purpose: '신규시설투자', investmentDetails: '-소각로 설교투자를 통한 매출증대 및 성장성…' },
    { date: '01/06', stockName: '삼미금속', investmentAmount: '89억', assetRatio: '9.9%', investmentStart: '2026/01/06', investmentEnd: '2026/12/31', purpose: '삼미금속 분사 공장 시설투자', investmentDetails: '-카태탈로드 언제홈 생산을 위한 시설투자' },
    { date: '12/26', stockName: '티케이항공', investmentAmount: '1,344억', assetRatio: '34.7%', investmentStart: '2025/12/26', investmentEnd: '2038/09/30', purpose: '신규시설투자(신기술 향공기 예비 엔진 도입', investmentDetails: '-신기술 항공기 구매에 따른 예비 엔진 도입' },
    { date: '12/17', stockName: '두산에너빌러티', investmentAmount: '8,068억', assetRatio: '6.9%', investmentStart: '2026/03/01', investmentEnd: '2031/06/30', purpose: '신규시설투자(SMR 진출공장 신축 및 기존 공…', investmentDetails: '-SMR 사업진대에 따른 제조 Capacity 확보' },
  ],
  '신규투자종료예정': [
    { date: '01/20', stockName: '한화에어로스페이스', investmentAmount: '650억', assetRatio: '8.2%', investmentStart: '2024/03/01', investmentEnd: '2026/01/31', purpose: '항공우주 부품 생산시설 확충', investmentDetails: '-차세대 항공기 부품 생산을 위한 설비투자 완료 예정' },
    { date: '01/18', stockName: 'LG디스플레이', investmentAmount: '1,200억', assetRatio: '5.4%', investmentStart: '2024/06/01', investmentEnd: '2026/02/28', purpose: 'OLED 생산라인 증설', investmentDetails: '-중소형 OLED 생산능력 확대를 위한 투자 종료' },
  ],
};

const mockConvertibleBondData: Record<SubTabType['전환사채공시'], ConvertibleBondDisclosure[]> = {
  '전환사채발행공시': [
    { date: '01/21', stockName: '블루산업개발', issuer: '무기명식 이권부 무보증 사모 전환사채(3회)', managerNum: '30억', issueAmount: '20290130', shareNum: '보통주', exercisePrice: '3,541,912\n5.9%', exerciseRate: '', exercisePeriod: '2027/01/30 ~\n2028/12/30' },
    { date: '01/21', stockName: 'CSA 코스믹', issuer: '무기명식 이권부 무보증 사모 전환사채(4회)', managerNum: '50억', issueAmount: '20290130', shareNum: '보통주', exercisePrice: '10,615,711\n12.8%', exerciseRate: '', exercisePeriod: '2027/01/30 ~\n2028/12/30' },
    { date: '01/21', stockName: '비비안', issuer: '비비안 제5회차 무기명식 이권부 무보증 사모 …', managerNum: '150억', issueAmount: '20290129', shareNum: '보통주', exercisePrice: '25,906,735\n57.3%', exerciseRate: '', exercisePeriod: '2027/01/29 ~\n2028/12/29' },
    { date: '01/21', stockName: '오가닉티코스메틱', issuer: '해외 기명식 무보증 사모 전환사채(7회)', managerNum: '110억', issueAmount: '20290129', shareNum: '보통주', exercisePrice: '56,965,206\n22.7%', exerciseRate: '', exercisePeriod: '2027/01/30 ~\n2028/01/29' },
    { date: '01/20', stockName: '케스피온', issuer: '무기명식 이권부 무보증 사모 전환사채(11회)', managerNum: '20억', issueAmount: '20310128', shareNum: '보통주', exercisePrice: '4,178,000\n9.9%', exerciseRate: '', exercisePeriod: '2027/01/28 ~\n2030/12/27' },
  ],
  '전환사채 청구기간 시작': [
    { date: '01/22', stockName: '블루산업개발', issuer: '무기명식 이권부 무보증 사모 전환사채(3회)', managerNum: '30억', issueAmount: '20290130', shareNum: '보통주', exercisePrice: '3,541,912\n5.9%', exerciseRate: '', exercisePeriod: '2027/01/30 ~\n2028/12/30' },
  ],
};

const mockEarningsData: Record<SubTabType['실적공시(확정)'], EarningsDisclosure[]> = {
  '전체보기': [
    { date: '01/21', stockName: '금광그린파워', period: '2024.12(연결)', salesActual: '-', salesGrowth: '-', opActual: '-', opGrowth: '-', opMargin: '', npActual: '-', npGrowth: '-' },
    { date: '01/21', stockName: '금광그린파워', period: '2024.12(개별)', salesActual: '-', salesGrowth: '-', opActual: '-', opGrowth: '-', opMargin: '', npActual: '-', npGrowth: '-' },
    { date: '01/19', stockName: 'DMS', period: '2024.12(개별)', salesActual: '-', salesGrowth: '-', opActual: '-', opGrowth: '-', opMargin: '', npActual: '-', npGrowth: '-' },
    { date: '01/19', stockName: 'DMS', period: '2024.12(연결)', salesActual: '-', salesGrowth: '-', opActual: '-', opGrowth: '-', opMargin: '', npActual: '-', npGrowth: '-' },
    { date: '01/07', stockName: '하이브', period: '2025.09(연결)', salesActual: '7,271.81억', salesGrowth: '38%', opActual: '-421.98억', opGrowth: '-', opMargin: '', npActual: '-216%', npGrowth: '-520.33억' },
    { date: '01/07', stockName: '하이브', period: '2025.06(연결)', salesActual: '7,056.49억', salesGrowth: '10%', opActual: '659.19억', opGrowth: '30%', opMargin: '', npActual: '-2%', npGrowth: '154.58억' },
    { date: '01/07', stockName: '하이브', period: '2025.09(개별)', salesActual: '2,982.91억', salesGrowth: '136%', opActual: '108.06억', opGrowth: '110%', opMargin: '', npActual: '-', npGrowth: '318.24억' },
    { date: '01/07', stockName: '하이브', period: '2025.06(개별)', salesActual: '2,120.63억', salesGrowth: '-1%', opActual: '144.46억', opGrowth: '-8%', opMargin: '', npActual: '-', npGrowth: '-89.76억' },
  ],
  '어닝서프라이즈': [
    { date: '01/07', stockName: '하이브', period: '2025.09(연결)', salesActual: '7,271.81억', salesGrowth: '38%', opActual: '-421.98억', opGrowth: '-', opMargin: '', npActual: '-216%', npGrowth: '-520.33억' },
    { date: '01/07', stockName: '하이브', period: '2025.06(연결)', salesActual: '7,056.49억', salesGrowth: '10%', opActual: '659.19억', opGrowth: '30%', opMargin: '', npActual: '-2%', npGrowth: '154.58억' },
  ],
  '3년최고영업이익': [
    { date: '01/07', stockName: '하이브', period: '2025.06(연결)', salesActual: '7,056.49억', salesGrowth: '10%', opActual: '659.19억', opGrowth: '30%', opMargin: '', npActual: '-2%', npGrowth: '154.58억' },
  ],
};

const mockEarningsProvisionalData: Record<SubTabType['실적공시(잠정)'], EarningsDisclosure[]> = {
  '전체보기': [
    { date: '01/22', stockName: '덴토', period: '2025.12(연결)', salesActual: '-', salesGrowth: '-', opActual: '-', opGrowth: '-', opMargin: '', npActual: '-', npGrowth: '-' },
    { date: '01/22', stockName: '삼성에스디에스', period: '2025.12(연결)', salesActual: '35,368.03억', salesGrowth: '-3%', opActual: '2,261.01억', opGrowth: '7%', opMargin: '', npActual: '-5%', npGrowth: '1,879.06억' },
    { date: '01/22', stockName: '조비', period: '2025.12(개별)', salesActual: '-', salesGrowth: '-', opActual: '-', opGrowth: '-', opMargin: '', npActual: '-', npGrowth: '-' },
    { date: '01/21', stockName: '강원랜드', period: '2025.12(연결)', salesActual: '-', salesGrowth: '-', opActual: '-', opGrowth: '-', opMargin: '', npActual: '-', npGrowth: '-' },
    { date: '01/21', stockName: '한솔바이오파마', period: '2025.12(연결)', salesActual: '375.49억', salesGrowth: '3%', opActual: '-20.16억', opGrowth: '-', opMargin: '', npActual: '-', npGrowth: '-62.48억' },
    { date: '01/21', stockName: '큐리오시스', period: '2025.12(연결)', salesActual: '-', salesGrowth: '-', opActual: '-', opGrowth: '-', opMargin: '', npActual: '-', npGrowth: '-' },
    { date: '01/21', stockName: 'HD현대중공업', period: '2025.12(개별)', salesActual: '-', salesGrowth: '-', opActual: '-', opGrowth: '-', opMargin: '', npActual: '-', npGrowth: '-' },
  ],
  '어닝서프라이즈': [
    { date: '01/22', stockName: '삼성에스디에스', period: '2025.12(연결)', salesActual: '35,368.03억', salesGrowth: '-3%', opActual: '2,261.01억', opGrowth: '7%', opMargin: '', npActual: '-5%', npGrowth: '1,879.06억' },
    { date: '01/21', stockName: '한솔바이오파마', period: '2025.12(연결)', salesActual: '375.49억', salesGrowth: '3%', opActual: '-20.16억', opGrowth: '-', opMargin: '', npActual: '-', npGrowth: '-62.48억' },
  ],
  '3년최고영업이익': [
    { date: '01/22', stockName: '삼성에스디에스', period: '2025.12(연결)', salesActual: '35,368.03억', salesGrowth: '-3%', opActual: '2,261.01억', opGrowth: '7%', opMargin: '', npActual: '-5%', npGrowth: '1,879.06억' },
  ],
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

export function DisclosureAnalysis() {
  const [mainTab, setMainTab] = useState<MainTabType>('수주공시');
  const [subTab수주공시, setSubTab수주공시] = useState<SubTabType['수주공시']>('매출액 10%이상');
  const [subTab지분공시, setSubTab지분공시] = useState<SubTabType['지분공시']>('주요주주지분변동');
  const [subTab신규투자공시, setSubTab신규투자공시] = useState<SubTabType['신규투자공시']>('신규투자예정');
  const [subTab전환사채공시, setSubTab전환사채공시] = useState<SubTabType['전환사채공시']>('전환사채발행공시');
  const [subTab실적확정, setSubTab실적확정] = useState<SubTabType['실적공시(확정)']>('전체보기');
  const [subTab실적잠정, setSubTab실적잠정] = useState<SubTabType['실적공시(잠정)']>('전체보기');

  const renderContent = () => {
    if (mainTab === '수주공시') {
      const data = mockOrderData[subTab수주공시];
      return (
        <div>
          <div className="flex gap-4 mb-6">
            <Button
              variant={subTab수주공시 === '매출액 10%이상' ? 'default' : 'outline'}
              onClick={() => setSubTab수주공시('매출액 10%이상')}
              className={subTab수주공시 === '매출액 10%이상' ? 'bg-blue-500 text-white' : ''}
            >
              매출액 10%이상
            </Button>
            <Button
              variant={subTab수주공시 === '매출액 30%이상' ? 'default' : 'outline'}
              onClick={() => setSubTab수주공시('매출액 30%이상')}
              className={subTab수주공시 === '매출액 30%이상' ? 'bg-blue-500 text-white' : ''}
            >
              매출액 30%이상
            </Button>
            <Button
              variant={subTab수주공시 === '매출액 50%이상' ? 'default' : 'outline'}
              onClick={() => setSubTab수주공시('매출액 50%이상')}
              className={subTab수주공시 === '매출액 50%이상' ? 'bg-blue-500 text-white' : ''}
            >
              매출액 50%이상
            </Button>
          </div>

          <div className="text-right text-sm text-slate-500 mb-4">업데이트 01/22 14:40</div>

          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-300 bg-slate-50">
                <th className="text-center py-3 px-4 font-semibold text-slate-700">날짜</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">종목명</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-700">계약금액</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">매출액대비</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">계약기간</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">계약내용</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">계약상대</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-center text-slate-600">{item.date}</td>
                  <td className="py-3 px-4 font-medium text-blue-600">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${getStockColor(item.stockName)} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                        {item.stockName.charAt(0)}
                      </div>
                      <span>{item.stockName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-slate-900">{item.contractAmount}</td>
                  <td className="py-3 px-4 text-center font-semibold text-red-600">{item.salesRatio}</td>
                  <td className="py-3 px-4 text-center text-slate-600">{item.contractPeriod}</td>
                  <td className="py-3 px-4 text-slate-700">{item.contractContent}</td>
                  <td className="py-3 px-4 text-slate-600">{item.contractParty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (mainTab === '지분공시') {
      const data = mockShareholdingData[subTab지분공시];
      return (
        <div>
          <div className="flex gap-4 mb-6">
            <Button
              variant={subTab지분공시 === '주요주주지분변동' ? 'default' : 'outline'}
              onClick={() => setSubTab지분공시('주요주주지분변동')}
              className={subTab지분공시 === '주요주주지분변동' ? 'bg-blue-500 text-white' : ''}
            >
              주요주주지분변동
            </Button>
            <Button
              variant={subTab지분공시 === '최대주주지분변동' ? 'default' : 'outline'}
              onClick={() => setSubTab지분공시('최대주주지분변동')}
              className={subTab지분공시 === '최대주주지분변동' ? 'bg-blue-500 text-white' : ''}
            >
              최대주주지분변동
            </Button>
          </div>

          <div className="text-right text-sm text-slate-500 mb-4">업데이트 01/21 17:50</div>

          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-300 bg-slate-50">
                <th className="text-center py-3 px-4 font-semibold text-slate-700">날짜</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">종목명</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">보고자</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">관계</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">보고사유</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-700">증감 주식수</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">증감 비율</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-center text-slate-600">{item.date}</td>
                  <td className="py-3 px-4 font-medium text-blue-600">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${getStockColor(item.stockName)} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                        {item.stockName.charAt(0)}
                      </div>
                      <span>{item.stockName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-slate-700">{item.reporter}</td>
                  <td className="py-3 px-4 text-center text-slate-600 text-sm">{item.relation}</td>
                  <td className="py-3 px-4 text-slate-700">{item.reportReason}</td>
                  <td className="py-3 px-4 text-right font-semibold text-slate-900">{item.shares}</td>
                  <td className={`py-3 px-4 text-center font-semibold ${
                    item.changeRate.startsWith('-') ? 'text-blue-600' : 'text-red-600'
                  }`}>{item.changeRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (mainTab === '신규투자공시') {
      const data = mockInvestmentData[subTab신규투자공시];
      return (
        <div>
          <div className="flex gap-4 mb-6">
            <Button
              variant={subTab신규투자공시 === '신규투자예정' ? 'default' : 'outline'}
              onClick={() => setSubTab신규투자공시('신규투자예정')}
              className={subTab신규투자공시 === '신규투자예정' ? 'bg-blue-500 text-white' : ''}
            >
              신규투자예정
            </Button>
            <Button
              variant={subTab신규투자공시 === '신규투자종료예정' ? 'default' : 'outline'}
              onClick={() => setSubTab신규투자공시('신규투자종료예정')}
              className={subTab신규투자공시 === '신규투자종료예정' ? 'bg-blue-500 text-white' : ''}
            >
              신규투자종료예정
            </Button>
          </div>

          <div className="text-right text-sm text-slate-500 mb-4">업데이트 01/20 16:20</div>

          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-300 bg-slate-50">
                <th className="text-center py-3 px-4 font-semibold text-slate-700">분석날짜</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">종목명</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-700">투자금액</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">자기자본대비</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">투자시작</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">투자종료</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">투자내용 및 목적</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-center text-slate-600">{item.date}</td>
                  <td className="py-3 px-4 font-medium text-blue-600">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${getStockColor(item.stockName)} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                        {item.stockName.charAt(0)}
                      </div>
                      <span>{item.stockName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-red-600">{item.investmentAmount}</td>
                  <td className="py-3 px-4 text-center font-semibold text-red-600">{item.assetRatio}</td>
                  <td className="py-3 px-4 text-center text-slate-600">{item.investmentStart}</td>
                  <td className="py-3 px-4 text-center text-slate-600">{item.investmentEnd}</td>
                  <td className="py-3 px-4 text-slate-700">
                    <div className="max-w-md">
                      <div className="font-medium mb-1">{item.purpose}</div>
                      <div className="text-sm text-slate-600">{item.investmentDetails}</div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (mainTab === '전환사채공시') {
      const data = mockConvertibleBondData[subTab전환사채공시];
      return (
        <div>
          <div className="flex gap-4 mb-6">
            <Button
              variant={subTab전환사채공시 === '전환사채발행공시' ? 'default' : 'outline'}
              onClick={() => setSubTab전환사채공시('전환사채발행공시')}
              className={subTab전환사채공시 === '전환사채발행공시' ? 'bg-blue-500 text-white' : ''}
            >
              전환사채발행공시
            </Button>
            <Button
              variant={subTab전환사채공시 === '전환사채 청구기간 시작' ? 'default' : 'outline'}
              onClick={() => setSubTab전환사채공시('전환사채 청구기간 시작')}
              className={subTab전환사채공시 === '전환사채 청구기간 시작' ? 'bg-blue-500 text-white' : ''}
            >
              전환사채 청구기간 시작
            </Button>
          </div>

          <div className="text-right text-sm text-slate-500 mb-4">업데이트 01/22 08:02</div>

          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-300 bg-slate-50">
                <th className="text-center py-3 px-4 font-semibold text-slate-700">날짜</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">종목명</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">사채종류</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">총액</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">만기일</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">주식종류</th>
                <th className="text-right py-3 px-4 font-semibold text-slate-700">주식수(비율)</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">전환청구기간</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-center text-slate-600">{item.date}</td>
                  <td className="py-3 px-4 font-medium text-blue-600">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${getStockColor(item.stockName)} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                        {item.stockName.charAt(0)}
                      </div>
                      <span>{item.stockName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-700 text-sm max-w-xs truncate">{item.issuer}</td>
                  <td className="py-3 px-4 text-center font-semibold text-red-600">{item.managerNum}</td>
                  <td className="py-3 px-4 text-center text-slate-600">{item.issueAmount}</td>
                  <td className="py-3 px-4 text-center text-slate-600">{item.shareNum}</td>
                  <td className="py-3 px-4 text-right font-semibold text-slate-900 whitespace-pre-line">{item.exercisePrice}</td>
                  <td className="py-3 px-4 text-slate-700 whitespace-pre-line">{item.exercisePeriod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (mainTab === '실적공시(확정)') {
      const data = mockEarningsData[subTab실적확정];
      return (
        <div>
          <div className="flex gap-4 mb-6">
            <Button
              variant={subTab실적확정 === '전체보기' ? 'default' : 'outline'}
              onClick={() => setSubTab실적확정('전체보기')}
              className={subTab실적확정 === '전체보기' ? 'bg-blue-500 text-white' : ''}
            >
              전체보기
            </Button>
            <Button
              variant={subTab실적확정 === '어닝서프라이즈' ? 'default' : 'outline'}
              onClick={() => setSubTab실적확정('어닝서프라이즈')}
              className={subTab실적확정 === '어닝서프라이즈' ? 'bg-blue-500 text-white' : ''}
            >
              어닝서프라이즈
            </Button>
            <Button
              variant={subTab실적확정 === '3년최고영업이익' ? 'default' : 'outline'}
              onClick={() => setSubTab실적확정('3년최고영업이익')}
              className={subTab실적확정 === '3년최고영업이익' ? 'bg-blue-500 text-white' : ''}
            >
              3년최고영업이익
            </Button>
          </div>

          <div className="text-right text-sm text-slate-500 mb-4">업데이트 01/21 16:57</div>

          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-300 bg-slate-50">
                <th className="text-center py-3 px-4 font-semibold text-slate-700">날짜</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">종목명</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">기준</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700" colSpan={2}>매출액</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700" colSpan={3}>영업이익</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700" colSpan={2}>당기순이익</th>
              </tr>
              <tr className="border-b border-slate-300 bg-slate-50">
                <th className="py-2"></th>
                <th className="py-2"></th>
                <th className="py-2"></th>
                <th className="text-center py-2 px-2 text-sm text-slate-600">당기</th>
                <th className="text-center py-2 px-2 text-sm text-slate-600">전년동기비</th>
                <th className="text-center py-2 px-2 text-sm text-slate-600">당기</th>
                <th className="text-center py-2 px-2 text-sm text-slate-600">전년동기비</th>
                <th className="text-center py-2 px-2 text-sm text-slate-600">예측대비</th>
                <th className="text-center py-2 px-2 text-sm text-slate-600">당기</th>
                <th className="text-center py-2 px-2 text-sm text-slate-600">전년동기비</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-center text-slate-600">{item.date}</td>
                  <td className="py-3 px-4 font-medium text-blue-600">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${getStockColor(item.stockName)} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                        {item.stockName.charAt(0)}
                      </div>
                      <span>{item.stockName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-slate-600 text-sm">{item.period}</td>
                  <td className="py-3 px-4 text-center text-slate-700">{item.salesActual}</td>
                  <td className={`py-3 px-4 text-center font-semibold ${
                    item.salesGrowth === '-' ? 'text-slate-400' :
                    item.salesGrowth.includes('-') ? 'text-blue-600' : 'text-red-600'
                  }`}>{item.salesGrowth}</td>
                  <td className="py-3 px-4 text-center text-slate-700">{item.opActual}</td>
                  <td className={`py-3 px-4 text-center font-semibold ${
                    item.opGrowth === '-' ? 'text-slate-400' :
                    item.opGrowth.includes('-') ? 'text-blue-600' : 'text-red-600'
                  }`}>{item.opGrowth}</td>
                  <td className="py-3 px-4 text-center text-slate-700">{item.npActual}</td>
                  <td className="py-3 px-4 text-center text-slate-700">{item.npGrowth}</td>
                  <td className={`py-3 px-4 text-center font-semibold ${
                    item.npActual === '-' ? 'text-slate-400' :
                    item.npActual.includes('-') ? 'text-blue-600' : 'text-red-600'
                  }`}>{item.npActual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (mainTab === '실적공시(잠정)') {
      const data = mockEarningsProvisionalData[subTab실적잠정];
      return (
        <div>
          <div className="flex gap-4 mb-6">
            <Button
              variant={subTab실적잠정 === '전체보기' ? 'default' : 'outline'}
              onClick={() => setSubTab실적잠정('전체보기')}
              className={subTab실적잠정 === '전체보기' ? 'bg-blue-500 text-white' : ''}
            >
              전체보기
            </Button>
            <Button
              variant={subTab실적잠정 === '어닝서프라이즈' ? 'default' : 'outline'}
              onClick={() => setSubTab실적잠정('어닝서프라이즈')}
              className={subTab실적잠정 === '어닝서프라이즈' ? 'bg-blue-500 text-white' : ''}
            >
              어닝서프라이즈
            </Button>
            <Button
              variant={subTab실적잠정 === '3년최고영업이익' ? 'default' : 'outline'}
              onClick={() => setSubTab실적잠정('3년최고영업이익')}
              className={subTab실적잠정 === '3년최고영업이익' ? 'bg-blue-500 text-white' : ''}
            >
              3년최고영업이익
            </Button>
          </div>

          <div className="text-right text-sm text-slate-500 mb-4">업데이트 01/22 14:30</div>

          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-300 bg-slate-50">
                <th className="text-center py-3 px-4 font-semibold text-slate-700">날짜</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-700">종목명</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700">기준</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700" colSpan={2}>매출액</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700" colSpan={3}>영업이익</th>
                <th className="text-center py-3 px-4 font-semibold text-slate-700" colSpan={2}>당기순이익</th>
              </tr>
              <tr className="border-b border-slate-300 bg-slate-50">
                <th className="py-2"></th>
                <th className="py-2"></th>
                <th className="py-2"></th>
                <th className="text-center py-2 px-2 text-sm text-slate-600">당기</th>
                <th className="text-center py-2 px-2 text-sm text-slate-600">전년동기비</th>
                <th className="text-center py-2 px-2 text-sm text-slate-600">당기</th>
                <th className="text-center py-2 px-2 text-sm text-slate-600">전년동기비</th>
                <th className="text-center py-2 px-2 text-sm text-slate-600">예측대비</th>
                <th className="text-center py-2 px-2 text-sm text-slate-600">당기</th>
                <th className="text-center py-2 px-2 text-sm text-slate-600">전년동기비</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-center text-slate-600">{item.date}</td>
                  <td className="py-3 px-4 font-medium text-blue-600">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${getStockColor(item.stockName)} flex items-center justify-center text-white font-bold text-xs flex-shrink-0`}>
                        {item.stockName.charAt(0)}
                      </div>
                      <span>{item.stockName}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-slate-600 text-sm">{item.period}</td>
                  <td className="py-3 px-4 text-center text-slate-700">{item.salesActual}</td>
                  <td className={`py-3 px-4 text-center font-semibold ${
                    item.salesGrowth === '-' ? 'text-slate-400' :
                    item.salesGrowth.includes('-') ? 'text-blue-600' : 'text-red-600'
                  }`}>{item.salesGrowth}</td>
                  <td className="py-3 px-4 text-center text-slate-700">{item.opActual}</td>
                  <td className={`py-3 px-4 text-center font-semibold ${
                    item.opGrowth === '-' ? 'text-slate-400' :
                    item.opGrowth.includes('-') ? 'text-blue-600' : 'text-red-600'
                  }`}>{item.opGrowth}</td>
                  <td className="py-3 px-4 text-center text-slate-700">{item.npActual}</td>
                  <td className="py-3 px-4 text-center text-slate-700">{item.npGrowth}</td>
                  <td className={`py-3 px-4 text-center font-semibold ${
                    item.npActual === '-' ? 'text-slate-400' :
                    item.npActual.includes('-') ? 'text-blue-600' : 'text-red-600'
                  }`}>{item.npActual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">공시분석</h2>
        <p className="text-slate-600 mt-1">실시간 공시 정보 및 영향 분석</p>
      </div>

      {/* 메인 탭 */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-6 gap-2">
            <Button
              variant={mainTab === '수주공시' ? 'default' : 'outline'}
              onClick={() => setMainTab('수주공시')}
              className={`text-sm py-2 h-auto ${mainTab === '수주공시' ? 'bg-blue-500 text-white' : ''}`}
            >
              수주공시
            </Button>
            <Button
              variant={mainTab === '지분공시' ? 'default' : 'outline'}
              onClick={() => setMainTab('지분공시')}
              className={`text-sm py-2 h-auto ${mainTab === '지분공시' ? 'bg-blue-500 text-white' : ''}`}
            >
              지분공시
            </Button>
            <Button
              variant={mainTab === '신규투자공시' ? 'default' : 'outline'}
              onClick={() => setMainTab('신규투자공시')}
              className={`text-sm py-2 h-auto ${mainTab === '신규투자공시' ? 'bg-blue-500 text-white' : ''}`}
            >
              신규투자공시
            </Button>
            <Button
              variant={mainTab === '전환사채공시' ? 'default' : 'outline'}
              onClick={() => setMainTab('전환사채공시')}
              className={`text-sm py-2 h-auto ${mainTab === '전환사채공시' ? 'bg-blue-500 text-white' : ''}`}
            >
              전환사채공시
            </Button>
            <Button
              variant={mainTab === '실적공시(확정)' ? 'default' : 'outline'}
              onClick={() => setMainTab('실적공시(확정)')}
              className={`text-sm py-2 h-auto ${mainTab === '실적공시(확정)' ? 'bg-blue-500 text-white' : ''}`}
            >
              실적공시(확정)
            </Button>
            <Button
              variant={mainTab === '실적공시(잠정)' ? 'default' : 'outline'}
              onClick={() => setMainTab('실적공시(잠정)')}
              className={`text-sm py-2 h-auto ${mainTab === '실적공시(잠정)' ? 'bg-blue-500 text-white' : ''}`}
            >
              실적공시(잠정)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 콘텐츠 영역 */}
      <Card>
        <CardContent className="p-6">
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
}
