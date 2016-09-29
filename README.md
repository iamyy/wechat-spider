# 一个爬虫程序，爬取指定微信公众号的全部历史文章

### 用法：

* #### **STEP 1** 	配置两处验证信息：

	A. src/index.js 中的 key 值和 biz 值

	**获取方法：**
			手机、电脑同时登录微信
			-> 手机里搜索一个公众号
			-> 进入公众号后点击右上角的人像按钮
			-> 点击“查看历史消息”
			-> 点击右上角三个点
			-> 分享给自己
			-> 电脑端收到消息后点击
			-> 浏览器打开历史消息页面后从 url 里即可找到 key 值和 biz 值

  B. src/headers.js 中的 Cookie 值
			
	**获取方法：**
			电脑端浏览器打开历史消息页面后
			-> 右键“检查”
			-> 刷新页面
			-> network 选项卡里找到 https://mp.weixin.qq.com/mp/getmasssendmsg 请求
			-> 在请求头里找到 Cookie 字段即可


* #### **STEP 2** 运行脚本

	``` bash
  npm install
  npm run build
  node lib/index.js
	```

随后，每条文章将以 .json 格式的文件存储到 output 目录下。

例：
``` json
{
  "id" : "503948740",
  "title" : "刚收养的杜宾犬使劲咬住小孩把她扔出去，走近看才发现原因……",
  "desc" : "Svilicic夫妇刚在4天前收养了一只名叫Khan的杜宾犬，之前的主人虐待过它最后还遗弃了它，收容所在这对",
  "url" : "http://mp.weixin.qq.com/s?__biz=MjM5NjM2NjQ0OA==&amp;mid=2651432395&amp;idx=4&amp;sn=bee861bd2f1325e4a1103a8a8156f3e7&amp;scene=4#wechat_redirect",
  "cover" : "http://mmbiz.qpic.cn/mmbiz/ftBdoTM0jjUicicfhMb8Wq2yibnAqibJQMBONzoCSprVUrgOWgTtFJmRK16kT6libkNFb4ib9ibKQH0mNTYG6yaIicEaibA/0?wx_fmt=jpeg",
}
```
