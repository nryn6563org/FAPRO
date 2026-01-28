import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Send, Bot, User, TrendingUp, BookOpen, Calculator, HelpCircle, DollarSign, BarChart3, Newspaper, Target, Search, MessageSquare } from "lucide-react";
import { cn } from "@/app/components/ui/utils";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  { icon: TrendingUp, question: "KOSPI 지수가 최근 상승한 이유는?" },
  { icon: Calculator, question: "복리 수익률 계산 방법을 알려주세요" },
  { icon: BookOpen, question: "ETF와 펀드의 차이점은?" },
  { icon: HelpCircle, question: "금리 인상이 주식시장에 미치는 영향" }
];

const frequentQuestions = [
  { icon: DollarSign, question: "배당주 투자 전략은?" },
  { icon: BarChart3, question: "PER과 PBR의 의미는?" },
  { icon: TrendingUp, question: "기술적 분석 기초 알려주세요" },
  { icon: Target, question: "분산투자의 중요성은?" },
  { icon: Newspaper, question: "공매도란 무엇인가요?" },
  { icon: BookOpen, question: "가치투자와 성장투자의 차이" }
];

const allQuestions = [...suggestedQuestions, ...frequentQuestions, { icon: TrendingUp, question: "외환 시장 변동성의 영향" }, { icon: DollarSign, question: "리츠(REITs) 투자 장단점" }];

const mockResponses: Record<string, string> = {
  KOSPI: "KOSPI 지수가 최근 상승한 주요 원인은 다음과 같습니다:\n\n1. 외국인 투자자들의 순매수 증가\n2. 미국 연준의 금리 동결 시사\n3. 반도체 업종의 실적 개선 기대감\n4. 중국 경기 회복 기대\n\n특히 삼성전자와 SK하이닉스 등 대형 기술주들의 강세가 지수 상승을 주도하고 있습니다.",
  복리: "복리 수익률 계산 방법을 설명드리겠습니다:\n\n복리 수익률 공식:\n최종금액 = 원금 × (1 + 수익률)^기간\n\n예시:\n원금: 1,000만원\n연 수익률: 5%\n투자기간: 10년\n\n최종금액 = 1,000만원 × (1.05)^10\n         = 1,000만원 × 1.629\n         = 1,629만원\n\n복리 효과로 인해 단순 이자(500만원)보다 더 많은 수익(629만원)을 얻을 수 있습니다.",
  ETF: "ETF와 펀드의 주요 차이점:\n\n📊 ETF (상장지수펀드)\n- 주식처럼 실시간 거래 가능\n- 낮은 운용 수수료 (0.1~0.5%)\n- 투명한 포트폴리오 구성\n\n💼 펀드 (뮤추얼 펀드)\n- 하루 1회 환매/매입\n- 상대적으로 높은 수수료 (1~3%)\n- 전문가의 적극적 운용\n\n투자 목적과 거래 방식에 따라 선택하시면 됩니다.",
  금리: "금리 인상이 주식시장에 미치는 영향:\n\n🔺 부정적 영향\n1. 기업 차입 비용 증가\n2. 채권 수익률 상승 → 주식 투자 매력 감소\n\n💡 투자 전략\n금리 인상기에는 안정적 배당주나 실적이 우수한 가치주에 주목하는 것이 좋습니다.",
  default: "관련 정보를 분석하여 답변해 드립니다. 궁금하신 내용을 질문해 주세요."
};

function getResponse(question: string): string {
  const normalizedQuestion = question.toLowerCase();
  if (normalizedQuestion.includes("kospi") || normalizedQuestion.includes("코스피")) return mockResponses["KOSPI"];
  if (normalizedQuestion.includes("복리")) return mockResponses["복리"];
  if (normalizedQuestion.includes("etf")) return mockResponses["ETF"];
  if (normalizedQuestion.includes("금리")) return mockResponses["금리"];
  return mockResponses['default'];
}

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "안녕하세요! FApro AI어시스턴트입니다. 오늘의 시장 정보나 궁금한 금융 지식이 있다면 무엇이든 물어보세요.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<"suggested" | "frequent" | "all">("suggested");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string = input) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(
      () => {
        const response = getResponse(messageText);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
      },
      800 + Math.random() * 500
    );
  };

  const getCurrentQuestions = () => {
    switch (activeTab) {
      case "suggested":
        return suggestedQuestions;
      case "frequent":
        return frequentQuestions;
      case "all":
        return allQuestions;
      default:
        return suggestedQuestions;
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">AI 투자 어시스턴트</h2>
          <p className="text-slate-500 mt-1">실시간 데이터 기반의 투자 분석과 가이드를 제공합니다.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 px-3 py-1">
            Realtime Analysis Active
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 overflow-hidden">
        {/* Chat Interface */}
        <Card className="lg:col-span-3 flex flex-col overflow-hidden border-slate-200 shadow-sm">
          <CardHeader className="border-b bg-slate-50/50 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-base text-slate-800">RASSI FApro AI</CardTitle>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-slate-500 font-medium">온라인</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-400">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 bg-white relative">
            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm", message.role === "user" ? "bg-slate-800" : "bg-blue-100 text-blue-600")}>{message.role === "user" ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5" />}</div>
                    <div className={`flex flex-col gap-1.5 max-w-[80%] ${message.role === "user" ? "items-end" : ""}`}>
                      <div className={cn("rounded-2xl p-4 text-sm leading-relaxed shadow-sm", message.role === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200")}>
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium px-1">
                        {message.timestamp.toLocaleTimeString("ko-KR", {
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div className="bg-slate-100 rounded-2xl rounded-tl-none p-4 border border-slate-200">
                      <div className="flex gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-4 border-t bg-slate-50/30">
              <div className="relative group">
                <Input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSend()} placeholder="무엇이든 물어보세요..." className="flex-1 bg-white border-slate-200 h-14 pl-5 pr-16 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-all text-base" disabled={isTyping} />
                <Button onClick={() => handleSend()} disabled={!input.trim() || isTyping} className="absolute right-2 top-2 h-10 w-10 p-0 rounded-lg bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-[11px] text-slate-400 text-center mt-3 font-medium">AI는 오류를 범할 수 있으므로 중요 투자 결정 전 반드시 전문가와 상담하세요.</p>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Question List */}
        <div className="flex flex-col gap-4 overflow-hidden">
          <Card className="flex-1 flex flex-col overflow-hidden border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b py-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <CardTitle className="text-base text-slate-800">질문 가이드</CardTitle>
              </div>
              <div className="flex bg-slate-200/50 p-1 rounded-lg mt-4">
                {(["suggested", "frequent", "all"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={cn("flex-1 py-2 text-xs font-semibold rounded-md transition-all", activeTab === tab ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700")}>
                    {tab === "suggested" ? "추천" : tab === "frequent" ? "인기" : "전체"}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-2">
                  {getCurrentQuestions().map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button key={idx} onClick={() => handleSend(item.question)} className="w-full p-3.5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-blue-50 hover:border-blue-200 transition-all text-left flex items-start gap-3 group">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 group-hover:border-blue-200 group-hover:bg-blue-100/50 transition-colors">
                          <Icon className="w-4 h-4 text-slate-500 group-hover:text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-700 leading-snug group-hover:text-blue-700">{item.question}</span>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-none p-5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/20 transition-colors" />
            <h4 className="text-white font-bold text-sm relative z-10">프리미엄 분석 리포트</h4>
            <p className="text-slate-400 text-xs mt-1 relative z-10">AI가 매일 발행하는 종목 리포트</p>
            <Button size="sm" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 border-none relative z-10 font-semibold h-9 rounded-lg">
              구독하기
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, variant, className }: any) {
  return <div className={cn("text-[11px] font-bold rounded-full px-2.5 py-0.5 border uppercase tracking-wider", variant === "outline" ? "border-slate-200 text-slate-600" : "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-100", className)}>{children}</div>;
}