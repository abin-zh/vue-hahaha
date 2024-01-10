# 任务一

> - 主页显示文章列表，每篇文章可以被阅读，阅读后可以点赞，点赞数初始为 0;
> - 并把代码上传到 gitee 或者 github 代码库进行管理。

### 主要步骤和代码：

1. #### 声明并初始化所需数据(文章列表、文章、点赞数、是否点赞)

```javascript
data() {
        return {
            content: "",
            like: 0,
            isLike:false,
            currenIndex: 0,
            articles: [
                {
                    shortTitle: "Button 按钮",
                    title: "Button 按钮",
                    content: "使用 type、plain、round 和 circle 来定义按钮的样式。",
                    like: 0,
                    isLike:false
                },
                {
                    shortTitle: "Border 边框",
                    title: "Border 边框",
                    content: "我们对边框进行统一规范，可用于按钮、卡片、弹窗等组件里。",
                    like: 0,
                    isLike:false
                },
                {
                    shortTitle: "Color 色彩",
                    title: "Color 色彩",
                    content: "Element Plus 为了避免视觉传达差异，使用一套特定的调色板来规定颜色，为你所搭建的产品提供一致的外观视觉感受。",
                    like: 0,
                    isLike:false
                }
            ]
        }
```

2. #### 显示内容

- ##### 显示文章列表

```html
<el-aside>
    <el-menu mode="vertical" :default-active="currenIndex">
        <el-menu-item :index="index" v-for="(item, index) in articles" @click="changeContent(item,index)">
            {{ item.shortTitle }}
        </el-menu-item>
    </el-menu>
</el-aside>
```

- ##### 显示文章和点赞数

```html
<el-container>
        <el-main>
            <el-text>{{ content }}</el-text>
        </el-main>
        <el-footer>
            <el-space>
                <el-button @click="doLike" circle>
                    <font-awesome-icon v-if="!isLike" icon="fa-regular fa-thumbs-up" />
                    <font-awesome-icon v-else icon="fa-solid fa-thumbs-up" />
                </el-button>
                <el-text>{{ like }}</el-text>
            </el-space>
        </el-footer>
</el-container>
```

3. #### 执行点击事件

- ##### 点击侧边栏的文章列表，切换文章。

```html
<el-menu-item :index="index" v-for="(item, index) in articles" @click="changeContent(item,index)">
    {{ item.shortTitle }}
</el-menu-item>
```

```javascript
changeContent(item,index) {
    //更改当前所在文章索引
    this.currenIndex = index;
    //切换页面文章数据
    this.content = item.content;
    this.like = item.like;
    this.isLike = item.isLike;
}
```

- ##### 点击点赞按钮，若已点赞，点赞数增加一，否则减少一。

```html
<el-button @click="doLike" circle>
    <font-awesome-icon v-if="!isLike" icon="fa-regular fa-thumbs-up" />
    <font-awesome-icon v-else icon="fa-solid fa-thumbs-up" />
</el-button>
```

```javascript
doLike(){
    let article = this.articles[this.currenIndex];
    //更新点赞数
    if(article.isLike){
      article.like --;
      article.isLike = false;
    }else{
      article.like ++;
      article.isLike = true;
    }
    //切换页面文章数据
    this.like = article.like;
    this.isLike = article.isLike;
}
```
