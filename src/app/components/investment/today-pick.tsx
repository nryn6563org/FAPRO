import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const todayPicks = [
  {
    rank: 1,
    ticker: '005930',
    name: '삼성전자',
    description: '글로벌 반도체 및 전자제품 제조 선도 기업',
    price: 72500,
    changeAmount: 1500,
    changeRate: 2.11,
    issues: ['반도체', 'AI', 'HBM'],
    reason: 'AI 반도체 수요가 급증하면서 HBM(고대역폭 메모리) 시장에서의 점유율이 빠르게 확대되고 있습니다. NVIDIA, AMD 등 글로벌 빅테크 기업들과의 협력이 강화되며 실적 개선이 본격화될 것으로 전망됩니다. 특히 차세대 HBM3E 양산 체제 구축으로 경쟁우위가 더욱 확고해질 것으로 예상됩니다.',
    chartData: [
      { value: 68000 },
      { value: 69500 },
      { value: 70200 },
      { value: 69800 },
      { value: 71000 },
      { value: 71500 },
      { value: 72500 }
    ]
  },
  {
    rank: 2,
    ticker: '000660',
    name: 'SK하이닉스',
    description: '메모리 반도체 전문 기업, HBM 시장 선도 업체',
    price: 145000,
    changeAmount: 3200,
    changeRate: 2.26,
    issues: ['반도체', 'HBM3', 'NVIDIA'],
    reason: 'HBM3 제품 출하가 본격화되면서 수익성이 크게 개선되고 있습니다. NVIDIA와의 독점 공급 계약을 통해 안정적인 물량 확보가 가능하며, AI 서버용 메모리 시장의 폭발적 성장에 따른 수혜가 기대됩니다. 기술 경쟁력 측면에서도 업계 최고 수준을 유지하고 있어 중장기 성장 모멘텀이 견고합니다.',
    chartData: [
      { value: 138000 },
      { value: 140000 },
      { value: 139500 },
      { value: 141000 },
      { value: 142500 },
      { value: 143800 },
      { value: 145000 }
    ]
  },
  {
    rank: 3,
    ticker: '079550',
    name: 'LIG넥스원',
    description: '국내 최대 방산 전문 기업, 방위산업 선도 업체',
    price: 125000,
    changeAmount: -1200,
    changeRate: -0.95,
    issues: ['방산', 'K-방산', '정부지원'],
    reason: 'K-방산 수출이 급증하면서 대규모 수주가 지속적으로 확대되고 있습니다. 정부의 방산 육성 정책과 맞물려 중장기 성장성이 매우 우수한 상황입니다. 특히 천궁-II, 해궁 등 핵심 무기체계의 수출 확대와 함께 국내 방위력 개선 사업 수혜도 기대되어 안정적인 실적 성장이 전망됩니다.',
    chartData: [
      { value: 128000 },
      { value: 127500 },
      { value: 126800 },
      { value: 127000 },
      { value: 126500 },
      { value: 126200 },
      { value: 125000 }
    ]
  },
  {
    rank: 4,
    ticker: '035720',
    name: '카카오',
    description: '국내 최대 모바일 플랫폼 및 콘텐츠 서비스 기업',
    price: 56700,
    changeAmount: 4200,
    changeRate: 8.0,
    issues: ['플랫폼', 'AI검색', '콘텐츠'],
    reason: '플랫폼 전반의 수익성 개선이 가시화되고 있으며, AI 검색 서비스 확대를 통한 신규 성장동력 확보가 진행 중입니다. 카카오톡 기반의 강력한 생태계를 활용한 광고 사업 확대와 함께, 콘텐츠 및 커머스 부문의 시너지 효과가 본격화될 것으로 예상됩니다. 구조조정을 통한 비용 효율화도 긍정적으로 작용할 전망입니다.',
    chartData: [
      { value: 52000 },
      { value: 52500 },
      { value: 53200 },
      { value: 54000 },
      { value: 54800 },
      { value: 55500 },
      { value: 56700 }
    ]
  },
  {
    rank: 5,
    ticker: '373220',
    name: 'LG에너지솔루션',
    description: '글로벌 2차전지 제조 및 배터리 솔루션 선도 기업',
    price: 423000,
    changeAmount: -12000,
    changeRate: -2.76,
    issues: ['2차전지', '전기차', '북미수주'],
    reason: '북미 시장에서의 대규모 수주 확대가 기대되며, 전기차 시장의 지속적인 성장에 따른 배터리 수요 증가가 예상됩니다. IRA(인플레이션 감축법) 혜택을 활용한 북미 현지 생산 확대로 수익성 개선이 전망되고, 차세대 배터리 기술 개발을 통한 경쟁력 강화도 진행 중입니다. 생산능력 확대 투자로 중장기 성장 기반이 탄탄합니다.',
    chartData: [
      { value: 438000 },
      { value: 435000 },
      { value: 432000 },
      { value: 430000 },
      { value: 428000 },
      { value: 425000 },
      { value: 423000 }
    ]
  }
];

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

export function TodayPick() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
          <h2 className="text-2xl font-bold">오늘의 종목 Pick</h2>
        </div>
        <p className="text-slate-600 mb-2">AI 알고리즘이 매일 아침 5종목을 추천합니다. 종목탐색의 용도로 활용할 수 있습니다.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {todayPicks.map((pick) => (
          <Card key={pick.rank} className="hover:shadow-lg transition-shadow border-2 border-yellow-200">
            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                {/* 좌측 로고 */}
                <div className={`w-12 h-12 rounded-full ${getStockColor(pick.name)} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>{pick.name.charAt(0)}</div>

                {/* 우측 정보 영역 */}
                <div className="flex-1 min-w-0">
                  {/* 종목명 & 티커 */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <CardTitle className="text-xl">{pick.name}</CardTitle>
                    <span className="text-xs text-slate-500">{pick.ticker}</span>
                  </div>

                  {/* 회사 설명 */}
                  <p className="text-xs text-slate-600 mb-2 leading-relaxed">{pick.description}</p>

                  {/* 이슈 태그 */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {pick.issues.map((issue, idx) => (
                      <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700 border-blue-300 text-xs py-0.5 px-2">
                        {issue}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 pt-0">
              {/* 차트 영역 */}
              <div className="bg-white border-2 border-slate-200 rounded-lg p-3">
                <div className="flex items-center justify-between gap-3">
                  {/* 좌측 가격 정보 */}
                  <div className="flex flex-col gap-1">
                    <div className="text-slate-900 font-bold text-2xl">{pick.price.toLocaleString()}</div>
                    <div className={`flex items-center gap-1 ${pick.changeRate > 0 ? "text-red-500" : "text-blue-500"}`}>
                      {pick.changeRate > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      <span className="text-sm font-semibold">
                        {pick.changeAmount > 0 ? "+" : ""}
                        {pick.changeAmount.toLocaleString()}
                      </span>
                      <span className="text-sm font-semibold">
                        ({pick.changeRate > 0 ? "+" : ""}
                        {pick.changeRate}%)
                      </span>
                    </div>
                  </div>

                  {/* 우측 차트 */}
                  <div className="w-32 h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={pick.chartData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
                        <YAxis hide domain={["dataMin - 1000", "dataMax + 1000"]} />
                        <Line type="monotone" dataKey="value" stroke={pick.changeRate > 0 ? "#ef4444" : "#3b82f6"} strokeWidth={2} dot={false} isAnimationActive={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* AI 추천 이유 */}
              <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                <div className="flex items-start gap-2">
                  <Star className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5 fill-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-900 mb-1 text-sm">AI 추천 이유</p>
                    <p className="text-xs text-blue-800 leading-relaxed">{pick.reason}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
