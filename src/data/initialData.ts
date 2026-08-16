import { MomentItem, UserProfile } from '../types';

export const currentUser: UserProfile = {
  name: "Elena Vance",
  username: "@elena.vance",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop", // Smiling woman with dark hair and dark top
  bio: "Collecting gentle mornings, winding highways, and quiet conversations that linger.",
  location: "San Francisco, CA",
  memberSince: "May 2022",
  streakDays: 42,
  totalMoments: 68,
  placesVisited: 19,
};

export const initialMoments: MomentItem[] = [
  {
    id: 'moment-1',
    title: 'The First Light',
    date: 'OCT 12, 2023',
    rawDate: '2023-10-12',
    time: '7:15 AM',
    location: 'North Beach, San Francisco',
    weather: '62° CRISP',
    moods: ['QUIET', 'MORNING'],
    primaryMood: 'QUIET',
    story: 'Waking up before the city does. The silence in the cafe feels less like an absence of noise and more like a gentle presence. Just the steam rising from the ceramic cup, the amber glow across the wood grain, and the blank pages waiting with quiet patience.',
    secondaryStory: 'There is something irreplaceable about early hours where the world has not yet demanded anything from you. The barista knows my order without asking, nodding with an unspoken understanding of morning peace.',
    images: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop' // Coffee cup, book on rustic sunlit wooden table
    ],
    likes: 12,
    isLiked: false,
    comments: [
      {
        id: 'c1',
        author: 'Julian Reed',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        text: 'That cafe lighting is absolutely unmatched. Nothing beats a quiet 7 AM start.',
        createdAt: '2 hours ago'
      },
      {
        id: 'c2',
        author: 'Claire Moreau',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
        text: 'What book are you reading today? Looks so peaceful.',
        createdAt: '1 day ago'
      },
      {
        id: 'c3',
        author: 'Marco Rossi',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
        text: 'The best moments in life are always the simplest ones.',
        createdAt: '2 days ago'
      }
    ],
    reflections: [
      {
        id: 'r1',
        text: 'Protect the first hour of every morning like sacred ground.',
        date: 'Added Oct 12'
      }
    ]
  },
  {
    id: 'moment-2',
    title: 'Edge of the World',
    date: 'SEP 28, 2023',
    rawDate: '2023-09-28',
    time: '6:45 PM',
    location: 'BIG SUR, CA',
    weather: '65° BREEZY',
    moods: ['AWE'],
    primaryMood: 'AWE',
    story: 'Standing where the land meets the restless sea. The wind carries the salt spray, and for a moment, everything else feels incredibly distant. The sky turned into shades of peach, lavender, and cold cobalt as the Pacific swallowed the sun.',
    secondaryStory: 'You realize how small your daily anxieties are when placed against granite cliffs that have weathered a million seasons. Breathing in that cold marine air felt like resetting every thought.',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop' // Ocean cliff waves sunset Big Sur landscape
    ],
    likes: 45,
    isLiked: true,
    comments: [
      {
        id: 'c4',
        author: 'Sophia Chen',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
        text: 'Highway 1 at sunset is pure magic! Incredible shot.',
        createdAt: '3 days ago'
      }
    ],
    reflections: [
      {
        id: 'r2',
        text: 'Sometimes you have to drive all the way to the edge just to hear your own thoughts.',
        date: 'Added Sep 29'
      }
    ]
  },
  {
    id: 'moment-3',
    title: 'Echoes of Laughter',
    date: 'SEP 15, 2023',
    rawDate: '2023-09-15',
    time: '9:30 PM',
    location: 'Little Italy, San Francisco',
    weather: '68° WARM',
    moods: ['CONNECTED'],
    primaryMood: 'CONNECTED',
    isPolaroidFrame: true,
    story: 'We stayed until they turned the chairs upside down on the tables. Sometimes the best memories are the ones where you lose track of time over empty pasta bowls and candles burning down to melted wax puddles.',
    secondaryStory: 'Telling stories until our ribs ached from laughter. In a world moving at breakneck speed, these four-hour dinners with genuine friends are the anchor points of life.',
    images: [
      'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop' // Friends laughing over dinner table with wine & candles
    ],
    likes: 28,
    isLiked: false,
    comments: [
      {
        id: 'c5',
        author: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=200&auto=format&fit=crop',
        text: 'We must do this again soon. That tiramisu was legendary!',
        createdAt: 'Sep 16'
      }
    ],
    reflections: [
      {
        id: 'r3',
        text: 'Friendship is measured in unhurried conversations.',
        date: 'Added Sep 15'
      }
    ]
  },
  {
    id: 'moment-4',
    title: 'The Coastal Drive',
    date: 'SEPTEMBER 14, 2023',
    rawDate: '2023-09-14',
    time: '3:20 PM',
    location: 'BIG SUR, CA',
    weather: '72° CLEAR',
    moods: ['PEACEFUL', 'CALM'],
    primaryMood: 'PEACEFUL',
    story: 'The air tasted of salt and pine. We set out just as the morning fog was beginning to lift, revealing the rugged cliffs that dropped off into the Pacific. There was no agenda, just the hum of the engine and the long, winding road ahead.\n\nWe pulled over at a nameless turnout, the kind you only find when you aren\'t looking for it. The silence was immense, broken only by the rhythmic crashing of waves hundreds of feet below. It felt like standing on the edge of the world.',
    secondaryStory: 'Hours slipped by in a haze of conversation and quiet companionship. These are the moments that seem to stretch time, suspending it in a golden resin. I want to remember the specific shade of blue the water turned just before sunset—a deep, impossibly rich indigo.',
    images: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop', // Scenic road cliff view
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop', // Vintage car steering wheel coastal driving
    likes: 54,
    isLiked: true,
    comments: [
      {
        id: 'c6',
        author: 'Elena Vance',
        avatar: currentUser.avatar,
        text: 'One of the most memorable road trips of this year.',
        createdAt: 'Sep 14'
      }
    ],
    reflections: [
      {
        id: 'r4',
        text: '"Sometimes the most productive thing you can do is relax and let the landscape wash over you."',
        date: 'Added Oct 2'
      }
    ]
  },
  {
    id: 'moment-5',
    title: 'Autumn Trail',
    date: 'OCT 24, 2023',
    rawDate: '2023-10-24',
    time: '4:30 PM',
    location: 'Muir Woods, CA',
    weather: '58° CRISP',
    moods: ['NOSTALGIC', 'CALM'],
    primaryMood: 'NOSTALGIC',
    story: 'Walking along the damp cobblestone path strewn with golden maple and oak leaves. The earthy smell of autumn rain and cedar trees.',
    images: [
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop' // Autumn leaves on forest cobblestone ground
    ],
    likes: 31,
    comments: [],
    reflections: [
      {
        id: 'r5',
        text: 'Autumn teaches us that letting go can be beautiful.',
        date: 'Oct 24'
      }
    ]
  },
  {
    id: 'moment-6',
    title: 'Cobblestone Mist',
    date: 'OCT 18, 2023',
    rawDate: '2023-10-18',
    time: '6:15 PM',
    location: 'Old Town Alleyway',
    weather: '54° FOGGY',
    moods: ['QUIET', 'INSPIRED'],
    primaryMood: 'QUIET',
    story: 'The warm streetlights flickered on one by one as evening mist settled through the narrow stone alleys. Quiet, slow, timeless.',
    images: [
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=800&auto=format&fit=crop' // Misty cobblestone European street with warm glowing lamps
    ],
    likes: 38,
    comments: [],
    reflections: []
  },
  {
    id: 'moment-7',
    title: 'Sweet Respite',
    date: 'OCT 12, 2023',
    rawDate: '2023-10-12',
    time: '3:00 PM',
    location: 'Tartine Bakery, SF',
    weather: '66° SUNNY',
    moods: ['HAPPY', 'GRATEFUL'],
    primaryMood: 'HAPPY',
    story: 'A rich chocolate truffle cake slice crowned with a fresh raspberry, savored slowly with black tea after a long week.',
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop' // Rich chocolate cake slice on vintage saucer
    ],
    likes: 22,
    comments: [],
    reflections: []
  },
  {
    id: 'moment-8',
    title: 'Slow Down Thought',
    date: 'OCT 05, 2023',
    rawDate: '2023-10-05',
    moods: ['CALM'],
    primaryMood: 'CALM',
    isQuoteCard: true,
    quoteText: 'Sometimes the most productive thing you can do is relax.',
    story: 'A reminder written in the margin of my notebook after a hectic morning.',
    images: [],
    likes: 19,
    comments: [],
    reflections: []
  },
  {
    id: 'moment-9',
    title: 'Campfire by the Lake',
    date: 'SEP 28, 2023',
    rawDate: '2023-09-28',
    time: '8:45 PM',
    location: 'Lake Tahoe, CA',
    weather: '48° CHILLY',
    moods: ['CONNECTED', 'HAPPY'],
    primaryMood: 'CONNECTED',
    story: 'Woodsmoke, toasted marshmallows, starry skies, and friends singing along to acoustic guitar chords into the night.',
    images: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?q=80&w=800&auto=format&fit=crop' // Friends around campfire in evening
    ],
    likes: 47,
    comments: [],
    reflections: []
  },
  {
    id: 'moment-10',
    title: 'Quiet Reading Nook',
    date: 'SEP 15, 2023',
    rawDate: '2023-09-15',
    time: '11:00 AM',
    location: 'Living Room',
    weather: '67° WARM',
    moods: ['QUIET', 'CALM'],
    primaryMood: 'QUIET',
    story: 'Open pages of a beloved novel, chunky knit wool throw, and steam rising from freshly brewed cinnamon tea.',
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop' // Open book on cozy knit blanket
    ],
    likes: 36,
    comments: [],
    reflections: []
  }
];

export const presetPhotos = [
  {
    id: 'p1',
    name: 'Morning Sun & Cafe',
    url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop',
    tags: ['QUIET', 'MORNING']
  },
  {
    id: 'p2',
    name: 'Coastal Road Drive',
    url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop',
    tags: ['PEACEFUL', 'AWE']
  },
  {
    id: 'p3',
    name: 'Evening Cafe Table',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop',
    tags: ['CALM', 'NOSTALGIC']
  },
  {
    id: 'p4',
    name: 'Misty Woodland Trail',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop',
    tags: ['AWE', 'QUIET']
  },
  {
    id: 'p5',
    name: 'Friends Laughing Together',
    url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop',
    tags: ['CONNECTED', 'HAPPY']
  },
  {
    id: 'p6',
    name: 'Sunset Ocean Cliffs',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    tags: ['AWE', 'PEACEFUL']
  }
];
