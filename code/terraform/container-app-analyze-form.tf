# Process Engine Container App
resource "azurerm_container_app" "analyze-form" {
  name                         = "${var.project_name}-analyze-form"
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
    target_port                = 8000
    
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
    name  = "openai-api-key"
    value = var.openai_api_key
  }

  template {
    min_replicas = var.analyze_form_min_replicas
    max_replicas = var.analyze_form_max_replicas

    container {
      name   = "analyze-form"
      image  = var.analyze_form_image_url
      cpu    = var.analyze_form_cpu
      memory = var.analyze_form_memory

      env {
        name  = "AZURE_OPENAI_ENDPOINT"
        value = var.openai_api_endpoint
      }

      env {
        name  = "AZURE_OPENAI_API_KEY"
        secret_name = "openai-api-key"
      }
    }
  }

  tags = var.tags
}
