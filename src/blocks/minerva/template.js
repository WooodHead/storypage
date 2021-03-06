function getPostAttributes (post) {
  return {
    title: post.title.raw,
    teaser: post.excerpt.raw,
    categoryId: post.categories[0],
    date: post.date,
    imageId: post.featured_media,
    authorId: post.author,
    link: post.link,
    type: 'static',
  };
}

export default posts => {
  let primary, secondary, tertiary;
  const boxedTeasers = [], teasers = [];

  for (let i = 0; i < posts.length; i++) {
    if (i === 0) {
      primary = getPostAttributes(posts[i]);
    }
    else if (i === 1) {
      secondary = getPostAttributes(posts[i]);
    }
    else if (i === 2) {
      tertiary = getPostAttributes(posts[i]);
    }
    else if (i >= 3 && i <= 15) {
      teasers.push({
        ...getPostAttributes(posts[i]),
      });
    }
    else if (i >= 16 && i <= 19) {
      boxedTeasers.push({
        ...getPostAttributes(posts[i]),
        customFontSize: 24,
        customTextColor: '#BF5048',
        showCategory: false,
        hasImage: false,
      });
    }
  }

  return [
    [ 'minerva/article-primary', primary, [] ],
    [ 'storypage/section', { className: 'container', contentClass: 'l-row top-border-desktop' }, [
      [ 'storypage/row', { columns: 2, widths: '8,4' }, [
        [ 'minerva/article-secondary', {
          layout: 'col8 column-start1',
          ...secondary,
        } ],
        [ 'minerva/article-tertiary', {
          layout: 'col4 column-start9',
          ...tertiary,
          customFontSize: 36,
          fontSize: 'large',
        } ],
      ] ],
    ] ],
    [ 'storypage/section', { className: 'container' }, [
      // section boxed and 4 teasers
      [ 'storypage/section', { className: 'l-row' }, [
        [ 'storypage/row', { columns: 2, widths: '4,8' }, [

          [ 'minerva/section', { layout: 'col8 column-start5', contentClass: 'gallery-one extra-space-l' }, [
            [ 'minerva/article-teaser', teasers[0] ],
            [ 'minerva/article-teaser', teasers[1] ],
            [ 'minerva/article-teaser', teasers[2] ],
            [ 'minerva/article-teaser', teasers[3] ],
          ] ],

          // boxed teasers
          [ 'minerva/section', { layout: 'col4 column-start1', className: 'boxed', title: 'Mest lest', contentClass: 'gallery-one extra-space-xl' }, [
            [ 'minerva/article-teaser', boxedTeasers[0] ],
            [ 'minerva/article-teaser', boxedTeasers[1] ],
            [ 'minerva/article-teaser', boxedTeasers[2] ],
          ] ],

        ] ],
      ] ],

      // ad and podcast
      [ 'storypage/section', { className: 'l-row' }, [
        [ 'storypage/row', { columns: 2, widths: '6,6' }, [
          [ 'core/paragraph', { layout: 'col6 column-start1', placeholder: 'An ad' } ],
          [ 'storypage/section', { layout: 'col6 column-start7' }, [
            [ 'minerva/podcast-box', {
              title: 'Podkast',
              subtitle: 'Hør siste episode25: Episode 25: Kristoffer Egeberg',
              teaser: 'Minervapodden snakker med redaktør i faktisk.no, Kristoffer Egeberg, og spør rett ut: Ville faktasjekkens flaggskip vært bedre om de ansatte noen fra den innvandringskritiske høyresiden? På veien til det spørsmålet er vi innom Terje Tvedt, proteinpulver, Dagsavisens relevans, betydningen av viral spredning og problemene med den upolitiske journalisten.',
            } ],
          ] ],
        ] ],
      ] ],

      // remaining teasers
      [ 'storypage/section', { className: 'l-row', contentClass: 'narrow-wide' }, [
        [ 'minerva/section', { contentClass: 'gallery-one extra-space-l' }, [
          [ 'minerva/article-teaser', teasers[4] ],
          [ 'minerva/article-teaser', teasers[5] ],
          [ 'minerva/article-teaser', teasers[6] ],
          [ 'minerva/article-teaser', teasers[7] ],
          [ 'minerva/article-teaser', teasers[8] ],
          [ 'minerva/article-teaser', teasers[9] ],
          [ 'storypage/section', { className: 'center section-footer' }, [
            [ 'minerva/button', { className: 'btn', text: 'Last flere artikler', customBackgroundColor: '#FFF', customTextColor: '#000', url: 'https://www.minervanett.no/arkiv/' } ],
          ] ],
        ] ],
      ] ],
    ] ],

    // section-demo
    ['storypage/section', { maxWidth: '1182px' }, [
      [ 'core/heading', {
        content: 'Sections help you to organise your page content!',
      } ],
      [ 'core/paragraph', {
        content: 'Basically, a section is a container which could wrap one or more blocks and give them the same background.',
        fontSize: 'regular',
      } ],
    ]],

    ['core/separator', {}, []],
    ['storypage/section', { backgroundColor: 'very-light-gray',  maxWidth: '1182px' }, [
      [ 'core/paragraph', {
        content: 'Sections could have a max width...',
        align: 'center',
        fontSize: 'large',
      } ],
      [ 'core/paragraph', {
        content: '...or you can remove the \'max-width\' value in the Section Settings (sidebar) and make it full screen!',
        fontSize: 'regular',
        align: 'center',
      } ],
    ]],

    ['core/separator', {}, []],
    ['storypage/section', {
      hasImage: true,
      url: 'https://www.minervanett.no/wp-content/uploads/2018/07/Sologne.jpg',
    }, [
      [ 'core/paragraph', {
        content: 'You can set a background image...',
        align: 'center',
        fontSize: 'large',
        customTextColor: 'white',
      } ],
      [ 'core/paragraph', {
        content: '...or just a color, turning off the \'Has background image\' option and setting a background color in Section Settings.',
        align: 'center',
        fontSize: 'regular',
        customTextColor: 'white',
      } ],
    ]],

    ['core/separator', {}, []],
    ['storypage/section', { customBackgroundColor: 'black' }, [
      ['storypage/section', { maxWidth: '1182px' }, [
        [ 'core/paragraph', {
          content: 'Feel free to combine section with other blocks!',
          align: 'center',
          fontSize: 'large',
          customTextColor: 'white',
        } ],
        ['core/columns', { columns: 3 }, [
          [ 'core/column', {}, [
            [ 'core/paragraph', {
              placeholder: 'Column 1',
              content: 'For example, you can nest a section with max-width...',
              align: 'center',
              fontSize: 'regular',
              customTextColor: 'white',
            } ],
          ]],
          [ 'core/column', {}, [
            [ 'core/paragraph', {
              placeholder: 'Column 2',
              content: '...inside a full screen section with a background...',
              align: 'center',
              fontSize: 'regular',
              customTextColor: 'white',
            } ],
          ]],
          [ 'core/column', {}, [
            [ 'core/paragraph', {
              placeholder: 'Column 3',
              content: '...and then use columns to organise you content..',
              align: 'center',
              fontSize: 'regular',
              customTextColor: 'white',
            } ],
          ]],
        ]],
      ]],
    ]],
    //
  ];
};
