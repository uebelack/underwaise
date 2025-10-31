# Azure SQL Server
resource "azurerm_mssql_server" "main" {
  name                         = "${var.project_name}-sqlserver-${var.environment}"
  resource_group_name          = azurerm_resource_group.main.name
  location                     = azurerm_resource_group.main.location
  version                      = "12.0"
  administrator_login          = var.sql_admin_username
  administrator_login_password = var.sql_admin_password
  tags = var.tags
}

# Azure SQL Database (Serverless)
resource "azurerm_mssql_database" "process_engine" {
  name                 = "${var.project_name}-db"
  server_id            = azurerm_mssql_server.main.id
  collation            = "SQL_Latin1_General_CP1_CI_AS"
  license_type         = "LicenseIncluded"
  max_size_gb          = 2
  sku_name             = "Basic"
  zone_redundant       = false
  storage_account_type = "Local"
  tags                 = var.tags
}

# Firewall rule to allow Azure services
resource "azurerm_mssql_firewall_rule" "allow_azure_services" {
  name             = "AllowAzureServices"
  server_id        = azurerm_mssql_server.main.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

# SQL Firewall rule to allow your IP address
resource "azurerm_mssql_firewall_rule" "home_ip" {
  name             = "AllowClientIPUbd"
  server_id        = azurerm_mssql_server.main.id
  start_ip_address = var.home_ip
  end_ip_address   = var.home_ip
}