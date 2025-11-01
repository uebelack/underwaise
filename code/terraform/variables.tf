# Project Variables
variable "project_name" {
  description = "Project name"
  type        = string
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "westeurope"
}

variable "resource_group_name" {
  description = "Resource group name"
  type        = string
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
}

# SQL Database Variables
variable "sql_admin_username" {
  description = "SQL Server administrator username"
  type        = string
  default     = "sqladmin"
}

variable "sql_admin_password" {
  description = "SQL Server administrator password"
  type        = string
  sensitive   = true
}

# Process Engine Container App Variables
variable "process_engine_image_url" {
  description = "Docker container image URL for process engine"
  type        = string
}

variable "process_engine_cpu" {
  description = "CPU allocation for process engine container"
  type        = number
  default     = 1.0
}

variable "process_engine_memory" {
  description = "Memory allocation for process engine container"
  type        = string
  default     = "2Gi"
}

variable "process_engine_min_replicas" {
  description = "Minimum number of replicas for process engine"
  type        = number
  default     = 1
}

variable "process_engine_max_replicas" {
  description = "Maximum number of replicas for process engine"
  type        = number
  default     = 4
}

# Analyze Form Container App Variables
variable "analyze_form_image_url" {
  description = "Docker container image URL for process engine"
  type        = string
}

variable "analyze_form_cpu" {
  description = "CPU allocation for process engine container"
  type        = number
  default     = 0.25
}

variable "analyze_form_memory" {
  description = "Memory allocation for process engine container"
  type        = string
  default     = "0.5Gi"
}

variable "analyze_form_min_replicas" {
  description = "Minimum number of replicas for process engine"
  type        = number
  default     = 1
}

variable "analyze_form_max_replicas" {
  description = "Maximum number of replicas for process engine"
  type        = number
  default     = 2
}

# Evaluate Application Container App Variables

variable "evaluate_application_image_url" {
  description = "Docker container image URL for evaluate application"
  type        = string
}

variable "evaluate_application_cpu" {
  description = "CPU allocation for evaluate application container"
  type        = number
  default     = 0.25
}

variable "evaluate_application_memory" {
  description = "Memory allocation for evaluate application container"
  type        = string
  default     = "0.5Gi"
}

variable "evaluate_application_min_replicas" {
  description = "Minimum number of replicas for evaluate application"
  type        = number
  default     = 1
}

variable "evaluate_application_max_replicas" {
  description = "Maximum number of replicas for evaluate application"
  type        = number
  default     = 2
}

# GitHub Container Registry Variables
variable "ghcr_username" {
  description = "GitHub Container Registry username"
  type        = string
}

variable "ghcr_password" {
  description = "GitHub Container Registry password (Personal Access Token)"
  type        = string
  sensitive   = true
}

# OpenAI Variables
variable "openai_api_endpoint" {
  description = "OpenAI API endpoint"
  type        = string
}

variable "openai_api_key" {
  description = "OpenAI API key"
  type        = string
  sensitive   = true
}

variable "openai_gpt_mini_capacity" {
  description = "Token capacity for the GPT deployment"
  type        = number
  default     = 100
}

variable "openai_gpt_chat_capacity" {
  description = "Token capacity for the GPT deployment"
  type        = number
  default     = 100
}

# Mailgun Variables
variable "mailgun_api_key" {
  description = "Mailgun API key"
  type        = string
  sensitive   = true
}

variable "home_ip" {
  description = "Home IP address"
  type        = string
  default     = "111.111.111.111"
}