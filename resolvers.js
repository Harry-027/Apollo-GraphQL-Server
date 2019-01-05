export default {
    User: {
        boards: (parent, args, { models }) => models.Board.findAll({
            where: {
                owner: parent.id
            }
        }),
        suggestions: (parent, args, { models }) => models.suggestions.findAll({
            where: {
                creatorId: parent.id
            }
        }),
    },

    Board: {
        suggestions: (parent, args, { models }) => models.Suggestion.findAll({
            where: {
                boardId: parent.id
            }
        }),
    },

    Suggestion: {
        creatorUsername: async (parent, args, { models }) => {
            const { username } = await models.User.findOne({
                where: { id: parent.creatorId }
            });
            return username;
        }
    },

    Query: {
        allUsers: (parent, args, { models }) => models.User.findAll(),
        getUser: (parent, { username }, { models }) => models.User.findOne({ where: { username } }),
        userBoards: (parent, { owner }, { models }) => models.Board.findAll({ where: { owner } }),
        userSuggestions: (parent, { creatorId }, { models }) => models.Suggestion.findAll({ where: { creatorId } }),
    },

    Mutation: {
        createUser: (parent, args, { models }) => models.User.create(args),
        updateUser: (parent, { username, newUserName }, { models }) => models.User.update({
            username: newUserName
        }, { where: { username } }),
        deleteUser: (parent, { username }, { models }) => models.User.destroy({ where: { username: username } }),
        createBoard: (parent, args, { models }) => models.Board.create(args),
        createSuggestion: (parent, args, { models }) => models.Suggestion.create(args),
    }
}