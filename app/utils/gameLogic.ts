export const locations = [
  "Beach",
  "Movie Theater",
  "Supermarket",
  "Library",
  "Amusement Park",
  "Museum",
  "Airport",
  "Restaurant",
  "School",
  "Hospital",
  "Bank",
  "Zoo",
  "Hotel",
  "Gym",
  "Cruise Ship",
  "Casino",
  "Space Station",
  "Submarine",
  "Castle",
  "Circus",
  "Police Station",
  "University",
  "Farm",
  "Ski Resort",
  "Wedding Venue",
  "Court House",
  "Art Gallery",
  "Concert Hall",
  "Haunted House",
  "Pirate Ship",
];

const difficultLocations = [
  "Park",
  "Beach",
  "Library",
  "Museum",
  "Zoo",
  "Café",
  "Airport",
  "Hotel",
  "Market",
  "Stadium",
  "Theater",
  "School",
  "Office",
  "Farm",
  "Clinic",
  "Church",
  "Gym",
  "Mall",
  "Playground",
  "Bakery",
  "Restaurant",
  "Aquarium",
  "Gallery",
  "Fountain",
  "Castle",
  "Camp",
  "Garden",
  "Farmstand",
  "Amphitheater",
  "Harbor",
  "Plaza",
  "Monastery",
  "Market Square",
  "Ice Rink",
  "Workshop",
  "Temple",
  "Winery",
  "Observatory",
  "Riverbank",
  "Boardwalk",
  "Lighthouse",
  "Docks",
  "Casino",
  "Concert Hall",
  "Mall",
  "Community Center",
  "Historical Site",
  "Safari",
  "Picnic",
  "Sports Complex",
  "Art Studio",
  "Spa",
  "Retreat Center",
  "Co-Working Space",
  "Wellness Center",
  "Sculpture Park",
  "Racetrack",
  "Vineyard",
  "Ranch",
  "Beach House",
  "Ski Resort",
  "Hot Springs",
  "Water Park",
  "Amusement Park",
  "Thrift Store",
  "Arcade",
  "Dog Park",
  "Climbing Gym",
  "Farm Market",
  "Convention Center",
  "Ski Lodge",
  "Art Fair",
  "Sand Dunes",
  "Eco-Park",
  "Surf School",
  "Escape Room",
  "Craft Fair",
  "Meditation Center",
  "Flower Shop",
  "Petting Zoo",
  "Wildlife Refuge",
  "Amusement Center",
  "Adventure Park",
  "Conference Center",
  "Shopping District",
  "Fitness Center",
  "Summer Camp",
  "Historical Landmark",
  "Rooftop Bar",
  "Outdoor Theater",
  "Pottery Shop",
  "Hiking Lodge",
  "Sports Arena",
  "Dance Hall",
  "Youth Center",
  "Recording Studio",
  "Race Track",
  "Mountain Lodge",
  "Concert Venue",
  "Painting Studio",
  "Video Arcade",
  "Archery Club",
  "Bike Path",
  "Climbing Wall",
  "Craft Brewery",
  "Art Gallery",
  "Comedy Club",
  "Science Museum",
  "Sports Lounge",
  "Yoga Retreat",
  "Hot Spring",
  "Treehouse",
  "Historical Village",
  "Haunted House",
  "Escape Game",
  "Climbing Area",
  "Botanical Park",
  "Events Center",
  "Public Garden",
  "Ballroom",
  "Rock Climbing Gym",
  "Martial Arts Studio",
  "Dance Academy",
  "Music School",
];

const fantasyLocations = [
  "Medieval Castle",
  "Ancient Temple",
  "Secret Laboratory",
  "Underground Bunker",
  "Space Colony",
  "Pirate Cove",
  "Dragon's Lair",
  "Wizard Academy",
  "Haunted Mansion",
  "Time Machine",
  "Ninja Dojo",
  "Viking Village",
  "Lost City",
  "Crystal Cave",
  "Sky Palace",
];

export interface CustomList {
  name: string;
  locations: string[];
}

export function getCustomLists(): CustomList[] {
  const stored = localStorage.getItem("customLists");
  return stored ? JSON.parse(stored) : [];
}

export function saveCustomList(name: string, locations: string[], oldName?: string) {
  const customLists = getCustomLists();

  // If we're editing and the name changed, remove the old list
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

  // Normal save/update operation
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
  default: locations,
  difficult: difficultLocations,
  fantasy: fantasyLocations,
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

export function getAllLocationLists(): Record<string, string[]> {
  const baseList = locationLists as Record<string, string[]>;
  const customLists = getCustomLists().reduce((acc, list) => {
    acc[list.name] = list.locations;
    return acc;
  }, {} as Record<string, string[]>);

  return { ...baseList, ...customLists };
}

export function generateGame(
  playerCount: number,
  listType: LocationListKey = "default"
): { roles: string[]; location: string; spy: number } {
  const allLists = getAllLocationLists();
  const selectedList = allLists[listType] || allLists.default;
  const location = selectedList[Math.floor(Math.random() * selectedList.length)];
  const spy = Math.floor(Math.random() * playerCount);
  const roles = Array(playerCount).fill(location);
  roles[spy] = "Spy";
  return { roles: shuffleArray(roles), location, spy };
}
