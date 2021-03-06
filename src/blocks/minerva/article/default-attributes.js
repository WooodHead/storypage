import { settings } from '../../storypage/post';

export { controls } from '../../storypage/post';

// deep clone
export const articleAttributes = JSON.parse(JSON.stringify(settings.attributes));

articleAttributes.title.default = 'Handel dreier seg om å vinne';

articleAttributes.teaser = {
  type: 'array',
  source: 'children',
  selector: 'p',
  default: 'Trumps tiltagende handelskrig har sitt opphav i presidentens primitive syn på handel. Fredag truer en ny alvorlig omdreining.',
};

articleAttributes.category = {
  type: 'string',
  default: 'Kommentar',
};

articleAttributes.categoryUrl = {
  type: 'string',
  default: 'https://www.minervanett.no/kategori/kommentar',
};

articleAttributes.date = {
  type: 'string',
  default: '03. juli 2018',
};

articleAttributes.imageUrl.default = 'https://www.minervanett.no/wp-content/uploads/2018/07/Sologne.jpg';

articleAttributes.author = {
  type: 'string',
  default: 'Aksel Fridstrøm',
};

articleAttributes.authorUrl = {
  type: 'string',
  default: 'https://www.minervanett.no/skribent/aksel_fridstrom/',
};

articleAttributes.authorImageUrl = {
  type: 'string',
  default: 'https://www.minervanett.no/wp-content/uploads/2018/01/Aksel-128x128.jpg',
};

articleAttributes.link.default = 'https://www.minervanett.no/handel-dreier-seg-om-a-vinne/';

articleAttributes.dimRatio.default = 60;

export const formattingControls = [ 'bold', 'italic' ];
