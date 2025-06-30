#!/bin/sh

# docker run -it -p 3000:3000 --rm -v $(pwd)/.env:/usr/src/app/.env brb:dev

# docker reads .env file and loads them into memory at runtime - process.env
# no .env file is needed within the container, not written or hardcoded into disk storage.
#
# for production, fetch from secret management system like AWS KMS, supports key rotation

docker run -it --env-file .env -p 3000:3000 --rm brb:dev
