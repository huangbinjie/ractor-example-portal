import * as React from "react"
import PermissionDeniedIcon from 'ep-icons/react/PermissionDenied';
import * as style from '@app/pages/nomatch/nomatch.style'

export function NoMatch() {
  return <div className={style.wrap}>
      <div className={style.mt100}>
        <div className={style.svgContent}>
          <PermissionDeniedIcon style={{ fontSize: '73px' }} />
        </div>
        <div className={style.detail}>抱歉，您访问的页面不存在</div>
      </div>
    </div>
}