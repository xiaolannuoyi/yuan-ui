const path = require("path");
const md = require("markdown-it")(); // 引入markdown-it
const slugify = require("transliteration").slugify; // 引入transliteration中的slugify方法

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
      // .loader(path.resolve(__dirname, "./md-loader/index.js"));//element-ui的md处理在md-loader中,这里没有使用.处理方式在下面

      .options({
        raw: true,
        preventExtract: true, //这个加载器将自动从html令牌内容中提取脚本和样式标签
        // 定义处理规则
        preprocess: (MarkdownIt, source) => {
          // 对于markdown中的table,
          MarkdownIt.renderer.rules.table_open = function() {
            return '<table class="doctable">';
          };
          // 对于代码块去除v-pre,添加高亮样式
          const defaultRender = md.renderer.rules.fence;
          MarkdownIt.renderer.rules.fence = (
            tokens,
            idx,
            options,
            env,
            self
          ) => {
            const token = tokens[idx];
            // 判断该 fence 是否在 :::demo 内
            const prevToken = tokens[idx - 1];
            const isInDemoContainer =
              prevToken &&
              prevToken.nesting === 1 &&
              prevToken.info.trim().match(/^demo\s*(.*)$/);
            if (token.info === "html" && isInDemoContainer) {
              return `<template slot="highlight"><pre v-pre><code class="html">${md.utils.escapeHtml(
                token.content
              )}</code></pre></template>`;
            }
            return defaultRender(tokens, idx, options, env, self);
          };
          return source;
        },
        use: [
          // 标题锚点
          [
            require("markdown-it-anchor"),
            {
              level: 2, // 添加超链接锚点的最小标题级别, 如: #标题 不会添加锚点
              slugify: slugify, // 自定义slugify, 我们使用的是将中文转为汉语拼音,最终生成为标题id属性
              permalink: true, // 开启标题锚点功能
              permalinkBefore: true // 在标题前创建锚点
            }
          ],
          // :::demo ****
          //
          // :::
          //匹配:::后面的内容 nesting == 1,说明:::demo 后面有内容
          //m为数组,m[1]表示 ****
          [
            require("markdown-it-container"),
            "demo",
            {
              validate: function(params) {
                return params.trim().match(/^demo\s*(.*)$/);
              },

              render: function(tokens, idx) {
                const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
                if (tokens[idx].nesting === 1) {
                  //
                  const description = m && m.length > 1 ? m[1] : ""; // 获取正则捕获组中的描述内容,即::: demo xxx中的xxx
                  const content =
                    tokens[idx + 1].type === "fence"
                      ? tokens[idx + 1].content
                      : "";

                  return `<demo-block>
                  <div slot="source">${content}</div>
                  ${description ? `<div>${md.render(description)}</div>` : ""}
                  `;
                }
                return "</demo-block>";
              }
            }
          ],
          [require("markdown-it-container"), "tip"],
          [require("markdown-it-container"), "warning"]
        ]
      });
  }
};
