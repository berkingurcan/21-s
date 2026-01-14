const fs = require('fs');
const path = require('path');

// Treasury wallet for royalties
const TREASURY_WALLET = 'd29KQE5Gw3dY6qDEvFvmfp4bCr4kUWZm4EnGojUfiZb';

// Helper to calculate mint fee (same as in constants/challenges.ts)
function getMintFeeForDay(day) {
    const minFee = 0.02;
    const maxFee = 0.07;
    const increment = (maxFee - minFee) / 20;
    return Number((minFee + (day - 1) * increment).toFixed(4));
}

// Challenge data extracted from constants/challenges.ts
// (Copying data here to avoid TS compile issues in a simple JS script)
const CHALLENGES = [
    {
        day: 1,
        title: 'The Asker',
        badgeName: 'Day 1: First Questions',
        description: 'Initiated conversations with purpose',
        difficulty: 'Beginner'
    },
    {
        day: 2,
        title: 'The Asker 2',
        badgeName: 'Day 2: Breaking Silence',
        description: 'First verbal interactions with girls',
        difficulty: 'Beginner'
    },
    {
        day: 3,
        title: 'Confidence Builder',
        badgeName: 'Day 3: Confidence Builder',
        description: 'Developed confidence in verbal interactions with girls',
        difficulty: 'Beginner'
    },
    {
        day: 4,
        title: 'The Commentator',
        badgeName: 'Day 4: Small Talk',
        description: 'Started casual conversations from observations',
        difficulty: 'Beginner'
    },
    {
        day: 5,
        title: 'The Voice',
        badgeName: 'Day 5: Clear Voice',
        description: 'Developed confident vocal projection',
        difficulty: 'Beginner'
    },
    {
        day: 6,
        title: 'The Complimenter',
        badgeName: 'Day 6: Spreading Positivity',
        description: 'Made others feel good with genuine compliments',
        difficulty: 'Beginner'
    },
    {
        day: 7,
        title: 'The Extender',
        badgeName: 'Day 7: First Extended Talk',
        description: 'Completed first week - conversations getting longer',
        difficulty: 'Intermediate'
    },
    {
        day: 8,
        title: 'The Recommender',
        badgeName: 'Day 8: Seeking Advice',
        description: 'Leveraged strangers\' local knowledge',
        difficulty: 'Intermediate'
    },
    {
        day: 9,
        title: 'The Introducer',
        badgeName: 'Day 9: Breaking the Ice',
        description: 'Started introducing yourself proactively',
        difficulty: 'Intermediate'
    },
    {
        day: 10,
        title: 'The Opinion Seeker',
        badgeName: 'Day 10: Valuing Input',
        description: 'Engaged others for their perspectives',
        difficulty: 'Intermediate'
    },
    {
        day: 11,
        title: 'The Expander',
        badgeName: 'Day 11: Deeper Talks',
        description: 'Sustained conversations for minutes',
        difficulty: 'Intermediate'
    },
    {
        day: 12,
        title: 'The Laugher',
        badgeName: 'Day 12: Creating Joy',
        description: 'Brought laughter to conversations',
        difficulty: 'Intermediate'
    },
    {
        day: 13,
        title: 'The Compliment Plus',
        badgeName: 'Day 13: Engaging Interest',
        description: 'Used compliments as conversation starters',
        difficulty: 'Intermediate'
    },
    {
        day: 14,
        title: 'The Connector',
        badgeName: 'Day 14: First Connection',
        description: 'Completed week 2 - made first new connection',
        difficulty: 'Advanced'
    },
    {
        day: 15,
        title: 'The Direct Approacher',
        badgeName: 'Day 15: Bold Moves',
        description: 'Approached based on attraction directly',
        difficulty: 'Advanced'
    },
    {
        day: 16,
        title: 'The Group Opener',
        badgeName: 'Day 16: Group Dynamics',
        description: 'Overcame the intimidation of groups',
        difficulty: 'Advanced'
    },
    {
        day: 17,
        title: 'The Storyteller',
        badgeName: 'Day 17: Captivating Words',
        description: 'Held attention through storytelling',
        difficulty: 'Advanced'
    },
    {
        day: 18,
        title: 'The Instant Date',
        badgeName: 'Day 18: Spontaneous',
        description: 'Created instant date opportunities',
        difficulty: 'Advanced'
    },
    {
        day: 19,
        title: 'The Resilient',
        badgeName: 'Day 19: Unshakeable',
        description: 'Built immunity to rejection',
        difficulty: 'Mastery'
    },
    {
        day: 20,
        title: 'The Multi-Connector',
        badgeName: 'Day 20: Network Builder',
        description: 'Built multiple connections in a single day',
        difficulty: 'Mastery'
    },
    {
        day: 21,
        title: 'The Ascended',
        badgeName: 'Day 21: Sigma Ascended',
        description: 'Completed the full 21-day transformation',
        difficulty: 'Mastery'
    }
];

// Target directory
const outputDir = path.join(__dirname, '../assets/metadata');

// Create directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log(`Generating ${CHALLENGES.length} metadata files in ${outputDir}...`);

CHALLENGES.forEach(challenge => {
    // Image URI provided by user
    const imageUri = "https://rose-smoggy-sparrow-317.mypinata.cloud/ipfs/bafkreifj4vs3seufsrygd7fmsbx2vusbi57jbr56m5judn3qnj5bdsr3cu";

    const metadata = {
        name: challenge.badgeName,
        symbol: "21S",
        description: challenge.description,
        image: imageUri,
        external_url: "https://21-s.app",
        attributes: [
            {
                trait_type: "Day",
                value: challenge.day.toString()
            },
            {
                trait_type: "Challenge",
                value: challenge.title
            },
            {
                trait_type: "Difficulty",
                value: challenge.difficulty
            },
            {
                trait_type: "Mint Fee",
                value: `${getMintFeeForDay(challenge.day)} SOL`
            }
        ],
        properties: {
            files: [
                {
                    uri: imageUri,
                    type: "image/png"
                }
            ],
            category: "image",
            creators: [
                {
                    address: TREASURY_WALLET,
                    share: 100
                }
            ]
        }
    };
    const fileName = `day${challenge.day}.json`;
    fs.writeFileSync(path.join(outputDir, fileName), JSON.stringify(metadata, null, 2));
    console.log(`Created ${fileName}`);
});

console.log(`\nDone! All 21 metadata files created in assets/metadata/`);
console.log(`IMPORTANT: You must upload your images to Pinata first, get their CIDs,`);
console.log(`and then update the 'image' and 'properties.files.uri' fields in these JSON files`);
console.log(`before uploading the folder to Pinata.`);
