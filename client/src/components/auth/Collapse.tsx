import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

type CollapseProps = {
  open: boolean;
  children: ReactNode;
  className?: string;
};

export function Collapse({ open, children, className }: CollapseProps) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: 1,
            height: "auto",
            transition: {
              height: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.22, delay: 0.06 },
            },
          }}
          exit={{
            opacity: 0,
            height: 0,
            transition: {
              height: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.16 },
            },
          }}
          style={{ overflow: "hidden" }}
          className={className}
        >
          <div style={{ paddingBottom: "2px", paddingTop: "2px" }}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
