import React, { useState } from 'react';
import { BsFilePerson } from 'react-icons/bs';

function Comments({ comm }) {
	const [kidsComments, setKidsComments] = useState([]);
	const [openChildComments, setOpenChildComments] = useState(true);

	const getChildComments = async () => {
		if (comm?.kids?.length !== 0 || comm.kids) {
			const promisses = comm?.kids?.map(id => {
				return fetch(
					`https://hacker-news.firebaseio.com/v0/item/${id}.json`
				).then(response => response.json());
			});
			const result = await Promise.all(promisses);
			setKidsComments(result);
		}
		setOpenChildComments(false);
	};

	return (
		<div>
			<div className={`p-5 ml-2  ${openChildComments ? 'p-5 ml-8' : 'ml-3'}`}>
				<div className='flex'>
					<BsFilePerson className='text-xl' /> {comm.by}
				</div>
				<div
					dangerouslySetInnerHTML={{ __html: comm.text }}
					className='ml-5 mt-5'
				></div>
				{openChildComments && comm.kids !== undefined && (
					<button onClick={getChildComments} className='ml-10'>
						показать ответ..
					</button>
				)}
			</div>

			{kidsComments &&
				kidsComments.map(item => {
					return <Comments key={item.id} comm={item} />;
				})}
		</div>
	);
}

export default Comments;
