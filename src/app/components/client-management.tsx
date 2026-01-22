import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Badge } from '@/app/components/ui/badge';
import { 
  Users, 
  Plus, 
  Search, 
  Phone, 
  Mail, 
  Building2, 
  TrendingUp,
  AlertCircle,
  Calendar,
  DollarSign,
  FileText,
  Edit,
  MoreVertical,
  ArrowUpDown,
  Star,
  MessageSquare,
  Send,
  Sparkles
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  aum: number;
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  joinDate: string;
  lastContact: string;
  portfolio: {
    stocks: number;
    bonds: number;
    cash: number;
    alternatives: number;
  };
  returns: number;
  notes: string;
  isFavorite: boolean;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: '김영희',
    email: 'younghee.kim@example.com',
    phone: '010-1234-5678',
    aum: 35000000000,
    riskProfile: 'moderate',
    joinDate: '2023-03-15',
    lastContact: '2026-01-18',
    portfolio: { stocks: 45, bonds: 35, cash: 15, alternatives: 5 },
    returns: 12.5,
    notes: '안정적 투자 선호, 분기별 리밸런싱 요청',
    isFavorite: true
  },
  {
    id: '2',
    name: '이철수',
    email: 'cheolsoo.lee@example.com',
    phone: '010-2345-6789',
    aum: 28000000000,
    riskProfile: 'conservative',
    joinDate: '2022-11-20',
    lastContact: '2026-01-15',
    portfolio: { stocks: 30, bonds: 50, cash: 18, alternatives: 2 },
    returns: 8.3,
    notes: '은퇴 준비 고객, 안전자산 위주',
    isFavorite: false
  },
  {
    id: '3',
    name: '박민수',
    email: 'minsoo.park@example.com',
    phone: '010-3456-7890',
    aum: 22000000000,
    riskProfile: 'aggressive',
    joinDate: '2024-05-10',
    lastContact: '2026-01-19',
    portfolio: { stocks: 70, bonds: 10, cash: 10, alternatives: 10 },
    returns: 18.7,
    notes: '적극적 투자 성향, 테크 섹터 관심 높음',
    isFavorite: true
  },
  {
    id: '4',
    name: '정수진',
    email: 'soojin.jung@example.com',
    phone: '010-4567-8901',
    aum: 18000000000,
    riskProfile: 'moderate',
    joinDate: '2023-08-22',
    lastContact: '2026-01-17',
    portfolio: { stocks: 50, bonds: 30, cash: 15, alternatives: 5 },
    returns: 10.2,
    notes: '자녀 교육비 준비 중, 중기 투자 계획',
    isFavorite: false
  },
  {
    id: '5',
    name: '최동욱',
    email: 'dongwook.choi@example.com',
    phone: '010-5678-9012',
    aum: 15000000000,
    riskProfile: 'conservative',
    joinDate: '2024-01-15',
    lastContact: '2026-01-16',
    portfolio: { stocks: 35, bonds: 45, cash: 18, alternatives: 2 },
    returns: 7.8,
    notes: '안정적 배당 수익 선호',
    isFavorite: true
  },
  {
    id: '6',
    name: '송미경',
    email: 'mikyung.song@example.com',
    phone: '010-6789-0123',
    aum: 42000000000,
    riskProfile: 'aggressive',
    joinDate: '2023-06-12',
    lastContact: '2026-01-20',
    portfolio: { stocks: 65, bonds: 20, cash: 10, alternatives: 5 },
    returns: 15.3,
    notes: '해외주식 투자 비중 확대 희망',
    isFavorite: false
  },
  {
    id: '7',
    name: '강준호',
    email: 'junho.kang@example.com',
    phone: '010-7890-1234',
    aum: 31000000000,
    riskProfile: 'moderate',
    joinDate: '2023-09-05',
    lastContact: '2026-01-19',
    portfolio: { stocks: 48, bonds: 32, cash: 15, alternatives: 5 },
    returns: 11.8,
    notes: 'ESG 투자에 관심 많음',
    isFavorite: true
  },
  {
    id: '8',
    name: '윤지혜',
    email: 'jihye.yoon@example.com',
    phone: '010-8901-2345',
    aum: 26000000000,
    riskProfile: 'conservative',
    joinDate: '2024-02-28',
    lastContact: '2026-01-18',
    portfolio: { stocks: 28, bonds: 52, cash: 18, alternatives: 2 },
    returns: 6.9,
    notes: '주택 구입 자금 준비 중',
    isFavorite: false
  },
  {
    id: '9',
    name: '임태양',
    email: 'taeyang.lim@example.com',
    phone: '010-9012-3456',
    aum: 38000000000,
    riskProfile: 'aggressive',
    joinDate: '2022-12-10',
    lastContact: '2026-01-17',
    portfolio: { stocks: 72, bonds: 12, cash: 8, alternatives: 8 },
    returns: 20.1,
    notes: '바이오/헬스케어 섹터 집중 투자',
    isFavorite: true
  },
  {
    id: '10',
    name: '한소영',
    email: 'soyoung.han@example.com',
    phone: '010-0123-4567',
    aum: 29000000000,
    riskProfile: 'moderate',
    joinDate: '2023-04-18',
    lastContact: '2026-01-16',
    portfolio: { stocks: 52, bonds: 28, cash: 15, alternatives: 5 },
    returns: 13.2,
    notes: '연금 저축 계좌 추가 개설 필요',
    isFavorite: false
  },
  {
    id: '11',
    name: '오성민',
    email: 'seongmin.oh@example.com',
    phone: '010-1357-2468',
    aum: 19000000000,
    riskProfile: 'conservative',
    joinDate: '2024-07-22',
    lastContact: '2026-01-15',
    portfolio: { stocks: 32, bonds: 48, cash: 18, alternatives: 2 },
    returns: 7.2,
    notes: '보수적 자산 배분 선호',
    isFavorite: true
  },
  {
    id: '12',
    name: '서현우',
    email: 'hyunwoo.seo@example.com',
    phone: '010-2468-1357',
    aum: 45000000000,
    riskProfile: 'aggressive',
    joinDate: '2023-01-30',
    lastContact: '2026-01-20',
    portfolio: { stocks: 68, bonds: 15, cash: 10, alternatives: 7 },
    returns: 17.9,
    notes: '반도체 업종 비중 높음',
    isFavorite: false
  },
  {
    id: '13',
    name: '권나영',
    email: 'nayoung.kwon@example.com',
    phone: '010-3690-2581',
    aum: 24000000000,
    riskProfile: 'moderate',
    joinDate: '2023-11-08',
    lastContact: '2026-01-19',
    portfolio: { stocks: 46, bonds: 34, cash: 16, alternatives: 4 },
    returns: 9.8,
    notes: '배당주 중심 포트폴리오 구성',
    isFavorite: true
  },
  {
    id: '14',
    name: '조재훈',
    email: 'jaehun.cho@example.com',
    phone: '010-4812-3690',
    aum: 33000000000,
    riskProfile: 'aggressive',
    joinDate: '2024-03-14',
    lastContact: '2026-01-18',
    portfolio: { stocks: 75, bonds: 8, cash: 12, alternatives: 5 },
    returns: 22.4,
    notes: '신재생 에너지 섹터 관심',
    isFavorite: false
  },
  {
    id: '15',
    name: '배수진',
    email: 'soojin.bae@example.com',
    phone: '010-5924-3681',
    aum: 27000000000,
    riskProfile: 'moderate',
    joinDate: '2023-07-25',
    lastContact: '2026-01-17',
    portfolio: { stocks: 49, bonds: 31, cash: 15, alternatives: 5 },
    returns: 11.3,
    notes: '글로벌 분산투자 선호',
    isFavorite: true
  },
  {
    id: '16',
    name: '신도현',
    email: 'dohyun.shin@example.com',
    phone: '010-6147-2583',
    aum: 21000000000,
    riskProfile: 'conservative',
    joinDate: '2024-05-19',
    lastContact: '2026-01-16',
    portfolio: { stocks: 33, bonds: 47, cash: 18, alternatives: 2 },
    returns: 8.1,
    notes: '안정적 수익 추구, 위험 회피 성향',
    isFavorite: false
  },
  {
    id: '17',
    name: '홍지우',
    email: 'jiwoo.hong@example.com',
    phone: '010-7258-3694',
    aum: 36000000000,
    riskProfile: 'aggressive',
    joinDate: '2022-10-05',
    lastContact: '2026-01-20',
    portfolio: { stocks: 70, bonds: 13, cash: 10, alternatives: 7 },
    returns: 19.6,
    notes: '테마주 단기 매매 선호',
    isFavorite: true
  },
  {
    id: '18',
    name: '남궁민',
    email: 'min.namgung@example.com',
    phone: '010-8369-1470',
    aum: 30000000000,
    riskProfile: 'moderate',
    joinDate: '2023-12-20',
    lastContact: '2026-01-19',
    portfolio: { stocks: 51, bonds: 29, cash: 15, alternatives: 5 },
    returns: 12.7,
    notes: '퇴직연금 자산배분 컨설팅 진행 중',
    isFavorite: false
  },
];

export function ClientManagement() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'aum' | 'name' | 'lastContact' | 'returns'>('aum');
  const [isSmsDialogOpen, setIsSmsDialogOpen] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isProposalDialogOpen, setIsProposalDialogOpen] = useState(false);

  const toggleFavorite = (clientId: string) => {
    setClients(prevClients =>
      prevClients.map(client =>
        client.id === clientId
          ? { ...client, isFavorite: !client.isFavorite }
          : client
      )
    );
  };

  const filteredClients = clients
    .filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      // 즐겨찾기 고객을 항상 먼저 표시
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;
      
      // 즐겨찾기 여부가 같으면 선택된 정렬 기준에 따라 정렬
      switch (sortBy) {
        case 'aum':
          return b.aum - a.aum; // 자산 많은 순
        case 'name':
          return a.name.localeCompare(b.name, 'ko'); // 가나다순
        case 'lastContact':
          return new Date(b.lastContact).getTime() - new Date(a.lastContact).getTime(); // 최근 상담순
        case 'returns':
          return b.returns - a.returns; // 수익률 높은 순
        default:
          return 0;
      }
    });

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'conservative': return 'bg-green-100 text-green-700';
      case 'moderate': return 'bg-yellow-100 text-yellow-700';
      case 'aggressive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'conservative': return '안정형';
      case 'moderate': return '중립형';
      case 'aggressive': return '공격형';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">고객 관리</h2>
          <p className="text-slate-600 mt-1">총 {clients.length}명의 고객을 관리하고 있습니다</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              신규 고객 등록
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>신규 고객 등록</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label>고객명</Label>
                <Input placeholder="홍길동" />
              </div>
              <div className="space-y-2">
                <Label>연락처</Label>
                <Input placeholder="010-0000-0000" />
              </div>
              <div className="space-y-2">
                <Label>이메일</Label>
                <Input placeholder="example@email.com" />
              </div>
              <div className="space-y-2">
                <Label>투자 성향</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">안정형</SelectItem>
                    <SelectItem value="moderate">중립형</SelectItem>
                    <SelectItem value="aggressive">공격형</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label>초기 자산</Label>
                <Input placeholder="0" type="number" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>메모</Label>
                <Input placeholder="특이사항을 입력하세요" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>취소</Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>등록</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">AI고객검색</h3>
            <p className="text-sm text-slate-500">(검색예시: 원전 관련 종목을 매도했고, 보유 현금이 5천만원 이상인 고객 찾아줘)</p>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                placeholder="AI에게 원하는 고객군을 대화로 찾아보세요."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="w-40">
              <Search className="w-4 h-4 mr-2" />
              검색
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sort Buttons */}
      <div className="flex gap-2 items-center justify-between">
        <div className="text-sm text-slate-600">
          <span className="font-medium">검색된 고객 {filteredClients.length}명</span>
        </div>
        <div className="flex gap-2 items-center">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <ArrowUpDown className="w-4 h-4" />
            <span className="font-medium">정렬:</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant={sortBy === 'aum' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('aum')}
              className="text-sm"
            >
              자산순
            </Button>
            <Button
              variant={sortBy === 'name' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('name')}
              className="text-sm"
            >
              이름순
            </Button>
            <Button
              variant={sortBy === 'lastContact' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('lastContact')}
              className="text-sm"
            >
              최근상담순
            </Button>
            <Button
              variant={sortBy === 'returns' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('returns')}
              className="text-sm"
            >
              수익률순
            </Button>
          </div>
        </div>
      </div>

      {/* Client List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {client.name[0]}
                  </div>
                  <div>
                    <CardTitle className="text-base">{client.name}</CardTitle>
                    <Badge className={`mt-1 text-xs ${getRiskBadgeColor(client.riskProfile)}`}>
                      {getRiskLabel(client.riskProfile)}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 -mt-1 -mr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(client.id);
                  }}
                >
                  <Star
                    className={`w-4 h-4 ${
                      client.isFavorite
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-slate-400 hover:text-yellow-500'
                    }`}
                  />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">운용자산(AUM)</p>
                  <p className="text-sm font-semibold">{(client.aum / 100000000).toFixed(0)}억원</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-500">수익률</p>
                  <p className={`text-sm font-semibold ${client.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {client.returns >= 0 ? '+' : ''}{client.returns}%
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 pt-2 border-t text-xs">
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-3 h-3" />
                  <span className="truncate">{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Calendar className="w-3 h-3" />
                  <span className="truncate">상담: {client.lastContact}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-xs"
                  onClick={() => setSelectedClient(client)}
                >
                  <FileText className="w-3 h-3 mr-1" />
                  상세보기
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Dialog */}
      <Dialog open={selectedClient !== null} onOpenChange={(open) => !open && setSelectedClient(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {selectedClient && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xl">
                    {selectedClient.name[0]}
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">{selectedClient.name}</DialogTitle>
                    <Badge className={`mt-1 ${getRiskBadgeColor(selectedClient.riskProfile)}`}>
                      {getRiskLabel(selectedClient.riskProfile)}
                    </Badge>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-1">
                        <p className="text-sm text-slate-500">운용자산(AUM)</p>
                        <p className="text-2xl font-bold">{(selectedClient.aum / 100000000).toFixed(0)}억원</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-1">
                        <p className="text-sm text-slate-500">수익률</p>
                        <p className={`text-2xl font-bold ${selectedClient.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedClient.returns >= 0 ? '+' : ''}{selectedClient.returns}%
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Contact Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">연락처 정보</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-slate-500" />
                      <span>{selectedClient.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-slate-500" />
                      <span>{selectedClient.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-slate-500" />
                      <span>가입일: {selectedClient.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-slate-500" />
                      <span>최근 상담: {selectedClient.lastContact}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Portfolio */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">포트폴리오 구성</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex h-4 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-500" 
                        style={{ width: `${selectedClient.portfolio.stocks}%` }} 
                        title={`주식 ${selectedClient.portfolio.stocks}%`} 
                      />
                      <div 
                        className="bg-green-500" 
                        style={{ width: `${selectedClient.portfolio.bonds}%` }} 
                        title={`채권 ${selectedClient.portfolio.bonds}%`} 
                      />
                      <div 
                        className="bg-yellow-500" 
                        style={{ width: `${selectedClient.portfolio.cash}%` }} 
                        title={`현금 ${selectedClient.portfolio.cash}%`} 
                      />
                      <div 
                        className="bg-purple-500" 
                        style={{ width: `${selectedClient.portfolio.alternatives}%` }} 
                        title={`대체투자 ${selectedClient.portfolio.alternatives}%`} 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-blue-500" />
                        <span className="text-sm">주식 {selectedClient.portfolio.stocks}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-green-500" />
                        <span className="text-sm">채권 {selectedClient.portfolio.bonds}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-yellow-500" />
                        <span className="text-sm">현금 {selectedClient.portfolio.cash}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-purple-500" />
                        <span className="text-sm">대체투자 {selectedClient.portfolio.alternatives}%</span>
                      </div>
                    </div>

                    {/* Portfolio Details Tabs */}
                    <div className="pt-4 border-t border-slate-200">
                      <Tabs defaultValue="stocks" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                          <TabsTrigger value="stocks">주식</TabsTrigger>
                          <TabsTrigger value="bonds">채권</TabsTrigger>
                          <TabsTrigger value="cash">현금</TabsTrigger>
                          <TabsTrigger value="alternatives">대체투자</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="stocks" className="mt-4">
                          <div className="space-y-3">
                            <div className="text-xs font-semibold text-slate-500 grid grid-cols-4 gap-2 pb-2 border-b">
                              <div>종목명</div>
                              <div className="text-right">수익률</div>
                              <div className="text-right">비중</div>
                              <div className="text-right">편입일</div>
                            </div>
                            <div className="space-y-2">
                              <div className="grid grid-cols-4 gap-2 text-sm py-2 hover:bg-slate-50 rounded">
                                <div className="font-medium">삼성전자</div>
                                <div className="text-right text-green-600 font-medium">+12.5%</div>
                                <div className="text-right text-blue-600">30%</div>
                                <div className="text-right text-slate-500">2024.03.15</div>
                              </div>
                              <div className="grid grid-cols-4 gap-2 text-sm py-2 hover:bg-slate-50 rounded">
                                <div className="font-medium">SK하이닉스</div>
                                <div className="text-right text-green-600 font-medium">+28.3%</div>
                                <div className="text-right text-blue-600">20%</div>
                                <div className="text-right text-slate-500">2024.05.20</div>
                              </div>
                              <div className="grid grid-cols-4 gap-2 text-sm py-2 hover:bg-slate-50 rounded">
                                <div className="font-medium">NAVER</div>
                                <div className="text-right text-green-600 font-medium">+8.7%</div>
                                <div className="text-right text-blue-600">15%</div>
                                <div className="text-right text-slate-500">2024.08.10</div>
                              </div>
                              <div className="grid grid-cols-4 gap-2 text-sm py-2 hover:bg-slate-50 rounded">
                                <div className="font-medium">LG에너지솔루션</div>
                                <div className="text-right text-red-600 font-medium">-3.2%</div>
                                <div className="text-right text-blue-600">10%</div>
                                <div className="text-right text-slate-500">2024.11.05</div>
                              </div>
                              <div className="grid grid-cols-4 gap-2 text-sm py-2 hover:bg-slate-50 rounded">
                                <div className="font-medium">현대차</div>
                                <div className="text-right text-green-600 font-medium">+5.1%</div>
                                <div className="text-right text-blue-600">5%</div>
                                <div className="text-right text-slate-500">2025.01.12</div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="bonds" className="mt-4">
                          <div className="space-y-3">
                            <div className="text-xs font-semibold text-slate-500 grid grid-cols-4 gap-2 pb-2 border-b">
                              <div>채권명</div>
                              <div className="text-right">수익률</div>
                              <div className="text-right">비중</div>
                              <div className="text-right">편입일</div>
                            </div>
                            <div className="space-y-2">
                              <div className="grid grid-cols-4 gap-2 text-sm py-2 hover:bg-slate-50 rounded">
                                <div className="font-medium">국고채권 10년</div>
                                <div className="text-right text-green-600 font-medium">+3.2%</div>
                                <div className="text-right text-green-600">40%</div>
                                <div className="text-right text-slate-500">2023.06.10</div>
                              </div>
                              <div className="grid grid-cols-4 gap-2 text-sm py-2 hover:bg-slate-50 rounded">
                                <div className="font-medium">회사채 AA+</div>
                                <div className="text-right text-green-600 font-medium">+4.5%</div>
                                <div className="text-right text-green-600">30%</div>
                                <div className="text-right text-slate-500">2023.09.22</div>
                              </div>
                              <div className="grid grid-cols-4 gap-2 text-sm py-2 hover:bg-slate-50 rounded">
                                <div className="font-medium">국고채권 5년</div>
                                <div className="text-right text-green-600 font-medium">+2.8%</div>
                                <div className="text-right text-green-600">20%</div>
                                <div className="text-right text-slate-500">2024.02.15</div>
                              </div>
                              <div className="grid grid-cols-4 gap-2 text-sm py-2 hover:bg-slate-50 rounded">
                                <div className="font-medium">통안채 3년</div>
                                <div className="text-right text-green-600 font-medium">+2.1%</div>
                                <div className="text-right text-green-600">10%</div>
                                <div className="text-right text-slate-500">2024.07.30</div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="cash" className="mt-4">
                          <div className="space-y-3">
                            <div className="text-xs font-semibold text-slate-500 grid grid-cols-4 gap-2 pb-2 border-b">
                              <div>상품명</div>
                              <div className="text-right">수익률</div>
                              <div className="text-right">비중</div>
                              <div className="text-right">편입일</div>
                            </div>
                            <div className="space-y-2">
                              <div className="grid grid-cols-4 gap-2 text-sm py-2 hover:bg-slate-50 rounded">
                                <div className="font-medium">CMA 통장</div>
                                <div className="text-right text-green-600 font-medium">+2.5%</div>
                                <div className="text-right text-yellow-600">65%</div>
                                <div className="text-right text-slate-500">2023.03.15</div>
                              </div>
                              <div className="grid grid-cols-4 gap-2 text-sm py-2 hover:bg-slate-50 rounded">
                                <div className="font-medium">MMF</div>
                                <div className="text-right text-green-600 font-medium">+2.8%</div>
                                <div className="text-right text-yellow-600">35%</div>
                                <div className="text-right text-slate-500">2024.01.10</div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="alternatives" className="mt-4">
                          <div className="space-y-3">
                            <div className="text-xs font-semibold text-slate-500 grid grid-cols-4 gap-2 pb-2 border-b">
                              <div>상품명</div>
                              <div className="text-right">수익률</div>
                              <div className="text-right">비중</div>
                              <div className="text-right">편입일</div>
                            </div>
                            <div className="space-y-2">
                              <div className="grid grid-cols-4 gap-2 text-sm py-2 hover:bg-slate-50 rounded">
                                <div className="font-medium">글로벌 부동산 펀드</div>
                                <div className="text-right text-green-600 font-medium">+6.8%</div>
                                <div className="text-right text-purple-600">50%</div>
                                <div className="text-right text-slate-500">2023.11.20</div>
                              </div>
                              <div className="grid grid-cols-4 gap-2 text-sm py-2 hover:bg-slate-50 rounded">
                                <div className="font-medium">금 ETF</div>
                                <div className="text-right text-green-600 font-medium">+11.3%</div>
                                <div className="text-right text-purple-600">30%</div>
                                <div className="text-right text-slate-500">2024.04.15</div>
                              </div>
                              <div className="grid grid-cols-4 gap-2 text-sm py-2 hover:bg-slate-50 rounded">
                                <div className="font-medium">원자재 펀드</div>
                                <div className="text-right text-red-600 font-medium">-1.5%</div>
                                <div className="text-right text-purple-600">20%</div>
                                <div className="text-right text-slate-500">2024.09.08</div>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </CardContent>
                </Card>

                {/* Notes */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">메모</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700">{selectedClient.notes}</p>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsSmsDialogOpen(true)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    문자 보내기
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setIsEmailDialogOpen(true)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    이메일 보내기
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => setIsProposalDialogOpen(true)}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    제안서 만들기
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* SMS Dialog */}
      <Dialog open={isSmsDialogOpen} onOpenChange={setIsSmsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>문자 보내기</DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-4 mt-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {selectedClient.name[0]}
                  </div>
                  <div>
                    <p className="font-medium">{selectedClient.name}</p>
                    <p className="text-sm text-slate-600">{selectedClient.phone}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>메시지 내용</Label>
                <textarea
                  className="w-full min-h-[200px] p-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="고객님께 보낼 메시지를 입력하세요..."
                  defaultValue={`안녕하세요 ${selectedClient.name} 고객님,\n\n항상 저희 서비스를 이용해 주셔서 감사합니다.\n\n문의사항이 있으시면 언제든지 연락 주시기 바랍니다.\n\n감사합니다.`}
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>한글 45자 / 영문 90자</span>
                  <span>표준 문자 (90byte)</span>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsSmsDialogOpen(false)}>
                  취소
                </Button>
                <Button onClick={() => {
                  setIsSmsDialogOpen(false);
                  alert('문자가 전송되었습니다.');
                }}>
                  <Send className="w-4 h-4 mr-2" />
                  전송하기
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>이메일 보내기</DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-4 mt-4">
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {selectedClient.name[0]}
                  </div>
                  <div>
                    <p className="font-medium">{selectedClient.name}</p>
                    <p className="text-sm text-slate-600">{selectedClient.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>제목</Label>
                <Input 
                  placeholder="이메일 제목을 입력하세요" 
                  defaultValue="[RASSI FApro] 포트폴리오 현황 안내"
                />
              </div>

              <div className="space-y-2">
                <Label>내용</Label>
                <textarea
                  className="w-full min-h-[300px] p-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="이메일 내용을 입력하세요..."
                  defaultValue={`안녕하세요 ${selectedClient.name} 고객님,\n\n항상 저희 RASSI FApro를 이용해 주셔서 진심으로 감사드립니다.\n\n고객님의 현재 포트폴리오 수익률은 ${selectedClient.returns >= 0 ? '+' : ''}${selectedClient.returns}%입니다.\n\n지속적인 자산 관리를 통해 더 나은 수익을 달성할 수 있도록 최선을 다하겠습니다.\n\n문의사항이 있으시면 언제든지 연락 주시기 바랍니다.\n\n감사합니다.\n\nRAS SI FApro 팀 드림`}
                />
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" id="attach" className="rounded" />
                <label htmlFor="attach">포트폴리오 상세 리포트 첨부</label>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                  취소
                </Button>
                <Button onClick={() => {
                  setIsEmailDialogOpen(false);
                  alert('이메일이 전송되었습니다.');
                }}>
                  <Send className="w-4 h-4 mr-2" />
                  전송하기
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* AI Proposal Dialog */}
      <Dialog open={isProposalDialogOpen} onOpenChange={setIsProposalDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              AI 제안서 생성
            </DialogTitle>
          </DialogHeader>
          {selectedClient && (
            <div className="space-y-6 mt-4">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                    {selectedClient.name[0]}
                  </div>
                  <div>
                    <p className="font-medium">{selectedClient.name} 고객님</p>
                    <p className="text-sm text-slate-600">
                      {getRiskLabel(selectedClient.riskProfile)} · AUM {(selectedClient.aum / 100000000).toFixed(0)}억원 · 수익률 {selectedClient.returns >= 0 ? '+' : ''}{selectedClient.returns}%
                    </p>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">제안서 유형 선택</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="p-4 border-2 border-blue-500 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                      <FileText className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">포트폴리오 리밸런싱</p>
                    </button>
                    <button className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-300 hover:bg-slate-50 transition-colors">
                      <TrendingUp className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">신규 투자 제안</p>
                    </button>
                    <button className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-300 hover:bg-slate-50 transition-colors">
                      <DollarSign className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                      <p className="text-sm font-medium">세금 절감 전략</p>
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    AI가 생성한 제안서 미리보기
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold mb-3">포트폴리오 리밸런싱 제안서</h3>
                    
                    <div className="bg-slate-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold text-sm mb-2">현재 포트폴리오 분석</h4>
                      <ul className="text-sm space-y-1 text-slate-700">
                        <li>• 주식 비중: {selectedClient.portfolio.stocks}% (목표 대비 적정)</li>
                        <li>• 채권 비중: {selectedClient.portfolio.bonds}% (안정성 우수)</li>
                        <li>• 현금 비중: {selectedClient.portfolio.cash}% (유동성 확보)</li>
                        <li>• 대체투자: {selectedClient.portfolio.alternatives}% (분산 효과)</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold text-sm mb-2 text-blue-900">AI 추천 전략</h4>
                      <ul className="text-sm space-y-2 text-slate-700">
                        <li>
                          <strong>1. 반도체 섹터 비중 확대</strong>
                          <p className="text-xs mt-1">AI 반도체 수요 증가로 삼성전자, SK하이닉스 비중을 현재 50%에서 55%로 확대 제안</p>
                        </li>
                        <li>
                          <strong>2. 배당주 포트폴리오 강화</strong>
                          <p className="text-xs mt-1">안정적 현금흐름 확보를 위해 우량 배당주 3종목 추가 편입</p>
                        </li>
                        <li>
                          <strong>3. 글로벌 분산 투자</strong>
                          <p className="text-xs mt-1">미국 S&P500 ETF 및 선진국 채권 펀드 편입으로 지역 분산 효과</p>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2 text-green-900">기대 효과</h4>
                      <ul className="text-sm space-y-1 text-slate-700">
                        <li>• 예상 수익률: 현재 {selectedClient.returns}% → 목표 {(selectedClient.returns + 3).toFixed(1)}%</li>
                        <li>• 리스크 감소: 포트폴리오 변동성 15% 감소 예상</li>
                        <li>• 세금 효율: 연간 약 200만원 절감 가능</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsProposalDialogOpen(false)}>
                  닫기
                </Button>
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  PDF 다운로드
                </Button>
                <Button onClick={() => {
                  setIsProposalDialogOpen(false);
                  setIsEmailDialogOpen(true);
                }}>
                  <Mail className="w-4 h-4 mr-2" />
                  이메일로 전송
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {filteredClients.length === 0 && (
        <Card className="py-16">
          <CardContent className="text-center">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h3>
            <p className="text-slate-600">다른 검색어를 입력해주세요</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}