import React, { Component } from "react";
import moment from "moment";
import _ from "lodash";

import Timeline from "./timeline";
import {
	customItemRenderer,
	customGroupRenderer,
} from "./demo/customRenderers";

import {
	Layout,
	Form,
	InputNumber,
	Button,
	DatePicker,
	Checkbox,
	Switch,
} from "antd";
import "antd/dist/antd.css";
import "./style.css";

const { TIMELINE_MODES } = Timeline;

const ITEM_DURATIONS = [
	moment.duration(6, "hours"),
	moment.duration(12, "hours"),
	moment.duration(18, "hours"),
];

const COLORS = [
	"#0099cc",
	"#f03a36",
	"#06ad96",
	"#fce05b",
	"#dd5900",
	"#cc6699",
];

// Moment timezones can be enabled using the following
// import moment from 'moment-timezone';
// moment.locale('en-au');
// moment.tz.setDefault('Australia/Perth');

export default class DemoTimeline extends Component {
	constructor(props) {
		super(props);

		const startDate = moment("2020-03-01");
		//const endDate = startDate.clone().add(4, 'days');
		const endDate = moment("2020-03-02");
		this.state = {
			selectedItems: [],
			rows: 100,
			items_per_row: 30,
			snap: 60,
			startDate,
			endDate,
			message: "",
			timelineMode:
				TIMELINE_MODES.SELECT |
				TIMELINE_MODES.DRAG |
				TIMELINE_MODES.RESIZE,
		};
		this.reRender = this.reRender.bind(this);
		this.zoomIn = this.zoomIn.bind(this);
		this.zoomOut = this.zoomOut.bind(this);
		this.toggleCustomRenderers = this.toggleCustomRenderers.bind(this);
		this.toggleSelectable = this.toggleSelectable.bind(this);
		this.toggleDraggable = this.toggleDraggable.bind(this);
		this.toggleResizable = this.toggleResizable.bind(this);
	}

	componentWillMount() {
		this.reRender();
	}

	reRender() {
		const list = [];
		const groups = [];
		const { snap } = this.state;

		this.key = 0;
		for (let i = 0; i < this.state.rows; i++) {
			groups.push({ id: i, title: `Row ${i}` });
			for (let j = 0; j < this.state.items_per_row; j++) {
				this.key += 1;
				const color = COLORS[(i + j) % COLORS.length];
				const duration =
					ITEM_DURATIONS[
						Math.floor(Math.random() * ITEM_DURATIONS.length)
					];
				// let start = last_moment;
				let start = moment(
					Math.random() *
						(this.state.endDate.valueOf() -
							this.state.startDate.valueOf()) +
						this.state.startDate.valueOf()
				);
				let end = start.clone().add(duration);

				// Round to the nearest snap distance
				const roundedStartMinutes =
					Math.floor(start.minute() / snap) * snap;
				const roundedEndMinutes =
					Math.floor(end.minute() / snap) * snap;
				start.minute(roundedStartMinutes).second(0);
				end.minute(roundedEndMinutes).second(0);

				list.push({
					key: this.key,
					title: duration.humanize(),
					color,
					row: i,
					start,
					end,
				});
			}
		}

		// groups.push({ id: 0, title: "Usama Ahmed" });

		// list.push({
		// 	key: 0,
		// 	title: "Novo Nordisk",
		// 	color: "Green",
		// 	row: 0,
		// 	start: moment("2020-03-01 10:00:00"),
		// 	end: moment("2020-03-01 11:00:00"),
		// });
		// list.push({
		// 	key: 0,
		// 	title: "Novo Nordisk",
		// 	color: "Green",
		// 	row: 0,
		// 	start: moment("2020-03-01 10:00:00"),
		// 	end: moment("2020-03-01 12:00:00"),
		// });

		// this.state = {selectedItems: [11, 12], groups, items: list};
		this.forceUpdate();
		this.setState({ items: list, groups });
	}

	handleRowClick = (e, rowNumber, clickedTime, snappedClickedTime) => {
		const message = `Row Click row=${rowNumber} @ time/snapped=${clickedTime.toString()}/${snappedClickedTime.toString()}`;
		this.setState({ selectedItems: [], message });
	};
	zoomIn() {
		let currentMins = this.state.endDate.diff(
			this.state.startDate,
			"minutes"
		);
		let newMins = currentMins / 2;
		this.setState({
			endDate: this.state.startDate.clone().add(newMins, "minutes"),
		});
	}
	zoomOut() {
		let currentMins = this.state.endDate.diff(
			this.state.startDate,
			"minutes"
		);
		let newMins = currentMins * 2;
		this.setState({
			endDate: this.state.startDate.clone().add(newMins, "minutes"),
		});
	}

	toggleCustomRenderers(checked) {
		this.setState({ useCustomRenderers: checked });
	}

	toggleSelectable() {
		const { timelineMode } = this.state;
		let newMode = timelineMode ^ TIMELINE_MODES.SELECT;
		this.setState({
			timelineMode: newMode,
			message: "Timeline mode change: " + timelineMode + " -> " + newMode,
		});
	}
	toggleDraggable() {
		const { timelineMode } = this.state;
		let newMode = timelineMode ^ TIMELINE_MODES.DRAG;
		this.setState({
			timelineMode: newMode,
			message: "Timeline mode change: " + timelineMode + " -> " + newMode,
		});
	}
	toggleResizable() {
		const { timelineMode } = this.state;
		let newMode = timelineMode ^ TIMELINE_MODES.RESIZE;
		this.setState({
			timelineMode: newMode,
			message: "Timeline mode change: " + timelineMode + " -> " + newMode,
		});
	}
	handleItemClick = (e, key) => {
		const message = `Item Click ${key}`;
		const { selectedItems } = this.state;

		let newSelection = selectedItems.slice();

		// If the item is already selected, then unselected
		const idx = selectedItems.indexOf(key);
		if (idx > -1) {
			// Splice modifies in place and returns removed elements
			newSelection.splice(idx, 1);
		} else {
			newSelection.push(Number(key));
		}

		this.setState({ selectedItems: newSelection, message });
	};

	handleItemDoubleClick = (e, key) => {
		const message = `Item Double Click ${key}`;
		this.setState({ message });
	};

	handleItemContextClick = (e, key) => {
		const message = `Item Context ${key}`;
		this.setState({ message });
	};

	handleRowDoubleClick = (e, rowNumber, clickedTime, snappedClickedTime) => {
		const message = `Row Double Click row=${rowNumber} time/snapped=${clickedTime.toString()}/${snappedClickedTime.toString()}`;

		const randomIndex = Math.floor(
			Math.random() * Math.floor(ITEM_DURATIONS.length)
		);

		let start = snappedClickedTime.clone();
		let end = snappedClickedTime.clone().add(ITEM_DURATIONS[randomIndex]);
		this.key++;

		const item = {
			key: this.key++,
			title: "New item",
			color: "yellow",
			row: rowNumber,
			start: start,
			end: end,
		};

		const newItems = _.clone(this.state.items);
		newItems.push(item);

		this.setState({ items: newItems, message });
	};

	handleRowContextClick = (e, rowNumber, clickedTime, snappedClickedTime) => {
		const message = `Row Click row=${rowNumber} @ time/snapped=${clickedTime.toString()}/${snappedClickedTime.toString()}`;
		this.setState({ message });
	};

	handleInteraction = (type, changes, items) => {
		/**
		 * this is to appease the codefactor gods,
		 * whose wrath condemns those who dare
		 * repeat code beyond the sacred 5 lines...
		 */
		function absorbChange(itemList, selectedItems) {
			itemList.forEach((item) => {
				let i = selectedItems.find((i) => {
					return i.key === item.key;
				});
				if (i) {
					item = i;
					item.title = moment
						.duration(item.end.diff(item.start))
						.humanize();
				}
			});
		}

		switch (type) {
			case Timeline.changeTypes.dragStart: {
				return this.state.selectedItems;
			}
			case Timeline.changeTypes.dragEnd: {
				const newItems = _.clone(this.state.items);

				absorbChange(newItems, items);
				this.setState({ items: newItems });
				break;
			}
			case Timeline.changeTypes.resizeStart: {
				return this.state.selectedItems;
			}
			case Timeline.changeTypes.resizeEnd: {
				const newItems = _.clone(this.state.items);

				// Fold the changes into the item list
				absorbChange(newItems, items);

				this.setState({ items: newItems });
				break;
			}
			case Timeline.changeTypes.itemsSelected: {
				this.setState({ selectedItems: _.map(changes, "key") });
				break;
			}
			default:
				return changes;
		}
	};

	render() {
		const {
			selectedItems,
			rows,
			items_per_row,
			snap,
			startDate,
			endDate,
			items,
			groups,
			message,
			useCustomRenderers,
			timelineMode,
		} = this.state;
		const rangeValue = [startDate, endDate];

		const selectable =
			(TIMELINE_MODES.SELECT & timelineMode) === TIMELINE_MODES.SELECT;
		const draggable =
			(TIMELINE_MODES.DRAG & timelineMode) === TIMELINE_MODES.DRAG;
		const resizeable =
			(TIMELINE_MODES.RESIZE & timelineMode) === TIMELINE_MODES.RESIZE;

		const rowLayers = [];
		for (let i = 0; i < rows; i += 1) {
			if (i % 5 === 0 && i !== 0) {
				continue;
			}
			let curDate = startDate.clone();
			while (curDate.isSameOrBefore(endDate)) {
				const dayOfWeek = Number(curDate.format("d")); // 0 -> 6: Sun -> Sat
				let bandDuration = 0; // days
				let color = "";
				if (dayOfWeek % 6 === 0) {
					color = "blue";
					bandDuration = dayOfWeek === 6 ? 2 : 1; // 2 if sat, 1 if sun
				} else {
					color = "green";
					bandDuration = 6 - dayOfWeek;
				}

				rowLayers.push({
					start: curDate.clone(),
					end: curDate.clone().add(bandDuration, "days"),
					style: { backgroundColor: color, opacity: "0.3" },
					rowNumber: i,
				});
				curDate.add(bandDuration, "days");
			}
		}

		return (
			<Layout className="layout">
				<Layout.Content>
					<div style={{ margin: 24 }}>
						<Form layout="inline">
							<Form.Item label="No rows">
								<InputNumber
									value={rows}
									onChange={(e) => this.setState({ rows: e })}
								/>
							</Form.Item>
							<Form.Item label="No items per row">
								<InputNumber
									value={items_per_row}
									onChange={(e) =>
										this.setState({ items_per_row: e })
									}
								/>
							</Form.Item>
							<Form.Item label="Snap (mins)">
								<InputNumber
									value={snap}
									onChange={(e) => this.setState({ snap: e })}
								/>
							</Form.Item>
							<Form.Item label="Date Range">
								<DatePicker.RangePicker
									allowClear={false}
									value={rangeValue}
									showTime
									onChange={(e) => {
										this.setState(
											{ startDate: e[0], endDate: e[1] },
											() => this.reRender()
										);
									}}
								/>
							</Form.Item>
							<Form.Item>
								<Button
									type="primary"
									onClick={() => this.reRender()}
								>
									Regenerate
								</Button>
							</Form.Item>
							<Form.Item>
								<Button onClick={this.zoomIn}>Zoom in</Button>
							</Form.Item>
							<Form.Item>
								<Button onClick={this.zoomOut}>Zoom out</Button>
							</Form.Item>
							<Form.Item label="Custom Renderers">
								<Switch onChange={this.toggleCustomRenderers} />
							</Form.Item>
							<Form.Item>
								<Checkbox
									onChange={this.toggleSelectable}
									checked={selectable}
								>
									Enable selecting
								</Checkbox>
							</Form.Item>
							<Form.Item>
								<Checkbox
									onChange={this.toggleDraggable}
									checked={draggable}
								>
									Enable dragging
								</Checkbox>
							</Form.Item>
							<Form.Item>
								<Checkbox
									onChange={this.toggleResizable}
									checked={resizeable}
								>
									Enable resizing
								</Checkbox>
							</Form.Item>
						</Form>
						<div>
							<span>Debug: </span>
							{message}
						</div>
					</div>
					<Timeline
						shallowUpdateCheck
						items={items}
						groups={groups}
						startDate={startDate}
						endDate={endDate}
						rowLayers={rowLayers}
						selectedItems={selectedItems}
						timelineMode={timelineMode}
						snapMinutes={snap}
						onItemClick={this.handleItemClick}
						onItemDoubleClick={this.handleItemDoubleClick}
						onItemContextClick={this.handleItemContextClick}
						onInteraction={this.handleInteraction}
						onRowClick={this.handleRowClick}
						onRowContextClick={this.handleRowContextClick}
						onRowDoubleClick={this.handleRowDoubleClick}
						itemRenderer={
							useCustomRenderers ? customItemRenderer : undefined
						}
						groupRenderer={
							useCustomRenderers ? customGroupRenderer : undefined
						}
						groupTitleRenderer={
							useCustomRenderers
								? () => <div>Group title</div>
								: undefined
						}
					/>
				</Layout.Content>
			</Layout>
		);
	}
}
