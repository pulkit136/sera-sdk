export const Logger = {
  step(title: string): void {
    console.log('\n' + '='.repeat(60));
    console.log(`🔷 AGENT: ${title}`);
    console.log('='.repeat(60));
  },

  info(message: string): void {
    console.log(`ℹ️  [INFO] ${message}`);
  },

  success(message: string): void {
    console.log(`✅ [SUCCESS] ${message}`);
  },

  warn(message: string): void {
    console.log(`⚠️  [WARNING] ${message}`);
  },

  error(message: string, error?: any): void {
    console.error(`❌ [ERROR] ${message}`);
    if (error) {
      console.error(error.message || error);
    }
  },
};
