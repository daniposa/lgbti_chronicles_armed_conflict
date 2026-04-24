import type { LocalizedContent, LocalizedModalContent, CardData, LandingCredits } from '../models/content.model';

/**
 * Page configuration - edit these values to customize the page title and tab labels.
 * All titles support Spanish (es), French (fr), and English (en).
 */
/** Path to the panoramic image shown behind the cards in the Chronicles tab. */
export const PANORAMA_IMAGE = 'images/paisajes/0.webp';

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
    chronicles: {
      es: 'Crónicas',
      fr: 'Chroniques',
      en: 'Chronicles'
    } satisfies LocalizedContent,
    second: {
      es: 'Comentarios de la traducción',
      fr: 'Commentaires de la traduction',
      en: 'Translation Comments'
    } satisfies LocalizedContent
  }
};

/**
 * Credits on the landing page (below the three buttons).
 * Edit `sectionTitle` and `lines` to match your project.
 */
export const LANDING_CREDITS: LandingCredits = {
  sectionTitle: 'Créditos',
  lines: [
    {
      label: 'Traductoras / Translators',
      names: 'Juan Pérez Gil, María García López'
    },
    {
      label: 'Revisión editorial / Editorial review',
      names: 'Ana Rodríguez Martínez'
    },
    {
      label: 'Diseño y desarrollo / Design & development',
      names: 'Equipo de publicación digital'
    },
    {
      label: 'Agradecimientos / Acknowledgements',
      names: 'Comunidad LGTBI+ que compartió estas crónicas'
    }
  ]
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

/*
 * ── Tooltips (highlight explanations) ─────────────────────────────────────────
 * Each string under `tooltips` is a small HTML fragment (not plain text only).
 * Allowed examples you can copy/adapt (Angular sanitizes unsafe URLs/scripts):
 *
 *   Paragraphs:     <p>Texto con <strong>énfasis</strong>.</p>
 *   Line break:     Primera línea.<br>Segunda línea.
 *   External link:  <a href="https://example.org" target="_blank" rel="noopener noreferrer">Etiqueta</a>
 *   Local image:    <img src="images/nombre.jpg" alt="Descripción" width="200">
 *
 * Use width (or height) on images; inline `style=` is stripped by the sanitizer.
 * Paths are relative to the site root (same as `angular.json` assets → `/images/...`).
 */

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
    es: `<p>La Comisión conoció que, en los Montes de María, muchos hombres gais y mujeres trans fueron víctimas de tratos crueles, inhumanos y degradantes por parte de los paramilitares y de la fuerza pública en la primera década de 2000. En algunos casos, estos incluyeron torturas físicas y psicológicas, como las que padeció Soraida, mujer trans víctima de integrantes de las FARC-EP entre 2004 y 2005, en el municipio de Arauquita (Arauca):</p><br><br><p>«Cuando levanté la cara sentí la patada que me partió. No miré hacia arriba, sino que me pegaron y me agarré de la barda. Cuando vi la sangre, me la apreté y salí. Cogí la camiseta que había dejado afuera y me la puse allí para obstruirla. Entonces el guerrillero me decía improperios y un poco de pendejadas. Me pegó como dos veces en la cara y me dijo que me iba a matar. Yo empecé a llorar. Me dijo que allí no se permitían “maricas”, “gaitorades”, porque íbamos a dañar a los otros pelados... En ese entonces, yo no tenía el pelo tan largo y me agarró del cabello y me pegaba en la cara. Luego, me dijo: “Bueno, pero como usted quiere ser mujer, pues vamos a hacerle lo que se les hace a las mujeres”. Me agarró las manos y me violó. A lo último me seguía pegando, diciendo cosas, y con una pistola me apuntaba y me gritaba: “Te voy a matar”. En una de esas sacó una navaja y me hizo una incisión en el recto. Tenía 10 años». Mujer trans, estudiante, activista.</p>`,
    fr: 'La Commission a appris que, dans les montagnes de Montes de María, de nombreux hommes homosexuels et des femmes transgenres ont été victimes de traitements cruels, inhumains et dégradants. De la part des groupes paramilitaires et de la force publique au cours de la première décennie des années 2000. Dans certains cas, il s’agissait de tortures physiques et psychologiques, comme celles que Soraida, une femme transgenre victime de violence de la part des {1}FARC-EP{/1} entre 2004 et 2005 dans la municipalité d’Arauquita. Soraida a endurées des atrocités elle raconte : « Quand j’ai levé le visage, j’ai senti le coup de pied qui m’a brisée. Je n’ai pas levé les yeux ; ils m’ont frappée et je me suis agrippée à la clôture. Quand j’ai vu le sang, j’ai pressée ma blessure et je suis sortie. J’ai pris le T-shirt que j’avais laissé dehors et je l’ai placé là pour contenir le saignement. Ensuite, le guérillero m’a proféré des injures et m’a dit toutes sortes d’insanités. Il m’a frappé deux fois au visage et m’a dit qu’il allait me tuer. J’ai commencé à pleurer. Il m’a dit que les « pédés » et les  {2}«  GAYtorades »{/2} n’étaient pas autorisés ici parce que nous allions pervertir les autres gars …. À l’époque, je n’avais pas les cheveux aussi longs, mais il m’a quand même prise par les cheveux et me frappait au visage. Ensuite il m’a dit : « Puisque tu veux être une femme, on va te faire ce qu’on fait aux femmes ». Il m’a attaché et m’a violée. À la fin, il continuait à me frapper, à proférer des menaces, et en pointant un pistolet sur moi il criait : « Je vais te tuer ». À un moment donné, il a sorti un couteau et m’a fait une entaille dans le rectum. J’avais 10 ans”. Femme trans, étudiante, activiste. ',
    en: 'The Commission learned that, in Los Montes de María, many gay men and trans women were victims of cruel, inhumane, and degrading acts committed by paramilitary and police men during the 2000’s. In some cases, these acts included physical and psychological torture, such as those suffered by Soraida, a trans female victim of the {1}FARC-EP{/1}between 2004 and 2005, in the town of Arauquita, Arauca: “When I lifted my head up, I felt the kick that broke me. I didn’t look up but I felt someone hitting me, so I grabbed onto the fence. When I saw blood pouring out, I tried to stop the bleeding and got out. I grabbed the T-shirt I had left outside and put it on the wound to stop the bleeding. The guerrilla member started insulting me and calling me names. He hit me in the face like twice and told me he was gonna kill me. I started to cry. He said no “faggots” or {2}“GAYtorades”{/2} were allowed there because we would corrupt the other kids… Back then, my hair wasn’t that long, but he grabbed me by the hair anyways and kept punching me in the face. Then, he said: ´Well, since you want to be a woman, I’ll do to you what we do to women´ He grabbed my hands and raped me. Up until the end, he kept hitting me and saying stuff, pointed at me with a gun and yelling, ‘I’ll kill you’. He then took out a blade and made a cut in my rectum. I was 10 years old.” Trans woman, student, activist.'
  },
  {
    1: {
      es: `<p><strong>FARC-EP</strong> — Fuerzas Armadas Revolucionarias de Colombia – Ejército del Pueblo.</p>
<p>Organización político-militar. Más contexto (enlace externo): <a href="https://www.un.org/es" target="_blank" rel="noopener noreferrer">Naciones Unidas</a>.</p>
<p><strong>Ejemplo de imagen</strong> en tooltip (ruta bajo <code>images/</code>):</p>
<p><img src="images/image4.jpg" alt="Ilustración de ejemplo" width="200"></p>`,
      fr: `<p><strong>FARC-EP</strong> — Forces armées révolutionnaires de Colombie – Armée du peuple.</p>
<p>Lien externe d’exemple : <a href="https://www.un.org/fr" target="_blank" rel="noopener noreferrer">Site de l’ONU</a>.</p>
<p>Image locale :</p>
<p><img src="images/image5.jpg" alt="Exemple visuel" width="200"></p>`,
      en: `<p><strong>FARC-EP</strong> (Fuerzas Armadas Revolucionarias de Colombia – Ejército del Pueblo) are an insurgent politic-military organization that has existed for over 50 years in Colombia. ''FARC-EP (Fuerzas Armadas Revolucionarias de Colombia – Ejército del Pueblo) are an insurgent politic-military organization that has existed for over 50 years in Colombia. </p>
<p>External link example: <a href="https://www.un.org/en" target="_blank" rel="noopener noreferrer">United Nations</a>.</p>
<p>Local asset example:</p>
<p><img src="images/image6.jpg" alt="Sample image in tooltip" width="200"></p>`
    },
    2: {
      es: `<p>Juego de palabras entre «gay» y la bebida «Gatorade». Referencia: <a href="https://es.wikipedia.org/wiki/Gatorade" target="_blank" rel="noopener noreferrer">Gatorade en Wikipedia</a>.</p>
<p><img src="images/image1.jpg" alt="Miniatura" width="160"></p>`,
      fr: `<p>Jeu de mots entre « gay » et la boisson « Gatorade ». <a href="https://fr.wikipedia.org/wiki/Gatorade" target="_blank" rel="noopener noreferrer">Article Wikipédia</a>.</p>
<p><img src="images/image2.jpg" alt="Vignette" width="160"></p>`,
      en: `<p>A play on words between the terms “gay” and the energy drink “Gatorade.” Due to the similar pronunciation of “gay” and “ga” (in English), it has been coined as a way to refer to homosexual men as an insult <a href="https://en.wikipedia.org/wiki/Gatorade" target="_blank" rel="noopener noreferrer">Wikipedia</a>. </p>
<p><img src="images/image3.jpg" alt="Thumbnail" width="160"></p>`
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
      es: `<p>Primera frase destacada — solo enlace:</p>
<p><a href="https://www.colombia.co" target="_blank" rel="noopener noreferrer">Colombia.co</a></p>`,
      fr: `<p>Première phrase — lien externe :</p>
<p><a href="https://www.diplomatie.gouv.fr" target="_blank" rel="noopener noreferrer">Diplomatie.gouv.fr</a></p>`,
      en: `<p>First highlight — external link only:</p>
<p><a href="https://www.gov.uk" target="_blank" rel="noopener noreferrer">GOV.UK</a></p>`
    },
    2: {
      es: `<p>Segunda frase — solo imagen:</p>
<p><img src="images/image2.jpg" alt="Ejemplo" width="220"></p>`,
      fr: `<p>Deuxième phrase — image :</p>
<p><img src="images/image3.jpg" alt="Exemple" width="220"></p>`,
      en: `<p>Second highlight — image only:</p>
<p><img src="images/image4.jpg" alt="Example" width="220"></p>`
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
      es: `<p>Término breve con <strong>texto</strong> y enlace.</p>
<p>Más: <a href="https://www.humanrights.gov" target="_blank" rel="noopener noreferrer">Derechos humanos (ejemplo)</a>.</p>`,
      fr: `<p>Terme court avec <strong>texte</strong> et lien.</p>
<p><a href="https://www.un.org/fr/human-rights" target="_blank" rel="noopener noreferrer">Droits humains (exemple)</a>.</p>`,
      en: `<p>Brief term with <strong>text</strong> and a link.</p>
<p><a href="https://www.un.org/en/human-rights" target="_blank" rel="noopener noreferrer">Human rights (example)</a>.</p>`
    },
    2: {
      es: `<p>Texto + imagen + enlace en un solo tooltip:</p>
<p><img src="images/image5.jpg" alt="Contexto visual" width="180"></p>
<p>Fuente: <a href="https://www.ohchr.org/es" target="_blank" rel="noopener noreferrer">ACNUDH</a>.</p>`,
      fr: `<p>Texte + image + lien :</p>
<p><img src="images/image6.jpg" alt="Visuel" width="180"></p>
<p><a href="https://www.ohchr.org/fr" target="_blank" rel="noopener noreferrer">ONU Droits humains</a>.</p>`,
      en: `<p>Text + image + link together:</p>
<p><img src="images/image1.jpg" alt="Visual context" width="180"></p>
<p>Source: <a href="https://www.ohchr.org/en" target="_blank" rel="noopener noreferrer">OHCHR</a>.</p>`
    }
  }
);

export const CARDS_DATA: CardData[] = [
  {
    id: 1,
    title: { es: '¿Qué pasó?', fr: 'Qu’est-ce qu’il a passé ?', en: 'What happened?' },
    description: {
      es: 'Español: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      fr: 'Français: Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      en: 'English: Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    imagePath: 'images/paisajes/que paso.webp',
    hotspots: [
      { id: 'h1', x: 10, y: 15, width: 25, height: 20, modalContent: modalContent1 },
      { id: 'h2', x: 50, y: 40, width: 30, height: 25, modalContent: modalContent2 },
      { id: 'h3', x: 75, y: 70, width: 20, height: 15, modalContent: modalContent3 }
    ]
  },
  {
    id: 2,
    title: { es: '¿Por qué pasó?', fr: 'Pourquoi il a passé ?', en: 'Why did it happen?' },
    description: {
      es: 'Español: Sed do eiusmod tempor incididunt ut labore et dolore.',
      fr: 'Français: Sed do eiusmod tempor incididunt ut labore et dolore.',
      en: 'English: Sed do eiusmod tempor incididunt ut labore et dolore.'
    },
    imagePath: 'images/paisajes/que paso.webp',
    hotspots: [
      { id: 'h1', x: 20, y: 25, width: 20, height: 18, modalContent: modalContent2 },
      { id: 'h2', x: 60, y: 55, width: 25, height: 22, modalContent: modalContent3 },
      { id: 'h3', x: 15, y: 75, width: 35, height: 15, modalContent: modalContent1 }
    ]
  },
  {
    id: 3,
    title: { es: '¿Qué pasó con lo que pasó?', fr: 'Qu’est-ce qu’il a passé avec ce qu’il a passé ?', en: 'What happened with what happened?' },
    description: {
      es: 'Español: Ut enim ad minim veniam, quis nostrud exercitation.',
      fr: 'Français: Ut enim ad minim veniam, quis nostrud exercitation.',
      en: 'English: Ut enim ad minim veniam, quis nostrud exercitation.'
    },
    imagePath: 'images/paisajes/que paso.webp',
    hotspots: [
      { id: 'h1', x: 35, y: 10, width: 30, height: 25, modalContent: modalContent3 },
      { id: 'h2', x: 5, y: 50, width: 28, height: 20, modalContent: modalContent1 },
      { id: 'h3', x: 70, y: 80, width: 25, height: 18, modalContent: modalContent2 }
    ]
  }
];
