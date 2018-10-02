import { LanguageStore } from "@app/stores/language/language.store";
import { HistoryStore } from "@app/stores/history.store";
import { UserStore } from "@app/stores/user/user.store";
import { LoggerStore } from "@app/stores/logger.store";
import { TokenStore } from "@app/stores/token/token.store";
import { PermissionStore } from "@app/stores/permission/permission.store";

export default [LoggerStore, TokenStore, LanguageStore, HistoryStore, UserStore, PermissionStore]