import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Star, TrendingUp, Target, Zap } from 'lucide-react';

const todayPicks = [
  {
    rank: 1,
    ticker: '005930',
    name: '삼성전자',
    price: 72500,
    targetPrice: 85000,
    upside: 17.2,
    aiScore: 95,
    reason: 'AI 반도체 수요 급증, HBM 시장 점유율 확대, 실적 개선 전망',
    category: '반도체',
    buyTiming: '즉시 매수',
    stopLoss: 68000
  },
  {
    rank: 2,
    ticker: '000660',
    name: 'SK하이닉스',
    price: 145000,
    targetPrice: 168000,
    upside: 15.9,
    aiScore: 92,
    reason: 'HBM3 출하 본격화, NVIDIA와의 협력 강화, 기술 경쟁력 우위',
    category: '반도체',
    buyTiming: '즉시 매수',
    stopLoss: 138000
  },
  {
    rank: 3,
    ticker: '079550',
    name: 'LIG넥스원',
    price: 125000,
    targetPrice: 150000,
    upside: 20.0,
    aiScore: 90,
    reason: 'K-방산 수주 확대, 중장기 성장성 우수, 정부 지원 확대',
    category: '방산',
    buyTiming: '분할 매수',
    stopLoss: 118000
  }
];

export function TodayPick() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
          <h2 className="text-2xl font-bold">오늘의 종목 Pick</h2>
        </div>
        <p className="text-slate-600">AI가 선정한 오늘의 추천 종목</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {todayPicks.map((pick) => (
          <Card key={pick.rank} className="hover:shadow-lg transition-shadow border-2 border-yellow-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-bl-full flex items-start justify-end p-3">
              <span className="text-white font-bold text-2xl">#{pick.rank}</span>
            </div>
            
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Star className="w-8 h-8 text-white fill-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-2xl">{pick.name}</CardTitle>
                      <Badge variant="outline">{pick.category}</Badge>
                    </div>
                    <p className="text-sm text-slate-500">{pick.ticker}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                        AI 점수: {pick.aiScore}점
                      </Badge>
                      <Badge variant="secondary">{pick.buyTiming}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                <div>
                  <p className="text-xs text-slate-500 mb-1">현재가</p>
                  <p className="text-xl font-bold">{pick.price.toLocaleString()}원</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">목표가</p>
                  <p className="text-xl font-bold text-blue-600">{pick.targetPrice.toLocaleString()}원</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">기대수익률</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <p className="text-xl font-bold text-green-600">+{pick.upside}%</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">손절가</p>
                  <p className="text-xl font-bold text-red-600">{pick.stopLoss.toLocaleString()}원</p>
                </div>
              </div>

              <div className="p-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                <div className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">AI 추천 이유</p>
                    <p className="text-sm text-blue-800">{pick.reason}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                  <Star className="w-4 h-4 mr-2" />
                  관심종목 추가
                </Button>
                <Button variant="outline" className="flex-1">상세 분석 보기</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
