/**
 * External dependencies
 */
import React from 'react';
import classnames from 'classnames';
import { i18n, components, data, editor, element } from '@frontkom/gutenberg-js';

/**
 * WordPress dependencies
 */
const { __ } = i18n;
const {
  Component,
  Fragment,
  compose,
} = element;
const {
  Toolbar,
  withFallbackStyles,
  withAPIData,
} = components;
const {
  withColors,
  BlockControls,
  InspectorControls,
  MediaPlaceholder,
  RichText,
} = editor;
const { withSelect } = data;

/**
 * Internal dependencies
 */
import {
  ImageSettingsPanel,
  MediaUploadToolbar,
  PostSettingsPanel,
  TextColorPanel,
  TextSettingsPanel,
  getFontSize,
  onSelectImage,
  dimRatioToClass,
  backgroundImageStyles,
  withSelectMedia,
  withSelectCategory,
  withSelectCategories,
  withAPIDataPost,
  didUpdateMedia,
  didUpdateCategory,
  didUpdatePost,
} from './controls';
import './editor.scss';

const { getComputedStyle } = window;

class PostEdit extends Component {
  componentDidUpdate (prevProps) {
    const { setAttributes } = this.props;

    setAttributes({
      ...didUpdateMedia(prevProps, this.props),
      ...didUpdateCategory(prevProps, this.props),
      ...didUpdatePost(prevProps, this.props),
    });

    /* const { post, media, postResults, setAttributes } = this.props;
    const { type } = this.props.attributes;

    const attributes = {};

    if (type === 'withid' && post && post !== prevProps.post) {
      attributes.title = [ post.title.rendered ];
      attributes.link = post.link;
      attributes.imageId = post.featured_media;
    }

    if (type === 'auto' && postResults && postResults !== prevProps.postResults && postResults.data) {
      const postRes = postResults.data[ 0 ];

      attributes.id = parseInt(postRes.id);
      attributes.title = [ postRes.title.rendered ];
      attributes.link = postRes.link;
      attributes.imageId = postRes.featured_media;
    } */
  }

  render () {
    const {
      attributes,
      setAttributes,
      className,
      textColor,
    } = this.props;

    const {
      title,
      imageUrl,
      hasImage,
      hasParallax,
      dimRatio,
      placeholder,
    } = attributes;

    const imageStyle = backgroundImageStyles(imageUrl);
    const imageClasses = classnames(
      'wp-block-cover-image',
      dimRatioToClass(dimRatio),
      {
        'has-background-dim': dimRatio !== 0,
        'has-parallax': hasParallax,
      }
    );

    const fontSize = getFontSize(attributes);

    const controls = (
      <Fragment>
        <BlockControls>
          <Toolbar>
            <MediaUploadToolbar props={ this.props } />
          </Toolbar>
        </BlockControls>
        <InspectorControls>
          <PostSettingsPanel props={ this.props } />
          <ImageSettingsPanel props={ this.props } />
          <TextSettingsPanel props={ this.props } />
          <TextColorPanel props={ this.props } />
        </InspectorControls>
      </Fragment>
    );

    const richText = (
      <RichText
        tagName="h1"
        className={ classnames('wp-block-paragraph', {
          [ textColor.class ]: textColor.class,
        }) }
        style={ {
          color: textColor.class ? undefined : textColor.value,
          fontSize: fontSize ? fontSize + 'px' : undefined,
        } }
        value={ title || '' }
        onChange={ value => {
          setAttributes({
            title: value,
            type: 'static',
          });
        } }
        placeholder={ placeholder || __('Add text or type') }
        formattingControls={ [ 'bold', 'italic' ] }
        inlineToolbar
      />
    );

    if (! imageUrl) {
      return (
        <div className={ className }>
          { controls }
          { hasImage &&
            <MediaPlaceholder
              icon="format-image"
              labels={ {
                title: __('Post image'),
                name: __('an image'),
              } }
              onSelect={ media => onSelectImage(this.props, media) }
              accept="image/*"
              type="image"
            />
          }
          { richText }
        </div>
      );
    }

    return (
      <div className={ className }>
        { controls }
        { hasImage &&
          <div
            data-url={ imageUrl }
            style={ imageStyle }
            className={ imageClasses }
          ></div>
        }
        { richText }
      </div>
    );
  }
}

export default compose(
  withSelect((select, props) => ({
    ...withSelectCategories(select),
    ...withSelectCategory(select, props),
    ...withSelectMedia(select, props),
  })),
  withColors({ textColor: 'color' }),
  withFallbackStyles((node, ownProps) => {
    const { fontSize, customFontSize } = ownProps.attributes;
    const editableNode = node.querySelector('[contenteditable="true"]');
    // verify if editableNode is available, before using getComputedStyle.
    const computedStyles = editableNode ? getComputedStyle(editableNode) : null;
    return {
      fallbackFontSize: fontSize || customFontSize || ! computedStyles ? undefined : parseInt(computedStyles.fontSize) || undefined,
    };
  }),
  withAPIData(props => ({
    ...withAPIDataPost(props),
  })),
)(PostEdit);
