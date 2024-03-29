import React, {
	useState,
	useEffect,
	useRef,
	FC,
	KeyboardEvent,
	ChangeEvent,
	CSSProperties,
	MutableRefObject,
} from 'react';

import { useAppDispatch, useAppSelector } from 'store';
import { leftSidebarSelector, mobileSelector } from 'store/selectors';
import { setLSidebarOpen } from 'store/reducers/SidebarSlice';
import { createCustomTaskGroup } from 'store/reducers/TaskGroupSlice';

import { CSSTransition } from 'react-transition-group';

import Button from '@mui/material/Button';
import ConfirmationButton from '../ConfirmationButton';

import AddBoxIcon from '@mui/icons-material/AddBox';
import { ThemedTextField } from 'components/ui/custom/CustomInputs';

import 'components/ui/animations/Button/CreateListBtnAnimation.css';
import styles from './styles.module.scss';

const CreateListButton: FC = (): JSX.Element => {
	const [showInput, setShowInput] = useState<boolean>(false);
	const [showButton, setShowButton] = useState<boolean>(true);
	const [inputValue, setInputValue] = useState<string>('');

	const dispatch = useAppDispatch();
	const nodeRef: MutableRefObject<null> = useRef(null);

	const isLSidebarOpened: boolean = useAppSelector(leftSidebarSelector);
	const isMobile: boolean = useAppSelector(mobileSelector);

	const adaptiveCreateListCaption: CSSProperties =
		!isLSidebarOpened && !isMobile ? { display: 'none' } : {};

	const adaptiveBtn: CSSProperties =
		!isLSidebarOpened && !isMobile ? { padding: '0.25rem' } : {};

	useEffect((): void => {
		if (!isLSidebarOpened) setShowInput(false);
	}, [isLSidebarOpened, showInput]);

	const handleInputSubmit = (): void => {
		setInputValue('');
		setShowInput(false);
		dispatch(createCustomTaskGroup(inputValue));
	};

	const onInputEnterPressed = (event: KeyboardEvent): void => {
		if (event.key === 'Enter' && inputValue.length) handleInputSubmit();
	};

	const onClickCloseInput = (): void => {
		if (inputValue.length) handleInputSubmit();
		else setShowInput(false);
	};

	const onCreateListBtnClick = (): void => {
		setShowInput(true);
		if (!isLSidebarOpened) dispatch(setLSidebarOpen());
	};

	const onTaskListChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.currentTarget.value);
	};

	return (
		<div
			className={styles.create__list}
			style={showInput ? { backgroundColor: 'transparent' } : {}}
		>
			{showButton && (
				<Button
					className={styles.create__list_input_btn}
					onClick={onCreateListBtnClick}
					sx={{
						...adaptiveBtn,
						minWidth: '0',
						color: 'var(--fontColor)',
						textTransform: 'math-auto',
						backgroundColor: 'var(--bgColorSecond)',
						'&:hover': {
							backgroundColor: 'var(--bgColorSecond)',
						},
					}}
				>
					<AddBoxIcon />
					<span style={adaptiveCreateListCaption}>Создать список</span>
				</Button>
			)}

			<CSSTransition
				in={showInput}
				nodeRef={nodeRef}
				timeout={300}
				classNames="input"
				unmountOnExit
				onEnter={() => setShowButton(false)}
				onExited={() => setShowButton(true)}
			>
				<>
					<ThemedTextField
						ref={nodeRef}
						sx={{ width: '100%' }}
						id="standard-basic"
						label="Введите название списка"
						variant="standard"
						onKeyDown={onInputEnterPressed}
						onSubmit={handleInputSubmit}
						value={inputValue}
						onChange={onTaskListChangeInput}
					/>

					<ConfirmationButton
						sx={{ padding: 1 }}
						variant={inputValue.length ? 'ok' : 'cancel'}
						onClick={onClickCloseInput}
					/>
				</>
			</CSSTransition>
		</div>
	);
};

export default CreateListButton;
