/**
 * External Dependencies
 */
import { i18n, blocks, data } from '@frontkom/gutenberg-js';

/**
 * Internal Dependencies
 */
import * as article from './article';
import * as advert from './advert';
import * as latestNews from './latest-news';
import * as latestNewsWebComp from './latest-news-wc';

const { __ } = i18n;
const { registerBlockType } = blocks;

export const initComputerworld = () => {
  // Append the CW blocks to the categories
  const categories = [
    {
      slug: 'cw',
      title: __('CW Blocks'),
    },
    ...data.select('core/blocks').getCategories(),
  ];
  data.dispatch('core/blocks').setCategories(categories);

  // registering CW Blocks
  [
    article,
    advert,
    latestNews,
    latestNewsWebComp,
  ]
  .forEach(({ name, settings }) => {
    registerBlockType(name, settings);
  });
};