import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { ClipboardList, Clock, AlertTriangle } from 'lucide-react';

const mockDisclosures = [
  {
    id: 1,
    ticker: '005930',
    stockName: '삼성전자',
    title: '단일판매·공급계약체결',
    type: '매출',
    importance: 'high',
    amount: 125000000000,
    time: '10:05',
    impact: 'positive',
    summary: '미국 빅테크사와 AI 반도체 공급 계약 체결'
  },
  {
    id: 2,
    ticker: '000660',
    stockName: 'SK하이닉스',
    title: '주요사항보고서(회사합병결정)',
    type: 'M&A',
    importance: 'high',
    amount: null,
    time: '09:30',
    impact: 'positive',
    summary: '메모리 반도체 관련 기업 인수 결정'
  },
  {
    id: 3,
    ticker: '373220',
    stockName: 'LG에너지솔루션',
    title: '단일판매·공급계약체결',
    type: '매출',
    importance: 'medium',
    amount: 85000000000,
    time: '08:50',
    impact: 'positive',
    summary: '북미 완성차 업체와 배터리 공급 계약'
  },
  {
    id: 4,
    ticker: '005380',
    stockName: '현대차',
    title: '주요경영사항(자기주식취득신탁계약체결결정)',
    type: '자사주',
    importance: 'medium',
    amount: 50000000000,
    time: '전일 16:30',
    impact: 'positive',
    summary: '자사주 매입 신탁 계약 체결'
  },
  {
    id: 5,
    ticker: '051910',
    stockName: 'LG화학',
    title: '기타주요경영사항(자율공시)',
    type: '기타',
    importance: 'low',
    amount: null,
    time: '전일 15:20',
    impact: 'neutral',
    summary: '친환경 소재 사업 확대 계획 발표'
  }
];

const getImportanceColor = (importance: string) => {
  switch (importance) {
    case 'high': return 'bg-red-100 text-red-700 border-red-300';
    case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    case 'low': return 'bg-blue-100 text-blue-700 border-blue-300';
    default: return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};

const getImportanceLabel = (importance: string) => {
  switch (importance) {
    case 'high': return '중요';
    case 'medium': return '보통';
    case 'low': return '참고';
    default: return importance;
  }
};

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    '매출': 'bg-green-100 text-green-700',
    'M&A': 'bg-purple-100 text-purple-700',
    '자사주': 'bg-blue-100 text-blue-700',
    '기타': 'bg-gray-100 text-gray-700'
  };
  return colors[type] || 'bg-gray-100 text-gray-700';
};

export function DisclosureAnalysis() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">공시 분석</h2>
        <p className="text-slate-600 mt-1">실시간 공시 정보 및 영향 분석</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockDisclosures.map((disclosure) => (
          <Card key={disclosure.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    disclosure.importance === 'high' ? 'bg-red-100' :
                    disclosure.importance === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <ClipboardList className={`w-6 h-6 ${
                      disclosure.importance === 'high' ? 'text-red-600' :
                      disclosure.importance === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{disclosure.stockName}</CardTitle>
                      <Badge variant="outline" className={getImportanceColor(disclosure.importance)}>
                        {getImportanceLabel(disclosure.importance)}
                      </Badge>
                      <Badge variant="outline" className={getTypeColor(disclosure.type)}>
                        {disclosure.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-1">{disclosure.title}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>{disclosure.time}</span>
                      <span>•</span>
                      <span>{disclosure.ticker}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-700">{disclosure.summary}</p>
                {disclosure.amount && (
                  <p className="text-sm font-semibold text-blue-600 mt-2">
                    계약금액: {(disclosure.amount / 100000000).toFixed(0)}억원
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">공시 전문 보기</Button>
                <Button className="flex-1">종목 분석</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
