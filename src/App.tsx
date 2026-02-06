import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'

// Цвета
const RED = '#E50914'
const TIFFANY = '#0ABAB5'

// Slide data — Домашнее задание: Первый AI-ассистент
const SLIDES = [
  {
    id: 1,
    type: 'TITLE',
    title: 'НЕДЕЛЯ 1',
    subtitle: 'Твой первый AI-ассистент в Telegram',
    tagline: 'ДОМАШНЕЕ ЗАДАНИЕ',
    backgroundGif: 'https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif',
  },
  {
    id: 2,
    type: 'ROADMAP',
    title: 'ТВОЙ ПУТЬ',
    subtitle: 'От нуля до работающего бота за 40 минут',
    steps: [
      { num: '1', label: 'Создать ассистента', time: '15-20 мин', icon: '🤖' },
      { num: '2', label: 'Подключить Telegram', time: '5-10 мин', icon: '📱' },
      { num: '3', label: 'Протестировать', time: '10 мин', icon: '✅' },
      { num: '4', label: 'Сдать в чат', time: '5 мин', icon: '📤' },
    ],
  },
  {
    id: 3,
    type: 'SECTION',
    title: 'ШАГ 1',
    subtitle: 'Создаём ассистента',
    time: '15-20 минут',
    backgroundGif: 'https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif',
  },
  {
    id: 4,
    type: 'FLOW',
    title: 'AI FROMSPACE',
    subtitle: 'Платформа для создания ассистентов',
    flow: [
      { step: 'Зайти на платформу', arrow: true },
      { step: '"Создать ассистента"', arrow: true },
      { step: 'Придумать имя', arrow: true },
      { step: 'Написать промпт', arrow: false },
    ],
    tip: '💡 Имя может быть любым: "Личный секретарь", "Анна", "Помощник Маши"',
  },
  {
    id: 5,
    type: 'PROMPT_BUILDER',
    title: 'СИСТЕМНЫЙ ПРОМПТ',
    subtitle: 'Инструкция для ассистента — кто он и как себя ведёт',
    blocks: [
      { label: 'РОЛЬ', text: 'Ты мой личный помощник', color: RED },
      { label: 'ЗАДАЧИ', text: 'Планируешь день, напоминаешь, отвечаешь на вопросы', color: TIFFANY },
      { label: 'СТИЛЬ', text: 'Дружелюбно, с эмодзи, но в меру', color: RED },
      { label: 'ФОЛЛБЭК', text: 'Если не знаешь — ищи в интернете', color: TIFFANY },
    ],
  },
  {
    id: 6,
    type: 'SETTINGS_VISUAL',
    title: 'НАСТРОЙКИ',
    subtitle: 'Три важных параметра',
    settings: [
      {
        name: 'Модель',
        value: 'Google Gemini Flash 3.0',
        why: 'Умная + дешёвая',
        icon: '🧠'
      },
      {
        name: 'Размышление',
        value: 'Низкий уровень',
        why: 'Быстрые ответы',
        icon: '⚡'
      },
      {
        name: 'Тон',
        value: 'На твой выбор',
        why: 'Дружелюбный / Деловой / Неформальный',
        icon: '🎭'
      },
    ],
  },
  {
    id: 7,
    type: 'TOOLS_DIAGRAM',
    title: 'ИНСТРУМЕНТЫ',
    subtitle: 'Суперсилы твоего ассистента',
    tools: [
      {
        name: 'Постоянная память',
        description: 'Запоминает факты о тебе между диалогами',
        example: '"Запомни, что я люблю кофе без сахара"',
        icon: '🧠',
        color: TIFFANY
      },
      {
        name: 'Поиск в интернете',
        description: 'Находит актуальную информацию',
        example: '"Какая погода завтра в Москве?"',
        icon: '🔍',
        color: RED
      },
    ],
  },
  {
    id: 8,
    type: 'SECTION',
    title: 'ШАГ 2',
    subtitle: 'Telegram-бот',
    time: '5-10 минут',
    backgroundGif: 'https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif',
  },
  {
    id: 9,
    type: 'TELEGRAM_FLOW',
    title: '@BOTFATHER',
    subtitle: 'Официальный создатель ботов в Telegram',
    steps: [
      { action: 'Найти', target: '@BotFather в Telegram', icon: '🔍' },
      { action: 'Написать', target: '/newbot', icon: '✍️' },
      { action: 'Ввести', target: 'Имя бота: "Мой Помощник"', icon: '📝' },
      { action: 'Придумать', target: 'username_bot (заканчивается на bot)', icon: '🏷️' },
      { action: 'Скопировать', target: 'Токен → вставить в AI FromSpace', icon: '🔑' },
    ],
    warning: '⚠️ Токен — это пароль бота. Не показывай его никому!',
  },
  {
    id: 10,
    type: 'ARCHITECTURE',
    title: 'КАК ЭТО РАБОТАЕТ',
    subtitle: 'Схема связи компонентов',
    components: [
      { name: 'Ты', icon: '👤', position: 'left' },
      { name: 'Telegram', icon: '📱', position: 'center-left' },
      { name: 'AI FromSpace', icon: '⚡', position: 'center-right' },
      { name: 'Gemini AI', icon: '🧠', position: 'right' },
    ],
  },
  {
    id: 11,
    type: 'SECTION',
    title: 'ШАГ 3',
    subtitle: 'Тестируем',
    time: '10 минут',
    backgroundGif: 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif',
  },
  {
    id: 12,
    type: 'TEST_CASES',
    title: '3 ТЕСТА',
    subtitle: 'Проверяем, что всё работает',
    tests: [
      {
        type: 'Простой запрос',
        message: '"Привет! Как дела?"',
        expect: 'Бот отвечает дружелюбно',
        icon: '💬',
        color: 'white'
      },
      {
        type: 'Память',
        message: '"Запомни: меня зовут [имя], я занимаюсь [сфера]"',
        expect: 'Бот подтверждает, что запомнил',
        icon: '🧠',
        color: TIFFANY
      },
      {
        type: 'Поиск',
        message: '"Найди новости про [твоя тема]"',
        expect: 'Бот ищет и даёт актуальную инфу',
        icon: '🔍',
        color: RED
      },
    ],
  },
  {
    id: 13,
    type: 'COSTS_VISUAL',
    title: 'ПРОВЕРЬ РАСХОДЫ',
    subtitle: 'Где смотреть и что значат цифры',
    path: ['История диалога', '→', 'Детали', '→', 'Токены и инструменты'],
    tips: [
      { text: 'Токены = единица измерения текста', icon: '📊' },
      { text: 'Инструменты = x2 к расходу', icon: '⚠️' },
      { text: '1 запрос ≈ 0.001-0.01$', icon: '💰' },
    ],
  },
  {
    id: 14,
    type: 'SECTION',
    title: 'СДАТЬ',
    subtitle: 'Что отправить в чат курса',
    backgroundGif: 'https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif',
  },
  {
    id: 15,
    type: 'SUBMISSION',
    title: 'ЧЕК-ЛИСТ СДАЧИ',
    sections: [
      {
        title: '📸 СКРИНШОТЫ',
        items: [
          'Интерфейс ассистента (имя + настройки)',
          'Диалог в Telegram (минимум 3 сообщения)',
          'Раздел расходов (токены)',
        ]
      },
      {
        title: '✍️ ТЕКСТ',
        items: [
          'Как назвал ассистента и почему?',
          'Какую задачу он решает для тебя?',
          'Что удивило / понравилось / не понравилось?',
        ]
      },
    ],
  },
  {
    id: 16,
    type: 'SECTION',
    title: 'FAQ',
    subtitle: 'Если что-то пошло не так',
    backgroundGif: 'https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif',
  },
  {
    id: 17,
    type: 'TROUBLESHOOT',
    title: 'РЕШЕНИЕ ПРОБЛЕМ',
    problems: [
      {
        problem: 'Токен не работает',
        solution: 'Скопируй полностью, без пробелов. Или создай нового бота.',
        icon: '🔑'
      },
      {
        problem: 'Бот не отвечает',
        solution: 'Нажми "Сохранить" в настройках. Подожди 2 мин. Напиши /start',
        icon: '🤖'
      },
      {
        problem: 'Не ищет в интернете',
        solution: 'Спроси про погоду или новости — что-то актуальное',
        icon: '🔍'
      },
      {
        problem: 'Быстро тратятся кредиты',
        solution: 'Каждый инструмент = x2. Отключи ненужные.',
        icon: '💸'
      },
    ],
  },
  {
    id: 18,
    type: 'BONUS',
    title: 'БОНУС-ЧЕЛЛЕНДЖ',
    subtitle: 'Для самых смелых 🏆',
    challenge: {
      task: 'Проверь память ассистента',
      steps: [
        '1. Попроси запомнить 3 факта о тебе',
        '2. Закрой диалог',
        '3. Открой новый диалог',
        '4. Спроси: "Что ты обо мне знаешь?"',
      ],
      result: 'Он должен вспомнить все 3 факта!',
    },
    backgroundGif: 'https://media.giphy.com/media/3o7btNa0RUYa5E7iiQ/giphy.gif',
  },
  {
    id: 19,
    type: 'CTA',
    title: 'OFFICE HOURS',
    subtitle: '7 февраля, 11:00–12:00 по Москве',
    footer: 'Удачи! 🚀',
  },
]

function App() {
  const [current, setCurrent] = useState(0)
  const slide = SLIDES[current]

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrent(c => Math.min(c + 1, SLIDES.length - 1))
      }
      if (e.key === 'ArrowLeft') {
        setCurrent(c => Math.max(c - 1, 0))
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gray-800 z-50">
        <motion.div
          className="h-full bg-[#E50914]"
          animate={{ width: `${((current + 1) / SLIDES.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Slide counter */}
      <div className="fixed top-6 right-8 z-50 text-gray-500 text-sm font-mono">
        {current + 1} / {SLIDES.length}
      </div>

      {/* Slide content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          {/* TITLE SLIDE */}
          {slide.type === 'TITLE' && (
            <div className="relative w-full h-full film-grain">
              {slide.backgroundGif && (
                <>
                  <img src={slide.backgroundGif} className="absolute inset-0 w-full h-full object-cover grayscale" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50" />
                </>
              )}
              <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16 pb-20">
                {slide.tagline && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[#E50914] text-sm tracking-[0.3em] uppercase mb-4"
                  >
                    {slide.tagline}
                  </motion.p>
                )}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-display text-6xl md:text-9xl font-black text-white uppercase tracking-wide"
                >
                  {slide.title}
                </motion.h1>
                {slide.subtitle && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-xl md:text-3xl text-gray-300 mt-4"
                  >
                    {slide.subtitle}
                  </motion.p>
                )}
              </div>
            </div>
          )}

          {/* ROADMAP SLIDE */}
          {slide.type === 'ROADMAP' && (
            <div className="w-full h-full flex flex-col justify-center p-8 md:p-16 bg-[#0A0A0A] film-grain">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-4xl md:text-6xl font-black text-white uppercase mb-2"
              >
                {slide.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg md:text-xl mb-12"
              >
                {slide.subtitle}
              </motion.p>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
                {slide.steps?.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="flex items-center gap-4 md:flex-col md:text-center"
                  >
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-3xl md:text-4xl ${i % 2 === 0 ? 'bg-[#E50914]/20 border-2 border-[#E50914]' : 'bg-[#0ABAB5]/20 border-2 border-[#0ABAB5]'}`}>
                      {step.icon}
                    </div>
                    <div className="md:mt-4">
                      <p className="text-white font-bold text-lg">{(step as any).label}</p>
                      <p className="text-gray-500 text-sm">{(step as any).time}</p>
                    </div>
                    {i < (slide.steps?.length || 0) - 1 && (
                      <div className="hidden md:block w-12 lg:w-24 h-0.5 bg-gradient-to-r from-[#E50914] to-[#0ABAB5] mx-4" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION SLIDE with abstract gif */}
          {slide.type === 'SECTION' && (
            <div className="relative w-full h-full film-grain">
              {slide.backgroundGif && (
                <>
                  <img src={slide.backgroundGif} className="absolute inset-0 w-full h-full object-cover grayscale opacity-40" alt="" />
                  <div className="absolute inset-0 bg-black/60" />
                </>
              )}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center"
                >
                  <div className="w-24 h-1 bg-[#E50914] mx-auto mb-8" />
                  <h2 className="font-display text-6xl md:text-9xl font-black text-white uppercase tracking-wide">
                    {slide.title}
                  </h2>
                  {slide.subtitle && (
                    <p className="text-2xl md:text-3xl text-gray-300 mt-6">{slide.subtitle}</p>
                  )}
                  {slide.time && (
                    <p className="text-[#0ABAB5] text-lg mt-4 uppercase tracking-widest">⏱️ {slide.time}</p>
                  )}
                  <div className="w-24 h-1 bg-[#E50914] mx-auto mt-8" />
                </motion.div>
              </div>
            </div>
          )}

          {/* FLOW SLIDE - horizontal process */}
          {slide.type === 'FLOW' && (
            <div className="w-full h-full flex flex-col justify-center p-8 md:p-16 bg-[#0A0A0A] film-grain">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-display text-4xl md:text-5xl font-black text-[#E50914] uppercase mb-2"
              >
                {slide.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 text-lg mb-12"
              >
                {slide.subtitle}
              </motion.p>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
                {slide.flow?.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-display text-2xl md:text-3xl font-bold ${i % 2 === 0 ? 'text-[#E50914]' : 'text-[#0ABAB5]'}`}>{i + 1}</span>
                      <span className="text-white text-lg md:text-xl">{item.step}</span>
                    </div>
                    {item.arrow && (
                      <span className="text-gray-600 text-2xl hidden md:inline">→</span>
                    )}
                  </motion.div>
                ))}
              </div>

              {slide.tip && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-[#1a1a1a] border-l-4 border-[#0ABAB5] p-4 max-w-2xl"
                >
                  <p className="text-gray-300">{slide.tip}</p>
                </motion.div>
              )}
            </div>
          )}

          {/* PROMPT BUILDER - visual blocks */}
          {slide.type === 'PROMPT_BUILDER' && (
            <div className="w-full h-full flex flex-col justify-center p-8 md:p-16 bg-[#0A0A0A] film-grain">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl md:text-5xl font-black text-white uppercase mb-2"
              >
                {slide.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 text-base md:text-lg mb-8"
              >
                {slide.subtitle}
              </motion.p>

              <div className="space-y-4 max-w-3xl">
                {slide.blocks?.map((block, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className="px-3 py-1 text-sm font-bold uppercase tracking-wider shrink-0"
                      style={{ backgroundColor: block.color, color: 'white' }}
                    >
                      {block.label}
                    </div>
                    <p className="text-white text-lg md:text-xl">{block.text}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 text-gray-500 text-sm"
              >
                ↑ Это и есть системный промпт. Просто 4 предложения.
              </motion.div>
            </div>
          )}

          {/* SETTINGS VISUAL */}
          {slide.type === 'SETTINGS_VISUAL' && (
            <div className="w-full h-full flex flex-col justify-center p-8 md:p-16 bg-[#0A0A0A] film-grain">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-4xl md:text-6xl font-black text-[#E50914] uppercase mb-2"
              >
                {slide.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 text-lg mb-10"
              >
                {slide.subtitle}
              </motion.p>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
                {slide.settings?.map((setting, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                    className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 hover:border-[#E50914] transition-colors"
                  >
                    <div className="text-4xl mb-4">{setting.icon}</div>
                    <p className="text-gray-500 text-sm uppercase tracking-wider">{setting.name}</p>
                    <p className="text-white text-xl font-bold mt-1">{setting.value}</p>
                    <p className="text-[#0ABAB5] text-sm mt-2">{setting.why}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* TOOLS DIAGRAM */}
          {slide.type === 'TOOLS_DIAGRAM' && (
            <div className="w-full h-full flex flex-col justify-center p-8 md:p-16 bg-[#0A0A0A] film-grain">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-4xl md:text-6xl font-black text-white uppercase mb-2"
              >
                {slide.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 text-lg mb-10"
              >
                {slide.subtitle}
              </motion.p>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
                {slide.tools?.map((tool, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.2 }}
                    className="relative"
                  >
                    <div
                      className="absolute top-0 left-0 w-1 h-full"
                      style={{ backgroundColor: tool.color }}
                    />
                    <div className="pl-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{tool.icon}</span>
                        <h3 className="text-white text-xl font-bold">{tool.name}</h3>
                      </div>
                      <p className="text-gray-400 mb-3">{tool.description}</p>
                      <div className="bg-[#1a1a1a] rounded p-3 border-l-2" style={{ borderColor: tool.color }}>
                        <p className="text-gray-300 italic text-sm">{tool.example}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* TELEGRAM FLOW */}
          {slide.type === 'TELEGRAM_FLOW' && (
            <div className="w-full h-full flex flex-col justify-center p-8 md:p-16 bg-[#0A0A0A] film-grain">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-display text-4xl md:text-6xl font-black text-[#0ABAB5] uppercase mb-2"
              >
                {slide.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 text-lg mb-8"
              >
                {slide.subtitle}
              </motion.p>

              <div className="space-y-4 max-w-2xl">
                {slide.steps?.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-4 bg-[#1a1a1a] rounded-lg p-4"
                  >
                    <span className="text-2xl">{step.icon}</span>
                    <span className="text-[#E50914] font-bold uppercase text-sm w-24">{(step as any).action}</span>
                    <span className="text-white">{(step as any).target}</span>
                  </motion.div>
                ))}
              </div>

              {slide.warning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 bg-[#E50914]/10 border border-[#E50914] rounded-lg p-4 max-w-2xl"
                >
                  <p className="text-[#E50914]">{slide.warning}</p>
                </motion.div>
              )}
            </div>
          )}

          {/* ARCHITECTURE */}
          {slide.type === 'ARCHITECTURE' && (
            <div className="w-full h-full flex flex-col justify-center items-center p-8 md:p-16 bg-[#0A0A0A] film-grain">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl md:text-5xl font-black text-white uppercase mb-2 text-center"
              >
                {slide.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 text-lg mb-12 text-center"
              >
                {slide.subtitle}
              </motion.p>

              <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
                {slide.components?.map((comp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                    className="flex items-center gap-4"
                  >
                    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-xl flex flex-col items-center justify-center ${i % 2 === 0 ? 'bg-[#E50914]/20 border-2 border-[#E50914]' : 'bg-[#0ABAB5]/20 border-2 border-[#0ABAB5]'}`}>
                      <span className="text-3xl md:text-4xl">{comp.icon}</span>
                      <span className="text-white text-xs mt-1 font-medium">{comp.name}</span>
                    </div>
                    {i < (slide.components?.length || 0) - 1 && (
                      <div className="text-gray-600 text-2xl">→</div>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-gray-500 text-sm mt-8 text-center"
              >
                Ты пишешь в Telegram → Бот передаёт в AI FromSpace → Там работает Gemini → Ответ приходит обратно
              </motion.p>
            </div>
          )}

          {/* TEST CASES */}
          {slide.type === 'TEST_CASES' && (
            <div className="w-full h-full flex flex-col justify-center p-8 md:p-16 bg-[#0A0A0A] film-grain">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-4xl md:text-6xl font-black text-[#E50914] uppercase mb-2"
              >
                {slide.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 text-lg mb-10"
              >
                {slide.subtitle}
              </motion.p>

              <div className="space-y-6 max-w-3xl">
                {slide.tests?.map((test, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.15 }}
                    className="bg-[#1a1a1a] rounded-lg p-5 border-l-4"
                    style={{ borderColor: test.color === 'white' ? '#ffffff' : test.color }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{test.icon}</span>
                      <span className="text-white font-bold">{test.type}</span>
                    </div>
                    <p className="text-[#0ABAB5] text-lg mb-1">{test.message}</p>
                    <p className="text-gray-500 text-sm">→ {test.expect}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* COSTS VISUAL */}
          {slide.type === 'COSTS_VISUAL' && (
            <div className="w-full h-full flex flex-col justify-center p-8 md:p-16 bg-[#0A0A0A] film-grain">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-4xl md:text-6xl font-black text-white uppercase mb-2"
              >
                {slide.title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 text-lg mb-8"
              >
                {slide.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 mb-10 flex-wrap"
              >
                {slide.path?.map((step, i) => (
                  <span key={i} className={i % 2 === 1 ? 'text-gray-600 text-xl' : 'bg-[#1a1a1a] px-4 py-2 rounded text-white'}>
                    {step}
                  </span>
                ))}
              </motion.div>

              <div className="grid md:grid-cols-3 gap-4 max-w-3xl">
                {slide.tips?.map((tip, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 text-center"
                  >
                    <span className="text-2xl block mb-2">{tip.icon}</span>
                    <p className="text-gray-300 text-sm">{tip.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* SUBMISSION */}
          {slide.type === 'SUBMISSION' && (
            <div className="w-full h-full flex flex-col justify-center p-8 md:p-16 bg-[#0A0A0A] film-grain">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-4xl md:text-5xl font-black text-[#E50914] uppercase mb-10"
              >
                {slide.title}
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl">
                {slide.sections?.map((section, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.2 }}
                  >
                    <h3 className="text-white text-xl font-bold mb-4">{section.title}</h3>
                    <div className="space-y-3">
                      {section.items.map((item, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <span className={i === 0 ? 'text-[#E50914]' : 'text-[#0ABAB5]'}>□</span>
                          <span className="text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* TROUBLESHOOT */}
          {slide.type === 'TROUBLESHOOT' && (
            <div className="w-full h-full flex flex-col justify-center p-8 md:p-16 bg-[#0A0A0A] film-grain overflow-y-auto">
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl md:text-5xl font-black text-white uppercase mb-8"
              >
                {slide.title}
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
                {slide.problems?.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="bg-[#1a1a1a] rounded-lg p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{p.icon}</span>
                      <span className="text-[#E50914] font-bold">{p.problem}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{p.solution}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* BONUS SLIDE */}
          {slide.type === 'BONUS' && (
            <div className="relative w-full h-full film-grain">
              {slide.backgroundGif && (
                <>
                  <img src={slide.backgroundGif} className="absolute inset-0 w-full h-full object-cover grayscale opacity-30" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60" />
                </>
              )}
              <div className="relative z-10 h-full flex flex-col justify-center p-8 md:p-16">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[#0ABAB5] text-sm tracking-[0.3em] uppercase mb-4"
                >
                  {slide.subtitle}
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="font-display text-4xl md:text-6xl font-black text-white uppercase mb-8"
                >
                  {slide.title}
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-[#1a1a1a]/80 rounded-lg p-6 max-w-xl border border-[#0ABAB5]"
                >
                  <p className="text-[#0ABAB5] font-bold mb-4">{slide.challenge?.task}</p>
                  <div className="space-y-2 mb-4">
                    {slide.challenge?.steps.map((step, i) => (
                      <p key={i} className="text-gray-300">{step}</p>
                    ))}
                  </div>
                  <p className="text-white font-bold">→ {slide.challenge?.result}</p>
                </motion.div>
              </div>
            </div>
          )}

          {/* CTA SLIDE */}
          {slide.type === 'CTA' && (
            <div className="w-full h-full flex items-center justify-center bg-[#0A0A0A] p-8 film-grain">
              <div className="text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-5xl md:text-8xl font-black text-[#E50914] uppercase"
                >
                  {slide.title}
                </motion.h1>
                {slide.subtitle && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl md:text-3xl text-gray-300 mt-6"
                  >
                    {slide.subtitle}
                  </motion.p>
                )}
                {slide.footer && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-4xl mt-12"
                  >
                    {slide.footer}
                  </motion.p>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Click areas for navigation */}
      <div
        className="fixed left-0 top-0 w-1/3 h-full cursor-w-resize z-40"
        onClick={() => setCurrent(c => Math.max(c - 1, 0))}
      />
      <div
        className="fixed right-0 top-0 w-1/3 h-full cursor-e-resize z-40"
        onClick={() => setCurrent(c => Math.min(c + 1, SLIDES.length - 1))}
      />
    </div>
  )
}

export default App
