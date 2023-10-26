import React from "react";
// also exported from "@storybook/react" if you can deal with breaking changes in 6.1
import { Meta } from "@storybook/react/types-6-0";
import {
	withKnobs,
	boolean,
	number,
	object,
	optionsKnob,
} from "@storybook/addon-knobs";

import { BarChart } from "./bar-chart";
import { defaultTheme } from "./const";

const data = {
	width: 500,
	height: 300,
	values: [14138.560000000001, 18118, 4359.84, 8901.34],
	labels: ["USA", "RUSSIA", "GERMANY", "SPAIN"],
	minBarWidth: 120,
};

export default {
	title: "Components/charts/BarChart",
	component: BarChart,
	decorators: [withKnobs],
} as Meta;

const color = {
	color1: defaultTheme.color.bars[0],
	color2: defaultTheme.color.bars[1],
	color3: defaultTheme.color.bars[2],
	color4: defaultTheme.color.bars[3],
	color5: defaultTheme.color.bars[4],
};

const getBarColor = (): string => {
	return optionsKnob("If colors = [] choose color", color, color.color1, {
		display: "select",
	});
};

const getValues = (): number[] => object("Values", data.values, "Data");
const getLabels = (): string[] => object("Labels", data.labels, "Data");
const getColors = (empty?: boolean): string[] =>
	object("Colors", empty ? [] : defaultTheme.color.bars, "Data");

export const DefaultBarChart: React.FC = () => {
	return (
		<BarChart
			width={number("Width", data.width)}
			height={number("Height", data.height)}
			minBarWidth={number("Min Bar Width", data.minBarWidth)}
			values={getValues()}
			withValues={boolean("With values", false)}
			barColor={getBarColor()}
			colors={getColors(true)}
		/>
	);
};

export const ExampleBarChart: React.FC = () => {
	return (
		<BarChart
			width={number("Width", data.width)}
			height={number("Height", data.height)}
			minBarWidth={number("Min Bar Width", data.minBarWidth)}
			values={getValues()}
			withValues={boolean("With values", true)}
			labels={getLabels()}
			barColor={getBarColor()}
			colors={getColors()}
		/>
	);
};
