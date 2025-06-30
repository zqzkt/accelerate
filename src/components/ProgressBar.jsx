import * as React from "react";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// function LinearProgressWithLabel(props) {
//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//       <Box sx={{ width: '100%', mr: 1 }}>
//         <LinearProgress variant="determinate" {...props} />
//       </Box>
//       <Box sx={{ minWidth: 35 }}>
//         <Typography variant="body2" sx={{ color: 'white' }}>
//           {`${Math.round(props.value)}%`}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// LinearProgressWithLabel.propTypes = {
//   value: PropTypes.number.isRequired,
// };

// export default function LinearWithValueLabel({progress}) {

//   return (
//     <Box sx={{ width: '100%' }}>
//       <LinearProgressWithLabel value={progress} />
//     </Box>
//   );
// }

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box sx={{ flexGrow: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: "#222", // deeper contrast for dark mode
            transition: "all 0.4s ease",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#8bc34a", // brightened green
              borderRadius: 5,
              transition: "all 0.4s ease",
            },
          }}
        />
      </Box>
      <Typography
        variant="body2"
        sx={{ color: "#ccc", fontWeight: 500, minWidth: 45, textAlign: "right" }}
      >
        {`${Math.round(props.value)}%`}
      </Typography>
    </Box>
  );
}

export default function LinearWithValueLabel({ progress }) {
  return (
    <Box sx={{ width: "100%", px: 0, py: 1 }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}

