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

export interface Show {
  showName: string;
  writerCredit?: string;
  adapterCredit?: string;
  directorCredits: Person[];
  description?: string;
  credits: Person[];
  foleyCredits: Person[];
}

// This includes ONLY the names of the shows that should be displayed for this production
// and associates them with their string keys
export const showNames = {
  'Dangerous Game': 'The Most Dangerous Game',
  'Townies & Dragons': 'Townies & Dragons: Barrel Full of Peril',
  'Captain Bellamy': 'The Bonnie Tales of Captain Bellamy: Song of Trickery',
}

// Function to group people by show
export const groupPeopleByShow = (people: Person[]) => {
  const grouped: { [key in ShowKeys]: Person[] } = {} as { [key in ShowKeys]: Person[] };
  people.forEach(person => {
    person.shows.forEach(show => {
      if (!grouped[show]) {
        grouped[show] = [];
      }
      if (!person.roles.includes('Writer') && !person.roles.includes('Director') && !person.roles.includes('Adapted') && !person.roles.includes('Foley')) {
        grouped[show]!.push(person);
      }
    });
  });
  return grouped;
};
