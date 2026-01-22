import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Filter
} from 'lucide-react';

interface TradingSignal {
  id: string;
  ticker: string;
  name: string;
  type: 'buy' | 'sell' | 'hold';
  strength: 'strong' | 'moderate' | 'weak';
  price: number;
  targetPrice: number;
  stopLoss: number;
  confidence: number;
  reason: string;
  timestamp: string;
  timeframe: string;
  indicators: string[];
}

const mockSignals: TradingSignal[] = [
  {
    id: '1',
    ticker: 'AAPL',
    name: 'Apple Inc.',
    type: 'buy',
    strength: 'strong',
    price: 185.50,
    targetPrice: 200.00,
    stopLoss: 178.00,
    confidence: 87,
    reason: 'RSI 과매도 구간 진입, MACD 골든크로스 형성, 거래량 급증',
    timestamp: '2026-01-20 09:30',
    timeframe: '일봉',
    indicators: ['RSI', 'MACD', 'Volume']
  },
  {
    id: '2',
    ticker: 'TSLA',
    name: 'Tesla Inc.',
    type: 'sell',
    strength: 'moderate',
    price: 248.30,
    targetPrice: 235.00,
    stopLoss: 255.00,
    confidence: 72,
    reason: '저항선 도달, 상대적 강도 약화, 매도 거래량 증가',
    timestamp: '2026-01-20 10:15',
    timeframe: '일봉',
    indicators: ['Support/Resistance', 'RSI', 'Volume']
  },
  {
    id: '3',
    ticker: '삼성전자',
    name: 'Samsung Electronics',
    type: 'buy',
    strength: 'strong',
    price: 72500,
    targetPrice: 78000,
    stopLoss: 69000,
    confidence: 91,
    reason: '이동평균선 상향 돌파, 외국인 순매수 지속, 기관 매수세 강화',
    timestamp: '2026-01-20 11:00',
    timeframe: '일봉',
    indicators: ['MA', 'Foreign/Institution', 'Volume']
  },
  {
    id: '4',
    ticker: 'NVDA',
    name: 'NVIDIA Corp.',
    type: 'buy',
    strength: 'moderate',
    price: 520.80,
    targetPrice: 550.00,
    stopLoss: 505.00,
    confidence: 78,
    reason: '볼린저밴드 하단 터치 후 반등, AI 섹터 모멘텀 강화',
    timestamp: '2026-01-20 11:30',
    timeframe: '4시간봉',
    indicators: ['Bollinger Bands', 'Sector Analysis']
  },
  {
    id: '5',
    ticker: 'SK하이닉스',
    name: 'SK Hynix',
    type: 'hold',
    strength: 'weak',
    price: 145000,
    targetPrice: 148000,
    stopLoss: 142000,
    confidence: 55,
    reason: '횡보 구간, 추세 불명확, 추가 신호 대기 필요',
    timestamp: '2026-01-20 12:00',
    timeframe: '일봉',
    indicators: ['Trend', 'Volume']
  }
];

export function TradingSignals() {
  const [signals] = useState<TradingSignal[]>(mockSignals);
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell' | 'hold'>('all');

  const filteredSignals = filter === 'all' 
    ? signals 
    : signals.filter(s => s.type === filter);

  const getSignalColor = (type: string) => {
    switch (type) {
      case 'buy': return 'bg-green-100 text-green-700 border-green-300';
      case 'sell': return 'bg-red-100 text-red-700 border-red-300';
      case 'hold': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'buy': return <ArrowUpRight className="w-4 h-4" />;
      case 'sell': return <ArrowDownRight className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getSignalLabel = (type: string) => {
    switch (type) {
      case 'buy': return '매수';
      case 'sell': return '매도';
      case 'hold': return '보유';
      default: return '';
    }
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong': return 'text-blue-600';
      case 'moderate': return 'text-purple-600';
      case 'weak': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getStrengthLabel = (strength: string) => {
    switch (strength) {
      case 'strong': return '강';
      case 'moderate': return '중';
      case 'weak': return '약';
      default: return '';
    }
  };

  const buySignals = signals.filter(s => s.type === 'buy').length;
  const sellSignals = signals.filter(s => s.type === 'sell').length;
  const holdSignals = signals.filter(s => s.type === 'hold').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI 매매 시그널</h2>
          <p className="text-slate-600 mt-1">실시간 AI 기반 매매 신호 및 투자 추천</p>
        </div>
        <Button className="gap-2">
          <Filter className="w-4 h-4" />
          필터 설정
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">전체 시그널</p>
                <p className="text-3xl font-bold mt-2">{signals.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">매수 시그널</p>
                <p className="text-3xl font-bold mt-2 text-green-600">{buySignals}</p>
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
                <p className="text-sm text-slate-600">매도 시그널</p>
                <p className="text-3xl font-bold mt-2 text-red-600">{sellSignals}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">보유 시그널</p>
                <p className="text-3xl font-bold mt-2 text-yellow-600">{holdSignals}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Target className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Card>
        <CardContent className="pt-6">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as any)}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="buy">매수</TabsTrigger>
              <TabsTrigger value="sell">매도</TabsTrigger>
              <TabsTrigger value="hold">보유</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Signals List */}
      <div className="space-y-4">
        {filteredSignals.map((signal) => (
          <Card key={signal.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg border-2 ${getSignalColor(signal.type)} flex items-center justify-center`}>
                    {getSignalIcon(signal.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{signal.ticker}</CardTitle>
                      <Badge variant="outline" className={getSignalColor(signal.type)}>
                        {getSignalLabel(signal.type)}
                      </Badge>
                      <Badge variant="outline" className={getStrengthColor(signal.strength)}>
                        {getStrengthLabel(signal.strength)}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">{signal.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Clock className="w-4 h-4" />
                    {signal.timestamp}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{signal.timeframe}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Price Information */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-xs text-slate-500 mb-1">현재가</p>
                  <p className="font-semibold">
                    {typeof signal.price === 'number' && signal.price > 1000 
                      ? signal.price.toLocaleString() + '원'
                      : '$' + signal.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">목표가</p>
                  <p className="font-semibold text-green-600">
                    {typeof signal.targetPrice === 'number' && signal.targetPrice > 1000 
                      ? signal.targetPrice.toLocaleString() + '원'
                      : '$' + signal.targetPrice.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">손절가</p>
                  <p className="font-semibold text-red-600">
                    {typeof signal.stopLoss === 'number' && signal.stopLoss > 1000 
                      ? signal.stopLoss.toLocaleString() + '원'
                      : '$' + signal.stopLoss.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Confidence and Reason */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">신뢰도</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          signal.confidence >= 80 ? 'bg-green-500' : 
                          signal.confidence >= 60 ? 'bg-yellow-500' : 
                          'bg-red-500'
                        }`}
                        style={{ width: `${signal.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold">{signal.confidence}%</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-slate-500 mb-1">분석 근거</p>
                  <p className="text-sm text-slate-700">{signal.reason}</p>
                </div>

                <div className="flex gap-2">
                  {signal.indicators.map((indicator, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {indicator}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button className="flex-1 gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  시그널 적용
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  상세 분석
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSignals.length === 0 && (
        <Card className="py-16">
          <CardContent className="text-center">
            <AlertTriangle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">시그널이 없습니다</h3>
            <p className="text-slate-600">해당 필터에 맞는 매매 시그널이 없습니다</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
