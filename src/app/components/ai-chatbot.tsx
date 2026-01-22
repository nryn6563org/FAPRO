import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Send, Bot, User, TrendingUp, BookOpen, Calculator, HelpCircle, DollarSign, BarChart3, Newspaper, Target } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedQuestions = [
  {
    icon: TrendingUp,
    question: 'KOSPI 지수가 최근 상승한 이유는?',
  },
  {
    icon: Calculator,
    question: '복리 수익률 계산 방법을 알려주세요',
  },
  {
    icon: BookOpen,
    question: 'ETF와 펀드의 차이점은?',
  },
  {
    icon: HelpCircle,
    question: '금리 인상이 주식시장에 미치는 영향',
  },
];

const frequentQuestions = [
  {
    icon: DollarSign,
    question: '배당주 투자 전략은?',
  },
  {
    icon: BarChart3,
    question: 'PER과 PBR의 의미는?',
  },
  {
    icon: TrendingUp,
    question: '기술적 분석 기초 알려주세요',
  },
  {
    icon: Target,
    question: '분산투자의 중요성은?',
  },
  {
    icon: Newspaper,
    question: '공매도란 무엇인가요?',
  },
  {
    icon: BookOpen,
    question: '가치투자와 성장투자의 차이',
  },
  {
    icon: Calculator,
    question: 'ROE 지표 분석 방법',
  },
  {
    icon: HelpCircle,
    question: '옵션과 선물의 차이점',
  },
];

const allQuestions = [
  {
    icon: TrendingUp,
    question: 'KOSPI 지수가 최근 상승한 이유는?',
  },
  {
    icon: Calculator,
    question: '복리 수익률 계산 방법을 알려주세요',
  },
  {
    icon: BookOpen,
    question: 'ETF와 펀드의 차이점은?',
  },
  {
    icon: HelpCircle,
    question: '금리 인상이 주식시장에 미치는 영향',
  },
  {
    icon: DollarSign,
    question: '배당주 투자 전략은?',
  },
  {
    icon: BarChart3,
    question: 'PER과 PBR의 의미는?',
  },
  {
    icon: TrendingUp,
    question: '기술적 분석 기초 알려주세요',
  },
  {
    icon: Target,
    question: '분산투자의 중요성은?',
  },
  {
    icon: Newspaper,
    question: '공매도란 무엇인가요?',
  },
  {
    icon: BookOpen,
    question: '가치투자와 성장투자의 차이',
  },
  {
    icon: Calculator,
    question: 'ROE 지표 분석 방법',
  },
  {
    icon: HelpCircle,
    question: '옵션과 선물의 차이점',
  },
  {
    icon: TrendingUp,
    question: '외환 시장 변동성의 영향',
  },
  {
    icon: DollarSign,
    question: '리츠(REITs) 투자 장단점',
  },
  {
    icon: BarChart3,
    question: '손절매 타이밍 결정 방법',
  },
];

const mockResponses: Record<string, string> = {
  'KOSPI': 'KOSPI 지수가 최근 상승한 주요 원인은 다음과 같습니다:\n\n1. 외국인 투자자들의 순매수 증가\n2. 미국 연준의 금리 동결 시사\n3. 반도체 업종의 실적 개선 기대감\n4. 중국 경기 회복 기대\n\n특히 삼성전자와 SK하이닉스 등 대형 기술주들의 강세가 지수 상승을 주도하고 있습니다.',
  '복리': '복리 수익률 계산 방법을 설명드리겠습니다:\n\n복리 수익률 공식:\n최종금액 = 원금 × (1 + 수익률)^기간\n\n예시:\n원금: 1,000만원\n연 수익률: 5%\n투자기간: 10년\n\n최종금액 = 1,000만원 × (1.05)^10\n         = 1,000만원 × 1.629\n         = 1,629만원\n\n복리 효과로 인해 단순 이자(500만원)보다 더 많은 수익(629만원)을 얻을 수 있습니다.',
  'ETF': 'ETF와 펀드의 주요 차이점:\n\n📊 ETF (상장지수펀드)\n- 주식처럼 실시간 거래 가능\n- 낮은 운용 수수료 (0.1~0.5%)\n- 투명한 포트폴리오 구성\n- 소액 투자 가능\n\n💼 펀드 (뮤추얼 펀드)\n- 하루 1회 환매/매입\n- 상대적으로 높은 수수료 (1~3%)\n- 전문가의 적극적 운용\n- 다양한 투자 전략\n\n투자 목적과 거래 방식에 따라 선택하시면 됩니다.',
  '금리': '금리 인상이 주식시장에 미치는 영향:\n\n🔺 부정적 영향\n1. 기업 차입 비용 증가 → 수익성 악화\n2. 채권 수익률 상승 → 주식 투자 매력 감소\n3. 소비 위축 → 기업 실적 악화\n4. 밸류에이션 부담 증가\n\n📉 영향을 많이 받는 업종\n- 기술주 (높은 밸류에이션)\n- 건설/부동산 (차입 의존도)\n- 소비재 (소비 감소)\n\n💡 투자 전략\n금리 인상기에는 안정적 배당주나 실적이 우수한 가치주에 주목하는 것이 좋습니다.',
  'default': '죄송합니다. 해당 질문에 대한 답변을 준비 중입니다.\n\n투자 관련 질문이시라면 다음과 같은 주제로 질문해주세요:\n\n• 시장 지수 및 동향\n• 투자 용어 및 개념\n• 포트폴리오 구성 방법\n• 금융 상품 비교\n• 시장 이슈 분석\n\n더 구체적으로 질문해주시면 더 정확한 답변을 드릴 수 있습니다.'
};

function getResponse(question: string): string {
  const normalizedQuestion = question.toLowerCase();
  
  if (normalizedQuestion.includes('kospi') || normalizedQuestion.includes('코스피') || normalizedQuestion.includes('지수')) {
    return mockResponses['KOSPI'];
  }
  if (normalizedQuestion.includes('복리') || normalizedQuestion.includes('수익률')) {
    return mockResponses['복리'];
  }
  if (normalizedQuestion.includes('etf') || normalizedQuestion.includes('펀드')) {
    return mockResponses['ETF'];
  }
  if (normalizedQuestion.includes('금리') || normalizedQuestion.includes('주식')) {
    return mockResponses['금리'];
  }
  
  return mockResponses['default'];
}

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '안녕하세요! FApro AI어시스턴트 입니다. :D 시장정보와 종목정보에 관한 내용을 편하게 물어보세요.',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'suggested' | 'frequent' | 'all'>('suggested');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = getResponse(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const getCurrentQuestions = () => {
    switch (activeTab) {
      case 'suggested':
        return suggestedQuestions;
      case 'frequent':
        return frequentQuestions;
      case 'all':
        return allQuestions;
      default:
        return suggestedQuestions;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">AI 투자 어시스턴트</h2>
        <p className="text-slate-600 mt-1">투자 정보와 금융 지식을 대화로 편하게 물어보세요.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <Card className="lg:col-span-2 flex flex-col h-[700px]">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle>AI 어시스턴트</CardTitle>
                <p className="text-sm text-slate-500">시장이슈와 종목의 다양한 정보를 쉽게 찾을 수 있습니다.</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-blue-600' 
                        : 'bg-gradient-to-br from-blue-500 to-purple-600'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                      <div className={`inline-block max-w-[80%] rounded-lg p-4 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-900'
                      }`}>
                        <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                        <p className={`text-xs mt-2 ${
                          message.role === 'user' ? 'text-blue-100' : 'text-slate-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString('ko-KR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-slate-100 rounded-lg p-4">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="투자 관련 질문을 입력하세요..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button 
                  onClick={handleSend} 
                  disabled={!input.trim() || isTyping}
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                  전송
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Questions */}
        <div className="space-y-4">
          <Card className="h-[700px] flex flex-col">
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-lg">질문 목록</CardTitle>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setActiveTab('suggested')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'suggested'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  추천 질문
                </button>
                <button
                  onClick={() => setActiveTab('frequent')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'frequent'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  자주 물어본 질문
                </button>
                <button
                  onClick={() => setActiveTab('all')}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeTab === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  전체 질문
                </button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full p-4">
                <div className="space-y-2">
                  {getCurrentQuestions().map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSuggestedQuestion(item.question)}
                        className="w-full p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
                      >
                        <div className="flex items-start gap-3">
                          <Icon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{item.question}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}