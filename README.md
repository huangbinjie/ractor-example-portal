## 企业版 Portal 配置端

### 开发+调试

dev 

```json
 "scripts": {
    "codecheck": "tslint --project tsconfig.json",
    "start": "node scripts/start.js",
    "proxy": "node scripts/start.js --type=proxy",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js --env=jsdom"
  }
```

hooks

```json
"husky": {
 "hooks": {
   "pre-commit": "npm run codecheck",
   "commit-msg": "cross-env-shell \"commitlint -e $HUSKY_GIT_PARAMS\""
 }
}
```

### 技术栈

React + ts

### 建议代码规范
待补充
