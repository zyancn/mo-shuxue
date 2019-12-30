//max 算式中数字的最大值，min 算式中数字的最小值，num 出题数量，z算式结果的最大值。
let global_result_arr = [];
$(document).ready(
	init
);

function init() {
	//按钮添加参数事件
	$("#co_add_a").click(do_add_canshu);
	$("#co_del_a").click(do_del_canshu);
	//按钮添加生成题目事件
	$("#show [name='sub']").click(do_result_num);
	$("#show_table").click(do_new_tab);
	$("#show_table_add").click(do_add_tab);
	$("#show_table_mix").click(do_mix_tab);

	$("#point_text").click(do_print);
	$("#clip_board").click(do_copy);
	//检测括号选项
	let add_bra_ele = document.getElementById("add_bra_id");
	let show_kuohao_ele = document.getElementById("show_kuohao");
	show_kuohao_ele.disabled = true;
	add_bra_ele.onclick = function (e) {
		if (add_bra_ele.checked) {
			show_kuohao_ele.disabled = false;
		} else {
			show_kuohao_ele.checked = false;
			show_kuohao_ele.disabled = true;
		}

	}

}


//表格格式化
function do_table_format(result_arr) {
	for (let index = 0; index < result_arr.length;) {
		let cheng_in = result_arr[index].indexOf("*");
		let chu_in = result_arr[index].indexOf("/");
		if (cheng_in >= 0) {
			result_arr[index].splice(cheng_in, 1, "×");
		} else if (chu_in >= 0) {
			result_arr[index].splice(chu_in, 1, "÷");
		} else {
			index++;
		}

	}
	return result_arr
}
//清空表格
function do_new_tab() {
	global_result_arr = [];
	do_table(global_result_arr);
}

function do_add_tab() {
	let result_arr_present = do_result_num();
	global_result_arr = global_result_arr.concat(do_table_format(result_arr_present));
	do_table(global_result_arr);
}

function do_mix_tab() {
	let result_arr_present = [];
	let index = 0;
	while (0 < global_result_arr.length) {
		let num = Math.floor(Math.random() * global_result_arr.length);
		result_arr_present.push(global_result_arr.splice(num, 1)[0]);
	}
	global_result_arr = result_arr_present.slice();
	do_table(global_result_arr);
}

function do_table(result_arr) {
	//清空表格
	$("#table_show").html('');
	//题目
	let get_title = $("#co_title").prop("value");
	let title_str = "<h3 class='text-center'>" + get_title + "</h3>";
	$("#table_show").prepend(title_str);
	//表格
	let get_tr_num = parseInt($("#co_tr_num").prop("value"));
	if ($("#co_tr_num").prop("value").trim() == "") {
		get_tr_num = 3;
	}
	if (get_tr_num <= 0) {
		alert("表格列数输入错误，请重新输入")
	}
	let get_td_height = parseInt($("#co_td_height").prop("value"));
	if ($("#co_td_height").prop("value").trim() == "") {
		get_td_height = 1;
	}
	if (get_td_height <= 0) {
		alert("表格单行高度输入错误，请重新输入")
	}
	let get_font_size = parseInt($("#co_font_size").prop("value")) + "px";
	if ($("#co_font_size").prop("value").trim() == "") {
		get_font_size = "18px";
	}
	let table_str = '<table class="table table-striped" style="font-size:' + get_font_size + '">';
	let add_n_str = '';
	for (let j = 0; j < get_td_height; j++) {
		add_n_str += "<br>";

	}
	for (let index = 0; index < result_arr.length; index++) {
		let result_str = result_arr[index].join(" ") + " =" + add_n_str;
		if (index % get_tr_num == 0) {
			table_str += "<tr><td>" + result_str;

		} else if (index % get_tr_num == 6) {
			table_str += result_str + "</td></tr>"
		} else {
			table_str += "<td>" + result_str + "</td>"
		}

	}
	table_str += "</table>";
	$("#table_show").append(table_str);
}
//生成算式
//
function do_result_num() {
	//初始化结果判断类的错误提示
	result_method_class.method_err = false;
	let result_arr = [];
	//获取客户设置的各参数的合成条件
	let build_obj = do_build_obj();
	//获取客户设置的生成算式的数量
	let result_num = parseInt($("#co_result")[0].value);
	if ($("#co_result")[0].value.trim() == "") {
		result_num = 1;
	}
	if (result_num <= 0) {
		alert("输入的数字不正确，请重新输入");
	}
	//获取客户选择的结果约束条件
	let result_method = $(".co_result_method");
	let result_method_arr = [];
	for (let index = 0; index < result_method.length; index++) {
		if (result_method.eq(index).prop("checked")) {
			result_method_arr.push(result_method.eq(index).prop("value"));
		}
	}
	let i = 0;
	let while_time = 0;
	let result_method_pass = true;
	while (i < result_num) {
		if (while_time == 199999) {
			alert("运行时间过长，共计算出" + result_arr.length + "个结果，请检查您的设置");
			break;
		}
		while_time++;
		//生成算式
		let build_arr = do_build_arr(build_obj);
		//进行结果判断
		if (!result_method_class.method_err) {
			for (let j = 0; j < result_method_arr.length; j++) {
				if (result_method_class[result_method_arr[j]](build_arr, result_arr)) {
					result_method_pass = true;
				} else {
					result_method_pass = false;
					break;
				}

			}
		} else {
			break;
		}


		//如果完全符合结果判断条件就确定这个算式
		if (result_method_pass) {
			result_arr.push(build_arr);
			i++;
		} else {
			//如果不符合就重新执行
			continue;
		}
	}
	return result_arr
}
//对结果进行约束的类，其中包含的各种方法。方法名称必须与html页面checkbox 的value属性一致，并且接受两个参数，build_arr（算式数组——当前生成的算式），result_arr（结果数组——符合条件的算式集合）作为参数，返回一个boolean值
result_method_class = {
	method_err: false,
	do_result_range: function (build_arr) {
		let result_range;
		let result_string = eval(build_arr.join(""));
		let result_min = parseFloat($("#jieguo input")[0].value);
		let result_max = parseFloat($("#jieguo input")[1].value);
		if (!result_min && result_min != 0) {
			alert("在结果最小值设置上存在错误，请检查！");
			result_method_class.method_err = true;
			return;
		} else if (!result_max && result_max != 0) {
			result_method_class.method_err = true;
			alert("在结果最大值设置上存在错误，请检查！");
			return;
		} else if (result_min > result_max) {
			result_method_class.method_err = true;
			alert("在结果中最小值大于最大值，请检查！");
			return;
		} else {
			if (result_string >= result_min && result_string <= result_max) {
				result_range = true;
			} else {
				result_range = false;
			}

			return result_range
		}
	},
	do_result_jiewei: function (build_arr) {

		let result_jiewei = true;
		let result_jiewei_num = parseInt($("#jiewei input")[0].value);
		if (result_jiewei_num>=10||result_jiewei_num<0) {
			alert("请在【控制最后一位不能出现哪个数字】中输入0到9的数字");
			result_method_class.method_err = true;
		}
		for (let index = 0; index < build_arr.length; index++) {
			if (!isNaN(parseFloat(build_arr[index]))) {
				if (build_arr[index].slice(-1) == result_jiewei_num.toString()) {
					result_jiewei = false;
				}
			}
		}
		return result_jiewei

	},

	do_result_jinwei: function (build_arr) {
		let result_jinwei;
		let result_string = eval(build_arr.join("")).toString();
		let index_num = 0;
		if (build_arr.indexOf("(") == 0) {
			index_num = 1;
		}
		let result_weishu = build_arr[index_num].length - result_string.length;
		let result_radio = $("#jinwei input[type='radio']");
		for (let index = 0; index < result_radio.length; index++) {
			let result_radio_index = result_radio.eq(index);
			if (result_radio_index.prop("checked")) {
				if (result_radio_index.prop("value") == "do_result_ahead" && result_weishu == -1) {
					result_jinwei = true;
					return result_jinwei;
				} else if (result_radio_index.prop("value") == "do_result_back" && result_weishu == 1) {
					result_jinwei = true;
					return result_jinwei;
				} else if (result_radio_index.prop("value") == "do_result_stay" && result_weishu == 0) {
					result_jinwei = true;
					return result_jinwei;
				} else if (result_weishu == 1 || result_weishu == -1 && result_radio_index.prop("value") == "do_result_ahead_back") {
					result_jinwei = true;
					return result_jinwei;
				} else {
					result_jinwei = false;
					return result_jinwei
				}
			}

		}
	},
	do_result_chachong: function (build_arr, result_arr) {
		let build_arr_new = build_arr.slice().join("");
		let result_arr_new = result_arr.slice();
		for (let index = 0; index < result_arr_new.length; index++) {

			if (result_arr_new[index].join("") === build_arr_new) {
				return false
			}
		}
		return true

	},

	do_result_kuohao: function (build_arr) {
		if ($("#co_add_bra_input input").eq(0).prop("checked")) {
			if (build_arr.indexOf(")") >= 0) {
				return true
			} else {
				return false
			}
		} else {
			alert("请先选中上方【添加括号选项】，否则本选项无法使用");
			return
		}
	},


	//修改后的
	do_result_nofu: function (build_arr) {
		let build_arr_new = build_arr.slice();
		let result_nofu = false;
		nofu_fn_bar = function () {
			let nofu_fn_l_bra = build_arr_new.lastIndexOf("(");
			let nofu_fn_r_bra = build_arr_new.indexOf(")", nofu_fn_l_bra);
			if (nofu_fn_l_bra >= 0) {
				build_arr_new_bar = build_arr_new.splice(nofu_fn_l_bra, nofu_fn_r_bra - nofu_fn_l_bra + 1);
				let nofu_fn_chengchu_return = nofu_fn_chengchu(build_arr_new_bar);
				if (nofu_fn_chengchu_return[0]) {
					build_arr_new.splice(nofu_fn_l_bra, 0, nofu_fn_chengchu_return[1]);
					nofu_fn_bar();
				} else {
					result_nofu = false;
					return
				}
			} else {
				result_nofu = nofu_fn_chengchu(build_arr_new)[0];
				return
			}
		}

		nofu_fn_chengchu = function (nofu_arr) {

			if (nofu_arr.indexOf("(") >= 0) {
				nofu_arr.pop();
				nofu_arr.shift();
			}

			//console.log(nofu_arr);
			let result_nofu_fn_chengchu = [false, ""];
			let nofu_cheng = nofu_arr.indexOf("*");
			let nofu_chu = nofu_arr.indexOf("/");
			if (nofu_arr.length >= 3) {

				if ((nofu_cheng < nofu_chu || nofu_chu < 0) && nofu_cheng >= 0) {
					nofu_arr.splice(nofu_cheng - 1, 3, parseFloat(nofu_arr[nofu_cheng - 1]) * parseFloat(nofu_arr[nofu_cheng + 1]));
					return nofu_fn_chengchu(nofu_arr);
				} else if ((nofu_cheng > nofu_chu || nofu_cheng < 0) && nofu_chu >= 0) {
					nofu_arr.splice(nofu_chu - 1, 3, parseFloat(nofu_arr[nofu_chu - 1]) / parseFloat(nofu_arr[nofu_chu + 1]));
					return nofu_fn_chengchu(nofu_arr);
				} else {
					let eval_build_arr2 = eval(nofu_arr.splice(0, 3).join(""));
					if (eval_build_arr2 >= 0) {
						nofu_arr.unshift(eval_build_arr2);
						return nofu_fn_chengchu(nofu_arr);
					} else {
						return result_nofu_fn_chengchu = [false, false];
					}
				}
			} else {
				result_nofu_fn_chengchu = [true, nofu_arr[0]];
				return result_nofu_fn_chengchu
			}
		}
		nofu_fn_bar();
		return result_nofu
	},

	//原函数修改前do_result_nofu
	// do_result_nofu: function (build_arr) {
	// 	let result_nofu = false;
	// 	let build_arr_new = build_arr.slice();

	// 	function nofu_fn() {
	// 		let nofu_cheng = build_arr_new.indexOf("*");
	// 		let nofu_chu = build_arr_new.indexOf("/");
	// 		if (build_arr_new.length >= 3) {
	// 			if ((nofu_cheng < nofu_chu || nofu_chu < 0) && nofu_cheng >= 0) {
	// 				build_arr_new.splice(nofu_cheng - 1, 3, parseFloat(build_arr_new[nofu_cheng - 1]) * parseFloat(build_arr_new[nofu_cheng + 1]));
	// 				nofu_fn();
	// 			} else if ((nofu_cheng > nofu_chu || nofu_cheng < 0) && nofu_chu >= 0) {
	// 				build_arr_new.splice(nofu_chu - 1, 3, parseFloat(build_arr_new[nofu_chu - 1]) / parseFloat(build_arr_new[nofu_chu + 1]));
	// 				nofu_fn();
	// 			} else {
	// 				let eval_build_arr2 = eval(build_arr_new.splice(0, 3).join(""));
	// 				if (eval_build_arr2 >= 0) {
	// 					build_arr_new.unshift(eval_build_arr2);
	// 					nofu_fn();
	// 				} else {
	// 					result_nofu = false;
	// 					return
	// 				}
	// 			}
	// 		} else {
	// 			result_nofu = true;
	// 			return
	// 		}
	// 	}
	// 	nofu_fn();
	// 	return result_nofu
	// },

	//新整除函数
	do_result_zhengchu: function (build_arr) {
		let build_arr_new = build_arr.slice();
		let result_nofu = false;
		nofu_fn_bar = function () {
			let nofu_fn_l_bra = build_arr_new.lastIndexOf("(");
			let nofu_fn_r_bra = build_arr_new.indexOf(")", nofu_fn_l_bra);
			if (nofu_fn_l_bra >= 0) {
				build_arr_new_bar = build_arr_new.splice(nofu_fn_l_bra, nofu_fn_r_bra - nofu_fn_l_bra + 1);
				let nofu_fn_chengchu_return = nofu_fn_chengchu(build_arr_new_bar);
				if (nofu_fn_chengchu_return[0]) {
					build_arr_new.splice(nofu_fn_l_bra, 0, nofu_fn_chengchu_return[1]);
					nofu_fn_bar();
				} else {
					result_nofu = false;
					return
				}
			} else {
				result_nofu = nofu_fn_chengchu(build_arr_new)[0];
				return
			}
		}

		nofu_fn_chengchu = function (nofu_arr) {

			if (nofu_arr.indexOf("(") >= 0) {
				nofu_arr.pop();
				nofu_arr.shift();
			}

			//console.log(nofu_arr);
			let result_nofu_fn_chengchu = [false, ""];
			let nofu_cheng = nofu_arr.indexOf("*");
			let nofu_chu = nofu_arr.indexOf("/");
			if (nofu_arr.length >= 3) {

				if ((nofu_cheng < nofu_chu || nofu_chu < 0) && nofu_cheng >= 0) {
					nofu_arr.splice(nofu_cheng - 1, 3, parseFloat(nofu_arr[nofu_cheng - 1]) * parseFloat(nofu_arr[nofu_cheng + 1]));
					return nofu_fn_chengchu(nofu_arr);
				} else if ((nofu_cheng > nofu_chu || nofu_cheng < 0) && nofu_chu >= 0) {
					if (parseFloat(nofu_arr[nofu_chu - 1]) % parseFloat(nofu_arr[nofu_chu + 1]) == 0) {
						nofu_arr.splice(nofu_chu - 1, 3, parseFloat(nofu_arr[nofu_chu - 1]) / parseFloat(nofu_arr[nofu_chu + 1]));
						return nofu_fn_chengchu(nofu_arr);
					} else {
						return result_nofu_fn_chengchu = [false, false];
					}

				} else {
					let eval_build_arr2 = eval(nofu_arr.splice(0, 3).join(""));
					nofu_arr.unshift(eval_build_arr2);
					return nofu_fn_chengchu(nofu_arr);
				}

			} else {
				result_nofu_fn_chengchu = [true, nofu_arr[0]];
				return result_nofu_fn_chengchu
			}
		}
		nofu_fn_bar();
		return result_nofu
	}
	//旧整除函数
	// do_result_zhengchu: function (build_arr) {
	// 	let result_zhengchu = false;
	// 	let build_arr_new = build_arr.slice();

	// 	function zhengchu_fn() {
	// 		let zhengchu_cheng = build_arr_new.indexOf("*");
	// 		let zhengchu_chu = build_arr_new.indexOf("/");
	// 		if (build_arr_new.length >= 3 && zhengchu_chu >= 0) {
	// 			if (zhengchu_cheng < zhengchu_chu && zhengchu_cheng >= 0) {
	// 				build_arr_new.splice(zhengchu_cheng - 1, 3, parseFloat(build_arr_new[zhengchu_cheng - 1]) * parseFloat(build_arr_new[zhengchu_cheng + 1]));
	// 				zhengchu_fn();
	// 			} else {
	// 				if (parseFloat(build_arr_new[zhengchu_chu - 1]) % parseFloat(build_arr_new[zhengchu_chu + 1]) == 0) {
	// 					build_arr_new.splice(zhengchu_chu - 1, 3, parseFloat(build_arr_new[zhengchu_chu - 1]) / parseFloat(build_arr_new[zhengchu_chu + 1]));
	// 					zhengchu_fn();
	// 				} else {
	// 					result_zhengchu = false;
	// 					return

	// 				}
	// 			}
	// 		} else {
	// 			result_zhengchu = true;
	// 			return
	// 		}
	// 	}
	// 	zhengchu_fn();
	// 	return result_zhengchu
	// }

}


function do_build_arr(build_obj) {
	let build_arr = [];
	build_arr.push(do_build_canshu(build_obj.canshu[0]));
	for (let index = 0; index < build_obj.yunsuanfu.length; index++) {
		let yunsuanfu_str = do_build_yunsuanfu(build_obj.yunsuanfu[index]);
		let canshu_str = do_build_canshu(build_obj.canshu[index + 1]);
		build_arr.push(yunsuanfu_str);
		if (canshu_str == "num_del") {
			build_arr.pop();
		} else {
			build_arr.push(canshu_str);
			//build_arr.pop();
		}
	}
	//此处可添加其他算式设置，设置的函数必须有返回值，这个返回值传递给build_arr
	build_arr = do_build_bra(build_arr);
	return build_arr
}

function do_build_bra(build_arr) {
	//获取是否执行添加括号操作
	let bra_checked = $("#co_add_bra_input input").eq(0).prop("checked");
	//console.log(bra_checked);
	let s_build_arr = build_arr.slice();
	//let bra_checked=true;
	let num_num_sum = 0;
	const reg = /\d/;
	//验证数字个数
	for (let index = 0; index < build_arr.length; index++) {
		if (reg.test(build_arr[index])) {
			num_num_sum++;
		}
		if (index + 1 == build_arr.length && num_num_sum < 3) {
			//alert("参数太少")
			return s_build_arr;
		}
	}
	if (bra_checked) {


		let index_test = 0;
		let index_frist = 0;
		let index_end = 50;

		while (index_test < 1) {
			let len_radom_head = Math.floor(Math.random() * build_arr.length);
			let len_radom_foot = len_radom_head + 1 + Math.floor(Math.random() * (build_arr.length - len_radom_head - 1));

			if (reg.test(build_arr[len_radom_head]) && reg.test(build_arr[len_radom_foot])) {
				build_arr.splice(len_radom_head, 0, "(");
				build_arr.splice(len_radom_foot + 2, 0, ")");
				let x = eval(build_arr.join("")).toFixed(11);
				let y = eval(s_build_arr.join("")).toFixed(11);
				if (x != y && !isNaN(x) && !isNaN(y)) {
					
					return build_arr
				} else {
					build_arr = s_build_arr.slice();
					index_frist++
					if (index_frist >= index_end) {
						return s_build_arr
					}
				}
			}
		}

	} else {
		return s_build_arr
	}
}

function do_build_obj() {
	let build_obj = {};
	build_obj.canshu = do_build_check_canshu();
	build_obj.yunsuanfu = do_build_check_yunsuanfu();
	return build_obj
}
//用来生成参数
// num_min最小值
// num_max最大值
// num_float保留小数位数
// num_random出现概率
function do_build_canshu(num) {
	let num_min = num[0];
	let num_max = num[1];
	let num_float = num[2];
	let num_random = num[3];
	let num_result;
	num_min = parseFloat(num_min.toFixed(num_float));
	num_max = parseFloat(num_max.toFixed(num_float));
	if (num_random > 100) {
		num_random == 100;
	} else if (num_random < 0) {
		num_random = 0;
	}
	let num_make = Math.random() * 100;
	if (num_make >= 0 && num_make <= num_random) {
		num_result = parseFloat(num_min + Math.random() * (num_max - num_min)).toFixed(num_float);
		num_result=num_result+"";
		if (parseFloat(num_result) < 0) {
			num_result = "(" + num_result + ")"
		}
	} else {
		num_result = "num_del";

	}
	return num_result;
}
//用来生成运算符
function do_build_yunsuanfu(fu_arr) {
	let fu_result = fu_arr[Math.floor(Math.random() * fu_arr.length)]
	return fu_result;
}
//用来验证并初始化数字
function do_build_check_canshu() {
	let canshu_arr = [];
	let canshu = $(".co_canshu");
	for (let index = 0; index < canshu.length; index++) {

		let canshu_input = canshu.eq(index).children("input");
		let canshu_min = parseFloat(canshu_input[0].value);
		let canshu_max = parseFloat(canshu_input[1].value);
		let canshu_float = 0;
		let canshu_random = 0;
		let real_index = index + 1;
		if (!canshu_min && canshu_min != 0) {
			alert("数字" + real_index + "中在最小值上存在错误，请检查！");
			return;
		} else if (!canshu_max && canshu_max != 0) {
			alert("数字" + real_index + "中在最大值上存在错误，请检查！");
			return;
		} else if (canshu_min > canshu_max) {
			alert("数字" + real_index + "中最小值大于最大值，请检查！");
			return;
		} else {
			if (canshu_input[2] == undefined || !parseInt(canshu_input[2].value)) {
				canshu_float = 0;
			} else {
				canshu_float = parseInt(canshu_input[2].value)
			}
			if (canshu_input[3] == undefined || canshu_input[3].value.trim() == '') {
				canshu_random = 100;
			} else {
				canshu_random = parseInt(canshu_input[3].value);
			}
		}
		canshu_arr.push([canshu_min, canshu_max, canshu_float, canshu_random]);

	}
	return canshu_arr
}
//用来验证并初始化运算符
function do_build_check_yunsuanfu() {
	let yunsuanfu_all_arr = [];
	let yunsuanfu = $(".co_yunsuanfu");
	for (let index = 0; index < yunsuanfu.length; index++) {

		let yunsuanfu_input = yunsuanfu.eq(index).find("input")
		let yuansuanfu_jia = yunsuanfu_input.eq(0).prop("checked");
		let yuansuanfu_jian = yunsuanfu_input.eq(1).prop("checked");
		let yuansuanfu_cheng = yunsuanfu_input.eq(2).prop("checked");
		let yuansuanfu_chu = yunsuanfu_input.eq(3).prop("checked");
		let yuansuanfu_arr = [];
		if (index < yunsuanfu.length) {
			if (yuansuanfu_jia || yuansuanfu_jian || yuansuanfu_cheng || yuansuanfu_chu) {
				if (yuansuanfu_jia) {
					yuansuanfu_arr.push('+');
				}
				if (yuansuanfu_jian) {
					yuansuanfu_arr.push('-');
				}
				if (yuansuanfu_cheng) {
					yuansuanfu_arr.push('*');
				}
				if (yuansuanfu_chu) {
					yuansuanfu_arr.push('/');
				}
				yunsuanfu_all_arr.push(yuansuanfu_arr);
			} else {
				alert("请至少选择一个运算符")
				return;
			}

		}
	}
	return yunsuanfu_all_arr
}




function do_get_canshu() {
	let a = $(".co_canshu").eq(0).children("input")[0].value;
	let b = $(".co_yunsuanfu").eq(0).find("input")[0].checked;
	// console.log($(".co_canshu").eq(0).children("input")[1].value);
	console.log(parseFloat(a));
	console.log(b);
	let x = "1+2*3";
	console.log(eval(x))
}

function do_add_canshu() {
	let canshu = $(".co_canshu").length + 1;
	add_yunsuanfu = '<div class="col-xs-12 co_label"><label>运算符（至少选择一个）</label></div><div class="col-xs-12 co_block co_yunsuanfu"><label class="checkbox-inline"><input type="checkbox" name="fuhao" value="jia">加法（+）</label><label class="checkbox-inline"><input type="checkbox" name="fuhao" value="jian">减法（-）</label><label class="checkbox-inline"><input type="checkbox" name="fuhao" value="cheng">乘法（×）</label><label class="checkbox-inline"><input type="checkbox" name="fuhao" value="chu">除法(÷)</label></div>';
	add_canshu = '<div class="col-xs-12 co_label"><label>第' + canshu + '个数字</label></div><div class="col-xs-12 co_block co_canshu "><input class="form-control" type="text" name="nr1" placeholder="最小值（必填）"><br><input class="form-control" type="text" name="nr1" placeholder="最大值（必填）"><br><input class="form-control" type="text" name="nr1" placeholder="保留几位小数"><br><input class="form-control" type="text" name="nr1" placeholder="当前参数出现的概率,默认为0,请填入0~100之间的数"></div>';
	$("#co_body_in").append(add_yunsuanfu + add_canshu);
	canshu++
}

function do_del_canshu() {
	let del_canshu = $("#co_body_in");
	if (del_canshu.children("div").length > 6) {
		for (let index = 0; index < 4; index++) {
			del_canshu.children("div:last-child").remove();
		}
	} else {
		alert("不能继续删除了！")
	}
}









function do_print() {
	let show_str = $("body").html();
	let table_show_str = $("#table_show").html();
	let all_input = $("input");
	let input_arr_value = [];
	let input_arr_checked = [];
	for (let index = 0; index < all_input.length; index++) {
		input_arr_value.push(all_input.eq(index).prop("value"));
		input_arr_checked.push(all_input.eq(index).prop("checked"));
	}

	$("body").html(table_show_str);
	window.print();
	setTimeout(function () {
		$("body").html(show_str);
		init();
		let input_now = $("input");
		for (let j = 0; j < input_now.length; j++) {
			input_now.eq(j).attr("value", input_arr_value[j]);
			input_now.eq(j).attr("checked", input_arr_checked[j]);
		}

	}, 100)
}

function do_copy() {
	let input_show = document.createElement('textarea');
	for (let index = 0; index < global_result_arr.length; index++) {
		input_show.value += global_result_arr[index].join(" ") + " =" + '\n';

	}
	document.body.appendChild(input_show);

	input_show.select();
	document.execCommand("copy");
	input_show.style.display = 'none';
	alert("复制成功")
	input_show.parentNode.removeChild(input_show);

}