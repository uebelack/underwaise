# Process Engine Container App
resource "azurerm_container_app" "process_engine" {
  name                         = "${var.project_name}-process-engine"
  container_app_environment_id = azurerm_container_app_environment.main.id
  resource_group_name          = azurerm_resource_group.main.name
  revision_mode                = "Single"

  identity {
    type         = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.container_apps.id]
  }

  registry {
    server   = azurerm_container_registry.main.login_server
    identity = azurerm_user_assigned_identity.container_apps.id
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

  ingress {
    external_enabled = true
    target_port      = 8080
    traffic_weight {
      percentage      = 100
      latest_revision = true
    }
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

      liveness_probe {
        transport          = "HTTP"
        port               = 8080
        path               = "/actuator/health/liveness"
        initial_delay      = 30
        interval_seconds   = 10
        timeout            = 3
        failure_count_threshold = 3
      }

      readiness_probe {
        transport          = "HTTP"
        port               = 8080
        path               = "/actuator/health/readiness"
        interval_seconds   = 10
        timeout            = 3
        success_count_threshold = 1
        failure_count_threshold = 3
      }
    }
  }

  tags = var.tags

  depends_on = [
    azurerm_mssql_database.process_engine
  ]
}
