import io from 'socket.io-client';
import { updateTokenExp, updateAccessToken } from '../actions/userActions';
import { httpClient } from '../../utils';
import { toast } from "react-toastify";
import {
    SOCKET_CONNECT,
    SOCKET_EMIT_MESSAGE,
    SOCKET_EMIT_TYPING,
    FETCH_ALL_THREADS,
    fetchAllThreadsSuccess,
    fetchAllThreadsError,
    FETCH_ALL_MESSAGES,
    fetchAllMessagesSuccess,
    fetchAllMessagesError,
    setMessageInAllMessages,
    setUserIsTyping,
    updateUnreadCount,
    updateAllThreadsMessages,
} from '../actions/chatActions';

let socket;
let typing = {};

export const chatMiddleware = (store) => (next) => (action) => {

    switch (action.type) {
        case SOCKET_CONNECT:
            getAccessToken(store).then(accessToken => {
                socket = io(process.env.REACT_APP_API_URL, {
                    forceNew: true,
                    query: {
                        token: accessToken,
                    }
                });

                socket.on("message", ({ messageId, authorId, authorFirstname, authorLastname, authorAvatarUrl, text, recipientAvatarUrl }) => {
                    const currentUsr = store.getState().user.currentUser;
                    const contact = store.getState().chatReducer.allMessages.contact;
                    if (contact && (authorId == contact.id || authorId == currentUsr.id)) {
                        store.dispatch(setMessageInAllMessages({
                            id: Date.now(),
                            createdAt: new Date(),
                            text: text,
                            sender: {
                                id: authorId,
                                avatarUrl: authorAvatarUrl,
                            },
                            recipient: {
                                avatarUrl: recipientAvatarUrl
                            }
                        }));

                        if (authorId == contact.id) {
                            socket.emit("read", messageId);
                        }

                        store.dispatch(setUserIsTyping({}));
                    } else {
                        const { unreadCount, allThreads } = store.getState().chatReducer;
                        toast.info(`Nouveau message de ${authorFirstname}`);
                        if (unreadCount < 99) {
                            store.dispatch(updateUnreadCount(unreadCount + 1));
                        }

                        if (allThreads) {
                            const newThreads = [];
                            for (const thread of allThreads) {
                                newThreads.push({ ...thread });
                            }

                            const threadIndex = newThreads.findIndex(thread => thread.contact.id == authorId);

                            if (threadIndex > -1) {
                                newThreads[threadIndex].messages.push({ text, sender: { id: authorId } });
                                newThreads[threadIndex].latest = new Date();
                            } else {
                                newThreads.push({
                                    contact: {
                                        id: authorId,
                                        avatarUrl: authorAvatarUrl,
                                        firstname: authorFirstname,
                                        lastname: authorLastname
                                    }, messages: [{ text, sender: { id: authorId } }], latest: new Date()
                                });
                            }
                            store.dispatch(updateAllThreadsMessages(newThreads));
                        }
                    }
                });

                socket.on("typing", ({ authorId, authorFirstname }) => {
                    const contactId = store.getState().chatReducer.socketRecipient.id;
                    console.log({ contactId, authorId });
                    if (contactId && authorId == contactId) {
                        store.dispatch(setUserIsTyping({
                            authorId,
                            authorFirstname,
                            typing: true,
                        }));

                        if (typing[contactId]) {
                            clearTimeout(typing[contactId]);
                        }
                        typing[contactId] = setTimeout(() => {
                            store.dispatch(setUserIsTyping({}));
                            delete typing[contactId];
                        }, 1800);
                    }
                });

                socket.on("disconnect", () => {
                    if (store.getState().user) {
                        store.dispatch({ type: SOCKET_CONNECT });
                    }
                });

                socket.on("error", err => {
                    console.log(err);
                });

                socket.on("serverError", err => {
                    console.log(err);
                });
            }).catch(err => {
                console.log(err);
            })
            break;
        case SOCKET_EMIT_MESSAGE:
            if (socket) {

                socket.emit("message", action.payload);
            }
            break;
        case SOCKET_EMIT_TYPING:
            if (socket) {
                socket.emit("typing", action.payload);
            }
            break;
        case FETCH_ALL_THREADS:

            const { currentUser } = store.getState().user;
            httpClient.get({
                url: `/users/${currentUser.id}/threads`,
            }, store)
                .then(res => {
                    const threads = res.data.data;
                    store.dispatch(fetchAllThreadsSuccess(threads));

                    const unreadCount = threads.reduce((count, thread) => {
                        if (count < 99)
                            return count + thread.messages.filter(message => message.recipient.id == currentUser.id && !message.read).length;
                    }, 0);

                    store.dispatch(updateUnreadCount(unreadCount));

                    console.log("res", res);
                })
                .catch(err => {
                    console.error("err", err);
                    store.dispatch(fetchAllThreadsError());
                });
            break;

        case FETCH_ALL_MESSAGES:

            const currUser = store.getState().user.currentUser;
            const { socketRecipient, unreadCount } = store.getState().chatReducer;

            httpClient.get({
                url: `/users/${currUser.id}/threads/${socketRecipient.id}`,
            }, store)
                .then(res => {
                    const thread = res.data.data;
                    store.dispatch(fetchAllMessagesSuccess(thread));
                    store.dispatch(updateUnreadCount(unreadCount - thread.newMessages))
                    console.log("res", res);
                })
                .catch(err => {
                    console.error("err", err);
                    store.dispatch(fetchAllMessagesError());
                });
            break;
        default:
            break;
    };
    next(action);
};

function getAccessToken(store) {
    return new Promise((resolve, reject) => {
        const user = store.getState().user;
        const { refreshToken, accessTokenExp } = user;
        let { accessToken } = user;

        if (accessToken && accessTokenExp >= Date.now()) return resolve(accessToken);

        if (!refreshToken) return reject(new Error("Le token ne peut être renouvelé en l'absence de refreshToken"));

        httpClient.post({
            url: "/auth/refresh",
            data: { refreshToken: refreshToken },
        }).then(response => {
            accessToken = response.data.data.accessToken;
            store.dispatch(updateTokenExp());
            store.dispatch(updateAccessToken(accessToken));

            resolve(accessToken);
        }).catch(err => {
            reject(err);
        });
    });
};