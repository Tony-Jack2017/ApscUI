import React, {ReactNode} from "react";
export interface ComWithChild extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}