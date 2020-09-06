import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
/* Components */
import { Icon, Image, Transition, Form, TextArea, Confirm, Placeholder } from "semantic-ui-react";
import { Link } from "react-router-dom";
import FavorisAndLikes from "../../../containers/LikeAndFavoris";

/* Style */
import "./comments.scss";
import CommentPlaceholder from "../../Placeholder/commentPlaceholder";

const Comments = (props) => {
    const {
        user,
        currentUser,
        isLogged,
        record,
        commentsList,
        fetchCommentsByRecord,
        commentInput,
        commentSubmit,
        deleteComment,
        updateComment,
        updateCommentInput,
        commentEditInputValue,
        commentInputValue,
        commentSubmitLoading,
        fetchCommentLoading,
        setRecordIdComment, // redux
        iRecordCommentIdSelect, // store
    } = props;

    const [showComments, setShowComments] = useState(false);
    const [commentEditId, setCommentEditId] = useState(0);
    const [commentEditStatus, setCommentEditStatus] = useState(false);
    const [deleteCommentId, setDeleteCommentId] = useState(0);
    const [confirm, setConfirm] = useState(false);
    const commentsListRef = useRef(null);
    
    const handdleInputChange = (e) => {
        commentInput(e.target.value);
    };

    const handdleEditInputChange = (e) => {
        updateCommentInput(e.target.value);
    };

    const handdleSubmit = (e) => {
        commentSubmit(record.id);
        updateScrollAfterSubmit();
    };

    const handdleEditSubmit = (e, commentId) => {
        updateComment(commentId);
        setCommentEditStatus(false);
    };

    const handdleDeleteComment = () => {
        setConfirm(false);
        deleteComment(deleteCommentId);
    };

    const handleShowComments = () => {
        setShowComments(!showComments);
        if(!showComments) {
            fetchCommentsByRecord(record.id);
        }
        
        setRecordIdComment(record.id);
    };

    useEffect(() => {
        if (iRecordCommentIdSelect !== record.id) {
            setShowComments(false);
        }
    }, [iRecordCommentIdSelect, record.id]);

    const updateScrollAfterSubmit = () => {
        if(commentsListRef.current) {
            const scrollY = commentsListRef.current.scrollHeight;
            commentsListRef.current.scrollTo(0, scrollY);
        }
    };

    return (
        <div className="social">
            <div className="social-interraction">
                <div className="social-nbrlike">
                    <FavorisAndLikes isLogged={isLogged} record={record} />
                </div>
                <div className={`social-nbrcomment${showComments ? "--active" : ""}`} onClick={handleShowComments}>
                    {/* <Icon name="comments" /> */}
                    {`${record && record.commentCount} comment${record.commentCount > 1 ? "s" : ""}`}  
                </div>
            </div>
            <Transition visible={showComments} animation='fade' duration={500}>
                <>
                <div className="social-comment_feed">
                { showComments && isLogged && record &&
                    <>
                        <Form onSubmit={handdleSubmit}>
                            <TextArea 
                            value={commentInputValue}
                            onChange={handdleInputChange}
                            type="text" 
                            size="mini" 
                            placeholder="Nouveau commentaire.."
                            rows="1.5"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handdleSubmit();
                                    e.preventDefault();
                                }
                            }}
                            />
                        </Form>
                        <Icon 
                        name='add' 
                        inverted 
                        circular 
                        link 
                        className="social-comment_add" 
                        onClick={handdleSubmit}
                        />
                    </>
                }
                </div>

                <div className="social-comments" ref={commentsListRef}>
                    <Confirm
                    className="delete-irecords"
                    open={confirm}
                    onCancel={() => setConfirm(false)}
                    onConfirm={handdleDeleteComment}
                    content="Vous souhaitez vraiment supprimer votre commentaire ?"
                    size="mini"
                    dimmer="blurring"
                    />

                    { fetchCommentLoading ? 
                        <CommentPlaceholder />
                    : 
                     showComments && commentsList && commentsList.map(comment => (
                    
                        <div className="social-comment" key={comment.id}>
                            <div className="social-comment_containerLeft">
                                <Link to={`/user/${comment.user.slug}`}>
                                    <Image
                                    className="social-comment_avatar"
                                    avatar
                                    size="large"
                                    src={
                                        comment.user.avatarUrl == null
                                        ? "https://docs.atlassian.com/aui/9.0.0/docs/images/avatar-person.svg"
                                        : `${process.env.REACT_APP_FILES_URL}/${comment.user.avatarUrl}`
                                    }
                                    />
                                </Link>
                                { isLogged && comment.user.id === currentUser.id &&
                                    <div className="social-comment_actions">
                                        <Icon name={(commentEditStatus && commentEditId === comment.id)  ? "undo" : "edit"} onClick={() => {
                                            setCommentEditId(comment.id);
                                            updateCommentInput(comment.text)
                                            setCommentEditStatus(!commentEditStatus);
                                            commentInput("");
                                        }}/>
                                        <Icon name="delete" onClick={() => {
                                            setConfirm(true);
                                            setDeleteCommentId({
                                                commentId: comment.id,
                                                recordId: record.id,
                                            });
                                        }} />

                                    </div>
                                }
                            </div>
                            <div className="social-comment_containerRight">
                                <div className="social-comment_wrapper">
                                    <div className="social-comment_name">{comment.user.firstname} {comment.user.lastname} {comment.user.isAdmin && <Icon name="check circle" />}</div>
                                    <div className="social-comment_date">{moment(comment.createdAt).fromNow()}</div>
                                </div>
                                <div className="social-comment_text">
                                    { comment.id === commentEditId && commentEditStatus ? 
                                    <div className="social-comment_edit">
                                        <Form onSubmit={(e) => handdleEditSubmit(e, comment.id)}>
                                            <TextArea 
                                            value={commentEditInputValue}
                                            onChange={handdleEditInputChange}
                                            type="text" 
                                            size="mini" 
                                            placeholder="Nouveau commentaire.."
                                            spellCheck={false} 
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    handdleEditSubmit(e, comment.id);
                                                    e.preventDefault();
                                                }
                                            }}
                                            />
                                        </Form>
                                        <Icon 
                                        name='check' 
                                        inverted 
                                        circular 
                                        link 
                                        className="social-comment_save"  
                                        onClick={(e) => handdleEditSubmit(e, comment.id)}
                                        />
                                    </div>
                                    :
                                        comment.text
                                    }
                                </div>

                            </div>
                        </div>
                        ))
                        }
                    </div>
                </>
            </Transition>
        </div>
    );
};

export default Comments;
