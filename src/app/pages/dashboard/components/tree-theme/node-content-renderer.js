import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './node-content-renderer.scss';
import { system } from '@app/system/system';
import { AddMenuClicked } from '@dashboard/pages/menu-config/menu-config.store/AddMenuClicked';
import { ModifyMenuClicked } from '@dashboard/pages/menu-config/menu-config.store/ModifyMenuClicked';
import { DeleteMenu } from '@dashboard/pages/menu-config/menu-config.store/DeleteMenu';
import { SetHomePage } from '@dashboard/pages/menu-config/menu-config.store/SetHomePage';
import { Trans } from "lib/ractor-i18n";

function isDescendant(older, younger) {
  return (
    !!older.children &&
    typeof older.children !== 'function' &&
    older.children.some(
      child => child === younger || isDescendant(child, younger)
    )
  );
}

class MinimalThemeNodeContentRenderer extends Component {
  render() {
    /* tslint:disable:object-literal-sort-keys */
    const {
      scaffoldBlockPxWidth,
      toggleChildrenVisibility,
      connectDragPreview,
      connectDragSource,
      isDragging,
      canDrop,
      canDrag,
      node,
      title,
      subtitle,
      draggedNode,
      path,
      treeIndex,
      isSearchMatch,
      isSearchFocus,
      icons,
      buttons,
      className,
      style,
      didDrop,
      swapFrom,
      swapLength,
      swapDepth,
      treeId, // Not needed, but preserved for other renderers
      isOver, // Not needed, but preserved for other renderers
      parentNode, // Needed for dndManager
      rowDirection,
      languagePackage,
      ...otherProps
    } = this.props;
    const nodeTitle = title || node.name;
    const nodeSubtitle = subtitle || node.subtitle;
    const nodeType = node.type;

    const isDraggedDescendant = draggedNode && isDescendant(draggedNode, node);
    const isLandingPadActive = !didDrop && isDragging;
    // 前面的拖动部分
    const nodeContent = connectDragPreview(<div
      className={
        styles.rowContents +
        (isSearchMatch ? ` ${styles.rowSearchMatch}` : '') +
        (isSearchFocus ? ` ${styles.rowSearchFocus}` : '') +
        (!canDrag ? ` ${styles.rowContentsDragDisabled}` : '')
      }
      onClick={this.rowClick(nodeType, path, treeIndex, parentNode)}
    >
      <div className={styles.rowLabel}>
        <span
          className={
            styles.rowTitle +
            (node.subtitle ? ` ${styles.rowTitleWithSubtitle}` : '')
          }
        >
          {typeof nodeTitle === 'function'
            ? nodeTitle({
              node,
              path,
              treeIndex,
            })
            : nodeTitle}
        </span>

        {nodeSubtitle && (
          <span className={styles.rowSubtitle}>
            {typeof nodeSubtitle === 'function'
              ? nodeSubtitle({
                node,
                path,
                treeIndex,
              })
              : nodeSubtitle}
          </span>
        )}
      </div>
      {node.isInitPage ? <div className={styles.homeTag}><Trans>dashboard.menuConfig.home</Trans></div> : null}

      {/* <div className={styles.rowToolbar}>
        {buttons.map((btn, index) => (
          <div
            key={index} // eslint-disable-line react/no-array-index-key
            className={styles.toolbarButton}
          >
            {btn}
          </div>
        ))}
      </div> */}
    </div>
    );

    return (
      <div style={{ height: '100%' }} {...otherProps}>
        {/* {toggleChildrenVisibility &&
          node.children &&
          (node.children.length > 0 || typeof node.children === 'function') && (
            <div>
              <button
                type="button"
                aria-label={node.expanded ? 'Collapse' : 'Expand'}
                className={
                  node.expanded ? styles.collapseButton + " ep-iconfont icon-arrow-down" : styles.expandButton + " ep-iconfont icon-arrow-right"
                }
                onClick={() =>
                  toggleChildrenVisibility({
                    node,
                    path,
                    treeIndex,
                  })
                }
                style={{ left: scaffoldBlockPxWidth * path.length }}
              />

              {node.expanded &&
                !isDragging && (
                  <div
                    style={{ width: scaffoldBlockPxWidth }}
                    className={styles.lineChildren}
                  />
                )}
            </div>
          )} */}

        <div
          className={
            styles.rowWrapper +
            (!canDrag ? ` ${styles.rowWrapperDragDisabled}` : '')
          }
        >
          <div
            className={
              styles.row +
              (isLandingPadActive ? ` ${styles.rowLandingPad}` : '') +
              (isLandingPadActive && !canDrop ? ` ${styles.rowCancelPad}` : '') +
              (className ? ` ${className}` : '')
            }
            style={{
              opacity: isDraggedDescendant ? 0.5 : 1,
              marginLeft: scaffoldBlockPxWidth,
              ...style,
            }}
          >
            {toggleChildrenVisibility &&
              node.children &&
              (node.children.length > 0 || typeof node.children === 'function') && (
                <div>
                  <button
                    type="button"
                    aria-label={node.expanded ? 'Collapse' : 'Expand'}
                    className={
                      node.expanded ? styles.collapseButton + " ep-iconfont icon-arrow-down" : styles.expandButton + " ep-iconfont icon-arrow-right"
                    }
                    onClick={() =>
                      toggleChildrenVisibility({
                        node,
                        path,
                        treeIndex,
                      })
                    }
                    style={{ left: scaffoldBlockPxWidth * path.length }}
                  />

                  {node.expanded &&
                    !isDragging && (
                      <div
                        style={{ width: scaffoldBlockPxWidth }}
                        className={styles.lineChildren}
                      />
                    )}
                </div>
              )}
            {/* 这里是前面的拖动部分 */}
            {canDrag
              ? connectDragSource(nodeContent, { dropEffect: 'copy' })
              : nodeContent
            }
            {/* 后面的菜单按钮 */}
            <button className={styles.menu} onClick={() => this.setHomePage(node)} disabled={node.type === "ClassifiedMenu"}><Trans>dashboard.menuConfig.setHomePage</Trans></button>
            <button className={styles.menu} onClick={() => system.dispatch(new AddMenuClicked(node, path))} disabled={path.length >= 3}><Trans>dashboard.menuConfig.add</Trans></button>
            <button className={styles.menu} onClick={() => system.dispatch(new ModifyMenuClicked(node, path))}><Trans>dashboard.menuConfig.modify</Trans></button>
            <button className={styles.menu} style={{ color: "#333333" }} onClick={() => system.dispatch(new DeleteMenu(node, parentNode))}><Trans>dashboard.menuConfig.remove</Trans></button>
          </div>
        </div>
      </div>
    );
  }

  rowClick = (type, path, treeIndex, parentNode) => (node) => {

  }

  setHomePage = node => {
    if (node.type === "ClassifiedMenu") {
      return
    } else {
      system.dispatch(new SetHomePage(node))
    }
  }
}

MinimalThemeNodeContentRenderer.defaultProps = {
  buttons: [],
  canDrag: false,
  canDrop: false,
  className: '',
  draggedNode: null,
  icons: [],
  isSearchFocus: false,
  isSearchMatch: false,
  parentNode: null,
  style: {},
  subtitle: null,
  swapDepth: null,
  swapFrom: null,
  swapLength: null,
  title: null,
  toggleChildrenVisibility: null,
  rowDirection: 'ltr'
};

MinimalThemeNodeContentRenderer.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.node),
  canDrag: PropTypes.bool,
  className: PropTypes.string,
  icons: PropTypes.arrayOf(PropTypes.node),
  isSearchFocus: PropTypes.bool,
  isSearchMatch: PropTypes.bool,
  node: PropTypes.shape({}).isRequired,
  path: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  scaffoldBlockPxWidth: PropTypes.number.isRequired,
  style: PropTypes.shape({}),
  subtitle: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  swapDepth: PropTypes.number,
  swapFrom: PropTypes.number,
  swapLength: PropTypes.number,
  title: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  toggleChildrenVisibility: PropTypes.func,
  treeIndex: PropTypes.number.isRequired,
  treeId: PropTypes.string.isRequired,

  // Drag and drop API functions
  // Drag source
  connectDragPreview: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  didDrop: PropTypes.bool.isRequired,
  draggedNode: PropTypes.shape({}),
  isDragging: PropTypes.bool.isRequired,
  parentNode: PropTypes.shape({}), // Needed for dndManager
  // Drop target
  canDrop: PropTypes.bool,
  isOver: PropTypes.bool.isRequired,
  rowDirection: PropTypes.string
};

export default MinimalThemeNodeContentRenderer;