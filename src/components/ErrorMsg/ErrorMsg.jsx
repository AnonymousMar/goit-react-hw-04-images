import PropTypes from 'prop-types';

export default function ErrorMsg(message) {
   
    const textError = message.texterror;
    return (
        <div role="alert">
            <p>Sorry! Error: {`${textError}`}</p>
        </div>
    );
}

ErrorMsg.propTypes = {
    message: PropTypes.string,
};