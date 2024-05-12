import UserModel from '../models/userModel';

export async function* fetchUsersInBatches(limit: number = 10, lastId: string = '') {
    while (true) {
        const query = lastId ? {_id: {$gt: lastId}} : {};
        const users = await UserModel.find(query).limit(limit).sort({_id: 1});

        if (users.length === 0) {
            break;
        }

        lastId = users[users.length - 1]._id.toString(); // Update lastId to the last user's ID in the batch
        yield users;
    }
}
