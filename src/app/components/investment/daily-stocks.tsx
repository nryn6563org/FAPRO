import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { CalendarDays, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const mockDailyData = [
  {
    date: '2026-01-20',
    picks: [
      { ticker: '005930', name: '삼성전자', aiScore: 95, result: null },
      { ticker: '000660', name: 'SK하이닉스', aiScore: 92, result: null },
      { ticker: '079550', name: 'LIG넥스원', aiScore: 90, result: null }
    ]
  },
  {
    date: '2026-01-17',
    picks: [
      { ticker: '373220', name: 'LG에너지솔루션', aiScore: 88, result: 5.3 },
      { ticker: '005380', name: '현대차', aiScore: 85, result: 2.1 },
      { ticker: '051910', name: 'LG화학', aiScore: 83, result: -1.2 }
    ]
  },
  {
    date: '2026-01-16',
    picks: [
      { ticker: '035720', name: '카카오', aiScore: 87, result: 8.5 },
      { ticker: '035420', name: 'NAVER', aiScore: 84, result: 4.2 },
      { ticker: '096770', name: 'SK이노베이션', aiScore: 82, result: 1.8 }
    ]
  },
  {
    date: '2026-01-15',
    picks: [
      { ticker: '207940', name: '삼성바이오로직스', aiScore: 91, result: 6.7 },
      { ticker: '068270', name: '셀트리온', aiScore: 89, result: 3.4 },
      { ticker: '000270', name: '기아', aiScore: 86, result: -0.5 }
    ]
  },
  {
    date: '2026-01-14',
    picks: [
      { ticker: '105560', name: 'KB금융', aiScore: 84, result: 4.1 },
      { ticker: '055550', name: '신한지주', aiScore: 82, result: 3.2 },
      { ticker: '086790', name: '하나금융지주', aiScore: 80, result: 2.8 }
    ]
  }
];

export function DailyStocks() {
  const [currentPage, setCurrentPage] = useState(0);
  
  const currentData = mockDailyData[currentPage];
  const canGoPrev = currentPage < mockDailyData.length - 1;
  const canGoNext = currentPage > 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">오늘의 종목 일자별 보기</h2>
        <p className="text-slate-600 mt-1">일자별 AI 추천 종목 및 성과</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarDays className="w-6 h-6 text-blue-600" />
              <CardTitle className="text-xl">{currentData.date}</CardTitle>
              {currentPage === 0 && <Badge className="bg-green-500">오늘</Badge>}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => prev + 1)} disabled={!canGoPrev}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => prev - 1)} disabled={!canGoNext}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentData.picks.map((pick, index) => (
              <Card key={pick.ticker} className="relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-purple-100 text-purple-700">
                    AI {pick.aiScore}점
                  </Badge>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Star className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{pick.name}</CardTitle>
                      <p className="text-xs text-slate-500">{pick.ticker}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {pick.result !== null ? (
                    <div className={`p-4 rounded-lg ${pick.result >= 0 ? "bg-green-50" : "bg-red-50"}`}>
                      <p className="text-xs text-slate-600 mb-1">수익률</p>
                      <p className={`text-2xl font-bold ${pick.result >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {pick.result >= 0 ? "+" : ""}
                        {pick.result}%
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg bg-slate-50">
                      <p className="text-sm text-slate-600 text-center">진행 중</p>
                    </div>
                  )}
                  <Button variant="outline" className="w-full mt-3" size="sm">
                    상세보기
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {currentData.picks.some((p) => p.result !== null) && (
            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">일평균 수익률</p>
                  <p className="text-2xl font-bold text-green-600">+{(currentData.picks.reduce((sum, p) => sum + (p.result || 0), 0) / currentData.picks.length).toFixed(2)}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600 mb-1">적중률</p>
                  <p className="text-2xl font-bold text-blue-600">{((currentData.picks.filter((p) => (p.result || 0) > 0).length / currentData.picks.length) * 100).toFixed(0)}%</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
