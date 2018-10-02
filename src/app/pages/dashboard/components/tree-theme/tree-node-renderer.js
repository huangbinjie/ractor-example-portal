
import React, { Component, Children, cloneElement } from 'react';
import { Providers } from "ractor-react";
import PropTypes from 'prop-types';
import styles from './tree-node-renderer.scss';
import { LanguageStore } from '@app/stores/language/language.store';

class MinimalThemeTreeNodeRenderer extends Component {
  constructor(props) {
    super(props)

    this.state = {}
    /* tslint:disable:object-literal-sort-keys */
    this.bound = {
      handleMouseOver: this.handleMouseOver.bind(this),
      handleMouseLeave: this.handleMouseLeave.bind(this)
    }
  }

  handleMouseOver() {
    if (!this.state.highlight) {
      this.setState({ highlight: true })
    }
  }

  handleMouseLeave() {
    this.setState({ highlight: false })
  }

  render() {
    /* tslint:disable:object-literal-sort-keys */
    const {
      children,
      swapFrom,
      swapLength,
      swapDepth,
      scaffoldBlockPxWidth,
      lowerSiblingCounts,
      connectDropTarget,
      isOver,
      draggedNode,
      canDrop,
      treeIndex,
      treeId,
      listIndex,
      rowDirection,
      getPrevRow, // Delete from otherProps
      node, // Delete from otherProps
      path, // Delete from otherProps
      languagePackage, // Delete from otherProps
      ...otherProps
    } = this.props;
    // Construct the scaffold representing the structure of the tree
    const scaffoldBlockCount = lowerSiblingCounts.length - 1;
    let dropType
    if (canDrop && !isOver) {
      dropType = 'validDrop'
    } else if (!canDrop && isOver) {
      dropType = 'invalidDrop'
    }

    return connectDropTarget(
      <div {...otherProps} {...otherProps} onFocus={() => { }} className={styles.node + (this.state.highlight ? ` ${styles.highlight}` : '')}>
        <div
          className={styles.nodeContent}
          style={{ paddingLeft: scaffoldBlockPxWidth * scaffoldBlockCount }}
        >
          {Children.map(children, child =>
            cloneElement(child, {
              isOver,
              canDrop,
              draggedNode,
              languagePackage
            })
          )}
        </div>
      </div>
    );
  }
}
MinimalThemeTreeNodeRenderer.defaultProps = {
  swapFrom: null,
  swapDepth: null,
  swapLength: null,
  canDrop: false,
  draggedNode: null,
  rowDirection: 'ltr'
};

MinimalThemeTreeNodeRenderer.propTypes = {
  treeIndex: PropTypes.number.isRequired,
  swapFrom: PropTypes.number,
  swapDepth: PropTypes.number,
  swapLength: PropTypes.number,
  scaffoldBlockPxWidth: PropTypes.number.isRequired,
  lowerSiblingCounts: PropTypes.arrayOf(PropTypes.number).isRequired,
  treeId: PropTypes.string.isRequired,
  listIndex: PropTypes.number.isRequired,
  rowDirection: PropTypes.string,
  children: PropTypes.node.isRequired,

  // Drop target
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool,
  draggedNode: PropTypes.shape({}),

  // used in dndManager
  getPrevRow: PropTypes.func.isRequired,
  node: PropTypes.shape({}).isRequired,
  path: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired
};

export default Providers([LanguageStore])(MinimalThemeTreeNodeRenderer);