import { useState, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group/RadioGroup';
import { Select } from 'src/ui/select/Select';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
//import { useOutsideClick } from 'src/hooks/useOutsideClick';
import { useClose } from 'src/hooks/useClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	appliedSettings: ArticleStateType;
	onApplySettings: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	appliedSettings,
	onApplySettings,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentSettings, setCurrentSettings] =
		useState<ArticleStateType>(appliedSettings);
	const formRef = useRef<HTMLDivElement>(null);

	useClose({
		isOpen,
		onClose: () => setIsOpen(false),
		rootRef: formRef,
	});

	const handleChange = <K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) => {
		setCurrentSettings((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApplySettings(currentSettings);
		setIsOpen(false);
	};

	const handleReset = () => {
		onApplySettings(defaultArticleState);
		setCurrentSettings(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>

					<Select
						selected={currentSettings.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => handleChange('fontFamilyOption', option)}
						title='Шрифт'
					/>

					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={currentSettings.fontSizeOption}
						onChange={(option) => handleChange('fontSizeOption', option)}
						title='РАЗМЕР ШРИФТА'
					/>

					<Select
						selected={currentSettings.fontColor}
						options={fontColors}
						onChange={(option) => handleChange('fontColor', option)}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						selected={currentSettings.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleChange('backgroundColor', option)}
						title='Цвет фона'
					/>

					<Select
						selected={currentSettings.contentWidth}
						options={contentWidthArr}
						onChange={(option) => handleChange('contentWidth', option)}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
