const enUS = {
  // GENERAL
  SHEET: "Sheet",
  SHEETS: "Sheets",
  DASHBOARD: "Dashboard",
  DASHBOARDS: "Dashboards",
  CONNECTION: "Connection",
  CONNECTIONS: "Connections",
  ALERT: "Alert",
  ALERTS: "Alerts",
  LOGIN: "Login",
  LOGOUT: "Logout",
  REPORT: "Report",
  REPORTS: "Reports",
  REGISTER: "Register",
  PASSWORD: "Password",
  PASSWORD_REQUIRED: "Password is required",
  EMAIL: "Email",
  YOUR_EMAIL: "Your email",
  EMAIL_REQUIRED: "Email is required",
  NAME: "Name",
  LAST_NAME: "Last name",
  USERNAME: "Username",
  CONFIRM_PASSWORD: "Confirm password",
  IMPORT: "Import",
  CONNECT: "Connect",
  ALERT_SYSTEM: "Alert system",
  SETTINGS: "Settings",
  NEW_SHEET: "New sheet",
  NEW_DASHBOARD: "New dashboard",
  NEW_CONNECTION: "New connection",
  DUPLICATE: "Duplicate",
  DELETE: "Delete",
  MORE_OPTIONS: "More options",
  LOADING: "Loading...",
  CONFIRMATION: "Confirmation",
  CANCEL: "Cancel",
  CONFIRM: "Confirm",
  ADD: "Add",
  CONFIRM_DELETE_SHEET: "Are you sure you want to delete the sheet?",
  CONFIRM_DELETE_DASHBOARD: "Are you sure you want to delete the dashboard?",
  CONFIRM_DELETE_CONNECTION: "Are you sure you want to delete the connection?",
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  QUARTALY: "Quarterly",
  YEARLY: "Yearly",

  // TOAST
  TOAST_SUCCESS_LOGIN: "Successfully logged in!",
  TOAST_SUCCESS_LOGOUT: "Successfully logged out!",
  TOAST_SUCCESS_NEW_SHEET: "New sheet successfully created!",
  TOAST_SUCCESS_NEW_DASHBOARD: "New dashboard successfully created!",
  TOAST_SUCCESS_NEW_CONNECTION: "New connection successfully created!",
  TOAST_SUCCESS_DUPLICATE_SHEET: "Sheet '{{name}}' successfully duplicated!",
  TOAST_SUCCESS_DUPLICATE_DASHBOARD:
    "Dashboard '{{name}}' successfully duplicated!",
  TOAST_SUCCESS_DUPLICATE_CONNECTION:
    "Connection '{{name}}' successfully duplicated!",
  TOAST_SUCCESS_DELETE_SHEET: "Sheet '{{name}}' successfully deleted!",
  TOAST_SUCCESS_DELETE_DASHBOARD: "Dashboard '{{name}}' successfully deleted!",
  TOAST_SUCCESS_DELETE_CONNECTION:
    "Connection '{{name}}' successfully deleted!",
  TOAST_SUCCESS_RENAME_SHEET: "Sheet successfully renamed!",
  TOAST_SUCCESS_RENAME_DASHBOARD: "Dashboard successfully renamed!",
  TOAST_SUCCESS_RENAME_CONNECTION: "Connection successfully renamed!",
  TOAST_SUCCESS_DELETE_IMPORT: "File successfully deleted!",
  TOAST_SUCCESS_IMPORT: "File successfully imported!",
  TOAST_SUCCESS_ADD_SENSOR: "Sensor successfully added!",
  TOAST_SUCCESS_SAVE_ALERT_LIMITS: "Alert limits successfully saved!",
  TOAST_SUCCESS_EDIT_COLUMNS: "Columns successfully updated!",
  TOAST_SUCCESS_RENAME_ITEM: "Columns successfully renamed!",
  TOAST_SUCCESS_UPDATE_DASHBOARD_TYPE: "Dashboard type successfully updated!",
  TOAST_SUCCESS_DELETE_DASHBOARD_TILE: "Dashboard tile successfully deleted!",
  TOAST_SUCCESS_UPDATE_CHART_TYPE: "Chart type successfully updated!",
  TOAST_SUCCESS_TILE_ADDED: "Tile successfully created!",
  TOAST_SUCCESS_TILE_REMOVED: "Tile successfully deleted!",
  TOAST_SUCCESS_DELETE_REPORT: "Report successfully deleted!",
  TOAST_SUCCESS_ADD_REPORT: "Report successfully created!",

  // ERRORS
  ERROR_SHEET_ALREADY_EXISTS: "A sheet with that name already exists",
  ERROR_SHEET_ALREADY_EXISTS_WITH_NAME:
    "A sheet with the name '{{name}}' already exists",
  ERROR_DASHBOARD_ALREADY_EXISTS: "A dashboard with that name already exists",
  ERROR_DASHBOARD_ALREADY_EXISTS_WITH_NAME:
    "A dashboard with the name '{{name}}' already exists",
  ERROR_CONNECTION_ALREADY_EXISTS: "A connection with that name already exists",
  ERROR_CONNECTION_ALREADY_EXISTS_WITH_NAME:
    "A connection with the name '{{name}}' already exists",
  ERROR_EMPTY_SHEET_NAME: "Sheet name cannot be empty",
  ERROR_EMPTY_DASHBOARD_NAME: "Dashboard name cannot be empty",
  ERROR_EMPTY_CONNECTION_NAME: "Connection name cannot be empty",
  ERROR_SOMETHING_WENT_WRONG: "Something went wrong! Please try again later",
  ERROR_DELETE_IMPORT: "An unexpected error occurred while deleting the file!",
  ERROR_IMPORT: "An unexpected error occurred while importing the file!",
  ERROR_NAME_ALREADY_TAKEN: "A sheet with the name '{{name}}' already exists",
  ERROR_ADD_SENSOR: "An unexpected error occurred while adding the sensor!",
  ERROR_NAME_REQUIRED: "Name is required",
  ERROR_SAVE_ALERT_LIMITS:
    "An unexpected error occurred while saving alert limits!",
  ERROR_TILE_ADDED: "Tile successfully added!",
  ERROR_TILE_REMOVED: "Tile successfully deleted!",
  ERROR_DELETE_REPORT:
    "An unexpected error occurred while deleting the report!",
  ERROR_DOWNLOAD_FILE:
    "An unexpected error occurred while downloading the report!",

  // HOME PAGE
  HOME_WELCOME: "Welcome",
  CHOOSE_SOMETHING_FROM_MENU:
    "Choose something from the menu to see the application's functionalities",

  // IMPORT PAGE
  IMPORT_DATA: "Import data",
  IMPORT_DATA_DESCRIPTION:
    "Data import can be done via a CSV file. The file must contain data in a format supported by the application. Import data into the sheet by clicking the 'Import' button on the sheet page.",
  IMPORT_DATA_BUTTON: "Import",
  IMPORT_IT: "Import it",
  IMPORT_FILE: "Import file",
  IMPORT_PREVIEW: "Import preview",
  FILES: "Files",
  ALLOWED_EXTENSIONS: "Allowed extensions: .csv, .xlsx, .xls",
  IMPORTED: "Imported",
  FAILED: "Failed",
  CONFIRM_DELETE_IMPORT: "Are you sure you want to delete the file?",
  ID: "Id",
  FILE_NAME: "File name",
  STATUS: "Status",
  DATE: "Date",
  ROW_COUNT: "Row count",
  COLUMN_COUNT: "Column count",
  COLUMNS: "Columns",
  COLUMN_NAMES: "Column names",
  COLUMN_NAMES_INFO:
    "Column names may differ from the column names in the file. If the program did not recognize them, it marked them in red and will map them as 'unknown' if you do not make changes.",
  SHEET_NAME: "Sheet name",

  // SETTINGS
  CONFIRM_LOGOUT: "Are you sure you want to log out?",
  LANGUAGE: "Language",
  AUDIT_LOG: "Audit log",
  AUDIT_LOGS: "Audit logs",
  FROM_DATE: "From",
  TO_DATE: "To",
  SHOW_LOGS: "Show logs",
  NO_DATA_AVAILABLE: "No data available",
  LOG_TYPE: "Log type",
  DATA: "Data",

  // CONNECT
  ADD_SENSOR: "Add sensor",
  SENSORS: "Sensors",
  LOCATION: "Location",
  SENSOR_NAME: "Sensor name",
  SENSOR_SOURCE: "Sensor",
  INFO_COLUMNS: "Enter the column names in the order your sensor sends them.",
  COLUMNS_INPUT: "Columns input",

  // ALERT SYSTEM
  UPPER_LIMIT: "Upper limit",
  LOWER_LIMIT: "Lower limit",
  SAVE_ALERT_LIMITS: "Save",
  NO_SENSORS:
    "No sensors available to set alert limits. Please connect a sensor first.",
  SENSOR: "Sensor",
  ALERT_LOGS: "Alert logs",
  COLUMN_NAME: "Column name",
  COLUMN_VALUE: "Column value",
  TIME: "Time",
  LIMIT_VALUE: "Set limit",
  SENSOR_VALUE: "Sensor value",
  TYPE: "Alert type",
  CREATED_AT: "Created at",
  UPDATED_AT: "Updated at",

  // CONNECTION
  MANAGE_SENSOR: "Manage sensor",
  SENSOR_LOGS: "Sensor logs",

  // DASHBOARD
  EDIT_COLUMNS: "Edit columns",
  SELECT_SHEET: "Select sheet",
  SEARCH_SHEET: "Search sheet",
  DASHBOARD_TILE_NAME: "Dashboard tile name",
  ADD_TILE: "Add tile",
  SENSOR_LOG: "Sensor log",
  NO_DATA: "No data available for display, please add a tile",

  // REPORTS
  CREATED_REPORTS: "Created reports",
  DOWNLOAD: "Download",
  ACTIONS: "Actions",
  CREATE_REPORT: "Create report",
  INTERVAL_TYPE: "Report type",
  REPORT_NAME: "Report name",
  ADD_REPORT: "Add report",
  GENERATING_REPORT: "Generating report",
};

export default enUS;
