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
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ flexGrow: 1 }}>
        <LinearProgress
          variant="determinate"
          {...props}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: "#333",
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#7bae37",
              borderRadius: 5,
            },
          }}
        />
      </Box>
      <Typography variant="body2" sx={{ color: "#e0e0e0", minWidth: 40 }}>
        {`${Math.round(props.value)}%`}
      </Typography>
    </Box>
  );
}
export default function LinearWithValueLabel({ progress }) {
  return (
    <Box sx={{ width: "100%", pl: 0, pr: 1, pb: 1, pt: 1}}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
