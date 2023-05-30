const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
//console.log("kldsdk")

async function main() {
    const user = await prisma.test.findMany()
    //console.log (user)
}
main()