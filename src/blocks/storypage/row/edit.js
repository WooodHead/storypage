/**
 * External dependencies
 */
import React from 'react';
import { times, range, map } from 'lodash';
import classnames from 'classnames';
import memoize from 'memize';
import { i18n, components, editor, element } from '@frontkom/gutenberg-js';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * WordPress dependencies
 */
const { __, sprintf } = i18n;
const { Component, Fragment } = element;
const {
  PanelBody,
  RangeControl,
  ButtonGroup,
  Button,
} = components;
const {
  InspectorControls,
  InnerBlocks,
} = editor;



const COLUMNS_TOTAL = 12;
const MIN_COLUMNS = 2;
const MAX_COLUMNS = 6;

/**
 * Returns the layouts configuration for a given number of columns.
 *
 * @param {number} columns Number of columns.
 *
 * @return {Object[]} Columns layout configuration.
 */
const getColumnLayouts = memoize((columns, widths) => {
  let position = 1;

  return times(columns, n => {
    const startPostion = position;
    position = position + getWidth(widths, n);

    return {
      name: `col${getWidth(widths, n)} column-start${startPostion}`,
      label: sprintf(__('Column %d'), n + 1),
      icon: 'columns',
    };
  });
});

/**
 * [description]
 * @param  {string} widths [description]
 * @param  {number} index  [description]
 * @return {number}        [description]
 */
const getWidth = (widths, index) => {
  return parseInt(widths.split(',')[ index ]);
};

class RowEdit extends Component {
  constructor (props) {
    super(props);

    this.onColumnsChange = this.onColumnsChange.bind(this);
    this.onWidthChange = this.onWidthChange.bind(this);
  }

  onColumnsChange (nextColumns) {
    this.props.setAttributes({
      columns: nextColumns,
    });
  }

  onWidthChange (index, nextWidth) {
    const nextWidths = this.props.attributes.widths.split(',');
    nextWidths[ index ] = nextWidth;

    this.props.setAttributes({
      widths: nextWidths.join(),
    });
  }

  render () {
    const { attributes, className } = this.props;
    const { columns, widths } = attributes;

    const classes = classnames(className);

    let partial = 0;

    const controls = (
      <InspectorControls>
        <PanelBody>
          <RangeControl
            label={ __('Columns') }
            value={ columns }
            onChange={ this.onColumnsChange }
            min={ 2 }
            max={ MAX_COLUMNS }
          />
        </PanelBody>
        {
          times(columns, n => {
            const max = COLUMNS_TOTAL - (partial + ((columns - 1) * MIN_COLUMNS));
            const min = n === columns - 1 ? max : MIN_COLUMNS;

            const availableWidths = range(min, max + 1);

            let colWidth = getWidth(widths, n);

            const lastIndex = availableWidths.length - 1;

            if ((availableWidths.length === 1 && availableWidths[ lastIndex ] !== colWidth) || colWidth > availableWidths[ lastIndex ]) {
              colWidth = availableWidths[ lastIndex ];
              this.onWidthChange(n, availableWidths[ lastIndex ]);
            }

            partial = partial + (colWidth - MIN_COLUMNS);

            return (
              <PanelBody key={ `colum${n + 1}` } title={ sprintf(__('Column %d width:'), n + 1) }>
                <ButtonGroup aria-label={ __('Column width') }>
                  {
                    map(availableWidths, width => {
                      return (
                        <Button
                          key={ width }
                          isSmall
                          isPrimary={ colWidth === width }
                          aria-pressed={ colWidth === width }
                          onClick={ () => this.onWidthChange(n, width) }
                        >
                          { width }
                        </Button>
                      );
                    })
                  }
                </ButtonGroup>
              </PanelBody>
            );
          })
        }
      </InspectorControls>
    );

    return (
      <Fragment>
        { controls }
        <div className={ classes }>
          <InnerBlocks layouts={ getColumnLayouts(columns, widths) } />
        </div>
      </Fragment>
    );
  }
}

export default RowEdit;
