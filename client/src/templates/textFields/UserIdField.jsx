import { TextField } from "@mui/material";
const UserIdField = ({ responseInfo, data, handleOnchange }) => {
	return (
		<TextField
			error={
				Boolean(responseInfo.data?.error?.userId) ||
				responseInfo.data?.isError ||
				responseInfo.data?.duplication
			}
			variant="outlined"
			fullWidth
			id="userId"
			label="Student or Employee id"
			name="userId"
			autoComplete="userId"
			value={data.userId}
			onChange={handleOnchange}
			disabled={responseInfo.isLoading}
			aria-describedby="userId-error-text"
		/>
	);
};

export default UserIdField;
