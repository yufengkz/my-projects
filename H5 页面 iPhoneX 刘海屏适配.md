# H5 页面 iPhoneX 刘海屏适配

>  随着这两年苹果坚定不移的走刘海屏路线，Hybrid 页面在 iPhoneX 上刘海屏的适配也是每个前端开发的小伙伴都会碰到的问题，今天就记录一下我关于刘海屏适配的部分经验。
>

对于刘海屏的适配，你的脑子里首先得有苹果手机的 Safe Area 的概念，关于 Safe Area 网上的资料已经非常多了，这里就不再赘述，更偏向实战一点。但是为了比较，我这里给出一张苹果官方文档中，iPhone8之前的常规屏幕和刘海屏 Safe Area 区域的对比图。

<img src="https://cdn.ityufeng.cn/2021-01-26-eft64t6pyl.png" style="zoom:50%;" />

很明显，在讨论适配之前，我们的页面一般有两种分类：

- 1、H5 页面使用原生 App 的 Navigation Bar 导航栏，此时，status bar 状态栏和导航栏都是原生控件，我们只需要专注的适配底部小黑条处的高度差异即可。
- 2、H5 页面在 iOS 中占据全屏页面，在这种情况下，除了要兼顾底部小黑条，我们还要处理页面上部跟 状态栏接触的部分，避免内容出现在状态栏上。

## env 函数

在介绍适配之前，我们先说一下适配用到的关键 CSS 函数 —— `env()`。`env()`函数以类似于`var`函数的方式将用户代理定义的环境变量值插入到你的 CSS 中去。这个函数最初由 iOS 浏览器提供，用于允许开发人员将其内容放置在视口的安全区域中，该规范中定义的 `safe-area-inset-*` 值用于确保内容即使在非矩形的视区中也可以完全显示。

## 页面适配

在为页面适配刘海屏之前，我们首先得在页面的 meta 中添加一个新的值：`viewport-fit=cover`

    <meta name="viewport" content="viewport-fit=cover">

这么设置之后，视图端口被缩放以填充设备显示。换句话说就是网页会扩展到整个屏幕。

看一页目前的页面效果：

<img src="https://cdn.ityufeng.cn/2021-01-26-092820.jpg" alt="hkt06xurkf.png" style="zoom:50%;" />


可以看到现在我们的测试页面已经铺满了整个屏幕。

这个时候，我们来使用之前提到的 env 函数，适配刘海屏幕。

    body {
      padding:constant(safe-area-inset-top)constant(safe-area-inset-right)constant(safe-area-inset-bottom)constant(safe-area-inset-left);/* 兼容 iOS < 11.2 */
      padding:env(safe-area-inset-top)env(safe-area-inset-right)env(safe-area-inset-bottom)env(safe-area-inset-left);/* 兼容 iOS >= 11.2 */}

为什么这里会使用 constant 呢？源于官方文档的一段注释：

    The env()function shipped in iOS 11with the name constant(). Beginning with Safari Technology Preview 41 and the iOS 11.2 beta,constant() has been removed and replaced withenv(). You can use the CSS fallback mechanism to support both versions,if necessary, but should prefer env() going forward.

意味着 iOS11.2 以后 `constant()` 不能使用，所以需要向后兼容。

此时再看一下我们的页面效果：

<img src="https://cdn.ityufeng.cn/2021-01-26-092839.jpg" alt="kt07nx5zwn.png" style="zoom:50%;" />

<img src="https://cdn.ityufeng.cn/2021-01-26-092849.jpg" alt="fp5vgxlt0g.png" style="zoom:50%;" />

可以看到页面的顶部，因为 `safe-area-inset-top` 避开了状态栏，而底部因为 `safe-area-inset-bottom` 避开了小黑条，完美的显示在了 Safe Area 的区域中。

当你的页面不使用原生导航栏铺在整个屏幕中时，这就是一个不错的适配方案。

而当你使用了原生导航栏，仅仅需要适配底部小黑条时，解决方案就更简单了，简单设置 `safe-area-inset-bottom`就可以：

    body {
      padding-bottom:constant(safe-area-inset-bottom);
      padding-bottom:env(safe-area-inset-bottom);}

## 处理 Fixed 和 绝对定位的情况

有时我们底部的元素是通过 fixed 或者 absolute 定位放置的，例如底部的按钮、工具栏等等，对于这些元素，简单的使用 `safe-area-inset-bottom` 是无效的，但是我们可以对该元素单独增加内边距的 padding 来解决。

    .element {
      padding-bottom:constant(safe-area-inset-bottom);
      padding-bottom:env(safe-area-inset-bottom);}

或者通过增加该元素的高度来解决

    @element-height: 60px;/* 元素原始高度 */.element {
      height:calc(@element-height +constant(safe-area-inset-bottom));
      height:calc(@element-height +env(safe-area-inset-bottom));}

以及你可以通过 less、sass 的函数，通过媒体查询来准确的定位到刘海屏的手机，然后写入你希望刘海屏手机展示的任何样式。

下面我就放一个我写的 less 适配刘海屏的例子：

    /**
     *  适配 iPhoneX 及以后的刘海屏手机，可以自行编写 rules 规则
     */.safe-area(@rules){/* iphone x / xs / 11 pro*/
      @media only screen and(device-width: 375px)and(device-height: 812px)and(-webkit-device-pixel-ratio:3){ @rules();}/* iphone xr / 11  stackoverflow 提供判断 */
      @media only screen and(device-width: 414px)and(device-height: 896px)and(-webkit-device-pixel-ratio:2){ @rules();}// 实际可用的 xr 判断
      @media only screen and(device-width: 375px)and(device-height: 812px)and(-webkit-device-pixel-ratio:2){ @rules();}/* iphone xs max / 11 pro max */
      @media only screen and(device-width: 414px)and(device-height: 896px)and(-webkit-device-pixel-ratio:3){ @rules();}}// 具体使用.safe-area({
      height: 100px;
      padding-bottom:env(safe-area-bottom-height);});

当编译后，就可以根据机型完成适配。这里要注意的是，实测时，对于 iPhone XR 我用在 stackoverflow 上找到的 media query 条件来判断不生效，后来经过查找资料，我找到一个在 iPhone XR 上实际可用的条件，也一并放在上面的代码中。

最后，如果这篇文章有帮助到你在适配中填坑，请给我点个赞哦 ?

文章转自： https://cloud.tencent.com/developer/article/1637066