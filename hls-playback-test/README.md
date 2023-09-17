- M3U 文件获取并解析 tag
  - version
  - encrypt(KEY, METHOD, IV)
  - 其他
- Key 文件获取
- cryptoKey (JS 内置 crypt 对象) 创建
- 获取 .Ts 并解密
- 使用 Transmuxer 将 ts 的 ArrayBuffer 转换成 mp4 (mux.js)
- 转换完成的数据添加至 MediaSource
 