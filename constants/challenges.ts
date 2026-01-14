/**
 * 21-S Challenge Definitions
 * Linear progression - complete one to unlock the next
 * Each day: 1-3 micro tasks (~30 min total)
 */

import { Challenge, ChallengeTier, BadgeRarity } from '@/types/challenges'

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

export const CHALLENGES: Challenge[] = [
  // ============================================
  // CHALLENGE 1: Eye Contact
  // ============================================
  {
    id: 1,
    title: 'Eye Contact',
    description: 'Build confidence through eye contact with strangers.',
    tier: getTier(1),
    mintFee: 0.02,
    requiredChallengeId: null,
    badge: {
      name: 'The Observer',
      description: 'Mastered confident eye contact',
      rarity: getRarity(1),
      image: 'badge_eye_contact',
    },
    days: [
      { day: 1, task: 'Make eye contact with 3 strangers', tip: 'Just brief eye contact, no smile needed' },
      { day: 2, task: 'Make eye contact with 5 strangers', tip: 'Hold for 1-2 seconds' },
      { day: 3, task: 'Hold eye contact until they look away (3 times)', tip: 'Stay relaxed, breathe normally' },
      { day: 4, task: 'Eye contact + slight smile (5 people)', tip: 'Smile with your eyes' },
      { day: 5, task: 'Make eye contact with 7 people', tip: 'Mix different situations' },
      { day: 6, task: 'Hold eye contact for 3 seconds (5 times)', tip: 'Count in your head' },
      { day: 7, task: 'Eye contact with someone attractive', tip: 'Same as anyone else' },
      { day: 8, task: 'Eye contact in conversation (1 min total)', tip: 'Focus on one eye' },
      { day: 9, task: 'Make 10 eye contacts today', tip: 'Spread throughout day' },
      { day: 10, task: 'Eye contact first in every interaction', tip: 'You initiate' },
      { day: 11, task: 'Triangle gaze practice (5 people)', tip: 'Eyes, nose, eyes pattern' },
      { day: 12, task: 'Hold eye contact while listening', tip: 'Shows engagement' },
      { day: 13, task: 'Eye contact with authority figures', tip: 'Same confidence level' },
      { day: 14, task: 'Make 12 eye contacts', tip: 'Building habit' },
      { day: 15, task: 'Soft eye contact practice (relaxed)', tip: 'Not staring, present' },
      { day: 16, task: 'Eye contact walking past people (10x)', tip: 'Quick but confident' },
      { day: 17, task: 'Full conversation with strong eye contact', tip: 'Natural breaks okay' },
      { day: 18, task: 'Eye contact in crowded place (15x)', tip: 'More challenging environment' },
      { day: 19, task: 'Make eye contact without looking away first (10x)', tip: 'You hold frame' },
      { day: 20, task: 'Eye contact with smile and nod (10x)', tip: 'Acknowledge them' },
      { day: 21, task: 'Make 20 confident eye contacts', tip: 'Natural and effortless now' },
    ],
  },

  // ============================================
  // CHALLENGE 2: Posture & Presence
  // ============================================
  {
    id: 2,
    title: 'Posture & Presence',
    description: 'Command attention through body language.',
    tier: getTier(2),
    mintFee: 0.02,
    requiredChallengeId: 1,
    badge: {
      name: 'The Pillar',
      description: 'Radiates powerful presence',
      rarity: getRarity(2),
      image: 'badge_posture',
    },
    days: [
      { day: 1, task: 'Shoulders back for 1 hour', tip: 'Set reminders' },
      { day: 2, task: 'Walk with chin parallel to ground', tip: 'All day awareness' },
      { day: 3, task: 'Power pose for 2 minutes before leaving', tip: 'Hands on hips, chest out' },
      { day: 4, task: 'Take up space when sitting (3 times)', tip: 'Spread out naturally' },
      { day: 5, task: 'Walk slower than usual', tip: 'Deliberate, not rushed' },
      { day: 6, task: 'No hands in pockets for 2 hours', tip: 'Visible and open' },
      { day: 7, task: 'Stand in grounded stance (3 times)', tip: 'Feet shoulder width' },
      { day: 8, task: 'Enter a room and pause at doorway', tip: 'Survey before entering' },
      { day: 9, task: 'Sit at head of table position', tip: 'Take prominent spot' },
      { day: 10, task: 'Walk through crowd without moving first', tip: 'Hold your line' },
      { day: 11, task: 'Open body language all conversations', tip: 'Arms uncrossed' },
      { day: 12, task: 'Stand while others sit (once)', tip: 'Naturally, not awkward' },
      { day: 13, task: 'Perfect posture for work session', tip: 'Back straight, engaged' },
      { day: 14, task: 'Walk like you own every room', tip: 'Confidence in movement' },
      { day: 15, task: 'Take up space on public transport', tip: 'Your natural space' },
      { day: 16, task: 'Enter room and make presence known', tip: 'Confident entry' },
      { day: 17, task: 'Stand confidently while waiting (no phone)', tip: 'Just be present' },
      { day: 18, task: 'Power pose before important moment', tip: 'Build the habit' },
      { day: 19, task: 'Move with purpose all day', tip: 'No nervous movements' },
      { day: 20, task: 'Maintain posture during full conversation', tip: 'Awareness throughout' },
      { day: 21, task: 'Embody confident presence all day', tip: 'It\'s who you are now' },
    ],
  },

  // ============================================
  // CHALLENGE 3: Voice & Speaking
  // ============================================
  {
    id: 3,
    title: 'Voice & Speaking',
    description: 'Develop a clear, confident voice.',
    tier: getTier(3),
    mintFee: 0.02,
    requiredChallengeId: 2,
    badge: {
      name: 'The Voice',
      description: 'Commands attention vocally',
      rarity: getRarity(3),
      image: 'badge_voice',
    },
    days: [
      { day: 1, task: 'Order food clearly (heard first time)', tip: 'Project, don\'t mumble' },
      { day: 2, task: 'Say "excuse me" audibly (3 times)', tip: 'Loud enough from 10 feet' },
      { day: 3, task: 'Speak 20% louder in conversation', tip: 'Slightly above normal' },
      { day: 4, task: 'Record yourself, listen back', tip: 'Notice your patterns' },
      { day: 5, task: 'Speak from diaphragm (practice)', tip: 'Deep breath first' },
      { day: 6, task: 'End statements going down (not up)', tip: 'Confident, not questioning' },
      { day: 7, task: 'Say someone\'s name clearly', tip: 'When greeting them' },
      { day: 8, task: 'Project voice across room once', tip: 'Get attention verbally' },
      { day: 9, task: 'Speak slowly in one conversation', tip: 'Pause between thoughts' },
      { day: 10, task: 'Finish sentences strong', tip: 'Don\'t trail off' },
      { day: 11, task: 'Ask for something in clear voice', tip: 'Direct request' },
      { day: 12, task: 'Vary your pitch when speaking', tip: 'Not monotone' },
      { day: 13, task: 'No filler words (um, like) - 1 conversation', tip: 'Pause instead' },
      { day: 14, task: 'Make a phone call speaking confidently', tip: 'Voice only, no visuals' },
      { day: 15, task: 'Give compliment in clear voice', tip: 'Audible and genuine' },
      { day: 16, task: 'Use power pause before key point', tip: 'Silence for emphasis' },
      { day: 17, task: 'Speak to be heard without visuals', tip: 'Voice carries message' },
      { day: 18, task: 'Lead short conversation with voice', tip: 'Set the energy' },
      { day: 19, task: 'Speak to small group (3+ people)', tip: 'Project to all' },
      { day: 20, task: 'Tell short story with good delivery', tip: 'Engage with voice' },
      { day: 21, task: 'Command conversation with voice alone', tip: 'Natural authority' },
    ],
  },

  // ============================================
  // CHALLENGE 4: Acknowledgments
  // ============================================
  {
    id: 4,
    title: 'Acknowledgments',
    description: 'Break social barriers with simple acknowledgments.',
    tier: getTier(4),
    mintFee: 0.02,
    requiredChallengeId: 3,
    badge: {
      name: 'The Acknowledger',
      description: 'Breaks ice effortlessly',
      rarity: getRarity(4),
      image: 'badge_acknowledge',
    },
    days: [
      { day: 1, task: 'Nod at 3 strangers', tip: 'Brief head nod' },
      { day: 2, task: 'Nod at 5 strangers', tip: 'Confident upward nod' },
      { day: 3, task: 'Smile and nod (5 people)', tip: 'Friendly acknowledgment' },
      { day: 4, task: 'Wave at someone you see', tip: 'Brief, casual wave' },
      { day: 5, task: 'Say "hey" to 3 strangers in passing', tip: 'Quick, keep walking' },
      { day: 6, task: 'Nod at 10 people today', tip: 'Throughout day' },
      { day: 7, task: 'Say "how\'s it going" (3 times)', tip: 'In passing, not stopping' },
      { day: 8, task: 'Thumbs up or wave to stranger', tip: 'Positive gesture' },
      { day: 9, task: 'Acknowledge 15 people', tip: 'Any method' },
      { day: 10, task: 'Say brief greeting to 5 strangers', tip: '"Morning" or "Hey"' },
      { day: 11, task: 'Acknowledge everyone in hallway', tip: 'All of them' },
      { day: 12, task: 'Wave to someone across street', tip: 'Distance acknowledgment' },
      { day: 13, task: 'Greet for 1 hour straight', tip: 'Everyone you pass' },
      { day: 14, task: 'Nod + eye contact (15 people)', tip: 'Combined skill' },
      { day: 15, task: 'Greet every cashier/server today', tip: 'Genuine greeting' },
      { day: 16, task: 'Wave from car or while walking', tip: 'Different contexts' },
      { day: 17, task: 'Acknowledge strangers in elevator', tip: 'Close quarters' },
      { day: 18, task: 'Greet first (before they do)', tip: 'You initiate' },
      { day: 19, task: 'Acknowledge everyone on short walk', tip: 'Continuous practice' },
      { day: 20, task: 'Make it feel natural (20 people)', tip: 'No effort feeling' },
      { day: 21, task: 'Acknowledge 25+ throughout day', tip: 'Second nature now' },
    ],
  },

  // ============================================
  // CHALLENGE 5: Simple Openers
  // ============================================
  {
    id: 5,
    title: 'Simple Openers',
    description: 'Start basic conversations with anyone.',
    tier: getTier(5),
    mintFee: 0.02,
    requiredChallengeId: 4,
    badge: {
      name: 'The Initiator',
      description: 'Starts conversations naturally',
      rarity: getRarity(5),
      image: 'badge_opener',
    },
    days: [
      { day: 1, task: 'Ask 1 stranger for the time', tip: 'Simple question' },
      { day: 2, task: 'Ask 2 strangers for directions', tip: 'Even if you know' },
      { day: 3, task: 'Comment on weather to stranger', tip: 'Observational' },
      { day: 4, task: 'Ask 3 simple questions to strangers', tip: 'Any questions' },
      { day: 5, task: 'Comment on something nearby', tip: 'Environment observation' },
      { day: 6, task: 'Ask opinion (coffee, food, etc)', tip: '"Is this place good?"' },
      { day: 7, task: 'Say "nice [item]" to 3 people', tip: 'Something they chose' },
      { day: 8, task: 'Ask 5 strangers simple questions', tip: 'Building volume' },
      { day: 9, task: 'Use "hey, quick question..." (3 times)', tip: 'Easy opener' },
      { day: 10, task: 'Make 3 observations to strangers', tip: '"That looks good"' },
      { day: 11, task: 'Ask for recommendation', tip: '"Know any good..."' },
      { day: 12, task: 'Comment on what they\'re doing', tip: 'Non-creepy observation' },
      { day: 13, task: 'Start 5 conversations today', tip: 'Simple openers only' },
      { day: 14, task: '"Excuse me, I noticed..."', tip: 'Practice this format' },
      { day: 15, task: 'Ask about something they know', tip: 'They look expert in' },
      { day: 16, task: 'Make 7 observations/comments', tip: 'To strangers' },
      { day: 17, task: 'Start and extend 1 past "hi"', tip: '2+ exchanges' },
      { day: 18, task: 'Open 5, extend 2 past first line', tip: 'Keep some going' },
      { day: 19, task: 'Practice in different places', tip: 'Various environments' },
      { day: 20, task: 'Start 10 conversations', tip: 'Volume day' },
      { day: 21, task: 'Feel natural opening with anyone', tip: 'No hesitation' },
    ],
  },

  // ============================================
  // CHALLENGE 6: Direct Introduction
  // ============================================
  {
    id: 6,
    title: 'Direct Introduction',
    description: 'Introduce yourself directly to strangers.',
    tier: getTier(6),
    mintFee: 0.03,
    requiredChallengeId: 5,
    badge: {
      name: 'The Approacher',
      description: 'Fearlessly introduces themselves',
      rarity: getRarity(6),
      image: 'badge_approach',
    },
    days: [
      { day: 1, task: 'Introduce yourself to 1 stranger', tip: '"Hey, I\'m [name]"' },
      { day: 2, task: '"Hey, wanted to meet you, I\'m..."', tip: 'Direct opener' },
      { day: 3, task: 'Make 2 direct introductions', tip: 'State intention' },
      { day: 4, task: 'Compliment + introduction', tip: '"I liked X, I\'m..."' },
      { day: 5, task: '2 approaches with direct opener', tip: 'Clear intent' },
      { day: 6, task: 'Introduce yourself 3 times', tip: 'Building comfort' },
      { day: 7, task: '3-second rule (approach fast)', tip: 'No hesitation' },
      { day: 8, task: '3 approaches with good body language', tip: 'All skills combine' },
      { day: 9, task: 'Approach someone who looks busy', tip: 'Still polite, still works' },
      { day: 10, task: 'Make 4 direct approaches', tip: 'Volume increase' },
      { day: 11, task: 'Approach someone attractive', tip: 'Same as anyone' },
      { day: 12, task: 'Approach from front (not behind)', tip: 'More direct' },
      { day: 13, task: '4 approaches, exchange names', tip: 'Get their name too' },
      { day: 14, task: '5 strangers with introduction', tip: 'Consistent practice' },
      { day: 15, task: '"I know this is random but hi"', tip: 'Acknowledging approach' },
      { day: 16, task: '5 approaches, different locations', tip: 'Vary context' },
      { day: 17, task: 'Approach someone in small group', tip: 'Address the one' },
      { day: 18, task: '5 approaches with strong eye contact', tip: 'All skills' },
      { day: 19, task: 'Handle "not interested" gracefully', tip: '"No worries, have a good one"' },
      { day: 20, task: '6 approaches with full confidence', tip: 'Smooth delivery' },
      { day: 21, task: '7+ approaches, feels natural', tip: 'This is you now' },
    ],
  },

  // ============================================
  // CHALLENGE 7: Genuine Compliments
  // ============================================
  {
    id: 7,
    title: 'Genuine Compliments',
    description: 'Give authentic, meaningful compliments.',
    tier: getTier(7),
    mintFee: 0.03,
    requiredChallengeId: 6,
    badge: {
      name: 'The Appreciator',
      description: 'Compliments that resonate',
      rarity: getRarity(7),
      image: 'badge_compliment',
    },
    days: [
      { day: 1, task: 'Give 1 genuine compliment', tip: 'Something specific' },
      { day: 2, task: '2 compliments on choices (not body)', tip: 'Style, items, etc' },
      { day: 3, task: 'Compliment energy/vibe', tip: '"You have great energy"' },
      { day: 4, task: '3 specific compliments', tip: 'Not generic' },
      { day: 5, task: 'Explain why you noticed it', tip: '"I liked X because..."' },
      { day: 6, task: 'Compliment action/behavior', tip: 'What they did' },
      { day: 7, task: '3 meaningful compliments', tip: 'Make them feel seen' },
      { day: 8, task: 'Compliment showing observation', tip: 'You noticed detail' },
      { day: 9, task: '4 compliments throughout day', tip: 'Spread out' },
      { day: 10, task: 'Compliment presence/energy', tip: 'Non-physical' },
      { day: 11, task: 'Make someone genuinely smile', tip: 'Real reaction' },
      { day: 12, task: '4 non-physical compliments', tip: 'Choices, energy, style' },
      { day: 13, task: 'Compliment + continue conversation', tip: 'Not just hit and run' },
      { day: 14, task: 'Notice what others miss', tip: 'Unique observation' },
      { day: 15, task: '5 genuine specific compliments', tip: 'Quality over generic' },
      { day: 16, task: 'Compliment taste/choices', tip: '"Great taste in..."' },
      { day: 17, task: 'Compliment that sparks conversation', tip: 'Opens dialogue' },
      { day: 18, task: '5 compliments, gauge reactions', tip: 'Learn what lands' },
      { day: 19, task: 'Make compliments feel natural', tip: 'Not forced' },
      { day: 20, task: 'Master unexpected compliment', tip: 'Surprising but genuine' },
      { day: 21, task: '7+ genuine compliments', tip: 'Second nature' },
    ],
  },

  // ============================================
  // CHALLENGE 8: Conversation Flow
  // ============================================
  {
    id: 8,
    title: 'Conversation Flow',
    description: 'Keep conversations going naturally.',
    tier: getTier(8),
    mintFee: 0.03,
    requiredChallengeId: 7,
    badge: {
      name: 'The Conversationalist',
      description: 'Never runs out of words',
      rarity: getRarity(8),
      image: 'badge_conversation',
    },
    days: [
      { day: 1, task: '1 conversation past 2 minutes', tip: 'Keep it going' },
      { day: 2, task: 'Pick up thread and expand', tip: 'What they mentioned' },
      { day: 3, task: '3+ back and forth exchanges', tip: 'Real conversation' },
      { day: 4, task: '"That reminds me of..."', tip: 'Threading technique' },
      { day: 5, task: '2 conversations past small talk', tip: 'Go deeper' },
      { day: 6, task: 'Ask follow-up questions', tip: 'Show real interest' },
      { day: 7, task: '5+ minute conversation', tip: 'Extended flow' },
      { day: 8, task: 'Reference what they said earlier', tip: 'Active listening' },
      { day: 9, task: 'Thread to personal story', tip: 'Share related experience' },
      { day: 10, task: '2 conversations flowing naturally', tip: 'No awkward pauses' },
      { day: 11, task: 'Keyword technique (pick up words)', tip: 'Branch from their words' },
      { day: 12, task: 'Get them talking more than you', tip: 'Listen and prompt' },
      { day: 13, task: '3 threads in one conversation', tip: 'Topic changes' },
      { day: 14, task: 'Keep it interesting throughout', tip: 'Variety' },
      { day: 15, task: 'Smooth topic transitions', tip: 'Natural bridges' },
      { day: 16, task: '2 conversations 5+ minutes', tip: 'Sustained' },
      { day: 17, task: 'Make it feel effortless', tip: 'No forcing' },
      { day: 18, task: '5+ threads navigated', tip: 'Complex conversation' },
      { day: 19, task: 'Keep someone engaged 10 mins', tip: 'Long form' },
      { day: 20, task: 'Multiple substantial conversations', tip: '3+ meaningful chats' },
      { day: 21, task: '3 conversations that flow naturally', tip: 'Mastery' },
    ],
  },

  // ============================================
  // CHALLENGE 9: Rejection Resilience
  // ============================================
  {
    id: 9,
    title: 'Rejection Resilience',
    description: 'Build immunity to rejection.',
    tier: getTier(9),
    mintFee: 0.03,
    requiredChallengeId: 8,
    badge: {
      name: 'The Unshakeable',
      description: 'Rejection rolls off',
      rarity: getRarity(9),
      image: 'badge_rejection',
    },
    days: [
      { day: 1, task: 'Approach expecting nothing', tip: 'Zero attachment' },
      { day: 2, task: 'Get rejected, approach again', tip: 'Immediately after' },
      { day: 3, task: 'Ask for something unreasonable', tip: 'Practice hearing no' },
      { day: 4, task: '"No worries, have a good one"', tip: 'Graceful exit' },
      { day: 5, task: '3 approaches regardless of outcome', tip: 'Numbers game' },
      { day: 6, task: 'Analyze rejection without self-blame', tip: 'It\'s information' },
      { day: 7, task: 'Ask for something expecting denial', tip: 'Desensitize to no' },
      { day: 8, task: '4 approaches, track feelings', tip: 'Notice your reaction' },
      { day: 9, task: 'Smile and move on practice', tip: 'Quick recovery' },
      { day: 10, task: 'Get 2+ rejections, keep going', tip: 'Push through' },
      { day: 11, task: 'Approach with no outcome attachment', tip: 'Pure action' },
      { day: 12, task: '5 approaches, focus on delivery only', tip: 'Not results' },
      { day: 13, task: 'Reframe: "not a match"', tip: 'Not rejection' },
      { day: 14, task: 'Get rejected, approach within 5 mins', tip: 'Fast recovery' },
      { day: 15, task: 'Approach "out of league"', tip: 'There\'s no league' },
      { day: 16, task: '5 approaches, zero attachment', tip: 'Freedom' },
      { day: 17, task: 'Gratitude even after rejection', tip: 'Thank the experience' },
      { day: 18, task: 'Handle rejection with composure', tip: 'Calm response' },
      { day: 19, task: 'Make rejection feel neutral', tip: 'No emotional charge' },
      { day: 20, task: '3+ rejections, feel fine', tip: 'Truly unbothered' },
      { day: 21, task: '7+ approaches, outcome independent', tip: 'Complete freedom' },
    ],
  },

  // ============================================
  // CHALLENGE 10: Contact Exchange
  // ============================================
  {
    id: 10,
    title: 'Contact Exchange',
    description: 'Smoothly exchange numbers.',
    tier: getTier(10),
    mintFee: 0.04,
    requiredChallengeId: 9,
    badge: {
      name: 'The Connector',
      description: 'Secures connections easily',
      rarity: getRarity(10),
      image: 'badge_number',
    },
    days: [
      { day: 1, task: 'Conversation with intent to ask', tip: 'Know you\'ll ask' },
      { day: 2, task: 'Ask 1 person for number/socials', tip: 'Make the ask' },
      { day: 3, task: '"We should continue this - number?"', tip: 'Direct close' },
      { day: 4, task: 'Ask 2 people for contact', tip: 'Building habit' },
      { day: 5, task: 'Get 1 number after real conversation', tip: 'Earned exchange' },
      { day: 6, task: 'Try different ask styles', tip: 'Find your way' },
      { day: 7, task: 'Ask 2, get at least 1', tip: 'Numbers game' },
      { day: 8, task: '"Let me text you" method', tip: 'Hand over phone' },
      { day: 9, task: 'Get 2 numbers in one day', tip: 'Volume' },
      { day: 10, task: '"Put your number in"', tip: 'Assumptive close' },
      { day: 11, task: 'Ask 3 for contact info', tip: 'More attempts' },
      { day: 12, task: 'Get 2 genuine exchanges', tip: 'Quality connections' },
      { day: 13, task: 'Try different closing styles', tip: 'Experiment' },
      { day: 14, task: 'Exchange after 5+ min conversation', tip: 'Built rapport' },
      { day: 15, task: '2 numbers with smooth close', tip: 'No awkwardness' },
      { day: 16, task: 'Ask without hesitation', tip: 'Direct and clear' },
      { day: 17, task: 'Get 3 numbers today', tip: 'Push volume' },
      { day: 18, task: 'Confident direct ask', tip: '"Give me your number"' },
      { day: 19, task: 'Close 3 conversations with exchange', tip: 'Consistent closing' },
      { day: 20, task: 'Make it feel natural', tip: 'No big deal' },
      { day: 21, task: '4+ numbers, smooth closes', tip: 'Mastery' },
    ],
  },

  // ============================================
  // CHALLENGE 11: Day Game
  // ============================================
  {
    id: 11,
    title: 'Day Game',
    description: 'Approach confidently during the day.',
    tier: getTier(11),
    mintFee: 0.04,
    requiredChallengeId: 10,
    badge: {
      name: 'Day Walker',
      description: 'Approaches anywhere, anytime',
      rarity: getRarity(11),
      image: 'badge_daygame',
    },
    days: [
      { day: 1, task: '1 approach in coffee shop', tip: 'Casual environment' },
      { day: 2, task: '1 approach on street', tip: 'Moving target' },
      { day: 3, task: '2 day approaches, different venues', tip: 'Variety' },
      { day: 4, task: 'Approach in a store', tip: 'Shopping context' },
      { day: 5, task: '3 day game approaches', tip: 'Building volume' },
      { day: 6, task: 'Street stop approach', tip: 'Stop walking person' },
      { day: 7, task: '3 approaches, 3 environments', tip: 'Adaptability' },
      { day: 8, task: 'Master coffee shop approach', tip: 'Natural setting' },
      { day: 9, task: '4 day approaches', tip: 'Consistency' },
      { day: 10, task: 'Approach moving target', tip: 'Walking person' },
      { day: 11, task: 'Day approaches in busy place', tip: 'Crowded area' },
      { day: 12, task: 'Get 1 number from day approach', tip: 'Close it' },
      { day: 13, task: '5 day approaches', tip: 'Higher volume' },
      { day: 14, task: '"Let\'s grab coffee now"', tip: 'Instant date attempt' },
      { day: 15, task: 'Parks, bookstores, casual venues', tip: 'New contexts' },
      { day: 16, task: '2 numbers from day game', tip: 'Results focus' },
      { day: 17, task: '5 approaches, confident delivery', tip: 'Quality approaches' },
      { day: 18, task: 'Different day game locations', tip: 'Expand comfort zone' },
      { day: 19, task: 'Make day approaches natural', tip: 'Not weird to you' },
      { day: 20, task: '2+ numbers in one session', tip: 'Productive session' },
      { day: 21, task: '7+ day approaches', tip: 'Complete comfort' },
    ],
  },

  // ============================================
  // CHALLENGE 12: Instant Dates
  // ============================================
  {
    id: 12,
    title: 'Instant Dates',
    description: 'Turn approaches into immediate dates.',
    tier: getTier(12),
    mintFee: 0.04,
    requiredChallengeId: 11,
    badge: {
      name: 'The Spontaneous',
      description: 'Creates instant dates',
      rarity: getRarity(12),
      image: 'badge_instant',
    },
    days: [
      { day: 1, task: 'Attempt 1 instant date', tip: '"Let\'s grab coffee now"' },
      { day: 2, task: '"Join me for..."', tip: 'Invitation frame' },
      { day: 3, task: '2 instant date attempts', tip: 'Not all will accept' },
      { day: 4, task: 'Different instant suggestions', tip: 'Coffee, walk, etc' },
      { day: 5, task: 'Get 1 instant date (even 10 min)', tip: 'Any duration counts' },
      { day: 6, task: 'Try different contexts', tip: 'Various settings' },
      { day: 7, task: '3 instant date attempts', tip: 'Volume' },
      { day: 8, task: 'Overcome "I can\'t right now"', tip: '"Just 10 minutes"' },
      { day: 9, task: '1 instant date 15+ minutes', tip: 'Longer interaction' },
      { day: 10, task: '"I was heading to X, come with"', tip: 'Natural invitation' },
      { day: 11, task: '3 attempts, get 1', tip: 'Numbers game' },
      { day: 12, task: 'Seamless transition to date', tip: 'Smooth flow' },
      { day: 13, task: 'Instant date in new environment', tip: 'New venue' },
      { day: 14, task: 'Master venue suggestions', tip: 'Know good spots' },
      { day: 15, task: '2 instant dates this week', tip: 'Accumulating' },
      { day: 16, task: 'Time constraint technique', tip: '"I have 15 mins"' },
      { day: 17, task: 'Extend instant date past plan', tip: 'Going well = stay' },
      { day: 18, task: 'Make instant date your default', tip: 'Always suggest' },
      { day: 19, task: '5 instant date attempts', tip: 'High volume day' },
      { day: 20, task: '2 instant dates in one day', tip: 'Productive day' },
      { day: 21, task: 'Instant date feels natural', tip: 'Standard approach' },
    ],
  },

  // ============================================
  // CHALLENGE 13: Playful Banter
  // ============================================
  {
    id: 13,
    title: 'Playful Banter',
    description: 'Add fun and teasing to interactions.',
    tier: getTier(13),
    mintFee: 0.05,
    requiredChallengeId: 12,
    badge: {
      name: 'The Playful',
      description: 'Creates fun tension',
      rarity: getRarity(13),
      image: 'badge_tease',
    },
    days: [
      { day: 1, task: 'Playful comment in 1 conversation', tip: 'Light and fun' },
      { day: 2, task: 'Light tease, watch reaction', tip: 'Keep it friendly' },
      { day: 3, task: '"Agree and amplify" absurdly', tip: 'Exaggerate playfully' },
      { day: 4, task: 'Push-pull in conversation', tip: 'Compliment then tease' },
      { day: 5, task: 'Tease someone you just met', tip: 'Early banter' },
      { day: 6, task: 'Misinterpret on purpose', tip: 'Playful misunderstanding' },
      { day: 7, task: 'Banter in 3 conversations', tip: 'Consistent practice' },
      { day: 8, task: 'Give playful nickname', tip: 'In the moment' },
      { day: 9, task: 'Light tease without being mean', tip: 'Fun, not hurtful' },
      { day: 10, task: 'Create playful tension', tip: 'Engaging dynamic' },
      { day: 11, task: '"Are you hitting on me?"', tip: 'Flip the script' },
      { day: 12, task: 'Tease 5 different people', tip: 'Various contexts' },
      { day: 13, task: 'Use roleplay briefly', tip: '"We\'re like..."' },
      { day: 14, task: 'Master push-pull', tip: 'Give and take away' },
      { day: 15, task: 'Generate genuine laughter', tip: 'Real fun' },
      { day: 16, task: 'Tease that builds interest', tip: 'Attractive teasing' },
      { day: 17, task: 'Advanced banter techniques', tip: 'Callbacks, roles' },
      { day: 18, task: 'Make teasing natural', tip: 'Your style' },
      { day: 19, task: 'Banter with anyone', tip: 'Universal skill' },
      { day: 20, task: 'Balance tease and interest', tip: 'Not all tease' },
      { day: 21, task: 'Every conversation is fun', tip: 'Playful default' },
    ],
  },

  // ============================================
  // CHALLENGE 14: Leading
  // ============================================
  {
    id: 14,
    title: 'Leading',
    description: 'Take charge and make decisions.',
    tier: getTier(14),
    mintFee: 0.05,
    requiredChallengeId: 13,
    badge: {
      name: 'The Leader',
      description: 'Takes charge naturally',
      rarity: getRarity(14),
      image: 'badge_leader',
    },
    days: [
      { day: 1, task: 'Make 1 decision for group', tip: 'Without asking' },
      { day: 2, task: 'Suggest specific plan', tip: 'Not "whatever"' },
      { day: 3, task: 'Lead topic change', tip: 'You decide direction' },
      { day: 4, task: '3 decisions without hesitation', tip: 'Quick and clear' },
      { day: 5, task: 'Lead someone to new spot', tip: '"Let\'s go here"' },
      { day: 6, task: 'State plans, don\'t ask', tip: '"We\'re doing X"' },
      { day: 7, task: 'Lead 3 interactions', tip: 'Set the frame' },
      { day: 8, task: '"We should..." not "Do you want..."', tip: 'Language shift' },
      { day: 9, task: 'Take lead in planning', tip: 'You organize' },
      { day: 10, task: 'Be the decider', tip: 'Where, what, when' },
      { day: 11, task: 'Lead small group activity', tip: '3+ people' },
      { day: 12, task: 'Decisive body language', tip: 'Gestures that lead' },
      { day: 13, task: 'Make all decisions in interaction', tip: 'Full lead' },
      { day: 14, task: 'Lead through uncertainty', tip: 'Pick and commit' },
      { day: 15, task: 'Organize group activity', tip: 'You initiate' },
      { day: 16, task: 'Lead conversations deeper', tip: 'You guide topics' },
      { day: 17, task: 'Take charge of logistics', tip: 'All the details' },
      { day: 18, task: 'Lead naturally in all situations', tip: 'Default mode' },
      { day: 19, task: 'Be default leader in circles', tip: 'People expect it' },
      { day: 20, task: 'Lead multiple interactions', tip: 'Consistent' },
      { day: 21, task: 'Decisive leader in every situation', tip: 'Natural authority' },
    ],
  },

  // ============================================
  // CHALLENGE 15: Storytelling
  // ============================================
  {
    id: 15,
    title: 'Storytelling',
    description: 'Captivate with engaging stories.',
    tier: getTier(15),
    mintFee: 0.05,
    requiredChallengeId: 14,
    badge: {
      name: 'The Storyteller',
      description: 'Captivates any audience',
      rarity: getRarity(15),
      image: 'badge_story',
    },
    days: [
      { day: 1, task: 'Tell 1 personal story', tip: 'Share experience' },
      { day: 2, task: 'Story that makes them laugh', tip: 'Funny moment' },
      { day: 3, task: 'Hook, build, payoff structure', tip: 'Story arc' },
      { day: 4, task: 'Story revealing something about you', tip: 'Shows character' },
      { day: 5, task: '2 engaging stories today', tip: 'Different ones' },
      { day: 6, task: 'Emotional variation in telling', tip: 'Ups and downs' },
      { day: 7, task: 'Story with dialogue', tip: '"Then they said..."' },
      { day: 8, task: 'Story creating connection', tip: 'Relatable content' },
      { day: 9, task: '"We" story (include them)', tip: 'Make them part' },
      { day: 10, task: '3 stories in one day', tip: 'Volume practice' },
      { day: 11, task: 'Use callbacks', tip: 'Reference earlier' },
      { day: 12, task: 'Story holding attention 2+ mins', tip: 'Long form' },
      { day: 13, task: 'Vulnerable story', tip: 'Show real side' },
      { day: 14, task: 'Story that spikes emotions', tip: 'Make them feel' },
      { day: 15, task: 'Story with physical element', tip: 'Gestures, movement' },
      { day: 16, task: 'Multiple story types', tip: 'Funny, deep, wild' },
      { day: 17, task: 'Story making you memorable', tip: 'Unique angle' },
      { day: 18, task: 'Weave stories into conversation', tip: 'Natural integration' },
      { day: 19, task: 'Become known as storyteller', tip: 'Your reputation' },
      { day: 20, task: 'Strong emotional response', tip: 'Impact story' },
      { day: 21, task: 'Captivate anyone with stories', tip: 'Mastery' },
    ],
  },

  // ============================================
  // CHALLENGE 16: Frame Control
  // ============================================
  {
    id: 16,
    title: 'Frame Control',
    description: 'Hold your reality strong.',
    tier: getTier(16),
    mintFee: 0.05,
    requiredChallengeId: 15,
    badge: {
      name: 'Frame Master',
      description: 'Unshakeable reality',
      rarity: getRarity(16),
      image: 'badge_frame',
    },
    days: [
      { day: 1, task: 'Hold opinion when challenged', tip: 'Don\'t fold' },
      { day: 2, task: 'Don\'t seek validation', tip: 'State and own' },
      { day: 3, task: 'Amused mastery when tested', tip: 'Smile at tests' },
      { day: 4, task: 'Don\'t over-explain yourself', tip: 'Short answers' },
      { day: 5, task: 'Hold frame in disagreement', tip: 'Stay calm' },
      { day: 6, task: 'Unreactive to provocation', tip: 'No triggered response' },
      { day: 7, task: 'State intentions, don\'t ask permission', tip: 'You decide' },
      { day: 8, task: 'Stay composed when thrown off', tip: 'Recover quick' },
      { day: 9, task: 'Set frame for interaction', tip: 'You establish vibe' },
      { day: 10, task: 'Don\'t apologize unnecessarily', tip: 'Only when real' },
      { day: 11, task: 'Hold frame on choices', tip: 'Your decisions stand' },
      { day: 12, task: '"Agree and amplify" to maintain', tip: 'Classic technique' },
      { day: 13, task: 'Set tone every interaction', tip: 'You lead energy' },
      { day: 14, task: 'Respond, don\'t react', tip: 'Thoughtful not reactive' },
      { day: 15, task: 'Frame control with strangers', tip: 'Unknown people' },
      { day: 16, task: 'Maintain in uncomfortable situations', tip: 'Under pressure' },
      { day: 17, task: 'Others enter your reality', tip: 'They adapt to you' },
      { day: 18, task: 'Advanced frame battles', tip: 'Skilled people' },
      { day: 19, task: 'Hold frame automatically', tip: 'No thought needed' },
      { day: 20, task: 'Master all situations', tip: 'Any context' },
      { day: 21, task: 'Completely unshakeable', tip: 'Your reality is strong' },
    ],
  },

  // ============================================
  // CHALLENGE 17: Group Dynamics
  // ============================================
  {
    id: 17,
    title: 'Group Dynamics',
    description: 'Handle groups with confidence.',
    tier: getTier(17),
    mintFee: 0.06,
    requiredChallengeId: 16,
    badge: {
      name: 'Social Master',
      description: 'Commands any group',
      rarity: getRarity(17),
      image: 'badge_group',
    },
    days: [
      { day: 1, task: 'Approach group of 2', tip: 'Start small' },
      { day: 2, task: 'Win over everyone first', tip: 'Group before target' },
      { day: 3, task: '2-set, focus on your target', tip: 'After group warmup' },
      { day: 4, task: 'Include everyone initially', tip: 'No one left out' },
      { day: 5, task: 'Navigate 3-person group', tip: 'More complex' },
      { day: 6, task: 'Win over the friend', tip: 'They\'re gateway' },
      { day: 7, task: 'Mixed gender group', tip: 'Any combination' },
      { day: 8, task: 'Group to individual transition', tip: 'Smoothly isolate' },
      { day: 9, task: 'Approach group, isolate target', tip: 'Full sequence' },
      { day: 10, task: 'Handle protective friend', tip: 'Gracefully win them' },
      { day: 11, task: 'Large group (4+)', tip: 'More intimidating' },
      { day: 12, task: 'Instant rapport with whole group', tip: 'Fast connection' },
      { day: 13, task: 'Be a good wing', tip: 'Help friend' },
      { day: 14, task: 'Lead group decisions', tip: 'You direct' },
      { day: 15, task: 'Multiple contacts from group', tip: 'Several numbers' },
      { day: 16, task: 'Handle group interruptions', tip: 'Stay smooth' },
      { day: 17, task: 'Complex group dynamics', tip: 'Mixed situations' },
      { day: 18, task: 'Any group size confidently', tip: 'Doesn\'t matter' },
      { day: 19, task: 'Center of group attention', tip: 'Focus on you' },
      { day: 20, task: 'Most challenging groups', tip: 'Tough sets' },
      { day: 21, task: 'Handle any group with ease', tip: 'Complete mastery' },
    ],
  },

  // ============================================
  // CHALLENGE 18: Social Proof
  // ============================================
  {
    id: 18,
    title: 'Social Proof',
    description: 'Build and leverage social proof.',
    tier: getTier(18),
    mintFee: 0.06,
    requiredChallengeId: 17,
    badge: {
      name: 'The Networker',
      description: 'Known everywhere',
      rarity: getRarity(18),
      image: 'badge_social',
    },
    days: [
      { day: 1, task: 'Talk to regular spot staff', tip: 'Build rapport' },
      { day: 2, task: 'Get contact from routine spot', tip: 'Connect' },
      { day: 3, task: 'Introduce at event/class', tip: 'New context' },
      { day: 4, task: 'Make plan with new person', tip: 'Follow through' },
      { day: 5, task: 'Attend event solo', tip: 'No crutch' },
      { day: 6, task: 'Meet 3 new people at event', tip: 'Work the room' },
      { day: 7, task: '2 contacts from social activity', tip: 'Convert meetings' },
      { day: 8, task: 'Introduce two people you know', tip: 'Be connector' },
      { day: 9, task: 'Follow up with someone recent', tip: 'Maintain contact' },
      { day: 10, task: 'Host/organize small gathering', tip: 'You create event' },
      { day: 11, task: '5 new people through activities', tip: 'Growing network' },
      { day: 12, task: 'Get invited somewhere', tip: 'Through connection' },
      { day: 13, task: 'Friend of friend connection', tip: 'Network expand' },
      { day: 14, task: 'Become regular somewhere', tip: 'Known face' },
      { day: 15, task: '3 people through existing network', tip: 'Leverage' },
      { day: 16, task: 'Create value for circle', tip: 'Give, not take' },
      { day: 17, task: 'Get introduced to new people', tip: 'Others bring you' },
      { day: 18, task: 'Connection leads to more', tip: 'Chain effect' },
      { day: 19, task: 'Be known as connector', tip: 'Your identity' },
      { day: 20, task: 'Expand through multiple channels', tip: 'Diverse sources' },
      { day: 21, task: 'Thriving social network', tip: 'Abundant connections' },
    ],
  },

  // ============================================
  // CHALLENGE 19: Abundance Mindset
  // ============================================
  {
    id: 19,
    title: 'Abundance Mindset',
    description: 'Embody true abundance mentality.',
    tier: getTier(19),
    mintFee: 0.06,
    requiredChallengeId: 18,
    badge: {
      name: 'The Abundant',
      description: 'Lives in total abundance',
      rarity: getRarity(19),
      image: 'badge_abundance',
    },
    days: [
      { day: 1, task: 'Talk to 5+ people in one day', tip: 'Multiple options' },
      { day: 2, task: 'Non-attachment every interaction', tip: 'Zero neediness' },
      { day: 3, task: 'Multiple options this week', tip: 'Dating abundance' },
      { day: 4, task: 'Walk away from bad interaction', tip: 'Your choice' },
      { day: 5, task: '"There\'s always more" mindset', tip: 'Abundance thinking' },
      { day: 6, task: 'Build options through volume', tip: 'Keep approaching' },
      { day: 7, task: 'Zero neediness in interactions', tip: 'Complete freedom' },
      { day: 8, task: 'Multiple date options in week', tip: 'Choices' },
      { day: 9, task: 'Walk away from good to find better', tip: 'Always more' },
      { day: 10, task: 'Options, not chasing one', tip: 'Never fixated' },
      { day: 11, task: '"Take it or leave it" energy', tip: 'Outcome detached' },
      { day: 12, task: 'More options than time', tip: 'Overflow' },
      { day: 13, task: 'Genuine non-attachment', tip: 'Deep level' },
      { day: 14, task: 'No scarcity thinking', tip: 'Abundant universe' },
      { day: 15, task: 'Date from abundance', tip: 'Not desperate' },
      { day: 16, task: 'Others compete for your time', tip: 'Flip dynamic' },
      { day: 17, task: 'Screen them (you choose)', tip: 'Selector mindset' },
      { day: 18, task: 'You\'re the prize', tip: 'Believe it' },
      { day: 19, task: 'Complete dating abundance', tip: 'Reality now' },
      { day: 20, task: 'More opportunities than can pursue', tip: 'Overflow' },
      { day: 21, task: 'True abundance mentality', tip: 'Core identity' },
    ],
  },

  // ============================================
  // CHALLENGE 20: Same Night Success
  // ============================================
  {
    id: 20,
    title: 'Night Game',
    description: 'Master nightlife interactions.',
    tier: getTier(20),
    mintFee: 0.07,
    requiredChallengeId: 19,
    badge: {
      name: 'The Closer',
      description: 'Achieves same-night success',
      rarity: getRarity(20),
      image: 'badge_closer',
    },
    days: [
      { day: 1, task: 'Go out with clear intention', tip: 'Same night goal' },
      { day: 2, task: 'Full sequence practice', tip: 'Approach to close' },
      { day: 3, task: 'Venue change during night', tip: 'Move locations' },
      { day: 4, task: 'Physical escalation practice', tip: 'Touch progression' },
      { day: 5, task: 'Execute pull sequence', tip: 'Leave together' },
      { day: 6, task: 'Smooth logistics', tip: 'Transportation, etc' },
      { day: 7, task: '"Let\'s get out of here"', tip: 'Direct pull' },
      { day: 8, task: 'After-party bounce', tip: 'Continue elsewhere' },
      { day: 9, task: 'Handle objections to leaving', tip: 'Overcome resistance' },
      { day: 10, task: 'Full night sequence', tip: 'Complete run' },
      { day: 11, task: 'Multiple venue changes', tip: 'Movement mastery' },
      { day: 12, task: 'Escalation timing', tip: 'Right moments' },
      { day: 13, task: 'Clean pulls, good logistics', tip: 'Smooth execution' },
      { day: 14, task: 'End of night confidence', tip: 'Late game' },
      { day: 15, task: 'Master closing timing', tip: 'When to close' },
      { day: 16, task: 'Advanced pull techniques', tip: 'Subtle methods' },
      { day: 17, task: 'Execute same-night success', tip: 'Achieve it' },
      { day: 18, task: 'Refine your system', tip: 'What works for you' },
      { day: 19, task: 'Master same-night pull', tip: 'Consistent skill' },
      { day: 20, task: 'Any circumstance', tip: 'Adaptable' },
      { day: 21, task: 'Consistent same-night success', tip: 'Mastery' },
    ],
  },

  // ============================================
  // CHALLENGE 21: Inner Game Mastery
  // ============================================
  {
    id: 21,
    title: 'Inner Game',
    description: 'Complete inner transformation.',
    tier: getTier(21),
    mintFee: 0.07,
    requiredChallengeId: 20,
    badge: {
      name: 'Sigma Ascended',
      description: 'Complete inner mastery',
      rarity: getRarity(21),
      image: 'badge_sigma',
    },
    days: [
      { day: 1, task: 'Meditate on your worth (10 min)', tip: 'Self reflection' },
      { day: 2, task: 'Approach from giving, not taking', tip: 'Value mindset' },
      { day: 3, task: 'Non-reaction to external validation', tip: 'Internal source' },
      { day: 4, task: 'Identify and release limiting belief', tip: 'Let it go' },
      { day: 5, task: 'Act from your standards', tip: 'Not others\' expectations' },
      { day: 6, task: 'Radical self-acceptance', tip: 'Embrace all of you' },
      { day: 7, task: 'Zero outcome dependence approach', tip: 'Complete freedom' },
      { day: 8, task: 'Release attachment to specific person', tip: 'No oneitis' },
      { day: 9, task: 'Be source of good emotions', tip: 'You generate' },
      { day: 10, task: 'Live in your own frame', tip: 'Your reality' },
      { day: 11, task: 'Complete self-validation', tip: 'Need no one' },
      { day: 12, task: 'Release need for approval', tip: 'Freedom' },
      { day: 13, task: 'Abundance in all areas', tip: 'Whole life' },
      { day: 14, task: 'Unconditional confidence', tip: 'Not situation based' },
      { day: 15, task: 'Comfortable being you', tip: 'Total acceptance' },
      { day: 16, task: 'Live from your truth', tip: 'Authentic always' },
      { day: 17, task: 'Give without expectation', tip: 'Pure giving' },
      { day: 18, task: 'Complete inner freedom', tip: 'Nothing holds you' },
      { day: 19, task: 'Unshakeable self-worth', tip: 'Core stability' },
      { day: 20, task: 'Aligned with highest self', tip: 'Best version' },
      { day: 21, task: 'Complete transformation - you are enough', tip: 'The end and beginning' },
    ],
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
    if (completedIds.includes(challenge.id)) return false
    if (challenge.requiredChallengeId === null) return true
    return completedIds.includes(challenge.requiredChallengeId)
  })
}

export const getTotalMintFees = (): number =>
  CHALLENGES.reduce((sum, c) => sum + c.mintFee, 0)

export const getTotalChallenges = (): number => CHALLENGES.length
