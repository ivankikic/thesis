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
import AddConnectionIcon from "/icons/contextMenu/add_connection.svg";

const iconMap = {
  add_sheet: AddSheetIcon,
  duplicate: DuplicateIcon,
  delete: DeleteIcon,
  add_dashboard: AddDashboardIcon,
  add_connection: AddConnectionIcon,
};

type IconType = keyof typeof iconMap;

interface ContextMenuProps {
  items: any[];
  type?: string;
  position: { x: number; y: number };
  label?: string;
  onClick?: () => void;
  placeholder?: string;
  actionType?: IconType;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

const ContextMenu = ({ items, position, onClose }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [hoveredDropdown, setHoveredDropdown] = useState<number | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
      {items.map((item: ContextMenuProps, index: number) => {
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
                    {item.items.map((subItem: any, subIndex: any) => (
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