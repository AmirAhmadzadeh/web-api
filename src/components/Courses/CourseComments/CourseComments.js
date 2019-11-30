import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import useComments from '../../../hooks/useInputState';
// import { Editor , EditorState } from 'draft-js' ; 
import Editor from '../../../components/Editor/Editor' ; 

const CourseComments = (props) => {

    const [comment, setComment] = useComments('');
    // const [editorState, setEditorState] = React.useState( EditorState.createEmpty() );
    function handleSendComment() {
        props.sendComment(comment)
    }
    useEffect(() => {
        ValidatorForm.addValidationRule('UserLogIn', (value) => {
            if (props.auth) return true;
            return false
        });
    });
    return (
        <div className="course__comments">
            {
                props.data.comments.map(c => {
                    return (
                        <React.Fragment>
                            <div className="comment">
                                {c.comment}
                            </div>
                            {
                                c.comments.map(childComment => {
                                    return <div className="comment comment__child"> {childComment.comment}</div>
                                })}
                        </React.Fragment>
                    )
                })}
            <section className="comment__put">
                <ValidatorForm onSubmit={handleSendComment}>
                    <Editor /> 
                    {/* <TextValidator
                            label="نظر شما"
                            onChange={(e) => setComment(e.target.value)}
                            name="comment"
                            value={comment}
                            validators={['required', 'UserLogIn']}
                            errorMessages={['لطفا بنویسید چیزی ', 'برای ارسال نظر خود وارد سایت شوید ']}
                            className="comment__textValidator"
                            multiline
                            rows={8}
                            variant="outlined"
                            placeholder="لطفا نظر خودت رو بنویس"
                    /> */}
                  
                    <Button
                        title="ارسال" variant="contained"
                        color="secondary"
                        disabled={props.auth ? false : true}
                        type="submit"
                        className="comment__submit">ارسال</Button>
                </ValidatorForm>
            </section>
        </div>
    );

}

export default CourseComments;