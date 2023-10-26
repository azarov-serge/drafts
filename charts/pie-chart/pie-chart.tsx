import React from "react";
import { Stage, Layer, Text, Rect, Arc } from "react-konva";
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { Wrapper } from "./components/wrapper";
import { defaultTheme } from "./const";
import { Theme } from "./types";

export interface Prop {
	width: number;
	height: number;
	values: number[];
	withValues?: boolean;
	withTotal?: boolean;
	labels?: string[];
	withLegents?: boolean;
	colors?: string[];
}

const getValue = (value: string): number =>
	Number(value.replace(/[^-0-9]/gim, ""));

export const PieChart: React.FC<Prop> = (props) => {
	const theme = {
		...defaultTheme,
		...useTheme(),
	};

	const textGap = getValue(theme.font.lineHeight);
	const textSize = getValue(theme.font.size);
	const barColors = props.colors || theme.color.bars;

	const x = props.width / 2;
	const y = props.height / 2;

	const isHorizontal = x > y;

	let outerRadius = isHorizontal ? y : x;
	const innerRadius = 50;
	const minRadius = innerRadius + 20;

	let calcSize = 0;
	const size = isHorizontal ? props.width : props.height;
	if (props.labels && props.withLegents) {
		if (isHorizontal) {
			/* Поиск самого длинного слова для расчетов */
			const maxLengthLabel = props.labels.reduce(
				(acc, label) => (acc = acc < label.length ? label.length : acc),
				0
			);

			/*
				Расчитывается ширина строки с допущением, что шрифт не квадратный
				Поэтому размер шрифта умножаю на 1.5
			*/
			const charWidth = textSize / 1.5;
			const legendWidth = Math.round(
				maxLengthLabel * charWidth + textSize + textGap
			);

			calcSize = outerRadius * 2 + legendWidth;
		} else {
			const labelsCount = props.labels.length;
			const legendHeight = labelsCount * 2 * textSize + textGap;
			calcSize = outerRadius * 2 + legendHeight;
		}

		outerRadius =
			size < calcSize ? outerRadius - (calcSize - size) / 2 : outerRadius;

		outerRadius = outerRadius <= minRadius ? minRadius : outerRadius;
	}

	const sum = props.values.reduce((acc, value) => acc + value, 0);
	const deg = 360 / sum;
	let rotationDeg = 0;
	let prevAngle = 0;

	let lastend = 0;

	const labelX = isHorizontal ? outerRadius * 2 + textGap : 0;
	let labelY = isHorizontal ? 0 : outerRadius * 2;

	const totalX =
		outerRadius - Math.round((String(sum.toFixed(2)).length * textSize) / 3);
	const totalY = outerRadius - textSize / 2;

	const width = isHorizontal ? props.width : outerRadius * 2;
	const height = isHorizontal ? outerRadius * 2 : props.height;

	return (
		<Wrapper theme={theme as Theme} width={props.width} height={height}>
			<Stage width={width} height={props.height}>
				<Layer>
					{/* Расчитывает и выводит Pie */}
					{props.values.map((value, index) => {
						const angle = deg * value;
						rotationDeg = index !== 0 ? rotationDeg + prevAngle : 0;
						prevAngle = angle;

						return (
							<Arc
								key={`${index}-${value}`}
								x={outerRadius}
								y={outerRadius}
								innerRadius={innerRadius}
								outerRadius={outerRadius}
								angle={angle}
								rotation={rotationDeg}
								fill={barColors[index]}
							/>
						);
					})}
					{/* Расчитывает и выводит значения для Pie */}
					{props.withValues &&
						props.values.map((value, index) => {
							const persent = value / sum;
							const len = persent * 2 * Math.PI;
							const mid = lastend + len / 2;
							const valueX =
								outerRadius + Math.cos(mid) * (outerRadius / 2) - 70 / 2;
							const valueY =
								outerRadius + Math.sin(mid) * (outerRadius / 2) - 70 / 2;
							lastend += persent * 2 * Math.PI;

							return (
								<Text
									key={`${value}-${index}`}
									text={`${value.toFixed(2)} (${(persent * 100).toFixed(2)}%)`}
									fill={theme.color.text}
									x={valueX}
									y={valueY}
									draggable={true}
								/>
							);
						})}
					{/* Выводит легенду для диаграммы */}
					{props.withLegents &&
						props.labels &&
						props.labels.map((label, index) => {
							labelY += textGap;

							return (
								<React.Fragment key={`fragment-${index}`}>
									<Rect
										key={`${index}-${label}`}
										x={labelX}
										y={labelY}
										width={textSize}
										height={textSize}
										fill={barColors[index]}
									/>
									<Text
										key={`${label}-${index}`}
										text={label}
										fill={theme.color.text}
										x={labelX + textGap}
										y={labelY}
									/>
								</React.Fragment>
							);
						})}
					{/* Выводит общую сумму */}
					{props.withTotal && (
						<Text
							key="total"
							text={`${sum.toFixed(2)}`}
							fontSize={textSize * 1.2}
							fill={theme.color.text}
							x={totalX}
							y={totalY}
							draggable={true}
							fontStyle={"bold"}
						/>
					)}
				</Layer>
			</Stage>
		</Wrapper>
	);
};
