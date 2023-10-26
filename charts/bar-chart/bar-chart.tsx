import React from "react";
import { Stage, Layer } from "react-konva";
/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { Bar } from "./components/bar";
import { Wrapper } from "./components/wrapper";
import { defaultTheme } from "./const";
import { Theme } from "./types";

export interface Prop {
	width: number;
	height: number;
	minBarWidth?: number;
	barColor?: string;
	values: number[];
	withValues?: boolean;
	labels?: string[];
	colors?: string[];
}

const BAR_GAP = 5;
const PADDING = 15;

const getValue = (value: string): number =>
	Number(value.replace(/[^-0-9]/gim, ""));

export const BarChart: React.FC<Prop> = (props) => {
	const theme = {
		...defaultTheme,
		...useTheme(),
	};

	const { colors = [], labels = [], withValues = false } = props;

	const chartHeight = props.height - PADDING * 2;
	const chartWidth = props.width - PADDING * 2;
	const labelsCount = labels.length;
	const colorsCount = colors.length;
	const textGap = getValue(theme.font.lineHeight);
	const textSize = getValue(theme.font.size);

	const height = labelsCount
		? chartHeight - Number(withValues) * textGap - textSize - textGap
		: chartHeight - 2 * (textGap - textSize - textGap);

	const count = props.values.length;
	const width = Math.floor((chartWidth - BAR_GAP * (count - 1)) / count);

	const barWidth =
		props.minBarWidth && props.minBarWidth < width ? props.minBarWidth : width;

	const maxValue = Math.max(...props.values);

	return (
		<Wrapper
			theme={theme as Theme}
			width={props.width}
			height={props.height}
			padding={PADDING}
		>
			<Stage width={chartWidth} height={chartHeight}>
				<Layer>
					{props.values.map((value, index) => {
						const barHeight = Math.floor((value / maxValue) * height);
						const x = index * (barWidth + BAR_GAP);
						const y =
							height - barHeight + Number(withValues) * textGap + BAR_GAP;
						const barValue = Math.round(value);
						const barLabel = labelsCount ? labels[index] : "";
						const barColor = colorsCount
							? colors[index]
							: props.barColor || theme.color.bars[0];

						return (
							<Bar
								key={index}
								x={x}
								y={y}
								width={barWidth}
								height={barHeight}
								value={barValue}
								withValues={withValues}
								label={barLabel}
								barGap={BAR_GAP}
								textGap={textSize}
								barColor={barColor}
								textColor={theme.color.text}
							/>
						);
					})}
				</Layer>
			</Stage>
		</Wrapper>
	);
};
