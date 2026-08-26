/**
 * Travella — demo content.
 *
 * Same contract as every template in `templates/`: all copy lives here.
 * Every trip, guide, price and review is fictional demo data.
 *
 * Departure dates are fixed strings rather than derived from the current
 * date, because a demo has to render identically on the server and the
 * client — and identically next year.
 */

export interface Trip {
  id: string;
  name: string;
  region: "north" | "south" | "himalaya" | "west";
  regionLabel: string;
  style: "slow" | "active" | "family";
  styleLabel: string;
  nights: number;
  from: number;
  image: string;
  blurb: string;
  months: string[];
  highlights: string[];
}

export interface Day {
  n: number;
  place: string;
  title: string;
  body: string;
  /** Rough altitude in metres — drives the profile line under the timeline. */
  altitude: number;
  move: string;
  stay: string;
  eat: string;
}

export interface Guide {
  id: string;
  name: string;
  base: string;
  years: string;
  languages: string[];
  photo: string;
  line: string;
}

export interface Review {
  id: string;
  name: string;
  trip: string;
  photo: string;
  quote: string;
}

export const travella = {
  brand: { name: "Travella", tagline: "Small-group travel in India" },

  nav: {
    links: [
      { label: "Trips", href: "#trips" },
      { label: "A day at a time", href: "#itinerary" },
      { label: "Your guides", href: "#guides" },
      { label: "What it costs", href: "#cost" },
    ],
    cta: "Plan a trip",
    phone: "+91 80 4711 0900",
  },

  hero: {
    kicker: "Since 2011 · Max 12 travellers",
    title: "Twelve people, one guide, and no coach parks.",
    body: "We run small-group journeys through India for people who would rather eat where the driver eats. Fixed departures, honest pricing, and a guide who lives where you are going.",
    primary: "Find your trip",
    secondary: "How we build a trip",
    image: "/templates/travella/hero.webp",
    imageAlt: "The Taj Mahal at first light, seen across still water",
    stats: [
      { v: "12", k: "Travellers, maximum" },
      { v: "38", k: "Fixed departures a year" },
      { v: "4.9", k: "Average review, 1,200+" },
    ],
    marquee: [
      "No hidden supplements",
      "Local guides only",
      "Trains, not internal flights",
      "Small hotels we have slept in",
      "Carbon costed into every fare",
    ],
  },

  finder: {
    eyebrow: "Find a trip",
    title: "Tell us roughly what you want",
    body: "Nine journeys, run on fixed dates. Filter down and see what is actually open.",
    regions: [
      { id: "all", label: "Anywhere" },
      { id: "north", label: "North" },
      { id: "south", label: "South" },
      { id: "himalaya", label: "Himalaya" },
      { id: "west", label: "West" },
    ],
    styles: [
      { id: "all", label: "Any pace" },
      { id: "slow", label: "Slow" },
      { id: "active", label: "Active" },
      { id: "family", label: "Family" },
    ],
    months: ["Any month", "Jan", "Feb", "Mar", "Apr", "Sep", "Oct", "Nov", "Dec"],
    nightsLabel: "Up to",
    empty: "Nothing open on those filters. Widening the month usually helps — the Himalaya trips only run in the shoulder seasons.",
    reset: "Clear filters",
    countOne: "1 trip",
    countMany: "trips",
  },

  trips: [
    {
      id: "kerala",
      name: "Backwaters & Hill Country",
      region: "south",
      regionLabel: "South",
      style: "slow",
      styleLabel: "Slow",
      nights: 11,
      from: 1840,
      image: "/templates/travella/kerala.webp",
      blurb: "Rice boats, tea estates and four nights where nothing is scheduled before ten.",
      months: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"],
      highlights: ["A night on a converted rice barge", "Munnar tea estate walk", "Cooking with the Thomas family"],
    },
    {
      id: "rajasthan",
      name: "Forts of the Thar",
      region: "west",
      regionLabel: "West",
      style: "slow",
      styleLabel: "Slow",
      nights: 13,
      from: 2140,
      image: "/templates/travella/rajasthan.webp",
      blurb: "Jaipur to Jaisalmer overland, with two nights out in the dunes and no camel-camp circus.",
      months: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      highlights: ["Two nights in the Thar", "Blue city rooftops", "Jodhpur block-printing workshop"],
    },
    {
      id: "ladakh",
      name: "Ladakh Overland",
      region: "himalaya",
      regionLabel: "Himalaya",
      style: "active",
      styleLabel: "Active",
      nights: 12,
      from: 2380,
      image: "/templates/travella/himalaya.webp",
      blurb: "Leh, the Nubra valley and two high passes, paced properly so you actually acclimatise.",
      months: ["Jun", "Jul", "Aug", "Sep"],
      highlights: ["Khardung La at sunrise", "A night in a Nubra homestay", "Hemis monastery on a quiet day"],
    },
    {
      id: "golden",
      name: "Delhi, Agra & Jaipur",
      region: "north",
      regionLabel: "North",
      style: "family",
      styleLabel: "Family",
      nights: 8,
      from: 1290,
      image: "/templates/travella/hero.webp",
      blurb: "The famous three, run by train and timed to miss the crowds at every single stop.",
      months: ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"],
      highlights: ["Taj Mahal at opening", "Old Delhi by cycle rickshaw", "Amber Fort before the buses"],
    },
    {
      id: "spiti",
      name: "Spiti Valley Traverse",
      region: "himalaya",
      regionLabel: "Himalaya",
      style: "active",
      styleLabel: "Active",
      nights: 14,
      from: 2260,
      image: "/templates/travella/himalaya.webp",
      blurb: "Shimla up to Kaza the long way, sleeping in villages that see four groups a season.",
      months: ["Jun", "Jul", "Aug", "Sep"],
      highlights: ["Key monastery morning prayers", "Chandratal lake", "Two homestay nights above 4,000 m"],
    },
    {
      id: "tamil",
      name: "Temple Trail",
      region: "south",
      regionLabel: "South",
      style: "slow",
      styleLabel: "Slow",
      nights: 10,
      from: 1620,
      image: "/templates/travella/food.webp",
      blurb: "Chennai down to Madurai through the bronze-casting towns, mostly by overnight train.",
      months: ["Nov", "Dec", "Jan", "Feb", "Mar"],
      highlights: ["Meenakshi temple at dusk", "Bronze casting in Swamimalai", "Chettinad lunch, properly done"],
    },
    {
      id: "goa",
      name: "Konkan Coast",
      region: "west",
      regionLabel: "West",
      style: "family",
      styleLabel: "Family",
      nights: 9,
      from: 1480,
      image: "/templates/travella/kerala.webp",
      blurb: "South Goa down into Karnataka, with beaches that still belong to the village behind them.",
      months: ["Nov", "Dec", "Jan", "Feb", "Mar"],
      highlights: ["Sail a traditional fishing boat", "Spice farm lunch", "Three unhurried beach days"],
    },
    {
      id: "varanasi",
      name: "The Ganges Line",
      region: "north",
      regionLabel: "North",
      style: "slow",
      styleLabel: "Slow",
      nights: 12,
      from: 1960,
      image: "/templates/travella/food.webp",
      blurb: "Lucknow, Varanasi and Bodh Gaya, with mornings on the water and afternoons off.",
      months: ["Oct", "Nov", "Dec", "Jan", "Feb"],
      highlights: ["Dawn boat on the ghats", "Awadhi cooking in Lucknow", "Sarnath with an archaeologist"],
    },
    {
      id: "meghalaya",
      name: "Living Root Bridges",
      region: "north",
      regionLabel: "North",
      style: "active",
      styleLabel: "Active",
      nights: 10,
      from: 1740,
      image: "/templates/travella/himalaya.webp",
      blurb: "Shillong, Cherrapunji and four days walking between Khasi villages in the wettest place on earth.",
      months: ["Oct", "Nov", "Mar", "Apr"],
      highlights: ["The double-decker root bridge", "Nongriat village stay", "Mawlynnong on a market day"],
    },
  ] as Trip[],

  itinerary: {
    eyebrow: "A day at a time",
    title: "This is Ladakh Overland, day by day",
    body: "Drag the timeline or use the arrow keys. The line underneath is the altitude — it is the reason we spend three nights in Leh before going anywhere.",
    tripName: "Ladakh Overland",
    tripMeta: "12 nights · Jun–Sep · from €2,380",
    altLabel: "Altitude",
    dayLabel: "Day",
    prev: "Previous day",
    next: "Next day",
    days: [
      { n: 1, place: "Leh", title: "Land, and then do nothing", body: "You arrive at 3,500 m before breakfast. We check in, and then the rule is: no stairs, no walking uphill, no alcohol. Lunch is on the terrace and the afternoon is yours to sleep through.", altitude: 3500, move: "Flight from Delhi, 75 min", stay: "Nimmu House, garden room", eat: "Apricot, barley soup, endless tea" },
      { n: 2, place: "Leh", title: "The old town, slowly", body: "A flat morning through the bazaar and up to the mosque, then the Namgyal Tsemo path only if everyone is breathing easily. Most groups are not, on day two, and that is fine.", altitude: 3500, move: "On foot, about 4 km", stay: "Nimmu House", eat: "Momos at the Tibetan kitchen" },
      { n: 3, place: "Leh", title: "Monasteries down the valley", body: "Thiksey at 6:45 for morning prayers, which is the single best hour of the trip and worth the alarm. Hemis after lunch, then back down to the river.", altitude: 3300, move: "Minibus, 60 km", stay: "Nimmu House", eat: "Thukpa at a truckers' dhaba" },
      { n: 4, place: "Khardung La", title: "Over the pass to Nubra", body: "The high point of the trip at 5,350 m, and we stop for twenty minutes at most — long enough for the photograph, short enough that nobody gets a headache. Down into Nubra by mid-afternoon.", altitude: 5350, move: "Minibus, 120 km, 5 hrs", stay: "Hundar homestay", eat: "Dinner with the family, in the kitchen" },
      { n: 5, place: "Nubra", title: "Sand dunes and a cold river", body: "A morning walk along the Shyok, then the dunes at Hundar. Bactrian camels are here and yes, you can ride one, but the walk is better.", altitude: 3100, move: "On foot", stay: "Hundar homestay", eat: "Apricot everything" },
      { n: 6, place: "Turtuk", title: "The village that changed country", body: "Right up near the line of control, Balti-speaking and only open to visitors since 2010. We stay the night, which almost nobody does.", altitude: 2900, move: "Minibus, 85 km", stay: "Turtuk guesthouse", eat: "Balti bread, baked in the wall" },
      { n: 7, place: "Nubra", title: "Back down the valley", body: "A slow drive with three stops that are not on any itinerary, because our guide grew up two villages over.", altitude: 3100, move: "Minibus, 85 km", stay: "Hundar homestay", eat: "Packed lunch by the river" },
      { n: 8, place: "Pangong", title: "The long day", body: "Nine hours over the Chang La to the lake. It is a hard day and we do not pretend otherwise, but the last hour is the best drive in India.", altitude: 4350, move: "Minibus, 270 km, 9 hrs", stay: "Spangmik camp, heated tents", eat: "Soup, and more soup" },
      { n: 9, place: "Pangong", title: "A whole day at the lake", body: "Nothing scheduled. Walk the shore, sit, read. The colour changes about six times between breakfast and sunset and people mostly just watch it.", altitude: 4350, move: "On foot", stay: "Spangmik camp", eat: "Camp kitchen" },
      { n: 10, place: "Hemis", title: "Down to the Indus", body: "Back over the pass in the morning while the road is still frozen hard, then a long lunch in Shey and an easy afternoon.", altitude: 3400, move: "Minibus, 220 km", stay: "Shey farmhouse", eat: "Skyu, hand-rolled" },
      { n: 11, place: "Leh", title: "The last full day", body: "A morning at the Central Asian Museum, an afternoon in the bazaar for the shopping everyone has been putting off, and dinner all together.", altitude: 3500, move: "Minibus, 20 km", stay: "Nimmu House", eat: "Group dinner, our treat" },
      { n: 12, place: "Leh", title: "Early flight home", body: "Departures are before dawn because that is when the air is calm enough to fly out of Leh. Breakfast boxes are in the lobby from 4:30.", altitude: 3500, move: "Flight to Delhi, 75 min", stay: "—", eat: "Breakfast box" },
    ] as Day[],
  },

  cost: {
    eyebrow: "What it costs",
    title: "Move the sliders. That is the price.",
    body: "No supplements appear at checkout. Everything below is included in what you see — the only things you pay for separately are your flights to India and lunches on free days.",
    tripLabel: "Trip",
    travellersLabel: "Travellers",
    roomLabel: "Room",
    rooms: [
      { id: "shared", label: "Shared twin", delta: 0, note: "Matched with someone of the same gender" },
      { id: "single", label: "Single room", delta: 340, note: "Guaranteed, on every night" },
    ],
    extras: [
      { id: "train", label: "First-class rail upgrade", price: 180, note: "On the two overnight legs" },
      { id: "photo", label: "Photography guide", price: 260, note: "Joins the group for four days" },
      { id: "carbon", label: "Double the carbon contribution", price: 45, note: "We already pay the first half" },
    ],
    perPerson: "per person",
    totalLabel: "Total for your group",
    included: {
      title: "In the price",
      items: ["Every night's accommodation", "All internal transport", "Breakfast daily, most dinners", "Guide for the whole trip", "Every entry fee", "Carbon contribution"],
    },
    excluded: {
      title: "Not in the price",
      items: ["Flights to and from India", "Visa", "Travel insurance", "Lunches on free days", "Tips, which are genuinely optional"],
    },
    cta: "Hold a place",
    holdNote: "A place is held for 72 hours. Nothing is charged until you confirm.",
  },

  guides: {
    eyebrow: "Your guides",
    title: "The whole trip, one person",
    body: "No handovers at state borders. The guide who meets you at the airport is the one at dinner on the last night, and they are from where you are going.",
    image: "/templates/travella/guide.webp",
    imageAlt: "A guide standing on a mountain road, looking back towards the group",
    list: [
      { id: "tenzin", name: "Tenzin Angmo", base: "Leh, Ladakh", years: "9 years", languages: ["English", "Ladakhi", "Hindi"], photo: "/templates/travella/guide.webp", line: "Grew up in Nubra. Knows which pass is open before the police do." },
      { id: "reshma", name: "Reshma Nair", base: "Kochi, Kerala", years: "12 years", languages: ["English", "Malayalam", "Tamil"], photo: "/templates/travella/guide.webp", line: "Trained as a botanist. You will learn the name of every tree." },
      { id: "vikram", name: "Vikram Rathore", base: "Jodhpur, Rajasthan", years: "15 years", languages: ["English", "Hindi", "Marwari"], photo: "/templates/travella/guide.webp", line: "Third generation in the desert. His uncle owns the camels." },
    ] as Guide[],
  },

  promise: {
    eyebrow: "How we work",
    title: "Six things we will not do",
    items: [
      { n: "01", t: "No group over twelve", b: "Thirteen people cannot eat in a family kitchen, and that is most of what makes these trips work." },
      { n: "02", t: "No shopping stops", b: "Nobody gets a commission for taking you to a carpet showroom. There are no carpet showrooms." },
      { n: "03", t: "No internal flights we can avoid", b: "Trains are slower, cheaper and the best part of the day. We only fly into Leh, because there is no road in winter." },
      { n: "04", t: "No hotel we have not slept in", b: "Every property on every trip has been stayed in by someone on our team within the last eighteen months." },
      { n: "05", t: "No single supplement surprise", b: "If you want your own room the price is on the page, and it is the same in January as in November." },
      { n: "06", t: "No pretending about the hard days", b: "Day eight of Ladakh is nine hours in a minibus. We tell you before you book, not after." },
    ],
  },

  reviews: {
    eyebrow: "Travellers",
    title: "1,240 reviews, 4.9 average",
    list: [
      { id: "r1", name: "Hannah Vogel", trip: "Ladakh Overland, September", photo: "/templates/travella/guest-a.webp", quote: "The acclimatisation days felt indulgent on day two and completely essential by day four. I watched another group turn around at the pass while we were fine." },
      { id: "r2", name: "Marcus Bell", trip: "Backwaters & Hill Country, November", photo: "/templates/travella/guest-b.webp", quote: "I have been on the big-operator version of this trip. This one had eleven fewer people and about four times as much actual Kerala in it." },
      { id: "r3", name: "Aditi Sharma", trip: "Forts of the Thar, February", photo: "/templates/travella/guest-c.webp", quote: "I am Indian and I was braced for the sanitised version. Vikram took us to his cousin's for lunch on day six. That does not happen on a coach tour." },
    ] as Review[],
  },

  cta: {
    title: "Departures fill about four months out.",
    body: "Tell us roughly when you can travel and we will send back the two or three trips that actually fit, with the dates that are still open.",
    primary: "Plan a trip",
    secondary: "Call " + "+91 80 4711 0900",
    note: "Replies within a working day, from a person who has been there.",
  },

  footer: {
    blurb: "Travella Journeys Pvt Ltd. Registered tour operator, Ministry of Tourism, Government of India.",
    columns: [
      { title: "Trips", links: ["South India", "Rajasthan", "The Himalaya", "North East", "Fixed departures"] },
      { title: "Practical", links: ["What is included", "Visas", "Insurance", "Fitness levels", "Solo travellers"] },
      { title: "Travella", links: ["How we work", "Our guides", "Carbon", "Careers", "Press"] },
    ],
    copyright: "© 2026 Travella Journeys Pvt Ltd.",
    legal: ["Booking conditions", "Privacy", "Financial protection"],
  },
} as const;

export type TravellaContent = typeof travella;
