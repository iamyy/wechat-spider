const Spider = require('./spider.js');

const s = new Spider({
		biz: 'MjM5MDAzNDcwMA==',
		uin: 'MTk3ODA4Mzk0MA==',
		key: '79512945a1fcb0e23650c1e6eec41ea5f4028c1607db8bbb074bb744ac702ad548454ae0c92192791f6693caac3062085b87e3ed8a4eb41c',
		startDate: '2016-09-20'
});

s.run();