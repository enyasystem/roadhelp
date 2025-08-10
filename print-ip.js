const os = require('os');

function getAllLocalExternalIps() {
  const interfaces = os.networkInterfaces();
  const ips = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push(iface.address);
      }
    }
  }
  return ips.length ? ips : ['localhost'];
}

const ips = getAllLocalExternalIps();
const port = process.env.PORT || 3000;
console.log('\nYour app should be accessible on your network at:');
ips.forEach(ip => {
  console.log(`  http://${ip}:${port}/`);
});
console.log('');
