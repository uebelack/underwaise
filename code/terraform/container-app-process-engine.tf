# Process Engine Container App
resource "azurerm_container_app" "process_engine" {
  name                         = "${var.project_name}-process-engine"
  container_app_environment_id = azurerm_container_app_environment.main.id
  resource_group_name          = azurerm_resource_group.main.name
  revision_mode                = "Single"

  registry {
    server               = "ghcr.io"
    username             = var.ghcr_username
    password_secret_name = "ghcr-password"
  }

  ingress {
    allow_insecure_connections = false
    external_enabled           = true
    target_port                = 8080
    
    traffic_weight {
      percentage = 100
      latest_revision = true
    }
  }

  secret {
    name  = "ghcr-password"
    value = var.ghcr_password
  }

  secret {
    name  = "sql-username"
    value = var.sql_admin_username
  }

  secret {
    name  = "sql-password"
    value = var.sql_admin_password
  }

  secret {
    name  = "sql-connection-string"
    value = "jdbc:sqlserver://${azurerm_mssql_server.main.fully_qualified_domain_name}:1433;database=${azurerm_mssql_database.process_engine.name};encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;"
  }

  secret {
    name  = "mailgun-api-key"
    value = var.mailgun_api_key
  }

  template {
    min_replicas = var.process_engine_min_replicas
    max_replicas = var.process_engine_max_replicas

    container {
      name   = "process-engine"
      image  = var.process_engine_image_url
      cpu    = var.process_engine_cpu
      memory = var.process_engine_memory

      env {
        name  = "SPRING_PROFILES_ACTIVE"
        value = "azure"
      }

      env {
        name  = "SPRING_DATASOURCE_URL"
        secret_name = "sql-connection-string"
      }

      env {
        name  = "SPRING_DATASOURCE_USERNAME"
        secret_name = "sql-username"
      }

      env {
        name  = "SPRING_DATASOURCE_PASSWORD"
        secret_name = "sql-password"
      }

      env {
        name  = "UNDERWAISE_MAILGUN_API_KEY"
        secret_name = "mailgun-api-key"
      }

      env {
        name  = "SPRING_DATASOURCE_DRIVER_CLASS_NAME"
        value = "com.microsoft.sqlserver.jdbc.SQLServerDriver"
      }

      env {
        name  = "CAMUNDA_BPM_DATABASE_TYPE"
        value = "mssql"
      }

      env {
        name  = "CAMUNDA_BPM_DATABASE_SCHEMA_UPDATE"
        value = "true"
      }
    }
  }

  tags = var.tags

  depends_on = [
    azurerm_mssql_database.process_engine
  ]
}
