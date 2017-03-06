# easingsJsWithRAF
元素点到点路径动画jquery插件，一般用于定位元素.

# 用法
```html
<div class="ball"></div>
```
```javascript
$(".ball").easeAnimate({
  easeType: 'ExpoEaseOut', // 动画类型,见下面列表, String
  endPos: [500, 500], // 结束位置：left, top, Arrary
  duration: 1000  // 动画持续时间
});
```

# 参数说明
## endPos
动画终点位置，由大于0的整数组成的数组。 例： [100, 200]
## duration
动画持续时间， 单位：毫秒(ms)
## easeType
动画类型, 参考 [http://easings.net/zh-cn](http://easings.net/zh-cn)/<br/>
可选：
* Linear
* QuadEaseIn
* QuadEaseOut
* QuadEaseInOut
* CubicEaseIn
* CubicEaseOut
* CubicEaseInOut
* QuartEaseIn
* QuartEaseOut
* QuartEaseInOut
* QuintEaseIn
* QuintEaseOut
* QuintEaseInOut
* SineEaseIn
* SineEaseOut
* SineEaseInOut
* ExpoEaseIn
* ExpoEaseOut
* ExpoEaseInOut
* CircEaseIn
* CircEaseOut
* CircEaseInOut
* ElasticEaseIn
* ElasticEaseOut
* ElasticEaseInOut
* BackEaseIn
* BackEaseOut
* BackEaseInOut
* BounceEaseIn
* BounceEaseOut
* BounceEaseInOut
