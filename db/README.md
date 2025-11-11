# ProcrastApp - Database Schema & Seeding Script Run Instructions

## Overview:
The purpose of this markdown file is to explain how to set up and populate the PostgreSQL database for ProcrastApp.

### Files Needed:
- schema.sql - defines the database
- seed.sql - populates the database
- docker-compose.yml - defines the services
- .env - stores environment variables & credentials

## Prerequistes:
Make sure you have **Docker** and **Docker Compose** installed on your machine.

## Steps to Run the Scripts:
1. Start the PostgreSQL Container using the following command: **docker-compose up -d**
2. Check to see if the Database is running using the following command: **docker ps**
3. Access the PostgreSQL shell using the following command: **docker exec -it db psql -U admin -d procrastapp** 
4. Run the schema script using the following command(s): **docker cp schema.sql db:/schema.sql** and **docker exec -it db psql -U admin -d procrastapp -f /schema.sql**
5. Run the seeding script using the following command(s): **docker cp seed.sql db:/seed.sql** and **docker exec -it db psql -U admin -d procrastapp -f /seed.sql**
6. Verify the data using the following commands: **docker exec -it db psql -U admin -d procrastapp**
7. Stop the container using the following command: **docker-compose down**
