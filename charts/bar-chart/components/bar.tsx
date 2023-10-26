import React from "react";
import { Rect, Text } from "react-konva";
/** @jsx jsx */
import { jsx } from "@emotion/core";

export interface Prop {
	x: number;
	y: number;
	width: number;
	height: number;
	value: number;
	withValues: boolean;
	label: string;
	barGap: number;
	textGap: number;
	barColor: string;
	textColor: string;
}

export const Bar: React.FC<Prop> = (props) => {
	const {
		x,
		y,
		width,
		height,
		value,
		withValues,
		label,
		barGap,
		textGap,
		barColor,
		textColor,
	} = props;
	const valueY = y - textGap;
	const labelY = y + height + barGap;

	return (
		<>
			{withValues && (
				<Text text={String(value)} fill={textColor} x={x} y={valueY} />
			)}
			<Rect x={x} y={y} width={width} height={height} fill={barColor} />
			{Boolean(label) && (
				<Text text={label} fill={textColor} x={x} y={labelY} />
			)}
		</>
	);
};
