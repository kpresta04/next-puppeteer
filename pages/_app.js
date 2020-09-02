import App from "next/app";
import { DateProvider } from "../components/context/DateContext";

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<DateProvider>
				<Component {...pageProps} />
			</DateProvider>
		);
	}
}

export default MyApp;
