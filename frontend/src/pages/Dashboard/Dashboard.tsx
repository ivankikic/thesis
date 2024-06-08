import { useEffect, useState, useRef } from "react";
import { Container, PageTitle } from "../PagesStyles";
import {
  DashboardContainer,
  DashboardsContainer,
  PageContent,
  PageContentSection,
  PageHeader,
} from "./DashboardStyles";
import axiosClient from "../../auth/apiClient";
import type { Dashboard as DashboardType, Sheet } from "../../utils/types";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ContextMenu from "../../contexts/ContextMenu/ContextMenu";
import {
  deleteDashboardItem,
  renameDashboardItem,
  editColumns,
} from "../../contexts/ContextMenu/ContextMenuFunctions";
import useCustomToast from "../../hooks/useCustomToast";
import DeleteIcon from "/icons/contextMenu/delete.svg";
import EditIcon from "/icons/contextMenu/edit.svg";
import EditColumnsModal from "../../components/Modal/EditColumnsModal";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
  "#d0ed57",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
  "#ffc658",
  "#ff8042",
];

const Dashboard = () => {
  const [dashboard, setDashboard] = useState<DashboardType | null>(null);
  const [sheets, setSheets] = useState<Sheet[] | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const { id } = useParams();
  const showToast = useCustomToast();
  const inputValueRef = useRef("");

  const fetchDashboard = async () => {
    const response = await axiosClient.get(`/api/dashboards/${id}`);
    setDashboard(response.data);
  };

  const fetchSheets = async () => {
    const response = await axiosClient.get(`/api/sheets`);
    setSheets(response.data);
  };

  useEffect(() => {
    fetchDashboard();
    fetchSheets();
  }, [id]);

  const formatChartData = (sheet: Sheet, includedColumns: string[]) => {
    const { columns, rows } = sheet;
    return rows.map((row: any) => {
      const formattedRow: { [key: string]: any } = {};
      row.forEach((cell: any, index: any) => {
        if (includedColumns.includes(columns[index])) {
          formattedRow[columns[index]] = cell.value;
        }
      });
      return formattedRow;
    });
  };

  const getMinMaxValues = (data: any, keys: any) => {
    let min = Infinity;
    let max = -Infinity;

    data.forEach((item: any) => {
      keys.forEach((key: any) => {
        const value = parseFloat(item[key]);
        if (!isNaN(value)) {
          if (value < min) min = value;
          if (value > max) max = value;
        }
      });
    });

    return { min, max };
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(dashboard?.data || []);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedDashboard = { ...dashboard, data: items } as DashboardType;
    setDashboard(updatedDashboard);

    // Log the data to inspect its structure
    console.log("Updated dashboard data:", updatedDashboard.data);

    // Update order on the backend
    try {
      await axiosClient.put(`/api/dashboards/${id}/order`, {
        data: JSON.stringify(updatedDashboard.data),
      });
    } catch (error: any) {
      console.error("Error updating dashboard order:", error);
    }
  };

  const handleContextMenu = (event: any, item: any) => {
    event.preventDefault();
    setSelectedItem(item);
    setContextMenu({ x: event.clientX, y: event.clientY });
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    await deleteDashboardItem(
      Number(id),
      selectedItem.id,
      setDashboard,
      showToast
    );
    setContextMenu(null);
  };

  const handleRename = async () => {
    const newName = inputValueRef.current.trim();
    if (!selectedItem || newName === "") {
      showToast("error", "ERROR_EMPTY_NAME");
      return;
    }
    await renameDashboardItem(
      Number(id),
      selectedItem.id,
      newName,
      setDashboard,
      showToast
    );
    setContextMenu(null);
  };

  const handleEditColumns = () => {
    const sheet = sheets?.find((sheet) => sheet.id === selectedItem.sheet_id);
    if (sheet) {
      setSelectedColumns(selectedItem.dashboard_data.included_columns || []);
      setIsModalOpen(true);
    }
    setContextMenu(null);
  };

  const handleSaveColumns = async () => {
    if (!selectedItem) return;
    await editColumns(
      Number(id),
      selectedItem.id,
      selectedColumns,
      setDashboard,
      showToast
    );
    setIsModalOpen(false);
  };

  return (
    <Container>
      <PageHeader>
        <PageTitle>{dashboard?.name}</PageTitle>
      </PageHeader>
      <PageContent>
        <PageContentSection>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId={"droppable-" + Math.floor(Math.random() * 1000)}
              direction="horizontal"
            >
              {(provided) => (
                <DashboardsContainer
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {dashboard?.data?.map((item, index) => {
                    const sheet = sheets?.find(
                      (sheet) => sheet.id === item.sheet_id
                    );
                    const chartData = sheet
                      ? formatChartData(
                          sheet,
                          item.dashboard_data.included_columns
                        )
                      : [];

                    const { min, max } = getMinMaxValues(
                      chartData,
                      item.dashboard_data.included_columns
                    );

                    return (
                      <Draggable
                        key={item.id}
                        draggableId={item.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <DashboardContainer
                            size={item.dashboard_data.dashboard_type}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onContextMenu={(e) => handleContextMenu(e, item)}
                          >
                            <span>{item.name}</span>
                            {chartData.length > 0 && (
                              <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="Date" />
                                  <YAxis
                                    domain={[min, max]}
                                    tickFormatter={(value) => value.toFixed(2)}
                                  />
                                  <Tooltip />
                                  <Legend />
                                  {item.dashboard_data.included_columns.map(
                                    (col, idx) => (
                                      <Bar
                                        key={col}
                                        dataKey={col}
                                        fill={COLORS[idx % COLORS.length]}
                                      />
                                    )
                                  )}
                                </BarChart>
                              </ResponsiveContainer>
                            )}
                          </DashboardContainer>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </DashboardsContainer>
              )}
            </Droppable>
          </DragDropContext>
        </PageContentSection>
      </PageContent>
      {contextMenu && (
        <ContextMenu
          items={[
            {
              label: "Rename",
              onClick: handleRename,
              type: "input",
              actionType: "rename",
              data: selectedItem?.name,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                inputValueRef.current = e.target.value;
              },
            },
            { type: "divider" },
            {
              label: "Edit columns",
              onClick: handleEditColumns,
              type: "item",
              actionType: "edit",
              icon: <EditIcon />,
            },
            { type: "divider" },
            {
              label: "Delete",
              onClick: handleDelete,
              type: "item",
              actionType: "delete",
              icon: <DeleteIcon />,
            },
          ]}
          position={contextMenu}
          onClose={() => setContextMenu(null)}
        />
      )}
      {isModalOpen && (
        <EditColumnsModal
          show={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          handleConfirm={handleSaveColumns}
          columns={
            sheets?.find((sheet) => sheet.id === selectedItem.sheet_id)
              ?.columns || []
          }
          selectedColumns={selectedColumns}
          toggleColumn={(column) => {
            if (selectedColumns.includes(column)) {
              setSelectedColumns(selectedColumns.filter((c) => c !== column));
            } else {
              setSelectedColumns([...selectedColumns, column]);
            }
          }}
        />
      )}
    </Container>
  );
};

export default Dashboard;
