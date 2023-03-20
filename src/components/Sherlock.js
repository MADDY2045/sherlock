import React, { memo } from 'react';
import { ReactGrid, Column, Row } from '@silevis/reactgrid';
import '@silevis/reactgrid/styles.css';
import {
	CellTemplate,
	Cell,
	Compatible,
	Uncertain,
	UncertainCompatible,
	isNavigationKey,
	getCellProperty,
	isAlphaNumericKey,
	keyCodes
} from '@silevis/reactgrid';
//import { FlagCellTemplate } from '../customCell/customCell';

const getPeople = () => [
	{
		checked: false,
		name: 'Susie',
		surname: 'Quattro'
	},
	{
		checked: false,
		name: 'Thomas',
		surname: 'Goldman'
	}
];

const getColumns = () => [
	{ columnId: 'checked', width: 10 },
	{ columnId: 'name', width: 150 },
	{ columnId: 'surname', width: 150 }
];

let headerRow = {
	rowId: 'header',
	cells: [
		{
			type: 'myText',
			isHeader: true,
			checked: Boolean(false),
			text: 'checked'
		},
		{
			type: 'myText',
			text: 'name',
			nonEditable: true,
			isHeader: true,
			isSorted: true
		},
		{
			type: 'myText',
			text: 'surname',
			nonEditable: true,
			isHeader: true,
			isSorted: false
		}
	]
};

const getRows = (people) => [
	headerRow,
	...people.map((person, idx) => {
		return {
			rowId: idx,
			cells: [
				{
					type: 'checkbox',
					checked: Boolean(person.checked),
					rowMapper: 'checked'
				},
				{
					type: 'myText',
					text: person.name,
					rowMapper: 'name'
				},
				{
					type: 'myText',
					text: person.surname,
					rowMapper: 'surname'
				}
			]
		};
	})
];

function Sherlock() {
	const [people, setPeople] = React.useState(getPeople());
	const [bufferPeople, setBufferPeople] = React.useState(getPeople());
	const [ascOrder, setAscOrder] = React.useState(false);
	let rows = getRows(people);
	const columns = getColumns();

	function filterByValue(array, string) {
		return array.filter((o) =>
			Object.keys(o).some(
				(k) =>
					k !== 'rowMapperColId' &&
					typeof o[k] === 'string' &&
					o[k].toLowerCase().includes(string.toLowerCase())
			)
		);
	}

	const handleFilter = (e) => {
		let resp = filterByValue(bufferPeople, e.target.value);
		setPeople([...resp]);
	};

	const makeAllChecked = () => {
		/* update header checkbox */
		let dataIndex = headerRow.cells.findIndex(
			(item) => item.text === 'checked'
		);
		if (dataIndex !== -1) {
			headerRow.cells[dataIndex] = {
				...headerRow.cells[dataIndex],
				checked: !headerRow.cells[dataIndex].checked
			};
		}

		/* update row level checkbox */
		let data = people.map((item) => {
			return { ...item, checked: headerRow.cells[dataIndex].checked };
		});
		setPeople([...data]);
	};

	function sortColumns(colId) {
		let data = people.sort((a, b) => {
			let x = !ascOrder ? b[colId].toLowerCase() : a[colId].toLowerCase();
			let y = !ascOrder ? a[colId].toLowerCase() : b[colId].toLowerCase();
			if (x < y) {
				return -1;
			}
			if (x > y) {
				return 1;
			}
			return 0;
		});

		let dataIndex = headerRow.cells.findIndex((item) => item.text == colId);

		if (dataIndex !== -1) {
			let prevSortValue = headerRow.cells[dataIndex].isSorted;
			headerRow.cells[dataIndex].isSorted = !prevSortValue;
		}
		setPeople([...data]);
		setAscOrder((prev) => !prev);
	}

	function getCheckBoxRow(cell) {
		if (cell.isHeader && cell.text === 'name') {
			return <input type={'checkbox'} />;
		}
		if (cell.rowMapper === 'name') {
			return <input type={'checkbox'} onClick={(e) => e.stopPropagation()} />;
		}
	}
	class FlagCellTemplate {
		getCompatibleCell(uncertainCell) {
			const text = getCellProperty(uncertainCell, 'text', 'string');
			const value = parseFloat(text);
			return { ...uncertainCell, text, value };
		}

		handleKeyDown(cell, keyCode, ctrl, shift, alt) {
			if (!ctrl && !alt && isAlphaNumericKey(keyCode))
				return { cell, enableEditMode: true };
			return {
				cell,
				enableEditMode:
					keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER
			};
		}

		update(cell, cellToMerge) {
			return this.getCompatibleCell({ ...cell, text: cellToMerge.text });
		}

		render(cell, isInEditMode, onCellChanged) {
			if (!isInEditMode) {
				return (
					<>
						{/* {getCheckBoxRow(cell)} */}
						{cell.text !== 'checked' && cell.text}
						{cell.isHeader && (
							<>
								{cell.text === 'checked' && (
									<input
										className="header-level-checkbox"
										type={'checkbox'}
										checked={cell.checked}
										onChange={makeAllChecked}
									/>
								)}
								{cell.text !== 'checked' && (
									<i
										data-col-id={cell.text}
										onClick={(e) => {
											sortColumns(e.target.getAttribute('data-col-id'));
										}}
										className={`fa ${
											cell.isSorted ? 'fa-sort-asc' : 'fa-sort-desc'
										}`}
										aria-hidden="true"
									></i>
								)}
							</>
						)}
					</>
				);
			}
			return (
				<input
					ref={(input) => {
						input && input.focus();
					}}
					defaultValue={cell.text}
					onChange={(e) =>
						onCellChanged(
							this.getCompatibleCell({ ...cell, text: e.currentTarget.value }),
							false
						)
					}
					onCopy={(e) => e.stopPropagation()}
					onCut={(e) => e.stopPropagation()}
					onPaste={(e) => e.stopPropagation()}
					onPointerDown={(e) => e.stopPropagation()}
					onKeyDown={(e) => {
						if (isAlphaNumericKey(e.keyCode) || isNavigationKey(e.keyCode))
							e.stopPropagation();
					}}
				/>
			);
		}
	}

	const applyChangesToPeople = (changes, prevPeople) => {
		changes.forEach((change) => {
			console.log('change::::', change);
			const personIndex = change.rowId;
			const fieldName = change.columnId;
			prevPeople[personIndex][fieldName] = change.newCell.text;
		});
		return [...prevPeople];
	};

	const handleChanges = (changes) => {
		setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople));
	};

	return (
		<div className="columns">
			<input onChange={handleFilter} type="text" />
			<ReactGrid
				rows={rows}
				columns={columns}
				enableColumnSelection
				onCellsChanged={handleChanges}
				//onFocusLocationChanged={(e) => console.log('e::::', e)}
				customCellTemplates={{ myText: new FlagCellTemplate() }}
			/>
		</div>
	);
}

export default memo(Sherlock);
