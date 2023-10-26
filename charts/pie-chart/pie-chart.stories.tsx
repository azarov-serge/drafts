import React from "react";
// also exported from "@storybook/react" if you can deal with breaking changes in 6.1
import { Meta } from "@storybook/react/types-6-0";
import { withKnobs, boolean, number, object } from "@storybook/addon-knobs";

import { PieChart } from "./pie-chart";
import { defaultTheme } from "./const";

const data = {
	width: 500,
	height: 300,
	values: [14138.560000000001, 18118, 4359.84, 8901.34],
	labels: ["USA", "RUSSIA", "GERMANY", "SPAIN"],
	minBarWidth: 120,
};

export default {
	title: "Components/charts/PieChart",
	component: PieChart,
	decorators: [withKnobs],
} as Meta;

const getValues = (): number[] => object("Values", data.values, "Data");
const getLabels = (): string[] => object("Labels", data.labels, "Data");
const getColors = (): string[] =>
	object("Colors", defaultTheme.color.bars.slice(0, 4), "Data");

export const DefaultPieChart: React.FC = () => {
	return (
		<PieChart
			width={number("Width", data.width)}
			height={number("Height", data.height)}
			values={getValues()}
			withValues={boolean("With values", false)}
			withTotal={boolean("With total", false)}
			withLegents={boolean("With legends", false)}
			labels={getLabels()}
		/>
	);
};

export const ExamplePieChart: React.FC = () => {
	return (
		<PieChart
			width={number("Width", data.width)}
			height={number("Height", data.height)}
			values={getValues()}
			withValues={boolean("With values", true)}
			withTotal={boolean("With total", true)}
			labels={getLabels()}
			withLegents={boolean("With legends", true)}
			colors={getColors()}
		/>
	);
};
