const path = require("path");

module.exports = {
  // 修改 pages 入口
  pages: {
    index: {
      entry: "examples/main.js", // 入口
      template: "public/index.html", // 模板
      filename: "index.html" // 输出文件
    }
  },
  // 扩展 webpack 配置
  chainWebpack: config => {
    // @ 默认指向 src 目录，这里要改成 examples
    // 另外也可以新增一个 ~ 指向 packages
    config.resolve.alias
      .set("@", path.resolve("examples"))
      .set("~", path.resolve("packages"));

    // 把 packages 和 examples 加入编译，因为新增的文件默认是不被 webpack 处理的
    config.module
      .rule("js")
      .include.add(/packages/)
      .end()
      .include.add(/examples/)
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap(options => {
        // 修改它的选项...
        return options;
      });
    //markdown
    config.module
      .rule("md")
      .test(/\.md/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-markdown-loader")
      .loader("vue-markdown-loader/lib/markdown-compiler")
      .loader(path.resolve(__dirname, "./md-loader/index.js"));

    // .options({
    //   raw: true,
    //   preventExtract: true, //这个加载器将自动从html令牌内容中提取脚本和样式标签
    //   // 定义处理规则
    //   preprocess: (MarkdownIt, source) => {
    //     // 对于markdown中的table,
    //     // MarkdownIt.renderer.rules.table_open = function() {
    //     //   return '<table class="table">';
    //     // };
    //     // 对于代码块去除v-pre,添加高亮样式
    //     MarkdownIt.renderer.rules.fence = wrap(
    //       MarkdownIt.renderer.rules.fence
    //     );
    //     return source;
    //   },
    //   use: [
    //     // 标题锚点
    //     [
    //       require("markdown-it-anchor"),
    //       {
    //         level: 2, // 添加超链接锚点的最小标题级别, 如: #标题 不会添加锚点
    //         slugify: slugify, // 自定义slugify, 我们使用的是将中文转为汉语拼音,最终生成为标题id属性
    //         permalink: true, // 开启标题锚点功能
    //         permalinkBefore: true // 在标题前创建锚点
    //       }
    //     ],
    //     // :::demo ****
    //     //
    //     // :::
    //     //匹配:::后面的内容 nesting == 1,说明:::demo 后面有内容
    //     //m为数组,m[1]表示 ****
    //     [
    //       require("markdown-it-container"),
    //       "demo",
    //       {
    //         validate: function(params) {
    //           return params.trim().match(/^demo\s+(.*)$/);
    //         },

    //         render: function(tokens, idx) {
    //           const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
    //           if (tokens[idx].nesting === 1) {
    //             //
    //             const description = m && m.length > 1 ? m[1] : ""; // 获取正则捕获组中的描述内容,即::: demo xxx中的xxx
    //             const content = tokens[idx + 1].content; // 获得内容
    //             // 2.获取代码块内的html和js代码
    //             const html = convert(
    //               striptags.strip(content, ["script", "style"])
    //             ).replace(/(<[^>]*)=""(?=.*>)/g, "$1"); // 解析过滤解码生成html字符串
    //             const script = striptags.fetch(content, "script"); // 获取script中的内容
    //             const style = striptags.fetch(content, "style"); // 获取style中的内容
    //             let jsfiddle = { html: html, script: script, style: style }; // 组合成prop参数,准备传入组件
    //             // 是否有描述需要渲染
    //             const descriptionHTML = description
    //               ? md.render(description)
    //               : "";

    //             jsfiddle = md.utils.escapeHtml(JSON.stringify(jsfiddle)); // 将jsfiddle对象转换为字符串,并将特殊字符转为转义序列
    //             // 起始标签,写入demo-block模板开头,并传入参数
    //             return `<demo-block class="demo-box" :jsfiddle="${jsfiddle}">
    //                       <div class="source" slot="source">${html}</div>
    //                       ${descriptionHTML}
    //                       <div class="highlight" slot="highlight">`;
    //           }
    //           return "</div></demo-block>";
    //         }
    //       }
    //     ]
    //   ]
    // });
  }
};
