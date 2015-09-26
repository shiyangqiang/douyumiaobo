var timeInter = self.setInterval("checktime()",10000);
var miaoboInter = "";
var chart_content = $('#chart_content');
function checktime(){
    var curTime = new Date();
	curMin = curTime.getMinutes();
	if((curMin >= 29 && curMin < 31)|| (curMin >= 59) || (curMin >= 0 && curMin < 1)){
		if(!miaoboInter){
			miaoboInter = self.setInterval("daka()",3000);
		}
	}
	if(curMin == 1 || curMin == 31){
		if(miaoboInter){
			window.clearInterval(miaoboInter);
			miaoboInter = "";
		}
	}
}
function daka(){
	var chat_line_list_Last = $(".text_cont:last").children("a").html();
	if(chat_line_list_Last == "您的发言速度过快...."){
		window.clearInterval(miaoboInter);
		miaoboInter = "";
		console.log(chat_line_list_Last);
		return false;
	}
	var curTime = new Date();
	curHour = curTime.getHours();
	curMin = curTime.getMinutes();
	curSec = curTime.getSeconds();
	if(curMin == 29 || curMin ==59){
		if(curSec >= 55){
			chart_content.val("现在时间:"+curHour+"点"+curMin+"分"+curSec+"秒,开始打卡!");
			console.log("现在时间:"+curHour+"点"+curMin+"分"+curSec+"秒!");
			sendmsgMY();
		}
	}
	if(curMin == 30 || curMin == 0){
		var dakaCon = "*打卡";
		var num = Math.random()*100 + 50;
		num = parseInt(num);
		dakaCon += num;
		chart_content.val(dakaCon);
		console.log("现在时间:"+curHour+"点"+curMin+"分"+curSec+"秒,开始打卡!");
		sendmsgMY();
	}
}

function sendmsgMY () {
	var j = $("#chart_content").val();
	var k = check_user_login();
	if (!k) {
		var i = $("body").data("page");
		if (i && i == "qqapp") {
			msg_show("未检测到登录信息,无法发言.");
			return false
		} else {
			user_dialog.open_login();
			return false
		}
	}
	var c = barrage_color;
	if (checkemot(j)) {
		c = 0
	}
	var e = [{
		name: "content",
		value: scan_str(j)
	}, {
		name: "scope",
		value: $("#privatstate").val()
	}, {
		name: "col",
		value: c
	}];
	var f = !k ? touristuid : k.wl_uid;
	e.push({
		name: "sender",
		value: f
	});
	if ($("#privateuid").val() > 0) {
		e.push({
			name: "receiver",
			value: $("#privateuid").val()
		})
	}
	var h = Sttencode(e);
	thisMovie("WebRoom").js_sendmsg(h);
}
