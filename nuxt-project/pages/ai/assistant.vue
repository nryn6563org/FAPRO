<template>
  <div class="p-ai">
    <div class="p-ai__header">
      <h2 class="p-ai__title">AI 투자 어시스턴트</h2>
      <p class="p-ai__desc">투자 정보와 금융 지식을 대화로 편하게 물어보세요.</p>
    </div>

     <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Chat Interface -->
      <div class="lg:col-span-2 c-chat-interface">
        <div class="c-chat-interface__header">
            <div class="c-chat-interface__bot-icon-wrapper">
              <Bot class="c-chat-interface__bot-icon" />
            </div>
            <div>
              <h3 class="c-chat-interface__title">AI 어시스턴트</h3>
              <p class="c-chat-interface__subtitle">시장이슈와 종목의 다양한 정보를 쉽게 찾을 수 있습니다.</p>
            </div>
          </div>

          <div class="c-chat-interface__messages-wrapper">
            <div class="c-chat-interface__messages" ref="scrollArea">
                <div
                  v-for="message in messages"
                  :key="message.id"
                  :class="['c-chat-message', message.role === 'user' ? 'c-chat-message--user' : '']"
                >
                  <div :class="['c-chat-message__avatar', 
                    message.role === 'user' ? 'c-chat-message__avatar--user' : 'c-chat-message__avatar--bot'
                  ]">
                    <User v-if="message.role === 'user'" class="c-chat-message__icon" />
                    <Bot v-else class="c-chat-message__icon" />
                  </div>
                  <div :class="['flex-1', message.role === 'user' ? 'flex justify-end' : '']">
                    <div :class="['c-chat-message__content', 
                      message.role === 'user' ? 'c-chat-message__content--user' : 'c-chat-message__content--bot'
                    ]">
                      <p class="whitespace-pre-wrap text-sm">{{ message.content }}</p>
                    </div>
                    <p :class="['c-chat-message__time', message.role === 'user' ? 'text-right text-slate-400' : 'text-slate-400']">
                        {{ new Date(message.timestamp).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) }}
                    </p>
                  </div>
                </div>

                <div v-if="isTyping" class="c-chat-message">
                  <div class="c-chat-message__avatar c-chat-message__avatar--bot">
                    <Bot class="c-chat-message__icon" />
                  </div>
                  <div class="c-chat-message__typing-dots">
                      <div class="c-chat-message__dot" style="animation-delay: 0ms"></div>
                      <div class="c-chat-message__dot" style="animation-delay: 150ms"></div>
                      <div class="c-chat-message__dot" style="animation-delay: 300ms"></div>
                  </div>
                </div>
            </div>

            <div class="c-chat-interface__input-area">
              <div class="c-chat-interface__input-wrapper">
                <Input
                  v-model="input"
                  @keypress.enter.native="handleSend"
                  placeholder="투자 관련 질문을 입력하세요..."
                  class="flex-1"
                  :disabled="isTyping"
                />
                <Button 
                  @click="handleSend" 
                  :disabled="!input.trim() || isTyping"
                  class="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send class="c-chat-interface__btn-icon" />
                  전송
                </Button>
              </div>
            </div>
          </div>
      </div>

      <!-- Suggested Questions -->
      <div class="space-y-4">
        <div class="c-suggested-panel">
          <div class="c-suggested-panel__header">
            <h3 class="c-suggested-panel__title">질문 목록</h3>
            <div class="c-suggested-panel__tabs">
               <button v-for="tab in questionTabs" :key="tab.id"
                  @click="activeTab = tab.id"
                  :class="['c-suggested-panel__tab-btn', 
                    activeTab === tab.id ? 'c-suggested-panel__tab-btn--active' : ''
                  ]"
               >
                  {{ tab.label }}
               </button>
            </div>
          </div>
          <div class="c-suggested-panel__list">
              <button
                v-for="(item, idx) in currentQuestions"
                :key="idx"
                @click="handleSuggestedQuestion(item.question)"
                class="c-question-item"
              >
                <div class="flex items-start gap-3">
                  <component :is="item.icon" class="c-question-item__icon" />
                  <span class="text-sm font-medium text-slate-700 group-hover:text-blue-700">{{ item.question }}</span>
                </div>
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '@/components/common/Button.vue';
import Input from '@/components/common/Input.vue';
import { Send, Bot, User, TrendingUp, BookOpen, Calculator, HelpCircle, DollarSign, BarChart3, Newspaper, Target } from 'lucide-vue';

// Mock Responses
const mockResponses = {
  'KOSPI': 'KOSPI 지수가 최근 상승한 주요 원인은 다음과 같습니다:\n\n1. 외국인 투자자들의 순매수 증가\n2. 미국 연준의 금리 동결 시사\n3. 반도체 업종의 실적 개선 기대감\n4. 중국 경기 회복 기대\n\n특히 삼성전자와 SK하이닉스 등 대형 기술주들의 강세가 지수 상승을 주도하고 있습니다.',
  '복리': '복리 수익률 계산 방법을 설명드리겠습니다:\n\n복리 수익률 공식:\n최종금액 = 원금 × (1 + 수익률)^기간\n\n예시:\n원금: 1,000만원\n연 수익률: 5%\n투자기간: 10년\n\n최종금액 = 1,000만원 × (1.05)^10\n         = 1,000만원 × 1.629\n         = 1,629만원\n\n복리 효과로 인해 단순 이자(500만원)보다 더 많은 수익(629만원)을 얻을 수 있습니다.',
  'ETF': 'ETF와 펀드의 주요 차이점:\n\n📊 ETF (상장지수펀드)\n- 주식처럼 실시간 거래 가능\n- 낮은 운용 수수료 (0.1~0.5%)\n- 투명한 포트폴리오 구성\n- 소액 투자 가능\n\n💼 펀드 (뮤추얼 펀드)\n- 하루 1회 환매/매입\n- 상대적으로 높은 수수료 (1~3%)\n- 전문가의 적극적 운용\n- 다양한 투자 전략\n\n투자 목적과 거래 방식에 따라 선택하시면 됩니다.',
  '금리': '금리 인상이 주식시장에 미치는 영향:\n\n🔺 부정적 영향\n1. 기업 차입 비용 증가 → 수익성 악화\n2. 채권 수익률 상승 → 주식 투자 매력 감소\n3. 소비 위축 → 기업 실적 악화\n4. 밸류에이션 부담 증가\n\n📉 영향을 많이 받는 업종\n- 기술주 (높은 밸류에이션)\n- 건설/부동산 (차입 의존도)\n- 소비재 (소비 감소)\n\n💡 투자 전략\n금리 인상기에는 안정적 배당주나 실적이 우수한 가치주에 주목하는 것이 좋습니다.',
  'default': '죄송합니다. 해당 질문에 대한 답변을 준비 중입니다.\n\n투자 관련 질문이시라면 다음과 같은 주제로 질문해주세요:\n\n• 시장 지수 및 동향\n• 투자 용어 및 개념\n• 포트폴리오 구성 방법\n• 금융 상품 비교\n• 시장 이슈 분석\n\n더 구체적으로 질문해주시면 더 정확한 답변을 드릴 수 있습니다.'
};

export default {
  name: "AIAssistant",
  components: {
    Button, Input,
    Send, Bot, User, TrendingUp, BookOpen, Calculator, HelpCircle, DollarSign, BarChart3, Newspaper, Target
  },
  data() {
    return {
      messages: [
        {
          id: '1',
          role: 'assistant',
          content: '안녕하세요! FApro AI어시스턴트 입니다. :D 시장정보와 종목정보에 관한 내용을 편하게 물어보세요.',
          timestamp: new Date(),
        }
      ],
      input: '',
      isTyping: false,
      activeTab: 'suggested',
      questionTabs: [
          { id: 'suggested', label: '추천 질문' },
          { id: 'frequent', label: '자주 묻는 질문' },
          { id: 'all', label: '전체 질문' }
      ],
      // Question Data loaded in data to avoid reactivity issues with icons if not careful, 
      // but in Vue 2 we can just use strings for icon names or component references.
      // Using component references here.
      questions: {
          suggested: [
            { icon: 'TrendingUp', question: 'KOSPI 지수가 최근 상승한 이유는?' },
            { icon: 'Calculator', question: '복리 수익률 계산 방법을 알려주세요' },
            { icon: 'BookOpen', question: 'ETF와 펀드의 차이점은?' },
            { icon: 'HelpCircle', question: '금리 인상이 주식시장에 미치는 영향' },
          ],
          frequent: [
            { icon: 'DollarSign', question: '배당주 투자 전략은?' },
            { icon: 'BarChart3', question: 'PER과 PBR의 의미는?' },
            { icon: 'TrendingUp', question: '기술적 분석 기초 알려주세요' },
            { icon: 'Target', question: '분산투자의 중요성은?' },
            { icon: 'Newspaper', question: '공매도란 무엇인가요?' },
            { icon: 'BookOpen', question: '가치투자와 성장투자의 차이' },
            { icon: 'Calculator', question: 'ROE 지표 분석 방법' },
            { icon: 'HelpCircle', question: '옵션과 선물의 차이점' },
          ],
          all: [
            { icon: 'TrendingUp', question: 'KOSPI 지수가 최근 상승한 이유는?' },
            { icon: 'Calculator', question: '복리 수익률 계산 방법을 알려주세요' },
            { icon: 'BookOpen', question: 'ETF와 펀드의 차이점은?' },
            { icon: 'HelpCircle', question: '금리 인상이 주식시장에 미치는 영향' },
            { icon: 'DollarSign', question: '배당주 투자 전략은?' },
            { icon: 'BarChart3', question: 'PER과 PBR의 의미는?' },
            { icon: 'TrendingUp', question: '기술적 분석 기초 알려주세요' },
            { icon: 'Target', question: '분산투자의 중요성은?' },
            { icon: 'Newspaper', question: '공매도란 무엇인가요?' },
            { icon: 'BookOpen', question: '가치투자와 성장투자의 차이' },
            { icon: 'Calculator', question: 'ROE 지표 분석 방법' },
            { icon: 'HelpCircle', question: '옵션과 선물의 차이점' },
            { icon: 'TrendingUp', question: '외환 시장 변동성의 영향' },
            { icon: 'DollarSign', question: '리츠(REITs) 투자 장단점' },
            { icon: 'BarChart3', question: '손절매 타이밍 결정 방법' },
          ]
      }
    };
  },
  computed: {
    currentQuestions() {
        return this.questions[this.activeTab];
    }
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        const container = this.$refs.scrollArea;
        if (container) {
           container.scrollTop = container.scrollHeight;
        }
      });
    }
  },
  methods: {
    handleSuggestedQuestion(question) {
        this.input = question;
    },
    handleSend() {
        if (!this.input.trim()) return;

        const userMsg = {
            id: Date.now().toString(),
            role: 'user',
            content: this.input,
            timestamp: new Date()
        };
        this.messages.push(userMsg);
        const query = this.input.toLowerCase();
        this.input = '';
        this.isTyping = true;

        setTimeout(() => {
            let response = mockResponses['default'];
            if (query.includes('kospi') || query.includes('코스피') || query.includes('지수')) response = mockResponses['KOSPI'];
            else if (query.includes('복리') || query.includes('수익률')) response = mockResponses['복리'];
            else if (query.includes('etf') || query.includes('펀드')) response = mockResponses['ETF'];
            else if (query.includes('금리') || query.includes('주식')) response = mockResponses['금리'];

            this.messages.push({
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
                timestamp: new Date()
            });
            this.isTyping = false;
        }, 1000 + Math.random() * 1000);
    }
  }
};
</script>
<style src="@/assets/css/pages/ai.css"></style>

