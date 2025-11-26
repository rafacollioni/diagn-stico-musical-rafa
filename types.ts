export interface EventData {
  // General
  hostName: string; // New field for Client/Host name
  eventType: string;
  date: string;
  location: string;
  guestCount: string;
  guestProfile: string;

  // Musical Structure
  musicMoments: string[]; // Cerimônia, Recepção, Festa
  formation: string; // Voz e Violão, Duo, etc.
  repertoireType: string; // Show Normal, Show Especial
  showDuration: string; // 1h30, 2h, etc.
  
  // Specifics
  specialSongs: string; // Yes/No or details
  doNotPlay: string;
  tasteDiversity: string;
  
  // Vibe & Interaction
  expectedInteraction: string; // Normal, Alta
  volume: string; // Padrão, Alto, Baixo
  interactiveMoments: string[]; // Cantar junto, etc.
  attire: string; // Personalizado, Normal

  // Logistics/Tech
  overtimePossibility: boolean;
  soundSystemProvided: boolean;
  vendorReferral: boolean;
  stageSize: string;
  acousticsNotes: string;
  equipmentStorage: boolean;
  
  // Presentation Content (Manual)
  conceptSummary: string;
  suggestedSetlist: string;
}

export const INITIAL_DATA: EventData = {
  hostName: '',
  eventType: '',
  date: '',
  location: '',
  guestCount: '',
  guestProfile: '',
  musicMoments: [],
  formation: '',
  repertoireType: 'Show Normal',
  showDuration: '',
  specialSongs: '',
  doNotPlay: '',
  tasteDiversity: '',
  expectedInteraction: 'Normal',
  volume: 'Padrão',
  interactiveMoments: [],
  attire: 'Normal',
  overtimePossibility: false,
  soundSystemProvided: false,
  vendorReferral: false,
  stageSize: '',
  acousticsNotes: '',
  equipmentStorage: true,
  conceptSummary: '',
  suggestedSetlist: '',
};