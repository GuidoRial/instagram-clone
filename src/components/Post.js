import React from "react";

function Post({ id, username, img, caption, userId }) {
    return (
        <div className="post" key={id}>
            <div className="post-header">
                <div className="user-and-image">
                    <img
                        className="post-user-avatar"
                        alt="user-avatar"
                    />
                    <p>{username}</p>
                </div>
                <div>
                    <i className="fas fa-ellipsis-h" />
                </div>
            </div>
            <div className="post-img-container">
                <img className="post-img" src={img} alt="post" />
            </div>
            <div className="post-footer">
                <div className="interactions">
                    <div className="left">
                        <i className="far fa-heart interaction-icons" />
                        <i className="far fa-comment interaction-icons" />
                        <i className="fas fa-paper-plane interaction-icons" />
                    </div>
                    <div className="right">
                        <i className="far fa-bookmark interaction-icons" />
                    </div>
                </div>
                <div className="amount-of-likes">66 likes</div>
                <p className="user-and-caption">
                    <span>{username}</span> {caption}
                </p>

                <form className="comment-form">
                    <i className="far fa-smile-wink" />
                    <input type="text" placeholder="Add a comment..." />
                    <button className="post-button">Post</button>
                </form>
            </div>
        </div>
    );
}

export default Post;
