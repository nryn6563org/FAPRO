import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { TrendingUp, Target, Award, CheckCircle2 } from 'lucide-react';

const performanceData = {
  totalReturns: 15.8,
  winRate: 72.5,
  totalTrades: 124,
  profitTrades: 90,
  avgReturn: 5.2,
  maxReturn: 35.6,
  minReturn: -8.3
};

const monthlyReturns = [
  { month: '7월', return: 8.5 },
  { month: '8월', return: 12.3 },
  { month: '9월', return: -2.1 },
  { month: '10월', return: 15.7 },
  { month: '11월', return: 9.4 },
  { month: '12월', return: 18.2 },
  { month: '1월', return: 15.8 }
];

const topPerformers = [
  { ticker: '207940', name: '삼성바이오로직스', return: 35.6, period: '3개월' },
  { ticker: '079550', name: 'LIG넥스원', return: 28.4, period: '3개월' },
  { ticker: '000660', name: 'SK하이닉스', return: 22.1, period: '1개월' },
  { ticker: '373220', name: 'LG에너지솔루션', return: 18.7, period: '1개월' },
  { ticker: '005930', name: '삼성전자', return: 15.3, period: '1주' }
];

const categoryReturns = [
  { name: '반도체', value: 18.5, color: '#3b82f6' },
  { name: '바이오', value: 22.3, color: '#ec4899' },
  { name: '방산', value: 25.8, color: '#06b6d4' },
  { name: '2차전지', value: 12.4, color: '#10b981' },
  { name: '기타', value: 8.7, color: '#6b7280' }
];

export function RecommendReturn() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">추천 종목 수익률</h2>
        <p className="text-slate-600 mt-1">AI 추천 종목의 실적 및 성과 분석</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">누적 수익률</p>
                <p className="text-3xl font-bold text-green-600 mt-2">+{performanceData.totalReturns}%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">승률</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{performanceData.winRate}%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">총 거래</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{performanceData.totalTrades}건</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">평균 수익률</p>
                <p className="text-3xl font-bold text-orange-600 mt-2">+{performanceData.avgReturn}%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>월별 수익률</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyReturns}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: '수익률 (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="return" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>업종별 수익률</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryReturns}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name} ${entry.value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryReturns.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <Card>
        <CardHeader>
          <CardTitle>최고 수익 종목 TOP 5</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topPerformers.map((stock, index) => (
              <div key={stock.ticker} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                    index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500' :
                    index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400' :
                    index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-700' :
                    'bg-slate-400'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-semibold">{stock.name}</p>
                    <p className="text-sm text-slate-500">{stock.ticker}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">+{stock.return}%</p>
                  <Badge variant="secondary" className="text-xs">{stock.period}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Stats */}
      <Card>
        <CardHeader>
          <CardTitle>상세 통계</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
              <p className="text-xs text-green-700 mb-1">수익 거래</p>
              <p className="text-2xl font-bold text-green-700">{performanceData.profitTrades}건</p>
            </div>
            <div className="p-4 border-l-4 border-red-500 bg-red-50 rounded-r-lg">
              <p className="text-xs text-red-700 mb-1">손실 거래</p>
              <p className="text-2xl font-bold text-red-700">{performanceData.totalTrades - performanceData.profitTrades}건</p>
            </div>
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
              <p className="text-xs text-blue-700 mb-1">최대 수익</p>
              <p className="text-2xl font-bold text-blue-700">+{performanceData.maxReturn}%</p>
            </div>
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50 rounded-r-lg">
              <p className="text-xs text-purple-700 mb-1">최대 손실</p>
              <p className="text-2xl font-bold text-purple-700">{performanceData.minReturn}%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
