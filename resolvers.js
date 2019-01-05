export default {
    Query: {
        allUsers: (parent, args, { models }) => models.User.findAll(),
        getUser: (parent, { username }, { models }) => models.User.findOne({ where: { username, } }),
    },

    Mutation: {
        createUser: (parent, args, { models }) => models.User.create(args),
        updateUser: (parent, { username, newUserName }, { models }) => models.User.update({
            username: newUserName
        }, { where: { username } }),
        deleteUser: (parent, {username}, { models }) => models.User.destroy({ where: { username: username } }),
    }
}