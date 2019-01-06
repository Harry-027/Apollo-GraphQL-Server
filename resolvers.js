import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import { PubSub } from 'graphql-subscriptions'
import { requiresAuth, requiresAdmin } from './permissions';

const USER_ADDED = 'USER_ADDED';

export default {
    Subscription: {
        userAdded: {
            subscribe: () => pubsub.asyncIterator(USER_ADDED)
        }
    },
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
        register: async (parent, args, { models }) => {
            const user = args;
            user.password = await bcrypt.hash(user.password, 12);
            return models.User.create(user)
        },
        createUser: async (parent, args, { models }) => {
            const user = args;
            user.password = 'ok';
            const userAdded = await models.User.create(user);
            pubsub.publish(USER_ADDED, {userAdded});
        },
        login: async (parent, { email, password }, { models, SECRET }) => {
            const user = await models.User.findOne({ where: { email } });
            if (!user) {
                throw new Error('No User found');
            }

            const valid = bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error('Incorrect Password');
            }

            const token = jwt.sign({
                user: _.pick(user, ['id', 'username'])
            }, SECRET, {
                    expiresIn: '1y'
                });

            return token;
        },
        updateUser: (parent, { username, newUserName }, { models }) => models.User.update({
            username: newUserName
        }, { where: { username } }),
        deleteUser: (parent, { username }, { models }) => models.User.destroy({ where: { username: username } }),
        createBoard: requiresAuth.createResolver((parent, args, { models }) => models.Board.create(args)),
        createSuggestion: (parent, args, { models }) => models.Suggestion.create(args),
    }
}