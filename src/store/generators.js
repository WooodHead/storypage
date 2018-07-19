// External Dependencies
import { times, random } from 'lodash';

/**
 * [generatePosts description]
 * @param  {[type]} n       [description]
 * @param  {Object} options [description]
 * @return {[type]}         [description]
 */
export function generatePosts (n = 1, options = {}) {
  const { N_IMAGES = 1, N_CATEGORIES = 1 } = options;

  return times(n, index => {
    const id = index + 1;
    const date = (new Date(`2018-04-${id}`)).toISOString();
    return {
      id,
      content: {

        raw: `<!-- wp:paragraph --><p>Content of Generated post number ${id}</p><!-- /wp:paragraph -->`,
        rendered: `<p>Content of Generated post number ${id}</p>`,
      },
      date,
      date_gmt: date,
      // footer: false,
      // header: true,
      title: {
        raw: `Generated post number ${id}`,
        rendered: `Generated post number ${id}`,
      },
      status: 'publish', // 'draft',
      revisions: { count: 0, last_id: 0 },
      parent: 0,
      theme_style: true,
      type: 'post',
      link: `${window.location.origin}/posts/${id}`,
      categories: [ random(1, N_CATEGORIES) ],
      featured_media: random(1, N_IMAGES),
      permalink_template: `${window.location.origin}/posts/${id}`,
      preview_link: `${window.location.origin}/posts/${id}/preview`,
    };
  });
}

/**
 * [generateImages description]
 * @param  {number} n [description]
 * @return {[type]}   [description]
 */
export function generateImages (n = 1) {
  return times(n, index => {
    const id = index + 1;
    const date = (new Date(`2018-04-${id}`)).toISOString();

    return {
      id,
      caption: { raw: '', rendered: '' },
      date_gmt: date,
      date,
      link: `${window.location.origin}/img${id}.png`,
      media_type: 'image',
      source_url: `${window.location.origin}/img${id}.png`,
      data: {
        entity_type: 'file',
        entity_uuid: `e94e9d8d-4cf4-43c1-b95e-${id}`,
      },
      media_details: {
        file: '',
        height: 2100,
        image_meta: {},
        sizes: {},
        width: 3360,
      },
    };
  });
}

/**
 * [generateCategories description]
 * @param  {number} n [description]
 * @return {[type]}   [description]
 */
export function generateCategories (n = 1) {
  return times(n, index => {
    const id = index + 1;
    // count, description, id, link, meta, name, parent, slug, taxonomy
    return {
      id,
      name: `Category ${id}`,
      parent: 0,
    };
  });
}
