import { useState, useRef, useCallback } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Separator } from '../separator';
import { Select } from '../select';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';

import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	setArticleState: (selectArticleState: ArticleStateType) => void;
	onToggle?: (selectArticleState: boolean) => void;
};

export const ArticleParamsForm: React.FunctionComponent<
	ArticleParamsFormProps
> = ({ setArticleState, onToggle }) => {
	const [selectArticleState, setSelectArticleState] =
		useState(defaultArticleState);
	const [isOpenForm, setIsFormOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	const switcher = () => {
		setIsFormOpen((prev) => !prev);
		onToggle?.(!isOpenForm);
	};

	const handleChange =
		(key: keyof typeof selectArticleState) => (option: OptionType) => {
			setSelectArticleState((prevParams) => ({
				...prevParams,
				[key]: option,
			}));
		};

	const formSubmitHandler = useCallback(
		(e: React.FormEvent<HTMLFormElement>): void => {
			e.preventDefault();
			setArticleState(selectArticleState);
		},
		[selectArticleState, setArticleState]
	);

	const resetToDefault = useCallback((): void => {
		setSelectArticleState(defaultArticleState);
		setArticleState(defaultArticleState);
	}, [setArticleState]);

	const panelAppearance = clsx(styles.container, {
		[styles.container_open]: isOpenForm,
	});

	useOutsideClickClose({
		isOpen: isOpenForm,
		rootRef,
		onClose: switcher,
		onChange: setIsFormOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpenForm} onClick={switcher} />
			<aside className={panelAppearance} ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={formSubmitHandler}
					onReset={resetToDefault}>
					<Text size={31} weight={800} uppercase>
						{'Задайте параметры'}
					</Text>
					<Select
						selected={selectArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						placeholder='Open Sans'
						onChange={handleChange('fontFamilyOption')}
						title='Шрифт'
					/>
					<RadioGroup
						key={selectArticleState.fontSizeOption.value}
						selected={selectArticleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={handleChange('fontSizeOption')}
						name='fontSizeOption'
						title={'Размер шрифта'}
					/>
					<Select
						selected={selectArticleState.fontColor}
						options={fontColors}
						placeholder={selectArticleState.fontColor.title}
						onChange={handleChange('fontColor')}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectArticleState.backgroundColor}
						options={backgroundColors}
						placeholder={selectArticleState.backgroundColor.title}
						onChange={handleChange('backgroundColor')}
						title='Цвет фона'
					/>
					<Select
						selected={selectArticleState.contentWidth}
						options={contentWidthArr}
						placeholder={selectArticleState.contentWidth.title}
						onChange={handleChange('contentWidth')}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
