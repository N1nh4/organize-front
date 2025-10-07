"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ReactNode, useEffect, useState } from "react";

interface CustomDialogPortalProps extends React.ComponentProps<typeof DialogPrimitive.Portal> {
  children: ReactNode;
}

export function CustomDialogPortal({ children, ...props }: CustomDialogPortalProps) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // seleciona o container após o mount (executa só no client)
    setContainer(document.getElementById("app-content"));
  }, []);

  if (!container) return null; // nada é renderizado até ter o container

  return (
    <DialogPrimitive.Portal container={container} {...props}>
      {children}
    </DialogPrimitive.Portal>
  );
}
