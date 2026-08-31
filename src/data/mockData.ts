import { NewsItem, EventItem, GalleryItem, DevelopmentProject, ManifestoPillar, MemberRecord, VolunteerRecord, DonationRecord, ContactMessage, MemberPost, MediaHeadMessage } from '../types';
import { APP_IMAGES } from '../assets/images';

export const LEADER_INFO = {
  name: "Muhammad Tahir Unahar Shigri",
  title: "President, PMLN Shigar Chapter",
  subtitle: "Distinguished Political Leader, Social Reformer & Visionary for District Shigar",
  slogan: "Shigar Ki Progress, PMLN Ki Standard — Service, Unity & Development",
  biography: `Muhammad Tahir Unahar Shigri is a prominent political figure, community advocate, and President of Pakistan Muslim League Nawaz (PMLN) Shigar Chapter. Born and raised in the heart of Shigar Valley, Gilgit-Baltistan, he has dedicated decades of his life to uplifting mountain communities, expanding road connectivity, improving healthcare facilities, and fostering educational excellence across Shigar district.

With a deep commitment to meritocracy, youth empowerment, and sustainable mountain ecotourism, Tahir Shigri has championed major infrastructure initiatives including the Shigar Valley Road Expansion, District Headquarter Hospital Upgradation, and clean drinking water solar filtration projects across remote villages from Basha to Arandu.`,
  education: [
    "Master's Degree in Political Science & Public Administration",
    "Bachelor of Arts in Economics & Humanities (University of Punjab)",
    "Higher Secondary Schooling from Government Degree College Skardu"
  ],
  politicalJourney: [
    { year: "2010", title: "Grassroots Activist", description: "Initiated youth mobilization and rural relief drives across Shigar Valley villages." },
    { year: "2015", title: "Historic Visit of Mian Muhammad Nawaz Sharif at Shigar", description: "Hosted PMLN Supreme Leader Mian Muhammad Nawaz Sharif in District Shigar, inaugurating major infrastructure and healthcare packages for Baltistan." },
    { year: "2018", title: "General Secretary PMLN Shigar", description: "Led organizational expansion of PMLN across all 3 Tehsil units in District Shigar." },
    { year: "2019", title: "President PMLN Shigar Chapter", description: "Unanimously elected President, prioritizing district infrastructure, youth scholarships, and healthcare." },
    { year: "2023 - Present", title: "District Development Champion", description: "Overseeing PKR 4.5B worth of federal and provincial development projects in Shigar." }
  ],
  vision: "To transform Shigar District into a thriving, self-reliant model mountain region through world-class road networks, quality education, modern healthcare access, tech-enabled youth, and sustainable eco-tourism.",
  mission: "Working tirelessly to serve every household in Shigar without discrimination, ensuring transparent governance, economic opportunities for women and youth, and protecting our majestic natural heritage.",
  philosophy: "Leadership is not a title; it is a sacred pledge of selfless public service, absolute transparency, and unwavering loyalty to the prosperity of our people."
};

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: "news-0",
    title: "Historic Visit of Mian Muhammad Nawaz Sharif at Shigar — Epoch of Infrastructure & Progress",
    category: "Political Activities",
    summary: "Reliving the monumental visit of PMLN Quaid Mian Muhammad Nawaz Sharif to District Shigar, hosted by Muhammad Tahir Unahar Shigri, unlocking billions for road networks, health, and youth grants.",
    content: `SHIGAR VALLEY — The historic visit of PMLN Quaid Mian Muhammad Nawaz Sharif to District Shigar remains a defining milestone in the socio-economic transformation of Gilgit-Baltistan's mountain communities.

Hosted with traditional Balti hospitality by Muhammad Tahir Unahar Shigri and local PMLN leadership, Mian Muhammad Nawaz Sharif addressed a grand public assembly in Shigar. During his historic address, the PMLN Supreme Leader announced landmark infrastructure initiatives including the All-Weather Skardu-Shigar Highway, District Headquarter Hospital Shigar, and special high-altitude agricultural subsidies.

'Shigar holds a special place in my heart. The resilient people of Baltistan deserve world-class connectivity, top-tier healthcare, and educational institutions comparable to any major city in Pakistan,' declared Quaid Mian Muhammad Nawaz Sharif.

President PMLN Shigar Muhammad Tahir Unahar Shigri expressed deep gratitude to Mian Nawaz Sharif, emphasizing that the development charter laid down during this historic visit continues to guide PMLN's vision for Shigar Valley.`,
    date: "Historic Archive",
    author: "PMLN Shigar Archives",
    imageUrl: APP_IMAGES.nawazSharifVisit1,
    tags: ["Nawaz Sharif", "Historic Visit", "Shigar Valley", "Tahir Shigri", "PMLN Legacy"],
    views: 3450
  },
  {
    id: "news-1",
    title: "Muhammad Tahir Unahar Shigri Inaugurates Solar Drinking Water Project in Basha Valley",
    category: "Development Projects",
    summary: "Over 1,200 households in remote Basha Valley now have access to clean, potable solar-pumped water thanks to PMLN Shigar initiative.",
    content: `SHIGAR — In a landmark ceremony attended by hundreds of local elders and community members, President PMLN Shigar Muhammad Tahir Unahar Shigri inaugurated the Basha Solar Clean Drinking Water Project.

Speaking on the occasion, Tahir Shigri emphasized that access to clean drinking water is a fundamental right of every citizen. 'Under the vision of PMLN leadership, no village in Shigar will be left behind in basic amenities. This PKR 45 million project utilizes state-of-the-art solar pumping technology to deliver purified mountain water directly to homes in Basha,' he stated.

Local elders expressed immense gratitude to Tahir Shigri for fulfilling a long-standing demand of the region.`,
    date: "July 20, 2026",
    author: "PMLN Media Cell Shigar",
    imageUrl: APP_IMAGES.shigarDevelopment,
    tags: ["Development", "Water Project", "Basha Valley", "Tahir Shigri"],
    views: 1420
  },
  {
    id: "news-2",
    title: "PMLN Shigar Workers Convention Draws Thousands in Main Bazaar Shigar",
    category: "Political Activities",
    summary: "Party workers and youth wings from across 9 union councils gathered for a historic convention reaffirming faith in party leadership.",
    content: `SHIGAR TOWN — Thousands of enthusiastic PMLN workers, youth leaders, and civil society representatives gathered at the Main Secretariat Shigar for the Grand District Workers Convention.

Addressing the energetic crowd, Muhammad Tahir Unahar Shigri declared that PMLN stands as the sole political force capable of delivering tangible progress to Gilgit-Baltistan. He announced new youth skill training grants and highlighted ongoing road construction projects connecting Shigar with Skardu and K2 basecamp routes.`,
    date: "July 12, 2026",
    author: "District Information Secretariat",
    imageUrl: APP_IMAGES.leaderSpeechRally,
    tags: ["Workers Convention", "Shigar Rally", "PMLN", "Youth"],
    views: 2180
  },
  {
    id: "news-3",
    title: "Federal Package Approved for Shigar Girls Degree College & IT Lab",
    category: "Announcements",
    summary: "Special approval secured for a PKR 180M upgrade of educational infrastructure including high-speed fiber internet.",
    content: `SHIGAR — Through the dedicated advocacy of Muhammad Tahir Unahar Shigri, the Federal Ministry of Kashmir Affairs & GB has officially sanctioned the Shigar Girls Degree College expansion project.

The package includes a modern 50-computer IT center, digital library, science laboratories, and transport buses for female students coming from distant villages like Tissar and Chutron.`,
    date: "June 28, 2026",
    author: "Education Cell PMLN",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    tags: ["Education", "Girls College", "IT Lab", "Shigar"],
    views: 980
  },
  {
    id: "news-4",
    title: "Free Medical & Eye Surgery Camp Organized in Gulabpur Shigar",
    category: "Events",
    summary: "Over 2,500 patients examined and free medicines distributed during a 3-day health camp supervised by PMLN Doctors Forum.",
    content: `GULABPUR — A 3-day mega free medical and eye surgery camp organized under the patronage of Muhammad Tahir Unahar Shigri concluded successfully in Gulabpur.

Top specialist doctors performed over 140 cataract surgeries free of cost and distributed eyeglasses and life-saving medicines to underprivileged families.`,
    date: "June 15, 2026",
    author: "Health Committee Shigar",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    tags: ["Health", "Medical Camp", "Gulabpur", "Community Care"],
    views: 1650
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: "event-1",
    title: "Shigar Youth Leadership & Tech Innovation Summit 2026",
    date: "2026-08-15",
    time: "10:00 AM - 04:00 PM",
    venue: "Shigar Fort Auditorium & Public Grounds",
    description: "Keynote address by Muhammad Tahir Unahar Shigri on youth employment, freelancing scholarships, and IT incubator for Baltistan youth.",
    imageUrl: APP_IMAGES.leaderSpeechRally,
    registeredCount: 480,
    lat: 35.4243,
    lng: 75.7328,
    isUpcoming: true
  },
  {
    id: "event-2",
    title: "Independence Day & PMLN Flag Hoisting Ceremony",
    date: "2026-08-14",
    time: "08:30 AM",
    venue: "District Secretariat Ground, Main Bazaar Shigar",
    description: "Grand flag hoisting ceremony followed by a peace rally and cultural tableau performance by Shigar school students.",
    imageUrl: APP_IMAGES.heroPmlnShigar,
    registeredCount: 890,
    lat: 35.4210,
    lng: 75.7350,
    isUpcoming: true
  },
  {
    id: "event-3",
    title: "High-Altitude Farmers & Agriculture Expo",
    date: "2026-09-02",
    time: "11:00 AM",
    venue: "Marapi Public Grounds, Shigar",
    description: "Exhibition of Shigar organic apricots, cherries, and modern cold storage technology with micro-loans distribution.",
    imageUrl: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80",
    registeredCount: 310,
    lat: 35.4120,
    lng: 75.7410,
    isUpcoming: true
  }
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: "gal-nawaz-1",
    title: "Historic Visit of Mian Muhammad Nawaz Sharif at Shigar",
    category: "Rallies",
    imageUrl: APP_IMAGES.nawazSharifVisit1,
    caption: "Grand welcome and public rally for PMLN Supreme Leader Mian Muhammad Nawaz Sharif in Shigar Valley.",
    date: "Historic Visit"
  },
  {
    id: "gal-nawaz-2",
    title: "Nawaz Sharif Addressing Shigar Assembly",
    category: "Speeches",
    imageUrl: APP_IMAGES.nawazSharifVisit2,
    caption: "PMLN Quaid Mian Muhammad Nawaz Sharif addressing public delegation alongside President Tahir Unahar Shigri.",
    date: "Historic Visit"
  },
  {
    id: "gal-nawaz-3",
    title: "Community Elders Welcome Nawaz Sharif in Shigar",
    category: "Rallies",
    imageUrl: APP_IMAGES.nawazSharifVisit3,
    caption: "District elders and PMLN leadership welcoming Quaid Mian Muhammad Nawaz Sharif during his Shigar visit.",
    date: "Historic Visit"
  },
  {
    id: "gal-1",
    title: "President Muhammad Tahir Unahar Shigri",
    category: "Speeches",
    imageUrl: APP_IMAGES.tahirShigri174,
    caption: "Official portrait of President PMLN Shigar Chapter",
    date: "2026"
  },
  {
    id: "gal-1b",
    title: "Muhammad Tahir Unahar Shigri Addressing Assembly",
    category: "Speeches",
    imageUrl: APP_IMAGES.tahirShigri173,
    caption: "PMLN Shigar President engaging with community delegates",
    date: "2026"
  },
  {
    id: "gal-1c",
    title: "Muhammad Tahir Unahar Shigri at Secretariat",
    category: "Culture",
    imageUrl: APP_IMAGES.tahirShigri168,
    caption: "At District Secretariat Shigar presiding over public consultations",
    date: "2026"
  },
  {
    id: "gal-2",
    title: "PMLN Shigar Grand Rally",
    category: "Rallies",
    imageUrl: APP_IMAGES.heroPmlnShigar,
    caption: "Massive gathering in Shigar Valley showing strong support for PMLN",
    date: "2026"
  },
  {
    id: "gal-3",
    title: "Infrastructure Development in Shigar",
    category: "Development",
    imageUrl: APP_IMAGES.shigarDevelopment,
    caption: "Newly constructed road network improving connectivity across mountain villages",
    date: "2026"
  },
  {
    id: "gal-4",
    title: "Public Address at Shigar Secretariat",
    category: "Speeches",
    imageUrl: APP_IMAGES.leaderSpeechRally,
    caption: "Tahir Shigri addressing constituent grievances and presenting party vision",
    date: "2026"
  },
  {
    id: "gal-5",
    title: "Shigar Fort & Heritage Conservation",
    category: "Culture",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    caption: "Promoting ecotourism while preserving Shigar's 400-year historical heritage",
    date: "2025"
  },
  {
    id: "gal-6",
    title: "Youth Tech Workshop",
    category: "Youth",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    caption: "Empowering young men and women of Shigar with digital skills",
    date: "2026"
  }
];

export const INITIAL_PROJECTS: DevelopmentProject[] = [
  {
    id: "proj-1",
    title: "Shigar River Bridge & Bypass Highway Network",
    category: "Roads",
    status: "Ongoing",
    progress: 78,
    budget: "PKR 1.8 Billion",
    location: "Shigar Valley Main Corridor",
    summary: "Construction of a 32-km double-lane asphalt highway and 2 steel truss bridges connecting Skardu to Shigar Fort and Basha.",
    details: "This critical connectivity route cuts travel time to central Skardu by 40 minutes, boosting trade, fruit transport, and mountaineering tourism to K2 and Broad Peak routes.",
    imageUrl: APP_IMAGES.shigarDevelopment,
    completionYear: "2027"
  },
  {
    id: "proj-2",
    title: "Shigar District Headquarter Hospital Upgradation",
    category: "Health",
    status: "Completed",
    progress: 100,
    budget: "PKR 420 Million",
    location: "Shigar Town",
    summary: "50-bed modern facility equipped with emergency ICU, digital X-ray, dialysis unit, and 24/7 solar power backup.",
    details: "Previously, local residents had to travel over emergency mountain passes to Skardu. DHQ Hospital Shigar now treats over 300 outdoor patients daily with resident specialist doctors.",
    imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    completionYear: "2025"
  },
  {
    id: "proj-3",
    title: "Model Higher Secondary Schools & IT Labs",
    category: "Education",
    status: "Ongoing",
    progress: 85,
    budget: "PKR 310 Million",
    location: "Gulabpur, Marapi, and Tissar",
    summary: "Establishment of 4 modern high school campuses with computer labs, high-speed internet, and science equipment.",
    details: "Ensures boys and girls across rural Shigar have direct access to modern STEM education and university entrance preparation.",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    completionYear: "2026"
  },
  {
    id: "proj-4",
    title: "Solar Potable Water Supply Scheme",
    category: "Water",
    status: "Completed",
    progress: 100,
    budget: "PKR 150 Million",
    location: "Basha, Arandu, and Hashupi",
    summary: "Solar-powered deep tubewells and filtration units providing 250,000 gallons of pure water daily.",
    details: "Eliminated waterborne diseases in lower Basha valley and reduced household burdens for women and children.",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80",
    completionYear: "2026"
  },
  {
    id: "proj-5",
    title: "Women Handicraft & Alpine Apricot Cooperative",
    category: "Women",
    status: "Ongoing",
    progress: 60,
    budget: "PKR 95 Million",
    location: "Shigar Centre",
    summary: "Training center and micro-financing hub for 600+ female artisans and fruit processing workers.",
    details: "Provides direct market links for Shigar's famous organic dried fruits, wool carpets, and traditional embroidery to national and export buyers.",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1200&q=80",
    completionYear: "2027"
  }
];

export const MANIFESTO_PILLARS: ManifestoPillar[] = [
  {
    id: "man-1",
    title: "Quality Education & Digital Empowerment",
    iconName: "GraduationCap",
    summary: "Guaranteeing every child in Shigar access to free, modern, technology-driven education and university scholarships.",
    keyPoints: [
      "Establishment of Shigar University Sub-Campus and IT Vocational Institute.",
      "100% scholarship scheme for top high school graduates pursuing higher education.",
      "High-speed 4G/Fiber optic broadband expanded to all remote villages.",
      "Smart classrooms and solar-powered computer labs in every government school."
    ],
    color: "from-emerald-600 to-green-700"
  },
  {
    id: "man-2",
    title: "World-Class Mountain Healthcare",
    iconName: "HeartPulse",
    summary: "Accessible, affordable, and high-tech healthcare services within a 30-minute reach of every household.",
    keyPoints: [
      "24/7 Tele-medicine and mobile medical units visiting high-altitude villages.",
      "Expansion of DHQ Hospital Shigar with specialized maternal and cardiac care units.",
      "Free emergency ambulance fleet equipped with oxygen and life support.",
      "Health Card coverage up to PKR 1 Million per family."
    ],
    color: "from-teal-600 to-emerald-800"
  },
  {
    id: "man-3",
    title: "Infrastructure & Road Connectivity",
    iconName: "Road",
    summary: "Building safe, weather-resilient roads, bridges, and clean energy grids across Shigar valley.",
    keyPoints: [
      "Completion of Skardu-Shigar-Basha all-weather double lane highway.",
      "Construction of 12 new steel motorable bridges over Shigar and Basha rivers.",
      "Off-grid Micro-Hydro and Solar plants ensuring uninterrupted electricity.",
      "Flood control embankments along river banks to protect farmland and homes."
    ],
    color: "from-green-700 to-emerald-900"
  },
  {
    id: "man-4",
    title: "Youth Entrepreneurship & Employment",
    iconName: "Briefcase",
    summary: "Creating 5,000+ jobs through tourism, tech freelancing, local mineral trade, and small enterprise grants.",
    keyPoints: [
      "PMLN Youth Business Loan scheme up to PKR 2.5 Million interest-free.",
      "Shigar Freelancing and Co-working hub with high-speed internet and mentorship.",
      "Certification programs in hotel management, trekking leadership, and local handicrafts.",
      "Merit-based recruitment in all government departments."
    ],
    color: "from-emerald-700 to-emerald-900"
  },
  {
    id: "man-5",
    title: "Eco-Tourism & Cultural Heritage",
    iconName: "Mountain",
    summary: "Positioning Shigar as the world capital for mountain trekking, K2 expeditions, and cultural ecotourism.",
    keyPoints: [
      "Eco-friendly tourist resorts and homestay networks benefiting local families.",
      "Protection of historic Shigar Fort, ancient wooden mosques, and heritage sites.",
      "Annual Shigar Karakoram Winter Sports & Cultural Festival.",
      "Professional porter welfare fund and life insurance for high-altitude guides."
    ],
    color: "from-emerald-800 to-teal-900"
  },
  {
    id: "man-6",
    title: "High-Altitude Agriculture & Climate Action",
    iconName: "Sprout",
    summary: "Modernizing fruit farming, cold storage infrastructure, and protecting glaciers from climate risks.",
    keyPoints: [
      "Solar-powered solar dehydration and cold storage facilities for cherries and apricots.",
      "Direct international export links for Shigar organic dry fruits.",
      "Reforestation drive: Planting 1 Million pine and poplar trees in Shigar valley.",
      "Glacier monitoring and disaster emergency response units."
    ],
    color: "from-green-600 to-emerald-700"
  }
];

export const INITIAL_MEMBERS: MemberRecord[] = [
  {
    id: "mem-101",
    membershipNo: "PMLN-SHG-2026-001",
    fullName: "Ali Raza Shigri",
    fatherName: "Ghulam Hassan",
    cnic: "71401-1234567-1",
    gender: "Male",
    dob: "1994-05-12",
    mobile: "+92 345 9876543",
    email: "ali.raza@gmail.com",
    username: "aliraza@pmlnmediacellshigar.online",
    password: "Member@2026",
    village: "Shigar Town",
    tehsil: "Shigar",
    district: "Shigar",
    occupation: "Civil Engineer",
    joinedDate: "2026-01-15",
    status: "Verified",
    bio: "Passionate community worker & civil engineer dedicated to youth empowerment and sustainable mountain infrastructure in Shigar.",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "mem-102",
    membershipNo: "PMLN-SHG-2026-002",
    fullName: "Fatima Batool",
    fatherName: "Muhammad Hussain",
    cnic: "71401-7654321-2",
    gender: "Female",
    dob: "1998-09-20",
    mobile: "+92 346 1122334",
    email: "fatima.b@gmail.com",
    username: "fatimabatool@pmlnmediacellshigar.online",
    password: "Member@2026",
    village: "Gulabpur",
    tehsil: "Shigar",
    district: "Shigar",
    occupation: "Teacher",
    joinedDate: "2026-02-04",
    status: "Verified",
    bio: "Education activist working to promote female literacy and digital skills across Gulabpur and Tissar.",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  }
];

export const INITIAL_VOLUNTEERS: VolunteerRecord[] = [
  {
    id: "vol-1",
    fullName: "Khadim Hussain",
    mobile: "+92 355 4433221",
    email: "khadim.hussain@outlook.com",
    username: "khadim@pmlnmediacellshigar.online",
    password: "Volunteer@2026",
    village: "Marapi",
    preferredRole: "Field Coordinator",
    availability: "Weekends & Evenings",
    status: "Approved",
    registeredDate: "2026-06-10",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "vol-2",
    fullName: "Zainab Bano",
    mobile: "+92 342 9988776",
    email: "zainab.b@gmail.com",
    username: "zainab@pmlnmediacellshigar.online",
    password: "Volunteer@2026",
    village: "Tissar",
    preferredRole: "Social Media Campaigner",
    availability: "Flexible",
    status: "Approved",
    registeredDate: "2026-07-01",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
  }
];

export const INITIAL_DONATIONS: DonationRecord[] = [
  {
    id: "don-1",
    donorName: "Muhammad Ibrahim",
    amount: 50000,
    paymentMethod: "Bank Transfer",
    transactionId: "TXN-8829102",
    date: "2026-07-22",
    campaign: "Shigar Education & Scholarship Fund",
    isAnonymous: false
  },
  {
    id: "don-2",
    donorName: "Overseas Pakistani Forum UK",
    amount: 250000,
    paymentMethod: "Bank Transfer",
    transactionId: "TXN-9918231",
    date: "2026-07-18",
    campaign: "Shigar Ambulance & Healthcare Drive",
    isAnonymous: false
  },
  {
    id: "don-3",
    donorName: "Anonymous Donor",
    amount: 10000,
    paymentMethod: "EasyPaisa",
    transactionId: "EP-44210",
    date: "2026-07-25",
    campaign: "General Party Operations",
    isAnonymous: true
  }
];

export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: "msg-1",
    name: "Mohammad Abbas",
    email: "m.abbas@gmail.com",
    phone: "+92 341 5544332",
    subject: "Water Pipeline Query in Upper Basha",
    message: "Respected Tahir Shigri Sahib, we want to inquire about the timeline for connecting upper Basha households to the main water line.",
    village: "Basha",
    date: "2026-07-24",
    isRead: false
  }
];

export const INITIAL_MEMBER_POSTS: MemberPost[] = [
  {
    id: "post-1",
    memberId: "mem-101",
    memberName: "Ali Raza Shigri",
    memberUsername: "aliraza@pmlnmediacellshigar.online",
    memberRole: "Member",
    title: "Youth Cleanliness & Tree Plantation Drive Completed in Shigar Bazaar",
    category: "Political Activities",
    summary: "Over 80 local PMLN youth volunteers gathered to plant 500 pine trees and clean main commercial walkways in Shigar Town.",
    content: `Under the leadership of Muhammad Tahir Unahar Shigri, PMLN youth members conducted an inspiring green campaign in Shigar Town. The initiative received immense appreciation from local merchants, tourists, and community elders. We distributed eco-friendly dustbins and planted 500 saplings across school areas.`,
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80",
    status: "Pending",
    submittedDate: "2026-07-26"
  },
  {
    id: "post-2",
    memberId: "mem-102",
    memberName: "Fatima Batool",
    memberUsername: "fatimabatool@pmlnmediacellshigar.online",
    memberRole: "Member",
    title: "Female Literacy Awareness Workshop Conducted in Gulabpur",
    category: "Announcements",
    summary: "A 2-day skill workshop focusing on basic English and digital literacy for high school girls in Gulabpur.",
    content: `Education is the foundation of Shigar's future. Thanks to the support of PMLN Shigar Education Wing, our team trained 45 young female students in digital research and scholarship application procedures.`,
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=80",
    status: "Approved",
    submittedDate: "2026-07-20"
  }
];

export const INITIAL_MEDIA_MESSAGES: MediaHeadMessage[] = [
  {
    id: "media-msg-1",
    senderId: "mem-101",
    senderName: "Ali Raza Shigri",
    senderUsername: "aliraza@pmlnmediacellshigar.online",
    senderRole: "Member",
    subject: "HD Photography & Drone Coverage for Upcoming Rally in Tissar",
    message: "Respected Social Media Team Head, our local youth team in Shigar has arranged high-definition drone cameras and ground photographers for the upcoming rally. Kindly coordinate with us for real-time live streaming on the official PMLN Shigar Facebook page.",
    date: "2026-07-25",
    isRead: false,
    status: "Received"
  }
];
