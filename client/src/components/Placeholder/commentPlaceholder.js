import React from 'react';
import { Placeholder } from 'semantic-ui-react';

const CommentPlaceholder = () => {

    return (
        <Placeholder fluid>
        <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
        </Placeholder.Header>
        </Placeholder>
    );
};

export default CommentPlaceholder;