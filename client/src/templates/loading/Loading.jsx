import { Box, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function Loading() {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((oldProgress) => {
				if (oldProgress === 100) {
					return 0;
				}
				const diff = Math.random() * 10;
				return Math.min(oldProgress + diff, 100);
			});
		}, 500);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<Box sx={{ width: "100%", position: "fixed", top: "64px", left: 0 }}>
			<LinearProgress variant="determinate" value={progress} color="info" />
		</Box>
	);
}
