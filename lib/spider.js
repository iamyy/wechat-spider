function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const request = require('request');
const fs = require('fs');
const headers = require('./headers.js');

const baseUrl = 'https://mp.weixin.qq.com/mp/getmasssendmsg';

class Spider {
	constructor(options) {
		this.options = options;
		this.count = 0;
	}
	getArticleList(url, headers) {
		return new Promise((resolve, reject) => {
			request({ url, headers }, (error, response, body) => {
				if (error) {
					return reject(error);
				}
				resolve(body);
			});
		});
	}
	_compileUrl(fromid) {
		return fromid ? `${ baseUrl }?__biz=${ this.options.biz }&uin=${ this.options.uin }&key=${ this.options.key }&frommsgid=${ fromid }&f=json` : `${ baseUrl }?__biz=${ this.options.biz }&uin=${ this.options.uin }&key=${ this.options.key }&f=json`;
	}
	_compileHeaders() {
		return headers;
	}
	run(fromid) {
		var _this = this;

		return _asyncToGenerator(function* () {
			let articleList = yield _this.getArticleList(_this._compileUrl(fromid), _this._compileHeaders());
			articleList = JSON.parse(JSON.parse(articleList).general_msg_list).list;
			let lc = 0;
			articleList.forEach(function (a, i, arr) {
				if (a.app_msg_ext_info) {
					let obj = {
						id: a.comm_msg_info.id,
						title: a.app_msg_ext_info.title,
						desc: a.app_msg_ext_info.digest,
						url: a.app_msg_ext_info.content_url,
						cover: a.app_msg_ext_info.cover
					};
					lc++;
					console.log(++_this.count, obj.title);
					fs.writeFileSync(`./output/${ obj.id }.json`, JSON.stringify(obj));

					if (a.app_msg_ext_info.multi_app_msg_item_list) {
						a.app_msg_ext_info.multi_app_msg_item_list.forEach(function (item, j) {
							let obj_1 = {
								id: item.fileid,
								title: item.title,
								desc: item.digest,
								url: item.content_url,
								cover: item.cover
							};
							console.log(++_this.count, obj_1.title);
							fs.writeFileSync(`./output/${ obj_1.id }.json`, JSON.stringify(obj_1));
						});
					}
				}
			});
			articleList[lc - 1] && _this.run(articleList[articleList.length - 1].comm_msg_info.id);
		})();
	}
}

module.exports = Spider;