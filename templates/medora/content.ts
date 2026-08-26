/**
 * Medora — demo content.
 *
 * Same contract as every template in `templates/`: all copy lives here.
 * Practitioners, clinics and availability are fictional demo data.
 *
 * Calendar days are fixed strings rather than generated from the current
 * date: a demo needs deterministic output so the server and client render
 * the same thing.
 */

export interface Speciality {
  id: string;
  name: string;
  blurb: string;
  icon: "heart" | "brain" | "bone" | "child" | "eye" | "tooth" | "lungs" | "skin";
}

export interface Practitioner {
  id: string;
  name: string;
  title: string;
  speciality: string;
  languages: string[];
  experience: string;
  photo: string;
  nextFree: string;
}

export interface Clinic {
  id: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  hours: { day: string; time: string }[];
  services: string[];
}

export const medora = {
  brand: { name: "Medora", tagline: "Clinics" },

  nav: {
    links: [
      { label: "Specialities", href: "#specialities" },
      { label: "Book", href: "#book" },
      { label: "Our doctors", href: "#doctors" },
      { label: "Locations", href: "#locations" },
    ],
    call: "080 4567 1200",
    cta: "Book appointment",
    textSizeLabel: "Text size",
  },

  hero: {
    badge: "Same-day appointments available",
    title: "Care that runs on time.",
    body: "Medora is a group of four neighbourhood clinics in Bengaluru. Book in under a minute, see the same doctor each visit, and get your reports on your phone the same day.",
    primary: "Book an appointment",
    secondary: "Find a doctor",
    assurances: [
      { k: "Average wait", v: "8 min" },
      { k: "Doctors", v: "24" },
      { k: "Clinics", v: "4" },
    ],
    emergency: "For emergencies call 108 or go to your nearest emergency room.",
  },

  quickActions: [
    { title: "Book a visit", body: "In person or video, usually within a day.", href: "#book", icon: "calendar" },
    { title: "Find a doctor", body: "Filter by speciality and language.", href: "#doctors", icon: "search" },
    { title: "Get reports", body: "Lab results on your phone, same day.", href: "#", icon: "file" },
    { title: "Repeat prescription", body: "Renew without an appointment.", href: "#", icon: "pill" },
  ],

  specialities: {
    eyebrow: "Specialities",
    title: "What we look after",
    body: "General practice for everyday things, with specialists in the building for when it is not.",
    items: [
      { id: "general", name: "General medicine", blurb: "Everyday illness, check-ups and referrals.", icon: "heart" },
      { id: "paediatrics", name: "Paediatrics", blurb: "Newborn to eighteen, including vaccinations.", icon: "child" },
      { id: "cardiology", name: "Cardiology", blurb: "Heart health, ECG and stress testing.", icon: "heart" },
      { id: "orthopaedics", name: "Orthopaedics", blurb: "Joints, fractures and sports injuries.", icon: "bone" },
      { id: "dermatology", name: "Dermatology", blurb: "Skin, hair and allergy testing.", icon: "skin" },
      { id: "neurology", name: "Neurology", blurb: "Headache, sleep and nerve conditions.", icon: "brain" },
      { id: "ophthalmology", name: "Ophthalmology", blurb: "Vision testing and eye health.", icon: "eye" },
      { id: "pulmonology", name: "Pulmonology", blurb: "Asthma, breathing and sleep apnoea.", icon: "lungs" },
    ] as Speciality[],
  },

  booking: {
    eyebrow: "Book",
    title: "Four taps and you are seen",
    body: "No account needed. You will get a confirmation by SMS and a reminder the morning of your visit.",
    steps: ["Speciality", "Doctor", "Time", "Details"],
    visitTypes: [
      { id: "clinic", label: "At the clinic", note: "In person" },
      { id: "video", label: "Video consult", note: "From home" },
    ],
    days: [
      { id: "d1", label: "Mon", date: "14", slots: ["09:00", "09:40", "11:20", "15:00", "16:20"] },
      { id: "d2", label: "Tue", date: "15", slots: ["10:00", "10:40", "14:20", "17:00"] },
      { id: "d3", label: "Wed", date: "16", slots: [] },
      { id: "d4", label: "Thu", date: "17", slots: ["09:20", "12:00", "15:40", "16:20", "18:00"] },
      { id: "d5", label: "Fri", date: "18", slots: ["09:00", "11:00", "13:40"] },
      { id: "d6", label: "Sat", date: "19", slots: ["09:40", "10:20", "11:00"] },
    ],
    fullNote: "No slots left on this day. Wednesday is theatre day for most of our team.",
    confirmTitle: "That is booked.",
    confirmBody: "We have sent a confirmation by SMS. You can reschedule from the link in that message up to two hours before.",
    fields: { name: "Full name", phone: "Mobile number", reason: "What is it about? (optional)" },
    submit: "Confirm appointment",
    back: "Back",
  },

  doctors: {
    eyebrow: "Our doctors",
    title: "You will see the same face each visit",
    body: "We roster so that you keep your doctor. Continuity is most of what makes primary care work.",
    filterAll: "All specialities",
    langAll: "Any language",
    empty: "No doctors match that combination. Try widening the filters.",
    list: [
      {
        id: "arun",
        name: "Dr Arun Pillai",
        title: "MBBS, MD — Internal Medicine",
        speciality: "General medicine",
        languages: ["English", "Malayalam", "Hindi"],
        experience: "14 years",
        photo: "/templates/medora/dr-arun.webp",
        nextFree: "Tomorrow, 09:20",
      },
      {
        id: "nadia",
        name: "Dr Nadia Rahman",
        title: "MBBS, DNB — Cardiology",
        speciality: "Cardiology",
        languages: ["English", "Hindi", "Urdu"],
        experience: "11 years",
        photo: "/templates/medora/dr-nadia.webp",
        nextFree: "Thursday, 15:40",
      },
      {
        id: "imani",
        name: "Dr Imani Okoro",
        title: "MBBS, MD — Paediatrics",
        speciality: "Paediatrics",
        languages: ["English", "Kannada"],
        experience: "9 years",
        photo: "/templates/medora/dr-imani.webp",
        nextFree: "Today, 16:20",
      },
      {
        id: "samuel",
        name: "Dr Samuel Fernandes",
        title: "MBBS, MS — Orthopaedics",
        speciality: "Orthopaedics",
        languages: ["English", "Konkani", "Kannada"],
        experience: "17 years",
        photo: "/templates/medora/dr-samuel.webp",
        nextFree: "Friday, 11:00",
      },
    ] as Practitioner[],
  },

  visit: {
    eyebrow: "Your visit",
    title: "What actually happens",
    body: "No surprises, and no forms you have already filled in once.",
    image: "/templates/medora/consult.webp",
    steps: [
      { n: "01", t: "Arrive five minutes early", b: "Check in at the desk or on your phone. Bring an ID the first time." },
      { n: "02", t: "See your doctor on time", b: "We hold 20 minutes per appointment. If we run late, reception will tell you before you sit down." },
      { n: "03", t: "Tests in the building", b: "Bloods, ECG and X-ray are downstairs. Most results are back the same day." },
      { n: "04", t: "Everything on your phone", b: "Prescription, notes and reports arrive by SMS. Nothing to collect." },
    ],
  },

  diagnostics: {
    eyebrow: "On site",
    title: "Most tests happen downstairs",
    body: "Pathology, imaging and cardiac testing under the same roof, so a diagnosis rarely takes more than a day.",
    image: "/templates/medora/diagnostics.webp",
    items: ["Pathology lab", "Digital X-ray", "Ultrasound", "ECG & Echo", "Pulmonary function", "Allergy testing"],
  },

  locations: {
    eyebrow: "Locations",
    title: "Four clinics, one record",
    body: "Your history follows you. Book at whichever is closer that day.",
    clinics: [
      {
        id: "indiranagar",
        name: "Medora Indiranagar",
        area: "Indiranagar",
        address: "212, 100 Feet Road\nIndiranagar, Bengaluru 560038",
        phone: "080 4567 1200",
        hours: [
          { day: "Mon – Fri", time: "08:00 – 20:00" },
          { day: "Saturday", time: "08:00 – 17:00" },
          { day: "Sunday", time: "09:00 – 13:00" },
        ],
        services: ["General medicine", "Paediatrics", "Cardiology", "Pathology lab", "Digital X-ray"],
      },
      {
        id: "koramangala",
        name: "Medora Koramangala",
        area: "Koramangala",
        address: "5th Block, 80 Feet Road\nKoramangala, Bengaluru 560095",
        phone: "080 4567 1240",
        hours: [
          { day: "Mon – Fri", time: "08:00 – 21:00" },
          { day: "Saturday", time: "08:00 – 18:00" },
          { day: "Sunday", time: "Closed" },
        ],
        services: ["General medicine", "Orthopaedics", "Dermatology", "Physiotherapy", "Pathology lab"],
      },
      {
        id: "jayanagar",
        name: "Medora Jayanagar",
        area: "Jayanagar",
        address: "4th Block, 11th Main\nJayanagar, Bengaluru 560011",
        phone: "080 4567 1280",
        hours: [
          { day: "Mon – Fri", time: "08:30 – 19:30" },
          { day: "Saturday", time: "08:30 – 16:00" },
          { day: "Sunday", time: "Closed" },
        ],
        services: ["General medicine", "Neurology", "Ophthalmology", "Pathology lab"],
      },
      {
        id: "whitefield",
        name: "Medora Whitefield",
        area: "Whitefield",
        address: "Prestige Shantiniketan\nWhitefield, Bengaluru 560048",
        phone: "080 4567 1320",
        hours: [
          { day: "Mon – Fri", time: "08:00 – 20:00" },
          { day: "Saturday", time: "08:00 – 17:00" },
          { day: "Sunday", time: "09:00 – 13:00" },
        ],
        services: ["General medicine", "Paediatrics", "Pulmonology", "Ultrasound", "Pathology lab"],
      },
    ] as Clinic[],
  },

  cta: {
    title: "Something you have been putting off?",
    body: "Most appointments are available within a day. It takes about a minute to book.",
    primary: "Book an appointment",
    secondary: "Call 080 4567 1200",
  },

  footer: {
    blurb: "Medora Clinics Pvt Ltd. Registered with the Karnataka Medical Council.",
    columns: [
      { title: "Care", links: ["Specialities", "Our doctors", "Diagnostics", "Health checks", "Vaccinations"] },
      { title: "Patients", links: ["Book a visit", "Reports", "Prescriptions", "Insurance", "Fees"] },
      { title: "Clinics", links: ["Indiranagar", "Koramangala", "Jayanagar", "Whitefield"] },
    ],
    emergency: "Emergency: 108",
    copyright: "© 2026 Medora Clinics Pvt Ltd.",
  },
} as const;

export type MedoraContent = typeof medora;
