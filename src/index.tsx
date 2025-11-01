import { createRoot } from 'react-dom/client';
import { StrictMode, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isPanelOpen, setIsPanelOpen] = useState(false);
	const [currentSettings, setCurrentSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const [appliedSettings, setAppliedSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const handleOpenPanel = () => {
		setIsPanelOpen(true);
		setCurrentSettings(appliedSettings);
	};

	const handleClosePanel = () => {
		setIsPanelOpen(false);
	};

	const handleApply = () => {
		setAppliedSettings(currentSettings);
		setIsPanelOpen(false);
	};

	const handleReset = () => {
		setCurrentSettings(defaultArticleState);
	};

	return (
		<main className={styles.main}>
			<ArticleParamsForm
				isOpen={isPanelOpen}
				onToggle={() => (isPanelOpen ? handleClosePanel() : handleOpenPanel())}
				settings={currentSettings}
				onChange={setCurrentSettings}
				onApply={handleApply}
				onReset={handleReset}
			/>

			<div
				className={styles.articleContainer}
				style={
					{
						'--font-family': appliedSettings.fontFamilyOption.value,
						'--font-size': appliedSettings.fontSizeOption.value,
						'--font-color': appliedSettings.fontColor.value,
						'--container-width': appliedSettings.contentWidth.value,
						'--bg-color': appliedSettings.backgroundColor.value,
					} as React.CSSProperties
				}>
				<Article />
			</div>
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
