#/bin/sh
docker run -e POSTGRES_PASSWORD=password -e POSTGRES_DB=kraken -p 5432:5432 postgres:14.1