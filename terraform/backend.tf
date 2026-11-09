terraform {
  backend "s3" {
    bucket       = "tfstate-906915241954-ap-southeast-2"
    key          = "eks-webhook/dev/terraform.tfstate"
    region       = "ap-southeast-2"
    encrypt      = true
    use_lockfile = true
  }
}
