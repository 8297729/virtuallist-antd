import { Button, Skeleton, Table } from "@hose/eui";
import React, {
	useMemo,
	useState,
	useRef,
	useEffect,
	useCallback,
} from "react";
import { VList } from "../../src/index";

// import "antd/dist/antd.css";
import "@hose/eui-theme/dist/eui-style.css";

const generateData = () => {
	const temp = [];

	for (let i = 0; i < 300; i += 1) {
		temp.push({
			a: i,
			b: "233",
			c: null,
		});
	}

	return temp;
};

// const initData = generateData()

function AsyncTable() {
	const [data, setData] = useState(generateData());

	const refreshFlag = useRef(false);

	const handleClick = (record, e) => {
		e.preventDefault();
	};

	const lastListRenderInfo = useRef({ start: -1, renderLen: -1 });

	// 防抖函数
	// const useDebounce = (fn, delay) => {
	//     const { current } = useRef({ fn, timer: null })
	//     useEffect(() => {
	//         current.fn = fn
	//     }, [fn])

	//     return useCallback(function f(...args) {
	//         if (current.timer) {
	//             clearTimeout(current.timer)
	//         }
	//         current.timer = setTimeout(() => {
	//             current.fn.call(this, ...args)
	//         }, delay)
	//     }, [])
	// }

	const onListRender = useCallback((listInfo) => {
		const { start, renderLen } = listInfo;

		const lastInfo = lastListRenderInfo?.current;

		if (
			start !== lastInfo?.start ||
			renderLen !== lastInfo?.renderLen ||
			refreshFlag.current === true
		) {
			lastListRenderInfo.current = { start, renderLen };
			setData((pre) => {
				const currentData = pre.slice(start, start + renderLen);

				currentData.forEach((item, index) => {
					item.c = `asyncData${start + index + 1}`;
				});

				const newData = JSON.parse(JSON.stringify(pre));

				return newData;
			});

			refreshFlag.current = false;
		}

		// const currentData = data.slice(start, start + renderLen)
		// currentData.forEach((item, index) => {
		//     item.c = `asyncData${start + index + 1}`
		// })
		// const newData = JSON.parse(JSON.stringify(data))
		// setData(newData)
	}, []);

	const columns = [
		{
			title: "title1",
			dataIndex: "a",
			key: "a",
			width: 150,
		},
		{
			title: "title2",
			dataIndex: "b",
			key: "b",
			width: 200,
		},
		{
			title: "title3",
			dataIndex: "c",
			key: "c",
			width: 200,
			render: (t) => t || <Skeleton active paragraph={{ rows: 0 }} />,
		},
		{
			title: "Operations",
			dataIndex: "",
			width: 200,
			key: "x",
			render: (text, record) => (
				<a href="#" onClick={(e) => handleClick(record, e)}>
					click {record.a}
				</a>
			),
		},
	];

	const handleSearchBtnClick = useCallback(() => {
		setData(generateData());
		refreshFlag.current = true;
	}, []);

	const vComponent = useMemo(
		() =>
			VList({
				height: 500,
				vid: "asyncTable",
				resetTopWhenDataChange: false,
				onListRender,
			}),
		[onListRender],
	);

	return (
		<div>
			<Button onClick={handleSearchBtnClick}>点我搜索</Button>
			<h2>async table</h2>
			<Table
				columns={columns}
				dataSource={data}
				rowKey={(record) => record.a}
				pagination={false}
				size="small"
				scroll={{ y: 500, x: "100%" }}
				components={vComponent}
			/>
		</div>
	);
}

export default AsyncTable;
