import styled from "@emotion/styled";

interface Theme {
	color: {
		[key: string]: string | string[];
		text: string;
		background: string;
		border: string;
	};
}

export interface Prop {
	theme: Theme;
	width: number;
	height: number;
}

export const Wrapper = styled.div<Prop>`
	${(props) => {
		const { theme, width, height } = props;
		return `
      width: ${width}px;
      height: ${height}px;
      margin: 0;
      padding: 1rem;
      color: ${theme.color.text};
      background-color: ${theme.color.background};
      border: 1px solid ${theme.color.border};
      border-radius: 0.3rem;
    `;
	}}
`;
