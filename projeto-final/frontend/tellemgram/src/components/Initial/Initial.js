import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import React from 'react';


const Initial = () => {

	return (
        <div className="initial">
            <h1>Imagens postadas</h1>

			<div style={{ textAlign: 'center' }}>
			<AddPhotoAlternateIcon sx={{ fontSize: 48, color: "#995C99" }} />
				<label>
					Sem imagens no seu perfil.
					<br />
					Adicione uma foto!
				</label>
			</div>

		</div>
	);
}