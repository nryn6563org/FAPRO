import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Globe, DollarSign } from 'lucide-react';

// Generate mock data for charts
const generateChartData = (baseValue: number, volatility: number = 50) => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: `${i + 1}일`,
    value: baseValue + (Math.random() - 0.5) * volatility * 2,
  }));
};

const domesticIndices = [
  {
    name: 'KOSPI',
    value: 2547.82,
    change: 15.34,
    changePercent: 0.61,
    chartData: generateChartData(2547, 30),
  },
  {
    name: 'KOSDAQ',
    value: 742.15,
    change: -3.21,
    changePercent: -0.43,
    chartData: generateChartData(742, 15),
  },
  {
    name: 'KOSPI 200',
    value: 341.23,
    change: 2.15,
    changePercent: 0.63,
    chartData: generateChartData(341, 8),
  },
];

const internationalIndices = [
  {
    name: 'S&P 500',
    value: 4783.45,
    change: 23.45,
    changePercent: 0.49,
    chartData: generateChartData(4783, 60),
  },
  {
    name: 'NASDAQ',
    value: 15043.97,
    change: 112.34,
    changePercent: 0.75,
    chartData: generateChartData(15043, 200),
  },
  {
    name: 'DOW JONES',
    value: 37863.22,
    change: -45.12,
    changePercent: -0.12,
    chartData: generateChartData(37863, 150),
  },
  {
    name: 'NIKKEI 225',
    value: 35577.11,
    change: -234.56,
    changePercent: -0.65,
    chartData: generateChartData(35577, 300),
  },
  {
    name: 'HANG SENG',
    value: 16034.32,
    change: 45.23,
    changePercent: 0.28,
    chartData: generateChartData(16034, 150),
  },
  {
    name: 'FTSE 100',
    value: 7672.45,
    change: 18.90,
    changePercent: 0.25,
    chartData: generateChartData(7672, 80),
  },
];

const exchangeRates = [
  {
    name: 'USD/KRW',
    value: 1334.50,
    change: 5.30,
    changePercent: 0.40,
    chartData: generateChartData(1334, 10),
  },
  {
    name: 'JPY/KRW',
    value: 905.23,
    change: -2.15,
    changePercent: -0.24,
    chartData: generateChartData(905, 8),
  },
  {
    name: 'EUR/KRW',
    value: 1452.80,
    change: 8.45,
    changePercent: 0.58,
    chartData: generateChartData(1452, 12),
  },
  {
    name: 'CNY/KRW',
    value: 183.67,
    change: 0.92,
    changePercent: 0.50,
    chartData: generateChartData(183, 3),
  },
];

const commodities = [
  {
    name: 'WTI 유가',
    value: 72.45,
    change: 1.23,
    changePercent: 1.73,
    unit: 'USD/barrel',
    chartData: generateChartData(72, 5),
  },
  {
    name: '금',
    value: 2043.50,
    change: -12.30,
    changePercent: -0.60,
    unit: 'USD/oz',
    chartData: generateChartData(2043, 20),
  },
  {
    name: '은',
    value: 23.45,
    change: 0.34,
    changePercent: 1.47,
    unit: 'USD/oz',
    chartData: generateChartData(23, 1),
  },
  {
    name: '구리',
    value: 3.82,
    change: -0.05,
    changePercent: -1.29,
    unit: 'USD/lb',
    chartData: generateChartData(3.8, 0.1),
  },
];

interface IndexCardProps {
  name: string;
  value: number;
  change: number;
  changePercent: number;
  unit?: string;
  chartData: Array<{ date: string; value: number }>;
}

function IndexCard({ name, value, change, changePercent, unit, chartData }: IndexCardProps) {
  const isPositive = change >= 0;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-2xl font-bold">
            {value.toLocaleString('ko-KR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          {unit && <p className="text-xs text-slate-500 mt-1">{unit}</p>}
          <div className={`flex items-center gap-1 mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="font-medium">
              {isPositive ? '+' : ''}{change.toFixed(2)}
            </span>
            <span className="text-sm">
              ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id={`gradient-${name}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={isPositive ? "#10b981" : "#ef4444"} 
                strokeWidth={2}
                fill={`url(#gradient-${name})`} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function MarketIndices() {
  const [selectedDomestic, setSelectedDomestic] = useState('KOSPI');
  const [selectedInternational, setSelectedInternational] = useState('S&P 500');

  const selectedDomesticData = domesticIndices.find(idx => idx.name === selectedDomestic);
  const selectedInternationalData = internationalIndices.find(idx => idx.name === selectedInternational);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">시장 지수</h2>
        <p className="text-slate-600 mt-1">실시간 국내외 주요 지수와 환율 정보</p>
      </div>

      <Tabs defaultValue="domestic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="domestic">국내 지수</TabsTrigger>
          <TabsTrigger value="international">해외 지수</TabsTrigger>
          <TabsTrigger value="forex">환율</TabsTrigger>
          <TabsTrigger value="commodities">원자재</TabsTrigger>
        </TabsList>

        {/* Domestic Indices */}
        <TabsContent value="domestic" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {domesticIndices.map((index) => (
              <IndexCard key={index.name} {...index} />
            ))}
          </div>

          {/* Detailed Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>상세 차트</CardTitle>
                <div className="flex gap-2">
                  {domesticIndices.map((idx) => (
                    <button key={idx.name} onClick={() => setSelectedDomestic(idx.name)} className={`px-3 py-1 rounded-lg text-sm transition-colors ${selectedDomestic === idx.name ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                      {idx.name}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedDomesticData?.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} domain={["auto", "auto"]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#1e40af" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* International Indices */}
        <TabsContent value="international" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {internationalIndices.map((index) => (
              <IndexCard key={index.name} {...index} />
            ))}
          </div>

          {/* Detailed Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>상세 차트</CardTitle>
                <div className="flex gap-2 flex-wrap">
                  {internationalIndices.map((idx) => (
                    <button key={idx.name} onClick={() => setSelectedInternational(idx.name)} className={`px-3 py-1 rounded-lg text-sm transition-colors ${selectedInternational === idx.name ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}>
                      {idx.name}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedInternationalData?.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} domain={["auto", "auto"]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#1e40af" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exchange Rates */}
        <TabsContent value="forex" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exchangeRates.map((rate) => (
              <IndexCard key={rate.name} {...rate} />
            ))}
          </div>
        </TabsContent>

        {/* Commodities */}
        <TabsContent value="commodities" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {commodities.map((commodity) => (
              <IndexCard key={commodity.name} {...commodity} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
