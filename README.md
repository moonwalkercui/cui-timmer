# cui-timer

## 倒计时超级插件

  * 样式类名可以自定义。
  * 调用元素中需要加入data-config属性
  * 支持自定义到时回调函数

## HTML规范

* HTML:	
	<label class="cui-timer" data-config = '{"endtime":"2017-5-2 10:10:33","msec":false,"callback":"diyFunc"}'>
* js:
	<script src="../jquery.min.js"></script>
  	<script src="cui-timer.js"></script>
  	<script">
	$(function(){
      $('.cui-timer').Cuitimer()
    });
    </script>

## 参数规范

* 	endtime结束时间，
*	msec是否显示毫秒，
*	callback 时间到自定义回调函数
*	请在html标签中加入自定义data-config属性，如data-config = '{"endtime":"2017-5-2 10:10:33","msec":false,"callback":"diyFunc"}'

## @author

* 作者：xiangrui
* 541720500@qq.com