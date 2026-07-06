import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import type { SvgIconProps } from "@mui/material";

type TrendingIconProps = SvgIconProps & { trending: number };

export default function TrendingIcon({
  trending,
  ...props
}: TrendingIconProps) {
  return trending > 0 ? (
    <TrendingUpIcon color="success" {...props} />
  ) : trending < 0 ? (
    <TrendingDownIcon color="error" {...props} />
  ) : (
    <TrendingFlatIcon color="info" {...props} />
  );
}
