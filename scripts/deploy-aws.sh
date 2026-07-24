#!/usr/bin/env bash
# Builds the Angular app and deploys it to an S3 bucket fronted by CloudFront.
#
# Prerequisites:
#   - AWS CLI v2 installed and configured (`aws configure`)
#   - An S3 bucket created and configured for static website hosting
#   - A CloudFront distribution pointed at that bucket
#
# Usage:
#   S3_BUCKET=my-portfolio-bucket CLOUDFRONT_DISTRIBUTION_ID=E123456789 ./scripts/deploy-aws.sh

set -euo pipefail

: "${S3_BUCKET:?Set S3_BUCKET to your target bucket name}"
: "${CLOUDFRONT_DISTRIBUTION_ID:?Set CLOUDFRONT_DISTRIBUTION_ID to your CloudFront distribution ID}"

echo "Building production bundle..."
npm run build

DIST_DIR="dist/portfolio/browser"

echo "Syncing hashed, long-cache assets to s3://${S3_BUCKET}..."
aws s3 sync "$DIST_DIR" "s3://${S3_BUCKET}" \
  --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "index.html" \
  --exclude "*.map"

echo "Uploading index.html with no-cache (so new deploys are picked up immediately)..."
aws s3 cp "$DIST_DIR/index.html" "s3://${S3_BUCKET}/index.html" \
  --cache-control "public,max-age=0,must-revalidate"

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_DISTRIBUTION_ID" \
  --paths "/*"

echo "Deployment complete."
