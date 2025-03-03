import { useEffect } from "react";

const useKeypress = (keyBindings) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      keyBindings.forEach(({ keyCombo, action }) => {
        const keys = keyCombo.toLowerCase().split("+");
        const ctrl = keys.includes("control") ? event.ctrlKey : true;
        const shift = keys.includes("shift") ? event.shiftKey : true;
        const alt = keys.includes("alt") ? event.altKey : true;
        const meta = keys.includes("meta") ? event.metaKey : true; // Mac ⌘ key
        const keyPressed = keys.find((key) => key.startsWith("arrow") || key.length === 1);

        if (ctrl && shift && alt && meta && event.key.toLowerCase() === keyPressed) {
          event.preventDefault();
          action();
        }
      });
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [keyBindings]);
};

export default useKeypress;
