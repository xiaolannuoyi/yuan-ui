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
  parallel: false, //解决打包时,报错问题  https://github.com/QingWei-Li/vue-markdown-loader/issues/61
  // 扩展 webpack 配置
  chainWebpack: config => {
    // @ 默认指向 src 目录，这里要改成 examples
    // 另外也可以新增一个 ~ 指向 packages
    config.resolve.alias
      .set("@", path.resolve("examples"))
      .set("~", path.resolve("packages"))
      .set("src", path.resolve("src"));

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
      .loader(path.resolve(__dirname, "./md-loader/index.js"));//element-ui的md处理在md-loader中,这里没有使用.处理方式在下面
  }
};
