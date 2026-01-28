import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Lightbulb, TrendingUp, Clock, Target } from 'lucide-react';

const recommendStocks = {
  short: [
    {
      ticker: '005930',
      name: '삼성전자',
      currentPrice: 72500,
      targetPrice: 78000,
      upside: 7.6,
      aiScore: 92,
      period: '1주',
      reason: '단기 급등 모멘텀 포착',
      confidence: 88
    },
    {
      ticker: '035720',
      name: '카카오',
      currentPrice: 52000,
      targetPrice: 56000,
      upside: 7.7,
      aiScore: 89,
      period: '1주',
      reason: 'AI 서비스 출시 임박',
      confidence: 85
    }
  ],
  medium: [
    {
      ticker: '000660',
      name: 'SK하이닉스',
      currentPrice: 145000,
      targetPrice: 165000,
      upside: 13.8,
      aiScore: 94,
      period: '1개월',
      reason: 'HBM 시장 점유율 확대',
      confidence: 92
    },
    {
      ticker: '373220',
      name: 'LG에너지솔루션',
      currentPrice: 485000,
      targetPrice: 550000,
      upside: 13.4,
      aiScore: 91,
      period: '1개월',
      reason: '북미 수주 확대 전망',
      confidence: 90
    }
  ],
  long: [
    {
      ticker: '207940',
      name: '삼성바이오로직스',
      currentPrice: 875000,
      targetPrice: 1050000,
      upside: 20.0,
      aiScore: 96,
      period: '3개월',
      reason: '바이오 CDMO 시장 성장',
      confidence: 94
    },
    {
      ticker: '079550',
      name: 'LIG넥스원',
      currentPrice: 125000,
      targetPrice: 160000,
      upside: 28.0,
      aiScore: 95,
      period: '3개월',
      reason: 'K-방산 중장기 성장',
      confidence: 93
    }
  ]
};

export function RecommendStocks() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">추천 종목</h2>
        <p className="text-slate-600 mt-1">투자 기간별 AI 추천 종목</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Tabs defaultValue="medium">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="short">단기 (1주)</TabsTrigger>
              <TabsTrigger value="medium">중기 (1개월)</TabsTrigger>
              <TabsTrigger value="long">장기 (3개월)</TabsTrigger>
            </TabsList>

            <TabsContent value="short" className="space-y-4 mt-4">
              {recommendStocks.short.map((stock) => (
                <Card key={stock.ticker} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Lightbulb className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{stock.name}</CardTitle>
                          <p className="text-sm text-slate-500">{stock.ticker}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-purple-500 mb-2">AI {stock.aiScore}점</Badge>
                        <p className="text-xs text-slate-500">신뢰도 {stock.confidence}%</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">현재가</p>
                        <p className="font-semibold">{stock.currentPrice.toLocaleString()}원</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">목표가</p>
                        <p className="font-semibold text-blue-600">{stock.targetPrice.toLocaleString()}원</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">기대수익</p>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <p className="font-semibold text-green-600">+{stock.upside}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                      <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-blue-900">{stock.reason}</p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-blue-700">
                          <Clock className="w-3 h-3" />
                          <span>목표 기간: {stock.period}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">상세 분석 보기</Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="medium" className="space-y-4 mt-4">
              {recommendStocks.medium.map((stock) => (
                <Card key={stock.ticker} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Lightbulb className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{stock.name}</CardTitle>
                          <p className="text-sm text-slate-500">{stock.ticker}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-purple-500 mb-2">AI {stock.aiScore}점</Badge>
                        <p className="text-xs text-slate-500">신뢰도 {stock.confidence}%</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">현재가</p>
                        <p className="font-semibold">{stock.currentPrice.toLocaleString()}원</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">목표가</p>
                        <p className="font-semibold text-blue-600">{stock.targetPrice.toLocaleString()}원</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">기대수익</p>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <p className="font-semibold text-green-600">+{stock.upside}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                      <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-blue-900">{stock.reason}</p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-blue-700">
                          <Clock className="w-3 h-3" />
                          <span>목표 기간: {stock.period}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">상세 분석 보기</Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="long" className="space-y-4 mt-4">
              {recommendStocks.long.map((stock) => (
                <Card key={stock.ticker} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <Lightbulb className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{stock.name}</CardTitle>
                          <p className="text-sm text-slate-500">{stock.ticker}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-purple-500 mb-2">AI {stock.aiScore}점</Badge>
                        <p className="text-xs text-slate-500">신뢰도 {stock.confidence}%</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">현재가</p>
                        <p className="font-semibold">{stock.currentPrice.toLocaleString()}원</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">목표가</p>
                        <p className="font-semibold text-blue-600">{stock.targetPrice.toLocaleString()}원</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">기대수익</p>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <p className="font-semibold text-green-600">+{stock.upside}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r">
                      <Target className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-blue-900">{stock.reason}</p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-blue-700">
                          <Clock className="w-3 h-3" />
                          <span>목표 기간: {stock.period}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">상세 분석 보기</Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
