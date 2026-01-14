/**
 * 21-S Challenge Definitions
 * 21 Progressive Social Challenges for Building Confidence
 *
 * Mint fees progress from 0.02 SOL (beginner) to 0.07 SOL (master)
 * Each challenge has 21 daily tasks
 */

import { Challenge, ChallengeTier, BadgeRarity } from '@/types/challenges'

// Mint fee by challenge level
const MINT_FEES: Record<number, number> = {
  1: 0.02,
  2: 0.02,
  3: 0.02,
  4: 0.02,
  5: 0.02,
  6: 0.03,
  7: 0.03,
  8: 0.03,
  9: 0.03,
  10: 0.04,
  11: 0.04,
  12: 0.04,
  13: 0.05,
  14: 0.05,
  15: 0.05,
  16: 0.05,
  17: 0.06,
  18: 0.06,
  19: 0.06,
  20: 0.07,
  21: 0.07,
}

// Tier by challenge level
const getTier = (level: number): ChallengeTier => {
  if (level <= 5) return 'beginner'
  if (level <= 12) return 'intermediate'
  if (level <= 18) return 'advanced'
  return 'master'
}

// Rarity by challenge level
const getRarity = (level: number): BadgeRarity => {
  if (level <= 5) return 'common'
  if (level <= 10) return 'uncommon'
  if (level <= 15) return 'rare'
  if (level <= 19) return 'epic'
  return 'legendary'
}

// Generate 21 days for a challenge with progressive tasks
const generateDays = (
  baseTask: string,
  progression: string[],
  tips: string[]
) => {
  return Array.from({ length: 21 }, (_, i) => ({
    day: i + 1,
    task:
      i < progression.length
        ? progression[i]
        : `${baseTask} - Day ${i + 1}: Continue practicing`,
    tip: tips[i % tips.length],
  }))
}

export const CHALLENGES: Challenge[] = [
  // ============================================
  // BEGINNER TIER (1-5) - 0.02 SOL
  // ============================================
  {
    id: 1,
    title: 'Eye Contact Mastery',
    description:
      'Build foundational confidence through eye contact. Learn to hold eye contact naturally without looking away first.',
    tier: getTier(1),
    mintFee: MINT_FEES[1],
    requiredChallengeId: null,
    badge: {
      name: 'The Observer',
      description: 'Mastered the art of confident eye contact',
      rarity: getRarity(1),
      image: 'badge_eye_contact',
    },
    days: generateDays(
      'Practice eye contact',
      [
        'Make eye contact with 3 strangers and hold for 2 seconds',
        'Make eye contact with 5 strangers, smile slightly',
        'Hold eye contact with 5 people until they look away first',
        'Make eye contact with 7 strangers today',
        'Practice the "triangle gaze" (eyes-nose-eyes) with 5 people',
        'Hold eye contact for 3 seconds with 5 strangers',
        'Make eye contact with 10 people throughout your day',
        'Practice eye contact while walking past people',
        'Make eye contact with someone you find attractive',
        'Hold confident eye contact in a conversation for 1 minute total',
        'Make eye contact with 10 strangers, hold for 3 seconds each',
        'Practice "soft eye contact" - relaxed but present',
        'Make eye contact first in every interaction today',
        'Hold eye contact while someone else is speaking',
        'Practice eye contact with people in authority positions',
        'Make eye contact with 15 strangers today',
        'Hold eye contact during an entire short conversation',
        'Practice the "approach eye contact" - lock eyes, slight smile, approach',
        'Make confident eye contact in a crowded place',
        'Hold eye contact naturally for an entire interaction',
        'Complete 20 confident eye contact moments today',
      ],
      [
        'Relax your face - tension shows in your eyes',
        'Breathe slowly to stay calm',
        "Don't stare - blink naturally",
        "If nervous, focus on one eye or the bridge of their nose",
        'Smile with your eyes (slight squint)',
      ]
    ),
  },
  {
    id: 2,
    title: 'Posture & Presence',
    description:
      'Develop commanding body language. Stand tall, take up space, and project confidence through your physical presence.',
    tier: getTier(2),
    mintFee: MINT_FEES[2],
    requiredChallengeId: 1,
    badge: {
      name: 'The Pillar',
      description: 'Radiates confidence through powerful presence',
      rarity: getRarity(2),
      image: 'badge_posture',
    },
    days: generateDays(
      'Practice confident posture',
      [
        'Stand with shoulders back for entire morning',
        'Walk with chin parallel to ground all day',
        'Take up space - spread out when sitting 3 times',
        'Stand in "power pose" for 2 minutes before leaving home',
        'Walk slower and more deliberately than usual',
        'Keep hands visible and relaxed (no pockets) for 2 hours',
        'Practice "grounded stance" - feet shoulder width, weight centered',
        'Enter 3 rooms and pause at the doorway confidently',
        'Sit at the head of a table or prominent position',
        'Walk through a crowd without moving out of the way first',
        'Practice open body language in every conversation',
        'Stand while others sit in at least one interaction',
        'Keep your back straight for an entire work session',
        "Walk as if you're not in a hurry anywhere you go",
        'Practice taking up more space in public transport',
        'Enter a room and make your presence known',
        'Stand confidently while waiting (no phone)',
        'Practice the "winner pose" - hands on hips, chest out',
        'Move through your day like you own every room',
        'Maintain perfect posture during a full conversation',
        'Embody complete confidence in your physical presence all day',
      ],
      [
        'Imagine a string pulling you up from your head',
        'Shoulders back and down, not tense',
        'Your body language speaks before you do',
        "Slow movements signal confidence",
        "Taking up space isn't rude - it's confident",
      ]
    ),
  },
  {
    id: 3,
    title: 'Voice Projection',
    description:
      'Develop a strong, clear voice. Learn to speak with authority, proper volume, and confident tonality.',
    tier: getTier(3),
    mintFee: MINT_FEES[3],
    requiredChallengeId: 2,
    badge: {
      name: 'The Voice',
      description: 'Commands attention with powerful vocal presence',
      rarity: getRarity(3),
      image: 'badge_voice',
    },
    days: generateDays(
      'Practice voice projection',
      [
        'Order coffee/food clearly and loudly enough to be heard first time',
        'Say "excuse me" loud enough to be heard from 10 feet away',
        'Practice speaking 20% louder than normal in conversations',
        'Record yourself speaking and analyze your tone',
        'Speak from your diaphragm - practice deep breathing before talking',
        'End statements with downward inflection (not questions)',
        "Say someone's name clearly when greeting them",
        'Project your voice across a room to get attention',
        'Practice speaking slowly and deliberately',
        "Don't trail off at the end of sentences - finish strong",
        'Ask for something in public using a clear, strong voice',
        'Practice varying your pitch to emphasize points',
        'Speak with conviction - no filler words (um, like, you know)',
        'Call someone on the phone and speak confidently',
        'Give a compliment in a clear, audible voice',
        'Practice power pauses - silence before important points',
        'Project confidence through voice alone (no visual cues)',
        'Lead a conversation with your vocal presence',
        'Speak to a group of 3+ people with commanding voice',
        'Use your voice to hold attention for a full story',
        'Command a conversation entirely through vocal confidence',
      ],
      [
        'Breathe from your belly, not your chest',
        'Slow down - rushing shows nervousness',
        'Lower pitch slightly for more authority',
        'Pause instead of using filler words',
        'Speak as if everyone wants to hear you',
      ]
    ),
  },
  {
    id: 4,
    title: 'Stranger Acknowledgment',
    description:
      'Break the ice by acknowledging strangers. Simple nods, waves, and acknowledgments build social comfort.',
    tier: getTier(4),
    mintFee: MINT_FEES[4],
    requiredChallengeId: 3,
    badge: {
      name: 'The Acknowledger',
      description: 'Breaks social barriers with ease',
      rarity: getRarity(4),
      image: 'badge_acknowledge',
    },
    days: generateDays(
      'Acknowledge strangers',
      [
        'Nod at 5 strangers you pass',
        'Say "hey" or nod to 7 strangers',
        'Smile and nod at 10 people today',
        "Wave at someone you make eye contact with",
        'Say "morning" or "evening" to 5 strangers',
        'Acknowledge 10 strangers with a head nod',
        'Say "how\'s it going" to 3 strangers in passing',
        'Give a thumbs up or wave to someone',
        'Acknowledge 15 strangers throughout your day',
        'Say "hey, how are you" to 5 strangers',
        'Acknowledge every person you pass in a hallway',
        'Give a friendly wave to a stranger across the street',
        'Say "good [time of day]" to everyone you pass for an hour',
        'Acknowledge 20 strangers with eye contact and nod',
        'Say a brief greeting to every cashier/server you interact with',
        'Wave at someone from your car or while walking',
        'Acknowledge strangers in an elevator',
        "Greet people first before they greet you",
        'Acknowledge every stranger on a short walk',
        'Make acknowledging strangers feel completely natural',
        'Acknowledge 25+ strangers throughout your day',
      ],
      [
        "A simple nod is enough - you're building comfort",
        'Acknowledge up, not down - confident, not submissive',
        "Don't overthink it - just a brief moment",
        'Smile with your eyes when you nod',
        'This builds your social muscle for bigger challenges',
      ]
    ),
  },
  {
    id: 5,
    title: 'Basic Openers',
    description:
      'Learn to start simple conversations with strangers. Observational comments and basic questions.',
    tier: getTier(5),
    mintFee: MINT_FEES[5],
    requiredChallengeId: 4,
    badge: {
      name: 'The Initiator',
      description: 'Starts conversations without hesitation',
      rarity: getRarity(5),
      image: 'badge_opener',
    },
    days: generateDays(
      'Practice opening conversations',
      [
        'Ask 1 stranger for the time',
        'Ask 2 strangers for directions (even if you know)',
        'Comment on the weather to 1 stranger',
        'Ask 3 strangers simple questions',
        "Comment on something in your environment to a stranger",
        'Ask a stranger their opinion on something (coffee, food, etc.)',
        "Say 'nice [item]' to 3 strangers about something they're wearing",
        'Ask 5 strangers simple questions or make comments',
        "Start a conversation with 'hey, quick question...'",
        'Make an observational comment to 3 strangers',
        'Ask a stranger for a recommendation',
        'Comment on what someone is reading/watching/doing',
        'Start 5 conversations with simple openers',
        'Practice the "excuse me, I noticed..." opener',
        'Ask a stranger about something they seem to know about',
        'Make 7 observational comments to strangers',
        'Start a conversation and extend it past one exchange',
        'Open 5 conversations and keep 2 going for 30+ seconds',
        'Practice openers in different environments',
        'Start 10 conversations with strangers',
        'Feel completely natural opening conversations with anyone',
      ],
      [
        'The words matter less than your delivery',
        'Be genuinely curious, not performative',
        "Observations work better than questions",
        "State, don't ask - 'that looks good' vs 'what is that'",
        'The opener just gets you in - personality keeps them',
      ]
    ),
  },

  // ============================================
  // INTERMEDIATE TIER (6-12) - 0.03-0.04 SOL
  // ============================================
  {
    id: 6,
    title: 'Cold Approach Introduction',
    description:
      'Take the leap into direct approaches. Learn to introduce yourself to strangers with confidence.',
    tier: getTier(6),
    mintFee: MINT_FEES[6],
    requiredChallengeId: 5,
    badge: {
      name: 'The Approacher',
      description: 'Fearlessly introduces themselves to anyone',
      rarity: getRarity(6),
      image: 'badge_approach',
    },
    days: generateDays(
      'Practice cold approaches',
      [
        'Approach 1 stranger and introduce yourself',
        'Approach 1 person and say "Hey, I wanted to meet you, I\'m [name]"',
        'Make 2 direct introductions to strangers',
        "Approach someone and give a genuine compliment + intro",
        'Make 2 approaches with a direct opener',
        'Approach 3 people and introduce yourself',
        'Practice the 3-second rule - approach within 3 seconds of deciding',
        'Make 3 cold approaches with confident body language',
        'Approach someone who looks busy and introduce yourself',
        'Make 4 direct approaches today',
        'Approach someone you find attractive and introduce yourself',
        'Practice approaching from different angles (front, side)',
        'Make 4 approaches and try to exchange names',
        'Approach 5 strangers with a direct introduction',
        'Practice "hey, I know this is random but I wanted to say hi"',
        'Make 5 approaches in different locations',
        'Approach someone in a group (just address them)',
        'Make 5 direct approaches with strong eye contact',
        'Practice recovering smoothly if someone seems uninterested',
        'Approach 6 people with complete confidence',
        'Make 7+ approaches and feel completely natural doing it',
      ],
      [
        'Approach anxiety decreases with every attempt',
        'Their response is not a reflection of your worth',
        "Be direct - 'I wanted to meet you' is attractive",
        'Smile and relax - you have nothing to lose',
        "The goal is the approach itself, not the outcome",
      ]
    ),
  },
  {
    id: 7,
    title: 'Genuine Compliments',
    description:
      'Master the art of giving authentic compliments. Move beyond surface-level to meaningful observations.',
    tier: getTier(7),
    mintFee: MINT_FEES[7],
    requiredChallengeId: 6,
    badge: {
      name: 'The Appreciator',
      description: 'Gives compliments that resonate',
      rarity: getRarity(7),
      image: 'badge_compliment',
    },
    days: generateDays(
      'Give genuine compliments',
      [
        'Give 1 genuine compliment to a stranger',
        'Compliment 2 strangers on something specific (not generic)',
        'Give a compliment about energy/vibe, not just appearance',
        'Compliment 3 people on choices they made (style, items)',
        "Give a compliment and explain why you noticed it",
        'Compliment someone on their actions/behavior',
        'Give 3 meaningful compliments to strangers',
        'Compliment someone in a way that shows observation',
        'Give 4 genuine compliments throughout your day',
        "Compliment someone's energy or presence",
        'Give a compliment that makes someone genuinely smile',
        'Compliment 4 strangers on non-physical attributes',
        'Give a compliment and continue the conversation',
        'Compliment someone on something others might not notice',
        'Give 5 genuine, specific compliments',
        "Compliment someone's taste or choices",
        'Give a compliment that sparks a conversation',
        'Compliment 5 strangers and gauge their reactions',
        'Give compliments that feel completely natural',
        'Master the art of the unexpected compliment',
        'Give 7+ genuine compliments that create positive interactions',
      ],
      [
        'Specific > Generic ("your style is bold" vs "nice outfit")',
        "Compliment choices, not genetics",
        "Notice what they put effort into",
        "Mean what you say - insincerity shows",
        "Good compliments often surprise people",
      ]
    ),
  },
  {
    id: 8,
    title: 'Conversation Threading',
    description:
      'Learn to keep conversations flowing naturally. Pick up on threads and expand discussions organically.',
    tier: getTier(8),
    mintFee: MINT_FEES[8],
    requiredChallengeId: 7,
    badge: {
      name: 'The Conversationalist',
      description: 'Never runs out of things to say',
      rarity: getRarity(8),
      image: 'badge_conversation',
    },
    days: generateDays(
      'Practice conversation threading',
      [
        'Have 1 conversation that lasts more than 2 minutes',
        'Pick up on a thread and expand it in a conversation',
        'Have a conversation with 3+ back-and-forth exchanges',
        'Use "that reminds me of..." to thread a conversation',
        'Keep 2 conversations going past surface level',
        'Ask follow-up questions that show genuine interest',
        'Have a conversation that lasts 5+ minutes',
        'Practice active listening and reference what they said',
        'Thread from one topic to a related personal story',
        'Keep 2 conversations flowing naturally',
        'Master the "keyword" technique - pick up on interesting words',
        'Have a conversation where they do most of the talking',
        'Successfully navigate 3 conversation threads in one chat',
        'Keep a conversation interesting through diverse topics',
        'Practice transitioning smoothly between topics',
        'Have 2 conversations last 5+ minutes each',
        'Make conversations feel effortless through good threading',
        'Navigate a conversation through 5+ different threads',
        'Keep someone engaged for 10+ minutes',
        'Master conversation flow with multiple strangers',
        'Have 3 substantial conversations that thread naturally',
      ],
      [
        "Listen for keywords that can become new threads",
        "Share related stories to create connection",
        "Don't interview - make statements too",
        "Emotions > logistics in conversation",
        "Thread to things that matter, not small talk",
      ]
    ),
  },
  {
    id: 9,
    title: 'Handling Rejection',
    description:
      'Build emotional resilience to rejection. Learn to handle "no" gracefully and keep approaching.',
    tier: getTier(9),
    mintFee: MINT_FEES[9],
    requiredChallengeId: 8,
    badge: {
      name: 'The Unshakeable',
      description: 'Rejection rolls off like water',
      rarity: getRarity(9),
      image: 'badge_rejection',
    },
    days: generateDays(
      'Practice handling rejection',
      [
        'Make an approach expecting nothing',
        'Get rejected once and immediately make another approach',
        'Ask for something you expect to be denied',
        'Practice saying "no worries, have a good one" gracefully',
        'Make 3 approaches regardless of outcome',
        'Get rejected and analyze it without self-criticism',
        'Ask for something unreasonable to practice hearing no',
        'Make 4 approaches and track how you handle each outcome',
        'Practice the "smile and move on" response',
        'Get at least 2 rejections and keep going',
        'Approach without any outcome dependence',
        'Make 5 approaches caring only about your delivery',
        "Practice reframing rejection as 'not a match'",
        'Get rejected and make another approach within 5 minutes',
        'Approach someone out of your perceived league',
        'Make 5 approaches with zero attachment to results',
        'Practice gratitude even after rejection',
        'Handle a rejection with complete composure',
        'Make rejection feel like a neutral experience',
        'Get rejected 3+ times and feel fine about it',
        'Approach 7+ people with complete outcome independence',
      ],
      [
        "Rejection is redirection, not reflection",
        "Her 'no' is information, not judgment",
        "Most rejection isn't personal",
        "The sting fades with repetition",
        "Abundance mindset - there's always someone else",
      ]
    ),
  },
  {
    id: 10,
    title: 'Number Exchange',
    description:
      'Learn to smoothly exchange contact information. Master the transition from conversation to connection.',
    tier: getTier(10),
    mintFee: MINT_FEES[10],
    requiredChallengeId: 9,
    badge: {
      name: 'The Connector',
      description: 'Secures connections with ease',
      rarity: getRarity(10),
      image: 'badge_number',
    },
    days: generateDays(
      'Practice number exchanges',
      [
        'Have a conversation with intent to ask for contact info',
        'Ask 1 person for their number or social media',
        'Practice the line "we should continue this - what\'s your number"',
        'Ask 2 people for contact info',
        'Get 1 number after a genuine conversation',
        'Practice different ways to ask for contact info',
        'Ask 2 people and get at least 1 number',
        "Exchange info using the 'let me text you' method",
        'Get 2 numbers in one day',
        "Practice handing your phone saying 'put your number in'",
        'Ask 3 people for their contact info',
        'Get at least 2 genuine number exchanges',
        'Practice different closing styles',
        'Exchange numbers after a 5+ minute conversation',
        'Get 2 numbers with smooth, natural closes',
        'Ask for numbers without hesitation or awkwardness',
        'Get 3 numbers in one day',
        'Practice the confident direct ask',
        'Close 3 conversations with number exchanges',
        'Make number exchanges feel completely natural',
        'Get 4+ numbers with confident, smooth closes',
      ],
      [
        "Ask when the conversation is high, not dying",
        "Be assumptive - 'give me your number' vs 'can I have...'",
        "State the reason - 'let's get coffee sometime'",
        "Don't linger after - get it and leave on a high note",
        "Her giving her number is compliance, not commitment",
      ]
    ),
  },
  {
    id: 11,
    title: 'Day Game Fundamentals',
    description:
      'Master approaching during the day. Coffee shops, streets, stores - anywhere becomes your arena.',
    tier: getTier(11),
    mintFee: MINT_FEES[11],
    requiredChallengeId: 10,
    badge: {
      name: 'Day Walker',
      description: 'Approaches confidently anywhere, anytime',
      rarity: getRarity(11),
      image: 'badge_daygame',
    },
    days: generateDays(
      'Practice day game',
      [
        'Make 1 approach in a coffee shop',
        'Approach 1 person on the street',
        'Make 2 day game approaches in different venues',
        'Approach someone in a store',
        'Make 3 day game approaches',
        'Practice the street stop approach',
        'Approach in 3 different day game environments',
        'Master the coffee shop approach',
        'Make 4 day game approaches',
        'Practice approaching moving targets (walking)',
        'Make day game approaches in busy environments',
        'Get 1 number from a day game approach',
        'Make 5 day game approaches',
        'Practice instant dates (coffee right now)',
        'Approach in parks, bookstores, or casual venues',
        'Get 2 numbers from day game approaches',
        'Make 5 day game approaches with confident delivery',
        'Practice different day game locations',
        'Make day game approaches feel completely natural',
        'Get 2+ numbers from day game in one session',
        'Complete 7+ day game approaches across multiple venues',
      ],
      [
        "Day game is honest and direct - embrace it",
        "Busy people respect directness - don't waste time",
        "Smile and positive energy matter more in daylight",
        "Location doesn't matter - your vibe does",
        "Day game shows the most confidence",
      ]
    ),
  },
  {
    id: 12,
    title: 'Social Circle Expansion',
    description:
      'Build and expand your social network. Meet new people through activities, events, and introductions.',
    tier: getTier(12),
    mintFee: MINT_FEES[12],
    requiredChallengeId: 11,
    badge: {
      name: 'The Networker',
      description: 'Builds social circles effortlessly',
      rarity: getRarity(12),
      image: 'badge_social',
    },
    days: generateDays(
      'Expand social circle',
      [
        'Start a conversation with someone at a regular spot',
        'Get the contact info of someone from your routine',
        'Introduce yourself to someone at an event or class',
        'Make a plan with someone you recently met',
        'Attend a new event or activity solo',
        'Meet 3 new people at an event',
        'Exchange info with 2 people from social activities',
        'Introduce two people you know to each other',
        'Follow up with someone you met recently',
        'Host or organize a small gathering',
        'Meet 5 new people through social activities',
        'Get invited somewhere through a new connection',
        'Expand your circle through a friend-of-friend',
        'Become a regular somewhere and build rapport',
        'Meet 3 new people through existing connections',
        'Create value for your social circle',
        'Get introduced to new people through your network',
        'Build a connection that leads to more connections',
        'Become known as a connector yourself',
        'Expand your circle through multiple channels',
        'Have a thriving, growing social network',
      ],
      [
        "Your network is your net worth",
        "Be the person who introduces people",
        "Follow up - most people don't",
        "Provide value, don't just take",
        "Diverse circles create opportunities",
      ]
    ),
  },

  // ============================================
  // ADVANCED TIER (13-18) - 0.05-0.06 SOL
  // ============================================
  {
    id: 13,
    title: 'Instant Date Mastery',
    description:
      'Learn to transition from approach to instant date. "Let\'s grab coffee right now" becomes natural.',
    tier: getTier(13),
    mintFee: MINT_FEES[13],
    requiredChallengeId: 12,
    badge: {
      name: 'The Spontaneous',
      description: 'Creates instant dates on demand',
      rarity: getRarity(13),
      image: 'badge_instant',
    },
    days: generateDays(
      'Practice instant dates',
      [
        'Attempt 1 instant date after an approach',
        'Suggest "let\'s grab coffee" after a conversation',
        'Try 2 instant date invitations',
        'Practice different instant date suggestions',
        'Get 1 instant date (even if just 10 minutes)',
        'Try instant dates in different contexts',
        'Attempt 3 instant date invitations',
        'Practice overcoming "I can\'t right now" objections',
        'Get 1 instant date that lasts 15+ minutes',
        'Try the "I was about to grab coffee, join me" approach',
        'Attempt 3 instant dates and get at least 1',
        'Practice seamless instant date transitions',
        'Get an instant date in a new environment',
        'Master different instant date venues',
        'Get 2 instant dates in one week',
        'Practice time constraints ("I have 15 minutes")',
        'Get an instant date and extend it past initial plans',
        'Master the instant date as your default close',
        'Attempt 5 instant dates',
        'Get 2 instant dates in one day',
        'Make instant dates your natural approach outcome',
      ],
      [
        "'Right now' has higher compliance than 'sometime'",
        "Have a venue in mind before you suggest it",
        "Time constraint reduces pressure on her",
        "Be ready to lead - know where you're going",
        "Instant date > number because of momentum",
      ]
    ),
  },
  {
    id: 14,
    title: 'Teasing & Playfulness',
    description:
      'Add playful banter to your interactions. Learn to tease without being mean, creating fun tension.',
    tier: getTier(14),
    mintFee: MINT_FEES[14],
    requiredChallengeId: 13,
    badge: {
      name: 'The Playful',
      description: 'Creates fun tension through banter',
      rarity: getRarity(14),
      image: 'badge_tease',
    },
    days: generateDays(
      'Practice teasing',
      [
        'Use playful banter in 1 conversation',
        'Tease someone lightly and gauge their reaction',
        'Practice "agreeing and amplifying" absurdly',
        'Use playful push-pull in a conversation',
        'Tease someone you just met',
        "Practice the 'misinterpretation' technique",
        'Add teasing to 3 conversations',
        'Use playful nicknames in an interaction',
        'Master light teasing without being mean',
        'Create playful tension in a conversation',
        "Practice 'accusing' them of hitting on you",
        'Tease confidently with 5 different people',
        'Use roleplay in a conversation',
        'Master push-pull dynamics',
        'Create genuine laughter through teasing',
        'Tease in a way that builds attraction',
        'Practice advanced banter techniques',
        'Make teasing your natural conversation style',
        'Use playful banter with anyone',
        'Master the balance of tease and interest',
        'Make every conversation playful and fun',
      ],
      [
        "Tease like you would a little sister",
        "Mean what you say, then smile",
        "If she's not laughing, you're doing it wrong",
        "Tease the behavior, not the person",
        "Push-pull creates emotional engagement",
      ]
    ),
  },
  {
    id: 15,
    title: 'Leading & Decisiveness',
    description:
      'Become the one who leads. Make decisions quickly, suggest plans, and guide interactions confidently.',
    tier: getTier(15),
    mintFee: MINT_FEES[15],
    requiredChallengeId: 14,
    badge: {
      name: 'The Leader',
      description: 'Takes charge of every situation',
      rarity: getRarity(15),
      image: 'badge_leader',
    },
    days: generateDays(
      'Practice leading',
      [
        'Make a decision for a group without asking',
        'Suggest a specific plan instead of "whatever you want"',
        'Lead a conversation topic change',
        'Make 3 decisions quickly without hesitation',
        'Lead someone to a different location mid-conversation',
        'Make plans by stating, not asking',
        'Lead 3 social interactions',
        "Practice 'we should...' instead of 'do you want to...'",
        'Take the lead in planning something',
        'Be the one who decides where to go, what to do',
        'Lead a small group activity',
        'Practice decisive body language (leading gestures)',
        'Make all decisions in a date/interaction',
        'Lead through uncertainty - pick something and commit',
        'Be the organizer for a group activity',
        'Lead conversations to deeper topics',
        'Take charge of logistics in any interaction',
        'Lead naturally in all social situations',
        'Become the default leader in your circles',
        'Lead multiple interactions in one day',
        'Be the decisive leader in every situation',
      ],
      [
        "Leaders make decisions - followers ask questions",
        "A mediocre decision made confidently beats a perfect one made hesitantly",
        "'Let's go here' not 'where do you want to go'",
        "Lead the logistics, let her lead the vibe",
        "People want to be led - give them permission",
      ]
    ),
  },
  {
    id: 16,
    title: 'Storytelling Mastery',
    description:
      'Become a captivating storyteller. Learn to share experiences that engage, entertain, and connect.',
    tier: getTier(16),
    mintFee: MINT_FEES[16],
    requiredChallengeId: 15,
    badge: {
      name: 'The Storyteller',
      description: 'Captivates anyone with stories',
      rarity: getRarity(16),
      image: 'badge_story',
    },
    days: generateDays(
      'Practice storytelling',
      [
        'Tell 1 personal story in a conversation',
        'Share a story that makes someone laugh',
        'Practice story structure: hook, build, payoff',
        'Tell a story that reveals something about you',
        'Share 2 engaging stories',
        'Practice emotional variation in storytelling',
        'Tell a story with dialogue and characters',
        'Share a story that creates connection',
        'Practice the "we" story - making her part of it',
        'Tell 3 stories in one day',
        'Master the art of the callback',
        'Tell a story that holds attention for 2+ minutes',
        'Practice vulnerable storytelling',
        'Share stories that spike emotions',
        'Tell a story that leads to physical escalation',
        'Master multiple story types (funny, adventurous, deep)',
        'Tell stories that make you memorable',
        'Practice weaving stories into natural conversation',
        'Become known as a great storyteller',
        'Tell stories that create strong emotional responses',
        'Captivate anyone with your storytelling',
      ],
      [
        "Stories > facts for connection",
        "Start in the middle of the action",
        "Emotions, not details, make stories stick",
        "Make them feel something",
        "Your stories should show, not tell",
      ]
    ),
  },
  {
    id: 17,
    title: 'Frame Control',
    description:
      'Master the art of frame control. Hold your reality strong and let others enter your world.',
    tier: getTier(17),
    mintFee: MINT_FEES[17],
    requiredChallengeId: 16,
    badge: {
      name: 'The Frame Master',
      description: 'Holds frame in any situation',
      rarity: getRarity(17),
      image: 'badge_frame',
    },
    days: generateDays(
      'Practice frame control',
      [
        'Hold your opinion even when challenged',
        "Don't seek validation - make a statement and own it",
        "Practice 'amused mastery' when tested",
        "Don't explain or justify yourself unnecessarily",
        'Hold frame during a disagreement',
        "Practice the 'unreactive' response to provocation",
        "Don't ask for permission - state your intentions",
        'Maintain composure when someone tries to throw you off',
        'Practice setting the frame for an interaction',
        "Don't apologize unless genuinely warranted",
        'Hold frame when someone challenges your choices',
        "Practice 'agree and amplify' to maintain frame",
        'Set the tone for every interaction',
        "Don't react - respond",
        'Practice frame control with strangers',
        'Maintain frame in uncomfortable situations',
        'Make others enter your reality, not vice versa',
        'Practice advanced frame battles',
        'Hold frame automatically without thinking',
        'Master frame control in all situations',
        'Be completely unshakeable in your frame',
      ],
      [
        "The one with the strongest frame wins",
        "Never explain, never complain",
        "Amused > defensive when challenged",
        "Your reality should be stronger than her tests",
        "Frame is about internal belief, not external behavior",
      ]
    ),
  },
  {
    id: 18,
    title: 'Group Dynamics',
    description:
      'Master approaching and engaging groups. Learn to win over friends and handle group dynamics.',
    tier: getTier(18),
    mintFee: MINT_FEES[18],
    requiredChallengeId: 17,
    badge: {
      name: 'The Social Master',
      description: 'Commands any group dynamic',
      rarity: getRarity(18),
      image: 'badge_group',
    },
    days: generateDays(
      'Master group dynamics',
      [
        'Approach a group of 2',
        'Engage a group and win over everyone',
        'Approach a 2-set and focus on your target',
        'Practice including everyone initially',
        'Navigate a 3-person group approach',
        'Win over the obstacle (friend)',
        'Approach a mixed gender group',
        'Master the group-to-individual transition',
        'Approach a group and isolate your target',
        'Handle a protective friend gracefully',
        'Approach a large group (4+)',
        'Create instant rapport with the whole group',
        'Master the art of the wing (helping a friend)',
        'Lead group decisions and activities',
        'Approach groups and get multiple contacts',
        'Handle group interruptions smoothly',
        'Master complex group dynamics',
        'Approach any group size confidently',
        'Become the center of group attention',
        'Navigate the most challenging group sets',
        'Handle any group dynamic with ease',
      ],
      [
        "Win the group before the individual",
        "The friend is the gateway, not the obstacle",
        "Include everyone initially, isolate later",
        "High energy matches group energy",
        "Position yourself as the leader of fun",
      ]
    ),
  },

  // ============================================
  // MASTER TIER (19-21) - 0.07 SOL
  // ============================================
  {
    id: 19,
    title: 'Same Night Success',
    description:
      'Master the full sequence in one night. From approach to close, execute flawlessly.',
    tier: getTier(19),
    mintFee: MINT_FEES[19],
    requiredChallengeId: 18,
    badge: {
      name: 'The Closer',
      description: 'Achieves same-night success consistently',
      rarity: getRarity(19),
      image: 'badge_closer',
    },
    days: generateDays(
      'Master same-night success',
      [
        'Go out with the intention of same-night success',
        'Practice the full sequence: approach to close',
        'Work on venue changing during a night',
        'Practice physical escalation in a night interaction',
        'Execute the pull sequence',
        'Handle logistics smoothly in a night interaction',
        'Practice the "let\'s get out of here" transition',
        'Master the after-party bounce',
        'Work through objections to leaving together',
        'Complete the full night game sequence',
        'Practice multiple venue changes in one night',
        'Master physical escalation timing',
        'Execute clean pulls with good logistics',
        'Handle end-of-night interactions confidently',
        'Master the timing of the close',
        'Practice advanced pull techniques',
        'Execute same-night success',
        'Refine your night game system',
        'Master the art of the same-night pull',
        'Execute flawlessly under any circumstance',
        'Achieve consistent same-night success',
      ],
      [
        "Logistics are king at night",
        "The pull is a continuation, not a negotiation",
        "Her buying temperature matters",
        "Lead always - doubt kills the pull",
        "Have a plan but stay flexible",
      ]
    ),
  },
  {
    id: 20,
    title: 'Complete Abundance',
    description:
      'Embody true abundance mentality. Multiple options, zero neediness, complete outcome independence.',
    tier: getTier(20),
    mintFee: MINT_FEES[20],
    requiredChallengeId: 19,
    badge: {
      name: 'The Abundant',
      description: 'Lives in complete abundance',
      rarity: getRarity(20),
      image: 'badge_abundance',
    },
    days: generateDays(
      'Embody abundance',
      [
        'Have conversations with 5+ women in one day',
        'Practice non-attachment with every interaction',
        'Date multiple people simultaneously',
        'Walk away from an interaction that isn\'t serving you',
        'Practice abundance mindset: "there\'s always more"',
        'Build a rotation through consistent approaching',
        'Practice zero neediness in all interactions',
        'Have multiple date options in one week',
        'Walk away from a good interaction to talk to someone else',
        'Practice having options, not chasing one',
        'Embody "take it or leave it" energy',
        'Have more options than time',
        'Practice genuine non-attachment to outcomes',
        'Let go of any scarcity thinking',
        'Date from abundance, not scarcity',
        'Have women competing for your time',
        'Practice screening (you choose, not just her)',
        'Embody the selector, not the selected',
        'Live in complete dating abundance',
        'Have more opportunities than you can pursue',
        'Achieve true abundance mentality',
      ],
      [
        "Abundance is a mindset before it's a reality",
        "The one who cares less has the power",
        "Having options removes neediness",
        "Screen them like they screen you",
        "You're the prize - act like it",
      ]
    ),
  },
  {
    id: 21,
    title: 'Inner Game Mastery',
    description:
      'The final challenge: complete inner game mastery. Unshakeable confidence, self-worth, and presence.',
    tier: getTier(21),
    mintFee: MINT_FEES[21],
    requiredChallengeId: 20,
    badge: {
      name: 'Sigma Ascended',
      description: 'Achieved complete inner game mastery',
      rarity: getRarity(21),
      image: 'badge_sigma',
    },
    days: generateDays(
      'Master inner game',
      [
        'Meditate on your worth for 10 minutes',
        'Approach from a place of giving, not taking',
        'Practice complete non-reaction to external validation',
        'Identify and release one limiting belief',
        'Act from your own standards, not others\' expectations',
        'Practice radical self-acceptance',
        'Approach with zero outcome dependence',
        'Release attachment to any specific person',
        'Practice being the "source" of good emotions',
        'Live entirely in your own frame',
        'Practice complete self-validation',
        'Release the need for external approval',
        'Operate from abundance in all areas',
        'Practice unconditional confidence',
        'Be completely comfortable with who you are',
        'Live from your own truth',
        'Practice giving without expectation',
        'Embody complete inner freedom',
        'Achieve unshakeable self-worth',
        'Live in alignment with your highest self',
        'Complete the transformation - you are enough',
      ],
      [
        "You are the source - everything else is reflection",
        "Confidence comes from within, not from results",
        "Self-worth is not negotiable",
        "You're already complete - this is just refinement",
        "The master knows he knows nothing - stay humble",
      ]
    ),
  },
]

// Helper functions
export const getChallengeById = (id: number): Challenge | undefined =>
  CHALLENGES.find((c) => c.id === id)

export const getChallengesByTier = (tier: ChallengeTier): Challenge[] =>
  CHALLENGES.filter((c) => c.tier === tier)

export const getNextChallenge = (currentId: number): Challenge | undefined =>
  CHALLENGES.find((c) => c.id === currentId + 1)

export const getAvailableChallenges = (
  completedIds: number[]
): Challenge[] => {
  return CHALLENGES.filter((challenge) => {
    // Already completed
    if (completedIds.includes(challenge.id)) return false
    // Check if prerequisite is met
    if (challenge.requiredChallengeId === null) return true
    return completedIds.includes(challenge.requiredChallengeId)
  })
}

export const getTotalMintFees = (): number =>
  CHALLENGES.reduce((sum, c) => sum + c.mintFee, 0)
