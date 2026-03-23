import type { LocalizedContent, LocalizedModalContent, CardData } from '../models/content.model';

/**
 * Page configuration - edit these values to customize the page title and tab labels.
 * All titles support Spanish (es), French (fr), and English (en).
 */
export const PAGE_CONFIG = {
  /** Main page title (header and browser tab) */
  title: {
    es: 'Amplificar la voz de las víctimas para la no-repetición',
    fr: 'Amplifier la voix des victimes pour éviter la répétition',
    en: 'Amplifying the voices of victims to avoid repetition'
  } satisfies LocalizedContent,
  /** Tab labels */
  tabs: {
    intro: {
      es: 'Introducción',
      fr: 'Introduction',
      en: 'Introduction'
    } satisfies LocalizedContent,
    second: {
      es: 'Comentarios de la traducción',
      fr: 'Commentaires de la traduction',
      en: 'Translation Comments'
    } satisfies LocalizedContent
  }
};

/** @deprecated Use PAGE_CONFIG.title instead */
export const PROJECT_TITLE = PAGE_CONFIG.title;

/** @deprecated Use PAGE_CONFIG.tabs.intro instead */
export const TAB_INTRO_LABEL = PAGE_CONFIG.tabs.intro;

/** @deprecated Use PAGE_CONFIG.tabs.second instead */
export const TAB_SECOND_LABEL = PAGE_CONFIG.tabs.second;

export const INTRO_TEXT: LocalizedContent = {
  es: 'Español: texto de prueba 2 jsuiashfuashfw Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  fr: 'Français: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  en: 'English: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
};

export const TAB2_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris. Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

function createLocalizedModalContent(
  title: LocalizedContent,
  rawText: LocalizedContent,
  tooltips: Record<number, LocalizedContent>
): LocalizedModalContent {
  return { title, rawText, tooltips };
}

const modalContent1: LocalizedModalContent = createLocalizedModalContent(
  { es: 'Crónica I', fr: 'Chronique I', en: 'Chronicle I' },
  {
    es: 'prueba crónica 1 Lorem ipsum dolor sit amet, {1}consectetur adipiscing elit{/1}. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, {2}quis nostrud exercitation{/2} ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    fr: 'Lorem ipsum dolor sit amet, {1}consectetur adipiscing elit{/1}. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, {2}quis nostrud exercitation{/2} ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    en: '<p>The Commission learned that, in Los Montes de María, many gay men and trans women were victims of cruel, inhumane, and degrading acts committed by paramilitary and police men during the 2000’s. In some cases, these acts included physical and psychological torture, such as those suffered by Soraida, a trans female victim of the {1}FARC-EP{/1}between 2004 and 2005, in the town of Arauquita, Arauca:</p><p>“When I lifted my head up, I felt the kick that broke me. I didn’t look up but I felt someone hitting me, so I grabbed onto the fence. When I saw blood pouring out, I tried to stop the bleeding and got out. I grabbed the T-shirt I had left outside and put it on the wound to stop the bleeding. The guerrilla member started insulting me and calling me names. He hit me in the face like twice and told me he was gonna kill me. I started to cry. He said no “faggots” or {2}“GAYtorades”{/2} were allowed there because we would corrupt the other kids… Back then, my hair wasn’t that long, but he grabbed me by the hair anyways and kept punching me in the face. Then, he said: ´Well, since you want to be a woman, I’ll do to you what we do to women´ He grabbed my hands and raped me. Up until the end, he kept hitting me and saying stuff, pointed at me with a gun and yelling, ‘I’ll kill you’. He then took out a blade and made a cut in my rectum. I was 10 years old.”</p><p>Trans woman, student, activist.</p>'
  },
  {
    1: {
      es: 'Frase que describe el primer concepto destacado en la crónica.',
      fr: 'Phrase décrivant le premier concept mis en évidence dans la chronique.',
      en: 'FARC-EP (Fuerzas Armadas Revolucionarias de Colombia – Ejército del Pueblo) are an insurgent politic-military organization that has existed for over 50 years in Colombia. '
    },
    2: {
      es: 'Frase que describe el segundo concepto destacado con contexto adicional.',
      fr: 'Phrase décrivant le deuxième concept mis en évidence avec un contexte supplémentaire.',
      en: 'A play on words between the terms “gay” and the energy drink “Gatorade.” Due to the similar pronunciation of “gay” and “ga” (in English), it has been coined as a way to refer to homosexual men as an insult. '
    }
  }
);

const modalContent2: LocalizedModalContent = createLocalizedModalContent(
  { es: 'Crónica II', fr: 'Chronique II', en: 'Chronicle II' },
  {
    es: 'Duis aute irure dolor in {1}reprehenderit in voluptate{/1} velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, {2}sunt in culpa qui officia{/2} deserunt mollit anim id est laborum.',
    fr: 'Duis aute irure dolor in {1}reprehenderit in voluptate{/1} velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, {2}sunt in culpa qui officia{/2} deserunt mollit anim id est laborum.',
    en: 'Duis aute irure dolor in {1}reprehenderit in voluptate{/1} velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, {2}sunt in culpa qui officia{/2} deserunt mollit anim id est laborum.'
  },
  {
    1: {
      es: 'Tooltip descriptivo para la primera frase destacada.',
      fr: 'Info-bulle descriptive pour la première phrase mise en évidence.',
      en: 'Descriptive tooltip for the first highlighted phrase.'
    },
    2: {
      es: 'Tooltip descriptivo para la segunda frase destacada.',
      fr: 'Info-bulle descriptive pour la deuxième phrase mise en évidence.',
      en: 'Descriptive tooltip for the second highlighted phrase.'
    }
  }
);

const modalContent3: LocalizedModalContent = createLocalizedModalContent(
  { es: 'Crónica III', fr: 'Chronique III', en: 'Chronicle III' },
  {
    es: 'Curabitur pretium tincidunt lacus. {1}Nulla facilisi{/1}. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. {2}Vestibulum sapien{/2} proin quam.',
    fr: 'Curabitur pretium tincidunt lacus. {1}Nulla facilisi{/1}. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. {2}Vestibulum sapien{/2} proin quam.',
    en: 'Curabitur pretium tincidunt lacus. {1}Nulla facilisi{/1}. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. {2}Vestibulum sapien{/2} proin quam.'
  },
  {
    1: {
      es: 'Un mensaje descriptivo breve para este término.',
      fr: 'Un message descriptif bref pour ce terme.',
      en: 'A brief descriptive message for this term.'
    },
    2: {
      es: 'Otro tooltip descriptivo para contexto.',
      fr: 'Une autre info-bulle descriptive pour le contexte.',
      en: 'Another descriptive tooltip for context.'
    }
  }
);

export const CARDS_DATA: CardData[] = [
  {
    id: 1,
    title: { es: 'Temática 1', fr: 'Thématique 1', en: 'Theme 1' },
    description: {
      es: 'Español: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      fr: 'Français: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      en: 'English: Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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
    title: { es: 'Temática 2', fr: 'Thématique 2', en: 'Theme 2' },
    description: {
      es: 'Español: Sed do eiusmod tempor incididunt ut labore et dolore.',
      fr: 'Français: Sed do eiusmod tempor incididunt ut labore et dolore.',
      en: 'English: Sed do eiusmod tempor incididunt ut labore et dolore.'
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
    title: { es: 'Temática 3', fr: 'Thématique 3', en: 'Theme 3' },
    description: {
      es: 'Español: Ut enim ad minim veniam, quis nostrud exercitation.',
      fr: 'Français: Ut enim ad minim veniam, quis nostrud exercitation.',
      en: 'English: Ut enim ad minim veniam, quis nostrud exercitation.'
    },
    imagePath: 'images/image3.jpg',
    hotspots: [
      { id: 'h1', x: 35, y: 10, width: 30, height: 25, modalContent: modalContent3 },
      { id: 'h2', x: 5, y: 50, width: 28, height: 20, modalContent: modalContent1 },
      { id: 'h3', x: 70, y: 80, width: 25, height: 18, modalContent: modalContent2 }
    ]
  }
];
