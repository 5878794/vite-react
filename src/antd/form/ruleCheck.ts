import device from '@/lib/device.ts'

//form表单验证
function isEmpty(value:any) {
	if (value === 0) {
		return false;
	} else {
		return !value
	}
}


const inputRule: any = {
	require: (val: any) => {
		if (isEmpty(val)) {
			return {
				pass: false,
				msg: '不能为空！'
			}
		}
		const reg = /\S/;
		return {
			pass: reg.test(val),
			msg: '不能为空！'
		}
	},
	range: (val: any, rule: any) => {
		const [min, max] = rule ? rule.split('-') : [];

		return {
			pass: !!(val >= parseFloat(min) && val <= parseFloat(max)),
			msg: `数字必须在${min}-${max}之间！`
		}
	},
	// priceRange: (val: any, rule: any) => {
	// 	//建龙的price 输出改成咯分。。。。
	// 	//传入的val 单位是分
	// 	//传入的rule 单位是元
	// 	const [min, max] = rule ? rule.split('-') : [];
	// 	val = val / 100;
	//
	// 	return {
	// 		pass: !!(val >= parseFloat(min) && val <= parseFloat(max)),
	// 		msg: `金额必须在${min}-${max}之间！`
	// 	}
	// },
	lengthCn: (val: any, rule: any) => {
		const [min, max] = rule ? rule.split('-') : [];
		const l = device.getStringLength(val);

		return {
			pass: !!(l >= parseFloat(min) && l <= parseFloat(max)),
			msg: min == max ? `输入字符长度必须是${min}个字符！中文算2个字符` : `输入字符长度必须在${min}-${max}之间！中文算2个字符`
		}
	},
	length: (val: any, rule: any) => {
		const [min, max] = rule ? rule.split('-') : [];
		const l = val.length;

		return {
			pass: !!(l >= parseFloat(min) && l <= parseFloat(max)),
			msg: min == max ? `输入字符长度必须是${min}个字符！` : `输入字符长度必须在${min}-${max}之间！`
		}
	},
	phone: (val: any) => {
		let reg = /^1\d{10}$/;
		return {
			pass: reg.test(val),
			msg: '请输入正确的11位手机号'
		}
	},
	equal: (val: any, otherVal: any, otherLabel: string) => {
		return {
			pass: val == otherVal,
			msg: `与${otherLabel}的值不同`
		}
	},
	max: (val: any, rule: any, otherLabel: string) => {
		return {
			pass: parseFloat(val) >= parseFloat(rule),
			msg: `必须 >= ${otherLabel||rule}`
		}
	},
	min: (val: any, rule: any, otherLabel: string) => {
		return {
			pass: parseFloat(val) <= parseFloat(rule),
			msg: `必须 <= ${otherLabel||rule}`
		}
	},
	price: (val: any) => {
		let reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
		return {
			pass: reg.test(val),
			msg: '请输入正确的价格,只能保留2位小数'
		}
	},
	//身份证
	idCard: (cid: any) => {
		if (cid.length == 0) {
			return {
				pass: true
			};
		}

		const arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];//加权因子
		const arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];//校验码
		if (/^\d{17}\d|x$/i.test(cid)) {
			let sum = 0, idx;
			for (let i = 0; i < cid.length - 1; i++) {
				// 对前17位数字与权值乘积求和
				sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];
			}
			// 计算模（固定算法）
			idx = sum % 11;
			// 检验第18为是否与校验码相等
			return {
				pass: arrValid[idx] == cid.substr(17, 1).toUpperCase(),
				msg: '身份证格式不正确'
			}
		} else {
			return {
				pass: false,
				msg: '身份证格式不正确'
			}
		}
	},
	//字符串，数字和下划线
	str: function (str: any) {
		if (str.length == 0) {
			return {pass:true};
		}

		let reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/;
		return {
			pass: reg.test(str),
			msg: '不能输入特殊符号'
		}
	},
	//2个日期在6个月之内 (php 时间戳10位)
    // month6:(str:any)=>{
	// 	console.log('check-=--',str)
	// 	if(device.isEmpty(str) || str == 'NaN'){
	// 		return {pass:true}
	// 	}
	// 	const temp = str.split(',');
	// 	const date1 = temp[0]*1000;
	// 	const date2 = temp[1]*1000;
	//
	//     const d1 = new Date(date1);
	//     const d2 = new Date(date2);
	//
	//     // 获取年份和月份的差异
	//     const yearDiff = d2.getFullYear() - d1.getFullYear();
	//     const monthDiff = d2.getMonth() - d1.getMonth();
	//
	//     // 计算总的月份差异
	//     let totalMonthsDiff = yearDiff * 12 + monthDiff;
	//
	//     // 考虑到日期差异
	//     if (d2.getDate() < d1.getDate()) {
	// 	    totalMonthsDiff--;
	//     }
	//
	// 	return {
	// 		pass:totalMonthsDiff <= 6,
	// 		msg:'只能选择半年内的日期'
	// 	}
    // }
}

//验证规则 , 分割
//  require 		 是否必填
//	range:10-20      输入值的范围
//	lengthCn:10-20   输入字符长度（正文2个字符）
//	length:10-20     输入字符长度（正文1个字符）
//  equal:@key.key	 检查2个key的值是否相等
//  max:@key.key     必须大于另一个字段
//  max:100		     必须大于100
//  min:@key.key     必须小于另一个字段
//  min:100			 必须小于100
//	price			 必须输入价格的格式
//	idCard			 必须输入身份证
//	str				 只能输入中文、数字、英文


export default function (ruleString: string, val: any, errMsg: string, form: any) {
	const rules = ruleString ? ruleString.split(',') : [];
	let result = {
		pass: true,
		msg: ''
	}

	rules.map((rule: string) => {
		if (result.pass) {
			const temp = rule ? rule.split(':') : [];
			const thisRule = temp[0];
			let thisRuleVal = temp[1];
			let otherLabel = '';

			//找到关联的name的值
			if (thisRuleVal && thisRuleVal.indexOf('@') == 0) {
				const otherKey = thisRuleVal.substring(1);
				const otherObj = form.find(otherKey);
				thisRuleVal = otherObj.showVal2Val(otherObj.state.showVal);
				otherLabel = form.find(otherKey).props.label;
			}


			if (inputRule[thisRule]) {
				//为空
				if (!val && thisRule != 'require') {

				} else {
					const rs = inputRule[thisRule](val, thisRuleVal, otherLabel);

					if (!rs.pass) {
						result.pass = false;
						result.msg = rs.msg;
					}
				}
			} else {
				console.warn('未找到验证方法: ' + thisRule)
			}
		}
	})

	result.msg = errMsg || result.msg;

	return result;
}
