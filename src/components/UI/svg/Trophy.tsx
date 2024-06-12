import * as React from "react"
import Svg, { SvgProps, Circle, Path } from "react-native-svg"
export default function Trophy(props: SvgProps) {
  return (
    <Svg
      width={29}
      height={28}
      fill="none"
      {...props}
    >
      <Circle
        cx={14.5}
        cy={14}
        r={13}
        fill="#13B351"
        stroke="#D8FFE0"
        strokeWidth={2}
      />
      <Path
        fill="#fff"
        d="M7.496 11.998a3.006 3.006 0 0 0 2.61 2.974 4.503 4.503 0 0 0 3.895 3.5v1.496h-1.997a2 2 0 0 0-2 2v.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-.5a2 2 0 0 0-2-2h-2.003v-1.495a4.502 4.502 0 0 0 3.894-3.499 2.996 2.996 0 0 0 2.601-2.97V10.5a1.5 1.5 0 0 0-1.5-1.5h-.995a2 2 0 0 0-2-1.998h-5a2 2 0 0 0-2 1.998H8.995a1.5 1.5 0 0 0-1.5 1.5v1.498ZM8.996 10h1.005v3.934a2.006 2.006 0 0 1-1.505-1.936V10.5a.5.5 0 0 1 .5-.5Zm10.005 0h.995a.5.5 0 0 1 .5.5v1.505c0 .929-.635 1.71-1.495 1.932V10Zm-1-.998V14a3.5 3.5 0 0 1-6.997.156V9h-.003a1 1 0 0 1 1-.998h5a1 1 0 0 1 1 1Zm-6.997 12.966a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1h-7Z"
      />
    </Svg>
  )
}
