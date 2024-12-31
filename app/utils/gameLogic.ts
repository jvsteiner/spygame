import { Text } from "@/components/ui/text";

// Convert simple location arrays to the new format
const defaultLocations = {
  Beach: [],
  "Movie Theater": [],
  Supermarket: [],
  Library: [],
  "Amusement Park": [],
  Museum: [],
  Airport: [],
  Restaurant: [],
  School: [],
  Hospital: [],
  Bank: [],
  Zoo: [],
  Hotel: [],
  Gym: [],
  "Cruise Ship": [],
  Casino: [],
  "Space Station": [],
  Submarine: [],
  Castle: [],
  Circus: [],
  "Police Station": [],
  University: [],
  Farm: [],
  "Ski Resort": [],
  "Wedding Venue": [],
  "Court House": [],
  "Art Gallery": [],
  "Concert Hall": [],
  "Haunted House": [],
  "Pirate Ship": [],
};

const difficultLocations = {
  Park: [],
  Beach: [],
  Library: [],
  Museum: [],
  Zoo: [],
  Café: [],
  Airport: [],
  Hotel: [],
  Market: [],
  Stadium: [],
  Theater: [],
  School: [],
  Office: [],
  Farm: [],
  Clinic: [],
  Church: [],
  Gym: [],
  Mall: [],
  Playground: [],
  Bakery: [],
  Restaurant: [],
  Aquarium: [],
  Gallery: [],
  Fountain: [],
  Castle: [],
  Camp: [],
  Garden: [],
  Farmstand: [],
  Amphitheater: [],
  Harbor: [],
  Plaza: [],
  Monastery: [],
  "Market Square": [],
  "Ice Rink": [],
  Workshop: [],
  Temple: [],
  Winery: [],
  Observatory: [],
  Riverbank: [],
  Boardwalk: [],
  Lighthouse: [],
  Docks: [],
  Casino: [],
  "Concert Hall": [],
  "Community Center": [],
  "Historical Site": [],
  Safari: [],
  Picnic: [],
  "Sports Complex": [],
  "Art Studio": [],
  Spa: [],
  "Retreat Center": [],
  "Co-Working Space": [],
  "Wellness Center": [],
  "Sculpture Park": [],
  Racetrack: [],
  Vineyard: [],
  Ranch: [],
  "Beach House": [],
  "Ski Resort": [],
  "Hot Springs": [],
  "Water Park": [],
  "Amusement Park": [],
  "Thrift Store": [],
  Arcade: [],
  "Dog Park": [],
  "Climbing Gym": [],
  "Farm Market": [],
  "Convention Center": [],
  "Ski Lodge": [],
  "Art Fair": [],
  "Sand Dunes": [],
  "Eco-Park": [],
  "Surf School": [],
  "Escape Room": [],
  "Craft Fair": [],
  "Meditation Center": [],
  "Flower Shop": [],
  "Petting Zoo": [],
  "Wildlife Refuge": [],
  "Amusement Center": [],
  "Adventure Park": [],
  "Conference Center": [],
  "Shopping District": [],
  "Fitness Center": [],
  "Summer Camp": [],
  "Historical Landmark": [],
  "Rooftop Bar": [],
  "Outdoor Theater": [],
  "Pottery Shop": [],
  "Hiking Lodge": [],
  "Sports Arena": [],
  "Dance Hall": [],
  "Youth Center": [],
  "Recording Studio": [],
  "Race Track": [],
  "Mountain Lodge": [],
  "Concert Venue": [],
  "Painting Studio": [],
  "Video Arcade": [],
  "Archery Club": [],
  "Bike Path": [],
  "Climbing Wall": [],
  "Craft Brewery": [],
  "Art Gallery": [],
  "Comedy Club": [],
  "Science Museum": [],
  "Sports Lounge": [],
  "Yoga Retreat": [],
  "Hot Spring": [],
  Treehouse: [],
  "Historical Village": [],
  "Haunted House": [],
  "Escape Game": [],
  "Climbing Area": [],
  "Botanical Park": [],
  "Events Center": [],
  "Public Garden": [],
  Ballroom: [],
  "Rock Climbing Gym": [],
  "Martial Arts Studio": [],
  "Dance Academy": [],
  "Music School": [],
};

const fantasyLocations = {
  "Medieval Castle": [],
  "Ancient Temple": [],
  "Secret Laboratory": [],
  "Underground Bunker": [],
  "Space Colony": [],
  "Pirate Cove": [],
  "Dragon's Lair": [],
  "Wizard Academy": [],
  "Haunted Mansion": [],
  "Time Machine": [],
  "Ninja Dojo": [],
  "Viking Village": [],
  "Lost City": [],
  "Crystal Cave": [],
  "Sky Palace": [],
};

// Classic locations with roles (as provided)
const classicLocations = {
  Airplane: [
    "Business Class Passenger",
    "Coach Passenger",
    "Copilot",
    "Flight Attendant",
    "Flight Engineer",
    "Pilot",
    "Stowaway",
  ],
  "Amusement Park": ["Clown", "Kid", "Mechanic", "Ride Operator", "Tourist", "Vendor", "Visitor"],
  Bank: ["Armored Car Driver", "Branch Manager", "Consultant", "Customer", "Security Guard", "Robber", "Teller"],
  Beach: [
    "Entertainment Director",
    "Food Vendor",
    "Lifeguard",
    "Paraglider",
    "Photographer w/ Monkey",
    "Thief",
    "Vacationer",
  ],
  Carnival: ["Costumer", "Photographer", "Reenactor", "Reporter", "Roleplaying Game Fan", "Tourist", "Vendor"],
  Casino: ["Administrator", "Bartender", "Bouncer", "Cardsharp", "Dealer", "Head of Security", "Gambler"],
  "Circus Tent": ["Acrobat", "Animal Tamer", "Circus-Goer", "Clown", "Juggler", "Knife Thrower", "Magician"],
  "Corporate Party": ["Accountant", "Administrative Assistant", "CEO", "Courier", "Emcee", "Manager", "Party Crasher"],
  "Crusader Army": ["Archer", "Bishop", "Captive Saracen", "Knight", "Monk", "Servant", "Squire"],
  "Day Spa": [
    "Beautician",
    "Customer",
    "Geoscientist",
    "Hydrologist",
    "Makeup Specialist",
    "Masseur",
    "Nail Specialist",
  ],
  Embassy: ["Ambassador", "Bureaucrat", "Diplomat", "Refugee", "Secretary", "Security Guard", "Tourist"],
  Hospital: ["Head Physician", "Intern", "Nurse", "Pathologist", "Patient", "Physician", "Surgeon"],
  Hotel: ["Bartender", "Doorman", "Guest", "Hotel Manager", "Housekeeper", "Receptionist", "Security Guard"],
  "Military Base": ["Colonel", "Deserter", "Medic", "Non-Commissioned Officer", "Private", "Sales Clerk", "Sentry"],
  "Movie Studio": ["Actor", "Cameraman", "Costume Designer", "Director", "Extra", "Sound Engineer", "Stuntman"],
  "Night Club": ["Barman", "Bouncer", "Dancer", "DJ", "Model", "Pick-Up Artist", "Regular"],
  "Ocean Liner": ["Attendant", "Bartender", "Captain", "Cook", "Musician", "Radio Operator", "Wealthy Passenger"],
  "Passenger Train": [
    "Conductor",
    "Dining Car Cook",
    "Passenger",
    "Passenger Car Attendant",
    "Stoker",
    "Ticket Taker",
    "Vendor",
  ],
  "Pirate Ship": ["Cabin Boy", "Cook", "Gunner", "Seaman", "Shackled Prisoner", "Slave", "Swashbuckling Captain"],
  "Polar Station": [
    "Biologist",
    "Expedition Leader",
    "Geoscientist",
    "Hydrologist",
    "Medic",
    "Researcher",
    "Radio Operator",
  ],
  "Police Station": ["Attorney", "Beat Cop", "Criminal Lawyer", "Detective", "Journalist", "Lieutenant", "Suspect"],
  Restaurant: ["Busboy", "Chef", "Customer", "Food Critic", "Maître d'", "Musician", "Waiter"],
  School: ["Gym Teacher", "Janitor", "Math Teacher", "Principal", "Security Guard", "Student", "Vice Principal"],
  "Service Station": [
    "Biker",
    "Car Washer",
    "Driver",
    "Electrical Technician",
    "Manager",
    "Service Receptionist",
    "Tire Service Technician",
  ],
  "Space Station": [
    "Alien",
    "Doctor",
    "Mechanical Engineer",
    "Mission Commander",
    "Pilot",
    "Research Engineer",
    "Space Tourist",
  ],
  Submarine: ["Commander", "Cook", "Electrical Officer", "Navigator", "Radio Operator", "Sailor", "Sonar Operator"],
  Supermarket: ["Butcher", "Cashier", "Customer", "Delivery Man", "Janitor", "Merchandiser", "Security Guard"],
  Theatre: ["Actor", "Audience Member", "Cloakroom Attendant", "Director", "Prompter", "Stage Hand", "Usher"],
  University: ["Campus Security", "Dean", "Graduate Student", "President", "Professor", "Researcher", "Student"],
  Zoo: ["Caretaker", "General Manager", "Guide", "Janitor", "Vendor", "Veterinarian", "Visitor"],
};

export interface CustomList {
  name: string;
  locations: Record<string, string[]>; // Updated to match new format
}

export function getCustomLists(): CustomList[] {
  const stored = localStorage.getItem("customLists");
  return stored ? JSON.parse(stored) : [];
}

export function saveCustomList(name: string, locations: Record<string, string[]>, oldName?: string) {
  const customLists = getCustomLists();

  if (oldName && oldName !== name) {
    const filteredLists = customLists.filter((list) => list.name !== oldName);
    const existingIndex = filteredLists.findIndex((list) => list.name === name);

    if (existingIndex >= 0) {
      filteredLists[existingIndex] = { name, locations };
    } else {
      filteredLists.push({ name, locations });
    }

    localStorage.setItem("customLists", JSON.stringify(filteredLists));
    return;
  }

  const existingIndex = customLists.findIndex((list) => list.name === name);
  if (existingIndex >= 0) {
    customLists[existingIndex] = { name, locations };
  } else {
    customLists.push({ name, locations });
  }

  localStorage.setItem("customLists", JSON.stringify(customLists));
}

export function deleteCustomList(name: string) {
  const customLists = getCustomLists();
  const filteredLists = customLists.filter((list) => list.name !== name);
  localStorage.setItem("customLists", JSON.stringify(filteredLists));
}

export function isCustomList(name: string): boolean {
  return getCustomLists().some((list) => list.name === name);
}

export const locationLists = {
  default: defaultLocations,
  difficult: difficultLocations,
  fantasy: fantasyLocations,
  classic: classicLocations,
} as const;

export type LocationListKey = keyof typeof locationLists | string;

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function getAllLocationLists(): Record<string, Record<string, string[]>> {
  const baseList = locationLists as Record<string, Record<string, string[]>>;
  const customLists = getCustomLists().reduce((acc, list) => {
    acc[list.name] = list.locations;
    return acc;
  }, {} as Record<string, Record<string, string[]>>);

  return { ...baseList, ...customLists };
}

export function generateGame(
  playerCount: number,
  listType: LocationListKey = "default"
): { roles: string[]; location: string; spy: number } {
  if (playerCount < 3) {
    throw new Error("Cannot start game with fewer than 3 players");
  }

  const allLists = getAllLocationLists();
  const selectedList = allLists[listType] || allLists.default;

  // Select random location
  const locations = Object.keys(selectedList);
  const location = locations[Math.floor(Math.random() * locations.length)];

  // Get roles for the location
  const availableRoles = selectedList[location] || [];

  // Generate roles for all players
  const roles = Array(playerCount)
    .fill(location)
    .map((loc, index) => {
      if (availableRoles.length === 0) {
        return `Location: ${loc}`;
      }
      // Assign roles sequentially, wrapping around if we run out
      const roleIndex = index % availableRoles.length;
      return `Location: ${loc}\nRole: ${availableRoles[roleIndex]}`;
    });

  // Choose spy
  const spy = Math.floor(Math.random() * playerCount);
  roles[spy] = "Spy";

  // Shuffle the non-spy roles to make it less predictable
  const nonSpyRoles = roles.filter((_, i) => i !== spy);
  const shuffledNonSpyRoles = shuffleArray(nonSpyRoles);

  // Reconstruct the final array with the spy in the same position
  const finalRoles = [];
  let nonSpyIndex = 0;
  for (let i = 0; i < playerCount; i++) {
    if (i === spy) {
      finalRoles.push("Spy");
    } else {
      finalRoles.push(shuffledNonSpyRoles[nonSpyIndex++]);
    }
  }

  return { roles: finalRoles, location, spy };
}
