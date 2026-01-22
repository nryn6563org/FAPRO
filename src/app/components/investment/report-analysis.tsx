import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { FileBarChart, TrendingUp, TrendingDown, Building2 } from 'lucide-react';

const mockReports = [
  {
    id: 1,
    title: '삼성전자, AI 반도체 수요 증가로 목표가 상향',
    firm: 'KB증권',
    analyst: '김분석',
    ticker: '005930',
    stockName: '삼성전자',
    rating: 'Buy',
    targetPrice: 85000,
    currentPrice: 72500,
    upside: 17.2,
    date: '2026-01-20'
  },
  {
    id: 2,
    title: 'SK하이닉스, HBM3 출하 본격화 전망',
    firm: '미래에셋증권',
    analyst: '이애널',
    ticker: '000660',
    stockName: 'SK하이닉스',
    rating: 'Buy',
    targetPrice: 160000,
    currentPrice: 145000,
    upside: 10.3,
    date: '2026-01-20'
  },
  {
    id: 3,
    title: 'LG에너지솔루션, 북미 수주 확대 기대',
    firm: '한국투자증권',
    analyst: '박리서치',
    ticker: '373220',
    stockName: 'LG에너지솔루션',
    rating: 'Buy',
    targetPrice: 520000,
    currentPrice: 485000,
    upside: 7.2,
    date: '2026-01-19'
  },
  {
    id: 4,
    title: '현대차, 전기차 판매 증가세 지속',
    firm: '신한투자증권',
    analyst: '최전문',
    ticker: '005380',
    stockName: '현대차',
    rating: 'Hold',
    targetPrice: 245000,
    currentPrice: 240000,
    upside: 2.1,
    date: '2026-01-19'
  }
];

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

export function ReportAnalysis() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">리포트 분석</h2>
        <p className="text-slate-600 mt-1">증권사 애널리스트 리포트 및 목표가 분석</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockReports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FileBarChart className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">{report.title}</CardTitle>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Building2 className="w-4 h-4" />
                      <span>{report.firm}</span>
                      <span>•</span>
                      <span>{report.analyst}</span>
                      <span>•</span>
                      <span>{report.date}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className={getRatingColor(report.rating)}>
                  {getRatingLabel(report.rating)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-xs text-slate-500 mb-1">종목명</p>
                  <p className="font-semibold">{report.stockName}</p>
                  <p className="text-xs text-slate-500">{report.ticker}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">현재가</p>
                  <p className="font-semibold">{report.currentPrice.toLocaleString()}원</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">목표가</p>
                  <p className="font-semibold text-blue-600">{report.targetPrice.toLocaleString()}원</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">상승여력</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <p className="font-semibold text-green-600">+{report.upside}%</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1">리포트 전문 보기</Button>
                <Button className="flex-1">종목 상세보기</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
