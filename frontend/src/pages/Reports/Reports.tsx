import { Container, CustomButton, PageTitle } from "../PagesStyles";
import {
  PageContent,
  PageContentSection,
  PageContentTitle,
  PageHeader,
  TableContainer,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  DeleteButton,
  LoaderOverlay,
  Loader,
  LoaderText,
} from "./ReportsStyles";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import axiosClient from "../../auth/apiClient";
import { Report } from "../../utils/types";
import dayjs from "dayjs";
import deleteIcon from "/icons/pages/delete_w.svg";
import ConfirmDeleteImportModal from "../../components/Modal/DeleteImportModal";
import toast from "react-hot-toast";
import AddReportModal from "../../components/Modal/AddReportModal";

const Reports = () => {
  const { t } = useTranslation();
  const [reports, setReports] = useState<Report[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchReports = async () => {
    try {
      const response = await axiosClient.get("/api/reports");
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching import logs:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = async () => {
    if (deleteId !== null) {
      try {
        await axiosClient.delete(`/api/reports/${deleteId}`);
        setReports(reports.filter((report: Report) => report.id !== deleteId));
        toast.success(t("TOAST_SUCCESS_DELETE_REPORT"), { duration: 1500 });
      } catch (error) {
        console.error("Error deleting report:", error);
        toast.error(t("ERROR_DELETE_REPORT"), { duration: 1500 });
      } finally {
        setShowModal(false);
        setDeleteId(null);
      }
    }
  };

  const handleAdd = async (
    name: string,
    sheet_id: number | null,
    columns: string[],
    rows: any[],
    interval_type: string,
    file_name: string
  ) => {
    setLoading(true);
    setShowAddModal(false);
    let filteredRows = rows;

    const now = dayjs();

    const intervals = {
      daily: now.subtract(1, "day"),
      weekly: now.subtract(1, "week"),
      monthly: now.subtract(1, "month"),
      quartal: now.subtract(3, "month"),
      yearly: now.subtract(1, "year"),
    };

    const intervalDate = intervals[interval_type as keyof typeof intervals];

    if (intervalDate) {
      filteredRows = rows.filter((row) => {
        let rowDate;

        if (typeof row[0].value === "string") {
          const dateValue = row[0].value;
          const formattedDate = dateValue.replace(
            /(\d{2})\.(\d{2})\.(\d{4})/,
            "$3-$2-$1"
          );
          rowDate = dayjs(formattedDate, "YYYY-MM-DD HH:mm:ss").startOf("day");
        } else if (typeof row[0].value === "number") {
          rowDate = dayjs("1899-12-30").add(row[0].value, "day").startOf("day");
        }

        return rowDate?.isAfter(intervalDate);
      });
    }

    try {
      await axiosClient.post("/api/reports", {
        name,
        sheet_id,
        columns,
        rows: filteredRows,
        interval_type,
        file_name,
      });
      toast.success(t("TOAST_SUCCESS_ADD_REPORT"), { duration: 1500 });
    } catch (error) {
      console.error("Error adding report:", error);
      toast.error(t("ERROR_ADD_REPORT"), { duration: 1500 });
    } finally {
      setLoading(false);
      fetchReports();
    }
  };

  const openDeleteModal = (id: number) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const handleDownload = async (fileName: string) => {
    try {
      const response = await axiosClient.get(
        `/api/reports/download/${fileName}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${fileName}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error(t("ERROR_DOWNLOAD_FILE"), { duration: 1500 });
    }
  };

  return (
    <Container>
      {loading && (
        <LoaderOverlay>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Loader />
            <LoaderText>{t("GENERATING_REPORT")}</LoaderText>
          </div>
        </LoaderOverlay>
      )}
      <PageHeader>
        <PageTitle>{t("REPORTS")}</PageTitle>
        <CustomButton onClick={() => setShowAddModal(true)} variant="primary">
          {t("CREATE_REPORT")}
        </CustomButton>
      </PageHeader>
      <PageContent>
        <PageContentSection>
          <PageContentTitle>{t("CREATED_REPORTS")}</PageContentTitle>
          <TableContainer>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>{t("ID")}</TableHeader>
                  <TableHeader>{t("NAME")}</TableHeader>
                  <TableHeader>{t("INTERVAL_TYPE")}</TableHeader>
                  <TableHeader>{t("FILE_NAME")}</TableHeader>
                  <TableHeader>{t("CREATED_AT")}</TableHeader>
                  <TableHeader className="delete-column">
                    {t("ACTIONS")}
                  </TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {reports.length > 0 ? (
                  reports.map((report: Report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.id}</TableCell>
                      <TableCell>{report.name}</TableCell>
                      <TableCell>{report.interval_type}</TableCell>
                      <TableCell
                        onClick={() => handleDownload(report.file_name)}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {report.file_name}
                      </TableCell>
                      <TableCell>
                        {dayjs(report.created_at).format("DD.MM.YYYY HH:mm:ss")}
                      </TableCell>
                      <TableCell className="delete-column">
                        <DeleteButton
                          onClick={() => openDeleteModal(report.id)}
                        >
                          <img src={deleteIcon} alt="Delete" />
                        </DeleteButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4}>{t("NO_DATA_AVAILABLE")}</TableCell>
                  </TableRow>
                )}
              </tbody>
            </Table>
          </TableContainer>
        </PageContentSection>
      </PageContent>
      <ConfirmDeleteImportModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleDelete}
      />
      <AddReportModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleSubmit={handleAdd}
      />
    </Container>
  );
};

export default Reports;
