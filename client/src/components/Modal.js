import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ModalStyled = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	color: rgb(60, 60, 60);
	z-index: 10;
	display: flex;
	justify-content: center;
	align-items: center;
	font-family: 'Ubuntu', sans-serif;
	font-size: 1rem;
	.body {
		position: relative;
		border: 1px solid rgb(60, 60, 60);
		border-radius: 10px;
		overflow: hidden;
		width: 300px;
		height: 250px;
		background-color: white;
		padding: 20px;
		form {
			display: flex;
			flex-direction: column;
			input {
				text-align: center;
				margin: 10px 20px;
				font-family: 'Ubuntu', sans-serif;
				color: rgb(60, 60, 60);
				padding: 10px;
				font-size: 1.1rem;
			}
		}
		.icon {
			position: absolute;
			right: 15px;
			color: rgb(60, 60, 60);
			&:hover {
				cursor: pointer;
			}
		}
	}
`;

const Modal = (props) => {
	const [state, setState] = React.useState({ title: '', revealed: '' });

	const handleChange = (e, mode) => {
		e.target.value.length < 10 &&
			setState({ ...state, [mode]: e.target.value });
	};

	const handleClick = (e) => {
		e.preventDefault();
		props.confirm(state);
	};
	return (
		<ModalStyled>
			<div className='body'>
				<FontAwesomeIcon
					onClick={props.closeModal}
					icon={faTimes}
					className='icon exit'
				/>
				<form>
					<span>Preview title</span>
					<input
						onChange={(e) => handleChange(e, 'title')}
						type='text'
						value={state.title}
					/>
					<span>Reveal title. Shown only after completing the puzzle</span>
					<input
						onChange={(e) => handleChange(e, 'revealed')}
						type='text'
						value={state.reveal}
					/>

					<input
						disabled={state.title === '' || state.revealed === ''}
						onClick={handleClick}
						type='submit'
						value='Save'
					/>
				</form>
			</div>
		</ModalStyled>
	);
};

export default Modal;
