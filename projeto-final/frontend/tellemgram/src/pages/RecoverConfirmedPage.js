import React from 'react';
import MessageLayout from "../components/MessageLayout/MessageLayout"
import RecoverConfirmed from '../components/RecoverConfirmed/RecoverConfirmed';

/*Tela de confirmacao de recuperacao de senha. Assim como confirmacao
de cadastro, ela tambem deve estar associada ao e-mail.
*/

const RecoverConfirmedPage = () =>{

    return (
        <MessageLayout>
            <RecoverConfirmed />
        </MessageLayout>
    )
}


export default RecoverConfirmedPage;