import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";
import { api, endpoints } from "../../apiService";
import Button from "@mui/material/Button";
import styles from "./NewPost.module.css";


const NewPost = () => {
	const [processing, setProcessing] = useState(false);
	const [serverError, setServerError] = useState("");
	const [form, setForm] = useState({
		description : "",
	});
	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm((prevData) => ({
		...prevData,
		[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
		setProcessing(true);
		// await verifyTokenExpirationTime();
		const response = await api.put(
			endpoints.getUsersEndpoint + Cookies.get("myUserName") + "/",
			form
		);
		console.log(response.data);
		} catch (error) {
		console.log(error);
		}
		setProcessing(false);
	};
	
 return(
	<div className={styles.pageContent}>
      <div className={styles.profileContainer}>
		<form onSubmit={handleSubmit}>
			<div className={styles.imageComponent}>
				<div className={styles.postPlaceholder}></div>
			</div>
			<div className={styles.textComponent}>
				<TextField
				required
				label="Descrição"
				variant="outlined"
				placeholder="Escreva aqui"
				onChange={handleChange}
				value={form.description}
				sx={{ width: "100%" }}
				/>
			</div>
			<div className={styles.buttonComponent}>
				<Button
				variant="contained"
				type="submit"
				disabled={processing}
				sx={{ width: "300px", height: "3rem" }}
				>
				{processing && <CircularProgress color="inherit" size="2rem" />}
				{!processing && <>POSTAR</>}
				</Button>
			</div>
		</form>
	  </div>
	</div>
 );
};

export default NewPost;
