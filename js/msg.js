var msgBox = $("<form/>").attr("id","msg_box").html('<div id="msg_title">留言咨询<span class="msg_close">X</span></div><div id="msg_left"><label for="msg_name">姓名：</label><label for="msg_phone">电话：</label><label>套餐：</label><label for="msg_content">内容：</label></div><div id="msg_right"><input type="text" name="msg_name" id="msg_name"><input type="text" name="msg_phone" id="msg_phone"><div id="msg_package_box"><input type="radio" name="msg_package" class="msg_package" id="msg_package_one" value="1" checked="checked"><label for="msg_package_one">套餐一</label><input type="radio" name="msg_package" class="msg_package" id="msg_package_two" value="2"><label for="msg_package_two">套餐二</label><input type="radio" name="msg_package" class="msg_package" id="msg_package_three" value="3"><label for="msg_package_three">套餐三</label><input type="radio" name="msg_package" class="msg_package" id="msg_package_four" value="4"><label for="msg_package_four">套餐四</label><input type="radio" name="msg_package" class="msg_package" id="msg_package_five" value="5"><label for="msg_package_five">套餐五</label></div><textarea name="msg_content" id="msg_content"></textarea></div><div id="msg_test_box"><label id="msg_test_font" for="msg_test">验证码：</label><input type="text" name="msg_test" id="msg_test" value="" /><canvas id="msg_test_img" width="100" height="22"></canvas></div><input type="reset" name="msg_reset" id="msg_reset" value="重置" /><input type="button" name="msg_submit" id="msg_submit" value="提交" />');
var msg_test_str = "";
$("#show_msg_box").click(function(){
	msgBox.appendTo($("body"));
	msg_test_str = verification();
	return false;
})
$("body").on("click",".msg_close",function(e){
	e.stopPropagation;
	e.preventBubble;
	msgBox.remove();
})
$("body").on("click","#msg_test_img",function(){
	$("#msg_test").val("").focus();
	msg_test_str = verification();
})
$("body").on("click","#msg_reset",function(){
	msg_test_str = verification();
})
$("body").on("mousedown","#msg_title",function(e){
	_this = $("#msg_box");
	var cW = e.clientX - _this[0].offsetLeft;
	var cH = e.clientY - _this[0].offsetTop;
	$(document).on("mousemove",function(e){
		e.stopPropagation;
		e.preventBubble;
		_this.css({
			"left": e.clientX - cW,
			"top": e.clientY - cH,
		})
	})
	$(document).on("mouseup",function(e){
		$(document).off("mousemove");
	})
})
function verification(){
	var cvs = msgBox.find("#msg_test_img")[0];
//	console.log(cvs);
	var ctx = cvs.getContext('2d');
	var _str="a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9";
	var _str_array=_str.split(",");
	var return_str="";
	for(i=0;i<5;i++){
		var _rnd=Math.floor(Math.random()*_str_array.length);
		return_str += _str_array[_rnd];
	};
//	console.log(return_str);
	ctx.clearRect(0,0,cvs.width,cvs.height);
	ctx.fillStyle = "#000"; 
	ctx.fillRect(0,0,cvs.width,cvs.height);
	ctx.font = "16px Chalkduster";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillStyle = "#fff";
	ctx.fillText(return_str,cvs.width/2,cvs.height/2);
	return return_str;
}
$("body").on("click","#msg_submit",function(){
	var msg_msg = "";
	if(!/^[\u4e00-\u9fa5]/.test($("#msg_name").val())){
		msg_msg = "请备注您的姓名，方便我们联系哦";
		$("#msg_name").focus();
	}else if(!/^1[0-9]{10}/.test($("#msg_phone").val())){
		msg_msg = "请备注您的电话，方便我们联系哦";
		$("#msg_phone").focus();
	}else if($("#msg_content").val() == ""){
		msg_msg = "请填写详细的留言内容，我们才能知道您的问题";
		$("#msg_content").focus();
	}else if($("#msg_test").val() == ""){
		msg_msg = "请输入验证码";
		$("#msg_test").focus();
	}else if(msg_test_str != $("#msg_test").val()){
		msg_msg = "验证码输入错误";
		$("#msg_test").focus();
		msg_test_str = verification();
	}else{
		$.ajax({
			type:"post",
			url:"msg.php",
			async:true,
			data:{
				name:$("#msg_name").val(),
				phone:$("#msg_phone").val(),
				package:$(".msg_package:checked").val(),
				content:$("#msg_content").val(),
			}
		});
		return false;
	}
	$("<span/>").addClass("msg_msg").text(msg_msg).hide().appendTo($("#msg_box")).fadeIn(800).delay(1200).fadeOut(1000,function(){$(this).remove();});
})
