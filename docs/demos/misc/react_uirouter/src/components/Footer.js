import React from 'react';
import {Link,IndexLink} from 'react-router'


const List = () =>{
	const aFooterItem =  [{
	    itemName: "首页",
	    srefLink: "home",
	    iconName: "icon-shouye"
	}, {
	    itemName: "分类",
	    srefLink: "category",
	    iconName: "icon-iconfenlei"
	}, {
	    itemName: "用户中心",
	    srefLink: "usercenter",
	    iconName: "icon-gerenzhongxin"
	}, {
	    itemName: "发布",
	    srefLink: "post",
	    iconName: "icon-fabu"
	}];

	let aLists = [];
	aFooterItem.forEach((key,index)=>{
		// console.log(key,index)
		let classs = "icon iconfont "+ key.iconName;
		if(key.srefLink === 'home'){
			// console.log(classs)
			aLists.push(<li key={key.srefLink}>
				<IndexLink  to="/" >
					<i className={classs}></i>
					<span>{key.itemName}</span>
				</IndexLink>
			</li>)
		}else{
			aLists.push(<li key={key.srefLink}>
				<Link to={key.srefLink} >
					<i className={classs}></i>
					<span>{key.itemName}</span>
				</Link>
			</li>)
		}
	})
	return <ul>{aLists}</ul>
}
export default props=> (
	<footer>
		<List />
	</footer>
);