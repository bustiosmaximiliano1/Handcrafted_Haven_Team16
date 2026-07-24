"use client";

import { useFormStatus } from "react-dom";

interface AddToCartSubmitButtonProps {
  idleText?: string;
  pendingText?: string;
  className?: string;
}

export default function AddToCartSubmitButton({
  idleText = "Add to cart",
  pendingText = "Adding...",
  className,
}: AddToCartSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={className} disabled={pending} aria-disabled={pending}>
      {pending ? pendingText : idleText}
    </button>
  );
}
