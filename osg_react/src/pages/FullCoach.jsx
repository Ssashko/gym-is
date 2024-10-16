import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { useForm, Controller } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/outline';

import Header from '../components/Header';
// import { useSelector } from 'react-redux';
// import axios from '../axios';

Modal.setAppElement('#root');

const exampleCoach = {
	id: 1,
	avatarUrl: 'https://flowbite.com/docs/images/people/profile-picture-1.jpg',
	name: 'Василенко Іван Іванович',
	spec: 'Кросфіт',
	type: 'онлайн/офлайн',
	exp: '10 років',
	email: 'vasilenko228@gmail.com',
	phone: '+380631231234',
};
const subs = ['Одне заняття', 'Пакет занять', 'Місячний абонемент']; //

const exampleSubsription = {
	name: 'Одне заняття',
	cost: 250,
	lessonCount: 1,
	imageUrl: '/img/plan_img.png',
	description: 'Спробуй себе на один раз з моїми вміннями та порадами',
};

const Plan = ({ name, cost, lessonCount, imageUrl, description, onClick }) => {
	return (
		<div className="inline-block p-8 space-y-16 text-center bg-black rounded-3xl">
			<div className="p-5 space-y-4 text-2xl bg-white rounded-3xl">
				<p className="text-3xl font-bold">{name}</p>
				<p>Ціна: {cost}₴</p>
				<p>Кількість занять: {lessonCount}</p>
			</div>
			<img src={imageUrl} alt="subImg" className="max-w-full mx-auto" />
			<p className="text-xl text-white">{description}</p>
			<button className="p-2 text-xl bg-white rounded-full min-w-[16rem]" onClick={onClick}>
				Замовити
			</button>
		</div>
	);
};

const OrderModal = ({ modalIsOpen, afterOpenModal, closeModal }) => {
	const {
		register,
		handleSubmit,
		reset,
		control,
		// setError,
		// eslint-disable-next-line
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			topic: '',
			// subType: String(modalIsOpen.activeSubType),
			desc: '',
		},
		mode: 'onSubmit',
		// shouldUseNativeValidation: true,
	});
	const closeOrderModal = () => {
		closeModal();
		reset();
	};

	const onSubmit = async (values) => {
		console.log(values);
		closeOrderModal();
	};

	return (
		<Modal
			closeTimeoutMS={250}
			isOpen={modalIsOpen.show}
			onAfterOpen={afterOpenModal}
			onRequestClose={closeOrderModal}
			className={'mt-[84px] mx-auto w-fit '} //absolute inset-0
			contentLabel="Fill order">
			<div className="p-6 bg-white border border-black w-fit rounded-3xl  &[ReactModal__Overlay--after-open:translate-y-0]">
				<div className="text-right">
					<button onClick={closeModal}>
						<XMarkIcon className="w-10 h-10 text-black" />
					</button>
				</div>
				<form className="px-24 mb-12 space-y-12" onSubmit={handleSubmit(onSubmit)}>
					<h2 className="px-6 text-4xl text-center">Заповніть заявку</h2>
					<div className="w-full ">
						<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
							Тема
						</span>
						<input
							type="text"
							{...register('topic', { required: 'Вкажіть тему' })}
							className="w-full px-4 py-2 text-2xl border-0 border-b border-black focus:rounded focus:border-black focus:ring-black"
						/>
					</div>
					<div>
						<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
							Виберіть абонемент
						</span>
						<Controller
							control={control}
							name="subType"
							render={() => (
								<select
									className="block w-full px-4 py-2 text-xl border rounded focus:ring-black focus:border-black "
									defaultValue={String(modalIsOpen.activeSubType)}>
									{subs.map((obj, index) => (
										<option key={index} value={String(index)} className="text-lg">
											{obj}
										</option>
									))}
								</select>
							)}
						/>
					</div>
					<div className="w-full">
						<span className="block px-4 text-lg text-gray-500 select-none font-extralight">
							Опис
						</span>
						<textarea
							{...register('desc', { required: 'Вкажіть текст заявки' })}
							className="w-full rounded resize-none min-h-[8rem] h-full text-xl focus:border-black focus:ring-black"></textarea>
					</div>
					<button
						type="submit"
						className="inline-block select-none text-center w-full min-w-[16rem] hover:bg-neutral-700 px-8 py-3 rounded-full text-xl leading-none font-normal bg-black text-white">
						Відправити
					</button>
				</form>
			</div>
		</Modal>
	);
};

const FullCoach = () => {
	//// const auth = useSelector((state) => state.auth);
	//// const isLogged = localStorage.getItem('token') && Boolean(auth.data);

	// const [post, setPost] = React.useState();
	// const [isLoading, setLoading] = React.useState(true);
	const { id } = useParams();

	// React.useEffect(() => {
	// 	axios
	// 		.get(`/posts/${id}`)
	// 		.then((res) => {
	// 			setPost(res.data);
	// 			setLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			alert('Error retrieving post');
	// 		});
	// }, [id]);

	// const fetchComments = () => {
	// 	axios
	// 		.get(`/comments/${id}`)
	// 		.then((res) => {
	// 			setComments(res.data);
	// 			setCommentsLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			console.warn('Error fetching comments');
	// 			alert('Error retrieving comments');
	// 		});
	// };
	// React.useEffect(() => {
	// 	fetchComments();
	// }, []);

	// const onSendComment = async (text) => {
	// 	try {
	// 		const fields = {
	// 			text,
	// 		};

	// 		await axios.post(`/comments/${id}`, fields);

	// 		fetchComments();
	// 	} catch (err) {
	// 		console.warn(err);
	// 		alert('Failed creating comment');
	// 	}
	// };

	// if (isLoading) {
	// 	return <Post isLoading={true} isFullCoach />;
	// }

	const [showModal, setShowModal] = useState({ show: false, activeSubType: 0 });
	const openModal = (type) => {
		setShowModal({ show: true, activeSubType: type });
	};

	const closeModal = () => {
		setShowModal({ show: false, activeSubType: 0 });
	};

	return (
		<div className="flex flex-col min-h-screen App">
			<Header main />
			<div className="mt-[60px] min-h-full">
				<div className="p-16 m-6 space-y-24 border border-black">
					<div className="grid grid-cols-3 grid-rows-2 gap-16">
						<div className="row-span-2 border-2 border-black rounded-2xl">
							<img
								src={exampleCoach.avatarUrl}
								alt="Coach"
								className="mx-auto border-b-2 border-black rounded-t-[0.9rem] w-fit"
							/>
							<div className="px-10 py-6 space-y-6">
								<p className="text-3xl font-medium text-center">{exampleCoach.name}</p>
								<button
									onClick={openModal}
									className="inline-block select-none text-center w-full min-w-[16rem] hover:bg-neutral-700 px-8 py-3 rounded-full text-xl leading-none font-normal bg-black text-white">
									Написати тренеру
								</button>
								<button
									onClick={openModal}
									className="inline-block select-none text-center w-full min-w-[16rem] hover:bg-neutral-700 px-8 py-3 rounded-full text-xl leading-none font-normal bg-black text-white">
									Відправити заявку
								</button>
							</div>
						</div>
						<div className="px-10 py-6 space-y-4 text-left border-2 border-black rounded-2xl">
							<div className="w-full p-4 border-b border-black">
								<span className="block text-lg text-gray-500 select-none font-extralight">
									Пошта
								</span>
								<p className="text-2xl font-medium">{exampleCoach.email}</p>
							</div>
							<div className="w-full p-4 border-b border-black">
								<span className="block text-lg text-gray-500 select-none font-extralight">
									Телефон
								</span>
								<p className="text-2xl font-medium">{exampleCoach.phone}</p>
							</div>
						</div>
						<div className="px-10 py-6 space-y-4 text-left border-2 border-black rounded-2xl">
							<div className="w-full p-4 border-b border-black">
								<span className="block text-lg text-gray-500 select-none font-extralight">
									Спеціалізація
								</span>
								<p className="text-2xl font-medium">{exampleCoach.spec}</p>
							</div>
							<div className="w-full p-4 border-b border-black">
								<span className="block text-lg text-gray-500 select-none font-extralight">
									Тип тренувань
								</span>
								<p className="text-2xl font-medium">{exampleCoach.type}</p>
							</div>
						</div>
						<div className="col-span-2 px-10 py-6 space-y-4 text-2xl text-left border-2 border-black rounded-2xl">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, suscipit vel nemo a,
							cupiditate aliquam ullam velit modi nam at totam est voluptate! Dignissimos
							doloremque, vero fugit iure voluptate eaque exercitationem debitis quisquam odio ipsum
							temporibus quia! Vel, et nisi quod suscipit magni quo maxime in facere sint totam
							necessitatibus est accusamus doloremque saepe iste quos repellat, odit minus alias
							itaque vitae soluta voluptatem! Natus nam fuga mollitia autem repudiandae expedita
							provident harum hic eveniet quam dicta sint voluptate architecto dolor magnam
							consequatur odio cupiditate a asperiores repellat, doloribus illo vitae. Quaerat alias
							sunt minus?
						</div>
					</div>
					<div className="px-24 space-y-8 text-center">
						<h2 className="text-3xl">Абонементи на вибір</h2>
						<div className="grid grid-cols-3 gap-10">
							<Plan {...exampleSubsription} onClick={() => openModal(0)} />
							<Plan {...exampleSubsription} onClick={() => openModal(1)} />
							<Plan {...exampleSubsription} onClick={() => openModal(2)} />
						</div>
					</div>
				</div>
			</div>
			<OrderModal modalIsOpen={showModal} closeModal={closeModal} />
		</div>
	);
};

export default FullCoach;
