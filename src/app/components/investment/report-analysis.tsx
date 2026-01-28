import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { FileBarChart, TrendingUp, TrendingDown, Building2, X, Circle, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from 'react';
import { cn } from "@/app/components/ui/utils";

type TabType = '신규리포트' | '목표가상향' | '목표가하향' | '기관관심리포트' | '외국인관심리포트' | '연기금관심리포트' | '증권사관심종목' | '목표가높음';

interface ReportData {
  date: string;
  stockName: string;
  currentPrice: number;
  changeRate: number;
  targetPrice: number;
  title: string;
  firm: string;
  rating: string;
  upside: number;
  content?: string;
  institutionalAmount?: string;
  foreignAmount?: string;
  pensionAmount?: string;
  reportCount?: number;
  highestTargetPrice?: number;
  lowestTargetPrice?: number;
  targetVsPrice?: string;
}

const mockReports: Record<TabType, ReportData[]> = {
  신규리포트: [
    {
      date: "01/22",
      stockName: "두산에스나",
      currentPrice: 52600,
      changeRate: 1.94,
      targetPrice: 69000,
      title: "비메모리 턴어라운드와 직관적인 동행",
      firm: "교보증권",
      rating: "BUY(신규)",
      upside: 31.5,
      content: "국내 대표 시스템반도체 디자인하우스. DSP 전환의 성과가 보여줄 원년. 동사는 약 20년간 DSP를 사용한 통신 칩을 점유해왔다."
    },
    {
      date: "01/22",
      stockName: "에이디테크놀로지",
      currentPrice: 34750,
      changeRate: 1.46,
      targetPrice: 45000,
      title: "DSP 전환의 결실을 맺을 엔넬",
      firm: "교보증권",
      rating: "BUY(신규)",
      upside: 29.5,
      content: "국내 대표 시스템반도체 디자인하우스로서 비메모리 반도체 턴어라운드의 수혜가 기대됩니다."
    },
    { date: "01/22", stockName: "네패스", currentPrice: 15380, changeRate: -1.41, targetPrice: 20000, title: "지정학적 불확실성이 가져온 혼재", firm: "교보증권", rating: "HOLD", upside: 30.1 },
    { date: "01/21", stockName: "아모센스", currentPrice: 10090, changeRate: 8.15, targetPrice: 16000, title: "블랭에서기 수혜 본격화, 동반된 리레이팅", firm: "DS투자증권", rating: "BUY", upside: 58.5 },
    { date: "01/21", stockName: "유비쿼스", currentPrice: 11930, changeRate: 29.96, targetPrice: 22000, title: "아직 달글달지 않은 피지컬 AI 수혜주", firm: "하나증권", rating: "BUY", upside: 84.4 },
    { date: "01/20", stockName: "에스티", currentPrice: 17530, changeRate: 2.57, targetPrice: 28000, title: "HBM과 HPA가 이끄어낼 가파른 실적 기울기", firm: "리딩투자증권", rating: "BUY", upside: 60.3 },
    { date: "01/20", stockName: "한솔케미칼", currentPrice: 261000, changeRate: 6.31, targetPrice: 325000, title: "반도체 업사이클과 2차전지 소재의 부활", firm: "NH투자증권", rating: "BUY", upside: 24.5 },
    { date: "01/20", stockName: "삼성전자", currentPrice: 74500, changeRate: 2.05, targetPrice: 85000, title: "AI 반도체 수요 증가로 목표가 상향", firm: "KB증권", rating: "BUY", upside: 14.1 }
  ],
  목표가상향: [
    { date: "01/22", stockName: "삼성전자", currentPrice: 74500, changeRate: 2.05, targetPrice: 85000, title: "AI 반도체 수요 증가로 목표가 상향", firm: "KB증권", rating: "BUY", upside: 14.1 },
    { date: "01/22", stockName: "SK하이닉스", currentPrice: 142000, changeRate: 3.27, targetPrice: 165000, title: "HBM3E 수주 확대, 목표가 상향", firm: "신한투자증권", rating: "BUY", upside: 16.2 }
  ],
  목표가하향: [],
  기관관심리포트: [],
  외국인관심리포트: [],
  연기금관심리포트: [],
  증권사관심종목: [],
  목표가높음: []
};

const getRatingStyle = (rating: string) => {
  if (rating.includes("BUY")) return "bg-blue-50 text-blue-600 border-blue-100";
  if (rating.includes("HOLD")) return "bg-slate-50 text-slate-600 border-slate-200";
  if (rating.includes("SELL")) return "bg-red-50 text-red-600 border-red-100";
  return "bg-slate-50 text-slate-600 border-slate-200";
};

const getStockInitialColor = (name: string) => {
  const colors = ["bg-blue-500", "bg-indigo-500", "bg-purple-500", "bg-pink-500", "bg-red-500", "bg-orange-500"];
  return colors[name.charCodeAt(0) % colors.length];
};

export function ReportAnalysis() {
  const [activeTab, setActiveTab] = useState<TabType>('신규리포트');
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);

  const data = mockReports[activeTab] || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">리포트 분석</h2>
          <p className="text-slate-500 mt-1">증권사 애널리스트 리포트 및 목표가 변동 현황입니다.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
          <Calendar className="w-3.5 h-3.5" />
          마지막 업데이트: 2024.01.22 09:25
        </div>
      </div>

      <Card className="border-none shadow-sm bg-slate-50 overflow-hidden">
        <CardContent className="p-1">
          <div className="flex flex-wrap gap-1">
            {(Object.keys(mockReports) as TabType[]).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={cn("px-4 py-2.5 text-xs font-bold rounded-lg transition-all", activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:bg-white/50 hover:text-slate-700")}>
                {tab}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center w-20">날짜</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">종목명</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">등락률</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">목표가</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">투자의견</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">리포트 제목</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">증권사</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.length > 0 ? (
                  data.map((report, idx) => (
                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="py-4 px-6 text-sm text-slate-500 text-center font-medium">{report.date}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-bold shadow-sm", getStockInitialColor(report.stockName))}>{report.stockName.substring(0, 1)}</div>
                          <span className="text-sm font-bold text-slate-800 group-hover:text-blue-600 cursor-pointer">{report.stockName}</span>
                        </div>
                      </td>
                      <td className={cn("py-4 px-6 text-sm text-right font-bold", report.changeRate > 0 ? "text-red-500" : report.changeRate < 0 ? "text-blue-500" : "text-slate-500")}>
                        {report.changeRate > 0 ? "+" : ""}
                        {report.changeRate}%
                      </td>
                      <td className="py-4 px-6 text-sm text-right font-bold text-slate-900">{report.targetPrice.toLocaleString()}</td>
                      <td className="py-4 px-6 text-center">
                        <Badge variant="outline" className={cn("px-2.5 py-1 text-[10px] font-bold rounded-md border", getRatingStyle(report.rating))}>
                          {report.rating}
                        </Badge>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-700 font-medium max-w-md truncate cursor-pointer hover:text-blue-600 hover:underline" onClick={() => setSelectedReport(report)}>
                        {report.title}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-500 text-center font-semibold">{report.firm}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-20 text-center text-slate-400 font-medium">
                      데이터가 존재하지 않습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between p-6 border-t border-slate-100 bg-slate-50/30">
            <div className="text-xs font-semibold text-slate-500">{activeTab === "신규리포트" ? "※ 신규리포트는 증권사에서 신규 매수 의견을 제시한 리포트입니다." : "※ 가이드 정보를 확인해 주세요."}</div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg border border-slate-200">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex gap-1 px-2">
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700">
                  1
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg text-slate-500 font-bold hover:bg-slate-100">
                  2
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-lg text-slate-500 font-bold hover:bg-slate-100">
                  3
                </Button>
              </div>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-lg border border-slate-200">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 리포트 상세 팝업 */}
      {selectedReport && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <Card className="max-w-xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border-none animate-in zoom-in-95 duration-200">
            <CardHeader className="border-b bg-slate-50/50 relative py-6 px-8">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600 hover:bg-blue-600">{selectedReport.stockName}</Badge>
                  <span className="text-sm font-semibold text-slate-400">
                    {selectedReport.firm} • {selectedReport.date}
                  </span>
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 leading-tight pt-2">{selectedReport.title}</CardTitle>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedReport(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-8 bg-white">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">목표주가</p>
                  <p className="text-xl font-black text-slate-900">{selectedReport.targetPrice.toLocaleString()}원</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">투자의견</p>
                  <p className="text-xl font-black text-blue-600">{selectedReport.rating}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
                  분석 포인트
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">{selectedReport.content || "상세 데이터 요약 정보를 불러오는 중입니다..."}</p>
              </div>
            </CardContent>
            <div className="p-6 border-t bg-slate-50 flex justify-end gap-3 px-8">
              <Button variant="outline" onClick={() => setSelectedReport(null)} className="font-bold h-11 px-6 rounded-xl border-slate-200">
                취소
              </Button>
              <Button className="font-bold h-11 px-8 rounded-xl bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-100">전체 리포트 보기</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}