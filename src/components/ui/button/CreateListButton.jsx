import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLSidebarOpen } from '../../../store/reducers/SidebarSlice';
import { createCustomTaskGroup } from '../../../store/reducers/TaskGroupSlice';

import { CSSTransition } from "react-transition-group";

import Button from './Button';
import ConfirmationButton from "./ConfirmationButton";

import AddBoxIcon from '@mui/icons-material/AddBox';
import { ThemedTextField } from '../customComponents/CustomInputs';
import * as selectors from "../../../store";

import '../animations/Button/createListBtnAnimation.css';
import styles from './styles/CreateListButton.module.scss';

const CreateListButton = () => {
    const [showInput, setShowInput] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [inputValue, setInputValue] = useState('');

    const dispatch = useDispatch();
    const nodeRef = useRef(null);

    const isLSidebarOpened = useSelector(selectors.leftSidebarSelector);
    const isMobile = useSelector(selectors.mobileSelector);

    const adaptiveSpan = !isLSidebarOpened && !isMobile ? {
        display: 'none',
        } : {};

    const adaptiveBtn = !isLSidebarOpened && !isMobile ? {
        padding: '0.25rem'
        } : {}

    
    useEffect(() => {
        if (!isLSidebarOpened) setShowInput(false);
    }, [isLSidebarOpened, showInput])

    const handleInputSubmit = () => {
        setInputValue('');
        setShowInput(false);
        dispatch(createCustomTaskGroup(inputValue));
    }

    const onInputEnterPressed = event => {
        if (event.key === 'Enter' && inputValue.length) {
            handleInputSubmit()
        }
    }

    const onClickCloseInput = () => {
        if (inputValue.length)
            handleInputSubmit();
        else setShowInput(false);
    }

    const onCreateListBtnClick = () => {
        setShowInput(true);
        if (!isLSidebarOpened) dispatch(setLSidebarOpen());
    }

  return (
    <div className={styles.create__list}
        style={showInput ? {backgroundColor: 'transparent'} : {}}
    >
        {showButton &&
            <Button
                className={styles.create__list_input_btn}
                onClick={onCreateListBtnClick}
                style={adaptiveBtn}
            >
                <AddBoxIcon/>
                <span style={adaptiveSpan}>
                    Создать список
                </span>
            </Button>
        }

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
                    sx={{width: '100%'}}
                    id="standard-basic"
                    label="Введите название списка"
                    variant="standard"
                    onKeyDown={onInputEnterPressed}
                    onSubmit={handleInputSubmit}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onClose={() => setShowInput(false)}
                />

                <ConfirmationButton
                    sx={{padding: 1}}
                    variant={inputValue.length ? 'ok' : 'cancel'}
                    onClick={onClickCloseInput}
                />
            </>
        </CSSTransition>
    </div>
  )
}

export default CreateListButton;
