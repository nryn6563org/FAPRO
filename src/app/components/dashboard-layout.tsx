import { ReactNode, useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  MessageSquare, 
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Zap,
  ChevronDown,
  ChevronRight,
  FileText,
  BarChart3,
  TrendingDown,
  Layers,
  FileBarChart,
  ClipboardList,
  Lightbulb,
  CalendarDays,
  Star,
  PieChart,
  LogOut,
  LogIn
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { IndexCard } from '@/app/components/ui/index-card';

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  children?: NavSubItem[];
}

interface NavSubItem {
  id: string;
  label: string;
  icon: any;
  children?: NavSubSubItem[];
}

interface NavSubSubItem {
  id: string;
  label: string;
  icon: any;
}

export function DashboardLayout({ children, activeTab, onTabChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['investment-info', 'market-info', 'ai-recommend']);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuId) 
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const navItems: NavItem[] = [
    { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
    { id: 'clients', label: '고객 관리', icon: Users },
    { id: 'market', label: '시장 지수', icon: TrendingUp },
    { 
      id: 'investment-info', 
      label: '투자정보', 
      icon: FileText,
      children: [
        {
          id: 'market-info',
          label: '마켓정보',
          icon: BarChart3,
          children: [
            { id: 'today-issue', label: '오늘의이슈', icon: Lightbulb },
            { id: 'price-analysis', label: '시세분석', icon: TrendingUp },
            { id: 'supply-analysis', label: '수급분석', icon: TrendingDown },
            { id: 'theme-sector', label: '테마/업종', icon: Layers },
            { id: 'report-analysis', label: '리포트분석', icon: FileBarChart },
            { id: 'disclosure-analysis', label: '공시분석', icon: ClipboardList },
          ]
        },
        {
          id: 'ai-recommend',
          label: 'AI추천종목',
          icon: Star,
          children: [
            { id: 'today-pick', label: '오늘의종목Pick', icon: Star },
            { id: 'daily-stocks', label: '오늘의 종목 일자별 보기', icon: CalendarDays },
            { id: 'recommend-stocks', label: '추천종목', icon: Lightbulb },
            { id: 'recommend-return', label: '추천종목수익률', icon: PieChart },
          ]
        }
      ]
    },
    { id: 'trading-signals', label: 'AI매매시그널', icon: Zap },
    { id: 'chatbot', label: 'AI 챗봇', icon: MessageSquare },
    { id: 'settings', label: '설정', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-[#0f172a] text-slate-100 transition-all duration-300 flex flex-col`}
      >
        <div className="p-6 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1665656653092-684fdd316aca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdG9jayUyMG1hcmtldCUyMGNoYXJ0JTIwZmluYW5jZXxlbnwxfHx8fDE3Njg4ODE3MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="RASSI Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">RASSI FApro</h1>
                <p className="text-xs text-slate-400 mt-1">AI고객관리 시스템</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-slate-400 hover:text-white hover:bg-slate-700"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.children) {
                      toggleMenu(item.id);
                    } else {
                      onTabChange(item.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors text-sm ${
                    isActive
                      ? 'bg-[#1e40af] text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="flex-1 text-left">{item.label}</span>}
                  {sidebarOpen && item.children && (
                    expandedMenus.includes(item.id) ? 
                      <ChevronDown className="w-4 h-4 flex-shrink-0" /> : 
                      <ChevronRight className="w-4 h-4 flex-shrink-0" />
                  )}
                </button>
                {item.children && sidebarOpen && (
                  <div className={`ml-4 ${expandedMenus.includes(item.id) ? 'block' : 'hidden'}`}>
                    {item.children.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = activeTab === subItem.id;
                      return (
                        <div key={subItem.id}>
                          <button
                            onClick={() => onTabChange(subItem.id)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg mb-1 transition-colors text-sm ${
                              isSubActive
                                ? 'bg-[#1e40af] text-white'
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`}
                          >
                            <SubIcon className="w-4 h-4 flex-shrink-0" />
                            {sidebarOpen && <span className="text-xs">{subItem.label}</span>}
                          </button>
                          {subItem.children && (
                            <div className={`ml-4 ${expandedMenus.includes(subItem.id) ? 'block' : 'hidden'}`}>
                              {subItem.children.map((subSubItem) => {
                                const SubSubIcon = subSubItem.icon;
                                const isSubSubActive = activeTab === subSubItem.id;
                                return (
                                  <button
                                    key={subSubItem.id}
                                    onClick={() => onTabChange(subSubItem.id)}
                                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg mb-1 transition-colors text-xs ${
                                      isSubSubActive
                                        ? 'bg-[#1e40af] text-white'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                    }`}
                                  >
                                    <SubSubIcon className="w-3.5 h-3.5 flex-shrink-0" />
                                    {sidebarOpen && <span>{subSubItem.label}</span>}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          {isLoggedIn ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold">FA</span>
                </div>
                {sidebarOpen && (
                  <div className="overflow-hidden flex-1">
                    <p className="text-sm font-medium text-white">김승원 FA</p>
                    <p className="text-xs text-slate-400">프리미어 등급</p>
                  </div>
                )}
              </div>
              {sidebarOpen && (
                <Button
                  onClick={handleLogout}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>로그아웃</span>
                </Button>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {sidebarOpen ? (
                <Button
                  onClick={handleLogin}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>로그인</span>
                </Button>
              ) : (
                <Button
                  onClick={handleLogin}
                  variant="ghost"
                  size="icon"
                  className="w-full text-slate-400 hover:text-white hover:bg-slate-700"
                >
                  <LogIn className="w-5 h-5" />
                </Button>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-8 py-4">
          <div className="flex flex-col gap-3">
            {/* Welcome Message */}
            <div className="flex items-center justify-between">
              <div className="text-slate-900">
                <p className="text-lg font-semibold">안녕하세요! 김승원FA님, 오늘도 좋은 하루 보내세요!</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">2026년 1월 20일 화요일</p>
              </div>
            </div>
            
            {/* Search and Indices */}
            <div className="flex flex-col gap-3">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  placeholder="종목명 또는 종목코드를 입력하세요."
                  className="pl-10 bg-slate-50 border-slate-200"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <IndexCard name="코스피" value="2,567.89" change={1.2} data={[2520, 2535, 2545, 2530, 2550, 2560, 2567]} size="small" />
                <IndexCard name="코스닥" value="756.32" change={-0.8} data={[765, 760, 758, 762, 755, 754, 756]} size="small" />
                <IndexCard name="S&P500" value="4,783.45" change={0.5} data={[4750, 4760, 4770, 4765, 4780, 4785, 4783]} size="small" />
                <IndexCard name="NASDAQ" value="15,310.97" change={0.9} data={[15200, 15250, 15280, 15270, 15300, 15315, 15310]} size="small" />
                <IndexCard name="USD/KRW" value="1,342.50" change={0.3} data={[1335, 1338, 1340, 1339, 1341, 1343, 1342]} size="small" />
                <IndexCard name="JPY/KRW" value="896.35" change={-0.2} data={[900, 898, 897, 899, 895, 896, 896]} size="small" />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-8 bg-slate-50">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-slate-200 px-8 py-4">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-6">
              <p>© 2026 RASSI FApro. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-blue-600 transition-colors">이용약관</a>
                <a href="#" className="hover:text-blue-600 transition-colors">개인정보처리방침</a>
                <a href="#" className="hover:text-blue-600 transition-colors">고객센터</a>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <span>고객문의: 1588-1234</span>
              <span>|</span>
              <span>support@rassi.co.kr</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}