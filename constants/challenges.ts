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
    tip: 'Simple functional question. "Excuse me, do you know what time it is?"',
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
    tip: 'Quick and casual - Simple functional question. "Excuse me, do you know where the nearest cafe is?"',
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
    tip: 'Simple functional question and comment. This time, do not say "Excuse me". Be confident and cool. For example: "Hello, do you know where the nearest cafe is?"',
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
    tip: 'Observational comments. For example: "Nice weather today" or "This line is long"',
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
    tip: 'No excuses or no skip. You need it for upcoming days.',
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
    tip: 'Compliment choices not body: "Nice shoes" "Cool jacket where did you buy it? Im gonna buy this for my gf" "Great bag"',
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
    tip: 'After they respond, ask a follow-up question or share something related.',
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
    tip: '"Hey, do you know any good coffee places around here?" Start friendly. And then try to continue the conversation. Then, invite them to the place. Or ask them to join you.',
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
    tip: 'Direct but casual. Eye contact, slight smile, confident posture. It will help you to be more comfortable with introductions.',
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
    tip: '"Hey quick question - do you think X or Y?" Simple binary choices work. Also, questions about relationships are great conversation starters.',
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
    tip: 'Use threading: pick up on things they say and expand on them.',
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
    tip: 'Light humor, playful observations. Don\'t try too hard. It can be weird or strange if needed.',
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
    tip: '"I love that jacket - where\'d you get it?" Opens conversation naturally. Extend the conversation.',
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
    tip: '"We should continue this - what\'s your Instagram?"',
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
    tip: '"Hey, I wanted to meet you - I\'m [name]." Own your intent.',
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
    tip: 'Address everyone initially, then focus on one. "Hey guys, quick question..."',
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
    tip: 'Hook, build, payoff. Make them feel something - humor or emotion.',
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
    tip: '"I was heading to grab coffee - come with me?" Low pressure, in the moment.',
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
    tip: 'Rejection is information, not failure. "No worries, have a good one!"',
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
    tip: 'Volume builds abundance mindset. Quality connections through quantity.',
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
    tip: 'Apply everything: approach, connect, build rapport, close if desired.',
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
