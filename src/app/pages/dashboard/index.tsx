import * as React from "react";
import * as Loadable from "react-loadable"
import { Trans } from "lib/ractor-i18n";

export const Dashboard = Loadable({
  loader: () => import('@dashboard/dashboard'),
  loading() {
    return <Trans>dashboard.loading</Trans>
  }
})
