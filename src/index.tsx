import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useCallback } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] = useState(defaultArticleState);
	const [isFormOpen, setIsFormOpen] = useState(false);

	const toggleForm = useCallback(() => setIsFormOpen((prev) => !prev), []);

	const handleFormSubmit = useCallback(
		(props: ArticleStateType) => setArticleState(props),
		[]
	);

	const handleFormReset = useCallback(
		(props: ArticleStateType) => setArticleState(props),
		[]
	);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onSubmit={handleFormSubmit}
				onReset={handleFormReset}
				onToggle={toggleForm}
				isOpenForm={isFormOpen}
				setIsFormOpen={setIsFormOpen}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
