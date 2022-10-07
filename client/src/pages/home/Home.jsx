import "./home.css";
import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import bgImage from "../../assets/images/school-management.png";
import mainBgImage from "../../assets/images/pngegg1.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const navigation = useNavigate();
	return (
		<Paper
			sx={{
				m: 2,
				p: 3,
				mt: "80px",
				backgroundImage: `url(${mainBgImage})`,
				backgroundPosition: "center",
				backgroundRepeat: "repeat",
				position: "relative",
			}}
			elevation={2}
		>
			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<Stack height="100%" justifyContent="center">
						<Typography
							className="shadow2"
							variant="h3"
							gutterBottom
							fontWeight={700}
							textTransform="uppercase"
							color="#515983"
						>
							Welcome to student management app
						</Typography>
						<Typography variant="body1" gutterBottom color="#45617c">
							Committed To Lifelong Learning In A Caring Environment.
						</Typography>
						<Box mt={3}>
							<Button
								onClick={() => navigation("/dashboard")}
								size="large"
								variant="outlined"
								endIcon={<ArrowForward />}
								className="rounded-btn"
							>
								Get started
							</Button>
						</Box>
					</Stack>
				</Grid>
				<Grid item xs={12} md={6}>
					<img className="bg-img" src={bgImage} alt="background" />
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Home;
