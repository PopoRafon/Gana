# Gana
# Local Development
These instructions will help you set up Gana for local development.
## Prerequisites
- `Node` with version >= 18
- `npm` or other package manager
- `git`
- `MySQL`
## Installation
1. Open your terminal and move using `cd` command to the folder you want Gana to be installed in.
2. Copy project using `git clone https://github.com/PopoRafon/Gana` command.
3. Move to the project folder and install all dependencies using `npm install` command.
4. In project folder create `.env` file and set variable `DATABASE_URL=mysql://user:password@host:port/database` with your `MySQL` settings. [(READ MORE)](https://www.prisma.io/docs/orm/overview/databases/mysql)
5. Spin up your `MySQL` development server.
6. Apply `prisma` migrations using `npm run migrate-dev` in your project folder with your `MySQL` server running.
## Usage
1. Spin up your `MySQL` server if you haven't already.
2. Run `npm run dev` command in project folder to start development server. 
## Environment variables
- `SECRET_KEY` - The secret used for JWT token signing and verifing
- `DATABASE_URL` - URL used for connecting to MySQL database
- `NEXT_PUBLIC_CONTACT_EMAIL` - Public email address for contacting support
## Testing
- To run all tests: `npm run test`
## Author
[PopoRafon](https://github.com/PopoRafon)