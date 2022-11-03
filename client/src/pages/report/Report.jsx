import { useForm, ValidationError } from "@formspree/react";
import {
	Box,
	Button,
	Chip,
	Divider,
	FormHelperText,
	Grid,
	Link,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { Security, Send, MailOutline } from "@mui/icons-material";
import { useEffect, useState } from "react";
import MsgSent from "./MsgSent";
import { toast } from "react-toastify";

const initialInfo = { name: "", email: "", message: "" };
const Report = () => {
	document.title = "Student Management | Report";
	const [state, handleSubmit] = useForm("xknepvdb");
	const [inputs, setInputs] = useState({ ...initialInfo, event: null });
	const [errors, setErrors] = useState(initialInfo);

	const handleOnChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	useEffect(() => {
		let errorConditions = !errors.name && !errors.email && !errors.message;
		let inputConditions = inputs.name && inputs.email && inputs.message;
		if (errorConditions && inputConditions) {
			toast.success("Message sent");
			handleSubmit(inputs.event);
		}
	}, [errors]);

	const validationFields = () => {
		inputs.name
			? setErrors((prev) => ({ ...prev, name: "" }))
			: setErrors((prev) => ({ ...prev, name: "Name is required" }));
		inputs.email
			? setErrors((prev) => ({ ...prev, email: "" }))
			: setErrors((prev) => ({ ...prev, email: "Email is required" }));
		inputs.message
			? setErrors((prev) => ({ ...prev, message: "" }))
			: setErrors((prev) => ({ ...prev, message: "Message is required" }));
	};

	const manageSubmit = (e) => {
		e.preventDefault();
		setInputs((prev) => ({ ...prev, event: e }));
		validationFields();
	};

	if (state.succeeded) {
		return <MsgSent />;
	}

	return (
		<Box sx={{ m: 3, mt: "88px" }}>
			<Paper sx={{ maxWidth: "650px", m: "auto", p: 3 }} elevation={2}>
				<Typography variant="h5" mb={1}>
					Report a Problem
				</Typography>
				<Divider textAlign="center" sx={{ mb: 3 }}>
					<Chip label="Problem Details" />
				</Divider>
				<form onSubmit={manageSubmit}>
					<Grid container spacing={2}>
						<Grid item md={6} xs={12}>
							<TextField
								name="name"
								id="name"
								fullWidth
								label="Name"
								value={inputs.name}
								onChange={handleOnChange}
								disabled={state.submitting}
								error={Boolean(errors.name)}
							/>
							{errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
							<ValidationError prefix="Name" field="name" errors={state.errors} />
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								name="email"
								id="email"
								fullWidth
								type="email"
								label="Email address"
								value={inputs.email}
								onChange={handleOnChange}
								disabled={state.submitting}
								error={Boolean(errors.email)}
							/>
							{errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
							<ValidationError prefix="Email" field="email" errors={state.errors} />
						</Grid>
						<Grid item xs={12}>
							<TextField
								name="message"
								id="message"
								rows={4}
								fullWidth
								multiline
								label="Message here"
								value={inputs.message}
								onChange={handleOnChange}
								disabled={state.submitting}
								error={Boolean(errors.message)}
							/>
							{errors.message && (
								<FormHelperText error>{errors.message}</FormHelperText>
							)}
							<ValidationError
								prefix="Message"
								field="message"
								errors={state.errors}
							/>
						</Grid>
					</Grid>
					<Button
						sx={{ my: 2 }}
						type="submit"
						endIcon={<Send />}
						variant="contained"
						disabled={state.submitting}
					>
						Send
					</Button>
					<Divider sx={{ mt: 2 }}>
						<Chip label="Note That" />
					</Divider>
					<Box sx={{ mt: 2 }}>
						<Stack direction="row" gap={1}>
							<Security fontSize="small" />
							<Typography>Your identity will be kept secret with us.</Typography>
						</Stack>

						<Stack direction="row" gap={1} sx={{ mt: 1 }} alignItems="center">
							<MailOutline fontSize="small" />
							<Typography>
								Sent mail for serious issues or personal issues-{" "}
							</Typography>
							<Link
								href="mailto: takecare@diu.edu.bd?subject=Personal problem"
								underline="hover"
							>
								here.
							</Link>
						</Stack>
					</Box>
				</form>
			</Paper>
		</Box>
	);
};

export default Report;
