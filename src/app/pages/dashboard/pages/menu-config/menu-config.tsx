import * as React from "react";
import Theme from "@dashboard/components/tree-theme";
import Tree, { ExtendedNodeData, NodeData, OnDragPreviousAndNextLocation, FullTree, OnMovePreviousAndNextLocation } from "react-sortable-tree"
import { MenuModal } from "@dashboard/components/menu-modal/menu-modal";
import { system } from "@app/system/system";
import { Connect, Providers } from "ractor-react";
import { SetMenus } from "@dashboard/pages/menu-config/menu-config.store/SetMenus";
import { MenuConfigStore, MenuConfigStoreState } from "@dashboard/pages/menu-config/menu-config.store/menu-config.store";
import { AddMenuClicked } from "@dashboard/pages/menu-config/menu-config.store/AddMenuClicked";
import * as styles from "@dashboard/pages/menu-config/menu-config.style";
import { DeleteAllClicked } from "@dashboard/pages/menu-config/menu-config.store/DeleteAllClicked";
import { ResumeMenuClicked } from "@dashboard/pages/menu-config/menu-config.store/ResumeMenuClicked";
import { GetMenus } from "@dashboard/pages/menu-config/menu-config.store/GetMenus";
import { Menu } from "@dashboard/types/Menu";
import { MoveNode } from "@dashboard/pages/menu-config/menu-config.store/MoveNode";
import { LanguageStore, LanguageStoreState } from "@app/stores/language/language.store";
import { Trans, translate } from "lib/ractor-i18n";
import { Prompt } from "react-router";

type Props = MenuConfigStoreState & LanguageStoreState
type State = {
  width: number
}

@Providers([LanguageStore])
@Connect(MenuConfigStore)
export class MenuConfig extends React.Component<Props, State> {
  public static defaultProps: Props
  public state = { width: 250 }
  private treeArea = React.createRef<HTMLDivElement>()
  public componentDidUpdate() {
    if (this.props.menus.length > 0) {
      // 0.8 是每行菜单的宽度是 80%
      // 220 是后面的设置首页到删除的宽度
      // 30 是每行菜单左侧的 margin-left
      // 6 是每行菜单的 padding
      const width = this.treeArea.current!.getBoundingClientRect().width * 0.8 - 220 - 30 - 6
      if (this.state.width === 250) {
        this.setState({ width })
      }
    }
  }
  public componentDidMount() {
    setTimeout(() => system.dispatch(new GetMenus), 0)
  }
  public render() {
    return (
      <div className={styles.menuConfig}>
        <div className={styles.control}>
          <a className={styles.controlMenu} onClick={() => system.dispatch(new ResumeMenuClicked)}>
            <i className="ep-iconfont icon-chexiao" />
            <span><Trans>dashboard.menuConfig.resume</Trans></span>
          </a>
          <a className={styles.controlMenu}
            onClick={() => system.dispatch(new DeleteAllClicked)}
            style={{ color: this.props.menus.length > 0 ? "#333333" : "#a3a3a3", cursor: this.props.menus.length > 0 ? "pointer" : "not-allowed" }}>
            <i className="ep-iconfont icon-trash" />
            <span><Trans>dashboard.menuConfig.removeAll</Trans></span>
          </a>
        </div>
        <div className={styles.addMenu} onClick={() => system.dispatch(new AddMenuClicked(null, []))} style={{ width: this.state.width }}>
          <i className="ep-iconfont icon-add" style={{ marginRight: "5px" }} />
          <span>添加一级菜单</span>
        </div>
        <div ref={this.treeArea} className={styles.treeArea}>
          <Tree
            className={styles.tree}
            treeData={this.props.menus!}
            onChange={(state: Menu[]) => {
              system.dispatch(new SetMenus(state))
            }}
            theme={(Theme as any)}
            canDrag={this.canDrag}
            onMoveNode={this.onMoveNode}
            canDrop={this.canDrop}
          />
        </div>
        <MenuModal />
        <Prompt
          when={this.props.hasChanged}
          message={JSON.stringify({
            header: translate("dashboard.changePageTitle", this.props.languagePackage),
            main: translate("dashboard.changePageSubTitle", this.props.languagePackage)
          })} />
      </div>
    )
  }

  public onMoveNode(data: NodeData & FullTree & OnMovePreviousAndNextLocation) {
    // 拖动之后赋予parentId
    const currentDragNode = data.node
    const nextParentNode = data.nextParentNode
    currentDragNode.parentId = nextParentNode ? nextParentNode.id : 0
    system.dispatch(new MoveNode)
  }

  public canDrag({ node }: ExtendedNodeData) {
    if (node.type === "menu") {
      return false
    } else {
      return true
    }
  }

  public canDrop = (obj: NodeData & OnDragPreviousAndNextLocation) => {
    const maxChildrenDepth = this.genMaxDepthOfNode(obj.node as Menu)
    if (obj.nextPath.length + maxChildrenDepth > 3) {
      return false
    }
    return true
  }

  // 生成当前节点的最大深度(当前节点到最深子节点的距离)
  public genMaxDepthOfNode(node: Menu, depthArr = [0]) {
    const maxDepth: number = Math.max.apply(null, depthArr)
    node.children.forEach(child => {
      depthArr.push(maxDepth + 1)
      this.genMaxDepthOfNode(child, depthArr)
    })
    return Math.max.apply(null, depthArr)
  }
}