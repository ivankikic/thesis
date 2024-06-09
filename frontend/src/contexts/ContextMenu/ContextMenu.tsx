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
import EditIcon from "/icons/contextMenu/edit.svg";
import BarChartWhiteIcon from "/icons/contextMenu/barchart_w.svg";
import PieChartWhiteIcon from "/icons/contextMenu/piechart_w.svg";
import LineChartWhiteIcon from "/icons/contextMenu/linechart_w.svg";
import BarChartBlackIcon from "/icons/contextMenu/barchart_b.svg";
import PieChartBlackIcon from "/icons/contextMenu/piechart_b.svg";
import LineChartBlackIcon from "/icons/contextMenu/linechart_b.svg";

const iconMap = {
  add_sheet: AddSheetIcon,
  duplicate: DuplicateIcon,
  delete: DeleteIcon,
  add_dashboard: AddDashboardIcon,
  add_connection: AddConnectionIcon,
  edit: EditIcon,
};

type IconType = keyof typeof iconMap;

interface ContextMenuProps {
  items: any[];
  type?: string;
  position: { x: number; y: number };
  label?: string;
  data?: string;
  onClick?: (type?: string) => void;
  placeholder?: string;
  actionType?: IconType;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
  options?: string[];
  activeOption?: string;
}

const ContextMenu = ({ items, position, onClose }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [hoveredDropdown, setHoveredDropdown] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

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

  useEffect(() => {
    const inputItem = items.find((item) => item.type === "input");
    if (inputItem) {
      setInputValue(inputItem.data || "");
    }
  }, [items]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: any
  ) => {
    setInputValue(e.target.value);
    if (onChange) onChange(e);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    onClick: any
  ) => {
    if (e.key === "Enter" && onClick) {
      onClick(e.currentTarget.value);
      onClose();
    }
  };

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
                onChange={(e) => handleInputChange(e, item.onChange)}
                onKeyDown={(e) => handleKeyDown(e, item.onClick)}
                value={inputValue}
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
          case "customColumnType":
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "10px",
                }}
              >
                {item.options?.map((option: string) => (
                  <button
                    key={option}
                    onClick={() => {
                      if (item.onClick) {
                        item.onClick(option);
                      }
                      onClose();
                    }}
                    style={{
                      backgroundColor:
                        item.activeOption === option
                          ? "#002666"
                          : "transparent",
                      color: item.activeOption === option ? "white" : "black",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                    onMouseEnter={(e) => {
                      if (item.activeOption !== option) {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.backgroundColor = "#f0f0f0";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (item.activeOption !== option) {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            );
          case "customChartType":
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: "10px",
                }}
              >
                {item.options?.map((option: string) => (
                  <button
                    key={option}
                    onClick={() => {
                      if (item.onClick) {
                        item.onClick(option);
                      }
                      onClose();
                    }}
                    style={{
                      backgroundColor:
                        item.activeOption === option
                          ? "#002666"
                          : "transparent",
                      color: item.activeOption === option ? "white" : "black",
                      border: "none",
                      padding: "5px 10px",
                      cursor: "pointer",
                      borderRadius: "5px",
                    }}
                    onMouseEnter={(e) => {
                      if (item.activeOption !== option) {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.backgroundColor = "#f0f0f0";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (item.activeOption !== option) {
                        (
                          e.currentTarget as HTMLButtonElement
                        ).style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {option === "bar" ? (
                      <img
                        src={
                          item.activeOption === option
                            ? BarChartWhiteIcon
                            : BarChartBlackIcon
                        }
                        alt="Bar chart icon"
                      />
                    ) : option === "pie" ? (
                      <img
                        src={
                          item.activeOption === option
                            ? PieChartWhiteIcon
                            : PieChartBlackIcon
                        }
                        alt="Pie chart icon"
                      />
                    ) : (
                      <img
                        src={
                          item.activeOption === option
                            ? LineChartWhiteIcon
                            : LineChartBlackIcon
                        }
                        alt="Line chart icon"
                      />
                    )}
                  </button>
                ))}
              </div>
            );
          default:
            return (
              <MenuItem
                key={index}
                onClick={() => item.onClick && item.onClick()}
              >
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
