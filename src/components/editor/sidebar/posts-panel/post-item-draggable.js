/**
 * External dependencies
 */
import React from 'react';
import classnames from 'classnames';
import { blocks, components, data, element } from '@frontkom/gutenberg-js';

const { Draggable } = components;
const { Component } = element;
const { createBlock } = blocks;
const { withSelect } = data;

class PostItemDraggable extends Component {
  constructor (props) {
    super(props);

    this.state = {
      block: { },
    };
  }

  componentDidUpdate (prevProps) {
    const { post } = this.props;

    if (prevProps.post !== post) {
      const block = createBlock(post.blockType, {
        id: post.id,
        title: [ post.title.rendered ],
        link: post.link,
        imageId: post.featured_media,
        categoryId: post.categories[ 0 ],
        authorId: post.author,
        type: 'auto',
        layout: '',
      });

      this.setState({ block });
    }
  }

  render () {
    const { isDragging, ...props } = this.props;
    const { index, rootUID } = this.props.insertionPoint;
    const { block } = this.state;

    if (! block.uid) {
      return '';
    }

    const className = classnames('components-posts-list-item-draggable', {
      'is-visible': isDragging,
    });

    const transferData = {
      type: 'block',
      fromIndex: index,
      rootUID,
      uid: block.uid,
      layout: block.layout,
      blocks: [ { ...block } ],
    };

    return (
      <Draggable className={ className } transferData={ transferData } { ...props }>
        <div className="components-posts-list-item-draggable-inner"></div>
      </Draggable>
    );
  }
}

export default withSelect(select => ({
  insertionPoint: select('core/editor').getBlockInsertionPoint(),
}))(PostItemDraggable);
