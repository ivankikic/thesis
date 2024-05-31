import { useEffect, useRef } from "react";
import { Menu, MenuItem } from "./ContextMenuStyles";

const ContextMenu = ({ items, position, onClose }: any) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <Menu ref={menuRef} style={{ top: position.y, left: position.x }}>
      {items.map((item: any, index: any) => (
        <MenuItem key={index} onClick={item.onClick}>
          {item.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default ContextMenu;
