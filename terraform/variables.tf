variable "region" {
  type    = string
  default = "ap-southeast-2"
}

variable "name" {
  type    = string
  default = "eks-webhook"
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}
