import { motion, AnimatePresence } from "framer-motion";
import { Toaster, Toast } from "react-hot-toast";

export const AnimatedToaster = () => {
  return (
    <Toaster position="top-right">
      {(t: Toast) => (
        <AnimatePresence>
          {t.visible && (
            <motion.div
              initial={{ x: 100, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 100, opacity: 0, scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              style={{
                background:
                  t.type === "success"
                    ? "#16a34a"
                    : t.type === "error"
                    ? "#dc2626"
                    : "#334155",
                color: "white",
                padding: "12px 14px",
                borderRadius: "12px",
                marginBottom: "10px",
                fontSize: "14px",
                boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {t.icon}
              <span>{t.message as string}</span>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Toaster>
  );
};