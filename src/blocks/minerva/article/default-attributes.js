export const articleAttributes = {
  title: {
    type: 'array',
    source: 'children',
    selector: 'h1,h2,h3,h4,h5,h6',
    default: 'Handel dreier seg om å vinne',
  },
  teaser: {
    type: 'array',
    source: 'children',
    selector: 'p',
    default: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
  },
  category: {
    type: 'string',
    default: 'Kommentar',
  },
  categoryUrl: {
    type: 'string',
    default: 'https://www.minervanett.no/kategori/kommentar',
  },
  date: {
    type: 'string',
    default: '03. juli 2018',
  },
  imageUrl: {
    type: 'string',
    default: 'https://www.minervanett.no/wp-content/uploads/2018/07/Sologne.jpg',
  },
  authorName: {
    type: 'string',
    default: 'Aksel Fridstrøm',
  },
  authorUrl: {
    type: 'string',
    default: 'https://www.minervanett.no/skribent/aksel_fridstrom/',
  },
  authorImageUrl: {
    type: 'string',
    default: 'https://www.minervanett.no/wp-content/uploads/2018/01/Aksel-128x128.jpg',
  },
  link: {
    type: 'string',
    default: 'https://www.minervanett.no/handel-dreier-seg-om-a-vinne/',
  },
};

export const backgroundImageStyles = url => {
  return url ?
    { backgroundImage: `url(${url})` } :
    undefined;
};

export const formattingControls = [ 'bold', 'italic' ];
