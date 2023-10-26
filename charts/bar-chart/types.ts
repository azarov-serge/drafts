export interface Theme {
	color: {
		[key: string]: string | string[];
		primary: string;
		secondary: string;
		background: string;
		selected: string;
		text: string;
		border: string;
		success: string;
		information: string;
		error: string;
		bars: string[];
	};
	font: {
		family: string;
		size: string;
		lineHeight: string;
	};
}
