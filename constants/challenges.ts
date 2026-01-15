/**
 * 21-S Daily Challenges
 * Single 21-day confidence building journey
 * Each day has its own task and NFT reward
 */

import { DailyChallenge } from '@/types/challenges'

/**
 * Calculate mint fee for a given day (linear progression)
 * Day 1 = 0.02 SOL, Day 21 = 0.07 SOL
 */
export function getMintFeeForDay(day: number): number {
  const minFee = 0.02
  const maxFee = 0.07
  const increment = (maxFee - minFee) / 20 // 20 increments for 21 days
  return Number((minFee + (day - 1) * increment).toFixed(4))
}

/**
 * Get total mint fee if user mints all 21 days
 */
export function getTotalMintFee(): number {
  let total = 0
  for (let day = 1; day <= 21; day++) {
    total += getMintFeeForDay(day)
  }
  return Number(total.toFixed(4))
}

/**
 * The 21 daily challenges - progressive social confidence building
 * Start from absolute beginner → micro difficulty increases each day
 * 
 * You can edit these tasks later - this is the structure
 */
export const DAILY_CHALLENGES: DailyChallenge[] = [
  // ============================================
  // WEEK 1: Foundation (Days 1-7)
  // Basic comfort building, minimal social risk
  // ============================================
  {
    day: 1,
    title: 'The Asker',
    task: 'Ask 3 people for the time or directions (even if you know)',
    tip: 'Start with the basics. Walk up confidently, make brief eye contact, and ask a simple question. Don\'t overthink it - you\'re just being a normal human asking for help. Practice your delivery: clear voice, slight smile, and walk away smoothly after they answer. This builds the foundation of approaching without pressure.',
    mintFee: getMintFeeForDay(1),
    badge: {
      name: 'Day 1: First Questions',
      description: 'Initiated conversations with purpose',
      image: 'badge_day1',
    },
  },
  {
    day: 2,
    title: 'The Asker 2',
    task: 'Ask 3 Girls for the time or directions (even if you know)',
    tip: 'Same approach as yesterday, but now specifically targeting women. This is your first step into daygame territory. Choose girls who are alone and look approachable (not busy on phone, not rushing). Position yourself to walk alongside them briefly. Ask with confidence - you\'re entitled to ask for directions. After they answer, thank them and continue on your way. Focus on your body language: shoulders back, head up, confident stride.',
    mintFee: getMintFeeForDay(2),
    badge: {
      name: 'Day 2: Breaking Silence',
      description: 'First verbal interactions with girls',
      image: 'badge_day2',
    },
  },
  {
    day: 3,
    title: 'Confidence Builder',
    task: 'Ask 3 Girls for the time or directions (even if you know) and make a comment about the environment or situation',
    tip: 'Level up your approach game. Drop the "excuse me" - you\'re not bothering them, you\'re starting a normal interaction. Lead with "Hey" or "Hi" instead. After getting directions, add a situational comment about the weather, the crowd, or something you both can observe. Keep it brief and walk away - this is about building confidence in initiating, not forcing conversation. Remember: the goal is approach practice, not getting numbers yet.',
    mintFee: getMintFeeForDay(3),
    badge: {
      name: 'Day 3: Confidence Builder',
      description: 'Developed confidence in verbal interactions with girls',
      image: 'badge_day3',
    },
  },
  {
    day: 4,
    title: 'The Commentator',
    task: 'Make a comment about the environment or situation to 3 girls',
    tip: 'Skip the functional question - go straight to observation-based comments. Look for things you both experience in the moment: weather, crowds, stores, traffic, etc. Examples: "This coffee shop is always packed, huh?" or "Finally some decent weather after all that rain." Approach confidently, make your comment, and be ready to continue if they engage. This is pure value-free approaching - you\'re just sharing an observation. Perfect for building comfort with opening conversations.',
    mintFee: getMintFeeForDay(4),
    badge: {
      name: 'Day 4: Small Talk',
      description: 'Started casual conversations from observations',
      image: 'badge_day4',
    },
  },
  {
    day: 5,
    title: 'The Voice',
    task: 'This is an active rest day. But you need to do voice workout for next challenges. Find a Voice exercise on YouTube and do it.',
    tip: 'Your voice is your primary weapon in daygame. Search for "voice training for men" or "improve vocal projection" on YouTube. Focus on exercises that strengthen your diaphragm, improve resonance, and eliminate vocal fry. Practice daily for 10-15 minutes. Record yourself and listen back. A strong, clear voice commands attention and conveys confidence. Many guys struggle here - don\'t be one of them. Your future approaches depend on being heard and understood.',
    mintFee: getMintFeeForDay(5),
    badge: {
      name: 'Day 5: Clear Voice',
      description: 'Developed confident vocal projection',
      image: 'badge_day5',
    },
  },
  {
    day: 6,
    title: 'The Complimenter',
    task: 'Give genuine compliments to 3 girls on something they chose',
    tip: 'Compliments are social currency in daygame. Focus on their style choices: shoes, jackets, bags, accessories, haircuts. Make them genuine and specific - "Those sneakers look really comfortable, what brand are they?" shows you pay attention. Avoid generic compliments like "nice shoes" - be specific. Deliver with a genuine smile and confident tone. This builds positive associations and opens doors for conversation. Remember: you\'re approaching to connect, not just to compliment.',
    mintFee: getMintFeeForDay(6),
    badge: {
      name: 'Day 6: Spreading Positivity',
      description: 'Made others feel good with genuine compliments',
      image: 'badge_day6',
    },
  },
  {
    day: 7,
    title: 'The Extender',
    task: 'Have one conversation that goes beyond initial opening with 3 people',
    tip: 'This is where conversations start to matter. After your opener, don\'t just thank them and leave. Ask follow-ups based on their response, or share a related thought. If they mention a cafe, ask what they usually order or share your favorite drink. Keep it light and genuine. The key is transitioning from "stranger interaction" to "mini conversation." Practice active listening - actually hear what they say and build on it. This builds the foundation for longer, more meaningful talks.',
    mintFee: getMintFeeForDay(7),
    badge: {
      name: 'Day 7: First Extended Talk',
      description: 'Completed first week - conversations getting longer',
      image: 'badge_day7',
    },
  },

  // ============================================
  // WEEK 2: Building Momentum (Days 8-14)
  // More intentional interactions, slight discomfort
  // ============================================
  {
    day: 8,
    title: 'The Recommender',
    task: 'Ask 3 girls for a recommendation (coffee spot, restaurant, etc.). Continue the conversation and invite.',
    tip: 'Escalation begins. Ask for recommendations on local spots (coffee, food, stores) with genuine interest. After they respond, follow up with questions like "What do you usually get there?" or "Have you tried their other locations?" Then bridge to an invite: "That sounds great, I was thinking of checking it out. Want to join me?" or "We should go there sometime." This moves you from information-seeking to potential date territory. Be direct but casual - confidence comes from owning your intentions.',
    mintFee: getMintFeeForDay(8),
    badge: {
      name: 'Day 8: Seeking Advice',
      description: 'Leveraged strangers\' local knowledge',
      image: 'badge_day8',
    },
  },
  {
    day: 9,
    title: 'The Introducer',
    task: 'Introduce yourself to 2 people: "Hey, I\'m [name]"',
    tip: 'Cut out the middleman - introduce yourself directly. Walk up and say "Hey, I\'m [Your Name]" with a genuine smile and firm handshake (if appropriate). No excuses or questions needed. This forces you to own the approach and builds massive confidence. Choose people who look open to conversation. After introducing yourself, have a brief exchange about why you approached or something situational. This is pure masculine initiative - no hiding behind "functional" questions anymore.',
    mintFee: getMintFeeForDay(9),
    badge: {
      name: 'Day 9: Breaking the Ice',
      description: 'Started introducing yourself proactively',
      image: 'badge_day9',
    },
  },
  {
    day: 10,
    title: 'The Opinion Seeker',
    task: 'Ask 3 girls for their opinion on something',
    tip: 'Opinions reveal personality and create engagement. Ask binary choices on neutral topics: "Are you more of a dog person or cat person?" or current events, movies, food preferences. Relationship questions work great too: "Do you think long-distance relationships can work?" or "What\'s your take on dating apps?" Listen actively to their answer and follow up. This shows you value their perspective and creates natural conversation flow. Perfect for transitioning from opener to deeper discussion.',
    mintFee: getMintFeeForDay(10),
    badge: {
      name: 'Day 10: Valuing Input',
      description: 'Engaged others for their perspectives',
      image: 'badge_day10',
    },
  },
  {
    day: 11,
    title: 'The Expander',
    task: 'Have 2 conversations lasting at least 2 minutes each girls.',
    tip: 'Time to go deep. Thread the conversation by picking up details they mention and expanding. If they talk about work, ask what they like most about it or share a related experience. If they mention hobbies, ask about how they got into it. Keep the energy up with follow-up questions and genuine interest. Don\'t rush to end - let the conversation breathe. The goal is 2+ minutes of natural back-and-forth. This builds your ability to hold attention and create connection.',
    mintFee: getMintFeeForDay(11),
    badge: {
      name: 'Day 11: Deeper Talks',
      description: 'Sustained conversations for minutes',
      image: 'badge_day11',
    },
  },
  {
    day: 12,
    title: 'The Laugher',
    task: 'Make 2 people genuinely laugh with a comment or observation',
    tip: 'Humor is your secret weapon in daygame. Make genuine observations about absurd situations: "This is like that time I waited 20 minutes for a table and then they gave me a booth next to the bathroom." or playful commentary on shared experiences. Don\'t force jokes - find the natural humor in situations. Geek culture references work great if they seem receptive. The key is delivery: confident tone, good timing, and not caring if they get it. Making someone laugh creates instant connection and positive association.',
    mintFee: getMintFeeForDay(12),
    badge: {
      name: 'Day 12: Creating Joy',
      description: 'Brought laughter to conversations',
      image: 'badge_day12',
    },
  },
  {
    day: 13,
    title: 'The Compliment Plus',
    task: 'Give 3 compliments that include a follow-up question',
    tip: 'Turn compliments into conversation starters. After complimenting something specific, immediately ask a question: "That jacket looks great on you - where did you find it?" or "Those headphones look high-quality - what do you use them for?" Then build on their answer. This creates natural momentum and shows genuine interest. Focus on unique or interesting choices rather than generic items. The compliment opens the door, the question keeps it open, and your follow-ups build connection.',
    mintFee: getMintFeeForDay(13),
    badge: {
      name: 'Day 13: Engaging Interest',
      description: 'Used compliments as conversation starters',
      image: 'badge_day13',
    },
  },
  {
    day: 14,
    title: 'The Connector',
    task: 'Get contact info (social or number) from 1 person you just met',
    tip: 'First number close of your journey. After a good conversation (at least 2-3 minutes), bridge to contact info naturally: "This has been fun - we should continue this conversation sometime. What\'s your Instagram?" or "Let\'s stay in touch - can I get your number?" Have your phone ready but don\'t seem desperate. Frame it as wanting to continue a good interaction, not as "getting digits." If they hesitate, be cool: "No worries, totally understand." This builds the skill of recognizing good conversation flow and having the balls to close.',
    mintFee: getMintFeeForDay(14),
    badge: {
      name: 'Day 14: First Connection',
      description: 'Completed week 2 - made first new connection',
      image: 'badge_day14',
    },
  },

  // ============================================
  // WEEK 3: Advanced & Mastery (Days 15-21)
  // Bigger challenges, real social skills application
  // ============================================
  {
    day: 15,
    title: 'The Direct Approacher',
    task: 'Approach 2 people you find attractive and introduce yourself',
    tip: 'No more hiding behind questions - direct daygame. Approach women you find attractive and say: "Hey, I saw you and wanted to meet you. I\'m [Name]." Own your attraction completely. No excuses, no games. Smile confidently, introduce yourself, and give a genuine reason (her style, energy, etc.) if it feels right. This is high-level approaching: you\'re not asking for anything, you\'re offering your presence. Most guys never get here - you will. Rejection is normal; persistence is key.',
    mintFee: getMintFeeForDay(15),
    badge: {
      name: 'Day 15: Bold Moves',
      description: 'Approached based on attraction directly',
      image: 'badge_day15',
    },
  },
  {
    day: 16,
    title: 'The Group Opener',
    task: 'Start a conversation with a group of 2+ people',
    tip: 'Groups are intimidating but doable. Address the whole group first to reduce social pressure: "Hey guys, quick question..." or "Excuse me everyone..." Then focus on the person you\'re most interested in. Use observation-based openers about the group dynamic or shared situation. Be respectful of the group dynamic - if they seem uninterested, eject gracefully. This builds comfort approaching in higher-pressure situations and shows you can handle social complexity.',
    mintFee: getMintFeeForDay(16),
    badge: {
      name: 'Day 16: Group Dynamics',
      description: 'Overcame the intimidation of groups',
      image: 'badge_day16',
    },
  },
  {
    day: 17,
    title: 'The Storyteller',
    task: 'Tell an engaging personal story in 2 conversations',
    tip: 'Stories are your currency in deep conversations. Share engaging personal stories with structure: hook (attention-grabber), build (details/conflict), payoff (resolution with emotion). Examples: funny travel mishaps, overcoming challenges, interesting experiences. Keep them concise (1-2 minutes) and end with a question to engage them. As a geek, leverage your unique experiences - gaming stories, tech fails, or niche hobbies work great. The goal is to create an emotional connection and show your personality.',
    mintFee: getMintFeeForDay(17),
    badge: {
      name: 'Day 17: Captivating Words',
      description: 'Held attention through storytelling',
      image: 'badge_day17',
    },
  },
  {
    day: 18,
    title: 'The Instant Date',
    task: 'Invite someone to join you for coffee/walk right now',
    tip: 'Escalation to real-time dates. After good conversation, suggest immediate plans: "I was about to grab coffee - want to come with?" or "I\'m going for a walk to clear my head, care to join?" Keep it casual and low-pressure - frame it as spontaneous rather than planned. Have a specific location in mind. This forces you to read the interaction and escalate when the energy is good. Many great connections happen this way - don\'t overthink logistics, just go with the flow.',
    mintFee: getMintFeeForDay(18),
    badge: {
      name: 'Day 18: Spontaneous',
      description: 'Created instant date opportunities',
      image: 'badge_day18',
    },
  },
  {
    day: 19,
    title: 'The Resilient',
    task: 'Get 3 rejections and keep approaching with a smile',
    tip: 'Build rejection immunity. Approach continuously until you get 3 clear "no thanks" or dismissals. Smile through each one and respond gracefully: "No worries, have a great day!" or "Cool, enjoy your time." Don\'t take it personally - most rejections are about timing/logistics, not you. Focus on your process: good energy, clear intent, smooth delivery. This mental shift is crucial - rejection becomes just another data point. Most guys quit after 1-2 rejections; you\'ll push through and become unstoppable.',
    mintFee: getMintFeeForDay(19),
    badge: {
      name: 'Day 19: Unshakeable',
      description: 'Built immunity to rejection',
      image: 'badge_day19',
    },
  },
  {
    day: 20,
    title: 'The Multi-Connector',
    task: 'Get contact info from 3 different people in one day',
    tip: 'Numbers game time. Focus on volume approaching with the goal of getting contact info from 3 different people in one day. Mix approaches: direct, situational, compliments, questions. After good conversations, close confidently: "Let\'s stay in touch - what\'s your number/Instagram?" Track your approaches mentally. This builds abundance mentality - not every connection will be amazing, but some will. Quality emerges from quantity. Push your daily approach limit and watch your skills compound.',
    mintFee: getMintFeeForDay(20),
    badge: {
      name: 'Day 20: Network Builder',
      description: 'Built multiple connections in a single day',
      image: 'badge_day20',
    },
  },
  {
    day: 21,
    title: 'The Ascended',
    task: 'Have 3 meaningful conversations with people you approach cold',
    tip: 'Master level. Cold approach 3 people and turn them into meaningful conversations (5+ minutes each). Combine all skills: confident opening, genuine interest, humor, stories, escalation. Read the situation and adapt - some want deep talks, others want light fun. Close if it feels right (contact info, instant date). This is the culmination of your 21-day transformation. You\'re no longer the guy who avoids approaching - you\'re the guy who creates opportunities. Celebrate this milestone; you\'ve fundamentally changed who you are socially.',
    mintFee: getMintFeeForDay(21),
    badge: {
      name: 'Day 21: Sigma Ascended',
      description: 'Completed the full 21-day transformation',
      image: 'badge_day21',
    },
  },
]

/**
 * Get a specific day's challenge
 */
export function getDayChallenge(day: number): DailyChallenge | undefined {
  return DAILY_CHALLENGES.find((c) => c.day === day)
}

/**
 * Get total number of days
 */
export function getTotalDays(): number {
  return DAILY_CHALLENGES.length
}

/**
 * Check if day number is valid
 */
export function isValidDay(day: number): boolean {
  return day >= 1 && day <= 21
}
