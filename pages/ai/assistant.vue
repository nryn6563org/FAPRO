<template>
  <div class="p-assistant">
    <div class="c-page-header">
      <h2 class="c-page-header__title">AI 투자 어시스턴트</h2>
      <p class="c-page-header__desc">투자 정보와 금융 지식을 대화로 편하게 물어보세요.</p>
    </div>

    <div class="p-assistant__layout">
      <!-- 대화창 인터페이스 영역 -->
      <div class="p-assistant__chat-panel">
        <div class="p-assistant__chat-header">
            <div class="p-assistant__bot-info">
                <div class="p-assistant__bot-avatar">
                   <Bot class="w-6 h-6" />
                </div>
                <div>
                   <h3 class="p-assistant__bot-name">라스(RASSI)</h3>
                   <div class="p-assistant__bot-status">
                       <div class="p-assistant__status-dot"></div>
                       <span>AI 분석 중...</span>
                   </div>
                </div>
            </div>
            <Button variant="outline" size="sm" class="h-8">대화 초기화</Button>
        </div>

        <div class="p-assistant__messages" ref="scrollArea">
            <div
              v-for="message in messages"
              :key="message.id"
              :class="['p-assistant__message', message.role === 'user' ? 'p-assistant__message--user' : 'p-assistant__message--bot']"
            >
              <div :class="['p-assistant__msg-avatar', message.role === 'user' ? 'p-assistant__msg-avatar--user' : 'p-assistant__msg-avatar--bot']">
                <component :is="message.role === 'user' ? 'User' : 'Bot'" class="w-4 h-4" />
              </div>

              <div class="flex flex-col">
                <div :class="['p-assistant__msg-bubble', message.role === 'user' ? 'p-assistant__msg-bubble--user' : 'p-assistant__msg-bubble--bot']">
                  {{ message.content }}
                </div>
                <p class="p-assistant__msg-time">
                    {{ new Date(message.timestamp).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }) }}
                </p>
              </div>
            </div>

            <div v-if="isTyping" class="p-assistant__message p-assistant__message--bot">
              <div class="p-assistant__msg-avatar p-assistant__msg-avatar--bot">
                <Bot class="w-4 h-4" />
              </div>
              <div class="p-assistant__msg-bubble p-assistant__msg-bubble--bot flex items-center gap-1 h-8">
                  <div class="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                  <div class="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                  <div class="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
              </div>
            </div>
        </div>

        <div class="p-assistant__input-panel">
          <div class="p-assistant__input-container">
            <Input
              v-model="input"
              @keypress.enter.native="handleSend"
              placeholder="궁금하신 투자 정보를 물어보세요..."
              class="p-assistant__chat-input"
            />
            <Button
              @click="handleSend"
              class="bg-blue-600 hover:bg-blue-700 h-10 px-6 rounded-xl"
            >
              <Send class="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <!-- 우측 사이드바: 추천 질문 목록 -->
      <div class="p-assistant__sidebar">
        <div class="p-assistant__suggest-card">
           <div class="p-assistant__suggest-tabs">
               <button
                 v-for="tab in questionTabs"
                 :key="tab.id"
                 @click="activeTab = tab.id"
                 :class="['p-assistant__suggest-tab', { 'p-assistant__suggest-tab--active': activeTab === tab.id }]"
               >
                 {{ tab.label }}
               </button>
           </div>

           <div class="p-assistant__suggest-list">
               <button
                 v-for="(item, idx) in currentQuestions"
                 :key="idx"
                 @click="handleSuggestedQuestion(item.question)"
                 class="p-assistant__suggest-item"
               >
                 <component v-if="item.icon" :is="item.icon" class="w-3.5 h-3.5 text-blue-500/70" />
                 <span>{{ item.question }}</span>
               </button>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Send, Bot, User, TrendingUp, BookOpen, Calculator, HelpCircle, DollarSign, BarChart3, Newspaper, Target } from 'lucide-vue'
import Button from '@/components/atoms/Button.vue'
import Input from '@/components/atoms/Input.vue'

// 모의 답변 데이터 (실제 AI API 연동 전 테스트용)
const mockResponses = {
  KOSPI: 'KOSPI 지수가 최근 상승한 주요 원인은 다음과 같습니다:\n\n1. 외국인 투자자들의 순매수 증가\n2. 미국 연준의 금리 동결 시사\n3. 반도체 업종의 실적 개선 기대감\n4. 중국 경기 회복 기대\n\n특히 삼성전자와 SK하이닉스 등 대형 기술주들의 강세가 지수 상승을 주도하고 있습니다.',
  복리: '복리 수익률 계산 방법을 설명드리겠습니다:\n\n복리 수익률 공식:\n최종금액 = 원금 × (1 + 수익률)^기간\n\n예시:\n원금: 1,000만원\n연 수익률: 5%\n투자기간: 10년\n\n최종금액 = 1,000만원 × (1.05)^10\n         = 1,000만원 × 1.629\n         = 1,629만원\n\n복리 효과로 인해 단순 이자(500만원)보다 더 많은 수익(629만원)을 얻을 수 있습니다.',
  ETF: 'ETF와 펀드의 주요 차이점:\n\n📊 ETF (상장지수펀드)\n- 주식처럼 실시간 거래 가능\n- 낮은 운용 수수료 (0.1~0.5%)\n- 투명한 포트폴리오 구성\n- 소액 투자 가능\n\n💼 펀드 (뮤추얼 펀드)\n- 하루 1회 환매/매입\n- 상대적으로 높은 수수료 (1~3%)\n- 전문가의 적극적 운용\n- 다양한 투자 전략\n\n투자 목적과 거래 방식에 따라 선택하시면 됩니다.',
  금리: '금리 인상이 주식시장에 미치는 영향:\n\n🔺 부정적 영향\n1. 기업 차입 비용 증가 → 수익성 악화\n2. 채권 수익률 상승 → 주식 투자 매력 감소\n3. 소비 위축 → 기업 실적 악화\n4. 밸류에이션 부담 증가\n\n📉 영향을 많이 받는 업종\n- 기술주 (높은 밸류에이션)\n- 건설/부동산 (차입 의존도)\n- 소비재 (소비 감소)\n\n💡 투자 전략\n금리 인상기에는 안정적 배당주나 실적이 우수한 가치주에 주목하는 것이 좋습니다.',
  배당주: '배당주 투자 전략의 핵심은 "꾸준한 현금흐름"과 "복리 효과"입니다.\n\n✅ 주요 전략:\n1. 배당성향 확인: 이익의 몇 %를 배당하는지 체크\n2. 배당성장주 주목: 단순히 배당이 높은 것보다 매년 배당을 늘리는 기업이 유리\n3. 배당락 전 매수: 배당 기준일에 주주 명부에 올라가야 함\n4. 배당 재투자: 받은 배당금으로 다시 주식을 사서 수량을 늘리는 것이 핵심\n\n💡 리츠(REITs)나 인프라 펀드도 좋은 배당 대안이 될 수 있습니다.',
  PER: '주식 평가의 기본 지표인 PER과 PBR을 설명해 드릴게요.\n\n📈 PER (주가수익비율)\n현재 주가 ÷ 주당순이익(EPS)\n- 기업이 버는 돈에 비해 주가가 몇 배인지 나타냅니다.\n- 낮을수록 저평가로 보지만, 업종별 평균과 비교하는 것이 중요합니다.\n\n📉 PBR (주가순자산비율)\n현재 주가 ÷ 주당순자산(BPS)\n- 기업의 자산 가치에 비해 주가가 어느 정도인지 나타냅니다.\n- 1배 미만이면 청산 가치보다 주가가 낮음을 의미합니다.',
  기술적: '기술적 분석은 과거의 주가나 거래량 흐름을 보고 미래를 예측하는 방법입니다.\n\n📊 핵심 요소:\n1. 추세 분석: 상승, 하락, 횡보 추세 파악\n2. 지지선과 저항선: 주가가 잘 안 빠지는 선과 잘 안 뚫리는 선 확인\n3. 이동평균선: 5일, 20일, 60일 평균 가격의 흐름\n4. 보조지표: MACD, RSI 등을 활용한 매수/매도 신호 포착\n\n💡 "역사는 반복된다"는 가정을 바탕으로 차트의 패턴을 찾아내는 것이 기초입니다.',
  분산투자: '분산투자는 손실 위험을 최소화하고 안정적인 수익을 목표로 합니다.\n\n🥚 "계란을 한 바구니에 담지 마라"\n- 종목 분산: 여러 기업에 나누어 투자\n- 업종 분산: 기술주, 소비재, 금융주 등 섞기\n- 자산 분산: 주식, 채권, 금, 현금으로 배분\n\n💡 목적은 단순히 수익을 높이는 것이 아니라, 예상치 못한 폭락장에서 내 자산을 지키는 것입니다.',
  공매도: '공매도는 주가 하락이 예상될 때 주식을 빌려서 파는 투자 기법입니다.\n\n🔄 쉬운 절차:\n1. 주식을 빌려서 현재가에 매도 (주가 10만원)\n2. 주가가 하락할 때까지 대기 (주가 8만원)\n3. 8만원에 사서 빌린 주식을 갚음\n4. 차액 2만원 수익 발생!\n\n⚠️ 위험성: 주가가 예상과 달리 무한정 오르면 손실도 무한대가 될 수 있으니 주의해야 합니다.',
  가치성장: '가치투자와 성장투자는 추구하는 방향이 다릅니다.\n\n💎 가치투자 (Value Investing)\n- 현재 가치보다 "싼" 주식을 찾는 전략\n- 저PER, 저PBR 종목 선호\n- 인내심을 갖고 본래 가치를 찾아갈 때까지 기다림\n\n🚀 성장투자 (Growth Investing)\n- 미래 성장 가능성이 "큰" 주식을 찾는 전략\n- 현재 수익보다 미래 실적 성장률 중시\n- 높은 PER을 감수하고서라도 혁신 기업에 투자',
  ROE: 'ROE(자기자본이익률)는 기업이 주주 돈으로 얼마나 돈을 잘 벌었나를 보여줍니다.\n\n🎯 분석 방법:\n- 공식: (당기순이익 ÷ 자기자본) × 100\n- 의미: ROE가 10%라면 100원을 투자해 10원을 벌었다는 뜻입니다.\n- 체크포인트: 워런 버핏은 꾸준히 15% 이상 유지하는 기업을 선호합니다.\n\n⚠️ 주의: 빚을 너무 많이 내서 억지로 ROE를 높인 것은 아닌지 부채비율도 함께 봐야 합니다.',
  옵션선물: '파생상품인 선물과 옵션의 차이를 간단히 정리해 드릴게요.\n\n📦 선물 (Futures)\n- 미래에 특정 가격으로 거래하기로 한 "약속"\n- 무조건 약속을 지켜야(매매) 함\n\n🎟️ 옵션 (Options)\n- 미래에 특정 가격으로 사고팔 수 있는 "권리"\n- 유리하면 권리 행사, 불리하면 포기 가능\n- 권리를 사는 대가로 \'프리미엄\'(비용)을 지불함',
  외환: '외환 시장 변동성은 수출입 국가인 한국 경제에 큰 영향을 줍니다.\n\n💵 환율 상승(원화 약수) 시:\n- 수출 기업: 실적 개선 (해외에서 달러로 벌어온 돈이 많아짐)\n- 수입 기업: 원가 부담 증가 (기름값, 원자재 가격 상승)\n\n📉 증시 영향: 보통 환율이 급격히 오르면 외국인 투자자들이 환차손을 피하기 위해 한국 주식을 팔고 나가는 경향이 있습니다.',
  리츠: '리츠(REITs)는 소액으로 건물주가 될 수 있는 부동산 투자 신탁입니다.\n\n🏢 장점:\n- 고배당: 이익의 90% 이상을 의무적으로 배당\n- 유동성: 부동산을 직접 파는 대신 주식처럼 매도 가능\n\n📉 단점:\n- 금리 민감: 금리가 오르면 대출 이자 부담으로 주가가 하락할 수 있음\n- 경기 영향: 오피스나 상가 공실률에 따라 배당금이 줄어들 수 있음',
  손절매: '손절매는 더 큰 손실을 막기 위한 투자자의 "생명선"입니다.\n\n정하는 기준:\n1. % 기준: -5% 또는 -10% 등 원칙 고수\n2. 지지선 기준: 의미 있는 가격대(이동평균선 등) 이탈 시 매도\n3. 비중 조절: 한 종목이 전체 자산의 일정 수준 이상 손실이면 정리\n\n💡 손절은 틀렸음을 인정하는 것이 아니라, 다음 기회를 잡기 위한 현금 확보 과정입니다.',
  default: '죄송합니다. 해당 질문에 대한 답변을 준비 중입니다.\n\n투자 관련 질문이시라면 다음과 같은 주제로 질문해주세요:\n\n• 시장 지수 및 동향\n• 투자 용어 및 개념\n• 포트폴리오 구성 방법\n• 금융 상품 비교\n• 시장 이슈 분석\n\n더 구체적으로 질문해주시면 더 정확한 답변을 드릴 수 있습니다.'
}

export default {
  // 컴포넌트 이름: AI 투자 비서
  name: 'AIAssistant',
  components: {
    Button,
    Input,
    Send,
    Bot,
    User,
    TrendingUp,
    BookOpen,
    Calculator,
    HelpCircle,
    DollarSign,
    BarChart3,
    Newspaper,
    Target
  },
  data() {
    return {
      messages: [
        {
          id: '1',
          role: 'assistant',
          content: '안녕하세요! FApro AI어시스턴트 입니다. :D 시장정보와 종목정보에 관한 내용을 편하게 물어보세요.',
          timestamp: new Date()
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
      questions: {
        suggested: [
          { icon: 'TrendingUp', question: 'KOSPI 지수가 최근 상승한 이유는?' },
          { icon: 'Calculator', question: '복리 수익률 계산 방법을 알려주세요' },
          { icon: 'BookOpen', question: 'ETF와 펀드의 차이점은?' },
          { icon: 'HelpCircle', question: '금리 인상이 주식시장에 미치는 영향' }
        ],
        frequent: [
          { icon: 'DollarSign', question: '배당주 투자 전략은?' },
          { icon: 'BarChart3', question: 'PER과 PBR의 의미는?' },
          { icon: 'TrendingUp', question: '기술적 분석 기초 알려주세요' },
          { icon: 'Target', question: '분산투자의 중요성은?' },
          { icon: 'Newspaper', question: '공매도란 무엇인가요?' },
          { icon: 'BookOpen', question: '가치투자와 성장투자의 차이' },
          { icon: 'Calculator', question: 'ROE 지표 분석 방법' },
          { icon: 'HelpCircle', question: '옵션과 선물의 차이점' }
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
          { icon: 'BarChart3', question: '손절매 타이밍 결정 방법' }
        ]
      },
      // 스크롤 제어를 위한 ref
      scrollRef: null
    }
  },
  computed: {
    // 현재 선택된 탭에 해당하는 질문 목록 반환
    currentQuestions() {
      return this.questions[this.activeTab]
    }
  },
  watch: {
    // 메시지가 추가될 때마다 스크롤을 최하단으로 이동
    messages() {
      this.$nextTick(() => {
        const container = this.$refs.scrollArea
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      })
    }
  },
  methods: {
    // 추천 질문 클릭 시 입력창에 자동 입력 및 즉시 전송
    handleSuggestedQuestion(question) {
      this.input = question
      this.$nextTick(() => {
        this.handleSend()
      })
    },
    // 메시지 전송 처리
    handleSend() {
      if (!this.input.trim()) { return }

      // 사용자 메시지 추가
      const userMsg = {
        id: Date.now().toString(),
        role: 'user',
        content: this.input,
        timestamp: new Date()
      }
      this.messages.push(userMsg)
      const query = this.input.toLowerCase()
      this.input = ''
      this.isTyping = true // 입력 중 상태 표시

      // 모의 응답 지연 시뮬레이션
      setTimeout(() => {
        let response = mockResponses['default']
        // 키워드 매칭을 통한 간단한 응답 선택 로직
        if (query.includes('kospi') || query.includes('코스피') || query.includes('지수')) {
          response = mockResponses['KOSPI']
        } else if (query.includes('복리') || query.includes('수익률')) {
          response = mockResponses['복리']
        } else if (query.includes('etf') || query.includes('펀드')) {
          response = mockResponses['ETF']
        } else if (query.includes('금리') || query.includes('주식')) {
          response = mockResponses['금리']
        } else if (query.includes('배당')) {
          response = mockResponses['배당주']
        } else if (query.includes('per') || query.includes('pbr')) {
          response = mockResponses['PER']
        } else if (query.includes('기술적') || query.includes('차트')) {
          response = mockResponses['기술적']
        } else if (query.includes('분산') || query.includes('계란')) {
          response = mockResponses['분산투자']
        } else if (query.includes('공매도')) {
          response = mockResponses['공매도']
        } else if (query.includes('가치') || query.includes('성장')) {
          response = mockResponses['가치성장']
        } else if (query.includes('roe')) {
          response = mockResponses['ROE']
        } else if (query.includes('옵션') || query.includes('선물')) {
          response = mockResponses['옵션선물']
        } else if (query.includes('외환') || query.includes('환율')) {
          response = mockResponses['외환']
        } else if (query.includes('리츠') || query.includes('reit')) {
          response = mockResponses['리츠']
        } else if (query.includes('손절')) {
          response = mockResponses['손절매']
        }

        // 봇 메시지 추가
        this.messages.push({
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date()
        })
        this.isTyping = false
      }, 1000 + Math.random() * 1000)
    }
  }
}
</script>

<style src="@/assets/css/pages/assistant.css"></style>
