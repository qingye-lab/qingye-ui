import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Button as CossButton, buttonVariants } from "./coss/button";
import type { ButtonProps as CossButtonProps } from "./coss/button";

export { buttonVariants };
export type ButtonProps = CossButtonProps & Pick<ButtonPrimitive.Props, "nativeButton">;
export function Button({ nativeButton, render, ...props }: ButtonProps) {
  return <CossButton render={nativeButton === false ? <ButtonPrimitive nativeButton={false} render={render} /> : render} {...props} />;
}
