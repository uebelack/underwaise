# Azure OpenAI Service (deployed in Sweden Central for availability)
resource "azurerm_cognitive_account" "openai" {
  name                = "${var.project_name}-openai"
  location            = "Sweden Central"
  resource_group_name = azurerm_resource_group.main.name
  kind                = "OpenAI"
  sku_name            = "S0"

  custom_subdomain_name = "${var.project_name}-openai"

  tags = var.tags
}

resource "azurerm_cognitive_deployment" "gpt_mini" {
  name                 = "gpt-mini"
  cognitive_account_id = azurerm_cognitive_account.openai.id

  model {
    format  = "OpenAI"
    name    = "gpt-5-mini"
    version = "2025-08-07"
  }

  scale {
    type     = "GlobalStandard"
    capacity = var.openai_gpt_mini_capacity
  }
}

resource "azurerm_cognitive_deployment" "gpt_chat" {
  name                 = "gpt-chat"
  cognitive_account_id = azurerm_cognitive_account.openai.id

  model {
    format  = "OpenAI"
    name    = "gpt-5-chat"
    version = "2025-08-07"
  }

  scale {
    type     = "GlobalStandard"
    capacity = var.openai_gpt_chat_capacity
  }
}