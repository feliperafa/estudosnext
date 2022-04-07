import { NextApiRequest, NextApiResponse } from 'next';

//JWT (Storage)
//Next Auth (Social)

export default (request: NextApiRequest, response: NextApiResponse) => {
	const users = [
		{ id: 1, name: 'felipe' },
		{ id: 2, name: 'wagner' },
		{ id: 3, name: 'jonas' },
	];

	return response.json(users);
};
