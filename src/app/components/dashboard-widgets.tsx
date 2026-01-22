import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Activity,
  BarChart3,
  Newspaper,
  Globe,
  Building2,
  CreditCard,
  PieChart,
  LineChart,
  Wallet,
  Target,
  AlertTriangle,
  Clock,
  Award,
  Percent,
  Calculator,
  Briefcase,
  Sparkles,
  Lightbulb,
  Layers,
  FileBarChart,
  ClipboardList,
  Star,
  CalendarDays
} from 'lucide-react';
import { LineChart as RechartsLine, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, ScatterChart, Scatter, ZAxis } from 'recharts';

// Widget Types
export type WidgetType = 
  | 'kospi' | 'kosdaq' | 'sp500' | 'nasdaq' | 'nikkei' | 'hangseng'
  | 'usd-krw' | 'jpy-krw' | 'eur-krw' | 'cny-krw'
  | 'wti' | 'gold' | 'bitcoin' | 'ethereum'
  | 'client-count' | 'aum' | 'revenue' | 'top-clients'
  | 'market-news' | 'economy-news'
  | 'ai-issue-bubble'
  | 'today-issue-widget' | 'price-analysis-widget' | 'supply-analysis-widget' 
  | 'theme-sector-widget' | 'report-analysis-widget' | 'disclosure-analysis-widget'
  | 'today-pick-widget' | 'daily-stocks-widget' | 'recommend-stocks-widget' | 'recommend-return-widget';

export interface WidgetConfig {
  id: WidgetType;
  title: string;
  category: string;
  icon: any;
  defaultSize: 'small' | 'medium' | 'large';
}

export const AVAILABLE_WIDGETS: WidgetConfig[] = [
  // Market Indices
  { id: 'kospi', title: 'KOSPI', category: '국내 지수', icon: TrendingUp, defaultSize: 'small' },
  { id: 'kosdaq', title: 'KOSDAQ', category: '국내 지수', icon: TrendingUp, defaultSize: 'small' },
  { id: 'sp500', title: 'S&P 500', category: '해외 지수', icon: Globe, defaultSize: 'small' },
  { id: 'nasdaq', title: 'NASDAQ', category: '해외 지수', icon: Globe, defaultSize: 'small' },
  { id: 'nikkei', title: 'NIKKEI', category: '해외 지수', icon: Globe, defaultSize: 'small' },
  { id: 'hangseng', title: 'HANG SENG', category: '해외 지수', icon: Globe, defaultSize: 'small' },
  
  // Exchange Rates
  { id: 'usd-krw', title: 'USD/KRW', category: '환율', icon: DollarSign, defaultSize: 'small' },
  { id: 'jpy-krw', title: 'JPY/KRW', category: '환율', icon: DollarSign, defaultSize: 'small' },
  { id: 'eur-krw', title: 'EUR/KRW', category: '환율', icon: DollarSign, defaultSize: 'small' },
  { id: 'cny-krw', title: 'CNY/KRW', category: '환율', icon: DollarSign, defaultSize: 'small' },
  
  // Commodities & Crypto
  { id: 'wti', title: 'WTI 유가', category: '원자재', icon: Activity, defaultSize: 'small' },
  { id: 'gold', title: '금', category: '원자재', icon: Award, defaultSize: 'small' },
  { id: 'bitcoin', title: 'Bitcoin', category: '가상자산', icon: Wallet, defaultSize: 'small' },
  { id: 'ethereum', title: 'Ethereum', category: '가상자산', icon: Wallet, defaultSize: 'small' },
  
  // Client & Business
  { id: 'client-count', title: '총 고객 수', category: '고객 정보', icon: Users, defaultSize: 'small' },
  { id: 'aum', title: 'AUM', category: '고객 정보', icon: Briefcase, defaultSize: 'small' },
  { id: 'revenue', title: '월간 수익', category: '고객 정보', icon: Calculator, defaultSize: 'medium' },
  { id: 'top-clients', title: '주요 고객', category: '고객 정보', icon: Target, defaultSize: 'medium' },
  
  // News
  { id: 'market-news', title: '시장 뉴스', category: '뉴스', icon: Newspaper, defaultSize: 'large' },
  { id: 'economy-news', title: '경제 뉴스', category: '뉴스', icon: Building2, defaultSize: 'large' },
  { id: 'ai-issue-bubble', title: 'AI 이슈 버블', category: '뉴스', icon: Sparkles, defaultSize: 'large' },
  
  // Investment Info - Market Info
  { id: 'today-issue-widget', title: '오늘의이슈', category: '투자정보', icon: Lightbulb, defaultSize: 'large' },
  { id: 'price-analysis-widget', title: '시세분석', category: '투자정보', icon: TrendingUp, defaultSize: 'large' },
  { id: 'supply-analysis-widget', title: '수급분석', category: '투자정보', icon: TrendingDown, defaultSize: 'large' },
  { id: 'theme-sector-widget', title: '테마/업종', category: '투자정보', icon: Layers, defaultSize: 'medium' },
  { id: 'report-analysis-widget', title: '리포트분석', category: '투자정보', icon: FileBarChart, defaultSize: 'large' },
  { id: 'disclosure-analysis-widget', title: '공시분석', category: '투자정보', icon: ClipboardList, defaultSize: 'large' },
  
  // Investment Info - AI Recommend
  { id: 'today-pick-widget', title: '오늘의종목Pick', category: 'AI추천', icon: Star, defaultSize: 'large' },
  { id: 'daily-stocks-widget', title: '종목 일자별보기', category: 'AI추천', icon: CalendarDays, defaultSize: 'large' },
  { id: 'recommend-stocks-widget', title: '추천종목', category: 'AI추천', icon: Lightbulb, defaultSize: 'large' },
  { id: 'recommend-return-widget', title: '추천종목수익률', category: 'AI추천', icon: PieChart, defaultSize: 'large' },
];

// Mock Data
const generateMockLineData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: `${i + 1}일`,
    value: Math.random() * 1000 + 2000,
  }));
};

const mockMarketData = {
  kospi: { value: 2547.82, change: 15.34, changePercent: 0.61 },
  kosdaq: { value: 742.15, change: -3.21, changePercent: -0.43 },
  sp500: { value: 4783.45, change: 23.45, changePercent: 0.49 },
  nasdaq: { value: 15043.97, change: 112.34, changePercent: 0.75 },
  nikkei: { value: 35577.11, change: -234.56, changePercent: -0.65 },
  hangseng: { value: 16034.32, change: 45.23, changePercent: 0.28 },
  'usd-krw': { value: 1334.50, change: 5.30, changePercent: 0.40 },
  'jpy-krw': { value: 905.23, change: -2.15, changePercent: -0.24 },
  'eur-krw': { value: 1452.80, change: 8.45, changePercent: 0.58 },
  'cny-krw': { value: 183.67, change: 0.92, changePercent: 0.50 },
  wti: { value: 72.45, change: 1.23, changePercent: 1.73 },
  gold: { value: 2043.50, change: -12.30, changePercent: -0.60 },
  bitcoin: { value: 43234.56, change: 1234.23, changePercent: 2.94 },
  ethereum: { value: 2234.45, change: -45.23, changePercent: -1.98 },
};

const mockClientData = [
  { name: '김영희', aum: 35000000000, revenue: 12500000, risk: 'medium' },
  { name: '이철수', aum: 28000000000, revenue: 9800000, risk: 'low' },
  { name: '박민수', aum: 22000000000, revenue: 7700000, risk: 'high' },
  { name: '정수진', aum: 18000000000, revenue: 6300000, risk: 'medium' },
  { name: '최동욱', aum: 15000000000, revenue: 5250000, risk: 'low' },
];

const mockNews = [
  { title: '코스피, 외국인 매수세에 2,500선 회복', time: '10분 전', source: '연합뉴스' },
  { title: '미 연준, 금리 동결 시사... 증시 반등', time: '1시간 전', source: '한국경제' },
  { title: '삼성전자, 신규 AI 칩 공개 예정', time: '2시간 전', source: '매일경제' },
  { title: '달러-원 환율 1,330원대 중반 등락', time: '3시간 전', source: '서울경제' },
  { title: '비트코인, 4만 3천달러 돌파', time: '4시간 전', source: '블록미디어' },
];

// AI Issue Bubble Data
const mockAIIssueData = [
  { keyword: 'AI 반도체', x: 45, y: 75, size: 850, category: 'tech', change: 12.5, mentions: 2340 },
  { keyword: 'NVIDIA', x: 70, y: 60, size: 720, category: 'tech', change: 8.3, mentions: 1890 },
  { keyword: '전기차', x: 30, y: 55, size: 650, category: 'auto', change: -3.2, mentions: 1720 },
  { keyword: '배터리', x: 55, y: 40, size: 580, category: 'energy', change: 5.7, mentions: 1520 },
  { keyword: '금리인하', x: 20, y: 70, size: 550, category: 'finance', change: 15.2, mentions: 1430 },
  { keyword: '삼성전자', x: 80, y: 45, size: 520, category: 'tech', change: 4.1, mentions: 1350 },
  { keyword: 'SK하이닉스', x: 60, y: 80, size: 480, category: 'tech', change: 9.8, mentions: 1250 },
  { keyword: '부동산', x: 15, y: 35, size: 460, category: 'realestate', change: -5.6, mentions: 1180 },
  { keyword: '원달러', x: 85, y: 25, size: 420, category: 'finance', change: 2.3, mentions: 1080 },
  { keyword: '2차전지', x: 40, y: 20, size: 400, category: 'energy', change: 7.4, mentions: 1020 },
  { keyword: 'K-방산', x: 65, y: 85, size: 380, category: 'defense', change: 18.9, mentions: 950 },
  { keyword: '바이오', x: 25, y: 50, size: 350, category: 'bio', change: -1.8, mentions: 870 },
  { keyword: '메타버스', x: 50, y: 65, size: 320, category: 'tech', change: -8.4, mentions: 780 },
  { keyword: '수소에너지', x: 75, y: 30, size: 300, category: 'energy', change: 11.2, mentions: 720 },
  { keyword: '반도체장비', x: 35, y: 90, size: 280, category: 'tech', change: 6.5, mentions: 650 },
];

interface WidgetProps {
  widgetId: WidgetType;
  onRemove?: () => void;
}

export function Widget({ widgetId, onRemove }: WidgetProps) {
  const config = AVAILABLE_WIDGETS.find(w => w.id === widgetId);
  if (!config) return null;

  const Icon = config.icon;

  // Market widgets (indices, forex, commodities, crypto)
  if (widgetId in mockMarketData) {
    const data = mockMarketData[widgetId as keyof typeof mockMarketData];
    const isPositive = data.change >= 0;
    const chartData = generateMockLineData();

    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-base">{config.title}</CardTitle>
            </div>
            {onRemove && (
              <button onClick={onRemove} className="text-slate-400 hover:text-slate-600">
                ×
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-2xl font-bold">{data.value.toLocaleString()}</p>
              <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{isPositive ? '+' : ''}{data.change.toFixed(2)}</span>
                <span>({isPositive ? '+' : ''}{data.changePercent.toFixed(2)}%)</span>
              </div>
            </div>
            <div className="h-20">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id={`color-${widgetId}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={isPositive ? "#10b981" : "#ef4444"} 
                    strokeWidth={2}
                    fill={`url(#color-${widgetId})`} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Client count widget
  if (widgetId === 'client-count') {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-base">{config.title}</CardTitle>
            </div>
            {onRemove && (
              <button onClick={onRemove} className="text-slate-400 hover:text-slate-600">
                ×
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-2xl font-bold">247명</p>
            <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
              <TrendingUp className="w-4 h-4" />
              <span>+12명 (이번 달)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // AUM widget
  if (widgetId === 'aum') {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-base">{config.title}</CardTitle>
            </div>
            {onRemove && (
              <button onClick={onRemove} className="text-slate-400 hover:text-slate-600">
                ×
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-2xl font-bold">1,247억원</p>
            <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
              <TrendingUp className="w-4 h-4" />
              <span>+3.2% (전월 대비)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Revenue widget
  if (widgetId === 'revenue') {
    const revenueData = Array.from({ length: 12 }, (_, i) => ({
      month: `${i + 1}월`,
      revenue: Math.random() * 50 + 30,
    }));

    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-base">{config.title}</CardTitle>
            </div>
            {onRemove && (
              <button onClick={onRemove} className="text-slate-400 hover:text-slate-600">
                ×
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-2xl font-bold">52,400,000원</p>
              <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                <TrendingUp className="w-4 h-4" />
                <span>+8.5% (전월 대비)</span>
              </div>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#1e40af" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Top clients widget
  if (widgetId === 'top-clients') {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-base">{config.title}</CardTitle>
            </div>
            {onRemove && (
              <button onClick={onRemove} className="text-slate-400 hover:text-slate-600">
                ×
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {mockClientData.map((client, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                    {client.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{client.name}</p>
                    <p className="text-xs text-slate-500">{(client.aum / 100000000).toFixed(0)}억원</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{(client.revenue / 10000).toFixed(0)}만원</p>
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                    client.risk === 'high' ? 'bg-red-100 text-red-700' :
                    client.risk === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {client.risk === 'high' ? '고위험' : client.risk === 'medium' ? '중위험' : '저위험'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // News widgets
  if (widgetId === 'market-news' || widgetId === 'economy-news') {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-base">{config.title}</CardTitle>
            </div>
            {onRemove && (
              <button onClick={onRemove} className="text-slate-400 hover:text-slate-600">
                ×
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockNews.map((news, idx) => (
              <div key={idx} className="pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <p className="text-sm font-medium hover:text-blue-600 cursor-pointer">{news.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500">{news.source}</span>
                  <span className="text-xs text-slate-400">•</span>
                  <span className="text-xs text-slate-500">{news.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // AI Issue Bubble widget
  if (widgetId === 'ai-issue-bubble') {
    const categoryColors: Record<string, string> = {
      tech: '#3b82f6',
      auto: '#8b5cf6',
      energy: '#10b981',
      finance: '#f59e0b',
      realestate: '#ef4444',
      defense: '#06b6d4',
      bio: '#ec4899',
    };

    const getCategoryColor = (category: string) => categoryColors[category] || '#6b7280';

    const CustomTooltip = ({ active, payload }: any) => {
      if (active && payload && payload.length) {
        const data = payload[0].payload;
        const isPositive = data.change >= 0;
        return (
          <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-lg">
            <p className="font-semibold text-sm mb-2">{data.keyword}</p>
            <div className="space-y-1 text-xs">
              <p className="text-slate-600">언급량: {data.mentions.toLocaleString()}회</p>
              <p className={`flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>{isPositive ? '+' : ''}{data.change}%</span>
              </p>
            </div>
          </div>
        );
      }
      return null;
    };

    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-base">{config.title}</CardTitle>
            </div>
            {onRemove && (
              <button onClick={onRemove} className="text-slate-400 hover:text-slate-600">
                ×
              </button>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">AI가 포착한 실시간 이슈 트렌드</p>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="시간" 
                  domain={[0, 100]}
                  tick={{ fontSize: 11 }}
                  label={{ value: '시간 흐름 →', position: 'insideBottom', offset: -10, fontSize: 11 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="관심도" 
                  domain={[0, 100]}
                  tick={{ fontSize: 11 }}
                  label={{ value: '관심도 ↑', angle: -90, position: 'insideLeft', fontSize: 11 }}
                />
                <ZAxis type="number" dataKey="size" range={[200, 2000]} />
                <Tooltip content={<CustomTooltip />} />
                {mockAIIssueData.map((entry, index) => (
                  <Scatter
                    key={index}
                    data={[entry]}
                    fill={getCategoryColor(entry.category)}
                    fillOpacity={0.7}
                    shape={(props: any) => {
                      const { cx, cy, payload } = props;
                      const radius = Math.sqrt(payload.size) / 4;
                      return (
                        <g>
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r={radius} 
                            fill={getCategoryColor(payload.category)}
                            fillOpacity={0.7}
                            stroke={getCategoryColor(payload.category)}
                            strokeWidth={2}
                            className="cursor-pointer transition-all hover:fillOpacity-1"
                          />
                          <text
                            x={cx}
                            y={cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize={radius > 25 ? 11 : radius > 18 ? 9 : 0}
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
          <div className="mt-4 flex flex-wrap gap-2">
            {Object.entries(categoryColors).map(([category, color]) => (
              <div key={category} className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs text-slate-600">
                  {category === 'tech' ? '기술' :
                   category === 'auto' ? '자동차' :
                   category === 'energy' ? '에너지' :
                   category === 'finance' ? '금융' :
                   category === 'realestate' ? '부동산' :
                   category === 'defense' ? '방산' :
                   category === 'bio' ? '바이오' : category}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Investment Info Widgets - Simple Placeholder
  if (widgetId === 'today-issue-widget' || widgetId === 'price-analysis-widget' || 
      widgetId === 'supply-analysis-widget' || widgetId === 'theme-sector-widget' ||
      widgetId === 'report-analysis-widget' || widgetId === 'disclosure-analysis-widget' ||
      widgetId === 'today-pick-widget' || widgetId === 'daily-stocks-widget' ||
      widgetId === 'recommend-stocks-widget' || widgetId === 'recommend-return-widget') {
    return (
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <Icon className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-base">{config.title}</CardTitle>
            </div>
            {onRemove && (
              <button onClick={onRemove} className="text-slate-400 hover:text-slate-600">
                ×
              </button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-32">
            <p className="text-sm text-slate-500">위젯 데이터</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
}