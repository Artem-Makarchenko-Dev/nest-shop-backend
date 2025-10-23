const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // --- Roles ---
  const rolesData = [
    { name: 'ADMIN', description: 'Full system access' },
    { name: 'MANAGER', description: 'Manage products and users' },
    { name: 'USER', description: 'Regular customer' },
  ];

  for (const role of rolesData) {
    await prisma.role.upsert({
      where: { name: role.name }, // name унікальне у схемі
      update: {},
      create: role,
    });
  }
  console.log('✅ Roles seeded');

  // --- Users ---
  const passwords = await Promise.all([
    bcrypt.hash('admin123', 10),
    bcrypt.hash('manager123', 10),
    bcrypt.hash('user123', 10),
  ]);

  const usersData = [
    { email: 'admin@example.com', password: passwords[0], name: 'Admin', isActive: true },
    { email: 'manager@example.com', password: passwords[1], name: 'Manager', isActive: true },
    { email: 'user@example.com', password: passwords[2], name: 'User', isActive: true },
  ];

  for (const user of usersData) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }
  console.log('✅ Users seeded');

  // --- UserRoles ---
  const [admin, manager, user] = await Promise.all([
    prisma.user.findUnique({ where: { email: 'admin@example.com' } }),
    prisma.user.findUnique({ where: { email: 'manager@example.com' } }),
    prisma.user.findUnique({ where: { email: 'user@example.com' } }),
  ]);

  const [adminRole, managerRole, userRole] = await Promise.all([
    prisma.role.findUnique({ where: { name: 'ADMIN' } }),
    prisma.role.findUnique({ where: { name: 'MANAGER' } }),
    prisma.role.findUnique({ where: { name: 'USER' } }),
  ]);

  const userRolesData = [
    { userId: admin.id, roleId: adminRole.id },
    { userId: manager.id, roleId: managerRole.id },
    { userId: user.id, roleId: userRole.id },
  ];

  for (const ur of userRolesData) {
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: ur.userId, roleId: ur.roleId } }, // composite ID
      update: {},
      create: ur,
    });
  }
  console.log('✅ UserRoles seeded');

  // --- Products ---
  const productsData = [
    { name: 'Laptop', description: 'Powerful gaming laptop', price: 1500, discount: 10, finalPrice: 1350 },
    { name: 'Headphones', description: 'Noise-cancelling headphones', price: 200, discount: 5, finalPrice: 190 },
    { name: 'Keyboard', description: 'Mechanical keyboard', price: 120, discount: 0, finalPrice: 120 },
  ];

  for (const product of productsData) {
    const existing = await prisma.product.findFirst({ where: { name: product.name } });
    if (!existing) {
      await prisma.product.create({ data: product });
    }
  }
  console.log('✅ Products seeded');

  console.log('🌿 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });