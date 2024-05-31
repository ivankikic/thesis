import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  MenuItem,
  MenuInput,
  MenuDropdown,
  MenuDivider,
  SubMenu,
  MenuIcon,
} from "./ContextMenuStyles";
import RightArrowIcon from "/icons/contextMenu/arrow.svg";
import AddSheetIcon from "/icons/contextMenu/add_sheet.svg";
import DuplicateIcon from "/icons/contextMenu/duplicate.svg";
import DeleteIcon from "/icons/contextMenu/delete.svg";
import AddDashboardIcon from "/icons/contextMenu/add_dashboard.svg";

const iconMap = {
  add_sheet: AddSheetIcon,
  duplicate: DuplicateIcon,
  delete: DeleteIcon,
  add_dashboard: AddDashboardIcon,
};

const ContextMenu = ({ items, position, onClose }) => {
  const menuRef = useRef(null);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
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
      {items.map((item, index) => {
        switch (item.type) {
          case "divider":
            return <MenuDivider key={index} />;
          case "input":
            return (
              <MenuInput
                key={index}
                type="text"
                placeholder={item.placeholder}
                onChange={item.onChange}
              />
            );
          case "dropdown":
            return (
              <MenuDropdown
                key={index}
                onMouseEnter={() => setHoveredDropdown(index)}
                onMouseLeave={() => setHoveredDropdown(null)}
              >
                <span>{item.label}</span>
                <img src={RightArrowIcon} alt="Right arrow icon" />
                {hoveredDropdown === index && (
                  <SubMenu>
                    {item.items.map((subItem, subIndex) => (
                      <MenuItem key={subIndex} onClick={subItem.onClick}>
                        {subItem.label}
                      </MenuItem>
                    ))}
                  </SubMenu>
                )}
              </MenuDropdown>
            );
          default:
            return (
              <MenuItem key={index} onClick={item.onClick}>
                {item.actionType && (
                  <MenuIcon
                    src={iconMap[item.actionType]}
                    alt={item.actionType}
                  />
                )}
                <span>{item.label}</span>
              </MenuItem>
            );
        }
      })}
    </Menu>
  );
};

export default ContextMenu;
