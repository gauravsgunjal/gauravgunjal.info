# AWS Fundamentals Every Full-Stack Developer Should Know

Most full-stack developers can build the application. Fewer are comfortable owning what happens after
`git push`. Having managed AWS and Linux/Apache deployments myself for years, here's the minimum AWS
vocabulary I'd want any full-stack developer on my team to have.

## The core building blocks

- **EC2** — a virtual server. If you've ever SSH'd into a Linux box to configure Apache or Nginx, you
  already understand the mental model; EC2 just rents you that box by the hour.
- **S3** — object storage for anything that isn't a running process: build artifacts, user uploads,
  static frontend bundles.
- **CloudFront** — a CDN that sits in front of S3 or your origin server, caching content close to your
  users and reducing origin load.
- **RDS** — managed relational databases (MySQL, PostgreSQL, and others) without you patching the OS or
  managing backups by hand.

## A minimal deployment story

For a typical Angular + backend API application:

1. Build the Angular app (`ng build --configuration production`) and upload the output to an S3 bucket
   configured for static website hosting.
2. Put CloudFront in front of that bucket for caching, HTTPS, and a custom domain.
3. Run the backend API on EC2 (or a container service like ECS/Fargate) behind an Application Load
   Balancer.
4. Point the API at an RDS instance instead of a self-managed database server.

This alone eliminates most of the manual server maintenance that comes with a single Apache box hosting
everything.

## Where CI/CD fits in

Manually uploading build output doesn't scale past a side project. A basic pipeline —
CodePipeline/CodeBuild, or GitHub Actions deploying to S3 and ECS — turns "did you remember to deploy
the latest build" into a non-issue.

## Security basics that are easy to skip

- Never put long-lived AWS credentials directly in frontend code or commit them to a repository.
- Use IAM roles scoped to the minimum permissions a service actually needs.
- Put RDS in a private subnet; only your application tier should be able to reach it directly.

## Takeaway

You don't need to become a dedicated DevOps engineer to be dangerous with AWS. Understanding EC2, S3,
CloudFront, RDS, and where CI/CD fits is enough to go from "someone else deploys my code" to owning the
full path from commit to production.
