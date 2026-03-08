import type { LocalizedContent, ModalContent, CardData } from '../models/content.model';

export const PROJECT_TITLE: LocalizedContent = {
  es: 'Crónicas LGTBI del Conflicto Armado',
  fr: 'Chroniques LGTBI du Conflit Armé',
  en: 'LGTBI Chronicles of the Armed Conflict'
};

export const INTRO_TEXT: LocalizedContent = {
  es: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  fr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
};

export const TAB2_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

function createModalContent(raw: string, tooltips: Record<number, string>): ModalContent {
  return { rawText: raw, tooltips };
}

const modalContent1: ModalContent = createModalContent(
  'Lorem ipsum dolor sit amet, {1}consectetur adipiscing elit{/1}. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, {2}quis nostrud exercitation{/2} ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  {
    1: 'Phrase describing the first highlighted concept in the chronicle.',
    2: 'Phrase describing the second highlighted concept with additional context.'
  }
);

const modalContent2: ModalContent = createModalContent(
  'Duis aute irure dolor in {1}reprehenderit in voluptate{/1} velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, {2}sunt in culpa qui officia{/2} deserunt mollit anim id est laborum.',
  {
    1: 'Descriptive tooltip for the first highlighted phrase.',
    2: 'Descriptive tooltip for the second highlighted phrase.'
  }
);

const modalContent3: ModalContent = createModalContent(
  'Curabitur pretium tincidunt lacus. {1}Nulla facilisi{/1}. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. {2}Vestibulum sapien{/2} proin quam.',
  {
    1: 'A brief descriptive message for this term.',
    2: 'Another descriptive tooltip for context.'
  }
);

export const CARDS_DATA: CardData[] = [
  {
    id: 1,
    title: { es: 'Card 1', fr: 'Carte 1', en: 'Card 1' },
    description: {
      es: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      fr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    imagePath: 'images/image1.jpg',
    hotspots: [
      { id: 'h1', x: 10, y: 15, width: 25, height: 20, modalContent: modalContent1 },
      { id: 'h2', x: 50, y: 40, width: 30, height: 25, modalContent: modalContent2 },
      { id: 'h3', x: 75, y: 70, width: 20, height: 15, modalContent: modalContent3 }
    ]
  },
  {
    id: 2,
    title: { es: 'Card 2', fr: 'Carte 2', en: 'Card 2' },
    description: {
      es: 'Sed do eiusmod tempor incididunt ut labore et dolore.',
      fr: 'Sed do eiusmod tempor incididunt ut labore et dolore.',
      en: 'Sed do eiusmod tempor incididunt ut labore et dolore.'
    },
    imagePath: 'images/image2.jpg',
    hotspots: [
      { id: 'h1', x: 20, y: 25, width: 20, height: 18, modalContent: modalContent2 },
      { id: 'h2', x: 60, y: 55, width: 25, height: 22, modalContent: modalContent3 },
      { id: 'h3', x: 15, y: 75, width: 35, height: 15, modalContent: modalContent1 }
    ]
  },
  {
    id: 3,
    title: { es: 'Card 3', fr: 'Carte 3', en: 'Card 3' },
    description: {
      es: 'Ut enim ad minim veniam, quis nostrud exercitation.',
      fr: 'Ut enim ad minim veniam, quis nostrud exercitation.',
      en: 'Ut enim ad minim veniam, quis nostrud exercitation.'
    },
    imagePath: 'images/image3.jpg',
    hotspots: [
      { id: 'h1', x: 35, y: 10, width: 30, height: 25, modalContent: modalContent3 },
      { id: 'h2', x: 5, y: 50, width: 28, height: 20, modalContent: modalContent1 },
      { id: 'h3', x: 70, y: 80, width: 25, height: 18, modalContent: modalContent2 }
    ]
  }
];
