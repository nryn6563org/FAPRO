// 각 투자정보 페이지의 위젯용 컴포넌트
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Badge } from '@/app/components/ui/badge';
import { ScatterChart, Scatter, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { aiBubbles } from '@/app/components/investment/today-issue';

// 오늘의이슈 위젯 - 버블차트
export function TodayIssueWidget({ onRemove }: { onRemove?: () => void }) {
  const transformBubbleData = aiBubbles.map(bubble => ({
    x: bubble.x,
    y: bubble.y,
    z: bubble.size,
    keyword: bubble.keyword,
    color: bubble.color,
  }));

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">오늘의이슈 - AI 이슈 버블</CardTitle>
          {onRemove && (
            <button onClick={onRemove} className="text-slate-400 hover:text-slate-600 text-xl leading-none">
              ×
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              {transformBubbleData.map((bubble, index) => (
                <Scatter
                  key={index}
                  data={[bubble]}
                  fill={bubble.color}
                  shape={(props: any) => {
                    const { cx, cy, payload } = props;
                    const radius = Math.sqrt(payload.z) * 0.8;
                    return (
                      <g>
                        <circle 
                          cx={cx} 
                          cy={cy} 
                          r={radius} 
                          fill={payload.color}
                          fillOpacity={0.7}
                          stroke={payload.color}
                          strokeWidth={2}
                          className="cursor-pointer transition-all hover:fillOpacity-1"
                        />
                        <text
                          x={cx}
                          y={cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize={radius > 20 ? 10 : radius > 15 ? 8 : 0}
                          fill="white"
                          fontWeight="600"
                          pointerEvents="none"
                        >
                          {payload.keyword}
                        </text>
                      </g>
                    );
                  }}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// 시세분석 위젯 - 이슈종목 리스트
export function PriceAnalysisWidget({ onRemove }: { onRemove?: () => void }) {
  const issueStocks = [
    { time: '09:08', name: '유비쿼스', price: 0, rate: 0, issue: '피지컬SI 수혜 전망…PBR 역사적 저점' },
    { time: '15:00', name: '우진', price: 25200, rate: 13.26, issue: '국내 유일 원전 계측기 공급사' },
    { time: '14:30', name: '카카오페이', price: 53800, rate: 12.08, issue: '스테이블코인 법안 기대에 강세' },
    { time: '14:28', name: '일진파워', price: 17610, rate: 29.96, issue: '신규원전 건설 업종 현안' },
    { time: '14:22', name: '오로비덱', price: 5140, rate: 25.83, issue: '신규 원전 필요 현안' },
    { time: '14:00', name: '우리기술', price: 7980, rate: 29.97, issue: '국연 원전 필요 신규원전 검토' },
    { time: '13:58', name: '한국전력', price: 65400, rate: 16.16, issue: '발전 공기업 동행한 기대감' },
    { time: '13:42', name: '티앤씨', price: 17600, rate: 25.18, issue: '전력난 핵소 원전 필요상' },
    { time: '13:28', name: '나노스틱글로벌', price: 46650, rate: 29.94, issue: '우주발도래 과제 수주' },
    { time: '11:46', name: '한화에어로스페이스', price: 1309000, rate: -1.58, issue: '방산 관련 이슈' },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">시세분석 - 이슈종목</CardTitle>
          {onRemove && (
            <button onClick={onRemove} className="text-slate-400 hover:text-slate-600 text-xl leading-none">
              ×
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto max-h-80">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">시간</TableHead>
                <TableHead>종목명</TableHead>
                <TableHead className="text-right">현재가</TableHead>
                <TableHead className="text-right">등락률</TableHead>
                <TableHead>이슈내용</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {issueStocks.map((stock, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-xs">{stock.time}</TableCell>
                  <TableCell className="font-medium text-sm">{stock.name}</TableCell>
                  <TableCell className="text-right text-sm">{stock.price > 0 ? stock.price.toLocaleString() : '-'}</TableCell>
                  <TableCell className={`text-right text-sm font-semibold ${
                    stock.rate > 0 ? 'text-red-600' : stock.rate < 0 ? 'text-blue-600' : ''
                  }`}>
                    {stock.rate > 0 ? '+' : ''}{stock.rate}%
                  </TableCell>
                  <TableCell className="text-xs text-slate-600 max-w-xs truncate">{stock.issue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

// 수급분석 위젯 - 외국인 코스피 순매수상위
export function SupplyAnalysisWidget({ onRemove }: { onRemove?: () => void }) {
  const foreignBuyingData = [
    { rank: 1, name: '삼성전자', amount: 2458, price: 72500, rate: 2.11 },
    { rank: 2, name: 'SK하이닉스', amount: 1876, price: 145000, rate: 1.85 },
    { rank: 3, name: 'POSCO홀딩스', amount: 984, price: 385000, rate: 1.32 },
    { rank: 4, name: 'LG에너지솔루션', amount: 756, price: 423000, rate: -0.94 },
    { rank: 5, name: '현대차', amount: 643, price: 218000, rate: 0.92 },
    { rank: 6, name: '기아', amount: 589, price: 98200, rate: 1.45 },
    { rank: 7, name: 'NAVER', amount: 512, price: 195000, rate: 0.77 },
    { rank: 8, name: '카카오', amount: 487, price: 56700, rate: 8.00 },
    { rank: 9, name: '삼성바이오로직스', amount: 421, price: 865000, rate: 0.35 },
    { rank: 10, name: 'LG화학', amount: 398, price: 345000, rate: -0.58 },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">수급분석 - 외국인 코스피 순매수상위</CardTitle>
          {onRemove && (
            <button onClick={onRemove} className="text-slate-400 hover:text-slate-600 text-xl leading-none">
              ×
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto max-h-80">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">순위</TableHead>
                <TableHead>종목명</TableHead>
                <TableHead className="text-right">순매수(억)</TableHead>
                <TableHead className="text-right">현재가</TableHead>
                <TableHead className="text-right">등락률</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {foreignBuyingData.map((stock) => (
                <TableRow key={stock.rank}>
                  <TableCell className="text-center font-semibold">{stock.rank}</TableCell>
                  <TableCell className="font-medium">{stock.name}</TableCell>
                  <TableCell className="text-right text-blue-600 font-semibold">{stock.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{stock.price.toLocaleString()}</TableCell>
                  <TableCell className={`text-right font-semibold ${
                    stock.rate > 0 ? 'text-red-600' : stock.rate < 0 ? 'text-blue-600' : ''
                  }`}>
                    {stock.rate > 0 ? '+' : ''}{stock.rate}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

// 테마/업종 위젯 - 상위테마
export function ThemeSectorWidget({ onRemove }: { onRemove?: () => void }) {
  const topTheme = {
    name: '원전',
    avgRate: 18.45,
    stocks: [
      { name: '보성파워텍', rate: 30.00 },
      { name: '우리기술', rate: 29.97 },
      { name: '일진파워', rate: 29.96 },
      { name: '한신기계', rate: 29.92 },
      { name: '우진엔텍', rate: 28.31 },
    ]
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">테마/업종 - 상위테마</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">
                {topTheme.name}
              </Badge>
              <span className="text-sm text-red-600 font-semibold">
                평균 +{topTheme.avgRate}%
              </span>
            </div>
          </div>
          {onRemove && (
            <button onClick={onRemove} className="text-slate-400 hover:text-slate-600 text-xl leading-none">
              ×
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>종목명</TableHead>
              <TableHead className="text-right">등락률</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topTheme.stocks.map((stock, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{stock.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <TrendingUp className="w-3 h-3 text-red-600" />
                    <span className="text-red-600 font-semibold">+{stock.rate}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// 리포트분석 위젯 - 신규리포트
export function ReportAnalysisWidget({ onRemove }: { onRemove?: () => void }) {
  const newReports = [
    { date: '01/20', company: '삼성전자', broker: '한국투자증권', title: 'HBM 수요 확대에 따른 실적 개선 전망', rating: '매수', targetPrice: 85000 },
    { date: '01/20', company: 'SK하이닉스', broker: 'NH투자증권', title: 'HBM3E 양산 본격화, 목표가 상향', rating: '매수', targetPrice: 165000 },
    { date: '01/20', company: 'POSCO홀딩스', broker: '미래에셋증권', title: '2차전지 소재 사업 확대 긍정적', rating: '매수', targetPrice: 420000 },
    { date: '01/20', company: '카카오', broker: 'KB증권', title: '플랫폼 수익성 개선 가시화', rating: '매수', targetPrice: 65000 },
    { date: '01/19', company: 'LG에너지솔루션', broker: '삼성증권', title: '북미 IRA 수혜 본격화 전망', rating: '매수', targetPrice: 480000 },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">리포트분석 - 신규리포트</CardTitle>
          {onRemove && (
            <button onClick={onRemove} className="text-slate-400 hover:text-slate-600 text-xl leading-none">
              ×
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto max-h-80">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">일자</TableHead>
                <TableHead>종목명</TableHead>
                <TableHead>증권사</TableHead>
                <TableHead>제목</TableHead>
                <TableHead className="w-16">의견</TableHead>
                <TableHead className="text-right">목표가</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newReports.map((report, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-xs">{report.date}</TableCell>
                  <TableCell className="font-medium text-sm">{report.company}</TableCell>
                  <TableCell className="text-xs">{report.broker}</TableCell>
                  <TableCell className="text-xs max-w-xs truncate">{report.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300 text-xs">
                      {report.rating}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm font-semibold">{report.targetPrice.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

// 공시분석 위젯 - 실적공시(잠정)
export function DisclosureAnalysisWidget({ onRemove }: { onRemove?: () => void }) {
  const provisionalResults = [
    { date: '01/20', time: '16:00', company: '삼성전자', period: '2025/12(E)', revenue: 7850000, revenueRate: 8.5, profit: 985000, profitRate: 15.2 },
    { date: '01/20', time: '15:30', company: 'SK하이닉스', period: '2025/12(E)', revenue: 4250000, revenueRate: 12.3, profit: 625000, profitRate: 25.8 },
    { date: '01/20', time: '15:00', company: 'LG화학', period: '2025/12(E)', revenue: 5180000, revenueRate: 6.7, profit: 458000, profitRate: 8.9 },
    { date: '01/20', time: '14:30', company: '현대차', period: '2025/12(E)', revenue: 16850000, revenueRate: 10.2, profit: 1285000, profitRate: 18.5 },
    { date: '01/20', time: '14:00', company: 'POSCO홀딩스', period: '2025/12(E)', revenue: 7320000, revenueRate: 5.4, profit: 658000, profitRate: 7.2 },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">공시분석 - 실적공시(잠정)</CardTitle>
          {onRemove && (
            <button onClick={onRemove} className="text-slate-400 hover:text-slate-600 text-xl leading-none">
              ×
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto max-h-80">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">일자</TableHead>
                <TableHead className="w-16">시간</TableHead>
                <TableHead>기업명</TableHead>
                <TableHead>대상기간</TableHead>
                <TableHead className="text-right">매출액</TableHead>
                <TableHead className="text-right">매출증감</TableHead>
                <TableHead className="text-right">영업이익</TableHead>
                <TableHead className="text-right">이익증감</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {provisionalResults.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className="text-xs">{item.date}</TableCell>
                  <TableCell className="text-xs">{item.time}</TableCell>
                  <TableCell className="font-medium text-sm">{item.company}</TableCell>
                  <TableCell className="text-xs">{item.period}</TableCell>
                  <TableCell className="text-right text-sm">{(item.revenue / 100).toFixed(0)}억</TableCell>
                  <TableCell className={`text-right text-sm font-semibold ${
                    item.revenueRate > 0 ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {item.revenueRate > 0 ? '+' : ''}{item.revenueRate}%
                  </TableCell>
                  <TableCell className="text-right text-sm">{(item.profit / 100).toFixed(0)}억</TableCell>
                  <TableCell className={`text-right text-sm font-semibold ${
                    item.profitRate > 0 ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {item.profitRate > 0 ? '+' : ''}{item.profitRate}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
