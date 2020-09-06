import axios from "axios";
import { httpClient } from "../../utils";
import {
  SEND_IRECORDS_RECORDED,
  FETCH_ALL_RECORDS,
  sendIrecordSuccessIrecordsPage,
  sendIrecordSuccessUserProfile,
  sendIrecordSuccessHomePage,
  sendIrecordsError,
  fetchAllRecordsSuccess,
  fetchAllRecordsError,
  FETCH_EXPRESSIONS_USER,
  fetchAllExpressionsSuccess,
  fetchAllExpressionsError,
  DELETE_IRECORD,
  deleteIrecordSuccessIrecordsPage,
  deleteIrecordSuccessUserProfile,
  deleteIrecordError,
  deleteIrecordSuccessHomePage,
} from "../actions/irecordsActions";

import {
  COMMENT_SUBMIT,
  commentSubmitSuccess,
  commentSubmitError,
  DELETE_COMMENT,
  deleteCommentSuccess,
  deleteCommentError,
  UPDATE_COMMENT,
  updateCommentSuccess,
  updateCommentError,
  FETCH_COMMENTS_BY_RECORD,
  fetchCommentsByRecordSuccess,
  fetchCommentsByRecordError,
  setCountComment,
} from "../actions/commentActions";

export const irecordsMiddleware = (store) => (next) => (action) => {
  next(action);
  switch (action.type) {
    case SEND_IRECORDS_RECORDED:
      const user = store.getState().user.currentUser;
      let translationId = store.getState().irecords.languageId;
      translationId = translationId.toString();

      fetch(action.payload)
        .then((audio) => audio.blob())
        .then((blob) => {
          console.log(blob);
          const file = new File([blob], "record.mp3", {
            type: blob.type,
          });

          const formData = new FormData();
          formData.append("record", file);
          formData.append("translation_id", translationId);

          httpClient
            .post(
              {
                url: `/users/${user.id}/record`,
                data: formData,
                headers: { "Content-Type": `multipart/form-data` },
              },
              store
            )
            .then((res) => {
              const { record } = res.data.data;
              record.user = user;

              const userInfo = store.getState().user.userSlugInfos;
              const irecords = store.getState().irecords;
              const statistics = store.getState().statisticsHomeReducer;

              if (userInfo && userInfo.records) {
                removeOldRecord(record, userInfo.records);
                store.dispatch(
                  sendIrecordSuccessUserProfile([record, ...userInfo.records])
                );
              } else if (irecords && irecords.allRecordsList) {
                removeOldRecord(record, irecords.allRecordsList);
                store.dispatch(
                  sendIrecordSuccessIrecordsPage([
                    record,
                    ...irecords.allRecordsList,
                  ])
                );
              } else if (statistics && statistics.bestIrecords) {
                removeOldRecord(record, statistics.bestIrecords);
                store.dispatch(
                  sendIrecordSuccessHomePage([
                    record,
                    ...statistics.bestIrecords,
                  ])
                );
              }
            })
            .catch((err) => {
              console.log(err);
              store.dispatch(sendIrecordsError());
            });
        });

      break;
    case FETCH_ALL_RECORDS: {
      httpClient
        .get({
          url: "/records",
        })
        .then((res) => {
          const records = res.data.data;
          const recordsWithType = records.map((record) => {
            return {
              ...record,
              type: "audio",
            };
          });
          store.dispatch(fetchAllRecordsSuccess(recordsWithType));
        })
        .catch((err) => {
          store.dispatch(
            fetchAllRecordsError(
              "Un problème est survenue lors du chargement de la liste des iRecords"
            )
          );
          console.error(err);
        });
      break;
    }
    case FETCH_EXPRESSIONS_USER:
      httpClient
        .get(
          {
            url: `/expressions`,
          },
          store
        )
        .then((res) => {
          const expressions = res.data.data;
          store.dispatch(fetchAllExpressionsSuccess(expressions));
        })
        .catch((err) => {
          store.dispatch(
            fetchAllExpressionsError(
              "Un problème est survenue lors du chargement de la liste des expressions"
            )
          );
          console.error(err);
        });
      break;

    case DELETE_IRECORD:
      const { id } = store.getState().user.currentUser;

      httpClient
        .delete(
          {
            url: `/users/${id}/record/${action.payload}`,
          },
          store
        )
        .then(() => {
          const userInfo = store.getState().user.userSlugInfos;
          const irecords = store.getState().irecords;
          const statistics = store.getState().statisticsHomeReducer;

          const record = { id: action.payload };

          if (userInfo && userInfo.records && userInfo.records.length) {
            removeOldRecord(record, userInfo.records);
            store.dispatch(deleteIrecordSuccessUserProfile(userInfo.records));
          } else if (
            irecords &&
            irecords.allRecordsList &&
            irecords.allRecordsList.length
          ) {
            removeOldRecord(record, irecords.allRecordsList);
            store.dispatch(
              deleteIrecordSuccessIrecordsPage(irecords.allRecordsList)
            );
          } else if (statistics && statistics.bestIrecords) {
            removeOldRecord(record, statistics.bestIrecords);
            store.dispatch(
              deleteIrecordSuccessHomePage(statistics.bestIrecords)
            );
          }
        })
        .catch(() => {
          store.dispatch(deleteIrecordError());
        });
      break;

    case COMMENT_SUBMIT:
      const { commentInputValue, allRecordsList } = store.getState().irecords;

      const recordId = action.payload;

      httpClient
        .post(
          {
            url: `/comments/${recordId}`,
            data: {
              text: commentInputValue,
            },
          },
          store
        )
        .then((res) => {
          /* A refacto plus tard en une seule fonction ne vous inquiètez pas ! */

          const {
            currentUser,
            userSlugInfos,
            feedUser,
          } = store.getState().user;

          const allRecordsListUpdateCount = allRecordsList.map((record) => {
            if (record.id === recordId) {
              return {
                ...record,
                commentCount: record.commentCount + 1,
              };
            }
            return record;
          });

          const userSlugInfosUpdateCount =
            userSlugInfos.records &&
            userSlugInfos.records.map((record) => {
              if (record.id === recordId) {
                return {
                  ...record,
                  commentCount: record.commentCount + 1,
                };
              }
              return record;
            });

          const feedUserUpdateCount = feedUser.map((feed) => {
            if (feed.id === recordId) {
              return {
                ...feed,
                commentCount: feed.commentCount + 1,
              };
            }
            return feed;
          });

          store.dispatch(
            setCountComment({
              userSlugInfos: userSlugInfos.records
                ? userSlugInfosUpdateCount
                : [],
              feedUser: feedUserUpdateCount,
            })
          );

          store.dispatch(
            commentSubmitSuccess({
              commentsList: [
                {
                  id: res.data.data.id,
                  text: commentInputValue,
                  user: {
                    id: currentUser.id,
                    firstname: currentUser.firstname,
                    lastname: currentUser.lastname,
                    slug: currentUser.slug,
                    avatarUrl: currentUser.avatarUrl,
                  },
                },
              ],
              allRecordsList: allRecordsListUpdateCount,
            })
          );
        })
        .catch((err) => {
          console.error(err);
          store.dispatch(commentSubmitError());
        });

      break;
    case DELETE_COMMENT:
      httpClient
        .delete(
          {
            url: `/comments/${action.payload.commentId}`,
          },
          store
        )
        .then((res) => {
          /* Pareil ici, à refacto plus tard en une seule fonction ne vous inquiètez pas ! */

          const { commentsList, allRecordsList } = store.getState().irecords;
          const { userSlugInfos, feedUser } = store.getState().user;

          const allRecordsListUpdateCount = allRecordsList.map((record) => {
            if (record.id === action.payload.recordId) {
              return {
                ...record,
                commentCount: record.commentCount - 1,
              };
            }
            return record;
          });

          const userSlugInfosUpdateCount = userSlugInfos.records.map(
            (record) => {
              if (record.id === action.payload.recordId) {
                return {
                  ...record,
                  commentCount: record.commentCount - 1,
                };
              }
              return record;
            }
          );

          const feedUserUpdateCount = feedUser.map((feed) => {
            if (feed.id === action.payload.recordId) {
              return {
                ...feed,
                commentCount: feed.commentCount - 1,
              };
            }
            return feed;
          });

          store.dispatch(
            setCountComment({
              userSlugInfos: userSlugInfosUpdateCount,
              feedUser: feedUserUpdateCount,
            })
          );

          const deleteComment = commentsList.filter(
            (comment) => comment.id !== action.payload.commentId
          );

          store.dispatch(
            deleteCommentSuccess({
              deleteComment: deleteComment,
              allRecordsList: allRecordsListUpdateCount,
            })
          );
        })
        .catch((err) => {
          console.error(err);
          store.dispatch(deleteCommentError());
        });

      break;
    case UPDATE_COMMENT:
      const { commentEditInputValue, commentsList } = store.getState().irecords;
      const userConnect = store.getState().user.currentUser;
      httpClient
        .post(
          {
            url: `/comments/update/${action.payload}`,
            data: {
              text: commentEditInputValue,
            },
          },
          store
        )
        .then((res) => {
          const updateComment = commentsList.map((comment) => {
            if (comment.id === action.payload) {
              return {
                id: action.payload,
                text: commentEditInputValue,
                user: {
                  id: userConnect.id,
                  firstname: userConnect.firstname,
                  lastname: userConnect.lastname,
                  slug: userConnect.slug,
                  avatarUrl: userConnect.avatarUrl,
                },
              };
            }
            return comment;
          });
          store.dispatch(updateCommentSuccess(updateComment));
        })
        .catch((err) => {
          console.error(err);
          store.dispatch(updateCommentError());
        });
      break;
    case FETCH_COMMENTS_BY_RECORD:
      httpClient
        .get({
          url: `/comments/${action.payload}`,
        })
        .then((res) => {
          store.dispatch(fetchCommentsByRecordSuccess(res.data.data));
        })
        .catch((err) => {
          console.error(err);
          store.dispatch(fetchCommentsByRecordError());
        });

      break;
    default:
      return;
  }
};

function removeOldRecord(record, recordList) {
  const oldRecordIndex = recordList.findIndex(
    (currRecord) => currRecord.id === record.id
  );

  if (oldRecordIndex > -1) {
    recordList.splice(oldRecordIndex, 1);
  }
}
