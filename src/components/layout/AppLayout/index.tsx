import React, { Component, Dispatch, ReactNode, useState } from 'react';
import Header from 'components/sections/header';
import { HeaderContext } from 'context/HeaderContext';
import styles from './styles.module.scss';
import ErrorPage from 'components/sections/pages/ErrorPage';

interface AppProviderProps {
	children: ReactNode;
}

interface AppProviderState {
	showHeader: boolean;
	isRenderError: boolean;
	errorMessage: undefined | string;
}

class AppLayout extends Component<AppProviderProps, AppProviderState> {
	constructor(props: AppProviderProps) {
		super(props);
		this.state = {
			isRenderError: false,
			errorMessage: undefined,
			showHeader: true,
		};
	}

	setShowHeader = (state: boolean) => {
		this.setState({ showHeader: state });
	};

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.log(error);
		this.setState({
			isRenderError: true,
			errorMessage: errorInfo.componentStack.toString()
		});
	}

	render() {
		const { children } = this.props;
		const { showHeader, isRenderError } = this.state;

		return (
			<HeaderContext.Provider
				value={{ showHeader, setShowHeader: this.setShowHeader }}
			>
				<main className={styles.main__container}>
					{
						!isRenderError ?
							<>
							{showHeader && <Header />}
							{children}
							</>
						:
						<ErrorPage />
					}
				</main>
			</HeaderContext.Provider>
		);
	}
}

export default AppLayout;
