import A from './sub/a.js';
import B from './sub/b.js';
import C from './sub/c.js';
import D from './sub/d.js';

// list
// index 引用 C
// A 引用 B
// B 引用 A
// C 引用 A B
// D 引用 A B

const App = () => {
	C.start();

	// 5秒后停止
	setTimeout(() => {
		C.end();
	}, 5000);

	// 10秒后读取数据
	setTimeout(() => {
		D.readResult();
	}, 10000);
};

export default App;