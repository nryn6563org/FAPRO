import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Layers, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';

type TabType = '테마' | '업종';

interface StockDetail {
  name: string;
  currentPrice: number;
  change: number;
  changeRate: number;
}

interface ThemeData {
  id: number;
  name: string;
  change: number;
  stockCount: number;
  topStocks: StockDetail[];
}

// 테마 목업 데이터
const mockThemes: ThemeData[] = [
  {
    id: 1,
    name: 'AI 반도체',
    change: 12.5,
    stockCount: 23,
    topStocks: [
      { name: '삼성전자', currentPrice: 74500, change: 1500, changeRate: 2.05 },
      { name: 'SK하이닉스', currentPrice: 142000, change: 4500, changeRate: 3.27 },
      { name: '메리츠반도체', currentPrice: 28900, change: -800, changeRate: -2.69 },
      { name: 'DB하이텍', currentPrice: 52300, change: 2100, changeRate: 4.18 },
      { name: '엔비디아코리아', currentPrice: 18700, change: 900, changeRate: 5.06 },
      { name: '한미반도체', currentPrice: 64200, change: 1800, changeRate: 2.89 },
      { name: '원익IPS', currentPrice: 36500, change: -1200, changeRate: -3.18 },
      { name: '코미코', currentPrice: 24800, change: 1300, changeRate: 5.53 },
      { name: '리노공업', currentPrice: 156000, change: 5000, changeRate: 3.31 },
      { name: 'SFA반도체', currentPrice: 19400, change: 700, changeRate: 3.74 },
    ]
  },
  {
    id: 2,
    name: 'K-방산',
    change: 18.9,
    stockCount: 18,
    topStocks: [
      { name: '한화에어로스페이스', currentPrice: 286000, change: 15000, changeRate: 5.54 },
      { name: 'LIG넥스원', currentPrice: 198000, change: 9800, changeRate: 5.21 },
      { name: '현대로템', currentPrice: 58900, change: 3200, changeRate: 5.75 },
      { name: '퍼스텍', currentPrice: 42300, change: 2800, changeRate: 7.09 },
      { name: '비츠로테크', currentPrice: 23500, change: 1900, changeRate: 8.80 },
      { name: '빅텍', currentPrice: 18900, change: 1200, changeRate: 6.78 },
      { name: '풍산', currentPrice: 38700, change: 2100, changeRate: 5.74 },
      { name: '한화', currentPrice: 34500, change: 1800, changeRate: 5.50 },
      { name: '대한항공', currentPrice: 28600, change: 1500, changeRate: 5.54 },
      { name: '삼성테크윈', currentPrice: 67800, change: 3900, changeRate: 6.10 },
    ]
  },
  {
    id: 3,
    name: '2차전지',
    change: -3.2,
    stockCount: 45,
    topStocks: [
      { name: 'LG에너지솔루션', currentPrice: 423000, change: -12000, changeRate: -2.76 },
      { name: '삼성SDI', currentPrice: 567000, change: -18000, changeRate: -3.08 },
      { name: '포스코퓨처엠', currentPrice: 289000, change: -8900, changeRate: -2.99 },
      { name: '에코프로비엠', currentPrice: 178000, change: -5600, changeRate: -3.05 },
      { name: 'LG화학', currentPrice: 389000, change: -11000, changeRate: -2.75 },
      { name: '엘앤에프', currentPrice: 156000, change: -4800, changeRate: -2.98 },
      { name: '코스모신소재', currentPrice: 48900, change: -1500, changeRate: -2.98 },
      { name: '천보', currentPrice: 67800, change: -2100, changeRate: -3.01 },
      { name: '에코프로', currentPrice: 92300, change: -2800, changeRate: -2.95 },
      { name: '솔루스첨단소재', currentPrice: 34500, change: -1100, changeRate: -3.09 },
    ]
  },
  {
    id: 4,
    name: '바이오',
    change: 5.7,
    stockCount: 67,
    topStocks: [
      { name: '삼성바이오로직스', currentPrice: 876000, change: 28000, changeRate: 3.30 },
      { name: '셀트리온', currentPrice: 198000, change: 9500, changeRate: 5.04 },
      { name: '유한양행', currentPrice: 89600, change: 4200, changeRate: 4.92 },
      { name: '녹십자', currentPrice: 156000, change: 7800, changeRate: 5.26 },
      { name: 'SK바이오팜', currentPrice: 78900, change: 3900, changeRate: 5.20 },
      { name: '한미약품', currentPrice: 234000, change: 11000, changeRate: 4.93 },
      { name: '종근당', currentPrice: 128000, change: 6400, changeRate: 5.26 },
      { name: '대웅제약', currentPrice: 145000, change: 7200, changeRate: 5.23 },
      { name: '일양약품', currentPrice: 34500, change: 1700, changeRate: 5.18 },
      { name: '광동제약', currentPrice: 23400, change: 1200, changeRate: 5.41 },
    ]
  },
  {
    id: 5,
    name: '수소에너지',
    change: 8.3,
    stockCount: 28,
    topStocks: [
      { name: '두산퓨얼셀', currentPrice: 45600, change: 3200, changeRate: 7.55 },
      { name: '효성중공업', currentPrice: 89400, change: 6800, changeRate: 8.23 },
      { name: '현대로템', currentPrice: 58900, change: 4500, changeRate: 8.27 },
      { name: 'SK에코플랜트', currentPrice: 67800, change: 5200, changeRate: 8.31 },
      { name: '한화솔루션', currentPrice: 34500, change: 2700, changeRate: 8.49 },
      { name: '코오롱인더', currentPrice: 23400, change: 1800, changeRate: 8.33 },
      { name: 'STX중공업', currentPrice: 12300, change: 900, changeRate: 7.89 },
      { name: '현대건설', currentPrice: 45600, change: 3500, changeRate: 8.32 },
      { name: 'GS건설', currentPrice: 29800, change: 2300, changeRate: 8.36 },
      { name: '포스코에너지', currentPrice: 18900, change: 1500, changeRate: 8.62 },
    ]
  },
  {
    id: 6,
    name: '전기차',
    change: -1.8,
    stockCount: 32,
    topStocks: [
      { name: '현대차', currentPrice: 234000, change: -4200, changeRate: -1.76 },
      { name: '기아', currentPrice: 98600, change: -1800, changeRate: -1.79 },
      { name: 'LG전자', currentPrice: 123000, change: -2200, changeRate: -1.76 },
      { name: '삼성SDI', currentPrice: 567000, change: -10200, changeRate: -1.77 },
      { name: '포스코퓨처엠', currentPrice: 289000, change: -5200, changeRate: -1.77 },
      { name: '현대모비스', currentPrice: 267000, change: -4800, changeRate: -1.77 },
      { name: 'LG에너지솔루션', currentPrice: 423000, change: -7600, changeRate: -1.76 },
      { name: '에코프로비엠', currentPrice: 178000, change: -3200, changeRate: -1.77 },
      { name: '만도', currentPrice: 56700, change: -1000, changeRate: -1.73 },
      { name: '한온시스템', currentPrice: 12300, change: -220, changeRate: -1.76 },
    ]
  },
  {
    id: 7,
    name: '메타버스',
    change: 6.4,
    stockCount: 25,
    topStocks: [
      { name: '네이버', currentPrice: 234000, change: 14100, changeRate: 6.41 },
      { name: '카카오', currentPrice: 56700, change: 3400, changeRate: 6.38 },
      { name: 'NAVER Z', currentPrice: 45600, change: 2900, changeRate: 6.79 },
      { name: '하이브', currentPrice: 189000, change: 11400, changeRate: 6.42 },
      { name: '엔씨소프트', currentPrice: 198000, change: 11900, changeRate: 6.39 },
      { name: '넷마블', currentPrice: 67800, change: 4100, changeRate: 6.43 },
      { name: '펄어비스', currentPrice: 34500, change: 2100, changeRate: 6.47 },
      { name: '위메이드', currentPrice: 45600, change: 2800, changeRate: 6.54 },
      { name: '자이언트스텝', currentPrice: 23400, change: 1500, changeRate: 6.85 },
      { name: '덱스터', currentPrice: 18900, change: 1200, changeRate: 6.78 },
    ]
  },
  {
    id: 8,
    name: '친환경',
    change: 4.9,
    stockCount: 38,
    topStocks: [
      { name: 'SK에코플랜트', currentPrice: 67800, change: 3200, changeRate: 4.95 },
      { name: '한화솔루션', currentPrice: 34500, change: 1600, changeRate: 4.86 },
      { name: 'HD현대에너지', currentPrice: 23400, change: 1100, changeRate: 4.93 },
      { name: 'GS건설', currentPrice: 29800, change: 1400, changeRate: 4.93 },
      { name: '포스코에너지', currentPrice: 18900, change: 900, changeRate: 5.00 },
      { name: '동서발전', currentPrice: 45600, change: 2200, changeRate: 5.07 },
      { name: '서부발전', currentPrice: 34500, change: 1700, changeRate: 5.19 },
      { name: '중부발전', currentPrice: 28900, change: 1400, changeRate: 5.09 },
      { name: '남동발전', currentPrice: 38700, change: 1900, changeRate: 5.16 },
      { name: '한국전력', currentPrice: 23400, change: 1100, changeRate: 4.93 },
    ]
  }
];

// 업종 목업 데이터
const mockSectors: ThemeData[] = [
  {
    id: 1,
    name: '은행',
    change: 4.2,
    stockCount: 8,
    topStocks: [
      { name: 'KB금융', currentPrice: 78900, change: 2800, changeRate: 3.68 },
      { name: '신한지주', currentPrice: 56700, change: 2100, changeRate: 3.85 },
      { name: '하나금융지주', currentPrice: 67800, change: 2500, changeRate: 3.83 },
      { name: '우리금융지주', currentPrice: 18900, change: 700, changeRate: 3.85 },
      { name: 'JB금융지주', currentPrice: 13400, change: 500, changeRate: 3.88 },
      { name: 'BNK금융지주', currentPrice: 9800, change: 400, changeRate: 4.26 },
      { name: 'DGB금융지주', currentPrice: 12300, change: 500, changeRate: 4.24 },
      { name: '기업은행', currentPrice: 23400, change: 900, changeRate: 4.00 },
      { name: '농협은행', currentPrice: 34500, change: 1300, changeRate: 3.92 },
      { name: 'IBK투자증권', currentPrice: 15600, change: 600, changeRate: 4.00 },
    ]
  },
  {
    id: 2,
    name: '반도체',
    change: 15.8,
    stockCount: 32,
    topStocks: [
      { name: '삼성전자', currentPrice: 74500, change: 9800, changeRate: 15.15 },
      { name: 'SK하이닉스', currentPrice: 142000, change: 18900, changeRate: 15.35 },
      { name: '삼성전기', currentPrice: 178000, change: 23400, changeRate: 15.13 },
      { name: 'SK스퀘어', currentPrice: 67800, change: 9100, changeRate: 15.50 },
      { name: 'DB하이텍', currentPrice: 52300, change: 6900, changeRate: 15.20 },
      { name: '메리츠반도체', currentPrice: 28900, change: 3800, changeRate: 15.14 },
      { name: '한미반도체', currentPrice: 64200, change: 8500, changeRate: 15.26 },
      { name: '원익IPS', currentPrice: 36500, change: 4900, changeRate: 15.51 },
      { name: '리노공업', currentPrice: 156000, change: 20800, changeRate: 15.38 },
      { name: 'SFA반도체', currentPrice: 19400, change: 2600, changeRate: 15.48 },
    ]
  },
  {
    id: 3,
    name: '자동차',
    change: -2.5,
    stockCount: 24,
    topStocks: [
      { name: '현대차', currentPrice: 234000, change: -6000, changeRate: -2.50 },
      { name: '기아', currentPrice: 98600, change: -2500, changeRate: -2.47 },
      { name: '현대모비스', currentPrice: 267000, change: -6800, changeRate: -2.48 },
      { name: '현대위아', currentPrice: 78900, change: -2000, changeRate: -2.47 },
      { name: '만도', currentPrice: 56700, change: -1400, changeRate: -2.41 },
      { name: '현대글로비스', currentPrice: 189000, change: -4800, changeRate: -2.48 },
      { name: '한온시스템', currentPrice: 12300, change: -300, changeRate: -2.38 },
      { name: '평화정공', currentPrice: 6780, change: -170, changeRate: -2.45 },
      { name: '에스엘', currentPrice: 45600, change: -1200, changeRate: -2.56 },
      { name: '동희오토', currentPrice: 23400, change: -600, changeRate: -2.50 },
    ]
  },
  {
    id: 4,
    name: '화학',
    change: 3.6,
    stockCount: 41,
    topStocks: [
      { name: 'LG화학', currentPrice: 389000, change: 13500, changeRate: 3.60 },
      { name: 'SK이노베이션', currentPrice: 145000, change: 5000, changeRate: 3.57 },
      { name: '한화솔루션', currentPrice: 34500, change: 1200, changeRate: 3.60 },
      { name: '롯데케미칼', currentPrice: 156000, change: 5400, changeRate: 3.59 },
      { name: '금호석유', currentPrice: 123000, change: 4300, changeRate: 3.62 },
      { name: 'KCC', currentPrice: 267000, change: 9300, changeRate: 3.61 },
      { name: '삼성정밀화학', currentPrice: 78900, change: 2800, changeRate: 3.68 },
      { name: '강원에너지', currentPrice: 45600, change: 1600, changeRate: 3.64 },
      { name: '코스모화학', currentPrice: 23400, change: 800, changeRate: 3.54 },
      { name: '대한유화', currentPrice: 189000, change: 6600, changeRate: 3.62 },
    ]
  },
  {
    id: 5,
    name: '인터넷',
    change: 7.9,
    stockCount: 19,
    topStocks: [
      { name: '네이버', currentPrice: 234000, change: 17100, changeRate: 7.88 },
      { name: '카카오', currentPrice: 56700, change: 4100, changeRate: 7.80 },
      { name: '크래프톤', currentPrice: 289000, change: 21100, changeRate: 7.88 },
      { name: '엔씨소프트', currentPrice: 198000, change: 14500, changeRate: 7.90 },
      { name: '넷마블', currentPrice: 67800, change: 4900, changeRate: 7.79 },
      { name: '위메이드', currentPrice: 45600, change: 3300, changeRate: 7.80 },
      { name: '펄어비스', currentPrice: 34500, change: 2500, changeRate: 7.81 },
      { name: '컴투스', currentPrice: 78900, change: 5800, changeRate: 7.94 },
      { name: '게임빌', currentPrice: 23400, change: 1700, changeRate: 7.83 },
      { name: '웹젠', currentPrice: 18900, change: 1400, changeRate: 8.00 },
    ]
  },
  {
    id: 6,
    name: '건설',
    change: 2.8,
    stockCount: 35,
    topStocks: [
      { name: '삼성물산', currentPrice: 134000, change: 3600, changeRate: 2.76 },
      { name: '현대건설', currentPrice: 45600, change: 1200, changeRate: 2.70 },
      { name: 'GS건설', currentPrice: 29800, change: 800, changeRate: 2.76 },
      { name: 'DL이앤씨', currentPrice: 67800, change: 1800, changeRate: 2.73 },
      { name: '대우건설', currentPrice: 5890, change: 160, changeRate: 2.79 },
      { name: '대림산업', currentPrice: 78900, change: 2100, changeRate: 2.73 },
      { name: '롯데건설', currentPrice: 34500, change: 900, changeRate: 2.68 },
      { name: 'SK에코플랜트', currentPrice: 67800, change: 1900, changeRate: 2.88 },
      { name: '포스코건설', currentPrice: 7890, change: 220, changeRate: 2.87 },
      { name: '한화건설', currentPrice: 23400, change: 600, changeRate: 2.63 },
    ]
  },
  {
    id: 7,
    name: '증권',
    change: 5.3,
    stockCount: 22,
    topStocks: [
      { name: '삼성증권', currentPrice: 45600, change: 2300, changeRate: 5.31 },
      { name: '미래에셋증권', currentPrice: 8900, change: 450, changeRate: 5.33 },
      { name: 'KB증권', currentPrice: 67800, change: 3400, changeRate: 5.28 },
      { name: '한국투자증권', currentPrice: 3450, change: 170, changeRate: 5.18 },
      { name: '메리츠증권', currentPrice: 5670, change: 290, changeRate: 5.39 },
      { name: '키움증권', currentPrice: 123000, change: 6200, changeRate: 5.31 },
      { name: '신한투자증권', currentPrice: 4560, change: 230, changeRate: 5.31 },
      { name: 'NH투자증권', currentPrice: 12300, change: 620, changeRate: 5.30 },
      { name: '하나증권', currentPrice: 2340, change: 120, changeRate: 5.41 },
      { name: '대신증권', currentPrice: 18900, change: 950, changeRate: 5.30 },
    ]
  },
  {
    id: 8,
    name: '통신',
    change: 1.5,
    stockCount: 12,
    topStocks: [
      { name: 'SK텔레콤', currentPrice: 56700, change: 840, changeRate: 1.50 },
      { name: 'KT', currentPrice: 34500, change: 510, changeRate: 1.50 },
      { name: 'LG유플러스', currentPrice: 12300, change: 180, changeRate: 1.49 },
      { name: 'SK스퀘어', currentPrice: 67800, change: 1000, changeRate: 1.50 },
      { name: 'LG전자', currentPrice: 123000, change: 1820, changeRate: 1.50 },
      { name: 'SK브로드밴드', currentPrice: 5670, change: 80, changeRate: 1.43 },
      { name: 'KT스카이라이프', currentPrice: 8900, change: 130, changeRate: 1.48 },
      { name: '세종텔레콤', currentPrice: 4560, change: 70, changeRate: 1.56 },
      { name: '드림라인', currentPrice: 2340, change: 30, changeRate: 1.30 },
      { name: '티브로드', currentPrice: 1890, change: 30, changeRate: 1.61 },
    ]
  }
];

export function ThemeSector() {
  const [activeTab, setActiveTab] = useState<TabType>('테마');

  const data = activeTab === '테마' ? mockThemes : mockSectors;

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">테마/업종</h2>
        <p className="text-slate-600 mt-1">주요 테마 및 업종별 시황 분석</p>
      </div>

      <div className="flex items-center space-x-4 mb-4">
        <Button
          className={`${
            activeTab === '테마' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('테마')}
        >
          테마
        </Button>
        <Button
          className={`${
            activeTab === '업종' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('업종')}
        >
          업종
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {data.map((theme) => {
          const isPositive = theme.change >= 0;
          
          return (
            <Card key={theme.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isPositive ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <Layers className={`w-5 h-5 ${
                        isPositive ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <CardTitle className="text-sm">{theme.name}</CardTitle>
                      <p className="text-[10px] text-slate-500">{theme.stockCount}개</p>
                    </div>
                  </div>
                  <div className={`text-right ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    <div className="flex items-center gap-1 justify-end">
                      {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span className="text-sm font-bold">{isPositive ? '+' : ''}{theme.change}%</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-300">
                        <th className="text-left py-1 px-1 font-semibold text-slate-700 text-[10px]">종목명</th>
                        <th className="text-right py-1 px-1 font-semibold text-slate-700 text-[10px]">현재가</th>
                        <th className="text-right py-1 px-1 font-semibold text-slate-700 text-[10px]">등락률</th>
                      </tr>
                    </thead>
                    <tbody>
                      {theme.topStocks.map((stock, idx) => (
                        <tr 
                          key={idx} 
                          className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                        >
                          <td className="py-1.5 px-1 font-medium text-slate-900 text-[10px]">
                            <div className="flex items-center gap-1">
                              <div className={`w-4 h-4 rounded-full ${getStockColor(stock.name)} flex items-center justify-center text-white font-bold text-[8px] flex-shrink-0`}>
                                {stock.name.charAt(0)}
                              </div>
                              <span className="truncate">{stock.name}</span>
                            </div>
                          </td>
                          <td className="py-1.5 px-1 text-right font-semibold text-slate-900 text-[10px]">
                            {stock.currentPrice.toLocaleString()}
                          </td>
                          <td className={`py-1.5 px-1 text-right font-semibold text-[10px] ${
                            stock.changeRate > 0 
                              ? 'text-red-600' 
                              : stock.changeRate < 0 
                              ? 'text-blue-600' 
                              : 'text-slate-600'
                          }`}>
                            {stock.changeRate > 0 ? '+' : ''}{stock.changeRate.toFixed(2)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}