import React, { Props } from "react";
import { CSSTransition } from "react-transition-group";

export default function BaseTransition(props: Props<any>) {
  return (
    <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
      {props.children}
    </CSSTransition>
  );
}
