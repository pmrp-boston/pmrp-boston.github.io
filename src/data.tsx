// This list can be added to indefinitely, the Shows type will read keys dynamically
// These should match the way the show is listed in the Bios form
export const SHOWS = {
  DANGEROUS: 'Dangerous Game',
  TOWNIES: 'Townies & Dragons',
  BELLAMY: 'Captain Bellamy'
} as const;

// This includes keys for all shows currently in the SHOWS list
export type ShowKeys = typeof SHOWS[keyof typeof SHOWS];

export interface Person {
  name: string;
  shows: ShowKeys[];
  roles: string;
  bio: string;
}

// This includes ONLY the names of the shows that should be displayed for this production
// and associates them with their string keys
export const showNames = {
     'Dangerous Game': 'The Most Dangerous Game',
     'Townies & Dragons': 'Townies & Dragons: Barrel Full of Peril',
     'Captain Bellamy': 'The Bonnie Tales of Captain Bellamy: Song of Trickery',
}