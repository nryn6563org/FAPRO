import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

type TabType = '이슈종목' | '52주신고가' | '52주신저가' | '상한가' | '하한가' | '거래비중상위' | '관리종목' | '거래정지' | '투자주의' | '투자경고' | '투자위험';

interface StockData {
  date: string;
  time: string;
  stockName: string;
  currentPrice: number;
  changeRate: number;
  issueContent: string;
}

// 탭별 목업 데이터
const mockDataByTab: Record<TabType, StockData[]> = {
  '이슈종목': [
    { date: '01/20', time: '09:08', stockName: '유비쿼스', currentPrice: 0, changeRate: 0, issueContent: '피지컬SI 수혜 전망…PBR 역사적 저점 분석에 상승세' },
    { date: '01/20', time: '15:00', stockName: '우진', currentPrice: 25200, changeRate: 13.26, issueContent: '국내 유일 원전 계측기 공급사…후대특형 원전 필요 발...' },
    { date: '01/20', time: '14:30', stockName: '카카오페이', currentPrice: 53800, changeRate: 12.08, issueContent: '스테이블코인 법안 기대에 강세' },
    { date: '01/20', time: '14:28', stockName: '일진파워', currentPrice: 17610, changeRate: 29.96, issueContent: '신규원전 건설 업종 현안 원인 일진 전기철강까지 \'...' },
    { date: '01/20', time: '14:22', stockName: '오로비덱', currentPrice: 5140, changeRate: 25.83, issueContent: '신규 원전 필요 현안 원전계 초기협상 기대감까지...' },
    { date: '01/20', time: '14:00', stockName: '우리기술', currentPrice: 7980, changeRate: 29.97, issueContent: '쫓 국연 원전 필요 신규원전 검토에 현안 원전계...' },
    { date: '01/20', time: '13:58', stockName: '한국전력', currentPrice: 65400, changeRate: 16.16, issueContent: '발전 공기업 동행한 기대감에 15%대↑' },
    { date: '01/20', time: '13:42', stockName: '티앤씨', currentPrice: 17600, changeRate: 25.18, issueContent: '이 대통령 전력난 핵소 원전 필요상에 ↑…원전 필수...' },
    { date: '01/20', time: '13:28', stockName: '나노스에이스틱글로벌지', currentPrice: 46650, changeRate: 29.94, issueContent: '우주발도래 과제 수주에 13% 급등' },
    { date: '01/20', time: '11:46', stockName: '한화에어로스페이스', currentPrice: 1309000, changeRate: -1.58, issueContent: '그림판도 돌리면 자잘하적 건강작 \'상승...' },
  ],
  '52주신고가': [
    { date: '01/20', time: '15:30', stockName: '삼성전자', currentPrice: 72500, changeRate: 3.42, issueContent: 'AI 반도체 수요 증가로 52주 신고가 경신' },
    { date: '01/20', time: '14:25', stockName: 'SK하이닉스', currentPrice: 145000, changeRate: 4.18, issueContent: 'HBM 공급 확대 소식에 52주 최고가 달성' },
    { date: '01/20', time: '13:15', stockName: '셀트리온', currentPrice: 198500, changeRate: 2.85, issueContent: '바이오시밀러 수출 호조로 신고가 경신' },
    { date: '01/20', time: '12:40', stockName: 'LG에너지솔루션', currentPrice: 485000, changeRate: 5.21, issueContent: '전기차 배터리 수주 확대로 52주 최고가' },
    { date: '01/20', time: '11:20', stockName: '현대차', currentPrice: 245000, changeRate: 2.95, issueContent: '전기차 판매 증가로 신고가 달성' },
  ],
  '52주신저가': [
    { date: '01/20', time: '15:10', stockName: '카카오', currentPrice: 42500, changeRate: -5.22, issueContent: '규제 우려로 52주 신저가 기록' },
    { date: '01/20', time: '14:05', stockName: '네이버', currentPrice: 185000, changeRate: -3.89, issueContent: '광고 매출 감소 우려로 신저가' },
    { date: '01/20', time: '13:30', stockName: 'CJ ENM', currentPrice: 68500, changeRate: -4.52, issueContent: '콘텐츠 제작비 증가 부담으로 52주 최저가' },
    { date: '01/20', time: '12:15', stockName: '한진칼', currentPrice: 32800, changeRate: -6.18, issueContent: '항공 수요 감소로 신저가 경신' },
    { date: '01/20', time: '11:05', stockName: '두산밥캣', currentPrice: 58900, changeRate: -4.85, issueContent: '건설경기 둔화로 52주 최저가' },
  ],
  '상한가': [
    { date: '01/20', time: '09:15', stockName: '보성파워텍', currentPrice: 12500, changeRate: 30.00, issueContent: '원전 수출 호재로 상한가' },
    { date: '01/20', time: '09:20', stockName: '일진파워', currentPrice: 17610, changeRate: 29.96, issueContent: '신규 원전 건설 수혜로 상한가' },
    { date: '01/20', time: '09:25', stockName: '우리기술', currentPrice: 7980, changeRate: 29.97, issueContent: 'SMR 개발 참여 소식에 상한가' },
    { date: '01/20', time: '09:30', stockName: '우진엔텍', currentPrice: 8500, changeRate: 29.92, issueContent: '원전 부품 수주 확대로 상한가' },
    { date: '01/20', time: '09:35', stockName: '한신기계', currentPrice: 4850, changeRate: 29.95, issueContent: '원전 기자재 공급 계약 체결로 상한가' },
  ],
  '하한가': [
    { date: '01/20', time: '09:10', stockName: 'ABC테크', currentPrice: 2450, changeRate: -30.00, issueContent: '실적 악화 우려로 하한가' },
    { date: '01/20', time: '09:18', stockName: 'XYZ바이오', currentPrice: 3850, changeRate: -29.85, issueContent: '임상 3상 실패로 하한가' },
    { date: '01/20', time: '09:22', stockName: '디지털테크', currentPrice: 5200, changeRate: -29.92, issueContent: '대규모 적자 발표로 하한가' },
    { date: '01/20', time: '09:28', stockName: '그린에너지', currentPrice: 4100, changeRate: -29.88, issueContent: '수주 취소 소식에 하한가' },
  ],
  '거래비중상위': [
    { date: '01/20', time: '15:30', stockName: '삼성전자', currentPrice: 72500, changeRate: 2.11, issueContent: '외국인 순매수 1위, 기관 매수세 집중' },
    { date: '01/20', time: '15:30', stockName: 'SK하이닉스', currentPrice: 145000, changeRate: 1.85, issueContent: '거래대금 2위, 개인 매수 우위' },
    { date: '01/20', time: '15:30', stockName: 'LG에너지솔루션', currentPrice: 485000, changeRate: 3.42, issueContent: '외국인 대량 매수로 거래비중 상승' },
    { date: '01/20', time: '15:30', stockName: '현대차', currentPrice: 245000, changeRate: 1.68, issueContent: '기관 순매수 상위, 거래량 급증' },
    { date: '01/20', time: '15:30', stockName: '카카오', currentPrice: 42500, changeRate: -2.15, issueContent: '개인 매도 우위로 거래비중 확대' },
  ],
  '관리종목': [
    { date: '01/20', time: '10:00', stockName: 'DEF건설', currentPrice: 1250, changeRate: -8.45, issueContent: '재무구조 악화로 관리종목 지정' },
    { date: '01/20', time: '10:30', stockName: 'GHI제약', currentPrice: 2800, changeRate: -5.12, issueContent: '감사의견 거절로 관리종목 편입' },
    { date: '01/20', time: '11:00', stockName: 'JKL산업', currentPrice: 980, changeRate: -12.85, issueContent: '자본잠식으로 관리종목 지정' },
  ],
  '거래정지': [
    { date: '01/20', time: '09:00', stockName: 'MNO전자', currentPrice: 3500, changeRate: 0, issueContent: '공시 의무 위반으로 거래정지' },
    { date: '01/20', time: '09:00', stockName: 'PQR바이오', currentPrice: 5200, changeRate: 0, issueContent: '감사보고서 미제출로 거래정지' },
    { date: '01/20', time: '09:00', stockName: 'STU화학', currentPrice: 4100, changeRate: 0, issueContent: '회계처리기준 위반으로 거래정지' },
  ],
  '투자주의': [
    { date: '01/20', time: '14:00', stockName: 'VWX에너지', currentPrice: 6500, changeRate: 15.28, issueContent: '단기 급등으로 투자주의 종목 지정' },
    { date: '01/20', time: '13:45', stockName: 'YZA소재', currentPrice: 8900, changeRate: 18.42, issueContent: '과열 양상으로 투자주의 종목 편입' },
    { date: '01/20', time: '13:20', stockName: 'BCD반도체', currentPrice: 12500, changeRate: 22.15, issueContent: '급격한 거래량 증가로 투자주의' },
  ],
  '투자경고': [
    { date: '01/20', time: '12:00', stockName: 'EFG제약', currentPrice: 4200, changeRate: 25.85, issueContent: '투기 거래 과열로 투자경고 지정' },
    { date: '01/20', time: '11:30', stockName: 'HIJ테크', currentPrice: 7800, changeRate: 28.52, issueContent: '시세 조종 의혹으로 투자경고' },
    { date: '01/20', time: '11:00', stockName: 'KLM바이오', currentPrice: 5600, changeRate: 29.15, issueContent: '이상 급등으로 투자경고 종목 지정' },
  ],
  '투자위험': [
    { date: '01/20', time: '10:30', stockName: 'NOP건설', currentPrice: 1850, changeRate: -15.42, issueContent: '상장폐지 위험으로 투자위험 종목 지정' },
    { date: '01/20', time: '10:15', stockName: 'QRS산업', currentPrice: 980, changeRate: -22.85, issueContent: '재무제표 부실로 투자위험 경고' },
    { date: '01/20', time: '10:00', stockName: 'TUV화학', currentPrice: 650, changeRate: -28.42, issueContent: '파산 우려로 투자위험 종목 편입' },
  ],
};

export function PriceAnalysis() {
  const [selectedTab, setSelectedTab] = useState<TabType>('이슈종목');
  const [kospiPeriod, setKospiPeriod] = useState<'1일' | '3개월' | '1년'>('1일');
  const [kosdaqPeriod, setKosdaqPeriod] = useState<'1일' | '3개월' | '1년'>('1년');
  const [viewMode, setViewMode] = useState<'시간별' | '날짜별'>('시간별');

  const tabs: TabType[] = [
    '이슈종목', '52주신고가', '52주신저가', '상한가', '하한가', '거래비중상위',
    '관리종목', '거래정지', '투자주의', '투자경고', '투자위험'
  ];

  const currentData = mockDataByTab[selectedTab];

  // 현재 날짜/시간
  const now = new Date();
  const currentDate = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}`;
  const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  // 코스피 차트 데이터
  const kospiData1Day = [
    { time: '09:00', value: 4827 },
    { time: '09:30', value: 4835 },
    { time: '10:00', value: 4845 },
    { time: '10:30', value: 4852 },
    { time: '11:00', value: 4860 },
    { time: '11:30', value: 4868 },
    { time: '12:00', value: 4875 },
    { time: '12:30', value: 4882 },
    { time: '13:00', value: 4890 },
    { time: '13:30', value: 4897 },
  ];

  const kospiData3Month = [
    { time: '10/21', value: 4720 },
    { time: '11/01', value: 4760 },
    { time: '11/15', value: 4680 },
    { time: '12/01', value: 4820 },
    { time: '12/15', value: 4850 },
    { time: '01/01', value: 4890 },
    { time: '01/21', value: 4897 },
  ];

  const kospiData1Year = [
    { time: '01/24', value: 4450 },
    { time: '03/24', value: 4620 },
    { time: '05/24', value: 4580 },
    { time: '07/24', value: 4720 },
    { time: '09/24', value: 4680 },
    { time: '11/24', value: 4820 },
    { time: '01/25', value: 4897 },
  ];

  // 코스닥 차트 데이터
  const kosdaqData1Day = [
    { time: '09:00', value: 924 },
    { time: '09:30', value: 928 },
    { time: '10:00', value: 932 },
    { time: '10:30', value: 936 },
    { time: '11:00', value: 940 },
    { time: '11:30', value: 944 },
    { time: '12:00', value: 948 },
    { time: '12:30', value: 950 },
  ];

  const kosdaqData3Month = [
    { time: '10/21', value: 890 },
    { time: '11/01', value: 910 },
    { time: '11/15', value: 895 },
    { time: '12/01', value: 925 },
    { time: '12/15', value: 940 },
    { time: '01/01', value: 948 },
    { time: '01/21', value: 950 },
  ];

  const kosdaqData1Year = [
    { time: '01/24', value: 627 },
    { time: '03/24', value: 714 },
    { time: '05/24', value: 801 },
    { time: '07/24', value: 827 },
    { time: '09/24', value: 876 },
    { time: '11/24', value: 900 },
    { time: '12/09', value: 890 },
    { time: '12/12', value: 910 },
    { time: '25/03', value: 925 },
    { time: '25/06', value: 940 },
    { time: '25/08', value: 948 },
    { time: '25/12', value: 976 },
  ];

  const getKospiData = () => {
    switch (kospiPeriod) {
      case '1일': return kospiData1Day;
      case '3개월': return kospiData3Month;
      case '1년': return kospiData1Year;
    }
  };

  const getKosdaqData = () => {
    switch (kosdaqPeriod) {
      case '1일': return kosdaqData1Day;
      case '3개월': return kosdaqData3Month;
      case '1년': return kosdaqData1Year;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">시세분석</h2>
        <p className="text-slate-600 mt-1">종목별 시세 및 이슈 현황</p>
      </div>

      {/* 지수 차트 섹션 */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">주요 지수</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={viewMode === '시간별' ? 'default' : 'outline'}
                size="sm"
                className={viewMode === '시간별' ? 'bg-blue-600' : ''}
                onClick={() => setViewMode('시간별')}
              >
                시간별 지수보기
              </Button>
              <Button
                variant={viewMode === '날짜별' ? 'default' : 'outline'}
                size="sm"
                className={viewMode === '날짜별' ? 'bg-blue-600' : ''}
                onClick={() => setViewMode('날짜별')}
              >
                날짜별 지수보기
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-6">
            {/* 코스피 차트 */}
            <div>
              <div className="mb-4">
                <div className="flex items-baseline gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-slate-700">코스피</h3>
                  <span className="text-2xl font-bold text-slate-900">4,897.17</span>
                  <span className="flex items-center text-red-600 font-semibold">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    11.42
                  </span>
                  <span className="text-red-600 font-semibold">+0.23%</span>
                </div>
                <div className="flex gap-2">
                  {(['1일', '3개월', '1년'] as const).map((period) => (
                    <Button
                      key={period}
                      variant={kospiPeriod === period ? 'default' : 'outline'}
                      size="sm"
                      className={kospiPeriod === period ? 'bg-blue-600' : ''}
                      onClick={() => setKospiPeriod(period)}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={getKospiData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 12 }}
                    stroke="#64748b"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#64748b"
                    domain={['dataMin - 20', 'dataMax + 20']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* 코스닥 차트 */}
            <div>
              <div className="mb-4">
                <div className="flex items-baseline gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-slate-700">코스닥</h3>
                  <span className="text-2xl font-bold text-slate-900">950.07</span>
                  <span className="flex items-center text-blue-600 font-semibold">
                    <TrendingDown className="w-4 h-4 mr-1" />
                    26.3
                  </span>
                  <span className="text-blue-600 font-semibold">-2.69%</span>
                </div>
                <div className="flex gap-2">
                  {(['1일', '3개월', '1년'] as const).map((period) => (
                    <Button
                      key={period}
                      variant={kosdaqPeriod === period ? 'default' : 'outline'}
                      size="sm"
                      className={kosdaqPeriod === period ? 'bg-blue-600' : ''}
                      onClick={() => setKosdaqPeriod(period)}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={getKosdaqData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="time" 
                    tick={{ fontSize: 12 }}
                    stroke="#64748b"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    stroke="#64748b"
                    domain={['dataMin - 20', 'dataMax + 20']}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
          <CardTitle className="text-lg mb-4">시세 현황</CardTitle>
          
          {/* 탭 메뉴 */}
          <div className="flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={selectedTab === tab ? 'default' : 'outline'}
                size="sm"
                className={selectedTab === tab ? 'bg-blue-600' : ''}
                onClick={() => setSelectedTab(tab)}
              >
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

          {/* 테이블 */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-300">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">날짜</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">종목명</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-700">현재가</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-700">등락률</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">이슈내용</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((stock, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm text-slate-600">
                      {stock.date} {stock.time}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {stock.stockName}
                    </td>
                    <td className="py-3 px-4 text-right font-medium">
                      {stock.currentPrice === 0 ? '-' : stock.currentPrice.toLocaleString()}
                    </td>
                    <td className={`py-3 px-4 text-right font-semibold ${
                      stock.changeRate > 0 
                        ? 'text-red-600' 
                        : stock.changeRate < 0 
                        ? 'text-blue-600' 
                        : 'text-slate-600'
                    }`}>
                      {stock.changeRate === 0 
                        ? '-' 
                        : `${stock.changeRate > 0 ? '+' : ''}${stock.changeRate.toFixed(2)}%`
                      }
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-700">
                      {stock.issueContent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}