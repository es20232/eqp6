import React from 'react';
import SmallLayout from '../components/SmallLayout/SmallLayout';
import RecoverConfirmed from '../components/RecoverConfirmed/RecoverConfirmed';

/*Tela de confirmacao de recuperacao de senha. Assim como confirmacao
de cadastro, ela tambem deve estar associada ao e-mail.
*/

const RecoverConfirmedPage = () =>{

    return (
        <SmallLayout>
            <RecoverConfirmed />
        </SmallLayout>
    )
}


export default RecoverConfirmedPage;