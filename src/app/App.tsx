import { useState } from 'react';
import { DashboardLayout } from '@/app/components/dashboard-layout';
import { CustomizableDashboard } from '@/app/components/customizable-dashboard';
import { ClientManagement } from '@/app/components/client-management';
import { MarketIndices } from '@/app/components/market-indices';
import { AIChatbot } from '@/app/components/ai-chatbot';
import { TradingSignals } from '@/app/components/trading-signals';
import { TodayIssue } from '@/app/components/investment/today-issue';
import { PriceAnalysis } from '@/app/components/investment/price-analysis';
import { SupplyAnalysis } from '@/app/components/investment/supply-analysis';
import { ThemeSector } from '@/app/components/investment/theme-sector';
import { ReportAnalysis } from '@/app/components/investment/report-analysis';
import { DisclosureAnalysis } from '@/app/components/investment/disclosure-analysis';
import { TodayPick } from '@/app/components/investment/today-pick';
import { DailyStocks } from '@/app/components/investment/daily-stocks';
import { RecommendStocks } from '@/app/components/investment/recommend-stocks';
import { RecommendReturn } from '@/app/components/investment/recommend-return';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Settings } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <CustomizableDashboard />;
      case 'clients':
        return <ClientManagement />;
      case 'market':
        return <MarketIndices />;
      case 'trading-signals':
        return <TradingSignals />;
      case 'chatbot':
        return <AIChatbot />;
      
      // Investment Info - Market Info
      case 'today-issue':
        return <TodayIssue />;
      case 'price-analysis':
        return <PriceAnalysis />;
      case 'supply-analysis':
        return <SupplyAnalysis />;
      case 'theme-sector':
        return <ThemeSector />;
      case 'report-analysis':
        return <ReportAnalysis />;
      case 'disclosure-analysis':
        return <DisclosureAnalysis />;
      
      // Investment Info - AI Recommend
      case 'today-pick':
        return <TodayPick />;
      case 'daily-stocks':
        return <DailyStocks />;
      case 'recommend-stocks':
        return <RecommendStocks />;
      case 'recommend-return':
        return <RecommendReturn />;
      
      case 'settings':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">설정</h2>
              <p className="text-slate-600 mt-1">시스템 설정 및 개인화 옵션</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>시스템 설정</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <Settings className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600">설정 페이지는 준비 중입니다</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return <CustomizableDashboard />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
}