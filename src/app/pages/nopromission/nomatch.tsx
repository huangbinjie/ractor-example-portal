import * as React from "react"
import PermissionDeniedIcon from 'ep-icons/react/PermissionDenied';
import * as style from '@app/pages/nopromission/nomatch.style'

export function NoPromission() {
  return <div className={style.wrap}>
      <div className={style.mt100}>
        <div className={style.svgContent}>
          <PermissionDeniedIcon style={{ fontSize: '73px' }} />
        </div>
        <div className={style.detail}>该页面无权限</div>
      </div>
    </div>
}